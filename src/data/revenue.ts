import { TrendPoint } from "./types";

export const revenueSummary = {
  target: "₹1,38,000 Cr",
  actual: "₹1,12,400 Cr",
  achievedPct: 81,
  arrears: "₹24,462 Cr",
  recovered: "₹6,180 Cr",
  buoyancy: 0.92,
};

export const revenueStreams = [
  { stream: "SGST", target: 58000, actual: 49600, rag: "amber" as const, icon: "Coins" },
  { stream: "GST State Share (IGST)", target: 22000, actual: 18900, rag: "amber" as const, icon: "Landmark" },
  { stream: "Land Revenue (ReLIS)", target: 9800, actual: 8100, rag: "amber" as const, icon: "Map" },
  { stream: "Stamp Duty & Registration", target: 14500, actual: 12700, rag: "green" as const, icon: "FileText" },
  { stream: "State Excise", target: 20400, actual: 17600, rag: "amber" as const, icon: "Wine" },
  { stream: "Motor Vehicles Tax", target: 6200, actual: 5500, rag: "green" as const, icon: "Car" },
];

export const revenueBuoyancy: TrendPoint[] = [
  { label: "FY21", value: 0.71 }, { label: "FY22", value: 0.78 }, { label: "FY23", value: 0.84 },
  { label: "FY24", value: 0.88 }, { label: "FY25", value: 0.90 }, { label: "FY26", value: 0.92 },
];

export const arrearsRecovery = [
  { stage: "Identified", value: 24462, color: "var(--color-c-violet)" },
  { stage: "Notice Issued", value: 16800, color: "var(--color-c-blue)" },
  { stage: "Under Recovery", value: 9400, color: "var(--color-c-orange)" },
  { stage: "Recovered", value: 6180, color: "var(--color-c-green)" },
];

export const complianceGap = [
  { dept: "Commercial Taxes", value: 38, color: "var(--color-rag-red)" },
  { dept: "Registration (IGR)", value: 21, color: "var(--color-rag-amber)" },
  { dept: "Land Revenue", value: 27, color: "var(--color-rag-amber)" },
  { dept: "State Excise", value: 18, color: "var(--color-rag-amber)" },
  { dept: "Motor Vehicles", value: 11, color: "var(--color-rag-green)" },
];

// district revenue performance (% of target). derived spread.
export const districtRevenue: Record<string, number> = {
  Ernakulam: 104, Thiruvananthapuram: 97, Thrissur: 93, Kozhikode: 91, Kollam: 88,
  Kottayam: 86, Kannur: 84, Malappuram: 82, Palakkad: 79, Alappuzha: 77,
  Pathanamthitta: 90, Idukki: 72, Kasaragod: 74, Wayanad: 68,
};

export const revenueActions = [
  { text: "Deploy Revenue Intelligence Cell audit on top-50 GST defaulters (₹3,200 Cr exposure)", rag: "red" as const, owner: "Revenue Secretary" },
  { text: "Fast-track e-Mutation backlog to unlock stamp duty in Ernakulam & Thrissur", rag: "amber" as const, owner: "Revenue Secretary" },
  { text: "Launch arrears amnesty window to convert ₹9,400 Cr under-recovery", rag: "amber" as const, owner: "Finance Secretary" },
];
