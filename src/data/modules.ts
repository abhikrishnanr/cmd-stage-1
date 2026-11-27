import { ModuleDatum, Rag, SourceSystem } from "./types";

function spark(seed: number): number[] {
  return Array.from({ length: 12 }, (_, i) => 40 + ((seed * (i + 2) * 7) % 55));
}
function rag(s: number): Rag {
  return s >= 75 ? "green" : s >= 60 ? "amber" : "red";
}

const M = (
  code: string, name: string, group: string, score: number,
  source: string, lastSync: string, confidence: number, alerts: number, tickets: number
): ModuleDatum => ({ code, name, group, score, rag: rag(score), source, lastSync, confidence, alerts, tickets, spark: spark(score) });

export const modules: ModuleDatum[] = [
  M("M-01", "Election Manifesto KPI Dashboard", "Manifesto & Welfare", 79, "K-SMART, KASP, KSIDC", "8 min ago", 94, 3, 6),
  M("M-02", "Social Security Pension Statistics", "Manifesto & Welfare", 88, "K-SMART, Suneethi", "12 min ago", 96, 1, 2),
  M("M-20", "Scholarships and Grants", "Manifesto & Welfare", 74, "e-Grantz", "1 hr ago", 88, 2, 3),
  M("M-24", "Transportation", "Manifesto & Welfare", 81, "KSRTC, Smart City", "26 min ago", 90, 1, 1),

  M("M-19", "Finance & Budget Utilisation Monitor", "Finance & Revenue", 58, "BIMS, BAMS, SPARK", "9 min ago", 91, 5, 8),
  M("M-03", "Plan Fund Utilisation", "Finance & Revenue", 62, "Planspace", "1 hr ago", 86, 4, 5),
  M("M-18", "Revenue & Taxes Collection", "Finance & Revenue", 66, "ReLIS, KVATIS, PEARL", "14 min ago", 89, 3, 4),

  M("M-05", "Health Status Indicators", "Health & Human Development", 71, "e-Health, SDHM, RCH/HMIS", "13-06-2026", 96, 4, 5),
  M("M-06", "Higher Education Indicators", "Health & Human Development", 76, "Collegiate Education", "Monthly", 84, 1, 2),
  M("M-07", "School Performance Indicators", "Health & Human Development", 80, "SAMAGRA, SAMS", "Monthly", 85, 1, 1),
  M("M-14", "UN SDG Performance Indicators", "Health & Human Development", 73, "RCH/HMIS, Labour, PSC, Data Portal", "Weekly", 82, 2, 2),

  M("M-13", "Infrastructure & Public Works Monitor", "Infrastructure & Economy", 55, "PWD PMS, SUGAMA, KIIFB", "1 hr ago", 87, 6, 9),
  M("M-08", "Agriculture Production Indicators", "Infrastructure & Economy", 70, "AIMS, Econ & Stats", "Weekly", 80, 1, 2),
  M("M-09", "Fisheries Production Indicators", "Infrastructure & Economy", 68, "Fisheries Dept Portal", "Monthly", 78, 2, 1),
  M("M-22", "Electrification", "Infrastructure & Economy", 84, "KSEB", "20 min ago", 91, 1, 1),

  M("M-10", "Forest & Wildlife Indicators", "Environment & Livelihood", 72, "Forest & Wildlife Dept", "Monthly", 79, 2, 1),
  M("M-11", "CMDRF Statistics", "Environment & Livelihood", 77, "CMDRF System", "30 min ago", 88, 1, 2),
  M("M-17", "Environment & Climate Change", "Environment & Livelihood", 64, "KSPCB, CWRDM", "Weekly", 81, 3, 3),
  M("M-23", "Drinking Water & Sanitation", "Environment & Livelihood", 67, "KWA", "40 min ago", 86, 2, 2),
  M("M-21", "Food and Civil Supplies", "Environment & Livelihood", 83, "e-PDS", "35 min ago", 90, 1, 1),

  M("M-04", "Scheme Delivery KPI", "Citizen Services & Governance", 75, "Nammude Keralam", "18 min ago", 89, 2, 3),
  M("M-12", "Government File Statistics", "Citizen Services & Governance", 53, "e-Office, CMO Portal", "11 min ago", 90, 7, 10),
  M("M-15", "Social Media Monitoring", "Citizen Services & Governance", 60, "Social Media API / NLP", "Real-time", 76, 4, 2),
  M("M-16", "Grievance Redressal Analytics", "Citizen Services & Governance", 69, "CMO, Nammude Keralam", "13 min ago", 88, 5, 6),
  M("M-25", "Municipal Corporation & Panchayats", "Citizen Services & Governance", 71, "ILGMS, K-SMART", "Weekly", 84, 2, 3),
];

export const moduleGroups = [
  "Manifesto & Welfare",
  "Finance & Revenue",
  "Health & Human Development",
  "Infrastructure & Economy",
  "Environment & Livelihood",
  "Citizen Services & Governance",
];

const S = (name: string, method: string, frequency: string, lastSync: string, status: SourceSystem["status"], confidence: number, feeds: string): SourceSystem =>
  ({ name, method, frequency, lastSync, status, confidence, feeds });

export const sourceSystems: SourceSystem[] = [
  S("K-SMART", "REST API", "Daily", "8 min ago", "live", 96, "Civil Registration, Property Tax, Building Permit, Grievances, Finance, File Management"),
  S("KASP / SDHM", "REST API", "15 Min", "3 min ago", "live", 95, "Healthcare, KASP Guarantee"),
  S("KSIDC Portal", "REST API", "Daily", "1 hr ago", "live", 90, "Youth Loans, MSMEs"),
  S("Suneethi Portal", "SFTP / API", "Daily", "2 hr ago", "delayed", 84, "Social Security Statistics"),
  S("Planspace", "DB Replication", "Daily", "1 hr ago", "live", 86, "Plan Fund Utilisation"),
  S("Nammude Keralam", "REST API", "Hourly", "18 min ago", "live", 89, "Scheme Delivery, Grievances"),
  S("e-Health / HMIS", "REST API", "Weekly", "13-06-2026", "live", 96, "Institutions, UHID, Visits, Lab, Health Indicators, SDG"),
  S("Higher Education Portal", "CSV Upload", "Monthly", "9 days ago", "live", 84, "Education Indicators"),
  S("SAMAGRA", "API / CSV", "Monthly", "12 days ago", "live", 85, "School Performance"),
  S("SAMANWAYA", "API / CSV", "Monthly", "12 days ago", "live", 83, "School Performance"),
  S("SAMS", "API / CSV", "Monthly", "12 days ago", "delayed", 80, "School Performance"),
  S("AIMS", "DB Replication", "Weekly", "3 days ago", "live", 80, "Agriculture Indicators"),
  S("Fisheries Dept Portal", "CSV Upload", "Monthly", "21 days ago", "failed", 71, "Fisheries Indicators"),
  S("Forest & Wildlife Dept", "CSV Upload", "Monthly", "15 days ago", "live", 79, "Forest Indicators"),
  S("CMDRF System", "REST API", "Daily", "30 min ago", "live", 88, "CMDRF Statistics"),
  S("CMO Portal", "REST API", "15 Min", "11 min ago", "live", 90, "Grievances, File Pendency"),
  S("PWD PMS", "REST API", "Daily", "1 hr ago", "live", 87, "Infrastructure Monitor"),
  S("SUGAMA", "REST API", "Daily", "1 hr ago", "live", 86, "PWD utility permissions, road cutting, restoration status"),
  S("KIIFB Dashboard", "REST API", "Daily", "5 hr ago", "delayed", 78, "Infrastructure Monitor"),
  S("BIMS / BAMS", "DB Replication", "Daily", "9 min ago", "live", 91, "Finance & Budget"),
  S("SPARK / Treasury", "REST API", "Daily", "9 min ago", "live", 92, "Finance & Budget, Payroll"),
  S("e-Grantz", "REST API", "Weekly", "4 days ago", "live", 88, "Scholarships & Grants"),
  S("e-PDS", "REST API", "Daily", "35 min ago", "live", 90, "Food & Civil Supplies"),
  S("KSEB", "REST API", "Daily", "20 min ago", "live", 91, "Electrification"),
  S("KWA", "REST API", "Daily", "40 min ago", "live", 86, "Drinking Water"),
  S("KSRTC", "CSV / API", "Monthly", "26 min ago", "live", 90, "Transportation"),
  S("ILGMS", "CV / REST API", "Weekly", "2 days ago", "live", 84, "Municipal, Panchayats"),
  S("Revenue ReLIS", "DB Replication", "Daily", "1 hr ago", "live", 89, "Revenue & Taxes"),
  S("Commercial Taxes", "REST API", "Daily", "1 hr ago", "live", 88, "GST State Share"),
  S("Labour Welfare Portal", "REST API", "Monthly", "8 days ago", "live", 82, "SDG Indicators"),
  S("Kerala PSC", "REST API", "Monthly", "8 days ago", "live", 81, "Employment SDG"),
  S("Social Media APIs", "Real-Time API", "Real-Time", "Live", "live", 76, "Social Sentiment"),
  S("Kerala Data Portal", "CSV / XLSX", "Dataset specific", "Periodic", "live", 82, "Open datasets, SDG, health, fiscal, sector statistics"),
  S("KSPCB / Environment", "REST API / CSV", "Weekly", "5 days ago", "delayed", 81, "Environment Indicators"),
  S("CWRDM / Climate Cell", "CSV Upload", "Monthly", "18 days ago", "live", 80, "Coastal, Climate"),
  S("Vizhinjam / Port ICT", "REST API", "Weekly", "3 days ago", "live", 85, "Mission Samudra"),
  S("Industries Dept", "CSV / API", "Weekly", "4 days ago", "live", 83, "Aviation & Transit"),
];
