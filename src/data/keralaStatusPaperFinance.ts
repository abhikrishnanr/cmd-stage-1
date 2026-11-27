export const KERALA_STATUS_PAPER_URL =
  "https://www.finance.kerala.gov.in/includeWeb/fileViewer.jsp?dId=d6we5vb8ya9zc7x";

export const KERALA_STATUS_PAPER_UPDATED_AT = "04 Jun 2026 (published)";

export interface StatusPaperMetric {
  id: string;
  label: string;
  value: number;
  unit: "₹ Cr" | "%" | "pp" | "months";
  period: string;
  basis: string;
  page: number;
  sourceOwner: string;
  referenceValue?: number;
  referenceLabel?: string;
  note?: string;
}

export const statusPaperTreasury: StatusPaperMetric[] = [
  { id: "treasury-cash-2025-26", label: "Treasury closing cash", value: 6322.36, unit: "₹ Cr", period: "31 Mar 2026", basis: "Closing balance", page: 49, sourceOwner: "Finance Department data" },
  { id: "treasury-cash-apr-2026", label: "Treasury cash", value: 5263.74, unit: "₹ Cr", period: "30 Apr 2026", basis: "Month-end balance", page: 49, sourceOwner: "Finance Department data" },
  { id: "treasury-cash-may-2026", label: "Treasury cash", value: 2211.93, unit: "₹ Cr", period: "16 May 2026", basis: "Intra-month balance", page: 49, sourceOwner: "Finance Department data" },
  { id: "negative-closing-months", label: "Months with negative closing balance", value: 7, unit: "months", period: "FY 2025-26", basis: "Monthly treasury closing balance", page: 51, sourceOwner: "Finance Department data" },
];

export const statusPaperBorrowing: StatusPaperMetric[] = [
  { id: "open-market-borrowing", label: "Open-market borrowing", value: 49788, unit: "₹ Cr", period: "FY 2025-26", basis: "Annual borrowing", page: 53, sourceOwner: "Finance Department data" },
  { id: "committed-liability-outflow", label: "Committed-liability outflow", value: 55170.7, unit: "₹ Cr", period: "FY 2025-26", basis: "Debt-service and loan-related committed-liability outflow", page: 53, sourceOwner: "Finance Department data", referenceValue: 49788, referenceLabel: "Open-market borrowing", note: "111% of annual open-market borrowing; includes OMB repayments, NSSF, LIC, GIC, NCDC, central loans, EAP and NABARD." },
  { id: "net-cash-flow", label: "Net cash flow", value: 4243.3, unit: "₹ Cr", period: "FY 2025-26", basis: "Status-paper cash-flow series", page: 53, sourceOwner: "Finance Department data" },
  { id: "march-borrowing", label: "March open-market borrowing", value: 8450, unit: "₹ Cr", period: "Mar 2026", basis: "Monthly borrowing", page: 56, sourceOwner: "Finance Department data", note: "17% of FY 2025-26 open-market borrowing." },
];

export const statusPaperArrears: StatusPaperMetric[] = [
  { id: "arrears-total", label: "Inherited arrears", value: 48733, unit: "₹ Cr", period: "31 Mar 2026", basis: "Outstanding obligations", page: 61, sourceOwner: "Finance Department data" },
  { id: "arrears-da", label: "Dearness allowance arrears", value: 21670, unit: "₹ Cr", period: "31 Mar 2026", basis: "Outstanding obligations", page: 61, sourceOwner: "Finance Department data" },
  { id: "arrears-dr", label: "Dearness relief arrears", value: 14387, unit: "₹ Cr", period: "31 Mar 2026", basis: "Outstanding obligations", page: 61, sourceOwner: "Finance Department data" },
  { id: "arrears-bill-discounting", label: "Bill discounting", value: 3431, unit: "₹ Cr", period: "31 Mar 2026", basis: "Outstanding obligations", page: 61, sourceOwner: "Finance Department data" },
  { id: "arrears-kasp", label: "SHA / KASP", value: 2017, unit: "₹ Cr", period: "31 Mar 2026", basis: "Outstanding obligations", page: 61, sourceOwner: "Finance Department data" },
  { id: "arrears-supplyco", label: "Supplyco", value: 2893, unit: "₹ Cr", period: "31 Mar 2026", basis: "Outstanding obligations", page: 61, sourceOwner: "Finance Department data" },
  { id: "arrears-lsgd", label: "Local-government bodies", value: 1982, unit: "₹ Cr", period: "31 Mar 2026", basis: "Outstanding obligations", page: 61, sourceOwner: "Finance Department data" },
];

export const statusPaperRevenueBudget: StatusPaperMetric[] = [
  { id: "state-own-tax-revenue", label: "State Own Tax Revenue", value: 83731, unit: "₹ Cr", period: "FY 2025-26", basis: "Status-paper reported figure", page: 84, sourceOwner: "Finance Department data", referenceValue: 91515, referenceLabel: "BE reference", note: "Reported at 92% of BE; not an audited final account." },
  { id: "revenue-expenditure", label: "Revenue expenditure", value: 173972, unit: "₹ Cr", period: "FY 2025-26", basis: "Status-paper reported / preliminary figure", page: 86, sourceOwner: "Finance Department data", referenceValue: 97, referenceLabel: "% of BE", note: "Do not treat as audited final accounts." },
  { id: "capital-expenditure", label: "Capital expenditure", value: 18484, unit: "₹ Cr", period: "FY 2025-26", basis: "Status-paper reported / preliminary figure", page: 86, sourceOwner: "Finance Department data", referenceValue: 97, referenceLabel: "% of BE", note: "Do not treat as audited final accounts." },
  { id: "plan-expenditure", label: "Plan expenditure", value: 33779, unit: "₹ Cr", period: "FY 2025-26", basis: "Status-paper reported / preliminary figure", page: 86, sourceOwner: "Finance Department data", referenceValue: 108, referenceLabel: "% of BE", note: "Plan definitions may include KIIFB/PSE spending in some series." },
  { id: "central-transfer-shortfall", label: "Central-transfer revision shortfall", value: 20500.47, unit: "₹ Cr", period: "FY 2026-27", basis: "Interim assumption versus revised projection", page: 87, sourceOwner: "Finance Department data", referenceValue: 59774.11, referenceLabel: "Interim assumption", note: "Forecast/revision scenario, not realised cash. Revised projection ₹39,273.64 Cr." },
];

export const statusPaperKiifb: StatusPaperMetric[] = [
  { id: "kiifb-inflows", label: "KIIFB cumulative inflows", value: 74170.68, unit: "₹ Cr", period: "31 Mar 2026", basis: "Cumulative inflows", page: 93, sourceOwner: "Finance Department data" },
  { id: "kiifb-borrowings", label: "KIIFB borrowings", value: 42053.2, unit: "₹ Cr", period: "31 Mar 2026", basis: "Cumulative borrowings", page: 93, sourceOwner: "Finance Department data" },
  { id: "kiifb-finance-cost", label: "KIIFB finance cost", value: 10198.34, unit: "₹ Cr", period: "31 Mar 2026", basis: "Cumulative finance cost", page: 94, sourceOwner: "Finance Department data" },
  { id: "kiifb-project-payments", label: "KIIFB project payments", value: 42904.63, unit: "₹ Cr", period: "31 Mar 2026", basis: "Cumulative project payments", page: 94, sourceOwner: "Finance Department data" },
  { id: "kiifb-fund-balance", label: "KIIFB fund balance", value: 10722.25, unit: "₹ Cr", period: "31 Mar 2026", basis: "Fund balance", page: 94, sourceOwner: "Finance Department data" },
  { id: "kiifb-estimated-obligation", label: "Estimated KIIFB obligation", value: 56000, unit: "₹ Cr", period: "Status-paper estimate", basis: "Estimated combined obligation", page: 95, sourceOwner: "Finance Department data", note: "Estimate; reconcile project-scope differences before combining with project totals." },
  { id: "kiifb-cost-spread", label: "KIIFB borrowing-cost spread", value: 1.6, unit: "pp", period: "FY 2025-26 RE", basis: "KIIFB 8.87% less Government 7.27%", page: 97, sourceOwner: "Finance Department data" },
];

export const statusPaperPse: StatusPaperMetric[] = [
  { id: "pse-investment", label: "Government investment in PSEs", value: 44846, unit: "₹ Cr", period: "FY 2024-25", basis: "Government investment", page: 105, sourceOwner: "Finance Department data" },
  { id: "pse-net-loss", label: "PSE net loss", value: 1962.73, unit: "₹ Cr", period: "FY 2024-25", basis: "Net loss", page: 109, sourceOwner: "Finance Department data" },
  { id: "pse-accumulated-loss", label: "PSE accumulated loss", value: 72851.2, unit: "₹ Cr", period: "FY 2024-25", basis: "Table 5.7", page: 109, sourceOwner: "Finance Department data", note: "Executive summary states ₹78,851 Cr; table value retained with reconciliation flag." },
  { id: "pse-budget-support", label: "PSE budget support", value: 2401.83, unit: "₹ Cr", period: "FY 2024-25", basis: "Budget support", page: 111, sourceOwner: "Finance Department data" },
  { id: "pse-dividends", label: "PSE dividends", value: 248.79, unit: "₹ Cr", period: "FY 2024-25", basis: "Dividends", page: 111, sourceOwner: "Finance Department data" },
];

export const statusPaperDevelopment: StatusPaperMetric[] = [
  { id: "plan-share", label: "Plan expenditure share", value: 17.55, unit: "%", period: "FY 2025-26 RE", basis: "Share of total expenditure", page: 130, sourceOwner: "Finance Department data" },
  { id: "social-plan-share", label: "Social services share of plan expenditure", value: 30.68, unit: "%", period: "FY 2025-26 RE", basis: "Plan expenditure composition", page: 132, sourceOwner: "Finance Department data" },
  { id: "agriculture-plan-share", label: "Agriculture share of plan expenditure", value: 2.7, unit: "%", period: "FY 2025-26 RE", basis: "Plan expenditure composition", page: 133, sourceOwner: "Finance Department data" },
  { id: "scsp-utilisation", label: "SCSP utilisation", value: 83.49, unit: "%", period: "FY 2024-25", basis: "Plan utilisation", page: 137, sourceOwner: "Finance Department data" },
  { id: "tsp-utilisation", label: "TSP utilisation", value: 64.15, unit: "%", period: "FY 2024-25", basis: "Plan utilisation", page: 138, sourceOwner: "Finance Department data" },
];

export const statusPaperCmSignals = [
  {
    id: "treasury-liquidity",
    label: "Treasury cash",
    value: "₹2,211.93 Cr",
    detail: "16 May 2026 · 65.0% below the 31 Mar closing balance",
    rag: "red" as const,
    action: "Require a rolling 13-week cash and borrowing schedule.",
    metric: statusPaperTreasury[2],
  },
  {
    id: "arrears",
    label: "Inherited arrears",
    value: "₹48,733 Cr",
    detail: "Outstanding at 31 Mar 2026",
    rag: "red" as const,
    action: "Sequence settlement by statutory risk and service impact.",
    metric: statusPaperArrears[0],
  },
  {
    id: "central-transfer-gap",
    label: "Central-transfer revision",
    value: "−₹20,500.47 Cr",
    detail: "FY 2026-27 forecast revision; not realised cash",
    rag: "red" as const,
    action: "Activate the revenue and expenditure downside scenario.",
    metric: statusPaperRevenueBudget[4],
  },
  {
    id: "kiifb-cost",
    label: "KIIFB cost spread",
    value: "+1.60 pp",
    detail: "KIIFB 8.87% vs Government 7.27% · FY 2025-26 RE",
    rag: "amber" as const,
    action: "Review refinancing and project-prioritisation options.",
    metric: statusPaperKiifb[6],
  },
  {
    id: "kiifb-obligation",
    label: "Estimated KIIFB obligation",
    value: "₹56,000 Cr",
    detail: "Status-paper estimate · reconcile project scope before aggregation",
    rag: "amber" as const,
    action: "Validate the obligation scope and sequence refinancing decisions.",
    metric: statusPaperKiifb[5],
  },
  {
    id: "pse-loss",
    label: "PSE net loss",
    value: "₹1,962.73 Cr",
    detail: "FY 2024-25",
    rag: "amber" as const,
    action: "Time-bound the turnaround and exit review for loss-makers.",
    metric: statusPaperPse[1],
  },
  {
    id: "pse-accumulated-loss",
    label: "PSE accumulated loss",
    value: "₹72,851.20 Cr",
    detail: "FY 2024-25 · table value retained; executive-summary conflict flagged",
    rag: "red" as const,
    action: "Reconcile the conflicting summary and table totals before publication.",
    metric: statusPaperPse[2],
  },
  {
    id: "pse-budget-support",
    label: "PSE budget support",
    value: "₹2,401.83 Cr",
    detail: "FY 2024-25",
    rag: "amber" as const,
    action: "Link future support to enterprise-specific turnaround milestones.",
    metric: statusPaperPse[3],
  },
  {
    id: "plan-expenditure-share",
    label: "Plan expenditure share",
    value: "17.55%",
    detail: "FY 2025-26 RE · supporting reference, not actual",
    rag: "amber" as const,
    action: "Protect high-impact plan expenditure in the cash calendar.",
    metric: statusPaperDevelopment[0],
  },
  {
    id: "scsp-utilisation",
    label: "SCSP utilisation",
    value: "83.49%",
    detail: "FY 2024-25 plan utilisation",
    rag: "amber" as const,
    action: "Close scheme-level utilisation gaps before the next release cycle.",
    metric: statusPaperDevelopment[3],
  },
  {
    id: "tsp-utilisation",
    label: "TSP utilisation",
    value: "64.15%",
    detail: "FY 2024-25 plan utilisation",
    rag: "red" as const,
    action: "Require a department-wise tribal-plan recovery schedule.",
    metric: statusPaperDevelopment[4],
  },
];
