import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const annualSource = {
  source: "Kerala State Planning Board · Department of Economics and Statistics",
  dataset: "Economic Review 2025 · Appendix 3.1.6",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf",
  period: "FY 2022–23 to FY 2024–25",
  basis: "Wetland paddy area, rice output and published productivity across the three crop seasons.",
  sourceUpdatedAt: "4 Feb 2026 (release notice)",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const winterPriorSource = {
  source: "Kerala Directorate of Economics and Statistics",
  dataset: "Final paddy estimates · 2024–25 autumn and winter",
  url: "https://www.ecostat.kerala.gov.in/publication-detail/final-estimate-of-area-and-production-of-paddy-2024-25-autumn--winter-seasons",
  period: "Winter crop, FY 2024–25",
  basis: "Final district crop estimates, Winter (Wet) table.",
  sourceUpdatedAt: "20 Aug 2025",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const winterSource = {
  source: "Kerala Directorate of Economics and Statistics",
  dataset: "Final estimates of area and production of rice · winter 2025–26",
  url: "https://ecostat.kerala.gov.in/publication-detail/final-estimate-of-area-and-production-of-rice-2025-26-winter-season",
  period: "Winter crop, FY 2025–26",
  basis: "Final district crop estimates, Winter (Wet) table.",
  sourceUpdatedAt: "13 Jul 2026",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const annualWetland = [
  { year: "2022–23", area: 190170.93, output: 592684.49, yield: 3117 },
  { year: "2023–24", area: 178954.22, output: 530283.64, yield: 2963 },
  { year: "2024–25", area: 176360.38, output: 530223.86, yield: 3006 },
];

const winter = [
  { year: "2024–25", area: 68648.52, output: 209109.500 },
  { year: "2025–26", area: 76450.82, output: 271223.713 },
] as const;

const districtWinter = [
  { label: "Palakkad", area: 28371.43, value: 113515.861 },
  { label: "Thrissur", area: 13244.87, value: 48748.377 },
  { label: "Kottayam", area: 7941.76, value: 26752.379 },
  { label: "Alappuzha", area: 8080.72, value: 25887.394 },
  { label: "Malappuram", area: 5641.18, value: 19598.421 },
  { label: "Wayanad", area: 6057.66, value: 19444.212 },
  { label: "Ernakulam", area: 2221.69, value: 5923.015 },
  { label: "Kannur", area: 1503.68, value: 4217.500 },
  { label: "Pathanamthitta", area: 666.78, value: 1902.079 },
  { label: "Kollam", area: 847.52, value: 1568.341 },
  { label: "Thiruvananthapuram", area: 610.46, value: 1484.503 },
  { label: "Kozhikode", area: 625.96, value: 810.655 },
  { label: "Kasaragod", area: 383.79, value: 774.881 },
  { label: "Idukki", area: 253.32, value: 596.095 },
];
const year = annualWetland[2];
const earlierYear = annualWetland[1];
const n = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 3 });
const rise = (100 * (winter[1].output / winter[0].output - 1)).toFixed(1);
const palakkadShare = (100 * districtWinter[0].value / winter[1].output).toFixed(1);
const areaLost = earlierYear.area - year.area;

export const agricultureDashboard = {
  title: "Agriculture",
  description: "Wetland paddy area, rice harvests and district output from Kerala’s published crop surveys.",
  icon: "Leaf",
  accent: "#226c46",
  measures: [
    { label: "Wetland paddy area", value: `${n.format(year.area)} ha`, note: "All seasons · FY 2024–25", source: annualSource },
    { label: "Annual wetland rice", value: `${n.format(year.output)} tonnes`, note: "All seasons · FY 2024–25", source: annualSource },
    { label: "Annual wetland rice yield", value: `${n.format(year.yield)} kg/ha`, note: "All seasons · FY 2024–25", source: annualSource },
    { label: "Winter wetland rice", value: `${n.format(winter[1].output)} tonnes`, note: "Winter season only · FY 2025–26", source: winterSource },
  ],
  attention: [
    {
      title: "Winter rice output rose", value: `${rise}% higher`,
      detail: `The FY 2025–26 winter crop reached ${n.format(winter[1].output)} tonnes. Compare the area and yield changes with the same season a year earlier.`,
      sources: [winterSource, winterPriorSource], section: "winter-comparison",
    },
    {
      title: "Winter production is concentrated", value: `${palakkadShare}% in Palakkad`,
      detail: `Palakkad produced ${n.format(districtWinter[0].value)} tonnes of wetland rice this winter. Review how local crop conditions could affect the statewide harvest.`,
      sources: [winterSource], section: "winter-districts",
    },
    {
      title: "Annual wetland paddy area fell", value: `${n.format(Math.round(areaLost))} ha less`,
      detail: `From FY 2023–24 to FY 2024–25, statewide area fell while output stayed close to ${n.format(Math.round(year.output))} tonnes. Review where the area contracted.`,
      sources: [annualSource], section: "annual-wetland",
    },
  ],
  charts: [
    {
      id: "winter-comparison", title: "Winter rice harvests", period: "Wetland winter season · FY 2024–25 and FY 2025–26",
      kind: "trend", sources: [winterSource, winterPriorSource], unit: "tonnes",
      rows: winter.map(({ year, output }) => ({ label: year, value: output })),
      details: {
        columns: ["Financial year", "Area (ha)", "Rice (tonnes)", "Yield (kg/ha)"],
        rows: winter.map(({ year, area, output }) => [year, area, n.format(output), Math.round(output * 1000 / area)]),
      },
      note: "Yield is calculated from reported output and area. Both observations refer to the winter crop only.",
    },
    {
      id: "winter-districts", title: "Winter rice by district", period: "Six largest producers · Winter FY 2025–26",
      sources: [winterSource], unit: "tonnes", rows: districtWinter.slice(0, 6),
      details: { columns: ["District", "Area (ha)", "Rice (tonnes)"], rows: districtWinter.map(({ label, area, value }) => [label, area, n.format(value)]) },
    },
    {
      id: "annual-wetland", title: "Annual wetland paddy area", period: "All seasons · FY 2022–23 to FY 2024–25",
      kind: "trend", sources: [annualSource], unit: "ha",
      rows: annualWetland.map(({ year, area }) => ({ label: year, value: area })),
      details: { columns: ["Financial year", "Area (ha)", "Rice (tonnes)", "Yield (kg/ha)"], rows: annualWetland.map(({ year, area, output, yield: productivity }) => [year, area, output, productivity]) },
    },
    {
      id: "season-mix", title: "Rice production by season", period: "Annual total · FY 2024–25",
      kind: "composition", sources: [annualSource], unit: "tonnes",
      rows: [
        { label: "Autumn · Virippu", value: 115289.88 },
        { label: "Winter · Mundakan", value: 209109.50 },
        { label: "Summer · Puncha", value: 205824.47 },
      ],
      note: "Season totals are individually rounded in the published report.",
    },
  ],
} satisfies DepartmentDashboardData;
