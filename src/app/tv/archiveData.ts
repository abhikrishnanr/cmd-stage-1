import type { AlertItem } from "@/data/types";

// These fixtures preserve the TV wall’s pre-audit demonstration values.
export const archiveAlerts: AlertItem[] = [
  { rag: "red", text: "Dengue positivity up 34% WoW in Palakkad — outbreak threshold breached", owner: "Health Secretary", time: "22 min ago" },
  { rag: "red", text: "Wayanad landslide risk HIGH — 48hr rainfall anomaly +180%", owner: "Disaster Mgmt", time: "1 hr ago" },
  { rag: "amber", text: "Suneethi pension feed delayed 2 hrs — 2,340 records pending", owner: "LSGD Secretary", time: "2 hr ago" },
  { rag: "amber", text: "KIIFB feed stale (5 hrs) — project progress confidence dropped to 78%", owner: "Finance Secretary", time: "3 hr ago" },
  { rag: "blue", text: "₹25L health insurance crosses 92.4 lakh families enrolled (+12% YoY)", owner: "Health Secretary", time: "4 hr ago" },
  { rag: "green", text: "Free KSRTC travel — 10.7 lakh daily women riders, satisfaction 93%", owner: "Transport", time: "5 hr ago" },
];

export const archiveTicker: AlertItem[] = [
  { rag: "red", text: "Dengue cluster Palakkad — outbreak threshold breached" },
  { rag: "red", text: "Wayanad landslide risk HIGH — evacuate 3 panchayats on standby" },
  { rag: "amber", text: "Pension feed delayed — 2,340 disbursements pending verification" },
  { rag: "blue", text: "Health insurance enrolment crosses 92.4 lakh families" },
  { rag: "green", text: "KSRTC women ridership at all-time high 10.7 lakh/day" },
  { rag: "amber", text: "GST arrears recovery 18% below target this quarter" },
  { rag: "green", text: "₹3,000 pension paid to 46.8 lakh beneficiaries — 96% on time" },
  { rag: "blue", text: "Vizhinjam container throughput up 21% — Mission Samudra Stage 1" },
  { rag: "red", text: "File pendency >90 days rising in Revenue Dept — 1,240 files" },
];

export const archiveFiscalPulse = [
  { label: "Outstanding Liabilities", value: "₹5.07L Cr", rag: "red" },
  { label: "Inherited Arrears", value: "₹48,733 Cr", rag: "red" },
  { label: "Central Transfer Shortfall", value: "₹20,500 Cr", rag: "amber" },
  { label: "Committed Expenditure", value: "77.6%", rag: "red" },
  { label: "PSU Annual Losses", value: "₹1,874 Cr", rag: "amber" },
  { label: "KIIFB Obligation", value: "₹56,000 Cr", rag: "amber" },
] as const;
