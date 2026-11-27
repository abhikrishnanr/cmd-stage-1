import { TrendPoint } from "./types";

export const grievanceSummary = {
  total: "1,42,800", slaRate: 69, pending7: 12400, pending15: 5800, pending30: 2240,
  citizenPainIndex: 58,
};

export const grievanceTrend: TrendPoint[] = [
  { label: "Wk1", value: 8200, v2: 6100 }, { label: "Wk2", value: 8800, v2: 6400 },
  { label: "Wk3", value: 9100, v2: 6600 }, { label: "Wk4", value: 9600, v2: 6900 },
  { label: "Wk5", value: 10200, v2: 7300 }, { label: "Wk6", value: 9800, v2: 7100 },
];

export const deptComplaints = [
  { dept: "LSGD", value: 28400, color: "var(--color-c-violet)" },
  { dept: "Revenue", value: 21200, color: "var(--color-c-blue)" },
  { dept: "Health", value: 17600, color: "var(--color-c-green)" },
  { dept: "Water (KWA)", value: 15800, color: "var(--color-c-orange)" },
  { dept: "Electricity (KSEB)", value: 13400, color: "var(--color-c-teal)" },
  { dept: "PWD", value: 11900, color: "var(--color-c-pink)" },
];

export const grievanceCategories = [
  { label: "Pension delay", value: 22 },
  { label: "Water supply", value: 18 },
  { label: "Road / pothole", value: 16 },
  { label: "Certificate delay", value: 14 },
  { label: "Power outage", value: 12 },
  { label: "Other", value: 18 },
];

export const slaBreachOffices = [
  { office: "Taluk Office, Tirur", dept: "Revenue", pending: 184, oldest: 42, rag: "red" as const },
  { office: "Municipality, Palakkad", dept: "LSGD", pending: 156, oldest: 38, rag: "red" as const },
  { office: "KWA Sub-div, Kasaragod", dept: "Water", pending: 132, oldest: 35, rag: "amber" as const },
  { office: "Village Office, Mananthavady", dept: "Revenue", pending: 118, oldest: 31, rag: "amber" as const },
  { office: "KSEB Section, Idukki", dept: "Power", pending: 96, oldest: 28, rag: "amber" as const },
];

export const repeatClusters = [
  { issue: "Welfare pension not credited", count: 4200, district: "Malappuram", rag: "red" as const },
  { issue: "Drinking water tanker demand", count: 3100, district: "Kasaragod", rag: "amber" as const },
  { issue: "Building permit delay (K-SMART)", count: 2400, district: "Ernakulam", rag: "amber" as const },
];

export const districtGrievances: Record<string, number> = {
  Malappuram: 19800, Thiruvananthapuram: 18400, Ernakulam: 16100, Thrissur: 14200,
  Kozhikode: 15100, Kollam: 13200, Palakkad: 12800, Kannur: 10800, Alappuzha: 11900,
  Kottayam: 8800, Kasaragod: 6900, Idukki: 6100, Pathanamthitta: 5400, Wayanad: 4700,
};
