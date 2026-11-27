import { Ticket, AlertItem, DreamProject, Rag } from "./types";
export { fiscalPulse } from "./fiscal";

export const cmPriorityQueue = [
  { title: "Dengue cluster spike — Palakkad & Wayanad", owner: "Health Secretary", due: "Today", severity: "red" as Rag },
  { title: "₹3,000 pension — 2,340 disbursements stuck (Suneethi feed)", owner: "LSGD Secretary", due: "Jun 16", severity: "amber" as Rag },
  { title: "Vizhinjam phase-2 contractor delay — 38 days slip", owner: "Industries Secretary", due: "Jun 17", severity: "amber" as Rag },
];

export const tickets: Ticket[] = [
  { id: "TK-2041", title: "Critical Dengue Cluster Response Review", priority: "Critical", assignee: "Health Secretary", related: "M-05 · Palakkad", due: "Today 18:00", lastResponse: "Awaiting", status: "Overdue" },
  { id: "TK-2039", title: "KIIFB Exposure & Repayment Cliff Note", priority: "Critical", assignee: "Finance Secretary", related: "Finance · KIIFB", due: "Tomorrow", lastResponse: "2 hr ago", status: "In Review" },
  { id: "TK-2038", title: "Pension Disbursement Backlog — Suneethi", priority: "High", assignee: "LSGD Secretary", related: "Indira · Pension", due: "Jun 16", lastResponse: "Yesterday", status: "Waiting Reply" },
  { id: "TK-2036", title: "Vizhinjam Phase-2 Contractor Delay", priority: "High", assignee: "Industries Secretary", related: "Dream · Port", due: "Jun 17", lastResponse: "3 hr ago", status: "Open" },
  { id: "TK-2034", title: "Revenue Arrears Recovery Plan", priority: "High", assignee: "Revenue Secretary", related: "M-18 · State", due: "Jun 18", lastResponse: "1 day ago", status: "Open" },
  { id: "TK-2031", title: "File Pendency >90 days — Revenue Dept", priority: "Medium", assignee: "Revenue Secretary", related: "M-12 · State", due: "Jun 20", lastResponse: "2 days ago", status: "In Review" },
  { id: "TK-2028", title: "Girl Student Stipend DBT Failures", priority: "Medium", assignee: "Education Secretary", related: "Indira · ₹1000", due: "Jun 21", lastResponse: "4 hr ago", status: "Waiting Reply" },
  { id: "TK-2019", title: "Coastal Erosion Index — Alappuzha", priority: "Watch", assignee: "Revenue Secretary", related: "M-17 · Coast", due: "Jun 25", lastResponse: "Closed", status: "Closed" },
  { id: "TK-2015", title: "MSME Competitiveness Disbursal", priority: "Medium", assignee: "Industries Secretary", related: "Dream · MSME", due: "Jun 24", lastResponse: "1 day ago", status: "Open" },
];

export const ticketSummary = [
  { label: "Open", value: 18, color: "var(--color-rag-blue)" },
  { label: "In Review", value: 11, color: "var(--color-rag-amber)" },
  { label: "Waiting Reply", value: 7, color: "var(--color-c-violet)" },
  { label: "Overdue", value: 4, color: "var(--color-rag-red)" },
  { label: "Closed This Week", value: 23, color: "var(--color-rag-green)" },
];

export const keyAlerts: AlertItem[] = [
  { rag: "red", text: "Dengue positivity up 34% WoW in Palakkad — outbreak threshold breached", owner: "Health Secretary", time: "22 min ago" },
  { rag: "red", text: "Wayanad landslide risk HIGH — 48hr rainfall anomaly +180%", owner: "Disaster Mgmt", time: "1 hr ago" },
  { rag: "amber", text: "Suneethi pension feed delayed 2 hrs — 2,340 records pending", owner: "LSGD Secretary", time: "2 hr ago" },
  { rag: "blue", text: "₹25L health insurance crosses 92.4 lakh families enrolled (+12% YoY)", owner: "Health Secretary", time: "4 hr ago" },
  { rag: "green", text: "Free KSRTC travel — 10.7 lakh daily women riders, satisfaction 93%", owner: "Transport", time: "5 hr ago" },
];

export const ragTicker: AlertItem[] = [
  { rag: "red", text: "Dengue cluster Palakkad — outbreak threshold breached" },
  { rag: "red", text: "Wayanad landslide risk HIGH — evacuate 3 panchayats on standby" },
  { rag: "amber", text: "Pension feed delayed — 2,340 disbursements pending verification" },
  { rag: "blue", text: "Health insurance enrolment crosses 92.4 lakh families" },
  { rag: "green", text: "KSRTC women ridership at all-time high 10.7 lakh/day" },
  { rag: "green", text: "₹3,000 pension paid to 46.8 lakh beneficiaries — 96% on time" },
  { rag: "blue", text: "Vizhinjam container throughput up 21% — Mission Samudra Stage 1" },
  { rag: "red", text: "File pendency >90 days rising in Revenue Dept — 1,240 files" },
];

export const socialIssues = [
  { issue: "Pothole repairs after monsoon — NH bypass", mentions: 18400, sentiment: -42, dept: "PWD", district: "Ernakulam", linked: 312, sensitivity: "High" },
  { issue: "Pension delay complaints", mentions: 12600, sentiment: -28, dept: "LSGD", district: "Malappuram", linked: 540, sensitivity: "High" },
  { issue: "KSRTC women free travel — praise", mentions: 21000, sentiment: 61, dept: "Transport", district: "Statewide", linked: 24, sensitivity: "Low" },
  { issue: "Dengue fear & fogging demand", mentions: 9800, sentiment: -35, dept: "Health", district: "Palakkad", linked: 176, sensitivity: "High" },
  { issue: "Drinking water shortage — summer", mentions: 7400, sentiment: -31, dept: "KWA", district: "Kasaragod", linked: 209, sensitivity: "Medium" },
  { issue: "Student stipend received — gratitude", mentions: 8800, sentiment: 48, dept: "Education", district: "Statewide", linked: 38, sensitivity: "Low" },
];

export const sectorPerformance = [
  { label: "Welfare", value: 82 },
  { label: "Health", value: 71 },
  { label: "Education", value: 78 },
  { label: "Infrastructure", value: 55 },
  { label: "Finance", value: 58 },
  { label: "Revenue", value: 66 },
  { label: "Environment", value: 64 },
  { label: "Grievances", value: 69 },
];

export const delayedProjects = [
  { project: "Vizhinjam Phase-2 yard expansion", district: "Thiruvananthapuram", dept: "Ports", budget: "₹1,820 Cr", physical: 62, financial: 58, delay: 38, bottleneck: "Contractor", owner: "Industries Secy", rag: "amber" as Rag },
  { project: "Outer Ring Road KIIFB package-3", district: "Ernakulam", dept: "PWD/KIIFB", budget: "₹2,400 Cr", physical: 41, financial: 47, delay: 96, bottleneck: "Land", owner: "PWD Secy", rag: "red" as Rag },
  { project: "Thalassery–Mahe bypass", district: "Kannur", dept: "NHAI/PWD", budget: "₹890 Cr", physical: 73, financial: 70, delay: 54, bottleneck: "Clearance", owner: "PWD Secy", rag: "amber" as Rag },
  { project: "Sabari Rail link (state share)", district: "Pathanamthitta", dept: "Railways", budget: "₹3,100 Cr", physical: 28, financial: 33, delay: 140, bottleneck: "Finance", owner: "Transport Secy", rag: "red" as Rag },
  { project: "Kozhikode mobility hub", district: "Kozhikode", dept: "KSRTC", budget: "₹520 Cr", physical: 55, financial: 61, delay: 47, bottleneck: "Litigation", owner: "Transport Secy", rag: "amber" as Rag },
];

export const dreamProjects: DreamProject[] = [
  {
    id: "DP-00", name: "Mission Samudra", dept: "Mission Samudra Authority", progress: 41, physical: 38, financial: 44,
    budget: "₹72,115 Cr", jobs: "2.4 L", risk: "amber", nextMilestone: "Vizhinjam Phase-2 (5.7M TEUs) commissioning · Mar 2029", districts: 10,
    bottlenecks: { land: "amber", power: "green", clearance: "amber", finance: "green", litigation: "green", contractor: "amber" },
    stages: [{ stage: "Stage 1", status: "active" }, { stage: "Stage 2", status: "active" }, { stage: "Stage 3", status: "todo" }, { stage: "Decarbonise", status: "todo" }],
    slug: "mission-samudra", img: "/img/projects/mission-samudra.png", priority: true,
  },
  {
    id: "DP-02", slug: "aviation", img: "/img/projects/aviation.png", name: "Aviation Sector Development", dept: "Industries Dept", progress: 44, physical: 40, financial: 48,
    budget: "₹6,200 Cr", jobs: "42,000", risk: "amber", nextMilestone: "Sabarimala greenfield airport land award · Sep 2026", districts: 4,
    bottlenecks: { land: "red", power: "green", clearance: "amber", finance: "amber", litigation: "amber", contractor: "green" },
    stages: [{ stage: "Concept", status: "done" }, { stage: "DPR", status: "done" }, { stage: "Tender", status: "active" }, { stage: "Build", status: "todo" }, { stage: "Commission", status: "todo" }],
  },
  {
    id: "DP-03", slug: "msme", img: "/img/projects/msme.png", name: "10,000+ MSME Competitiveness Programme", dept: "Industries / KSIDC", progress: 67, physical: 70, financial: 64,
    budget: "₹3,400 Cr", jobs: "2.8 L", risk: "green", nextMilestone: "Cluster grant tranche-3 release · Jul 2026", districts: 14,
    bottlenecks: { land: "green", power: "green", clearance: "green", finance: "amber", litigation: "green", contractor: "green" },
    stages: [{ stage: "Concept", status: "done" }, { stage: "Design", status: "done" }, { stage: "Pilot", status: "done" }, { stage: "Rollout", status: "active" }, { stage: "Scale", status: "todo" }],
  },
  {
    id: "DP-04", slug: "coastal-corridor", img: "/img/projects/coastal-corridor.png", name: "Coastal Economic Corridor", dept: "Industries / LSGD", progress: 38, physical: 35, financial: 41,
    budget: "₹9,800 Cr", jobs: "85,000", risk: "red", nextMilestone: "Corridor master-plan cabinet note · Oct 2026", districts: 9,
    bottlenecks: { land: "red", power: "amber", clearance: "red", finance: "amber", litigation: "amber", contractor: "green" },
    stages: [{ stage: "Concept", status: "done" }, { stage: "DPR", status: "active" }, { stage: "Tender", status: "todo" }, { stage: "Build", status: "todo" }, { stage: "Commission", status: "todo" }],
  },
  {
    id: "DP-05", slug: "blue-economy", img: "/img/projects/blue-economy.png", name: "Blue Economy & Coastal Fisheries", dept: "Fisheries / Industries", progress: 52, physical: 49, financial: 55,
    budget: "₹72,115 Cr", jobs: "1.5 L", risk: "amber", nextMilestone: "Stage-2 'Build the Pull' investor summit · Nov 2026", districts: 10,
    bottlenecks: { land: "amber", power: "green", clearance: "amber", finance: "green", litigation: "green", contractor: "amber" },
    stages: [{ stage: "Stage 1", status: "done" }, { stage: "Stage 2", status: "active" }, { stage: "Stage 3", status: "todo" }, { stage: "Decarbonise", status: "todo" }],
  },
  {
    id: "DP-06", slug: "logistics-hub", img: "/img/projects/logistics-hub.png", name: "Logistics & Trade Hub", dept: "Industries / Transport", progress: 49, physical: 46, financial: 52,
    budget: "₹5,600 Cr", jobs: "63,000", risk: "amber", nextMilestone: "Multimodal park PPP bid award · Sep 2026", districts: 7,
    bottlenecks: { land: "amber", power: "green", clearance: "amber", finance: "amber", litigation: "green", contractor: "green" },
    stages: [{ stage: "Concept", status: "done" }, { stage: "DPR", status: "done" }, { stage: "Tender", status: "active" }, { stage: "Build", status: "todo" }, { stage: "Commission", status: "todo" }],
  },
];

export const executiveKpis = [
  { label: "Overall Governance Score", value: "72", sub: "/100 state pulse", rag: "amber" as Rag, icon: "Gauge", delta: "+3 WoW" },
  { label: "Critical Alerts", value: "7", sub: "needs CM action", rag: "red" as Rag, icon: "AlertTriangle", delta: "+2" },
  { label: "Indira Guarantees Progress", value: "81%", sub: "6 guarantees", rag: "green" as Rag, icon: "ShieldCheck", delta: "+4%" },
  { label: "Scheme Beneficiaries", value: "2.6 Cr", sub: "across guarantees", rag: "green" as Rag, icon: "Users", delta: "+9%" },
  { label: "Grievances Redressed", value: "69%", sub: "within SLA", rag: "amber" as Rag, icon: "MessageSquare", delta: "+5%" },
  { label: "Delayed Projects", value: "38", sub: "red/amber", rag: "red" as Rag, icon: "Clock", delta: "+4" },
  { label: "Investment Grounding", value: "31%", sub: "IGR (MoU→ground)", rag: "red" as Rag, icon: "TrendingUp", delta: "+6%" },
  { label: "Data Source Health", value: "32/37", sub: "live feeds", rag: "green" as Rag, icon: "Activity", delta: "4 delayed" },
];
