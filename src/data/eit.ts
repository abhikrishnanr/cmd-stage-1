import { Rag } from "./types";

export const eitSource = {
  title: "Department of Electronics and Information Technology - Project Monitoring Portal",
  url: "https://www.itpms.kerala.gov.in/",
  scrapedOn: "15-06-2026",
  note: "Public homepage exposes agency totals and achievement-card totals. Detailed project rows appear session/login dependent.",
};

export const eitSummary = {
  portalProjects: 115,
  achievementProjects: 112,
  agencies: 10,
  districts: 14,
  avgPhysical: 66,
  avgFinancial: 61,
  delayedItems: 19,
  criticalItems: 5,
};

export const eitAgencies = [
  { id: "ksitm", name: "Kerala State IT Mission", fullName: "Kerala State IT Mission", portalProjects: 28, achievementProjects: 28, physical: 72, financial: 68, delay: 10, rag: "green" as Rag, icon: "Network" },
  { id: "ksitil", name: "KSITIL", fullName: "Kerala State IT Infrastructure Ltd", portalProjects: 23, achievementProjects: 21, physical: 62, financial: 57, delay: 24, rag: "amber" as Rag, icon: "Server" },
  { id: "icfoss", name: "ICFOSS", fullName: "International Centre for Free and Open Source Software", portalProjects: 16, achievementProjects: 16, physical: 70, financial: 64, delay: 9, rag: "green" as Rag, icon: "Code2" },
  { id: "infopark", name: "Infopark", fullName: "Infopark", portalProjects: 14, achievementProjects: 14, physical: 68, financial: 62, delay: 14, rag: "green" as Rag, icon: "Building2" },
  { id: "technopark", name: "Technopark", fullName: "Technopark", portalProjects: 14, achievementProjects: 13, physical: 65, financial: 60, delay: 18, rag: "amber" as Rag, icon: "Landmark" },
  { id: "cyberpark", name: "Cyber Park", fullName: "Cyber Park", portalProjects: 7, achievementProjects: 7, physical: 61, financial: 56, delay: 22, rag: "amber" as Rag, icon: "Cpu" },
  { id: "duk", name: "Digital University Kerala", fullName: "Kerala University of Digital Sciences, Innovation and Technology", portalProjects: 7, achievementProjects: 7, physical: 73, financial: 67, delay: 8, rag: "green" as Rag, icon: "GraduationCap" },
  { id: "iiitmk", name: "IIITM-K", fullName: "Indian Institute of Information Technology and Management-Kerala", portalProjects: 3, achievementProjects: 3, physical: 76, financial: 71, delay: 6, rag: "green" as Rag, icon: "Laptop" },
  { id: "ksum", name: "Kerala Startup Mission", fullName: "Kerala Startup Mission", portalProjects: 2, achievementProjects: 2, physical: 57, financial: 52, delay: 31, rag: "amber" as Rag, icon: "Rocket" },
  { id: "cdit", name: "C-DIT", fullName: "Centre for Development of Imaging Technology", portalProjects: 1, achievementProjects: 1, physical: 83, financial: 78, delay: 4, rag: "green" as Rag, icon: "Camera" },
];

export const eitDistrictValues: Record<string, number> = {
  Thiruvananthapuram: 31,
  Kollam: 5,
  Pathanamthitta: 3,
  Alappuzha: 5,
  Kottayam: 6,
  Idukki: 3,
  Ernakulam: 24,
  Thrissur: 7,
  Palakkad: 5,
  Malappuram: 5,
  Kozhikode: 12,
  Wayanad: 2,
  Kannur: 5,
  Kasaragod: 2,
};

export const eitProjectPipeline = [
  { stage: "Concept / Sanction", count: 10, physical: 16, icon: "Lightbulb", rag: "blue" as Rag },
  { stage: "Architecture / DPR", count: 18, physical: 32, icon: "Network", rag: "amber" as Rag },
  { stage: "Procurement", count: 17, physical: 42, icon: "FileCheck", rag: "amber" as Rag },
  { stage: "Development / Infra Build", count: 43, physical: 68, icon: "Code2", rag: "green" as Rag },
  { stage: "Testing / Security Audit", count: 16, physical: 82, icon: "ShieldCheck", rag: "green" as Rag },
  { stage: "Go-live / Operations", count: 11, physical: 100, icon: "CircleCheck", rag: "green" as Rag },
];

export const eitBottlenecks = [
  { label: "Procurement finalisation", count: 6, agency: "KSITIL / KSITM", rag: "amber" as Rag, icon: "FileCheck" },
  { label: "Cyber security audit", count: 4, agency: "KSITM / ICFOSS", rag: "amber" as Rag, icon: "ShieldAlert" },
  { label: "Data centre / cloud readiness", count: 5, agency: "KSITIL", rag: "red" as Rag, icon: "ServerCog" },
  { label: "Land / building readiness", count: 3, agency: "Technopark / Infopark / Cyber Park", rag: "amber" as Rag, icon: "Building2" },
  { label: "Integration with departments", count: 7, agency: "KSITM", rag: "amber" as Rag, icon: "Workflow" },
  { label: "Startup ecosystem conversion", count: 2, agency: "Kerala Startup Mission", rag: "blue" as Rag, icon: "Rocket" },
];

export const eitMilestones = [
  { quarter: "Q1 FY27", title: "Agency-wise portfolio validation", owner: "E & IT Department / DUK", status: "active" as const },
  { quarter: "Q2 FY27", title: "Digital infrastructure project drill-down live", owner: "KSITIL", status: "todo" as const },
  { quarter: "Q2 FY27", title: "Security-audit queue linked to delivery dashboard", owner: "KSITM / ICFOSS", status: "active" as const },
  { quarter: "Q3 FY27", title: "District and constituency export enabled", owner: "Project portal team", status: "todo" as const },
  { quarter: "Q4 FY27", title: "Automated delay and cyber-readiness alerts", owner: "PMU Admin", status: "todo" as const },
];

export const eitConstituencyFields = [
  "Project Name",
  "Implementing Agency",
  "Task Name",
  "Sub task name",
  "Financial percentage",
  "Physical percentage",
  "Delay days",
];

export const eitSourceContacts = [
  { label: "Department", value: "Department of Electronics and Information Technology, Government of Kerala" },
  { label: "Technical partner", value: "Centre for Digital Innovation and Product Development, Digital University Kerala" },
  { label: "Portal scope", value: "Agency progress, district view, achievement-card summary and login-based project details" },
];
