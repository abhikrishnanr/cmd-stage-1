import type { TransportSource } from "./transportActuals";

export const waterSources = {
  connections: {
    source: "Kerala Water Authority", dataset: "Water Connection Statistics · published connection data",
    url: "https://kwa.kerala.gov.in/wp-content/plugins/kwa-matrix/assets/js/connection-statistics.js",
    period: "Snapshot checked 27 Nov 2026", basis: "Official statewide counts by category and published section records",
    sourceUpdatedAt: "27 Nov 2026, 12:30 am IST (source file modified)", fetchedAt: "27 Nov 2026",
  },
  connectionPortal: {
    source: "Kerala Water Authority", dataset: "Water Connection Statistics · office directory",
    url: "https://kwa.kerala.gov.in/en/connection-statistics/",
    period: "Snapshot checked 27 Nov 2026", basis: "KWA’s public view of statewide and office-wise statistics",
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
  rightToService: {
    source: "Kerala Water Authority", dataset: "Right to Service · water connections",
    url: "https://kwa.kerala.gov.in/en/right-to-service/",
    period: "Service standards checked 27 Nov 2026", basis: "Statutory service limit and designated authorities",
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

// Highest section totals derived from non-null records in the KWA data file.
export const waterTopSections = [
  { label: "Karuvelipady", value: 75296 },
  { label: "Palakkad", value: 72976 },
  { label: "Malapparamba", value: 71827 },
  { label: "North Paravur", value: 68892 },
  { label: "Cherthala", value: 68583 },
  { label: "Kannur", value: 63843 },
  { label: "Varkala", value: 58535 },
];

export const waterQuality = {
  total: 679429,
  physicoChemicalLab: 184626,
  bacteriologicalLab: 288763,
  treatedWaterField: 206040,
  failedTreatedSamples: 62471,
};

// Annexure 11C, Part I of KWA's 2024–25 Administrative Report.
export const waterQualityMonthly = [
  { month: "Apr 2024", short: "Apr", tested: 16298, failed: 6112 },
  { month: "May 2024", short: "May", tested: 19183, failed: 7415 },
  { month: "Jun 2024", short: "Jun", tested: 16001, failed: 5117 },
  { month: "Jul 2024", short: "Jul", tested: 17997, failed: 5671 },
  { month: "Aug 2024", short: "Aug", tested: 18197, failed: 6103 },
  { month: "Sep 2024", short: "Sep", tested: 16256, failed: 4519 },
  { month: "Oct 2024", short: "Oct", tested: 18585, failed: 4732 },
  { month: "Nov 2024", short: "Nov", tested: 18600, failed: 4684 },
  { month: "Dec 2024", short: "Dec", tested: 20608, failed: 5727 },
  { month: "Jan 2025", short: "Jan", tested: 19572, failed: 5357 },
  { month: "Feb 2025", short: "Feb", tested: 14595, failed: 3937 },
  { month: "Mar 2025", short: "Mar", tested: 10148, failed: 3097 },
];
