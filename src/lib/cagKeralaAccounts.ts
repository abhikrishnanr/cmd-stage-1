import "server-only";

import { readSheet, type CellValue, type Row } from "read-excel-file/node";
import {
  CAG_KERALA_ACTUAL_THROUGH,
  CAG_KERALA_MKI_WORKBOOK_URL,
  cagKeralaAccountsSource,
  type CagKeralaAccountsData,
  type CagKeralaAccountsMetric,
} from "@/data/cagKeralaAccountsSnapshot";

const MAX_REDIRECTS = 12;
const MAX_HTML_BYTES = 2 * 1024 * 1024;
const MAX_WORKBOOK_BYTES = 1024 * 1024;
const REQUEST_TIMEOUT_MS = 25_000;

const ALLOWED_HOSTS = new Set([
  "cagiaad-my.sharepoint.com",
  "login.microsoftonline.com",
]);

const requestHeaders = {
  accept: "text/html,application/xhtml+xml,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36 CMO-Dashboard/1.0",
};

interface StoredCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  secure: boolean;
  hostOnly: boolean;
}

class CookieJar {
  private readonly cookies = new Map<string, StoredCookie>();

  absorb(response: Response, responseUrl: URL) {
    const headers = response.headers as Headers & { getSetCookie?: () => string[] };
    const setCookies = headers.getSetCookie?.() ?? (response.headers.get("set-cookie") ? [response.headers.get("set-cookie")!] : []);

    for (const setCookie of setCookies) {
      const parts = setCookie.split(";").map((part) => part.trim()).filter(Boolean);
      const separator = parts[0]?.indexOf("=") ?? -1;
      if (separator <= 0) continue;

      const name = parts[0].slice(0, separator).trim();
      const value = parts[0].slice(separator + 1);
      let domain = responseUrl.hostname.toLowerCase();
      let path = defaultCookiePath(responseUrl.pathname);
      let secure = false;
      let hostOnly = true;

      for (const attribute of parts.slice(1)) {
        const [rawName, ...rawValue] = attribute.split("=");
        const attributeName = rawName.toLowerCase();
        const attributeValue = rawValue.join("=").trim();
        if (attributeName === "domain" && attributeValue) {
          const requestedDomain = attributeValue.replace(/^\./, "").toLowerCase();
          if (responseUrl.hostname === requestedDomain || responseUrl.hostname.endsWith(`.${requestedDomain}`)) {
            domain = requestedDomain;
            hostOnly = false;
          }
        } else if (attributeName === "path" && attributeValue.startsWith("/")) {
          path = attributeValue;
        } else if (attributeName === "secure") {
          secure = true;
        }
      }

      const key = `${domain}|${path}|${name}`;
      if (!value || parts.some((part) => /^max-age=0$/i.test(part))) {
        this.cookies.delete(key);
      } else {
        this.cookies.set(key, { name, value, domain, path, secure, hostOnly });
      }
    }
  }

  header(url: URL) {
    return [...this.cookies.values()]
      .filter((cookie) => {
        const hostMatches = cookie.hostOnly
          ? url.hostname === cookie.domain
          : url.hostname === cookie.domain || url.hostname.endsWith(`.${cookie.domain}`);
        return hostMatches && url.pathname.startsWith(cookie.path) && (!cookie.secure || url.protocol === "https:");
      })
      .sort((a, b) => b.path.length - a.path.length)
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
  }
}

function defaultCookiePath(pathname: string) {
  if (!pathname.startsWith("/") || pathname === "/") return "/";
  const lastSlash = pathname.lastIndexOf("/");
  return lastSlash <= 0 ? "/" : pathname.slice(0, lastSlash + 1);
}

function isRedirect(status: number) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

async function fetchWithCookieJar(initialUrl: URL, jar: CookieJar) {
  let url = initialUrl;

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    if (!ALLOWED_HOSTS.has(url.hostname.toLowerCase()) || url.protocol !== "https:") {
      throw new Error(`CAG workbook redirected to an unapproved host: ${url.hostname}`);
    }

    const cookie = jar.header(url);
    const response = await fetch(url, {
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: { ...requestHeaders, ...(cookie ? { cookie } : {}) },
    });
    jar.absorb(response, url);

    if (!isRedirect(response.status)) return response;
    const location = response.headers.get("location");
    if (!location) throw new Error(`CAG workbook returned redirect ${response.status} without a Location header`);
    url = new URL(location, url);
  }

  throw new Error(`CAG workbook exceeded ${MAX_REDIRECTS} redirects`);
}

function assertContentLength(response: Response, maxBytes: number, label: string) {
  const contentLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new Error(`${label} exceeded the ${maxBytes}-byte limit`);
  }
}

async function responseBytes(response: Response, maxBytes: number, label: string) {
  assertContentLength(response, maxBytes, label);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > maxBytes) throw new Error(`${label} exceeded the ${maxBytes}-byte limit`);
  return bytes;
}

function normalizedLabel(value: CellValue | undefined) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function numericCell(row: Row, column: number, label: string) {
  const value = row[column];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`CAG workbook returned a non-numeric ${label}`);
  }
  return value;
}

interface MetricDefinition {
  id: string;
  label: string;
  matcher: RegExp;
}

const METRIC_DEFINITIONS: MetricDefinition[] = [
  { id: "revenue-receipts", label: "Revenue Receipts", matcher: /^1\s+Revenue Receipts$/i },
  { id: "tax-revenue", label: "Tax Revenue", matcher: /^\(a\)\s*Tax Revenue/i },
  { id: "gst", label: "GST", matcher: /^\(i\)\s*GST$/i },
  { id: "stamps-registration", label: "Stamps and Registration Fees", matcher: /^\(ii\)\s*Stamps and Registration Fees$/i },
  { id: "land-revenue", label: "Land Revenue", matcher: /^\(iii\)\s*Land Revenue$/i },
  { id: "sales-tax", label: "Sales Tax", matcher: /^\(iv\)\s*Sales Tax$/i },
  { id: "state-excise", label: "State Excise Duties", matcher: /^\(v\)\s*State Excise duties$/i },
  { id: "union-tax-share", label: "State Share of Union Taxes", matcher: /^\(vi\)\s*State'?s Share of Union Taxes$/i },
  { id: "other-taxes-duties", label: "Other Taxes and Duties", matcher: /^\(vii\)\s*Other taxes and duties$/i },
  { id: "non-tax-revenue", label: "Non-Tax Revenue", matcher: /^\(b\)\s*Non-Tax Revenue$/i },
  { id: "grants", label: "Grant-in-Aid and Contributions", matcher: /^\(c\)\s*Grant-in-Aid and contrib/i },
  { id: "capital-receipts", label: "Capital Receipts", matcher: /^2\s+Capital Receipts$/i },
  { id: "loan-recoveries", label: "Recovery of Loans and Advances", matcher: /^\(a\)\s*Recovery of Loans/i },
  { id: "other-receipts", label: "Other Receipts", matcher: /^\(b\)\s*Other Receipts$/i },
  { id: "borrowings", label: "Borrowings and Other Liabilities (net)", matcher: /^\(c\)\s*Borrowings\s*&\s*Other Liabilities/i },
  { id: "total-receipts", label: "Total Receipts", matcher: /^3\s*\.\s*Total Receipts/i },
  { id: "revenue-expenditure", label: "Revenue Expenditure", matcher: /^4\s+Revenue Expenditure/i },
  { id: "other-revenue-expenditure", label: "Other Revenue Expenditure", matcher: /^\(a\)\s*Expenditure on Revenue Account/i },
  { id: "interest-payments", label: "Interest Payments", matcher: /^\(b\)\s*Expenditure on Interest Payment/i },
  { id: "salary", label: "Salaries and Wages", matcher: /^\(?c\.?\)?\s*Expenditure on salaries\s*\/\s*wages/i },
  { id: "pension", label: "Pension", matcher: /^\(d\)\s*Expenditure on Pension/i },
  { id: "subsidy", label: "Subsidy", matcher: /^\(e\)\s*Expenditure on Subsidy/i },
  { id: "capital-expenditure", label: "Capital Expenditure", matcher: /^5\s+Capital Expenditure$/i },
  { id: "sector-expenditure", label: "Sector-wise Expenditure", matcher: /^6\.?\s*Sector wise Expenditure$/i },
  { id: "general-sector", label: "General Sector Expenditure", matcher: /^\(i\)\s*General Sector$/i },
  { id: "social-sector", label: "Social Sector Expenditure", matcher: /^\(ii\)\s*Social Sector$/i },
  { id: "economic-sector", label: "Economic Sector Expenditure", matcher: /^\(iii\)\s*Economic Sector$/i },
  { id: "grants-contributions", label: "Grant-in-Aid Contributions", matcher: /^\(iv\)\s*Grant-in-aid-Contributions$/i },
  { id: "total-expenditure", label: "Total Expenditure", matcher: /^7\.?\s*Total Expenditure/i },
  { id: "loans-disbursed", label: "Loans and Advances Disbursed", matcher: /^8\.?\s*Loans and Advances Disbursed$/i },
  { id: "revenue-balance", label: "Revenue Surplus / Deficit", matcher: /^9\s+Revenue Surplus/i },
  { id: "fiscal-balance", label: "Fiscal Surplus / Deficit", matcher: /^10\s+Fiscal Surplus/i },
  { id: "primary-balance", label: "Primary Surplus / Deficit", matcher: /^11\.?\s*Primary Deficit/i },
];

function parseMetrics(rows: Row[]): CagKeralaAccountsMetric[] {
  const summaryRows = rows.slice(0, 48);
  return METRIC_DEFINITIONS.map((definition) => {
    const row = summaryRows.find((candidate) => definition.matcher.test(normalizedLabel(candidate[0])));
    if (!row) throw new Error(`CAG workbook row was not found: ${definition.label}`);
    return {
      id: definition.id,
      label: definition.label,
      budgetReference: numericCell(row, 1, `${definition.label} budget reference`),
      actual: numericCell(row, 2, `${definition.label} actual`),
      currentProgressPct: numericCell(row, 3, `${definition.label} current progress`),
      previousProgressPct: numericCell(row, 4, `${definition.label} previous progress`),
      unit: "₹ Cr" as const,
    };
  });
}

function validateReportIdentity(rows: Row[]) {
  const title = normalizedLabel(rows[0]?.[0]);
  const financialYearHeader = normalizedLabel(rows[6]?.[1]);
  if (!/Government\s*of\s+Kerala/i.test(title) || !/Accounts at a Glance/i.test(title) || !/end of June 2026/i.test(title)) {
    throw new Error("CAG workbook report title or period did not match June 2026 Accounts at a Glance");
  }
  if (!/2026\s*-\s*2027/i.test(financialYearHeader)) {
    throw new Error("CAG workbook financial-year header did not match FY 2026-27");
  }
}

function fileLastModified(response: Response) {
  const raw = response.headers.get("last-modified");
  if (!raw) return undefined;
  const date = new Date(raw);
  if (!Number.isFinite(date.getTime())) return undefined;
  const formatted = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
  return `${formatted} IST (file last modified)`;
}

export async function fetchCagKeralaAccounts(): Promise<CagKeralaAccountsData> {
  const jar = new CookieJar();
  const publicDownloadUrl = new URL(CAG_KERALA_MKI_WORKBOOK_URL);
  publicDownloadUrl.searchParams.set("download", "1");
  const response = await fetchWithCookieJar(publicDownloadUrl, jar);

  if (!response.ok) throw new Error(`CAG workbook returned HTTP ${response.status}`);
  assertContentLength(response, MAX_WORKBOOK_BYTES, "CAG workbook");
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("text/html")) {
    const htmlBytes = await responseBytes(response, MAX_HTML_BYTES, "CAG workbook HTML response");
    throw new Error(`CAG workbook returned HTML instead of XLSX (${htmlBytes.byteLength} bytes)`);
  }

  const bytes = await responseBytes(response, MAX_WORKBOOK_BYTES, "CAG workbook");
  if (bytes[0] !== 0x50 || bytes[1] !== 0x4b || bytes[2] !== 0x03 || bytes[3] !== 0x04) {
    throw new Error("CAG workbook response was not a valid XLSX ZIP container");
  }

  const rows = await readSheet(Buffer.from(bytes), 1);
  validateReportIdentity(rows);
  const fetchedAt = new Date().toISOString();
  const sourceUpdatedAt = fileLastModified(response);
  const metrics = parseMetrics(rows);

  return {
    financialYear: "2026-27",
    actualThrough: CAG_KERALA_ACTUAL_THROUGH,
    fetchedAt,
    mode: "live",
    warning: "Unaudited provisional actuals. Source updated is file last-modified metadata, not a stated publication date.",
    source: cagKeralaAccountsSource(fetchedAt, sourceUpdatedAt),
    metrics,
  };
}
