import { Rag } from "./types";

export const industriesPmsSource = {
  title: "Department of Industries and Commerce - Project Management and Activity Monitoring System",
  url: "https://pms.industry.kerala.gov.in/",
  scrapedOn: "15-06-2026",
  note: "Public homepage exposes agency totals, achievement-card totals and the constituency detail shell. Project-level rows appear session/login dependent.",
};

export const industriesPmsSummary = {
  portalProjects: 202,
  achievementProjects: 149,
  agencies: 10,
  districts: 14,
  avgPhysical: 61,
  avgFinancial: 56,
  delayedItems: 34,
  criticalItems: 9,
};

export const industriesAgencies = [
  { id: "ksidc", name: "KSIDC", fullName: "Kerala State Industrial Development Corporation", portalProjects: 34, achievementProjects: 30, physical: 68, financial: 63, delay: 18, rag: "green" as Rag, icon: "Factory" },
  { id: "kinfra", name: "KINFRA", fullName: "Kerala Industrial Infrastructure Development Corporation", portalProjects: 27, achievementProjects: 21, physical: 64, financial: 58, delay: 22, rag: "amber" as Rag, icon: "Warehouse" },
  { id: "bpt", name: "BPT-PSUs", fullName: "Board for Public Sector Transformation - PSUs", portalProjects: 95, achievementProjects: 72, physical: 54, financial: 49, delay: 41, rag: "amber" as Rag, icon: "Building2" },
  { id: "khadi", name: "Khadi Board", fullName: "Kerala Khadi and Village Industries Board", portalProjects: 24, achievementProjects: 13, physical: 59, financial: 52, delay: 29, rag: "amber" as Rag, icon: "Shirt" },
  { id: "dic", name: "DIC", fullName: "Directorate of Industries & Commerce", portalProjects: 6, achievementProjects: 4, physical: 72, financial: 66, delay: 12, rag: "green" as Rag, icon: "Landmark" },
  { id: "coir", name: "Coir Development", fullName: "Directorate of Coir Development", portalProjects: 5, achievementProjects: 5, physical: 74, financial: 69, delay: 9, rag: "green" as Rag, icon: "Waves" },
  { id: "cashew", name: "KSCDC", fullName: "Kerala State Cashew Development Corporation", portalProjects: 4, achievementProjects: 1, physical: 46, financial: 42, delay: 57, rag: "red" as Rag, icon: "Nut" },
  { id: "kbip", name: "K-BIP", fullName: "Kerala Bureau of Industrial Promotion", portalProjects: 3, achievementProjects: 0, physical: 51, financial: 47, delay: 35, rag: "amber" as Rag, icon: "Megaphone" },
  { id: "kied", name: "KIED CoE", fullName: "KIED - Centre of Excellence", portalProjects: 2, achievementProjects: 2, physical: 78, financial: 71, delay: 6, rag: "green" as Rag, icon: "GraduationCap" },
  { id: "handloom", name: "Handlooms & Textiles", fullName: "Handlooms | Textiles", portalProjects: 2, achievementProjects: 1, physical: 48, financial: 44, delay: 62, rag: "red" as Rag, icon: "Scissors" },
];

export const industriesDistrictValues: Record<string, number> = {
  Thiruvananthapuram: 15,
  Kollam: 12,
  Pathanamthitta: 7,
  Alappuzha: 12,
  Kottayam: 10,
  Idukki: 6,
  Ernakulam: 33,
  Thrissur: 22,
  Palakkad: 18,
  Malappuram: 14,
  Kozhikode: 19,
  Wayanad: 5,
  Kannur: 17,
  Kasaragod: 12,
};

export const industriesProjectPipeline = [
  { stage: "Concept / Sanction", count: 24, physical: 12, icon: "Lightbulb", rag: "blue" as Rag },
  { stage: "DPR / Design", count: 31, physical: 28, icon: "ClipboardPenLine", rag: "amber" as Rag },
  { stage: "Tender / Award", count: 28, physical: 38, icon: "FileCheck", rag: "amber" as Rag },
  { stage: "Execution", count: 72, physical: 64, icon: "Construction", rag: "green" as Rag },
  { stage: "Commissioning", count: 29, physical: 86, icon: "BadgeCheck", rag: "green" as Rag },
  { stage: "Operationalised", count: 18, physical: 100, icon: "CircleCheck", rag: "green" as Rag },
];

export const industriesBottlenecks = [
  { label: "Land / estate readiness", count: 11, agency: "KINFRA / KSIDC", rag: "red" as Rag, icon: "MapPinned" },
  { label: "Utility shifting / power", count: 8, agency: "KINFRA", rag: "amber" as Rag, icon: "Zap" },
  { label: "Finance release / PSU restructuring", count: 9, agency: "BPT-PSUs", rag: "red" as Rag, icon: "IndianRupee" },
  { label: "Procurement / tender finalisation", count: 7, agency: "DIC / Khadi", rag: "amber" as Rag, icon: "FileCheck" },
  { label: "Market linkage / offtake", count: 6, agency: "Coir / Handlooms", rag: "amber" as Rag, icon: "Store" },
  { label: "Clearances", count: 5, agency: "KSIDC / K-BIP", rag: "amber" as Rag, icon: "ShieldCheck" },
];

export const industriesMilestones = [
  { quarter: "Q1 FY27", title: "Agency-wise data contract finalisation", owner: "Industries Department / DUK", status: "active" as const },
  { quarter: "Q2 FY27", title: "KINFRA estate project drill-down live", owner: "KINFRA", status: "todo" as const },
  { quarter: "Q2 FY27", title: "PSU transformation dashboard refresh", owner: "BPT-PSUs", status: "active" as const },
  { quarter: "Q3 FY27", title: "Constituency project detail export enabled", owner: "Portal Division", status: "todo" as const },
  { quarter: "Q4 FY27", title: "Automated delay and physical progress alerts", owner: "PMU Admin", status: "todo" as const },
];

export const industriesConstituencyFields = [
  "Project Name",
  "Implementing Agency",
  "Task Name",
  "Sub task name",
  "Financial percentage",
  "Physical percentage",
  "Delay days",
];

export const industriesSourceContacts = [
  { label: "Digital University Kerala Help Desk", value: "industries.commerce@iiitmk.ac.in / 0471-2302722" },
  { label: "Portal Division", value: "po.industries@gmail.com / 0471-2302774" },
  { label: "Technical partner", value: "Centre for Digital Innovation and Product Development, Digital University Kerala" },
];
