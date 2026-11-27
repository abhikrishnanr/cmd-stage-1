import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";
import { airStations, districtForestCover, environmentSources, forestClasses, forestCover, ramsarWetlands, riverReadings } from "@/data/environmentActuals";

const annualAir = {
  source: "Kerala State Pollution Control Board",
  dataset: "Integrated Portal for Pollution Assessment & Monitoring · 2026 average AQI",
  url: "https://www.kspcbipam.kerala.gov.in/Dashboard/airQuality",
  period: "2026 reported averages · portal checked 27 Nov 2026",
  fetchedAt: "27 Nov 2026",
  basis: "Station averages for manual NAMP and SAMP monitoring. The portal does not specify the observation cutoff for the table.",
} satisfies DepartmentSource;

const oxygenCriteria = {
  source: "Central Pollution Control Board",
  dataset: "Designated Best Use Water Quality Criteria · Class C and D dissolved oxygen",
  url: "https://cpcb.nic.in/wqm/Designated_Best_Use_Water_Quality_Criteria.pdf",
  period: "Published criteria",
  basis: "Classes C and D both specify dissolved oxygen of at least 4 mg/L. The March NWMP report assigns the three Periyar stations to Class D, for propagation of wildlife and fisheries, and the other three stations shown to Class C.",
} satisfies DepartmentSource;

const { air, rivers, forests, wetlands } = environmentSources;
const dailyStations = [...airStations].sort((a, b) => b.aqi - a.aqi);
const missingAirReadings = [
  ["Palayam, Kozhikode", "Insufficient data"],
  ["MG Road, Ernakulam", "Insufficient data"],
  ["Vytilla", "Insufficient data"],
  ["Kollam", "Power failure"],
];
const oxygenSamples = [...riverReadings].sort((a, b) => a.dissolvedOxygen - b.dissolvedOxygen);
const largestForestDistricts = [...districtForestCover].sort((a, b) => b.squareKm - a.squareKm);
const highestAnnualStations = [
  { label: "Poonkunnam", value: 74.43, programme: "NAMP" },
  { label: "Peringandoor", value: 74.14, programme: "NAMP" },
  { label: "BEML Limited", value: 71.47, programme: "SAMP" },
  { label: "Ayyanthole", value: 68.32, programme: "NAMP" },
  { label: "Kanjikode · Carborundum/SEPR", value: 62.78, programme: "NAMP" },
  { label: "Vyttila", value: 60.88, programme: "NAMP" },
  { label: "Methanam · Eloor I", value: 57.26, programme: "NAMP" },
  { label: "Kalamassery", value: 54.18, programme: "NAMP" },
];
const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export const environmentDashboard = {
  title: "Environment",
  description: "Air quality, river monitoring, forest cover and designated wetlands across Kerala.",
  icon: "CloudSun",
  accent: "#116e74",
  measures: [
    { label: "Highest AQI in daily bulletin", value: `${dailyStations[0].aqi} AQI`, note: `${dailyStations[0].station} · ${air.period}`, source: air },
    { label: "Lowest oxygen in selected samples", value: `${oxygenSamples[0].dissolvedOxygen} mg/L`, note: `${oxygenSamples[0].site} · ${oxygenSamples[0].date}`, source: rivers },
    { label: "Kerala forest cover", value: `${number.format(forestCover.squareKm)} km²`, note: `${forestCover.stateAreaPercent}% of state area · 2023 assessment`, source: forests },
    { label: "Designated Ramsar sites", value: String(ramsarWetlands.length), source: wetlands },
  ],
  attention: [
    {
      title: "Check the Pathalam river reading", value: "4.2 mg/L dissolved oxygen",
      detail: "The 3 March 2026 Periyar sample at Pathalam was 0.2 mg/L above the CPCB oxygen minimum for Class D wildlife and fisheries waters. Review subsequent samples to see whether this narrow margin persists.",
      sources: [rivers, oxygenCriteria], section: "river-water",
    },
    {
      title: "Review missing air-monitor readings", value: "4 of 9 stations without AQI",
      detail: "The 17 November bulletin records insufficient data at Palayam, MG Road and Vytilla and a power failure at Kollam. All five stations with readings reported Good or Satisfactory air quality.",
      sources: [air], section: "air-quality",
    },
  ],
  charts: [
    {
      id: "air-quality", title: "Daily ambient air quality", period: air.period, sources: [air], unit: "AQI",
      rows: dailyStations.map(({ station, aqi, category }) => ({ label: station, value: aqi, color: category === "Good" ? "#28834f" : "#857017" })),
      details: {
        columns: ["Station", "AQI", "PM₂.₅ (µg/m³)", "PM₁₀ (µg/m³)", "Category or status"],
        rows: [
          ...dailyStations.map(({ station, aqi, pm25, pm10, category }) => [station, aqi, pm25, pm10, category]),
          ...missingAirReadings.map(([station, status]) => [station, "—", "—", "—", status]),
        ],
      },
      note: "Daily bulletin values describe individual stations on the date shown.",
    },
    {
      id: "river-water", title: "Dissolved oxygen in river samples", period: rivers.period, sources: [rivers, oxygenCriteria], unit: "mg/L",
      rows: oxygenSamples.map(({ site, station, dissolvedOxygen }) => ({ label: site, value: dissolvedOxygen, color: station === 2334 ? "#b25e19" : "#1c747a" })),
      details: { columns: ["Sampling location", "Station code", "Date", "pH", "DO (mg/L)", "BOD (mg/L)"], rows: oxygenSamples.map(({ site, station, date, ph, dissolvedOxygen, bod }) => [site, station, date, ph, dissolvedOxygen, bod]) },
      note: "Amber identifies the Pathalam sample for follow-up. The six selected stations share a Class C or D oxygen minimum of 4 mg/L. BOD is biochemical oxygen demand.",
    },
    {
      id: "average-air-quality", title: "Highest reported 2026 station averages", period: annualAir.period, sources: [annualAir], unit: "AQI",
      rows: highestAnnualStations,
      details: { columns: ["Station", "Monitoring programme", "Average AQI"], rows: highestAnnualStations.map(({ label, programme, value }) => [label, programme, value]) },
      note: "Eight highest averages in the manual monitoring table. Sampling frequency and dates can vary by station.",
    },
    {
      id: "forest-cover", title: "Forest cover by canopy density", period: forests.period, sources: [forests], kind: "composition", unit: "km²",
      rows: forestClasses,
      details: { columns: ["District", "Forest cover (km²)", "Share of district (%)"], rows: largestForestDistricts.map(({ district, squareKm, percent }) => [district, squareKm, percent]) },
    },
    {
      id: "wetlands", title: "Designated Ramsar wetland area", period: wetlands.period, sources: [wetlands], unit: "ha",
      rows: ramsarWetlands.map(({ name, hectares }) => ({ label: name, value: hectares })),
    },
  ],
} satisfies DepartmentDashboardData;
