export const CAG_KERALA_ACCOUNTS_PAGE_URL =
  "https://cag.gov.in/ae/kerala/en/state-accounts-report?defuat_account_report_type=360";

export const CAG_KERALA_MKI_WORKBOOK_URL =
  "https://cagiaad-my.sharepoint.com/:x:/g/personal/agaekeralamsp119_cag_gov_in/IQDaqEHijkfrQaXr3fTi4RWvAWzlH4y47bExuZBmPN7hVM0";

export const CAG_KERALA_REPORT_PERIOD = "Actuals up to 30 Jun 2026";
export const CAG_KERALA_ACTUAL_THROUGH = "2026-06-30";
export const CAG_KERALA_SOURCE_UPDATED_AT = "15 Jul 2026, 17:32 IST (file last modified)";
export const CAG_KERALA_SNAPSHOT_FETCHED_AT = "2026-11-26T17:20:00.000Z";

export type CagKeralaDataMode = "live" | "snapshot";

export interface CagKeralaAccountsMetric {
  id: string;
  label: string;
  budgetReference: number;
  actual: number;
  currentProgressPct: number;
  previousProgressPct: number;
  unit: "₹ Cr";
}

export interface CagKeralaAccountsSource {
  label: string;
  dataset: string;
  pageUrl: string;
  workbookUrl: string;
  period: string;
  basis: string;
  sourceUpdatedAt: string;
  fetchedAt: string;
}

export interface CagKeralaAccountsData {
  financialYear: "2026-27";
  actualThrough: string;
  fetchedAt: string;
  mode: CagKeralaDataMode;
  warning: string | null;
  source: CagKeralaAccountsSource;
  metrics: CagKeralaAccountsMetric[];
}

const rows: Array<[string, string, number, number, number, number]> = [
  ["revenue-receipts", "Revenue Receipts", 169646.3592, 33311.21, 19.6356763311, 17.53],
  ["tax-revenue", "Tax Revenue", 136357.849, 28059.53, 20.5778620048, 18.97],
  ["gst", "GST", 50139.7286, 11778.49, 23.4913317819, 20.14],
  ["stamps-registration", "Stamps and Registration Fees", 7874.3535, 1713.56, 21.7612785608, 20.44],
  ["land-revenue", "Land Revenue", 515.8679, 181, 35.0865017963, 20.61],
  ["sales-tax", "Sales Tax", 36050.9002, 6976.69, 19.3523322893, 18.73],
  ["state-excise", "State Excise Duties", 3851.9658, 1040.04, 27.0002397218, 22.96],
  ["union-tax-share", "State Share of Union Taxes", 27080.0304, 4272.79, 15.7783796284, 15.19],
  ["other-taxes-duties", "Other Taxes and Duties", 10845.0026, 2096.96, 19.3357261159, 19.33],
  ["non-tax-revenue", "Non-Tax Revenue", 21355.7702, 4885.78, 22.87803228, 18.27],
  ["grants", "Grant-in-Aid and Contributions", 11932.74, 365.9, 3.0663535785, 3.21],
  ["capital-receipts", "Capital Receipts", 57924.3972, 21076.83, 36.386792127, 40.17],
  ["loan-recoveries", "Recovery of Loans and Advances", 1445.0365, 28.19, 1.9508157752, 60.47],
  ["other-receipts", "Other Receipts", 66.3021, 3.17, 4.7811456952, 5.2],
  ["borrowings", "Borrowings and Other Liabilities (net)", 56413.0586, 21045.47, 37.3060254528, 39.71],
  ["total-receipts", "Total Receipts", 227570.7564, 54388.04, 23.8993976469, 22.8],
  ["revenue-expenditure", "Revenue Expenditure", 205005.1702, 46520.48, 22.6923447612, 22.86],
  ["other-revenue-expenditure", "Other Revenue Expenditure", 77651.2846, 16691.35, 21.4952657718, 21.33],
  ["interest-payments", "Interest Payments", 34376.0193, 6593.35, 19.1800858106, 19.4],
  ["salary", "Salaries and Wages", 55201.1115, 14395.85, 26.0789132842, 26.63],
  ["pension", "Pension", 35438.9231, 8727.45, 24.6267359067, 25.07],
  ["subsidy", "Subsidy", 2337.8317, 112.48, 4.8112958687, 12.74],
  ["capital-expenditure", "Capital Expenditure", 19717.7062, 7179.1, 36.4094074999, 20.87],
  ["sector-expenditure", "Sector-wise Expenditure", 208354.9748, 51563.66, 24.747986003, 23.76],
  ["general-sector", "General Sector Expenditure", 101490.8378, 28012.89, 27.6013979264, 27.18],
  ["social-sector", "Social Sector Expenditure", 70321.6808, 17988.24, 25.5799346594, 21.71],
  ["economic-sector", "Economic Sector Expenditure", 36542.4562, 5562.53, 15.2221021202, 18.38],
  ["grants-contributions", "Grant-in-Aid Contributions", 16367.9016, 2135.92, 13.0494430636, 10.52],
  ["total-expenditure", "Total Expenditure", 224722.8764, 53699.59, 23.8959116492, 22.68],
  ["loans-disbursed", "Loans and Advances Disbursed", 2847.88, 688.45, 24.1744736436, 33.08],
  ["revenue-balance", "Revenue Surplus / Deficit", -35358.811, -13209.28, 37.3577889822, 52.79],
  ["fiscal-balance", "Fiscal Surplus / Deficit", -56413.0586, -21045.47, 37.3060254528, 39.71],
  ["primary-balance", "Primary Surplus / Deficit", -22037.0393, -14452.12, 65.581042005, 88.61],
];

export function cagKeralaAccountsSource(
  fetchedAt: string,
  sourceUpdatedAt = CAG_KERALA_SOURCE_UPDATED_AT,
): CagKeralaAccountsSource {
  return {
    label: "CAG Kerala · State Accounts",
    dataset: "Monthly Key Indicators · June 2026",
    pageUrl: CAG_KERALA_ACCOUNTS_PAGE_URL,
    workbookUrl: CAG_KERALA_MKI_WORKBOOK_URL,
    period: CAG_KERALA_REPORT_PERIOD,
    basis: "Unaudited provisional actuals; workbook budget is reference only",
    sourceUpdatedAt,
    fetchedAt,
  };
}

export const cagKeralaAccountsLastGoodSnapshot: CagKeralaAccountsData = {
  financialYear: "2026-27",
  actualThrough: CAG_KERALA_ACTUAL_THROUGH,
  fetchedAt: CAG_KERALA_SNAPSHOT_FETCHED_AT,
  mode: "snapshot",
  warning: "Last-good official workbook snapshot; live workbook sync is pending.",
  source: cagKeralaAccountsSource(CAG_KERALA_SNAPSHOT_FETCHED_AT),
  metrics: rows.map(([id, label, budgetReference, actual, currentProgressPct, previousProgressPct]) => ({
    id,
    label,
    budgetReference,
    actual,
    currentProgressPct,
    previousProgressPct,
    unit: "₹ Cr" as const,
  })),
};

export function cagMetric(data: CagKeralaAccountsData, id: string) {
  return data.metrics.find((metric) => metric.id === id);
}
