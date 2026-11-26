export type SignalTone = "good" | "watch" | "risk" | "info";
export type ChartType = "bar" | "line" | "area" | "donut";

export interface DemoKpi {
  label: string;
  value: string;
  detail: string;
  tone: SignalTone;
  delta?: string;
}

export interface DemoSeries {
  key: string;
  label: string;
  color: string;
  stackId?: string;
}

export interface DemoChart {
  id: string;
  title: string;
  subtitle: string;
  type: ChartType;
  xKey: string;
  data: Array<Record<string, string | number>>;
  series: DemoSeries[];
  unit?: string;
  horizontal?: boolean;
}

export interface DemoTable {
  title: string;
  subtitle: string;
  columns: string[];
  rows: string[][];
}

export interface DemoDashboard {
  title: string;
  description: string;
  kpis: DemoKpi[];
  charts: DemoChart[];
  table: DemoTable;
  insight: string;
}

const blue = "#2f6fd0";
const navy = "#12345d";
const teal = "#15927e";
const green = "#1b9a6c";
const amber = "#d98b19";
const orange = "#e06432";
const red = "#c64555";
const violet = "#7556c8";
const pink = "#c74678";
const cyan = "#1596b0";
const slate = "#718096";

const sectorUtilisation = [
  { sector: "Education", allocated: 6200, spent: 4150 },
  { sector: "Health", allocated: 5400, spent: 3500 },
  { sector: "Agriculture", allocated: 3100, spent: 1480 },
  { sector: "LSGD / Rural", allocated: 7600, spent: 4900 },
  { sector: "Industries", allocated: 2900, spent: 1380 },
  { sector: "Water", allocated: 3400, spent: 1620 },
  { sector: "SC/ST Welfare", allocated: 2400, spent: 1560 },
];

const departmentAbsorption = [
  { department: "Local Government", utilisation: 72 },
  { department: "SC Development", utilisation: 71 },
  { department: "Power", utilisation: 69 },
  { department: "General Education", utilisation: 67 },
  { department: "Health", utilisation: 65 },
  { department: "Social Justice", utilisation: 64 },
  { department: "Agriculture", utilisation: 48 },
  { department: "Industries", utilisation: 48 },
  { department: "Water Resources", utilisation: 47 },
  { department: "Fisheries", utilisation: 44 },
];

const treasuryReleases = [
  { month: "Apr", value: 1200 }, { month: "May", value: 1600 },
  { month: "Jun", value: 2100 }, { month: "Jul", value: 1900 },
  { month: "Aug", value: 2400 }, { month: "Sep", value: 2200 },
  { month: "Oct", value: 2600 }, { month: "Nov", value: 2900 },
  { month: "Dec", value: 3100 }, { month: "Jan", value: 2700 },
  { month: "Feb", value: 3000 }, { month: "Mar", value: 3300 },
];

const revenueStreams = [
  { stream: "SGST", target: 58000, actual: 49600 },
  { stream: "IGST share", target: 22000, actual: 18900 },
  { stream: "Land revenue", target: 9800, actual: 8100 },
  { stream: "Stamp duty", target: 14500, actual: 12700 },
  { stream: "State excise", target: 20400, actual: 17600 },
  { stream: "Motor vehicles", target: 6200, actual: 5500 },
];

const grievanceTrend = [
  { week: "Wk1", received: 8200, resolved: 6100 },
  { week: "Wk2", received: 8800, resolved: 6400 },
  { week: "Wk3", received: 9100, resolved: 6600 },
  { week: "Wk4", received: 9600, resolved: 6900 },
  { week: "Wk5", received: 10200, resolved: 7300 },
  { week: "Wk6", received: 9800, resolved: 7100 },
];

const guaranteeProgress = [
  { guarantee: "Free KSRTC travel", progress: 92 },
  { guarantee: "Girl student support", progress: 88 },
  { guarantee: "Welfare pension", progress: 90 },
  { guarantee: "Family health cover", progress: 94 },
  { guarantee: "Youth enterprise loan", progress: 76 },
  { guarantee: "Elderly welfare", progress: 84 },
];

export const mainPriorityCards = [
  { id: "income", name: "Income", value: "₹1.12L Cr", detail: "81% of revenue target", tone: "good" as SignalTone, href: "/modules/budget-income-revenue" },
  { id: "expenditure", name: "Expenditure", value: "₹1.07L Cr", detail: "58% of allocation", tone: "watch" as SignalTone, href: "/modules/non-plan-expenditure" },
  { id: "budget", name: "Budget & Utilization", value: "56%", detail: "Plan fund utilization", tone: "watch" as SignalTone, href: "/modules/planspace" },
  { id: "business", name: "Investments & Business", value: "202", detail: "Industries PMS projects", tone: "info" as SignalTone, href: "/modules/k-swift" },
  { id: "disaster", name: "Disaster Monitoring", value: "HIGH", detail: "71/100 readiness", tone: "risk" as SignalTone, href: "/modules/disaster-management" },
  { id: "grievance", name: "Grievance & Feedback", value: "69%", detail: "Resolved within SLA", tone: "watch" as SignalTone, href: "/modules/cmo" },
  { id: "health", name: "Health", value: "5 alerts", detail: "1,114 eHealth institutions", tone: "risk" as SignalTone, href: "/modules/e-health" },
  { id: "indira", name: "Indira Guarantees", value: "81%", detail: "2.6 Cr beneficiaries", tone: "good" as SignalTone, href: "/dashboard#indira-performance" },
  { id: "dream", name: "Dream Projects", value: "41%", detail: "Mission Samudra progress", tone: "watch" as SignalTone, href: "/modules/mission-samudra" },
];

export const mainFiscalComparison = [
  { category: "Revenue", plan: 138000, achieved: 112400 },
  { category: "Total budget", plan: 184000, achieved: 106720 },
  { category: "Plan fund", plan: 38600, achieved: 21500 },
];

export const mainGrievanceTrend = grievanceTrend;
export const mainGuaranteeProgress = guaranteeProgress;

export const mainBusinessPerformance = [
  { agency: "KSIDC", physical: 68, financial: 63 },
  { agency: "KINFRA", physical: 64, financial: 58 },
  { agency: "BPT-PSUs", physical: 54, financial: 49 },
  { agency: "Khadi", physical: 59, financial: 52 },
  { agency: "DIC", physical: 72, financial: 66 },
  { agency: "Coir", physical: 74, financial: 69 },
];

export const mainDisasterRisk = [
  { district: "Wayanad", risk: 92 },
  { district: "Idukki", risk: 84 },
  { district: "Alappuzha", risk: 78 },
  { district: "Palakkad", risk: 66 },
  { district: "Pathanamthitta", risk: 64 },
  { district: "Kottayam", risk: 60 },
];

export const mainHealthTrend = [
  { month: "Sep", dengue: 120, lepto: 40, chikungunya: 20 },
  { month: "Oct", dengue: 140, lepto: 55, chikungunya: 18 },
  { month: "Nov", dengue: 165, lepto: 48, chikungunya: 26 },
  { month: "Dec", dengue: 210, lepto: 62, chikungunya: 32 },
  { month: "Jan", dengue: 260, lepto: 70, chikungunya: 28 },
  { month: "Feb", dengue: 330, lepto: 88, chikungunya: 40 },
  { month: "Mar", dengue: 410, lepto: 76, chikungunya: 44 },
  { month: "Apr", dengue: 520, lepto: 94, chikungunya: 52 },
];

export const mainDreamProjects = [
  { project: "Mission Samudra", physical: 38, financial: 44 },
  { project: "Aviation", physical: 40, financial: 48 },
  { project: "MSME programme", physical: 70, financial: 64 },
  { project: "Coastal corridor", physical: 35, financial: 41 },
  { project: "Blue economy", physical: 49, financial: 55 },
  { project: "Logistics hub", physical: 46, financial: 52 },
];

export const moduleDashboards: Record<string, DemoDashboard> = {
  planspace: {
    title: "Plan expenditure dashboard",
    description: "Plan allocation, spending velocity, department absorption and scheme utilization.",
    kpis: [
      { label: "Plan allocation", value: "₹38,600 Cr", detail: "Annual plan envelope", tone: "info" },
      { label: "Plan spent", value: "₹21,500 Cr", detail: "Recorded expenditure", tone: "good" },
      { label: "Plan utilization", value: "56%", detail: "Allocation converted to spend", tone: "watch", delta: "+4 pp" },
      { label: "Surrender risk", value: "₹4,200 Cr", detail: "Potential year-end exposure", tone: "risk" },
    ],
    charts: [
      { id: "sector-plan", title: "Sector plan fund", subtitle: "Allocation versus expenditure (₹ Cr)", type: "bar", xKey: "sector", data: sectorUtilisation, series: [{ key: "allocated", label: "Allocated", color: blue }, { key: "spent", label: "Spent", color: teal }], unit: "₹ Cr" },
      { id: "release-trend", title: "Treasury releases", subtitle: "Monthly release pattern (₹ Cr)", type: "area", xKey: "month", data: treasuryReleases, series: [{ key: "value", label: "Released", color: violet }], unit: "₹ Cr" },
      { id: "dept-absorption", title: "Department absorption", subtitle: "Plan utilization by department", type: "bar", xKey: "department", data: departmentAbsorption, series: [{ key: "utilisation", label: "Utilization", color: amber }], unit: "%", horizontal: true },
    ],
    table: {
      title: "Major scheme utilization",
      subtitle: "Scheme portfolio retained from the existing CMO portal",
      columns: ["Scheme", "Department", "Allocation", "Utilization"],
      rows: [
        ["PMAY-G Housing", "LSGD", "₹2,400 Cr", "73%"],
        ["Aardram Mission", "Health", "₹1,800 Cr", "61%"],
        ["Subhiksha Keralam", "Agriculture", "₹1,200 Cr", "44%"],
        ["K-FON Digital", "IT", "₹900 Cr", "52%"],
        ["Jaladhara Water", "Water Resources", "₹1,500 Cr", "41%"],
        ["SC/ST Hostel Upgrade", "SC Development", "₹600 Cr", "68%"],
      ],
    },
    insight: "Local government and SC Development lead plan absorption, while Fisheries and Water Resources require the closest spending review.",
  },

  "non-plan-expenditure": {
    title: "Non-plan expenditure dashboard",
    description: "Committed expenditure, interest burden, liabilities and arrears composition.",
    kpis: [
      { label: "Total expenditure", value: "₹1,06,720 Cr", detail: "Overall budget expenditure", tone: "info" },
      { label: "Committed share", value: "77.6%", detail: "Of revenue receipts", tone: "risk" },
      { label: "Interest share", value: "20.9%", detail: "Of revenue", tone: "watch", delta: "+4.8 pp since FY21" },
      { label: "Inherited arrears", value: "₹48,733 Cr", detail: "Employees, pensioners and dues", tone: "risk" },
    ],
    charts: [
      { id: "committed-mix", title: "Committed expenditure mix", subtitle: "Share of revenue receipts", type: "donut", xKey: "name", data: [{ name: "Salaries", value: 34, color: blue }, { name: "Pensions", value: 22.7, color: violet }, { name: "Interest", value: 20.9, color: orange }, { name: "Discretionary", value: 22.4, color: teal }], series: [{ key: "value", label: "Share", color: blue }], unit: "%" },
      { id: "interest-burden", title: "Interest burden", subtitle: "Share of revenue by fiscal year", type: "line", xKey: "year", data: [{ year: "FY21", value: 16.1 }, { year: "FY22", value: 17.4 }, { year: "FY23", value: 18.6 }, { year: "FY24", value: 19.5 }, { year: "FY25", value: 20.2 }, { year: "FY26", value: 20.9 }], series: [{ key: "value", label: "Interest share", color: red }], unit: "%" },
      { id: "liabilities", title: "Liability composition", subtitle: "Outstanding liabilities (₹ Cr)", type: "bar", xKey: "name", data: [{ name: "Market borrowing", value: 312000 }, { name: "NSSF & PF", value: 98000 }, { name: "KIIFB", value: 56000 }, { name: "Treasury deposits", value: 31000 }, { name: "Others", value: 10000 }], series: [{ key: "value", label: "Liability", color: violet }], unit: "₹ Cr", horizontal: true },
    ],
    table: {
      title: "Arrears composition",
      subtitle: "Major non-plan arrear categories",
      columns: ["Category", "Amount", "Share of arrears", "Signal"],
      rows: [["DA arrears", "₹21,000 Cr", "43.1%", "Critical"], ["DR arrears", "₹14,500 Cr", "29.8%", "Critical"], ["Contractor dues", "₹9,233 Cr", "18.9%", "Watch"], ["Welfare board dues", "₹4,000 Cr", "8.2%", "Watch"]],
    },
    insight: "Committed costs consume over three quarters of revenue receipts, leaving limited flexibility for new expenditure.",
  },

  "budget-income-revenue": {
    title: "Income and revenue dashboard",
    description: "Revenue achievement, stream performance, buoyancy and arrears recovery.",
    kpis: [
      { label: "Revenue target", value: "₹1,38,000 Cr", detail: "Annual target", tone: "info" },
      { label: "Revenue actual", value: "₹1,12,400 Cr", detail: "81% achieved", tone: "good", delta: "81%" },
      { label: "Arrears", value: "₹24,462 Cr", detail: "Identified recovery pool", tone: "risk" },
      { label: "Recovered", value: "₹6,180 Cr", detail: "25.3% of arrears", tone: "watch" },
    ],
    charts: [
      { id: "revenue-streams", title: "Revenue stream performance", subtitle: "Target versus actual (₹ Cr)", type: "bar", xKey: "stream", data: revenueStreams, series: [{ key: "target", label: "Target", color: blue }, { key: "actual", label: "Actual", color: green }], unit: "₹ Cr" },
      { id: "buoyancy", title: "Revenue buoyancy", subtitle: "Fiscal trend", type: "line", xKey: "year", data: [{ year: "FY21", value: 0.71 }, { year: "FY22", value: 0.78 }, { year: "FY23", value: 0.84 }, { year: "FY24", value: 0.88 }, { year: "FY25", value: 0.90 }, { year: "FY26", value: 0.92 }], series: [{ key: "value", label: "Buoyancy", color: teal }] },
      { id: "arrears-recovery", title: "Arrears recovery funnel", subtitle: "Amount by recovery stage (₹ Cr)", type: "bar", xKey: "stage", data: [{ stage: "Identified", value: 24462 }, { stage: "Notice issued", value: 16800 }, { stage: "Under recovery", value: 9400 }, { stage: "Recovered", value: 6180 }], series: [{ key: "value", label: "Amount", color: orange }], unit: "₹ Cr" },
    ],
    table: { title: "Revenue stream register", subtitle: "Performance against target", columns: ["Stream", "Target", "Actual", "Achievement"], rows: revenueStreams.map((item) => [item.stream, `₹${item.target.toLocaleString("en-IN")} Cr`, `₹${item.actual.toLocaleString("en-IN")} Cr`, `${Math.round(item.actual / item.target * 100)}%`]) },
    insight: "Stamp duty and motor-vehicle tax are closest to target; SGST remains the largest absolute gap and recovery opportunity.",
  },

  "k-swift": {
    title: "Investments and business dashboard",
    description: "Industries project pipeline, agency delivery and operational bottlenecks used as the Stage 1 business view.",
    kpis: [
      { label: "Portfolio projects", value: "202", detail: "Across 10 agencies", tone: "info" },
      { label: "Average physical", value: "61%", detail: "Portfolio progress", tone: "watch" },
      { label: "Average financial", value: "56%", detail: "Portfolio expenditure", tone: "watch" },
      { label: "Delayed / critical", value: "34 / 9", detail: "Items needing review", tone: "risk" },
    ],
    charts: [
      { id: "agency-progress", title: "Agency delivery", subtitle: "Physical versus financial progress", type: "bar", xKey: "agency", data: [{ agency: "KSIDC", physical: 68, financial: 63 }, { agency: "KINFRA", physical: 64, financial: 58 }, { agency: "BPT-PSUs", physical: 54, financial: 49 }, { agency: "Khadi", physical: 59, financial: 52 }, { agency: "DIC", physical: 72, financial: 66 }, { agency: "Coir", physical: 74, financial: 69 }, { agency: "KSCDC", physical: 46, financial: 42 }, { agency: "K-BIP", physical: 51, financial: 47 }], series: [{ key: "physical", label: "Physical", color: blue }, { key: "financial", label: "Financial", color: amber }], unit: "%" },
      { id: "project-pipeline", title: "Project pipeline", subtitle: "Projects by delivery stage", type: "bar", xKey: "stage", data: [{ stage: "Concept", count: 24 }, { stage: "DPR", count: 31 }, { stage: "Tender", count: 28 }, { stage: "Execution", count: 72 }, { stage: "Commissioning", count: 29 }, { stage: "Operational", count: 18 }], series: [{ key: "count", label: "Projects", color: violet }] },
      { id: "bottlenecks", title: "Bottleneck load", subtitle: "Items affected by constraint", type: "bar", xKey: "constraint", data: [{ constraint: "Land readiness", count: 11 }, { constraint: "Utility / power", count: 8 }, { constraint: "Finance release", count: 9 }, { constraint: "Procurement", count: 7 }, { constraint: "Market linkage", count: 6 }, { constraint: "Clearances", count: 5 }], series: [{ key: "count", label: "Affected items", color: red }], horizontal: true },
    ],
    table: { title: "Agency portfolio", subtitle: "Selected delivery agencies", columns: ["Agency", "Projects", "Physical", "Financial", "Delay"], rows: [["KSIDC", "34", "68%", "63%", "18 days"], ["KINFRA", "27", "64%", "58%", "22 days"], ["BPT-PSUs", "95", "54%", "49%", "41 days"], ["Khadi Board", "24", "59%", "52%", "29 days"], ["DIC", "6", "72%", "66%", "12 days"], ["Coir Development", "5", "74%", "69%", "9 days"]] },
    insight: "Execution is the largest pipeline stage; land, finance release and utility readiness account for the highest bottleneck load.",
  },

  "e-health": {
    title: "Health dashboard",
    description: "Disease surveillance, hospital network, capacity and digital health activity.",
    kpis: [
      { label: "Active alerts", value: "5", detail: "Disease and capacity alerts", tone: "risk" },
      { label: "Public hospitals", value: "406", detail: "Hospital-class establishments", tone: "good" },
      { label: "Private hospitals", value: "1,150", detail: "Hospital-class establishments", tone: "info" },
      { label: "eHealth institutions", value: "1,114", detail: "Implemented institutions", tone: "good" },
      { label: "Total visits", value: "24.66 Cr", detail: "Existing CMO portal reference", tone: "info" },
    ],
    charts: [
      { id: "disease-trend", title: "Disease surveillance trend", subtitle: "Monthly reported cases", type: "line", xKey: "month", data: [
        { month: "Sep", dengue: 120, lepto: 40, chikungunya: 20 }, { month: "Oct", dengue: 140, lepto: 55, chikungunya: 18 },
        { month: "Nov", dengue: 165, lepto: 48, chikungunya: 26 }, { month: "Dec", dengue: 210, lepto: 62, chikungunya: 32 },
        { month: "Jan", dengue: 260, lepto: 70, chikungunya: 28 }, { month: "Feb", dengue: 330, lepto: 88, chikungunya: 40 },
        { month: "Mar", dengue: 410, lepto: 76, chikungunya: 44 }, { month: "Apr", dengue: 520, lepto: 94, chikungunya: 52 },
      ], series: [{ key: "dengue", label: "Dengue", color: red }, { key: "lepto", label: "Leptospirosis", color: amber }, { key: "chikungunya", label: "Chikungunya", color: violet }] },
      { id: "hospital-capacity", title: "Hospital bed capacity", subtitle: "Occupied versus available beds", type: "bar", xKey: "resource", data: [{ resource: "ICU beds", occupied: 3108, available: 1092 }, { resource: "General beds", occupied: 27400, available: 11200 }], series: [{ key: "occupied", label: "Occupied", color: pink, stackId: "capacity" }, { key: "available", label: "Available", color: green, stackId: "capacity" }] },
      { id: "institution-mix", title: "eHealth institution mix", subtitle: "Implemented facilities by type", type: "bar", xKey: "type", data: [{ type: "Medical colleges", value: 19 }, { type: "DH / GH", value: 33 }, { type: "Taluk", value: 85 }, { type: "CHC", value: 102 }, { type: "PHC / FHC", value: 578 }, { type: "Urban PHC", value: 99 }, { type: "Specialty", value: 16 }, { type: "Other", value: 182 }], series: [{ key: "value", label: "Institutions", color: teal }] },
    ],
    table: { title: "Health alerts", subtitle: "Alert records retained from the existing CMO portal", columns: ["Alert", "District", "Signal"], rows: [["Dengue threshold breached", "Palakkad", "Critical"], ["Leptospirosis cluster", "Alappuzha / Kottayam", "Watch"], ["ICU occupancy at 91%", "Kozhikode", "Watch"], ["Anti-snake venom below two weeks", "Wayanad", "Critical"]] },
    insight: "Dengue shows the steepest growth in the reference surveillance series, while ICU use remains the tightest hospital-capacity constraint.",
  },

  ksrtc: {
    title: "KSRTC service dashboard",
    description: "Ridership, revenue, service outcomes and the women’s free-travel programme.",
    kpis: [
      { label: "Total free trips", value: "78.4 Cr", detail: "Programme total", tone: "good" },
      { label: "Daily women riders", value: "10.7 L", detail: "Average per day", tone: "good", delta: "+5.9%" },
      { label: "Buses covered", value: "6,120", detail: "Across all districts", tone: "info" },
      { label: "Satisfaction", value: "93%", detail: "Passenger feedback", tone: "good" },
      { label: "Liability settled", value: "90.7%", detail: "₹2,140 Cr disbursed", tone: "watch" },
    ],
    charts: [
      { id: "rider-trend", title: "Daily rider trend", subtitle: "Average women riders (lakh/day)", type: "area", xKey: "period", data: [9.0, 9.2, 9.4, 9.6, 9.8, 10.0, 10.1, 10.7].map((value, index) => ({ period: `P${index + 1}`, value })), series: [{ key: "value", label: "Riders", color: violet }], unit: "Lakh" },
      { id: "revenue-trend", title: "Monthly ticket revenue", subtitle: "Paid-ticket revenue (₹ Cr)", type: "line", xKey: "month", data: [218.3, 221.6, 224.9, 226.1, 229.8, 231.4, 235.7, 237.2, 238.6, 240.2, 241.1, 252.4].map((value, index) => ({ month: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"][index], value })), series: [{ key: "value", label: "Revenue", color: blue }], unit: "₹ Cr" },
      { id: "trip-purpose", title: "Trip purpose", subtitle: "Share of surveyed trips", type: "donut", xKey: "name", data: [{ name: "Work", value: 35, color: blue }, { name: "Education", value: 25, color: violet }, { name: "Healthcare", value: 15, color: pink }, { name: "Shopping", value: 15, color: amber }, { name: "Other", value: 10, color: slate }], series: [{ key: "value", label: "Share", color: blue }], unit: "%" },
      { id: "target-actual", title: "Outcome performance", subtitle: "Target versus actual (%)", type: "bar", xKey: "metric", data: [{ metric: "Priority trips", target: 65, actual: 60 }, { metric: "Rural availability", target: 95, actual: 88 }, { metric: "Satisfaction", target: 95, actual: 93 }, { metric: "Settlement", target: 95, actual: 90.7 }, { metric: "Grievance SLA", target: 98, actual: 96 }], series: [{ key: "target", label: "Target", color: slate }, { key: "actual", label: "Actual", color: green }], unit: "%" },
    ],
    table: { title: "Operating indicators", subtitle: "KSRTC programme reference metrics", columns: ["Indicator", "Value", "Benchmark", "Signal"], rows: [["Average distance", "24.8 km", "Programme actual", "Good"], ["Average ticket value", "₹27.30", "Fare waived", "Info"], ["Daily services", "24,800", "Network operations", "Good"], ["Digital validation", "98.2%", "Transaction success", "Good"], ["Complaints within SLA", "96%", "98% target", "Watch"], ["Pending liability", "₹220 Cr", "₹2,360 Cr total", "Watch"]] },
    insight: "Ridership and satisfaction are close to target; rural availability and settlement timing remain the principal operating gaps.",
  },

  "economics-statistics": {
    title: "Economics and statistics dashboard",
    description: "Workforce, employment creation, labour participation and regional economic indicators.",
    kpis: [
      { label: "Employed population", value: "1.38 Cr", detail: "Estimated workforce", tone: "good" },
      { label: "New jobs", value: "1.84 L", detail: "Existing CMO portal reference", tone: "good" },
      { label: "Unemployment", value: "7.1%", detail: "Existing CMO portal reference", tone: "watch", delta: "-0.4 pp" },
      { label: "Labour participation", value: "52.8%", detail: "Overall LFPR", tone: "info" },
      { label: "Female LFPR", value: "34.6%", detail: "Participation rate", tone: "risk" },
    ],
    charts: [
      { id: "workforce-ecosystem", title: "Workforce ecosystem", subtitle: "Workers by employment segment", type: "bar", xKey: "segment", data: [{ segment: "Government", workers: 612000 }, { segment: "Public sector", workers: 284000 }, { segment: "Private sector", workers: 5740000 }, { segment: "Independent", workers: 7160000 }], series: [{ key: "workers", label: "Workers", color: blue }], horizontal: true },
      { id: "job-creation", title: "Job creation sources", subtitle: "Target versus achieved", type: "bar", xKey: "source", data: [{ source: "Government", target: 18000, achieved: 12840 }, { source: "Private drives", target: 62000, achieved: 48600 }, { source: "MNC expansion", target: 24000, achieved: 18400 }, { source: "IT parks", target: 28000, achieved: 22100 }, { source: "MSMEs", target: 54000, achieved: 41200 }, { source: "Startups", target: 26000, achieved: 22800 }], series: [{ key: "target", label: "Target", color: slate }, { key: "achieved", label: "Achieved", color: teal }] },
      { id: "economic-signals", title: "Core statistical signals", subtitle: "Percent indicators", type: "bar", xKey: "indicator", data: [{ indicator: "LFPR", value: 52.8 }, { indicator: "Female LFPR", value: 34.6 }, { indicator: "Youth unemployment", value: 18.2 }, { indicator: "Unemployment", value: 7.1 }, { indicator: "Business survival", value: 82 }], series: [{ key: "value", label: "Rate", color: violet }], unit: "%" },
    ],
    table: { title: "Employment sector snapshot", subtitle: "Selected sectors from the existing main portal", columns: ["Sector", "Employment", "New jobs", "Female share", "Average salary"], rows: [["IT and ITES", "4,26,000", "32,100", "38%", "₹56,400"], ["Healthcare", "7,42,000", "14,600", "64%", "₹32,800"], ["Manufacturing", "9,36,000", "18,400", "18%", "₹24,800"], ["Tourism", "12,60,000", "9,800", "32%", "₹21,800"], ["Transport & logistics", "8,24,000", "9,200", "12%", "₹25,400"], ["Startup ecosystem", "68,000", "22,800", "34%", "₹39,800"]] },
    insight: "Private and independent work dominate the workforce; female participation and youth unemployment remain the clearest statistical gaps.",
  },

  "disaster-management": {
    title: "Disaster monitoring dashboard",
    description: "Hazard signals, district risk, rainfall anomaly and response readiness.",
    kpis: [
      { label: "Rainfall anomaly", value: "+38%", detail: "Versus normal over 48 hours", tone: "watch" },
      { label: "Flood alert", value: "HIGH", detail: "Five districts", tone: "risk" },
      { label: "Relief camps", value: "142", detail: "On standby", tone: "good" },
      { label: "Readiness score", value: "71/100", detail: "Response preparedness", tone: "watch" },
      { label: "Dam watch", value: "82%", detail: "Idukki reservoir", tone: "watch" },
    ],
    charts: [
      { id: "district-risk", title: "District disaster risk", subtitle: "Existing CMO portal reference score", type: "bar", xKey: "district", data: [{ district: "Wayanad", risk: 92 }, { district: "Idukki", risk: 84 }, { district: "Alappuzha", risk: 78 }, { district: "Palakkad", risk: 66 }, { district: "Pathanamthitta", risk: 64 }, { district: "Kottayam", risk: 60 }, { district: "Thrissur", risk: 58 }, { district: "Malappuram", risk: 57 }, { district: "Ernakulam", risk: 55 }, { district: "Kasaragod", risk: 54 }], series: [{ key: "risk", label: "Risk score", color: red }], horizontal: true },
      { id: "hazard-profile", title: "Hazard profile", subtitle: "Operational risk signals", type: "bar", xKey: "hazard", data: [{ hazard: "Flood", score: 88 }, { hazard: "Landslide", score: 91 }, { hazard: "Dam level", score: 82 }, { hazard: "Coastal erosion", score: 74 }, { hazard: "Heat stress", score: 58 }, { hazard: "Power outage", score: 62 }], series: [{ key: "score", label: "Risk", color: orange }] },
      { id: "readiness", title: "Response readiness", subtitle: "Preparedness components", type: "donut", xKey: "name", data: [{ name: "Ready", value: 71, color: green }, { name: "Gap", value: 29, color: "#dfe6ee" }], series: [{ key: "value", label: "Share", color: green }], unit: "%" },
    ],
    table: { title: "Warning timeline", subtitle: "Operational events retained from the existing CMO portal", columns: ["Time", "Warning", "Signal"], rows: [["06:00", "Orange alert - Idukki, Wayanad, Kozhikode", "Watch"], ["09:30", "Dam shutter opening advisory - Idukki at 82%", "Watch"], ["12:15", "Landslide red alert - three Wayanad panchayats", "Critical"], ["15:40", "142 relief camps activated", "Ready"], ["18:00", "Pre-emptive coastal power shutdown", "Watch"]] },
    insight: "Wayanad and Idukki carry the highest reference risk; landslide and flood readiness should remain at the centre of the response view.",
  },

  cmo: {
    title: "CMO dashboard",
    description: "Executive delivery, grievances, sector performance and the decision queue.",
    kpis: [
      { label: "Governance score", value: "72/100", detail: "State pulse", tone: "watch", delta: "+3" },
      { label: "Critical alerts", value: "7", detail: "Needs CM action", tone: "risk" },
      { label: "Grievance SLA", value: "69%", detail: "Resolved within SLA", tone: "watch", delta: "+5 pp" },
      { label: "Delayed projects", value: "38", detail: "Red and amber", tone: "risk" },
      { label: "Investment grounding", value: "31%", detail: "MoU to ground", tone: "risk", delta: "+6 pp" },
    ],
    charts: [
      { id: "sector-performance", title: "Sector performance", subtitle: "Executive score by portfolio", type: "bar", xKey: "sector", data: [{ sector: "Welfare", score: 82 }, { sector: "Health", score: 71 }, { sector: "Education", score: 78 }, { sector: "Infrastructure", score: 55 }, { sector: "Finance", score: 58 }, { sector: "Revenue", score: 66 }, { sector: "Environment", score: 64 }, { sector: "Grievances", score: 69 }], series: [{ key: "score", label: "Score", color: blue }], unit: "%" },
      { id: "delivery-funnel", title: "Direction-to-closure funnel", subtitle: "Delivery completion by workflow stage", type: "bar", xKey: "stage", data: [{ stage: "CM direction", value: 96 }, { stage: "Acknowledged", value: 82 }, { stage: "ATR submitted", value: 61 }, { stage: "Evidence", value: 58 }, { stage: "Closed", value: 44 }], series: [{ key: "value", label: "Completion", color: violet }], unit: "%", horizontal: true },
      { id: "grievance-trend", title: "Grievance flow", subtitle: "Received versus resolved by week", type: "area", xKey: "week", data: grievanceTrend, series: [{ key: "received", label: "Received", color: orange }, { key: "resolved", label: "Resolved", color: green }] },
      { id: "project-delay", title: "Delayed major projects", subtitle: "Physical versus financial progress", type: "bar", xKey: "project", data: [{ project: "Vizhinjam P2", physical: 62, financial: 58 }, { project: "Outer ring road", physical: 41, financial: 47 }, { project: "Thalassery bypass", physical: 73, financial: 70 }, { project: "Sabari rail", physical: 28, financial: 33 }, { project: "Kozhikode hub", physical: 55, financial: 61 }], series: [{ key: "physical", label: "Physical", color: blue }, { key: "financial", label: "Financial", color: amber }], unit: "%" },
    ],
    table: { title: "Items for review", subtitle: "Cross-department matters retained from the existing CMO portal", columns: ["Matter", "Owner", "Signal", "Next focus"], rows: [["Revenue arrears recovery", "Revenue Secretary", "High", "Recovery plan"], ["Files over 90 days", "Revenue Secretary", "Watch", "Disposal plan"], ["Girl student DBT failures", "Education Secretary", "Watch", "Reconciliation"], ["Wayanad landslide readiness", "Chief Secretary", "High", "Preparedness review"], ["Plan absorption gaps", "Finance Secretary", "Watch", "Department review"]] },
    insight: "The largest delivery drop occurs between acknowledgement and Action Taken Reports; project delays and grievance closure need coordinated secretary review.",
  },

  "mission-samudra": {
    title: "Mission Samudra dashboard",
    description: "Programme financing, annual investment flow, stage progress and maritime delivery.",
    kpis: [
      { label: "Total investment", value: "₹72,115 Cr", detail: "Ten-year programme", tone: "info" },
      { label: "Private capital", value: "70%", detail: "₹50,500 Cr", tone: "good" },
      { label: "Activities", value: "33", detail: "Across three stages", tone: "info" },
      { label: "Jobs potential", value: "2.4 L+", detail: "Direct and indirect", tone: "good" },
      { label: "Vizhinjam capacity", value: "10M+ TEUs", detail: "Phase 3 target", tone: "info" },
    ],
    charts: [
      { id: "investment-flow", title: "Annual investment flow", subtitle: "Funding by source (₹ Cr)", type: "bar", xKey: "year", data: [
        { year: "FY26", private: 800, gok: 900, goi: 150 }, { year: "FY27", private: 2250, gok: 2065, goi: 400 },
        { year: "FY28", private: 8500, gok: 3200, goi: 1500 }, { year: "FY29", private: 8500, gok: 3200, goi: 1500 },
        { year: "FY30", private: 1550, gok: 750, goi: 650 }, { year: "FY31", private: 5000, gok: 1100, goi: 400 },
        { year: "FY32", private: 5350, gok: 1100, goi: 550 }, { year: "FY33", private: 5000, gok: 900, goi: 250 },
        { year: "FY34", private: 5000, gok: 350, goi: 250 }, { year: "FY35", private: 4000, gok: 350, goi: 250 },
      ], series: [{ key: "private", label: "Private", color: violet, stackId: "fund" }, { key: "gok", label: "Government of Kerala", color: navy, stackId: "fund" }, { key: "goi", label: "Government of India", color: green, stackId: "fund" }], unit: "₹ Cr" },
      { id: "financing-mix", title: "Financing mix", subtitle: "Programme capital by source", type: "donut", xKey: "name", data: [{ name: "Private", value: 50500, color: violet }, { name: "Government of Kerala", value: 15065, color: navy }, { name: "Government of India", value: 6550, color: green }], series: [{ key: "value", label: "Funding", color: violet }], unit: "₹ Cr" },
      { id: "category-allocation", title: "Programme allocation", subtitle: "Investment by activity category", type: "bar", xKey: "category", data: [{ category: "Vizhinjam & major infra", value: 54650 }, { category: "Minor ports & clusters", value: 14400 }, { category: "Policy / governance / social", value: 3065 }], series: [{ key: "value", label: "Investment", color: cyan }], unit: "₹ Cr" },
      { id: "stage-progress", title: "Stage progress", subtitle: "Programme progress by stage", type: "bar", xKey: "stage", data: [{ stage: "Stage 1", progress: 46 }, { stage: "Stage 2", progress: 66 }, { stage: "Stage 3", progress: 79 }], series: [{ key: "progress", label: "Progress", color: amber }], unit: "%" },
    ],
    table: { title: "Programme milestones", subtitle: "Roadmap retained from the existing CMO portal", columns: ["Milestone", "Timing", "Stage", "Signal"], rows: [["Authority constituted and PPP template", "Sep 2026", "Stage 1", "Complete"], ["EXIM gateway and CONCOR ICD", "Mar 2027", "Stage 1", "Active"], ["Vizhinjam Phase 2 commissioning", "Mar 2029", "Stage 2", "Planned"], ["Rail tunnel and Azhikkal industrial park", "Mar 2031", "Stage 2", "Planned"], ["Phase 3 and green bunkering", "Mar 2035", "Stage 3", "Planned"]] },
    insight: "Private capital is the dominant funding source, with FY28-FY29 carrying the highest annual investment flow in the reference roadmap.",
  },
};

export const chartPalette = { blue, navy, teal, green, amber, orange, red, violet, pink, cyan, slate };
