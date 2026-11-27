import { TrendPoint } from "./types";

export const budgetSummary = {
  allocated: "₹1,84,000 Cr",
  expenditure: "₹1,06,720 Cr",
  utilisation: 58,
  planAllocated: "₹38,600 Cr",
  planSpent: "₹21,500 Cr",
  planUtil: 56,
  surrenderRisk: "₹4,200 Cr",
};

export const sectorUtilisation = [
  { sector: "Education", alloc: 6200, spent: 4150 },
  { sector: "Health", alloc: 5400, spent: 3500 },
  { sector: "Agriculture", alloc: 3100, spent: 1480 },
  { sector: "LSGD / Rural", alloc: 7600, spent: 4900 },
  { sector: "Industries", alloc: 2900, spent: 1380 },
  { sector: "Water Resources", alloc: 3400, spent: 1620 },
  { sector: "SC/ST Welfare", alloc: 2400, spent: 1560 },
];

export const deptAbsorption = [
  { dept: "Local Self Government", util: 72, rag: "green" as const },
  { dept: "Health & Family Welfare", util: 65, rag: "amber" as const },
  { dept: "General Education", util: 67, rag: "amber" as const },
  { dept: "Social Justice", util: 64, rag: "amber" as const },
  { dept: "Agriculture", util: 48, rag: "red" as const },
  { dept: "Industries", util: 48, rag: "red" as const },
  { dept: "Water Resources", util: 47, rag: "red" as const },
  { dept: "SC Development", util: 71, rag: "green" as const },
  { dept: "Fisheries", util: 44, rag: "red" as const },
  { dept: "Power", util: 69, rag: "amber" as const },
];

export const treasuryReleases: TrendPoint[] = [
  { label: "Apr", value: 1200 }, { label: "May", value: 1600 }, { label: "Jun", value: 2100 },
  { label: "Jul", value: 1900 }, { label: "Aug", value: 2400 }, { label: "Sep", value: 2200 },
  { label: "Oct", value: 2600 }, { label: "Nov", value: 2900 }, { label: "Dec", value: 3100 },
  { label: "Jan", value: 2700 }, { label: "Feb", value: 3000 }, { label: "Mar", value: 3300 },
];

export const schemeUtilisation = [
  { scheme: "PMAY-G Housing", dept: "LSGD", alloc: "₹2,400 Cr", util: 73, rag: "green" as const },
  { scheme: "Aardram Mission (Health)", dept: "Health", alloc: "₹1,800 Cr", util: 61, rag: "amber" as const },
  { scheme: "Subhiksha Keralam (Agri)", dept: "Agriculture", alloc: "₹1,200 Cr", util: 44, rag: "red" as const },
  { scheme: "K-FON Digital", dept: "IT", alloc: "₹900 Cr", util: 52, rag: "amber" as const },
  { scheme: "Jaladhara Water", dept: "Water Resources", alloc: "₹1,500 Cr", util: 41, rag: "red" as const },
  { scheme: "SC/ST Hostel Upgrade", dept: "SC Dev", alloc: "₹600 Cr", util: 68, rag: "amber" as const },
];
