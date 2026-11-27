import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const checked = "27 Nov 2026";
const source = "Kerala Police · State Crime Records Bureau";
const caseBasis = "Police case registrations as published by the State Crime Records Bureau";

const statewideSource = {
  source,
  dataset: "Total cases · BNS/IPC and Special and Local Laws",
  url: "https://keralapolice.gov.in/crime/total-cases",
  period: "Calendar years 2020–25 and January–September 2026",
  basis: `${caseBasis}. The BNS/IPC and Special and Local Laws tables confirm the 2026 reporting window.`,
  sourceUpdatedAt: "11 Nov 2026",
  fetchedAt: checked,
} satisfies DepartmentSource;

const generalLawSource = {
  ...statewideSource,
  dataset: "Cognizable cases under BNS/IPC",
  url: "https://keralapolice.gov.in/crime-statistics/ipc-cases",
} satisfies DepartmentSource;

const specialLawSource = {
  ...statewideSource,
  dataset: "Cognizable cases under Special and Local Laws · NDPS Act row",
  url: "https://keralapolice.gov.in/crime-statistics/sll-cases",
} satisfies DepartmentSource;

const cyberSource = {
  ...statewideSource,
  dataset: "Registered cyber cases",
  url: "https://keralapolice.gov.in/crime-statistics/cyber-cases",
  basis: `${caseBasis}. The 2026 figure covers January through September.`,
} satisfies DepartmentSource;

const childProtectionSource = {
  source,
  dataset: "Cases registered under the POCSO Act by police district",
  url: "https://keralapolice.gov.in/crime/pocso",
  period: "January–September 2026",
  basis: "Case registrations under the Protection of Children from Sexual Offences Act, grouped by the Police reporting units.",
  sourceUpdatedAt: "26 Oct 2026",
  fetchedAt: checked,
} satisfies DepartmentSource;

const statewideAnnual = [
  { label: "2020", general: 149099, special: 405625 },
  { label: "2021", general: 142643, special: 382317 },
  { label: "2022", general: 235858, special: 218978 },
  { label: "2023", general: 258538, special: 325835 },
  { label: "2024", general: 198234, special: 305923 },
  { label: "2025", general: 171822, special: 376626 },
];

const annual = statewideAnnual.map((row) => ({ ...row, value: row.general + row.special }));
const current = { general: 112681, special: 209479, cyber: 2253, ndps: 18108 };

const cyberAnnual = [
  { label: "2020", value: 426 }, { label: "2021", value: 626 }, { label: "2022", value: 773 },
  { label: "2023", value: 3295 }, { label: "2024", value: 3581 }, { label: "2025", value: 2488 },
];

const ndpsAnnual = [
  { label: "2022", value: 26619 }, { label: "2023", value: 30697 },
  { label: "2024", value: 27530 }, { label: "2025", value: 36314 },
];

const childProtectionPoliceUnits = [
  { label: "Thiruvananthapuram City", value: 157 }, { label: "Thiruvananthapuram Rural", value: 297 },
  { label: "Kollam City", value: 155 }, { label: "Kollam Rural", value: 199 }, { label: "Pathanamthitta", value: 171 },
  { label: "Alappuzha", value: 193 }, { label: "Kottayam", value: 137 }, { label: "Idukki", value: 114 },
  { label: "Ernakulam City", value: 108 }, { label: "Ernakulam Rural", value: 189 }, { label: "Thrissur City", value: 144 },
  { label: "Thrissur Rural", value: 146 }, { label: "Palakkad", value: 196 }, { label: "Malappuram", value: 372 },
  { label: "Kozhikode City", value: 121 }, { label: "Kozhikode Rural", value: 175 }, { label: "Wayanad", value: 142 },
  { label: "Kannur City", value: 76 }, { label: "Kannur Rural", value: 64 }, { label: "Kasaragod", value: 153 },
  { label: "Railway Police", value: 14 },
].sort((a, b) => b.value - a.value);

const childProtectionTotal = childProtectionPoliceUnits.reduce((sum, row) => sum + row.value, 0);
const number = new Intl.NumberFormat("en-IN");
const ndpsIncrease = (ndpsAnnual[3].value / ndpsAnnual[2].value - 1) * 100;

export const homeInternalSecurityDashboard = {
  title: "Home & Internal Security",
  description: "Police case registrations, child protection caseload and selected enforcement series for Kerala.",
  icon: "ShieldCheck",
  accent: "#365d85",
  measures: [
    { label: "Registered cognizable cases", value: number.format(current.general + current.special), source: statewideSource, note: "January–September 2026" },
    { label: "Cases registered under POCSO", value: number.format(childProtectionTotal), source: childProtectionSource, note: "January–September 2026" },
    { label: "Registered cyber cases", value: number.format(current.cyber), source: cyberSource, note: "January–September 2026" },
    { label: "Cases registered under the NDPS Act", value: number.format(current.ndps), source: specialLawSource, note: "January–September 2026" },
  ],
  attention: [
    {
      title: "Child protection caseload", value: `${number.format(childProtectionTotal)} cases`,
      detail: `Malappuram recorded ${childProtectionPoliceUnits[0].value}, the highest count across the listed police units. Review case follow-up and victim support capacity alongside the raw counts.`,
      sources: [childProtectionSource], section: "child-protection",
    },
    {
      title: "Drug-law registrations rose in 2025", value: `Up ${ndpsIncrease.toFixed(1)}%`,
      detail: `NDPS registrations rose from ${number.format(ndpsAnnual[2].value)} in 2024 to ${number.format(ndpsAnnual[3].value)} in 2025. Review the rise alongside changes in enforcement and case disposal.`,
      sources: [specialLawSource], section: "ndps-registrations",
    },
    {
      title: "Cyber case workload", value: `${number.format(current.cyber)} cases`,
      detail: "Kerala Police recorded these cases through September 2026. Review investigation capacity against the current caseload and use completed years for the annual trend.",
      sources: [cyberSource], section: "cyber-registrations",
    },
  ],
  charts: [
    {
      id: "total-registrations", title: "Statewide registered cases by year", period: "Full calendar years · 2020–25",
      sources: [statewideSource, generalLawSource, specialLawSource], kind: "trend", color: "#365d85", unit: "cases", rows: annual,
      note: `The January–September 2026 bulletin records ${number.format(current.general)} BNS/IPC cases and ${number.format(current.special)} Special and Local Laws cases. The chart compares completed calendar years.`,
      details: { columns: ["Year", "BNS/IPC", "Special and Local Laws", "Total"], rows: annual.map((row) => [row.label, row.general, row.special, row.value]) },
    },
    {
      id: "child-protection", title: "POCSO registrations by police unit", period: "January–September 2026 · Eight highest counts",
      sources: [childProtectionSource], color: "#8c4c6f", unit: "cases", rows: childProtectionPoliceUnits.slice(0, 8),
      note: "The table includes all 21 reporting units, including Railway Police. These are raw registered counts from policing jurisdictions of different sizes.",
      details: { columns: ["Police unit", "Registered cases"], rows: childProtectionPoliceUnits.map(({ label, value }) => [label, value]) },
    },
    {
      id: "ndps-registrations", title: "NDPS Act case registrations", period: "Full calendar years · 2022–25", sources: [specialLawSource],
      kind: "trend", color: "#985c23", unit: "cases", rows: ndpsAnnual,
      note: `The separate 2026 bulletin records ${number.format(current.ndps)} cases through September. Registration counts reflect enforcement and reporting activity.`,
    },
    {
      id: "cyber-registrations", title: "Cyber case registrations", period: "Full calendar years · 2020–25", sources: [cyberSource],
      kind: "trend", color: "#3c706e", unit: "cases", rows: cyberAnnual,
      note: "The series measures cases registered by police. The 2026 measure above covers nine months.",
    },
  ],
} satisfies DepartmentDashboardData;
