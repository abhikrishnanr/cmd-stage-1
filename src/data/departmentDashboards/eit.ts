import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const economicReview = "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume1%20Eng%20final.pdf";
const review = { source: "Kerala State Planning Board", fetchedAt: "27 Nov 2026" };

const parkReview = {
  ...review,
  dataset: "Economic Review 2025 · Information Technology, Tables 5.1.2, 5.1.5 and 5.1.6",
  url: `${economicReview}#page=292`,
  period: "FY 2022–23 to FY 2024–25",
  basis: "Annual exports, reported employment and company counts for Technopark, Infopark and Cyberpark.",
} satisfies DepartmentSource;

const developmentReport = {
  ...review,
  dataset: "Kerala Development Report 2026 · Information Technology, IT Parks",
  url: "https://spb.kerala.gov.in/wp-content/uploads/2026/01/kerala-development-report_2026.pdf#page=243",
  period: "FY 2024–25",
  basis: "Export revenue and operating companies at the three public IT parks.",
} satisfies DepartmentSource;

const kfonSource = {
  ...review,
  dataset: "Economic Review 2025 · Kerala Fibre Optic Network",
  url: `${economicReview}#page=295`,
  period: "31 Aug 2025",
  basis: "Active KFON connections by customer category as reported by KFON.",
} satisfies DepartmentSource;

const startupReview = {
  ...review,
  dataset: "Economic Review 2025 · Information Technology highlights",
  url: `${economicReview}#page=287`,
  period: "FY 2023–24 and FY 2024–25",
  basis: "Total technology startups in Kerala’s startup ecosystem for the two financial years.",
} satisfies DepartmentSource;

const startupMission = {
  source: "Kerala Startup Mission",
  dataset: "Kerala startup ecosystem",
  url: "https://startupmission.kerala.gov.in/ecosystem",
  period: "Undated website snapshot",
  basis: "Technology startup headline figure on the Kerala Startup Mission ecosystem page.",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const parks = [
  { label: "Technopark", exports: [11630, 13255, 14575], employment: 80000, companies: [479, 490, 500], color: "#155f91" },
  { label: "Infopark", exports: [9186, 11417, 12065], employment: 73500, companies: [572, 580, 582], color: "#16836f" },
  { label: "Cyberpark", exports: [105, 121, 130], employment: 2300, companies: [85, 83, 80], color: "#a16922" },
] as const;

const fibreConnections = [
  { label: "Paid home", value: 73134, color: "#155f91" },
  { label: "Government offices", value: 23163, color: "#16836f" },
  { label: "Below-poverty-line households", value: 14194, color: "#a16922" },
  { label: "Small and medium enterprises", value: 3034, color: "#7348a1" },
] as const;

const technologyStartups = [
  { label: "FY 2023–24", value: 4681 },
  { label: "FY 2024–25", value: 6227 },
] as const;

const number = new Intl.NumberFormat("en-IN");
const exportTrend = ["FY 2022–23", "FY 2023–24", "FY 2024–25"].map((label, index) => ({
  label,
  value: parks.reduce((total, park) => total + park.exports[index], 0),
}));
const [technopark, infopark, cyberpark] = parks;
const [, priorExportYear, latestExportYear] = exportTrend;
const exportConcentration = (100 * (technopark.exports[2] + infopark.exports[2]) / latestExportYear.value).toFixed(1);
const exportGrowth = (100 * (latestExportYear.value / priorExportYear.value - 1)).toFixed(1);
const parkEmployment = parks.reduce((total, park) => total + park.employment, 0);
const activeConnections = fibreConnections.reduce((total, category) => total + category.value, 0);
const householdShare = (100 * fibreConnections[2].value / activeConnections).toFixed(1);
const startupGrowth = (100 * (technologyStartups[1].value / technologyStartups[0].value - 1)).toFixed(1);

export const eitDashboard = {
  title: "Electronics and IT",
  description: "Public IT park exports and jobs, Kerala’s technology startups and active KFON fibre connections.",
  icon: "CircuitBoard",
  accent: "#20568b",
  measures: [
    { label: "Public IT park exports", value: `₹${number.format(latestExportYear.value)} crore`, note: "Three parks · FY 2024–25", source: parkReview },
    { label: "Public IT park employment", value: number.format(parkEmployment), note: "Three parks · FY 2024–25", source: parkReview },
    { label: "Active KFON connections", value: number.format(activeConnections), source: kfonSource },
    { label: "Technology startups", value: "8,000+", note: "KSUM website · checked 27 Nov 2026", source: startupMission },
  ],
  attention: [
    {
      title: "Exports are concentrated in two parks",
      value: `${exportConcentration}% at Technopark and Infopark`,
      detail: `Of the three parks’ FY 2024–25 exports, Cyberpark contributed ₹${cyberpark.exports[2]} crore and reported ${cyberpark.companies[2]} operating companies, down from ${cyberpark.companies[1]} the previous year. Review prospective tenants and export growth at Cyberpark.`,
      sources: [parkReview, developmentReport], section: "park-exports",
    },
    {
      title: "Fibre access for low-income households",
      value: `${householdShare}% of active connections`,
      detail: `KFON reported ${number.format(fibreConnections[2].value)} active connections for below-poverty-line households on 31 Aug 2025. Request the latest count to review how household access has changed.`,
      sources: [kfonSource], section: "kfon-connections",
    },
    {
      title: "Technology startup count rose",
      value: `${startupGrowth}% higher in FY 2024–25`,
      detail: `The Economic Review count rose to ${number.format(technologyStartups[1].value)}. Review startup survival and jobs alongside the increase in the number of firms.`,
      sources: [startupReview], section: "startup-ecosystem",
    },
  ],
  charts: [
    {
      id: "park-exports", title: "Exports by public IT park", period: "FY 2024–25 · ₹ crore",
      sources: [parkReview, developmentReport],
      rows: parks.map(({ label, exports, color }) => ({ label, value: exports[2], color })),
      details: {
        columns: ["Park", "Exports (₹ crore)", "Employment", "Companies"],
        rows: parks.map(({ label, exports, employment, companies }) => [label, exports[2], employment, companies[2]]),
      },
      note: `The three parks reported a combined ₹${number.format(latestExportYear.value)} crore in annual exports and ${number.format(parkEmployment)} jobs in FY 2024–25.`,
    },
    {
      id: "park-export-trend", title: "Public IT park export trend", period: "Three parks · FY 2022–23 to FY 2024–25 · ₹ crore",
      kind: "trend", sources: [parkReview], rows: exportTrend,
      details: {
        columns: ["Financial year", "Technopark (₹ crore)", "Infopark (₹ crore)", "Cyberpark (₹ crore)", "Total (₹ crore)"],
        rows: exportTrend.map(({ label, value }, index) => [label, ...parks.map((park) => park.exports[index]), value]),
      },
      note: `Combined annual exports grew ${exportGrowth}% between FY 2023–24 and FY 2024–25.`,
    },
    {
      id: "kfon-connections", title: "KFON active connections", period: "By customer category · 31 Aug 2025",
      kind: "composition", sources: [kfonSource], rows: fibreConnections,
      note: `${number.format(activeConnections)} active connections across the four reported categories.`,
    },
    {
      id: "startup-ecosystem", title: "Technology startups in Kerala", period: "Economic Review series · FY 2023–24 and FY 2024–25",
      kind: "trend", color: "#7348a1", sources: [startupReview, startupMission], rows: technologyStartups,
      note: "Kerala Startup Mission’s undated ecosystem page separately reports 8,000+ technology startups.",
    },
  ],
} satisfies DepartmentDashboardData;
