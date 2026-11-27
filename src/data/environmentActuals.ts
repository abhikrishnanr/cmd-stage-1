import type { TransportSource } from "./transportActuals";

export const environmentSources = {
  air: {
    source: "Kerala State Pollution Control Board", dataset: "Continuous ambient air quality · daily AQI bulletin",
    url: "https://kspcb.kerala.gov.in/fileViewer/RTJPck1WV1RBR2ZPQ01wbkVSbVRLSkdpWjZDVlpreVhTdm5DQVFSSHlMY0dFa0JMU3cwTExwRjRyTGxXaHEzZFlUcUgwOHJiYzBBYks5ckZ4cWtzTWc9PQ%2A%2A/0?raw=1",
    period: "17 Nov 2026", sourceUpdatedAt: "17 Nov 2026 (bulletin date)", basis: "Station averages and reported AQI classifications",
  },
  rivers: {
    source: "Kerala State Pollution Control Board", dataset: "National Water Quality Monitoring Programme · March 2026 data",
    url: "https://kspcb.kerala.gov.in/fileViewer/WThQbDJneURScUY0NmVOa0FPWmlsampkSEhNUytqbHczQVhDb0lIYmpHaz0%2A/0?raw=1",
    period: "2–3 Mar 2026", basis: "Selected river samples matched to monitoring locations by station code",
  },
  forests: {
    source: "Forest Survey of India", dataset: "India State of Forest Report 2023, volume 2 · Kerala, tables 10.13.2 and 10.13.3",
    url: "https://fsi.nic.in/uploads/isfr2023/isfr_book_eng-vol-2_2023.pdf", period: "2023 assessment", sourceUpdatedAt: "21 Dec 2024 (publication)",
    basis: "Satellite-assessed forest cover by canopy density and district",
  },
  wetlands: {
    source: "Ministry of Environment, Forest and Climate Change", dataset: "Ramsar Sites of India · Kerala entries",
    url: "https://moef.gov.in/uploads/pdf-uploads/pdf_698ae4f8f28953.18411376.pdf", period: "21 Apr 2026 register",
    sourceUpdatedAt: "21 Apr 2026 (register as-of date)", basis: "Officially designated wetland areas",
  },
} satisfies Record<string, TransportSource>;

export const airStations = [
  { station: "Eloor", aqi: 30, pm25: 17.41, pm10: 30.22, category: "Good" },
  { station: "Plamood", aqi: 52, pm25: 16, pm10: 52, category: "Satisfactory" },
  { station: "Karyavattom", aqi: 73, pm25: 33.17, pm10: 73.14, category: "Satisfactory" },
  { station: "Kannur", aqi: 66, pm25: 39.06, pm10: 66.45, category: "Satisfactory" },
  { station: "Thrissur", aqi: 55, pm25: 32.21, pm10: 55.73, category: "Satisfactory" },
];

export const riverReadings = [
  { site: "Kuppam — Urooteri", station: 5234, date: "2 Mar 2026", ph: 7, dissolvedOxygen: 6.5, bod: 2 },
  { site: "Chaliyar — Nilambur", station: 3464, date: "3 Mar 2026", ph: 7.6, dissolvedOxygen: 8, bod: 1.6 },
  { site: "Meenachil — Kidangoor", station: 1339, date: "3 Mar 2026", ph: 6.8, dissolvedOxygen: 6.4, bod: 1.2 },
  { site: "Periyar — Kalamassery", station: 2335, date: "3 Mar 2026", ph: 7.1, dissolvedOxygen: 5.2, bod: 1.4 },
  { site: "Periyar — Pathalam", station: 2334, date: "3 Mar 2026", ph: 7.2, dissolvedOxygen: 4.2, bod: 1.4 },
  { site: "Periyar — Muppathadam", station: 2333, date: "3 Mar 2026", ph: 7.8, dissolvedOxygen: 6.5, bod: 1.9 },
];

export const forestCover = { squareKm: 22059.36, stateAreaPercent: 56.78 };
export const forestClasses = [
  { label: "Very dense forest", value: 2041.17, color: "#075b43" },
  { label: "Moderately dense forest", value: 9321.82, color: "#047857" },
  { label: "Open forest", value: 10696.37, color: "#39824f" },
];

export const districtForestCover = [
  { district: "Alappuzha", squareKm: 140.92, percent: 9.96 },
  { district: "Ernakulam", squareKm: 1469.01, percent: 47.96 },
  { district: "Idukki", squareKm: 3210.92, percent: 73.71 },
  { district: "Kannur", squareKm: 1832.09, percent: 61.87 },
  { district: "Kasaragod", squareKm: 1138.03, percent: 57.22 },
  { district: "Kollam", squareKm: 1196.58, percent: 48.19 },
  { district: "Kottayam", squareKm: 1343.77, percent: 60.91 },
  { district: "Kozhikode", squareKm: 1882.06, percent: 80.26 },
  { district: "Malappuram", squareKm: 2164.83, percent: 60.91 },
  { district: "Palakkad", squareKm: 2046.83, percent: 45.67 },
  { district: "Pathanamthitta", squareKm: 1356.48, percent: 51.15 },
  { district: "Thiruvananthapuram", squareKm: 1394.47, percent: 63.70 },
  { district: "Thrissur", squareKm: 1290.03, percent: 42.62 },
  { district: "Wayanad", squareKm: 1593.34, percent: 74.80 },
];

export const ramsarWetlands = [
  { name: "Vembanad-Kol Wetland", hectares: 151250 },
  { name: "Ashtamudi Wetland", hectares: 6140 },
  { name: "Sasthamkotta Lake", hectares: 373 },
];
