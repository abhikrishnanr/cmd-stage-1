import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const coverSource = {
  source: "Forest Survey of India",
  dataset: "India State of Forest Report 2023 · Vol. 2, Tables 10.13.2–10.13.3",
  url: "https://fsi.nic.in/uploads/isfr2023/isfr_book_eng-vol-2_2023.pdf",
  period: "2023 assessment against the 2021 raster baseline",
  basis: "Satellite-mapped canopy density across Kerala. District changes use the comparable 2021 raster data in the 2023 report.",
  sourceUpdatedAt: "21 Dec 2024",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const wildlifeSource = {
  source: "Kerala Forest and Wildlife Department · State Planning Board",
  dataset: "Economic Review 2025 · Vol. 1, Table 3.6.4",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume1%20Eng%20final.pdf",
  period: "FY 2024–25",
  basis: "Reported deaths in the published species table. The table reports snakebites outside forests separately.",
  sourceUpdatedAt: "4 Feb 2026 (release notice)",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const compensationSource = {
  ...wildlifeSource,
  dataset: "Economic Review 2025 · Vol. 1, Table 3.6.3",
  basis: "Settled compensation claims and amounts disbursed by claim category.",
} satisfies DepartmentSource;

const coverClasses = [
  { label: "Very dense", value: 2041.17, minimum: "70% or more", color: "#15563d" },
  { label: "Moderately dense", value: 9321.82, minimum: "40% to under 70%", color: "#278264" },
  { label: "Open forest", value: 10696.37, minimum: "10% to under 40%", color: "#b28224" },
];

const districts = [
  { label: "Kozhikode", value: 80.26, area: 1882.06, change: 8.87 },
  { label: "Wayanad", value: 74.80, area: 1593.34, change: 0.45 },
  { label: "Idukki", value: 73.71, area: 3210.92, change: 5.06 },
  { label: "Thiruvananthapuram", value: 63.70, area: 1394.47, change: 10.09 },
  { label: "Kannur", value: 61.87, area: 1832.09, change: 28.66 },
  { label: "Kottayam", value: 60.91, area: 1343.77, change: -7.10 },
  { label: "Malappuram", value: 60.91, area: 2164.83, change: 3.52 },
  { label: "Kasaragod", value: 57.22, area: 1138.03, change: 36.16 },
  { label: "Pathanamthitta", value: 51.15, area: 1356.48, change: 4.23 },
  { label: "Kollam", value: 48.19, area: 1196.58, change: 12.12 },
  { label: "Ernakulam", value: 47.96, area: 1469.01, change: -2.00 },
  { label: "Palakkad", value: 45.67, area: 2046.83, change: 23.18 },
  { label: "Thrissur", value: 42.62, area: 1290.03, change: 10.79 },
  { label: "Alappuzha", value: 9.96, area: 140.92, change: -0.61 },
];

const fatalIncidents = [
  { label: "Elephant", value: 19, color: "#a04c32" },
  { label: "Wild pig", value: 11, color: "#b5722e" },
  { label: "Tiger", value: 1, color: "#68638b" },
  { label: "Gaur", value: 1, color: "#68638b" },
  { label: "Other wildlife", value: 1, color: "#68638b" },
];

const compensationClaims = [
  { label: "Crop or property loss", value: 6295, paid: 538.56, color: "#276d59" },
  { label: "Injury", value: 1705, paid: 578.34, color: "#396794" },
  { label: "Livestock loss", value: 466, paid: 166.67, color: "#a77628" },
  { label: "Death", value: 67, paid: 797, color: "#a04c32" },
];

const whole = new Intl.NumberFormat("en-IN");
const signedArea = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: "exceptZero",
});
const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const forestArea = coverClasses.reduce((sum, row) => sum + row.value, 0);
const reportedDeaths = fatalIncidents.reduce((sum, row) => sum + row.value, 0);
const leadSpeciesDeaths = fatalIncidents[0].value + fatalIncidents[1].value;
const claims = compensationClaims.reduce((sum, row) => sum + row.value, 0);
const claimsPaid = compensationClaims.reduce((sum, row) => sum + row.paid, 0);
const landOrPropertyShare = (100 * compensationClaims[0].value / claims).toFixed(1);

export const forestWildlifeDashboard = {
  title: "Forest & Wildlife",
  description: "Kerala’s satellite-assessed forest cover, local changes and the reported human impact of wildlife conflict.",
  icon: "Trees",
  accent: "#176345",
  measures: [
    { label: "Mapped forest cover", value: `${decimal.format(forestArea)} km²`, note: "56.78% of Kerala’s area · 2023 assessment", source: coverSource },
    { label: "Forest cover change", value: "+133.42 km²", note: "2023 against the 2021 raster baseline", source: coverSource },
    { label: "Reported conflict deaths", value: whole.format(reportedDeaths), note: "Excludes snakebites outside forests · FY 2024–25", source: wildlifeSource },
    { label: "Compensation claims settled", value: whole.format(claims), note: `₹${decimal.format(claimsPaid / 100)} crore paid · FY 2024–25`, source: compensationSource },
  ],
  attention: [
    {
      title: "Forest cover fell in three districts",
      value: "7.10 km² decline in Kottayam",
      detail: "Kottayam recorded the largest decline against the 2021 raster baseline. Ernakulam lost 2.00 km² and Alappuzha lost 0.61 km². Review the affected sites with district teams.",
      sources: [coverSource],
      section: "district-forest-cover",
    },
    {
      title: "Elephants and wild pigs account for most deaths",
      value: `${leadSpeciesDeaths} of ${reportedDeaths} deaths`,
      detail: "Elephants accounted for 19 reported deaths and wild pigs for 11 in FY 2024–25. Use the species breakdown to review prevention and rapid response plans.",
      sources: [wildlifeSource],
      section: "fatal-wildlife-conflict",
    },
    {
      title: "Most settled claims concern crops or property",
      value: `${landOrPropertyShare}% of settlements`,
      detail: "Crop and property loss accounted for 6,295 settled claims. Check the district claims register when reviewing prevention work and compensation delivery.",
      sources: [compensationSource],
      section: "wildlife-compensation",
    },
  ],
  charts: [
    {
      id: "forest-density",
      title: "Forest cover by canopy density",
      period: "Kerala · 2023 assessment",
      kind: "composition",
      unit: "km²",
      sources: [coverSource],
      rows: coverClasses,
      note: "The satellite assessment includes qualifying plantations. The 21.88 km² classified as scrub are excluded from the forest cover total.",
      details: {
        columns: ["Canopy class", "Canopy density", "Area (km²)"],
        rows: coverClasses.map(({ label, value, minimum }) => [label, minimum, decimal.format(value)]),
      },
    },
    {
      id: "district-forest-cover",
      title: "Forest cover by district",
      period: "Five highest shares of district area · 2023 assessment",
      unit: "%",
      sources: [coverSource],
      rows: districts.slice(0, 5),
      note: "Open the table for all 14 districts and their change in km² against the 2021 raster baseline.",
      details: {
        columns: ["District", "Forest cover (km²)", "District area covered", "Change (km²)"],
        rows: districts.map(({ label, value, area, change }) => [label, decimal.format(area), `${decimal.format(value)}%`, signedArea.format(change)]),
      },
    },
    {
      id: "fatal-wildlife-conflict",
      title: "Reported deaths by animal",
      period: "Kerala · FY 2024–25",
      unit: "deaths",
      sources: [wildlifeSource],
      rows: fatalIncidents,
      note: "The published total of 33 excludes 34 deaths from snakebites outside forests, which the same table records separately.",
      details: {
        columns: ["Animal", "Reported deaths"],
        rows: [...fatalIncidents.map(({ label, value }) => [label, value]), ["Total", reportedDeaths]],
      },
    },
    {
      id: "wildlife-compensation",
      title: "Wildlife conflict compensation",
      period: "Settled claims · FY 2024–25",
      kind: "composition",
      unit: "claims",
      sources: [compensationSource],
      rows: compensationClaims,
      note: "Settlement totals follow the compensation register. Open the table to see amounts paid by claim category.",
      details: {
        columns: ["Claim category", "Settled claims", "Paid (₹ lakh)"],
        rows: [...compensationClaims.map(({ label, value, paid }) => [label, value, decimal.format(paid)]), ["Total", claims, decimal.format(claimsPaid)]],
      },
    },
  ],
} satisfies DepartmentDashboardData;
