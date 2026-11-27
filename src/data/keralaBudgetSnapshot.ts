export const KERALA_BUDGET_FINANCIAL_YEAR_START = 2026;
export const KERALA_BUDGET_FINANCIAL_YEAR = "2026-27";
export const KERALA_BUDGET_SNAPSHOT_FETCHED_AT = "2026-11-26T16:57:46.000Z";

export const KERALA_BUDGET_INCOME_URL = "https://budget.kerala.gov.in/reports/sourceofincome";
export const KERALA_BUDGET_EXPENDITURE_URL = "https://budget.kerala.gov.in/reports/sourceofexpenditure";
export const KERALA_BUDGET_AT_A_GLANCE_URL = "https://budget.kerala.gov.in/reports/budgetataglance";
export const KERALA_BUDGET_OVERALL_POSITION_URL = "https://budget.kerala.gov.in/reports/trendoverallposition";
export const KERALA_BUDGET_TAX_DUTIES_URL = "https://budget.kerala.gov.in/reports/taxandduties";
export const KERALA_BUDGET_TAX_NON_TAX_URL = "https://budget.kerala.gov.in/reports/taxnontaxrevenue";

export type KeralaBudgetDataMode = "live" | "snapshot";
export type KeralaBudgetSourceKind = "income" | "expenditure" | "budgetAtGlance" | "overallPosition" | "taxDuties" | "taxNonTax";
export type KeralaBudgetBasis = "Budget estimate / portal report" | "Accounts / BE / RE" | "Accounts / RE / BE trend";

export interface KeralaBudgetHead {
  id: string;
  label: string;
  value: number;
  unit: "₹ Cr";
}

export interface KeralaBudgetSourceMetadata {
  id:
    | "kerala-budget-income"
    | "kerala-budget-expenditure"
    | "kerala-budget-at-a-glance"
    | "kerala-budget-overall-position"
    | "kerala-budget-tax-duties"
    | "kerala-budget-tax-non-tax";
  label: string;
  dataset: string;
  url: string;
  period: string;
  basis: KeralaBudgetBasis;
  unit: "₹ Cr";
  sourceUpdatedAt: null;
  fetchedAt: string;
}

export interface KeralaBudgetDataset {
  source: KeralaBudgetSourceMetadata;
  heads: KeralaBudgetHead[];
}

export interface KeralaBudgetHistoryPoint {
  financialYearStart: number;
  financialYear: string;
  income: KeralaBudgetHead[];
  expenditure: KeralaBudgetHead[];
}

export interface KeralaBudgetAtGlanceRow {
  id: string;
  label: string;
  accounts2023_24: number;
  accounts2024_25: number;
  budgetEstimate2025_26: number;
  revisedEstimate2025_26: number;
  budgetEstimate2026_27: number;
}

export interface KeralaBudgetAtGlanceDataset {
  source: KeralaBudgetSourceMetadata;
  columns: readonly ["2023-24 Accounts", "2024-25 Accounts", "2025-26 BE", "2025-26 RE", "2026-27 BE"];
  rows: KeralaBudgetAtGlanceRow[];
}

export interface KeralaBudgetOverallPositionPoint {
  financialYearStart: number;
  financialYear: string;
  revenueReceipts: number;
  revenueExpenditure: number;
  revenueDeficit: number;
}

export interface KeralaBudgetOverallPositionDataset {
  source: KeralaBudgetSourceMetadata;
  history: KeralaBudgetOverallPositionPoint[];
}

export interface KeralaBudgetRevenueCompositionPoint {
  financialYearStart: number;
  financialYear: string;
  stateTax: number;
  centralTaxShare: number;
  totalTaxRevenue: number;
  nonTaxRevenue: number;
}

export interface KeralaBudgetRevenueCompositionDataset {
  sources: [KeralaBudgetSourceMetadata, KeralaBudgetSourceMetadata];
  history: KeralaBudgetRevenueCompositionPoint[];
}

export interface KeralaBudgetPortalData {
  financialYearStart: number;
  financialYear: string;
  fetchedAt: string;
  mode: KeralaBudgetDataMode;
  warning: string | null;
  income: KeralaBudgetDataset;
  expenditure: KeralaBudgetDataset;
  history: KeralaBudgetHistoryPoint[];
  budgetAtGlance: KeralaBudgetAtGlanceDataset;
  overallPosition: KeralaBudgetOverallPositionDataset;
  revenueComposition: KeralaBudgetRevenueCompositionDataset;
}

export const KERALA_BUDGET_INCOME_HEADS = [
  { id: "agricultural-income-tax", label: "Taxes on Agricultural Income" },
  { id: "land-revenue", label: "Land Revenue" },
  { id: "stamps-registration", label: "Stamps & Registration" },
  { id: "state-excise", label: "State Excise" },
  { id: "tax-on-vehicles", label: "Tax on Vehicles" },
  { id: "sales-tax", label: "Sales Tax" },
  { id: "vat", label: "VAT" },
  { id: "gst", label: "GST" },
  { id: "lotteries", label: "Lotteries" },
] as const;

export const KERALA_BUDGET_EXPENDITURE_HEADS = [
  { id: "salary", label: "Salary" },
  { id: "pension", label: "Pension" },
  { id: "interest-payments", label: "Interest Payments" },
  { id: "local-body-grants", label: "Local Body Grants" },
  { id: "subsidy", label: "Subsidy" },
  { id: "agriculture", label: "Agriculture" },
  { id: "medical-public-health", label: "Medical & Public Health" },
  { id: "education", label: "Education" },
  { id: "irrigation", label: "Irrigation" },
  { id: "public-works", label: "Public Works" },
  { id: "social-development", label: "Social Development" },
  { id: "collection-taxes-duties", label: "Collection of Taxes & Duties" },
  { id: "interest-charges", label: "Interest Charges" },
  { id: "administrative-services", label: "Administrative Services (excluding Police & Vigilance)" },
  { id: "police-vigilance", label: "Police & Vigilance" },
] as const;

export const KERALA_BUDGET_AT_A_GLANCE_COLUMNS = [
  "2023-24 Accounts",
  "2024-25 Accounts",
  "2025-26 BE",
  "2025-26 RE",
  "2026-27 BE",
] as const;

function financialYearLabel(startYear: number) {
  return `${startYear}-${String(startYear + 1).slice(-2)}`;
}

export function keralaBudgetSourceMetadata(
  kind: KeralaBudgetSourceKind,
  fetchedAt: string,
  financialYear = KERALA_BUDGET_FINANCIAL_YEAR,
): KeralaBudgetSourceMetadata {
  const config = {
    income: { id: "kerala-budget-income", dataset: "Source of Income", url: KERALA_BUDGET_INCOME_URL, period: `FY ${financialYear}`, basis: "Budget estimate / portal report" },
    expenditure: { id: "kerala-budget-expenditure", dataset: "Source of Expenditure", url: KERALA_BUDGET_EXPENDITURE_URL, period: `FY ${financialYear}`, basis: "Budget estimate / portal report" },
    budgetAtGlance: { id: "kerala-budget-at-a-glance", dataset: "Budget at a Glance", url: KERALA_BUDGET_AT_A_GLANCE_URL, period: "FY 2023-24 to FY 2026-27", basis: "Accounts / BE / RE" },
    overallPosition: { id: "kerala-budget-overall-position", dataset: "Overall Position of Budget", url: KERALA_BUDGET_OVERALL_POSITION_URL, period: "FY 2018-19 to FY 2026-27", basis: "Accounts / RE / BE trend" },
    taxDuties: { id: "kerala-budget-tax-duties", dataset: "Revenue Receipts (Taxes & Duties)", url: KERALA_BUDGET_TAX_DUTIES_URL, period: "FY 2018-19 to FY 2026-27", basis: "Accounts / RE / BE trend" },
    taxNonTax: { id: "kerala-budget-tax-non-tax", dataset: "Tax and Non-Tax Revenue", url: KERALA_BUDGET_TAX_NON_TAX_URL, period: "FY 2018-19 to FY 2026-27", basis: "Accounts / RE / BE trend" },
  }[kind];
  return {
    ...config,
    label: "Kerala Budget Portal · Finance Department, Government of Kerala",
    unit: "₹ Cr",
    sourceUpdatedAt: null,
    fetchedAt,
  } as KeralaBudgetSourceMetadata;
}

function headsWithValues(
  heads: ReadonlyArray<{ readonly id: string; readonly label: string }>,
  values: readonly number[],
): KeralaBudgetHead[] {
  return heads.map((head, index) => ({ ...head, value: values[index], unit: "₹ Cr" }));
}

const historyValues = [
  { year: 2020, income: [0, 493, 3490, 2329, 3386, 17689, 34839, 23354, 4873], expenditure: [27810, 18946, 20976, 12593, 6301, 9841, 8893, 16475, 511, 3103, 56694, 1775, 20976, 2821, 3327] },
  { year: 2021, income: [0, 471, 4857, 2032, 4037, 22487, 44594, 29002, 7135], expenditure: [44625, 26903, 23303, 10702, 3893, 7860, 12012, 24770, 762, 2668, 60104, 2494, 23303, 4031, 5088] },
  { year: 2022, income: [0, 719, 6217, 2876, 5387, 26876, 53400, 34679, 11893], expenditure: [39070, 52201, 25177, 9885, 1542, 4923, 10095, 22038, 581, 4710, 56611, 2215, 25177, 3917, 4353] },
  { year: 2023, income: [0, 712, 5695, 2944, 6340, 27690, 55102, 37162, 12531], expenditure: [38572, 25657, 26986, 8856, 1447, 5285, 9346, 21716, 596, 989, 51209, 2295, 26986, 3560, 4440] },
  { year: 2024, income: [-4, 609, 6128, 2872, 6635, 27694, 55026, 39550, 12711], expenditure: [39903, 27885, 29138, 11665, 1491, 5379, 10431, 23111, 606, 1020, 60236, 2271, 29138, 3995, 4625] },
  { year: 2025, income: [-1, 470, 6740, 3150, 7829, 30719, 61081, 42417, 14490], expenditure: [43890, 29415, 31816, 11810, 1690, 6366, 10694, 24938, 619, 945, 63948, 2497, 31816, 4360, 5214] },
  { year: 2026, income: [0, 516, 7424, 3465, 8623, 34101, 67868, 50323, 15216], expenditure: [57565, 38670, 34376, 14761, 2382, 7930, 13261, 33330, 806, 1730, 87966, 3249, 34376, 5369, 6751] },
] as const;

const history: KeralaBudgetHistoryPoint[] = historyValues.map((point) => ({
  financialYearStart: point.year,
  financialYear: financialYearLabel(point.year),
  income: headsWithValues(KERALA_BUDGET_INCOME_HEADS, point.income),
  expenditure: headsWithValues(KERALA_BUDGET_EXPENDITURE_HEADS, point.expenditure),
}));

const budgetAtGlanceRows: KeralaBudgetAtGlanceRow[] = [
  ["revenue-receipts", "Revenue Receipts", 124486.15, 124861.06, 152351.68, 137082.61, 182972.1],
  ["capital-receipts", "Capital Receipts", 35113.03, 48329.41, 46190.42, 55332.29, 56894.02],
  ["total-receipts", "Total Receipts", 159599.18, 173190.47, 198542.1, 192414.9, 239866.12],
  ["total-expenditure", "Total Expenditure", 159506.52, 173807.57, 198582.4, 192455.61, 239907.14],
  ["revenue-expenditure", "Revenue Expenditure", 142626.35, 155920.79, 179476.19, 173971.8, 217558.76],
  ["capital-expenditure", "Capital Expenditure", 13584.45, 15082.42, 16938.1, 15670.22, 19451.16],
  ["revenue-deficit", "Revenue Deficit", -18140.2, -31059.73, -27124.51, -36889.19, -34586.66],
  ["fiscal-deficit", "Fiscal Deficit", -34258.06, -48248.15, -45038.51, -53949.51, -55419.51],
  ["primary-deficit", "Primary Deficit", -7271.83, -19109.92, -13214.79, -22133.5, -21043.49],
  ["state-tax", "State Tax Revenue", 74329.01, 76642.19, 91514.75, 83730.96, 94002.47],
  ["non-tax", "State Non-Tax Revenue", 16345.96, 16486.62, 19145.53, 18760.72, 20355.77],
  ["central-transfers", "Central Government Transfers", 33811.18, 31732.25, 41691.4, 34590.93, 68613.86],
  ["borrowings", "Borrowings and Other Liabilities", 34350.72, 47631.05, 44998.21, 53908.8, 55378.49],
  ["interest", "Interest Payments", 26986.23, 29138.23, 31823.72, 31816.01, 34376.02],
].map(([id, label, accounts2023_24, accounts2024_25, budgetEstimate2025_26, revisedEstimate2025_26, budgetEstimate2026_27]) => ({
  id: String(id),
  label: String(label),
  accounts2023_24: Number(accounts2023_24),
  accounts2024_25: Number(accounts2024_25),
  budgetEstimate2025_26: Number(budgetEstimate2025_26),
  revisedEstimate2025_26: Number(revisedEstimate2025_26),
  budgetEstimate2026_27: Number(budgetEstimate2026_27),
}));

const overallReceipts = [92854, 90225, 97617, 116640, 132725, 124486, 124861, 137083, 182972];
const overallExpenditure = [110317, 104720, 123447, 146180, 179660, 142626, 155921, 173971.8, 217558.76];
const overallPosition: KeralaBudgetOverallPositionPoint[] = overallReceipts.map((revenueReceipts, index) => ({
  financialYearStart: 2018 + index,
  financialYear: financialYearLabel(2018 + index),
  revenueReceipts,
  revenueExpenditure: overallExpenditure[index],
  revenueDeficit: revenueReceipts - overallExpenditure[index],
}));

const stateTax = [50644, 50323, 47661, 58341, 71968, 74329, 76643, 83731, 94003];
const centralTaxShare = [19038, 16401, 11560, 17820, 18261, 21743, 24772, 27382, 42114];
const totalTaxRevenue = [69682, 66724, 59221, 76161, 90229, 96072, 101415, 111113, 136117];
const nonTaxRevenue = [23172, 23500, 38396, 40480, 42496, 28414, 23446, 25970, 46855];
const revenueComposition: KeralaBudgetRevenueCompositionPoint[] = stateTax.map((value, index) => ({
  financialYearStart: 2018 + index,
  financialYear: financialYearLabel(2018 + index),
  stateTax: value,
  centralTaxShare: centralTaxShare[index],
  totalTaxRevenue: totalTaxRevenue[index],
  nonTaxRevenue: nonTaxRevenue[index],
}));

const current = history.at(-1)!;

export const keralaBudgetLastGoodSnapshot: KeralaBudgetPortalData = {
  financialYearStart: KERALA_BUDGET_FINANCIAL_YEAR_START,
  financialYear: KERALA_BUDGET_FINANCIAL_YEAR,
  fetchedAt: KERALA_BUDGET_SNAPSHOT_FETCHED_AT,
  mode: "snapshot",
  warning: "Last-good snapshot; a live portal sync is pending.",
  income: {
    source: keralaBudgetSourceMetadata("income", KERALA_BUDGET_SNAPSHOT_FETCHED_AT),
    heads: current.income,
  },
  expenditure: {
    source: keralaBudgetSourceMetadata("expenditure", KERALA_BUDGET_SNAPSHOT_FETCHED_AT),
    heads: current.expenditure,
  },
  history,
  budgetAtGlance: {
    source: keralaBudgetSourceMetadata("budgetAtGlance", KERALA_BUDGET_SNAPSHOT_FETCHED_AT),
    columns: KERALA_BUDGET_AT_A_GLANCE_COLUMNS,
    rows: budgetAtGlanceRows,
  },
  overallPosition: {
    source: keralaBudgetSourceMetadata("overallPosition", KERALA_BUDGET_SNAPSHOT_FETCHED_AT),
    history: overallPosition,
  },
  revenueComposition: {
    sources: [
      keralaBudgetSourceMetadata("taxDuties", KERALA_BUDGET_SNAPSHOT_FETCHED_AT),
      keralaBudgetSourceMetadata("taxNonTax", KERALA_BUDGET_SNAPSHOT_FETCHED_AT),
    ],
    history: revenueComposition,
  },
};
