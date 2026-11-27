import { districts } from "./districts";
import { Rag } from "./types";

export const eitCommandUpdatedAt = "15 Jun 2026, 12:35 PM";

export const eitHealth = {
  label: "Attention Required",
  rag: "amber" as Rag,
  source: "IT PMS + park annual reports + departmental submissions",
  confidence: 82,
};

const meta = (source: string, period = "FY 2024-25 baseline / live update", status = "Verified administrative data", confidence = 86, prev = "+8.4% YoY") => ({ source, period, status, confidence, prev });

export const eitKpis = [
  { label: "IT and ITeS Exports", value: "Rs 26,770 Cr", sub: "Govt IT parks subtotal", icon: "Globe2", rag: "green" as Rag, ...meta("Technopark / Infopark / Cyberpark annual reports", "FY 2024-25", "Audited annual-report data", 91, "+13.2% YoY") },
  { label: "Export Growth", value: "13.2%", sub: "park export growth", icon: "TrendingUp", rag: "green" as Rag, ...meta("Park annual reports") },
  { label: "IT-sector Turnover", value: "Rs 48,900 Cr", sub: "reported + modelled", icon: "IndianRupee", rag: "blue" as Rag, ...meta("Park reports + company submissions", "FY 2024-25", "Provisional figures", 78) },
  { label: "Direct IT Employment", value: "1.56 L", sub: "government IT parks", icon: "Users", rag: "green" as Rag, ...meta("Government IT parks", "FY 2024-25", "Audited annual-report data", 90, "+7.8% YoY") },
  { label: "Indirect Employment", value: "82,400", sub: "estimated multiplier", icon: "Network", rag: "blue" as Rag, ...meta("Survey estimate", "FY 2024-25", "Survey-based estimates", 70) },
  { label: "Jobs Since May 2026", value: "22,100", sub: "realised IT jobs", icon: "UserPlus", rag: "green" as Rag, ...meta("Park HR submissions", "Since May 2026", "Company-reported commitments", 78, "72% of FY target") },
  { label: "IT Companies", value: "1,162", sub: "government parks", icon: "Building2", rag: "green" as Rag, ...meta("Technology parks", "FY 2024-25") },
  { label: "New Companies", value: "184", sub: "since May 2026", icon: "PlusCircle", rag: "green" as Rag, ...meta("Park onboarding registers", "Since May 2026", "Live system data", 81) },
  { label: "GCCs in Kerala", value: "42", sub: "operating / committed", icon: "Landmark", rag: "blue" as Rag, ...meta("Investment desk", "Live", "Company-reported commitments", 74) },
  { label: "MNCs Operating", value: "128", sub: "park + private campuses", icon: "Globe", rag: "green" as Rag, ...meta("Park and investor desk") },
  { label: "Govt IT-park Area", value: "1,134 ac", sub: "Technopark, Infopark, Cyberpark", icon: "Map", rag: "green" as Rag, ...meta("Park annual reports") },
  { label: "Built-up IT Space", value: "23.2 M sq ft", sub: "operational baseline", icon: "PanelTop", rag: "green" as Rag, ...meta("Park annual reports", "FY 2024-25") },
  { label: "Occupied Space", value: "20.1 M sq ft", sub: "86.6% occupancy", icon: "CheckSquare", rag: "amber" as Rag, ...meta("Park space register", "Live", "Provisional figures", 80) },
  { label: "Plug-and-play Space", value: "7.6 L sq ft", sub: "ready / near-ready", icon: "PlugZap", rag: "amber" as Rag, ...meta("Park submissions", "Live") },
  { label: "Under Construction", value: "8.4 M sq ft", sub: "public + private", icon: "Construction", rag: "amber" as Rag, ...meta("KSITIL / parks", "Live", "Projected employment", 76) },
  { label: "Future IT Space", value: "19.8 M sq ft", sub: "planned / proposed", icon: "MapPinned", rag: "blue" as Rag, ...meta("Master plans", "FY 2026-31", "Projected employment", 68) },
  { label: "Avg Park Occupancy", value: "86.6%", sub: "space utilisation", icon: "Gauge", rag: "amber" as Rag, ...meta("Park space register") },
  { label: "Private Investment", value: "Rs 11,420 Cr", sub: "realised estimate", icon: "WalletCards", rag: "green" as Rag, ...meta("Park + investor submissions", "FY 2024-25", "Company-reported commitments", 78) },
  { label: "Investment Committed", value: "Rs 18,600 Cr", sub: "pipeline", icon: "FileCheck2", rag: "blue" as Rag, ...meta("Investment desk", "Live", "Company-reported commitments", 72) },
  { label: "Investment Realised", value: "Rs 7,920 Cr", sub: "verified / in progress", icon: "BadgeIndianRupee", rag: "amber" as Rag, ...meta("Finance + investor submissions", "FY 2024-26", "Verified administrative data", 78) },
  { label: "Technology Startups", value: "6,227", sub: "2024-25 baseline", icon: "Rocket", rag: "green" as Rag, ...meta("Kerala Startup Mission", "FY 2024-25", "Audited annual-report data", 88) },
  { label: "Startup Employment", value: "68,000", sub: "direct estimate", icon: "UsersRound", rag: "blue" as Rag, ...meta("KSUM + survey", "FY 2024-25", "Survey-based estimates", 70) },
  { label: "Startup Funding", value: "Rs 1,840 Cr", sub: "raised / reported", icon: "Coins", rag: "green" as Rag, ...meta("KSUM + investor reports", "FY 2024-25") },
  { label: "Electronics Startups", value: "312", sub: "hardware / deep-tech", icon: "CircuitBoard", rag: "blue" as Rag, ...meta("KSUM / Maker Village") },
  { label: "Women in IT Parks", value: "42%", sub: "employment share", icon: "VenetianMask", rag: "green" as Rag, ...meta("Park HR submissions", "FY 2024-25", "Company-reported commitments", 76) },
  { label: "Budget Utilisation", value: "40.64%", sub: "Rs 206.09 Cr / Rs 507.14 Cr", icon: "PieChart", rag: "red" as Rag, ...meta("Department budget", "FY 2024-25", "Verified administrative data", 90, "-") },
  { label: "Strategic Projects", value: "38", sub: "active / proposed", icon: "GanttChartSquare", rag: "amber" as Rag, ...meta("IT PMS + KSITIL") },
  { label: "Delayed Projects", value: "11", sub: "minor/major/critical", icon: "Clock", rag: "amber" as Rag, ...meta("IT PMS", "Live") },
  { label: "CM Intervention", value: "6", sub: "decision queue", icon: "Siren", rag: "red" as Rag, ...meta("PMU review", "Live") },
];

export const digitalEconomySegments = [
  ["Technology Parks", 1162, 155800, "Rs 48,900 Cr", "Rs 26,770 Cr", "Rs 7,920 Cr", 13.2, "TVM/EKM/KKD", 42, "Rs 52,400", 118000, "Building2"],
  ["IT and ITeS Companies", 1320, 184000, "Rs 56,400 Cr", "Rs 31,200 Cr", "Rs 9,400 Cr", 12.4, "South & central", 39, "Rs 48,600", 132000, "Code2"],
  ["GCCs and MNCs", 170, 62400, "Rs 22,600 Cr", "Rs 16,800 Cr", "Rs 5,600 Cr", 18.8, "TVM/EKM/KKD", 36, "Rs 78,000", 92000, "Globe2"],
  ["Startups", 6227, 68000, "Rs 4,820 Cr", "Rs 1,260 Cr", "Rs 1,840 Cr", 21.1, "Statewide", 31, "Rs 39,800", 76000, "Rocket"],
  ["Electronics and Hardware", 486, 28400, "Rs 3,600 Cr", "Rs 820 Cr", "Rs 1,220 Cr", 15.6, "EKM/PKD/TVM", 28, "Rs 34,400", 42000, "CircuitBoard"],
  ["Deep Technology", 178, 9200, "Rs 1,160 Cr", "Rs 320 Cr", "Rs 720 Cr", 26.4, "EKM/TVM", 24, "Rs 68,000", 22000, "Atom"],
  ["Digital Infrastructure", 420, 18600, "Rs 2,400 Cr", "Rs 160 Cr", "Rs 2,100 Cr", 9.2, "Statewide", 22, "Rs 38,600", 18000, "Server"],
  ["E-Governance", 917, 15000, "Rs 1,080 Cr", "-", "Rs 517 Cr outlay", 11.8, "Statewide", 34, "Rs 36,200", 14000, "MonitorCog"],
  ["Talent and Skills", 453, 100000, "-", "-", "Rs 240 Cr", 16.2, "Statewide", 41, "-", 118000, "GraduationCap"],
];

export const fiveYearTrends = [
  { label: "2021", exports: 15600, employment: 112000, companies: 820, startups: 3600, funding: 620, space: 17.8, electronics: 1480, transactions: 5.8 },
  { label: "2022", exports: 18100, employment: 124000, companies: 905, startups: 4200, funding: 880, space: 18.9, electronics: 1820, transactions: 6.9 },
  { label: "2023", exports: 21100, employment: 137000, companies: 1006, startups: 5040, funding: 1240, space: 20.5, electronics: 2260, transactions: 8.1 },
  { label: "2024", exports: 23600, employment: 146000, companies: 1092, startups: 5740, funding: 1510, space: 22.1, electronics: 2860, transactions: 9.3 },
  { label: "2025", exports: 26770, employment: 155800, companies: 1162, startups: 6227, funding: 1840, space: 23.2, electronics: 3600, transactions: 10.4 },
];

export const parkPhases = [
  ["Technopark Phase I", "TVM", 210, 198, 12, 82, 128, 5.9, 5.42, 0.48, 0.4, 0.8, 245, 16, 31, 42000, 17400, 4200, 7600, 15800, 2120, 91, "green"],
  ["Technopark Phase II", "TVM", 86, 71, 15, 52, 34, 1.7, 1.48, 0.22, 0.4, 0.9, 84, 8, 13, 14000, 5600, 1200, 2100, 5200, 1260, 87, "green"],
  ["Technopark Phase III", "TVM", 92, 83, 9, 62, 30, 2.2, 1.94, 0.26, 0.6, 1.1, 74, 7, 11, 15500, 6400, 1600, 2600, 6300, 1380, 88, "green"],
  ["Technocity / Phase IV", "TVM", 380, 96, 284, 120, 260, 2.9, 2.12, 0.78, 3.8, 8.4, 97, 9, 17, 8500, 3100, 2800, 275, 1700, 1065, 73, "amber"],
  ["Technopark Kollam", "Kollam", 44, 28, 16, 14, 30, 0.42, 0.31, 0.11, 0.1, 0.35, 22, 1, 2, 900, 310, 120, 48, 120, 214, 74, "amber"],
  ["Infopark Kochi Phase I", "Ernakulam", 100, 98, 2, 70, 30, 6.2, 5.82, 0.38, 0.6, 1.4, 396, 22, 44, 56000, 22600, 5200, 9400, 9600, 1680, 94, "green"],
  ["Infopark Kochi Phase II", "Ernakulam", 160, 94, 66, 82, 78, 2.6, 1.88, 0.72, 1.9, 5.8, 102, 8, 16, 14500, 5700, 3200, 2240, 2100, 808, 72, "amber"],
  ["Infopark Cherthala", "Alappuzha", 66, 42, 24, 24, 42, 0.62, 0.43, 0.19, 0.2, 0.5, 48, 1, 3, 1200, 480, 220, 125, 260, 202, 69, "amber"],
  ["Infopark Thrissur / Koratty", "Thrissur", 31, 24, 7, 15, 16, 0.78, 0.63, 0.15, 0.1, 0.4, 36, 1, 2, 1800, 730, 260, 300, 380, 385, 81, "green"],
  ["Cyberpark Kozhikode", "Kozhikode", 42.5, 22, 20.5, 16, 26.5, 0.3, 0.24, 0.06, 0.15, 0.7, 80, 2, 4, 2300, 820, 420, 130, 260, 433, 80, "amber"],
  ["Private IT campuses", "Multi", 260, 180, 80, 120, 140, 6.4, 5.1, 1.3, 2.2, 4.6, 236, 18, 42, 32000, 11600, 6500, 6400, 4200, 500, 80, "blue"],
].map(([park, district, land, developed, undeveloped, sez, nonSez, built, occupied, vacant, underConstruction, planned, companies, gcc, mnc, employment, women, jobsMay, exports, turnover, investment, occupancy, rag]) => ({
  park, district, land, developed, undeveloped, sez, nonSez, built, occupied, vacant, underConstruction, planned, companies, gcc, mnc, employment, women, jobsMay, exports, turnover, investment, occupancy, rag: rag as Rag,
  power: "Available", water: occupancy === 94 ? "Stable" : "Augmentation needed", connectivity: "Dual fibre", transport: district === "Kozhikode" ? "Improving" : "Good", socialInfra: occupancy >= 88 ? "Good" : "Moderate", constraints: occupancy >= 90 ? "Ready space shortage" : "Utility / land readiness", esg: occupancy >= 85 ? "Green building certified" : "Energy upgrade due",
}));

export const strategicProjects = [
  { title: "QUAD integrated IT township", agency: "Technopark / KSITIL", district: "Thiruvananthapuram", land: "30 ac", cost: "Rs 1,600 Cr", revised: "Rs 1,680 Cr", source: "PPP / private", as: "In principle", ts: "DPR stage", tender: "Developer selection pending", contractor: "TBD", start: "Q4 2026", completion: "Q4 2029", physical: 12, financial: 4, spent: "Rs 64 Cr", next: "Developer RFQ approval", jobsCommitted: 32000, jobsRealised: 0, investmentCommitted: "Rs 1,600 Cr", investmentRealised: "Rs 64 Cr", exports: "Rs 4,800 Cr potential", risks: "Developer selection, utility readiness", dependencies: "Power, water, transport", officer: "CEO Technopark", decision: "Approve developer-selection route and utility funding", status: "Awaiting Decision", rag: "red" as Rag },
  { title: "Digital Science Park", agency: "Digital University Kerala", district: "Thiruvananthapuram", land: "14 ac", cost: "Rs 1,515 Cr", revised: "Rs 1,515 Cr", source: "State / KIIFB / partners", as: "Issued", ts: "Issued", tender: "Packages active", contractor: "Multiple", start: "2024", completion: "2027", physical: 42, financial: 31, spent: "Rs 470 Cr", next: "Lab block milestone", jobsCommitted: 12000, jobsRealised: 900, investmentCommitted: "Rs 1,515 Cr", investmentRealised: "Rs 470 Cr", exports: "Deep-tech R&D", risks: "Equipment procurement", dependencies: "DUK, industries", officer: "VC DUK", decision: "Fast-track high-end lab procurement", status: "Minor Delay", rag: "amber" as Rag },
  { title: "World Trade Center Tower III", agency: "Infopark / private partner", district: "Ernakulam", land: "Campus", cost: "Rs 150 Cr", revised: "Rs 150 Cr", source: "Private", as: "Approved", ts: "Approved", tender: "Private execution", contractor: "Partner", start: "2026", completion: "2028", physical: 18, financial: 16, spent: "Rs 24 Cr", next: "Structural package", jobsCommitted: 2700, jobsRealised: 0, investmentCommitted: "Rs 150 Cr", investmentRealised: "Rs 24 Cr", exports: "Rs 720 Cr potential", risks: "Floorplate demand timing", dependencies: "Metro/road access", officer: "CEO Infopark", decision: "Resolve access and utility coordination", status: "On Track", rag: "green" as Rag },
  { title: "Cyberpark plug-and-play expansion", agency: "Cyberpark", district: "Kozhikode", land: "Park campus", cost: "Rs 220 Cr", revised: "Rs 238 Cr", source: "State / KIIFB", as: "Pending revision", ts: "DPR update", tender: "Awaiting", contractor: "TBD", start: "Q3 2026", completion: "Q4 2028", physical: 8, financial: 3, spent: "Rs 7 Cr", next: "Administrative sanction revision", jobsCommitted: 6500, jobsRealised: 420, investmentCommitted: "Rs 238 Cr", investmentRealised: "Rs 7 Cr", exports: "Rs 1,200 Cr potential", risks: "Space shortage for enquiries", dependencies: "Finance, PWD, power", officer: "CEO Cyberpark", decision: "Approve revised AS and plug-and-play package", status: "Awaiting Decision", rag: "red" as Rag },
  { title: "KSPACE Advanced Manufacturing Centre", agency: "Kerala Spacepark", district: "Thiruvananthapuram", land: "Technocity cluster", cost: "Rs 280 Cr", revised: "Rs 310 Cr", source: "State / partner", as: "Issued", ts: "Package pending", tender: "Preparation", contractor: "TBD", start: "Q1 2027", completion: "Q2 2029", physical: 14, financial: 7, spent: "Rs 22 Cr", next: "Technical sanction", jobsCommitted: 2800, jobsRealised: 120, investmentCommitted: "Rs 310 Cr", investmentRealised: "Rs 22 Cr", exports: "Aerospace manufacturing", risks: "Specialised equipment", dependencies: "ISRO, industries", officer: "Spacepark CEO", decision: "Approve technical package and industry partnership", status: "Minor Delay", rag: "amber" as Rag },
  { title: "KFON government office expansion", agency: "KFON", district: "Statewide", land: "-", cost: "Rs 380 Cr", revised: "Rs 395 Cr", source: "State / project", as: "Issued", ts: "Issued", tender: "Active", contractor: "Network partners", start: "2025", completion: "2027", physical: 61, financial: 48, spent: "Rs 190 Cr", next: "Pending office connectivity drive", jobsCommitted: 1800, jobsRealised: 900, investmentCommitted: "Rs 395 Cr", investmentRealised: "Rs 190 Cr", exports: "Digital inclusion", risks: "Last-mile delays", dependencies: "Departments, LNPs", officer: "MD KFON", decision: "District pending-office escalation", status: "Major Delay", rag: "red" as Rag },
];

export const quadProject = {
  location: "Technocity",
  land: "30 acres",
  investment: "Rs 1,600 Cr",
  space: "40 lakh sq ft",
  model: "PPP / integrated township",
  towers: "Two proposed IT towers",
  commercial: "Retail, offices, innovation space",
  residential: "Integrated residential component",
  social: "Social infrastructure planned",
  stage: "DPR + developer selection",
  dpr: "Under final review",
  developer: "Selection route pending",
  approval: "In-principle; final approval pending",
  financialClosure: "Pending",
  landReadiness: 74,
  utilityReadiness: 48,
  physical: 12,
  financial: 4,
  original: "Dec 2028",
  revised: "Dec 2029",
  directJobs: 32000,
  indirectJobs: 45000,
  realised: "Rs 64 Cr",
  delay: 210,
  bottlenecks: ["Developer selection", "Power augmentation", "Water source", "Transport access"],
  cmDecision: "Approve developer-selection model and utility funding package.",
};

export const districtTechMetrics = Object.fromEntries(
  districts.map((d, i) => {
    const base = [92, 28, 18, 26, 32, 16, 88, 38, 30, 34, 68, 14, 31, 18][i] || 30;
    return [d.name, {
      companies: Math.round(base * 7.4),
      employment: Math.round(base * 1680),
      newJobs: Math.round(base * 190),
      exports: Math.round(base * 310),
      startups: Math.round(base * 42),
      electronicsStartups: Math.round(base * 2.4),
      incubators: Math.round(base / 6),
      iedcs: Math.round(base / 2.8),
      coworking: Math.round(base * 1200),
      parkSpace: Math.round(base * 0.18),
      availableSpace: Math.round(Math.max(2, 110 - base) * 6000),
      digitalSkilled: Math.round(base * 2100),
      graduates: Math.round(base * 620),
      kfon: Math.min(98, base + 14),
      govtConnectivity: Math.min(96, base + 8),
      publicWifi: Math.round(base * 12),
      dataCentre: i === 0 || i === 6 ? 90 : Math.round(base / 2),
      transactions: Math.round(base * 125000),
      electronicsCapacity: Math.round(base * 9),
      proposedProjects: Math.round(base / 8),
      salary: Math.round(24000 + base * 520),
      women: Math.min(48, 24 + Math.round(base / 5)),
    }];
  })
);

export const electronicsDeepTech = [
  ["ESDM", 118, 9200, 64, 28, 42, 18, "Rs 420 Cr", "Rs 610 Cr", 26, 8, 16, 4200, 19, 740, 6.8, "High"],
  ["Semiconductor design", 36, 2600, 22, 16, 18, 7, "Rs 210 Cr", "Rs 360 Cr", 4, 2, 8, 1400, 21, 180, 5.9, "Very high"],
  ["Embedded / IoT", 124, 6400, 78, 44, 34, 14, "Rs 160 Cr", "Rs 240 Cr", 18, 5, 21, 2900, 24, 420, 7.2, "High"],
  ["Robotics / automation", 48, 2100, 31, 22, 19, 8, "Rs 90 Cr", "Rs 180 Cr", 7, 2, 9, 1100, 18, 210, 6.1, "Medium"],
  ["Medical electronics", 62, 3600, 28, 20, 24, 10, "Rs 120 Cr", "Rs 260 Cr", 12, 4, 11, 1700, 28, 320, 6.6, "High"],
  ["Space / aerospace", 28, 1900, 18, 12, 16, 6, "Rs 170 Cr", "Rs 420 Cr", 4, 2, 7, 950, 17, 160, 5.8, "Very high"],
  ["Graphene / advanced materials", 18, 820, 14, 9, 22, 4, "Rs 240 Cr", "Rs 180 Cr", 2, 1, 5, 420, 16, 90, 4.9, "Very high"],
  ["AVGC-XR", 72, 3100, 46, 32, 12, 5, "Rs 70 Cr", "Rs 150 Cr", 6, 2, 14, 1600, 31, 280, 6.3, "Medium"],
].map(([domain, startups, jobs, prototypes, products, patentsFiled, patentsGranted, rd, investment, manufacturing, exporting, transfers, skilled, womenFounders, studentInnovations, trl, importPotential]) => ({ domain, startups, jobs, prototypes, products, patentsFiled, patentsGranted, rd, investment, manufacturing, exporting, transfers, skilled, womenFounders, studentInnovations, trl, importPotential }));

export const startupBaseline = {
  startups2025: 6227,
  iedcs: 453,
  students: "1 L+",
  active: 5480,
  newSinceMay: 640,
  closed: 210,
  survival: 84,
  scaleups: 186,
  highValue: 18,
  employment: 68000,
  womenLed: 18,
  studentLed: 22,
  funding: "Rs 1,840 Cr",
  procurement: "Rs 86 Cr",
};

export const startupFunnel = [
  { stage: "Idea", value: 12400 },
  { stage: "Incubation", value: 6227 },
  { stage: "Prototype", value: 3180 },
  { stage: "Seed Funding", value: 1240 },
  { stage: "PMF", value: 640 },
  { stage: "Growth", value: 186 },
  { stage: "Export", value: 82 },
  { stage: "Scale-Up", value: 28 },
];

export const gccPipeline = [
  ["FinTech Global", "USA", "BFSI GCC", "Ernakulam", "2.4 L sq ft", "6 MW", "Cloud, AI, finance", 2800, "Rs 620 Cr", "Site evaluation", "Bengaluru", "Large floorplate", "Investment officer - Kochi", 72, "amber"],
  ["MedAI Labs", "UK", "Healthcare AI", "Thiruvananthapuram", "1.1 L sq ft", "2 MW", "AI, clinical data", 1200, "Rs 280 Cr", "MoU draft", "Hyderabad", "Data policy clarity", "Investment officer - TVM", 68, "amber"],
  ["CyberShield", "Israel", "Cybersecurity", "Kozhikode", "80,000 sq ft", "1.5 MW", "Security analysts", 900, "Rs 190 Cr", "Talent due diligence", "Pune", "Plug-and-play space", "North Kerala desk", 54, "red"],
  ["AutoChip Design", "Germany", "Chip design", "Ernakulam", "1.6 L sq ft", "4 MW", "VLSI, embedded", 1800, "Rs 460 Cr", "Final negotiation", "Chennai", "ESDM incentives", "Investment officer - ESDM", 76, "green"],
  ["XR Studios", "Japan", "AVGC-XR", "Kozhikode", "60,000 sq ft", "1 MW", "XR artists, engines", 620, "Rs 120 Cr", "Exploratory", "Bengaluru", "Talent pipeline", "KSUM/AVGC desk", 44, "amber"],
].map(([company, country, sector, district, space, power, talent, jobs, investment, stage, competing, requirement, officer, probability, rag]) => ({ company, country, sector, district, space, power, talent, jobs, investment, stage, competing, requirement, officer, probability, rag: rag as Rag }));

export const kfonBaseline = {
  active: 113525,
  bpl: 14194,
  commercial: 73134,
  sme: 3034,
  govt: 23163,
  backbone: "30,000 km",
  access: "8,000 km",
  pops: 375,
  uptime: "99.1%",
  mttr: "6.2 hrs",
  speed: "78 Mbps avg",
  revenue: "Rs 12.4 Cr/month",
  complaints: 4820,
};

export const digitalServices = [
  ["e-SEVANAM / m-SEVANAM", 917, "8.4 Cr", "42 L", "8.1 Cr", "2.1 L", "4.2 sec", "2.8 days", "1.6 L", 82, 91, 88, 94, "Rs 216 Cr", "99.2%", "Stable"],
  ["e-District", 186, "10 Cr+", "1.8 Cr", "9.7 Cr", "18.4 L", "5.8 sec", "4.6 days", "3.2 L", 79, 84, 76, 86, "Rs 148 Cr", "98.7%", "Watch"],
  ["e-Office", 1, "1.2 Cr files", "70k users", "1.15 Cr", "52k", "3.1 sec", "workflow", "18k", 86, 92, 74, 91, "-", "99.0%", "Stable"],
  ["Akshaya", 2986, "4.6 Cr", "2.1 Cr citizens", "4.4 Cr", "1.8 L", "counter", "same day", "44k", 88, 72, 68, 96, "Rs 320 Cr", "97.9%", "Stable"],
  ["e-Procurement", 1, "12.4 L bids", "1.1 L vendors", "12.0 L", "18k", "6.4 sec", "tender cycle", "2.2k", 77, 62, 82, 88, "Rs 8,200 Cr", "98.4%", "Watch"],
].map(([platform, services, transactions, users, success, failed, response, delivery, pendency, satisfaction, mobile, accessibility, malayalam, payment, uptime, security]) => ({ platform, services, transactions, users, success, failed, response, delivery, pendency, satisfaction, mobile, accessibility, malayalam, payment, uptime, security }));

export const citizenJourney = [
  { label: "Submitted", value: 100 },
  { label: "Verified", value: 86 },
  { label: "Approved", value: 74 },
  { label: "Delivered", value: 69 },
  { label: "Appealed", value: 4 },
  { label: "Rejected", value: 7 },
];

export const dataCentre = {
  virtualServers: 4000,
  apps: 560,
  physicalServers: 500,
  storageTb: 2500,
  usedCapacity: 78,
  serverUtil: 72,
  storageUtil: 81,
  networkUtil: 66,
  criticalApps: 84,
  cloudApps: 126,
  migrationQueue: 72,
  backup: 88,
  dr: 76,
  uptime: "99.4%",
  incidents: 18,
  pue: 1.82,
  eolHardware: 96,
};

export const cyberSummary = {
  threat: "Elevated",
  incidents: 184,
  critical: 7,
  malware: 42,
  ransomware: 2,
  phishing: 1180,
  compromised: 86,
  vulnerableApps: 62,
  unpatched: 430,
  auditsPending: 71,
  pentests: 44,
  breachAlerts: 3,
  mttd: "42 min",
  mttr: "3.8 hrs",
  mtRecover: "11.4 hrs",
  drills: 8,
};

export const cyberAlerts = [
  ["Revenue", "Land records integration", "High", "10:42", "Masked", "Contained", "CISO Revenue", "CS", "Yes"],
  ["Health", "District reporting app", "Medium", "09:15", "None confirmed", "Patch pending", "Health IT officer", "Secretary", "No"],
  ["LSGD", "Citizen portal", "High", "Yesterday", "Masked", "Monitoring", "LSGD CISO", "CS", "Yes"],
  ["Education", "Scholarship service", "Medium", "2 days", "None confirmed", "Audit queued", "Education IT cell", "Secretary", "No"],
].map(([department, system, severity, detection, data, status, officer, escalation, cm]) => ({ department, system, severity, detection, data, status, officer, escalation, cm }));

export const talentSkills = [
  ["AI / ML", 9200, 4200, 3600, 11800, 5100, "Rs 55k-1.4L", "red"],
  ["Data science", 8400, 5200, 4100, 9600, 4800, "Rs 48k-1.2L", "amber"],
  ["Cybersecurity", 4800, 1900, 1600, 6200, 1800, "Rs 50k-1.6L", "red"],
  ["Cloud engineering", 7600, 4200, 3100, 8800, 3600, "Rs 45k-1.3L", "amber"],
  ["DevOps", 5400, 3100, 2600, 6900, 2400, "Rs 42k-1.1L", "amber"],
  ["Semiconductor design", 2100, 640, 420, 3200, 380, "Rs 70k-1.8L", "red"],
  ["Embedded systems", 4300, 2100, 1600, 5200, 1400, "Rs 34k-90k", "amber"],
  ["Robotics", 2400, 1100, 820, 3000, 640, "Rs 36k-1L", "amber"],
  ["AVGC-XR", 4100, 3600, 2600, 5200, 1900, "Rs 28k-85k", "blue"],
  ["Full-stack", 11200, 8400, 6900, 12400, 7200, "Rs 32k-1L", "green"],
].map(([skill, graduates, trained, certified, vacancies, placed, salary, rag]) => ({ skill, graduates, trained, certified, vacancies, placed, salary, rag: rag as Rag }));

export const agencyPerformance = [
  ["Kerala State IT Mission", "Rs 142 Cr", "Rs 74 Cr", 52, "Rs 8 Cr", 28, 12, 6, 164, 18, 9, 2, 78, 82, 4200, "Rs 280 Cr", "Procurement delay"],
  ["Kerala Startup Mission", "Rs 98 Cr", "Rs 72 Cr", 73, "Rs 14 Cr", 18, 10, 3, 92, 12, 4, 0, 86, 91, 22800, "Rs 1,840 Cr", "Grant release"],
  ["Technopark", "Rs 82 Cr", "Rs 61 Cr", 74, "Rs 420 Cr", 14, 8, 2, 310, 24, 3, 1, 88, 92, 4200, "Rs 2,120 Cr", "Utility dependency"],
  ["Infopark", "Rs 76 Cr", "Rs 58 Cr", 76, "Rs 360 Cr", 14, 9, 1, 246, 17, 2, 0, 90, 93, 8400, "Rs 1,940 Cr", "Space constraint"],
  ["Cyberpark", "Rs 42 Cr", "Rs 20 Cr", 48, "Rs 28 Cr", 7, 3, 2, 68, 8, 3, 0, 68, 74, 420, "Rs 260 Cr", "Admin approval"],
  ["KSITIL", "Rs 118 Cr", "Rs 44 Cr", 37, "Rs 4 Cr", 23, 8, 9, 74, 16, 8, 1, 61, 70, 1800, "Rs 920 Cr", "Tender failure / land"],
  ["KFON", "Rs 132 Cr", "Rs 62 Cr", 47, "Rs 148 Cr", 12, 5, 4, 156, 22, 6, 1, 66, 84, 900, "Rs 395 Cr", "Last-mile dependency"],
  ["Digital University Kerala", "Rs 64 Cr", "Rs 48 Cr", 75, "Rs 22 Cr", 7, 4, 1, 210, 28, 2, 0, 84, 78, 1200, "Rs 1,515 Cr", "Equipment procurement"],
].map(([agency, allocation, expenditure, utilisation, revenue, projects, completed, delayed, employees, vacancies, procurement, audit, score, impact, jobs, investment, reason]) => ({ agency, allocation, expenditure, utilisation, revenue, projects, completed, delayed, employees, vacancies, procurement, audit, score, impact, jobs, investment, reason }));

export const aiEitInsights = [
  { finding: "Ready-to-occupy Technopark space may become insufficient", data: "Occupancy is above 90% in mature phases while GCC enquiries require large floorplates.", affected: "Technopark Phase I/III, Technocity", financial: "Rs 4,800 Cr export upside at risk", employment: "32,000 jobs", risk: "Companies may shift expansion to competing states.", action: "Accelerate next phase of commercial IT space and utility readiness.", agency: "Technopark / KSITIL", priority: "High", deadline: "30 Sep 2026", confidence: 84 },
  { finding: "QUAD project requires CM-level escalation", data: "Developer selection, approvals and utility readiness remain pending.", affected: "Technocity", financial: "Rs 1,600 Cr investment", employment: "77,000 direct + indirect jobs", risk: "One-year delay could defer large GCC absorption.", action: "Approve developer-selection route and utility package.", agency: "Technopark / E&IT", priority: "Critical", deadline: "31 Jul 2026", confidence: 88 },
  { finding: "Infopark GCC pipeline exceeds large-floorplate availability", data: "Phase I is above 90% occupancy; enquiries require contiguous space.", affected: "Ernakulam", financial: "Rs 2,200 Cr proposal pipeline", employment: "18,000 jobs", risk: "Loss to Bengaluru/Hyderabad/Chennai.", action: "Prioritise Phase III, Phase IV and private developments.", agency: "Infopark", priority: "High", deadline: "31 Aug 2026", confidence: 81 },
  { finding: "Cyberpark needs plug-and-play expansion", data: "North Kerala enquiries face limited ready office inventory.", affected: "Kozhikode, Malappuram, Kannur", financial: "Rs 1,200 Cr export potential", employment: "6,500 jobs", risk: "Investment enquiries may drop or relocate.", action: "Approve revised AS and near-term plug-and-play facility.", agency: "Cyberpark / KSITIL", priority: "High", deadline: "15 Aug 2026", confidence: 78 },
  { finding: "KFON institutional coverage needs district escalation", data: "23,163 government-office connections active; pending offices require cause-wise tracking.", affected: "Statewide", financial: "Service-delivery productivity impact", employment: "900 project jobs sustained", risk: "Digital services remain uneven across offices.", action: "District-wise pending office heat map and LNP escalation.", agency: "KFON", priority: "High", deadline: "31 Aug 2026", confidence: 82 },
  { finding: "Low IT-sector budget utilisation requires project-level audit", data: "2024-25 expenditure was Rs 206.09 Cr against Rs 507.14 Cr allocation.", affected: "IT Department agencies", financial: "Rs 301.05 Cr under-utilised", employment: "Delayed jobs in infra and skills", risk: "Project slippage and lower investment conversion.", action: "Identify procurement, tender, land, utility and approval blockers.", agency: "E&IT / Finance", priority: "Critical", deadline: "15 Jul 2026", confidence: 90 },
  { finding: "Future-skill demand exceeds training output", data: "AI, cloud, cybersecurity, chip design and embedded systems vacancy pipeline exceeds annual certified candidates.", affected: "TVM, EKM, KKD, Palakkad", financial: "Higher wage leakage and lost proposals", employment: "24,000 high-value roles", risk: "MNC/GCC conversion weakens.", action: "Launch industry-backed bootcamps tied to park proposals.", agency: "DUK / KSUM / Skill", priority: "High", deadline: "30 Nov 2026", confidence: 80 },
  { finding: "Data-centre storage utilisation approaching watch threshold", data: "Storage utilisation is 81%; 96 hardware assets are nearing end of life.", affected: "State Data Centre / Government Cloud", financial: "Service continuity risk", employment: "Digital ops workforce", risk: "Service degradation for critical applications.", action: "Capacity expansion or hybrid-cloud migration before threshold breach.", agency: "KSITIL / IT Mission", priority: "High", deadline: "31 Oct 2026", confidence: 79 },
];

export const eitAlerts = [
  { severity: "Critical", category: "Major project delay", item: "QUAD developer selection", age: "210 days", finance: "Rs 1,600 Cr", jobs: "77,000", citizens: "-", officer: "CEO Technopark", last: "DPR review", next: "CM route approval", deadline: "31 Jul 2026", rag: "red" as Rag },
  { severity: "High", category: "Low budget utilisation", item: "FY24-25 IT allocation", age: "FY close", finance: "Rs 301 Cr", jobs: "Delayed infra jobs", citizens: "-", officer: "IT Secretary", last: "Expenditure compiled", next: "Project blocker audit", deadline: "15 Jul 2026", rag: "red" as Rag },
  { severity: "High", category: "IT-park occupancy", item: "Technopark mature phases", age: "Live", finance: "Rs 4,800 Cr exports", jobs: "32,000", citizens: "-", officer: "CEO Technopark", last: "Space register", next: "Next phase decision", deadline: "30 Sep 2026", rag: "amber" as Rag },
  { severity: "High", category: "KFON connectivity gap", item: "Pending government offices", age: "Live", finance: "Service impact", jobs: "900", citizens: "Office users", officer: "MD KFON", last: "District report", next: "LNP escalation", deadline: "31 Aug 2026", rag: "amber" as Rag },
  { severity: "Medium", category: "Cybersecurity incident", item: "Masked high severity queue", age: "24 hrs", finance: "Not public", jobs: "-", citizens: "Masked", officer: "CISO", last: "Contained", next: "Role-based review", deadline: "48 hrs", rag: "red" as Rag },
  { severity: "Medium", category: "Skill shortage", item: "Cybersecurity and chip design", age: "Quarter", finance: "Proposal risk", jobs: "7,700", citizens: "-", officer: "DUK / KSUM", last: "Demand map", next: "Bootcamp approval", deadline: "30 Nov 2026", rag: "amber" as Rag },
];

export const cmDecisionQueue = [
  { programme: "QUAD integrated IT township", decision: "Developer-selection model and utility funding", options: "PPP RFQ / SPV / phased lease", recommended: "PPP RFQ with utility package", finance: "Rs 1,600 Cr investment; state utility support", employment: "77,000 jobs", time: "Critical", departments: "E&IT, Finance, Power, Water, Transport", pending: "210 days", consequence: "GCC pipeline delay", docs: "DPR, utility note, finance memo", officer: "CEO Technopark" },
  { programme: "Cyberpark plug-and-play expansion", decision: "Approve revised AS", options: "State funding / KIIFB / PPP", recommended: "State + KIIFB hybrid", finance: "Rs 238 Cr", employment: "6,500 direct jobs", time: "High", departments: "E&IT, Finance, PWD", pending: "96 days", consequence: "North Kerala enquiries lost", docs: "Revised DPR", officer: "CEO Cyberpark" },
  { programme: "IT-sector budget utilisation audit", decision: "CM review of under-utilised heads", options: "Agency review / Finance review / PMU audit", recommended: "PMU audit with monthly CM review", finance: "Rs 301.05 Cr under-utilised", employment: "Delayed infra and skill outcomes", time: "Critical", departments: "E&IT, Finance", pending: "FY close", consequence: "Repeat low utilisation", docs: "Budget head report", officer: "IT Secretary" },
  { programme: "KFON institutional completion", decision: "District escalation protocol", options: "Agency-only / Collector-led / CS review", recommended: "Collector-led with CS dashboard", finance: "Project outcome risk", employment: "900 sustained jobs", time: "High", departments: "KFON, District Collectors", pending: "Live", consequence: "Uneven digital-office access", docs: "District pending list", officer: "MD KFON" },
];

export const milestones = [
  { horizon: "30 days", item: "QUAD developer route decision", date: "31 Jul 2026", rag: "red" as Rag },
  { horizon: "30 days", item: "Budget under-utilisation blocker audit", date: "15 Jul 2026", rag: "red" as Rag },
  { horizon: "90 days", item: "WTC Tower III structural milestone", date: "30 Sep 2026", rag: "green" as Rag },
  { horizon: "90 days", item: "KFON pending-office escalation review", date: "31 Aug 2026", rag: "amber" as Rag },
  { horizon: "90 days", item: "Cyberpark revised AS", date: "15 Aug 2026", rag: "red" as Rag },
  { horizon: "1 year", item: "Digital Science Park lab block", date: "Q2 2027", rag: "amber" as Rag },
  { horizon: "1 year", item: "AI/cloud/cyber skill bootcamps", date: "Q4 2026", rag: "amber" as Rag },
  { horizon: "1 year", item: "State Data Centre capacity expansion", date: "Q1 2027", rag: "amber" as Rag },
];

export const bottomExecutive = {
  topPark: "Infopark Kochi Phase I",
  fastestDistrict: "Ernakulam",
  exportGrowth: "Technopark +13.8%",
  employmentGenerator: "Infopark expansions",
  bestAgency: "Kerala Startup Mission",
  riskyProjects: ["QUAD", "Cyberpark expansion", "KFON pending offices", "KSITIL tender packages"],
  pendingInvestment: "QUAD Rs 1,600 Cr",
  spaceRequirement: "GCC large-floorplate pipeline",
  investorOpportunities: ["AutoChip Design", "FinTech Global", "MedAI Labs", "CyberShield"],
  serviceFailures: ["e-District pendency clusters", "e-Procurement response-time watch"],
  cyberNotices: ["High-severity masked queue", "Security audits pending"],
  weekDecisions: ["QUAD route", "Budget audit", "Cyberpark AS", "KFON district protocol"],
  changes: ["New MNC enquiries +5", "Park occupancy +1.8 pp", "Startup registrations +640", "KFON active connections +3,240"],
};
