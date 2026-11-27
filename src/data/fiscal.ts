import { TrendPoint } from "./types";

export const fiscalPulse = [
  { label: "Outstanding Liabilities", value: "₹5.07L Cr", sub: "35.5% of GSDP", rag: "red" as const, icon: "Landmark" },
  { label: "Inherited Arrears", value: "₹48,733 Cr", sub: "DA + DR + contractors", rag: "red" as const, icon: "FileWarning" },
  { label: "Central Transfer Shortfall", value: "₹20,500 Cr", sub: "2026-27", rag: "amber" as const, icon: "TrendingDown" },
  { label: "Committed Expenditure", value: "77.6%", sub: "of revenue receipts", rag: "red" as const, icon: "PieChart" },
  { label: "PSE Net Loss", value: "₹1,962.73 Cr", sub: "FY 2024-25", rag: "amber" as const, icon: "Building2" },
  { label: "KIIFB Obligation", value: "₹56,000 Cr", sub: "combined forward", rag: "amber" as const, icon: "Banknote" },
];

export const fiscalKpis = [
  { label: "Outstanding Liabilities", value: "₹5.07L Cr", sub: "35.5% GSDP", rag: "red" as const },
  { label: "Inherited Arrears", value: "₹48,733 Cr", sub: "DA+DR+contractors", rag: "red" as const },
  { label: "Central Transfer Shortfall", value: "₹20,500 Cr", sub: "2026-27", rag: "amber" as const },
  { label: "Committed Expenditure", value: "77.6%", sub: "of revenue receipts", rag: "red" as const },
  { label: "Interest Payment Share", value: "20.9%", sub: "of revenue", rag: "amber" as const },
  { label: "Capital Expenditure", value: "1.3%", sub: "of GSDP", rag: "red" as const },
  { label: "KIIFB Obligation", value: "₹56,000 Cr", sub: "forward exposure", rag: "amber" as const },
  { label: "PSE Net Loss", value: "₹1,962.73 Cr", sub: "FY 2024-25", rag: "amber" as const },
];

export const arrearsComposition = [
  { label: "DA arrears", value: 21670, color: "var(--color-c-violet)" },
  { label: "DR arrears", value: 14387, color: "var(--color-c-blue)" },
  { label: "Bill discounting", value: 3431, color: "var(--color-c-orange)" },
  { label: "UGC DA arrears", value: 1500, color: "var(--color-c-teal)" },
  { label: "SHA / KASP", value: 2017, color: "var(--color-c-pink)" },
  { label: "Supplyco", value: 2893, color: "var(--color-c-green)" },
  { label: "KMSCL", value: 476, color: "#64748b" },
  { label: "SC/ST scholarships", value: 377, color: "#0ea5e9" },
  { label: "LSGD third instalment", value: 1982, color: "#8b5cf6" },
];

export const committedExpenditure: TrendPoint[] = [
  { label: "Salaries", value: 34 },
  { label: "Pensions", value: 22.7 },
  { label: "Interest", value: 20.9 },
  { label: "Discretionary", value: 22.4 },
];

export const interestBurden: TrendPoint[] = [
  { label: "FY21", value: 16.1 }, { label: "FY22", value: 17.4 }, { label: "FY23", value: 18.6 },
  { label: "FY24", value: 19.5 }, { label: "FY25", value: 20.2 }, { label: "FY26", value: 20.9 },
];

export const capexGap: TrendPoint[] = [
  { label: "FY22", value: 4.9, v2: 14 }, { label: "FY23", value: 5.18, v2: 14 },
  { label: "FY24", value: 3.1, v2: 14 }, { label: "FY25", value: 2.0, v2: 14 },
  { label: "FY26", value: 1.3, v2: 14 },
];

export const indiraCommitment = "₹16,996 Cr/yr";
export const investmentGrounding = 31; // % IGR
