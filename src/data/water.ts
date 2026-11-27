import type { TransportSource } from "./transportActuals";

export const waterSources = {
  connections: {
    source: "Kerala Water Authority", dataset: "Water Connection Statistics · published connection data",
    url: "https://kwa.kerala.gov.in/wp-content/plugins/kwa-matrix/assets/js/connection-statistics.js",
    period: "Snapshot checked 27 Nov 2026", basis: "Official connection counts by category and KWA office",
    sourceUpdatedAt: "27 Nov 2026, 12:30 am IST (source file modified)",
  },
  quality: {
    source: "Kerala Water Authority", dataset: "Administrative Report 2024–25 · Quality Control, Section 4.1 and Annexure 11C",
    url: "https://kwa.kerala.gov.in/wp-content/uploads/2026/01/Administrative-report-2024-25-Approved.pdf",
    period: "FY 2024–25", basis: "Counts reported by KWA’s Quality Control Wing",
  },
  services: {
    source: "Kerala Water Authority", dataset: "Services Dashboard · water connection fee and service standards",
    url: "https://kwa.kerala.gov.in/en/services-dashboard/",
    period: "Service standards checked 27 Nov 2026", basis: "Published standard fees and time limits",
  },
} satisfies Record<string, TransportSource>;

export const waterConnections = [
  { label: "Domestic", value: 4221370, color: "#0e7490" },
  { label: "Non-domestic", value: 185413, color: "#2563eb" },
  { label: "Special", value: 10708, color: "#7c3aed" },
  { label: "Industrial", value: 1895, color: "#a16207" },
];

export const waterConnectionTotal = waterConnections.reduce((total, row) => total + row.value, 0);

export const waterOffices = [
  { region: "Southern", connections: 1418821, sectionsWithCounts: 51, sectionsListed: 54 },
  { region: "Northern", connections: 1222520, sectionsWithCounts: 55, sectionsListed: 57 },
  { region: "Central", connections: 1064235, sectionsWithCounts: 37, sectionsListed: 48 },
];

export const waterQuality = {
  total: 679429,
  physicoChemicalLab: 184626,
  bacteriologicalLab: 288763,
  treatedWaterField: 206040,
  failedTreatedSamples: 62471,
};
