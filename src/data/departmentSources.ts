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

export type EHealthInstitution = {
  id: string;
  name: string;
  type: string;
  district: string;
  startDate: string;
};

export type EHealthData = {
  institutionsOnboarded: number;
  registrations: number;
  visits: number;
  inpatientAdmissions: number;
  inpatientDischarges: number;
  onlineAppointments: number;
  onlineConsultations: number;
  prechecks: number;
  diagnoses: number;
  prescriptions: number;
  labTests: number;
  memberRegistrations: number;
  houseRegistrations: number;
  daily: {
    registrations: number;
    visits: number;
    inpatientAdmissions: number;
    inpatientDischarges: number;
    onlineAppointments: number;
    onlineConsultations: number;
    prechecks: number;
    diagnoses: number;
    prescriptions: number;
    labTests: number;
  };
  dailyDistrictVisits: Array<{ district: string; visits: number }>;
  facilityMix: Array<{ facility: string; institutions: number }>;
  districtCoverage: Array<{ district: string; institutions: number }>;
  commissioningTrend: Array<{ year: string; institutions: number }>;
  recentInstitutions: EHealthInstitution[];
  referenceDate: string;
  portalLastModified: string;
  fetchedAt: string;
  sourceUrl: string;
  publicWorkforceData: boolean;
  sourceMode: "live" | "official-snapshot";
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
const EHEALTH_DASHBOARD_URL = "https://dashboard.ehealth.kerala.gov.in/index.php/Init";

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

export async function getEHealthData(): Promise<EHealthData> {
  const fetchedAt = indiaTimestamp();
  try {
    const response = await fetch(EHEALTH_DASHBOARD_URL, {
      next: { revalidate: 1800 },
      headers: {
        Accept: "text/html",
        "User-Agent": "Kerala CM Dashboard Stage 1",
      },
    });
    if (!response.ok) throw new Error(`Source returned ${response.status}`);

    const html = await response.text();
    const referenceDate = html.match(/id="end_date" value="(\d{4}-\d{2}-\d{2})"/i)?.[1] || "2026-11-25";
    const form = { frm_dt: referenceDate, to_dt: referenceDate, dist_id: "0" };
    const [dailyHtml, permanentVisitHtml, temporaryVisitHtml] = await Promise.all([
      postEHealthHtml("ShowProjStats", form),
      postEHealthHtml("ShowProjStatsDist", { ...form, ind_id: "PID" }),
      postEHealthHtml("ShowProjStatsDist", { ...form, ind_id: "TID" }),
    ]);

    return parseEHealthDashboard(html, dailyHtml, permanentVisitHtml, temporaryVisitHtml, fetchedAt);
  } catch {
    return eHealthReferenceData(fetchedAt);
  }
}

async function postEHealthHtml(endpoint: string, values: Record<string, string>) {
  const response = await fetch(`${EHEALTH_DASHBOARD_URL}/${endpoint}`, {
    method: "POST",
    next: { revalidate: 1800 },
    headers: {
      Accept: "text/html",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Kerala CM Dashboard Stage 1",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: new URLSearchParams(values),
  });
  if (!response.ok) throw new Error(`eHealth ${endpoint} returned ${response.status}`);
  return response.text();
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

function parseEHealthDashboard(
  html: string,
  dailyHtml: string,
  permanentVisitHtml: string,
  temporaryVisitHtml: string,
  fetchedAt: string,
): EHealthData {
  const withoutComments = html.replace(/<!--[\s\S]*?-->/g, "");
  const institutions = [...withoutComments.matchAll(/<tr role="row"[^>]*hospital_id=['"]?(\d+)['"]?[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((match): EHealthInstitution | null => {
      const cells = [...match[2].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => cleanHtmlText(cell[1]));
      const startDate = match[2].match(/data-sort=['"](\d{4}-\d{2}-\d{2})['"]/i)?.[1] || "";
      if (cells.length < 4 || !startDate) return null;
      return { id: match[1], name: cells[0], type: cells[1], district: titleCase(cells[2]), startDate };
    })
    .filter((row): row is EHealthInstitution => Boolean(row));

  if (!institutions.length) throw new Error("No institution rows found in eHealth source");

  const districtCounts = countBy(institutions, (row) => row.district);
  const yearCounts = countBy(institutions, (row) => row.startDate.slice(0, 4));
  const smallBoxMatches = [...withoutComments.matchAll(/<h3 class="counter-count">\s*([\d,]+)\s*<\/h3>[\s\S]{0,500}?<p>\s*([^<]+?)\s*<\/p>/gi)];
  const facilityLabels = new Set(["Medical College Hospitals", "DHs / GHs", "Taluk Hospitals", "CHCs", "PHCs / FHCs", "Urban PHC", "Specialty Hospital", "Public Health Labs", "Others"]);
  const facilityMix = smallBoxMatches
    .map((match) => ({ facility: cleanHtmlText(match[2]), institutions: numberFromText(match[1]) }))
    .filter((row) => facilityLabels.has(row.facility));

  const permanentVisits = readDistrictTable(permanentVisitHtml);
  const temporaryVisits = readDistrictTable(temporaryVisitHtml);
  const dailyDistrictVisits = [...new Set([...permanentVisits.keys(), ...temporaryVisits.keys()])]
    .map((district) => ({ district, visits: (permanentVisits.get(district) || 0) + (temporaryVisits.get(district) || 0) }))
    .sort((a, b) => b.visits - a.visits);

  return {
    institutionsOnboarded: institutions.length,
    registrations: readInfoBoxMetric(withoutComments, "Total Registrations"),
    visits: readInfoBoxMetric(withoutComments, "Total Visits"),
    inpatientAdmissions: readInfoBoxMetric(withoutComments, "Inpatient Admissions"),
    inpatientDischarges: readInfoBoxMetric(withoutComments, "Inpatient Discharges"),
    onlineAppointments: readCardMetricById(withoutComments, "onvisitsCardBox"),
    onlineConsultations: readCardMetricById(withoutComments, "onconsCardBox"),
    prechecks: readInfoBoxMetric(withoutComments, "Precheck"),
    diagnoses: readInfoBoxMetric(withoutComments, "Diagnosis"),
    prescriptions: readInfoBoxMetric(withoutComments, "Prescriptions"),
    labTests: readInfoBoxMetric(withoutComments, "Lab Tests"),
    memberRegistrations: readInfoBoxMetric(withoutComments, "Member Registrations"),
    houseRegistrations: readInfoBoxMetric(withoutComments, "House Registrations"),
    daily: {
      registrations: readInfoBoxMetric(dailyHtml, "Total Registrations"),
      visits: readInfoBoxMetric(dailyHtml, "Total Visits"),
      inpatientAdmissions: readInfoBoxMetric(dailyHtml, "Inpatient Admissions"),
      inpatientDischarges: readInfoBoxMetric(dailyHtml, "Inpatient Discharges"),
      onlineAppointments: readCardMetricById(dailyHtml, "onvisitsCardBox2"),
      onlineConsultations: readCardMetricById(dailyHtml, "onconsCardBox2"),
      prechecks: readInfoBoxMetric(dailyHtml, "Precheck"),
      diagnoses: readInfoBoxMetric(dailyHtml, "Diagnosis"),
      prescriptions: readInfoBoxMetric(dailyHtml, "Prescriptions"),
      labTests: readInfoBoxMetric(dailyHtml, "Lab Tests"),
    },
    dailyDistrictVisits,
    facilityMix: facilityMix.length ? facilityMix : eHealthReferenceData(fetchedAt).facilityMix,
    districtCoverage: [...districtCounts.entries()]
      .map(([district, count]) => ({ district, institutions: count }))
      .sort((a, b) => b.institutions - a.institutions),
    commissioningTrend: [...yearCounts.entries()]
      .map(([year, count]) => ({ year, institutions: count }))
      .sort((a, b) => a.year.localeCompare(b.year)),
    recentInstitutions: [...institutions].sort((a, b) => b.startDate.localeCompare(a.startDate)).slice(0, 12),
    referenceDate: withoutComments.match(/id="end_date" value="(\d{4}-\d{2}-\d{2})"/i)?.[1] || "2026-11-25",
    portalLastModified: cleanHtmlText(withoutComments.match(/Site Last Modified On:\s*([^<]+)/i)?.[1] || ""),
    fetchedAt,
    sourceUrl: EHEALTH_DASHBOARD_URL,
    publicWorkforceData: /(?:doctor|vacanc(?:y|ies)|sanctioned strength|medical officer|nurs(?:e|ing))/i.test(withoutComments),
    sourceMode: "live",
  };
}

function readInfoBoxMetric(html: string, label: string) {
  const normalizedLabel = label.toLowerCase();
  for (const match of html.matchAll(/<div class="info-box-content">([\s\S]*?)<\/div>/gi)) {
    const text = cleanHtmlText(match[1]).toLowerCase();
    if (!text.startsWith(normalizedLabel)) continue;
    const value = match[1].match(/info-box-number[^>]*>\s*([\d,]+)/i)?.[1];
    return numberFromText(value);
  }
  return 0;
}

function readCardMetricById(html: string, id: string) {
  const index = html.indexOf(`id="${id}"`);
  if (index < 0) return 0;
  return numberFromText(html.slice(index, index + 1800).match(/info-box-number[^>]*>\s*([\d,]+)/i)?.[1]);
}

function readDistrictTable(html: string) {
  const tableStart = html.indexOf('id="inst_table"');
  const tableEnd = tableStart >= 0 ? html.indexOf("</table>", tableStart) : -1;
  const tableHtml = tableStart >= 0 && tableEnd >= 0 ? html.slice(tableStart, tableEnd + 8) : "";
  const rows = new Map<string, number>();
  for (const match of tableHtml.matchAll(/<tr[^>]*>\s*<td[^>]*>\s*([^<]+?)\s*<\/td>\s*<td[^>]*>\s*([\d,]+)\s*<\/td>\s*<\/tr>/gi)) {
    rows.set(titleCase(cleanHtmlText(match[1])), numberFromText(match[2]));
  }
  return rows;
}

function cleanHtmlText(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value: string) {
  return value.toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase());
}

function countBy<T>(rows: T[], keyFor: (row: T) => string) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = keyFor(row);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
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

function eHealthReferenceData(fetchedAt: string): EHealthData {
  return {
    institutionsOnboarded: 1163,
    registrations: 108783369,
    visits: 283175211,
    inpatientAdmissions: 2217266,
    inpatientDischarges: 2006973,
    onlineAppointments: 2808812,
    onlineConsultations: 749537,
    prechecks: 59151036,
    diagnoses: 132870809,
    prescriptions: 88261313,
    labTests: 32646427,
    memberRegistrations: 25955998,
    houseRegistrations: 6835747,
    daily: {
      registrations: 46992,
      visits: 269954,
      inpatientAdmissions: 1423,
      inpatientDischarges: 1526,
      onlineAppointments: 4942,
      onlineConsultations: 1429,
      prechecks: 58664,
      diagnoses: 119606,
      prescriptions: 79276,
      labTests: 31302,
    },
    dailyDistrictVisits: [
      { district: "Thiruvananthapuram", visits: 55410 },
      { district: "Malappuram", visits: 31213 },
      { district: "Kozhikode", visits: 27815 },
      { district: "Ernakulam", visits: 26575 },
      { district: "Thrissur", visits: 24059 },
      { district: "Kottayam", visits: 16272 },
      { district: "Kannur", visits: 15738 },
      { district: "Palakkad", visits: 14537 },
      { district: "Alappuzha", visits: 14270 },
      { district: "Kollam", visits: 12063 },
      { district: "Wayanad", visits: 11652 },
      { district: "Kasaragod", visits: 9217 },
      { district: "Pathanamthitta", visits: 6858 },
      { district: "Idukki", visits: 4275 },
    ],
    facilityMix: [
      { facility: "Medical College Hospitals", institutions: 19 },
      { facility: "DHs / GHs", institutions: 33 },
      { facility: "Taluk Hospitals", institutions: 85 },
      { facility: "CHCs", institutions: 115 },
      { facility: "PHCs / FHCs", institutions: 599 },
      { facility: "Urban PHC", institutions: 99 },
      { facility: "Specialty Hospital", institutions: 16 },
      { facility: "Public Health Labs", institutions: 4 },
      { facility: "Others", institutions: 193 },
    ],
    districtCoverage: [
      { district: "Thiruvananthapuram", institutions: 158 },
      { district: "Ernakulam", institutions: 140 },
      { district: "Thrissur", institutions: 117 },
      { district: "Malappuram", institutions: 113 },
      { district: "Kozhikode", institutions: 93 },
      { district: "Palakkad", institutions: 82 },
      { district: "Kannur", institutions: 76 },
      { district: "Kollam", institutions: 75 },
      { district: "Alappuzha", institutions: 72 },
      { district: "Kottayam", institutions: 70 },
      { district: "Pathanamthitta", institutions: 44 },
      { district: "Wayanad", institutions: 44 },
      { district: "Kasaragod", institutions: 43 },
      { district: "Idukki", institutions: 36 },
    ],
    commissioningTrend: [
      { year: "2016", institutions: 10 }, { year: "2017", institutions: 3 },
      { year: "2018", institutions: 19 }, { year: "2019", institutions: 57 },
      { year: "2020", institutions: 86 }, { year: "2021", institutions: 152 },
      { year: "2022", institutions: 161 }, { year: "2023", institutions: 114 },
      { year: "2024", institutions: 65 }, { year: "2025", institutions: 408 },
      { year: "2026", institutions: 88 },
    ],
    recentInstitutions: [
      { id: "699", name: "PRIMARY HEALTH CENTRE THRIKKAKARA", type: "Primary Health Centre", district: "Ernakulam", startDate: "2026-11-19" },
      { id: "1163", name: "URBAN HEALTH AND WELLNESS CENTRE KALLEKKAD", type: "Urban Health Wellness Centre", district: "Palakkad", startDate: "2026-11-18" },
      { id: "1161", name: "URBAN HEALTH AND WELLNESS CENTRE PUTHUPALLI STREET", type: "Urban Health Wellness Centre", district: "Palakkad", startDate: "2026-11-18" },
      { id: "1160", name: "URBAN HEALTH AND WELLNESS CENTER MANALANCHERI", type: "Urban Health Wellness Centre", district: "Palakkad", startDate: "2026-11-18" },
      { id: "1162", name: "URBAN HEALTH AND WELLNESS CENTRE VITHUNNI", type: "Urban Health Wellness Centre", district: "Palakkad", startDate: "2026-11-18" },
      { id: "588", name: "PRIMARY HEALTH CENTRE NEDUMBASSERY", type: "Primary Health Centre", district: "Ernakulam", startDate: "2026-11-17" },
      { id: "263", name: "COMMUNITY HEALTH CENTRE VARAPETTY", type: "Block Family Health Centre", district: "Ernakulam", startDate: "2026-11-14" },
      { id: "226", name: "COMMUNITY HEALTH CENTRE PAMPAKUDA", type: "Community Health Centre", district: "Ernakulam", startDate: "2026-11-07" },
    ],
    referenceDate: "2026-11-25",
    portalLastModified: "16 Nov 2026 · 1:48 PM",
    fetchedAt,
    sourceUrl: EHEALTH_DASHBOARD_URL,
    publicWorkforceData: false,
    sourceMode: "official-snapshot",
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
