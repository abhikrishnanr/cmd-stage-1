import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const reviewSource = {
  source: "Kerala State Planning Board · Directorate of Fisheries",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf#page=128",
  sourceUpdatedAt: "4 Feb 2026 (release notice)",
  fetchedAt: "27 Nov 2026",
};

const productionHistorySource = {
  ...reviewSource,
  dataset: "Economic Review 2025 · Appendix 3.4.3",
  period: "FY 2018–19 to FY 2024–25",
  basis: "Published state totals in lakh tonnes. Marine figures are provisional.",
} satisfies DepartmentSource;

const districtsSource = {
  ...reviewSource,
  dataset: "Economic Review 2025 · Appendix 3.4.4",
  period: "FY 2024–25",
  basis: "Marine and inland production for all 14 districts in tonnes. Uses the exact state total from the district table.",
} satisfies DepartmentSource;

const marineLandingsSource = {
  source: "ICAR · Central Marine Fisheries Research Institute",
  dataset: "Marine Fish Landings in India 2025 · Kerala profile",
  url: "https://eprints.cmfri.org.in/19715/1/Marine%20Fish%20Landings%20in%20India%20-%202025.pdf#page=11",
  period: "Calendar year 2025",
  basis: "Marine fish landings estimated from sampled fishing activity. This series follows January to December.",
  sourceUpdatedAt: "30 Apr 2026 (release)",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const exportSource = {
  source: "Marine Products Export Development Authority",
  dataset: "Marine Products Exports · Port-wise export data, Kochi",
  url: "https://mpeda.gov.in/?page_id=438",
  period: "FY 2021–22 to FY 2025–26",
  basis: "Seafood shipments recorded under the Kochi port entry. Value is in nominal rupees and the figures use port-of-export coverage.",
  sourceUpdatedAt: "25 Nov 2026 (portal update)",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const production = [
  { label: "2018–19", marine: 6.10, inland: 1.92, total: 8.02 },
  { label: "2019–20", marine: 4.75, inland: 2.05, total: 6.80 },
  { label: "2020–21", marine: 3.90, inland: 2.05, total: 5.95 },
  { label: "2021–22", marine: 6.01, inland: 2.25, total: 8.26 },
  { label: "2022–23", marine: 6.90, inland: 2.29, total: 9.19 },
  { label: "2023–24", marine: 5.81, inland: 2.51, total: 8.32 },
  { label: "2024–25", marine: 6.47, inland: 2.81, total: 9.28 },
] as const;

const districts = [
  { label: "Ernakulam", marine: 185077, inland: 29106 },
  { label: "Kollam", marine: 136571, inland: 37146 },
  { label: "Kozhikode", marine: 112534, inland: 3231 },
  { label: "Alappuzha", marine: 30514, inland: 80145 },
  { label: "Kottayam", marine: 0, inland: 65110 },
  { label: "Thiruvananthapuram", marine: 55925, inland: 3062 },
  { label: "Kannur", marine: 41665, inland: 4647 },
  { label: "Malappuram", marine: 40498, inland: 2949 },
  { label: "Thrissur", marine: 30441, inland: 9086 },
  { label: "Kasaragod", marine: 14027, inland: 20899 },
  { label: "Pathanamthitta", marine: 0, inland: 11264 },
  { label: "Palakkad", marine: 0, inland: 6194 },
  { label: "Wayanad", marine: 0, inland: 4341 },
  { label: "Idukki", marine: 0, inland: 3008 },
] as const;

const kochiExports = [
  { label: "2021–22", tonnes: 175332, crore: 6167.69, usdMillions: 849.57 },
  { label: "2022–23", tonnes: 225230, crore: 7550.48, usdMillions: 959.09 },
  { label: "2023–24", tonnes: 181400, crore: 6120.10, usdMillions: 746.43 },
  { label: "2024–25", tonnes: 166257, crore: 6050.20, usdMillions: 722.70 },
  { label: "2025–26", tonnes: 179696.46, crore: 7285.40, usdMillions: 833.10 },
] as const;

const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const [marine, inland] = [647252, 280188];
const latestExport = kochiExports[4];
const previousExport = kochiExports[3];
const inlandLeaders = districts[3].inland + districts[4].inland;
const inlandShare = (100 * inlandLeaders / inland).toFixed(1);
const exportValueGrowth = (100 * (latestExport.crore / previousExport.crore - 1)).toFixed(1);
const exportVolumeGrowth = (100 * (latestExport.tonnes / previousExport.tonnes - 1)).toFixed(1);

export const fisheriesDashboard = {
  title: "Fisheries Production",
  description: "Kerala’s marine and inland production, district catch and seafood shipments through Kochi.",
  icon: "ShipWheel",
  accent: "#08708a",
  measures: [
    { label: "Kerala fish production", value: `${number.format(marine + inland)} tonnes`, note: "Marine and inland · FY 2024–25", source: districtsSource },
    { label: "Inland fish production", value: `${number.format(inland)} tonnes`, note: "Statewide · FY 2024–25", source: districtsSource },
    { label: "Marine fish landings", value: "6.24 lakh tonnes", note: "CMFRI estimate · Calendar 2025", source: marineLandingsSource },
    { label: "Kochi seafood export value", value: `₹${number.format(latestExport.crore)} crore`, note: "Through Kochi · FY 2025–26", source: exportSource },
  ],
  attention: [
    {
      title: "Marine production remains below its recent high", value: "6.47 lakh tonnes",
      detail: "FY 2024–25 provisional marine output recovered from 5.81 lakh tonnes a year earlier. The highest figure in this series was 6.90 lakh tonnes in FY 2022–23.",
      sources: [productionHistorySource], section: "fish-production-history",
    },
    {
      title: "Two districts supply half of inland output", value: `${inlandShare}% of Kerala’s inland production`,
      detail: `Alappuzha and Kottayam together accounted for ${number.format(inlandLeaders)} tonnes in FY 2024–25. Review their output together when assessing changes in inland supply.`,
      sources: [districtsSource], section: "fish-production-districts",
    },
    {
      title: "Kochi’s export value grew faster than volume", value: `+${exportValueGrowth}% in rupee value`,
      detail: `In FY 2025–26, shipments through Kochi rose ${exportVolumeGrowth}% by volume from the previous year. The table shows both measures and dollar value.`,
      sources: [exportSource], section: "kochi-seafood-exports",
    },
  ],
  charts: [
    {
      id: "fish-production-history", title: "Kerala fish production over time", period: "Marine and inland total · FY 2018–19 to FY 2024–25",
      kind: "trend", sources: [productionHistorySource], unit: "lakh tonnes",
      rows: production.map(({ label, total }) => ({ label, value: total })),
      details: {
        columns: ["Financial year", "Marine, provisional (lakh tonnes)", "Inland (lakh tonnes)", "Total (lakh tonnes)"],
        rows: production.map((row) => [row.label, row.marine.toFixed(2), row.inland.toFixed(2), row.total.toFixed(2)]),
      },
      note: "The figures reproduce the rounded values published in the annual series.",
    },
    {
      id: "fish-production-mix", title: "Marine and inland production", period: "Statewide · FY 2024–25",
      kind: "composition", sources: [districtsSource], unit: "tonnes",
      rows: [
        { label: "Marine", value: marine, color: "#08708a" },
        { label: "Inland", value: inland, color: "#397447" },
      ],
      note: "Exact quantities are from the district production table.",
    },
    {
      id: "fish-production-districts", title: "Fish production by district", period: "Six highest combined outputs · FY 2024–25",
      sources: [districtsSource], unit: "tonnes", color: "#2068a0",
      rows: districts.slice(0, 6).map(({ label, marine, inland }) => ({ label, value: marine + inland })),
      details: {
        columns: ["District", "Marine (tonnes)", "Inland (tonnes)", "Total (tonnes)"],
        rows: districts.map(({ label, marine, inland }) => [label, marine, inland, marine + inland]),
      },
    },
    {
      id: "kochi-seafood-exports", title: "Seafood exports through Kochi", period: "Kochi port entry · FY 2021–22 to FY 2025–26",
      kind: "trend", sources: [exportSource], unit: "₹ crore", color: "#765299",
      rows: kochiExports.map(({ label, crore }) => ({ label, value: crore })),
      details: {
        columns: ["Financial year", "Volume (tonnes)", "Value (₹ crore)", "Value (US$ million)"],
        rows: kochiExports.map(({ label, tonnes, crore, usdMillions }) => [label, tonnes, crore, usdMillions]),
      },
      note: "Shipments are counted at the port of export. The rupee series uses nominal values.",
    },
  ],
} satisfies DepartmentDashboardData;
