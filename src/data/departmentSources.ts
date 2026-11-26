export type MarketPriceRecord = {
  commodity: string;
  date: string;
  price: number | null;
  prevDay: number | null;
  prevMonth: number | null;
  prevYear: number | null;
  unit: string;
};

export type MarketMonthlyRecord = {
  commodity: string;
  date: string;
  value: number | null;
  unit: string;
};

export type AreaPriceRecord = {
  district: string;
  centre: string;
  commodity: string;
  date: string;
  price: number | null;
  prevDay: number | null;
  unit: string;
};

export type EcoStatData = {
  latest: MarketPriceRecord[];
  monthly: MarketMonthlyRecord[];
  areaSeries: AreaPriceRecord[];
  dailyTotal: number;
  latestSourceName: string;
  monthlySourceName: string;
  priceDate: string;
  fetchedAt: string;
};

export type IndustryDistrict = {
  district: string;
  enterprises: number;
  investment: number;
  employment: number;
};

export type IndustryCategory = {
  category: string;
  enterprises: number;
  investment: number;
  employment: number;
};

export type IndustryParticipation = {
  group: string;
  enterprises: number;
  percentage: number;
  investment: number;
  employment: number;
};

export type KeraScheme = {
  id: number;
  name: string;
  applications: number;
  sanctioned: number;
  sanctionedArea: number;
  disbursedApplications: number;
  disbursedAmount: number;
};

export type IndustryKeraData = {
  enterprises: number;
  investment: number;
  employment: number;
  districts: IndustryDistrict[];
  categories: IndustryCategory[];
  gender: IndustryParticipation[];
  socialCategories: IndustryParticipation[];
  keraSchemes: KeraScheme[];
  fetchedAt: string;
};

export type CmoChannel = {
  channel: string;
  received: number;
  color: string;
};

export type CmoDepartment = {
  department: string;
  received: number;
  disposed: number;
};

export type CmoData = {
  officesConnected: number;
  grievances: number;
  cmdrfApplications: number;
  applicationsReceived: number;
  applicationsDisposed: number;
  lastUpdated: string;
  lastUpdatedDisplay: string;
  statisticsSince: string;
  channels: CmoChannel[];
  departments: CmoDepartment[];
  sourceUrl: string;
};

type EcoStatApiRecord = {
  date?: string;
  dim_1_name?: string;
  dim_2_name?: string;
  dim_3_name?: string;
  dim_4_name?: string;
  measure_1?: number | null;
  measure_2?: number | null;
  measure_3?: number | null;
  measure_4?: number | null;
  measure_1_unit?: string;
};

type EcoStatApiResponse = {
  records?: EcoStatApiRecord[];
  totalRecords?: number;
  visualization?: { name?: string };
};

const ECOSTAT_BASE = "https://www.ecostat.kerala.gov.in/api/data-subset";
const YEAR_OF_ENTERPRISES_URL = "https://yearofenterprises.kerala.gov.in/index.php/public_dashboard";
const KERA_BASE = "https://www.keraplantation.kerala.gov.in/public/index.php/public_scheme_dashboard";
const CMO_DASHBOARD_URL = "https://cmo.kerala.gov.in/dashboard-en.php";

export async function getEcoStatData(): Promise<EcoStatData> {
  const fetchedAt = indiaTimestamp();
  try {
    const [latestJson, dailyJson, monthlyJson] = await Promise.all([
      fetchJson<EcoStatApiResponse>(`${ECOSTAT_BASE}/481`),
      fetchJson<EcoStatApiResponse>(`${ECOSTAT_BASE}/416`),
      fetchJson<EcoStatApiResponse>(`${ECOSTAT_BASE}/562`),
    ]);

    const latest = (latestJson.records || []).map(toLatestRecord).filter((row) => row.commodity && row.date);
    const priceDate = latest[0]?.date || "2026-11-25";
    const fromDate = shiftIsoDate(priceDate, -10);
    const areaJson = await fetchJson<EcoStatApiResponse>(
      `${ECOSTAT_BASE}/416?from=${fromDate}&to=${priceDate}&dim_1=19&dim_2=4155&dim_3=4833`,
    );

    return {
      latest,
      monthly: (monthlyJson.records || []).map(toMonthlyRecord).filter((row) => row.commodity && row.date),
      areaSeries: (areaJson.records || []).map(toAreaRecord).filter((row) => row.district && row.date),
      dailyTotal: dailyJson.totalRecords || 0,
      latestSourceName: latestJson.visualization?.name || "MI: State Average Wholesale Prices of all Commodities, Latest",
      monthlySourceName: monthlyJson.visualization?.name || "MI: Monthly State average prices of commodities, time series",
      priceDate,
      fetchedAt,
    };
  } catch {
    return ecoStatReferenceData(fetchedAt);
  }
}

export async function getIndustryKeraData(): Promise<IndustryKeraData> {
  const fetchedAt = indiaTimestamp();
  try {
    const [industry, ...keraResponses] = await Promise.all([
      fetchJson<YearOfEnterprisesResponse>(YEAR_OF_ENTERPRISES_URL, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }),
      ...[
        { id: 18, name: "Rubber replantation" },
        { id: 11, name: "Cardamom replantation" },
        { id: 3, name: "Coffee replantation" },
      ].map(async (scheme) => ({
        scheme,
        response: await fetchJson<KeraSummaryResponse>(`${KERA_BASE}/summary?scheme_id=${scheme.id}`),
      })),
    ]);

    return {
      enterprises: numberFromText(industry.no_units_started),
      investment: numberFromText(industry.investment_cr),
      employment: numberFromText(industry.emplyment_generated),
      districts: (industry.districtwisePerformances?.districtWiseData || []).map((row) => ({
        district: row.distname,
        enterprises: row.achievement,
        investment: row.investment,
        employment: row.emplyment_generated,
      })),
      categories: (industry.Category?.categoryData || []).map((row) => ({
        category: row.categoryname,
        enterprises: row.no_of_enterprises,
        investment: row.investment,
        employment: row.emplyment_generated,
      })),
      gender: (industry.GenderDetails?.GenderData || []).map(toParticipation),
      socialCategories: (industry.SocialCategory?.socialcategoryData || []).map((row) =>
        toParticipation({
          gender_name: row.social_category,
          no_of_enterprises: row.no_of_enterprises,
          percentage: row.percentage,
          investment: row.investment,
          emplyment_generated: row.emplyment_generated,
        }),
      ),
      keraSchemes: keraResponses.map(({ scheme, response }) => ({
        id: scheme.id,
        name: scheme.name,
        applications: response.summary?.total_applications || 0,
        sanctioned: response.summary?.sanctioned_applications || 0,
        sanctionedArea: numberFromText(response.summary?.sanctioned_hectares),
        disbursedApplications: response.summary?.disbursed_applications || 0,
        disbursedAmount: response.summary?.total_disbursed_amount || 0,
      })),
      fetchedAt,
    };
  } catch {
    return industryKeraReferenceData(fetchedAt);
  }
}

export async function getCmoData(): Promise<CmoData> {
  try {
    const response = await fetch(CMO_DASHBOARD_URL, {
      next: { revalidate: 1800 },
      headers: {
        Accept: "text/html",
        "User-Agent": "Kerala CM Dashboard Stage 1",
      },
    });
    if (!response.ok) throw new Error(`Source returned ${response.status}`);
    return parseCmoDashboard(await response.text());
  } catch {
    return cmoReferenceData;
  }
}

async function fetchJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...init,
    next: { revalidate: 1800 },
    headers: {
      Accept: "application/json",
      "User-Agent": "Kerala CM Dashboard Stage 1",
      ...(init.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`Source returned ${response.status}`);
  return response.json() as Promise<T>;
}

function toLatestRecord(row: EcoStatApiRecord): MarketPriceRecord {
  return {
    commodity: row.dim_3_name || "",
    date: row.date || "",
    price: numberOrNull(row.measure_1),
    prevDay: numberOrNull(row.measure_2),
    prevMonth: numberOrNull(row.measure_3),
    prevYear: numberOrNull(row.measure_4),
    unit: row.measure_1_unit || "Rs.",
  };
}

function toMonthlyRecord(row: EcoStatApiRecord): MarketMonthlyRecord {
  return {
    commodity: row.dim_4_name || "",
    date: row.date || "",
    value: numberOrNull(row.measure_1),
    unit: row.measure_1_unit || "Rs.",
  };
}

function toAreaRecord(row: EcoStatApiRecord): AreaPriceRecord {
  return {
    district: row.dim_1_name || "",
    centre: row.dim_2_name || "",
    commodity: row.dim_3_name || "",
    date: row.date || "",
    price: numberOrNull(row.measure_1),
    prevDay: numberOrNull(row.measure_2),
    unit: row.measure_1_unit || "Rs.",
  };
}

function toParticipation(row: YearOfEnterprisesParticipation): IndustryParticipation {
  return {
    group: row.gender_name,
    enterprises: row.no_of_enterprises,
    percentage: row.percentage,
    investment: row.investment,
    employment: row.emplyment_generated,
  };
}

function numberOrNull(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function numberFromText(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? "0").replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function shiftIsoDate(date: string, days: number) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

function indiaTimestamp() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function parseCmoDashboard(html: string): CmoData {
  const lastUpdated = html.match(/Last Updated:\s*([^<]+)/i)?.[1]?.trim() || cmoReferenceData.lastUpdated;
  const processing = html.match(/"year":\s*"\d{4}\s*\(w\.e\.f\s*([^)]+)\)"\s*,\s*"total_applications":\s*(\d+)\s*,\s*"total_disposed":\s*(\d+)/i);

  const channelMatches = [...html.matchAll(/category:\s*"([^"]+)"\s*,\s*value:\s*(\d+)\s*,\s*sliceSettings:\s*\{\s*fill:\s*am5\.color\((0x[0-9a-f]+)\)/gi)];
  const channels = channelMatches.length
    ? channelMatches.map((match) => ({ channel: match[1].toLowerCase() === "cpgrams" ? "CPGRAMS" : match[1], received: numberFromText(match[2]), color: match[3].replace(/^0x/i, "#") }))
    : cmoReferenceData.channels;

  const departmentMatches = [...html.matchAll(/\{"year":\s*"([^"]+)",\s*"Received":\s*(\d+),\s*"Approved":\s*(\d+)\}/g)];
  const departments = departmentMatches.length
    ? departmentMatches.map((match) => ({ department: match[1], received: numberFromText(match[2]), disposed: numberFromText(match[3]) }))
    : cmoReferenceData.departments;

  return {
    officesConnected: readHeadline(html, "Offices Connected") || cmoReferenceData.officesConnected,
    grievances: readHeadline(html, "Grievances") || cmoReferenceData.grievances,
    cmdrfApplications: readHeadline(html, "CMDRF Applications") || cmoReferenceData.cmdrfApplications,
    applicationsReceived: processing ? numberFromText(processing[2]) : cmoReferenceData.applicationsReceived,
    applicationsDisposed: processing ? numberFromText(processing[3]) : cmoReferenceData.applicationsDisposed,
    lastUpdated,
    lastUpdatedDisplay: formatCmoTimestamp(lastUpdated),
    statisticsSince: processing ? formatCmoEffectiveDate(processing[1]) : cmoReferenceData.statisticsSince,
    channels,
    departments,
    sourceUrl: CMO_DASHBOARD_URL,
  };
}

function readHeadline(html: string, label: string) {
  const labelIndex = html.indexOf(label);
  if (labelIndex < 0) return 0;
  const beforeLabel = html.slice(Math.max(0, labelIndex - 500), labelIndex);
  const headingStart = beforeLabel.lastIndexOf("<h2");
  if (headingStart < 0) return 0;
  const headingText = beforeLabel.slice(headingStart).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
  const values = headingText.match(/[\d,]+/g);
  return values?.length ? numberFromText(values.at(-1)) : 0;
}

function formatCmoTimestamp(value: string) {
  const match = value.match(/(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})/);
  if (!match) return value;
  const [, day, month, year, hour, minute] = match;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hour24 = Number(hour);
  const hour12 = hour24 % 12 || 12;
  return `${Number(day)} ${months[Number(month) - 1]} ${year} · ${hour12}:${minute} ${hour24 >= 12 ? "PM" : "AM"}`;
}

function formatCmoEffectiveDate(value: string) {
  const match = value.trim().match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!match) return value.trim();
  const [, day, month, year] = match;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

type YearOfEnterprisesDistrict = {
  distname: string;
  achievement: number;
  investment: number;
  emplyment_generated: number;
};

type YearOfEnterprisesCategory = {
  categoryname: string;
  no_of_enterprises: number;
  investment: number;
  emplyment_generated: number;
};

type YearOfEnterprisesParticipation = {
  gender_name: string;
  no_of_enterprises: number;
  percentage: number;
  investment: number;
  emplyment_generated: number;
};

type YearOfEnterprisesResponse = {
  investment_cr: number | string;
  no_units_started: number | string;
  emplyment_generated: number | string;
  districtwisePerformances?: { districtWiseData?: YearOfEnterprisesDistrict[] };
  Category?: { categoryData?: YearOfEnterprisesCategory[] };
  GenderDetails?: { GenderData?: YearOfEnterprisesParticipation[] };
  SocialCategory?: {
    socialcategoryData?: Array<{
      social_category: string;
      no_of_enterprises: number;
      percentage: number;
      investment: number;
      emplyment_generated: number;
    }>;
  };
};

type KeraSummaryResponse = {
  success?: boolean;
  summary?: {
    total_applications?: number;
    sanctioned_applications?: number;
    sanctioned_hectares?: string | number;
    disbursed_applications?: number;
    total_disbursed_amount?: number;
  };
};

function ecoStatReferenceData(fetchedAt: string): EcoStatData {
  return {
    latest: [
      { commodity: "Arecanut (Ripe) (1000 Nos)", date: "2026-11-25", price: 3862.5, prevDay: 3866.67, prevMonth: null, prevYear: 3771.43, unit: "Rs." },
      { commodity: "Bengal Gram (Black) (Quintal)", date: "2026-11-25", price: 9771.43, prevDay: 9816.67, prevMonth: null, prevYear: 8557.14, unit: "Rs." },
      { commodity: "Bengal Gram (White) (Quintal)", date: "2026-11-25", price: 13166.67, prevDay: 14000, prevMonth: null, prevYear: 12133.33, unit: "Rs." },
    ],
    monthly: [],
    areaSeries: [
      { district: "Thiruvananthapuram", centre: "Thiruvananthapuram", commodity: "Coconut With Husk (1000 Nos)", date: "2026-11-20", price: 23000, prevDay: 23000, unit: "Rs." },
      { district: "Thiruvananthapuram", centre: "Thiruvananthapuram", commodity: "Coconut With Husk (1000 Nos)", date: "2026-11-21", price: 23000, prevDay: 23000, unit: "Rs." },
      { district: "Thiruvananthapuram", centre: "Thiruvananthapuram", commodity: "Coconut With Husk (1000 Nos)", date: "2026-11-23", price: 23000, prevDay: 23000, unit: "Rs." },
      { district: "Thiruvananthapuram", centre: "Thiruvananthapuram", commodity: "Coconut With Husk (1000 Nos)", date: "2026-11-25", price: 23000, prevDay: 23000, unit: "Rs." },
    ],
    dailyTotal: 511388,
    latestSourceName: "MI: State Average Wholesale Prices of all Commodities, Latest",
    monthlySourceName: "MI: Monthly State average prices of commodities, time series",
    priceDate: "2026-11-25",
    fetchedAt,
  };
}

const cmoReferenceData: CmoData = {
  officesConnected: 9939,
  grievances: 77153,
  cmdrfApplications: 79970,
  applicationsReceived: 75434,
  applicationsDisposed: 49067,
  lastUpdated: "26-11-2026 14:00",
  lastUpdatedDisplay: "26 Nov 2026 · 2:00 PM",
  statisticsSince: "18 May 2026",
  channels: [
    { channel: "Akshaya", received: 992, color: "#dc4534" },
    { channel: "Direct", received: 4375, color: "#f5821f" },
    { channel: "Online", received: 23218, color: "#2563eb" },
    { channel: "CPGRAMS", received: 4557, color: "#0f766e" },
  ],
  departments: [
    { department: "Local Self Government Department", received: 8957, disposed: 5601 },
    { department: "Home Department", received: 8344, disposed: 6700 },
    { department: "Revenue Department", received: 6099, disposed: 3188 },
    { department: "Co-operation Department", received: 3378, disposed: 2884 },
    { department: "General Education Department", received: 3128, disposed: 2063 },
    { department: "Finance Department", received: 2746, disposed: 1280 },
    { department: "Health and Family Welfare Department", received: 2177, disposed: 878 },
    { department: "Labour and Skills Department", received: 2104, disposed: 1431 },
    { department: "Transport Department", received: 2066, disposed: 1326 },
    { department: "Taxes Department (Commercial Taxes, Lotteries)", received: 1887, disposed: 1153 },
  ],
  sourceUrl: CMO_DASHBOARD_URL,
};

function industryKeraReferenceData(fetchedAt: string): IndustryKeraData {
  return {
    enterprises: 473284,
    investment: 32833.08,
    employment: 1012649,
    districts: [
      { district: "Thiruvananthapuram", enterprises: 49311, investment: 3027.51, employment: 103302 },
      { district: "Ernakulam", enterprises: 47266, investment: 5617.28, employment: 114205 },
      { district: "Thrissur", enterprises: 47349, investment: 2867.46, employment: 99119 },
      { district: "Malappuram", enterprises: 45626, investment: 3250.86, employment: 106193 },
      { district: "Palakkad", enterprises: 42332, investment: 2878.38, employment: 94505 },
    ],
    categories: [
      { category: "Manufacturing", enterprises: 60794, investment: 6513.13, employment: 165160 },
      { category: "Service", enterprises: 207055, investment: 13277.15, employment: 458982 },
      { category: "Trade", enterprises: 205434, investment: 13042.79, employment: 388506 },
    ],
    gender: [
      { group: "Female", enterprises: 147574, percentage: 31.18, investment: 6765.37, employment: 288139 },
      { group: "Male", enterprises: 325647, percentage: 68.81, investment: 26081.6, employment: 724948 },
      { group: "Transgender", enterprises: 57, percentage: 0.01, investment: 2.1, employment: 115 },
    ],
    socialCategories: [],
    keraSchemes: [
      { id: 18, name: "Rubber replantation", applications: 6251, sanctioned: 2663, sanctionedArea: 1384.24, disbursedApplications: 2568, disbursedAmount: 73088118 },
      { id: 11, name: "Cardamom replantation", applications: 1726, sanctioned: 730, sanctionedArea: 257.25, disbursedApplications: 689, disbursedAmount: 12225000 },
      { id: 3, name: "Coffee replantation", applications: 654, sanctioned: 8, sanctionedArea: 3.17, disbursedApplications: 8, disbursedAmount: 243705 },
    ],
    fetchedAt,
  };
}
