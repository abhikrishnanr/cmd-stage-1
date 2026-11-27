import "server-only";

import {
  KERALA_BUDGET_AT_A_GLANCE_COLUMNS,
  KERALA_BUDGET_AT_A_GLANCE_URL,
  KERALA_BUDGET_EXPENDITURE_HEADS,
  KERALA_BUDGET_EXPENDITURE_URL,
  KERALA_BUDGET_FINANCIAL_YEAR_START,
  KERALA_BUDGET_INCOME_HEADS,
  KERALA_BUDGET_INCOME_URL,
  KERALA_BUDGET_OVERALL_POSITION_URL,
  KERALA_BUDGET_TAX_DUTIES_URL,
  KERALA_BUDGET_TAX_NON_TAX_URL,
  keralaBudgetSourceMetadata,
  type KeralaBudgetAtGlanceRow,
  type KeralaBudgetHead,
  type KeralaBudgetHistoryPoint,
  type KeralaBudgetOverallPositionPoint,
  type KeralaBudgetPortalData,
  type KeralaBudgetRevenueCompositionPoint,
} from "@/data/keralaBudgetSnapshot";

const PORTAL_ORIGIN = "https://budget.kerala.gov.in";
const INCOME_ENDPOINT = `${PORTAL_ORIGIN}/reports/sourceofincomeall`;
// This spelling is required by the upstream portal.
const EXPENDITURE_ENDPOINT = `${PORTAL_ORIGIN}/reports/sourceofexependitureall`;
const HISTORY_YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

const requestHeaders = {
  accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
  "user-agent": "CMO-Dashboard/1.0 (+Kerala government data integration)",
};

interface PortalSession {
  token: string;
  cookie: string;
}

function financialYearLabel(startYear: number) {
  return `${startYear}-${String(startYear + 1).slice(-2)}`;
}

function cookieFrom(response: Response) {
  const cookieHeaders = response.headers as Headers & { getSetCookie?: () => string[] };
  const setCookies = cookieHeaders.getSetCookie?.() ?? [response.headers.get("set-cookie") ?? ""];
  const sessionCookie = setCookies.join(",").match(/PHPSESSID=[^;,]+/i)?.[0];
  if (!sessionCookie) throw new Error("Kerala Budget Portal did not return a PHP session cookie");
  return sessionCookie;
}

async function getPortalHtml(pageUrl: string) {
  const response = await fetch(pageUrl, { cache: "no-store", headers: requestHeaders });
  if (!response.ok) throw new Error(`Kerala Budget Portal page returned HTTP ${response.status}`);
  return response.text();
}

async function openPortalSession(pageUrl: string): Promise<PortalSession> {
  const response = await fetch(pageUrl, { cache: "no-store", headers: requestHeaders });
  if (!response.ok) throw new Error(`Kerala Budget Portal page returned HTTP ${response.status}`);

  const html = await response.text();
  const tokenInput = html.match(/<input[^>]*name=["']token["'][^>]*>/i)?.[0];
  const token = tokenInput?.match(/value=["']([^"']+)["']/i)?.[1];
  if (!token) throw new Error("Kerala Budget Portal CSRF token was not found");
  return { token, cookie: cookieFrom(response) };
}

async function postPortalReport(
  endpoint: string,
  pageUrl: string,
  session: PortalSession,
  financialYearStart: number,
): Promise<unknown> {
  const response = await fetch(endpoint, {
    method: "POST",
    cache: "no-store",
    headers: {
      ...requestHeaders,
      accept: "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      cookie: session.cookie,
      referer: pageUrl,
      "x-requested-with": "XMLHttpRequest",
    },
    body: new URLSearchParams({ finYear: String(financialYearStart), token: session.token }),
  });
  if (!response.ok) throw new Error(`Kerala Budget Portal report returned HTTP ${response.status}`);

  const payload = await response.json();
  if (payload === "CSRF_ERR") throw new Error("Kerala Budget Portal rejected its session-bound CSRF token");
  return payload;
}

function normalizedHeads(
  raw: unknown,
  expected: ReadonlyArray<{ readonly id: string; readonly label: string }>,
  dataset: string,
): KeralaBudgetHead[] {
  if (!Array.isArray(raw) || raw.length < expected.length + 1) {
    throw new Error(`${dataset} response did not contain ${expected.length} values and a rotated token`);
  }
  return expected.map((head, index) => {
    const value = Number(raw[index]);
    if (!Number.isFinite(value)) throw new Error(`${dataset} returned a non-numeric value for ${head.label}`);
    return { ...head, value, unit: "₹ Cr" };
  });
}

async function fetchHeadHistory(
  session: PortalSession,
  endpoint: string,
  pageUrl: string,
  responseKey: "sourceOfIncomeAll" | "sourceOfExpenditureAll",
  heads: ReadonlyArray<{ readonly id: string; readonly label: string }>,
  dataset: string,
): Promise<Array<{ financialYearStart: number; heads: KeralaBudgetHead[] }>> {
  const history: Array<{ financialYearStart: number; heads: KeralaBudgetHead[] }> = [];
  for (const financialYearStart of HISTORY_YEARS) {
    const payload = await postPortalReport(endpoint, pageUrl, session, financialYearStart);
    const raw = (payload as Record<string, unknown>)[responseKey];
    const normalized = normalizedHeads(raw, heads, dataset);
    session.token = String((raw as unknown[])[heads.length]);
    if (!session.token) throw new Error(`${dataset} did not return its rotated CSRF token`);
    history.push({ financialYearStart, heads: normalized });
  }
  return history;
}

function decodeCell(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8377;|&\#x20b9;/gi, "₹")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlRows(html: string) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) =>
    [...row[1].matchAll(/<(?:th|td)\b[^>]*>([\s\S]*?)<\/(?:th|td)>/gi)].map((cell) => decodeCell(cell[1])),
  );
}

function numericValue(value: string) {
  const number = Number(value.replace(/,/g, "").replace(/−/g, "-"));
  return Number.isFinite(number) ? number : null;
}

function findAtGlanceValues(rows: string[][], matcher: RegExp) {
  const row = rows.find((cells) => matcher.test(cells[0] ?? ""));
  if (!row) throw new Error(`Budget at a Glance row was not found: ${matcher.source}`);
  const values = row.slice(1).map(numericValue).filter((value): value is number => value !== null);
  if (values.length !== 5) throw new Error(`Budget at a Glance row did not contain five values: ${row[0]}`);
  return values;
}

function parseBudgetAtGlance(html: string): KeralaBudgetAtGlanceRow[] {
  const rows = htmlRows(html);
  const definitions: Array<{ id: string; label: string; matcher: RegExp }> = [
    { id: "revenue-receipts", label: "Revenue Receipts", matcher: /^A\.\s*Revenue Receipts$/i },
    { id: "capital-receipts", label: "Capital Receipts", matcher: /^B\.\s*Capital Receipts$/i },
    { id: "total-receipts", label: "Total Receipts", matcher: /^C\.\s*Total Receipts/i },
    { id: "total-expenditure", label: "Total Expenditure", matcher: /^F\.\s*Total Expenditure/i },
    { id: "revenue-expenditure", label: "Revenue Expenditure", matcher: /^1\.\s*Revenue Expenditure$/i },
    { id: "capital-expenditure", label: "Capital Expenditure", matcher: /^2\.\s*Capital Expenditure$/i },
    { id: "revenue-deficit", label: "Revenue Deficit", matcher: /^G\.\s*Revenue (?:surplus\/)?deficit/i },
    { id: "fiscal-deficit", label: "Fiscal Deficit", matcher: /^H\.\s*Fiscal Deficit/i },
    { id: "primary-deficit", label: "Primary Deficit", matcher: /^I\.\s*Primary Deficit/i },
    { id: "state-tax", label: "State Tax Revenue", matcher: /^1\.\s*State Tax Revenue$/i },
    { id: "non-tax", label: "State Non-Tax Revenue", matcher: /^2\.\s*State Non-Tax Revenue$/i },
    { id: "central-transfers", label: "Central Government Transfers", matcher: /^3\.\s*Central Govt\. Transfers$/i },
    { id: "borrowings", label: "Borrowings and Other Liabilities", matcher: /^3\.\s*Borrowings and Other Liabilities$/i },
    { id: "interest", label: "Interest Payments", matcher: /^a\.\s*Of which Interest Payments$/i },
  ];
  return definitions.map(({ id, label, matcher }) => {
    const [accounts2023_24, accounts2024_25, budgetEstimate2025_26, revisedEstimate2025_26, budgetEstimate2026_27] = findAtGlanceValues(rows, matcher);
    return { id, label, accounts2023_24, accounts2024_25, budgetEstimate2025_26, revisedEstimate2025_26, budgetEstimate2026_27 };
  });
}

function elementById(html: string, id: string) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`<(?:th|td)\\b[^>]*id=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/(?:th|td)>`, "i"));
  if (!match) throw new Error(`Portal trend cell #${id} was not found`);
  return decodeCell(match[1]);
}

function trendYears(html: string) {
  return Array.from({ length: 9 }, (_, index) => {
    const label = elementById(html, `header${index + 1}`);
    const year = Number(label.match(/\d{4}/)?.[0]);
    if (!Number.isInteger(year)) throw new Error(`Portal trend header was invalid: ${label}`);
    return { financialYearStart: year, financialYear: financialYearLabel(year) };
  });
}

function trendNumber(html: string, id: string) {
  const value = numericValue(elementById(html, id));
  if (value === null) throw new Error(`Portal trend value #${id} was not numeric`);
  return value;
}

function parseOverallPosition(html: string): KeralaBudgetOverallPositionPoint[] {
  return trendYears(html).map((period, index) => {
    const revenueReceipts = trendNumber(html, `rec${index + 1}`);
    const revenueExpenditure = trendNumber(html, `exp${index + 1}`);
    return { ...period, revenueReceipts, revenueExpenditure, revenueDeficit: revenueReceipts - revenueExpenditure };
  });
}

function parseRevenueComposition(taxDutiesHtml: string, taxNonTaxHtml: string): KeralaBudgetRevenueCompositionPoint[] {
  const periods = trendYears(taxDutiesHtml);
  const comparison = trendYears(taxNonTaxHtml);
  if (periods.some((period, index) => period.financialYearStart !== comparison[index]?.financialYearStart)) {
    throw new Error("Kerala Budget Portal revenue trend periods did not align");
  }
  return periods.map((period, index) => ({
    ...period,
    stateTax: trendNumber(taxDutiesHtml, `rec${index + 1}`),
    centralTaxShare: trendNumber(taxDutiesHtml, `centralTax${index + 1}`),
    totalTaxRevenue: trendNumber(taxNonTaxHtml, `rec${index + 1}`),
    nonTaxRevenue: trendNumber(taxNonTaxHtml, `exp${index + 1}`),
  }));
}

export async function fetchKeralaBudgetPortal(
  financialYearStart = KERALA_BUDGET_FINANCIAL_YEAR_START,
): Promise<KeralaBudgetPortalData> {
  const financialYear = financialYearLabel(financialYearStart);
  const [incomeSession, expenditureSession, glanceHtml, overallHtml, taxDutiesHtml, taxNonTaxHtml] = await Promise.all([
    openPortalSession(KERALA_BUDGET_INCOME_URL),
    openPortalSession(KERALA_BUDGET_EXPENDITURE_URL),
    getPortalHtml(KERALA_BUDGET_AT_A_GLANCE_URL),
    getPortalHtml(KERALA_BUDGET_OVERALL_POSITION_URL),
    getPortalHtml(KERALA_BUDGET_TAX_DUTIES_URL),
    getPortalHtml(KERALA_BUDGET_TAX_NON_TAX_URL),
  ]);
  const [incomeHistory, expenditureHistory] = await Promise.all([
    fetchHeadHistory(incomeSession, INCOME_ENDPOINT, KERALA_BUDGET_INCOME_URL, "sourceOfIncomeAll", KERALA_BUDGET_INCOME_HEADS, "Source of Income"),
    fetchHeadHistory(expenditureSession, EXPENDITURE_ENDPOINT, KERALA_BUDGET_EXPENDITURE_URL, "sourceOfExpenditureAll", KERALA_BUDGET_EXPENDITURE_HEADS, "Source of Expenditure"),
  ]);
  const history: KeralaBudgetHistoryPoint[] = incomeHistory.map((incomePoint, index) => {
    const expenditurePoint = expenditureHistory[index];
    if (!expenditurePoint || expenditurePoint.financialYearStart !== incomePoint.financialYearStart) {
      throw new Error("Kerala Budget Portal income and expenditure histories did not align");
    }
    return {
      financialYearStart: incomePoint.financialYearStart,
      financialYear: financialYearLabel(incomePoint.financialYearStart),
      income: incomePoint.heads,
      expenditure: expenditurePoint.heads,
    };
  });
  const current = history.find((point) => point.financialYearStart === financialYearStart);
  if (!current) throw new Error(`Kerala Budget Portal history did not include FY ${financialYear}`);
  const fetchedAt = new Date().toISOString();

  return {
    financialYearStart,
    financialYear,
    fetchedAt,
    mode: "live",
    warning: "The portal does not publish a data-level update timestamp; Last synced is this dashboard's fetch time.",
    income: { source: keralaBudgetSourceMetadata("income", fetchedAt, financialYear), heads: current.income },
    expenditure: { source: keralaBudgetSourceMetadata("expenditure", fetchedAt, financialYear), heads: current.expenditure },
    history,
    budgetAtGlance: {
      source: keralaBudgetSourceMetadata("budgetAtGlance", fetchedAt),
      columns: KERALA_BUDGET_AT_A_GLANCE_COLUMNS,
      rows: parseBudgetAtGlance(glanceHtml),
    },
    overallPosition: {
      source: keralaBudgetSourceMetadata("overallPosition", fetchedAt),
      history: parseOverallPosition(overallHtml),
    },
    revenueComposition: {
      sources: [keralaBudgetSourceMetadata("taxDuties", fetchedAt), keralaBudgetSourceMetadata("taxNonTax", fetchedAt)],
      history: parseRevenueComposition(taxDutiesHtml, taxNonTaxHtml),
    },
  };
}
