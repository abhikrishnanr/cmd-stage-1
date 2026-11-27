export const riskRegister = [
  { risk: "Coalition management", nature: "Political", mitigation: "Parliamentary Advisory Council, transparent data", residual: "amber" as const, owner: "CM Office", review: "Monthly" },
  { risk: "Staff resistance", nature: "Organisational", mitigation: "DTOs embedded, performance contracts", residual: "amber" as const, owner: "Chief Secretary", review: "Monthly" },
  { risk: "Political cycle disruption", nature: "Political", mitigation: "Institutionalise via GO, gazette POCs", residual: "amber" as const, owner: "Governance Advisor", review: "Quarterly" },
  { risk: "Data quality failure", nature: "Technical", mitigation: "Freshness checks, third-party verification", residual: "red" as const, owner: "Chief Data Officer", review: "Weekly" },
  { risk: "Focus dilution", nature: "Strategic", mitigation: "Tier-1 POC discipline, no empty stage", residual: "green" as const, owner: "Governance Advisor", review: "Monthly" },
  { risk: "Revenue mobilisation underperformance", nature: "Fiscal", mitigation: "Revenue Intelligence Cell, weekly gaps", residual: "amber" as const, owner: "Revenue Secretary", review: "Weekly" },
  { risk: "Fiscal constraints", nature: "Fiscal", mitigation: "Cost reduction, IGR unlock, advocacy", residual: "red" as const, owner: "Finance Secretary", review: "Monthly" },
];

export const dataControls = [
  { name: "Freshness", value: 91, icon: "RefreshCw" },
  { name: "Completeness", value: 87, icon: "CheckCircle" },
  { name: "Duplicate Check", value: 94, icon: "Copy" },
  { name: "Anomaly Detection", value: 82, icon: "Activity" },
  { name: "Source Confidence", value: 86, icon: "ShieldCheck" },
  { name: "Third-party Verification", value: 73, icon: "UserCheck" },
];

export const auditTrail = [
  { time: "08:12", text: "K-SMART ingestion completed — 12,400 records", rag: "green" as const },
  { time: "09:30", text: "Finance Secretary opened TK-2039 (KIIFB note)", rag: "blue" as const },
  { time: "11:05", text: "Fisheries feed marked FAILED — confidence 71%", rag: "red" as const },
  { time: "13:40", text: "CM created review ticket — Dengue cluster", rag: "amber" as const },
  { time: "15:20", text: "Role change: District Officer (Wayanad) export granted", rag: "blue" as const },
];

export const rbac = [
  { role: "Chief Minister", view: "All", export: "All" },
  { role: "Chief / Dept Secretary", view: "Department + state", export: "Department" },
  { role: "District Officer", view: "District only", export: "District" },
  { role: "PMU Admin", view: "All + system", export: "All" },
  { role: "Public View", view: "Public summary", export: "Public reports" },
];
