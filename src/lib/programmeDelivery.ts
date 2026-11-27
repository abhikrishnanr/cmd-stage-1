import { unstable_cache } from "next/cache";
import { programmeProgress } from "@/data/deliveryActuals";

const portalOrigin = "https://www.100days.kerala.gov.in";
export const programmeDashboardApiUrl = `${portalOrigin}/api/public/dashboard`;
export const programmeDepartmentsApiUrl = `${portalOrigin}/api/public/departments`;

const maxResponseBytes = 96 * 1024;
const requestTimeoutMs = 4_500;
const cacheSeconds = 15 * 60;

interface ProgrammeTotals {
  projects: number;
  completed: number;
  inProgress: number;
  indicators: number;
  verifiedIndicators: number;
}

export interface DepartmentDelivery {
  name: string;
  projects: number;
  completed: number;
  indicators: number;
  verifiedIndicators: number;
  detailUrl: string;
}

interface SourceResult<T> {
  data: T;
  checkedAt: string;
}

export async function getProgrammeDelivery() {
  const [totals, departments] = await Promise.all([
    readTotals().catch(() => null),
    readDepartments().catch(() => null),
  ]);

  return { totals: totals?.data ?? programmeProgress, totalsCheckedAt: totals?.checkedAt ?? null, departments };
}

const readTotals = unstable_cache(async (): Promise<SourceResult<ProgrammeTotals>> => {
  const payload = await readObject(programmeDashboardApiUrl);
  const stats = payload.stats;
  if (!isObject(stats)) throw new Error("Programme dashboard is missing its totals");

  const projects = readCount(stats.totalProjects);
  const completed = readCount(stats.completedProjects);
  const inProgress = readCount(stats.inProgressProjects);
  const notStarted = readCount(stats.notStartedProjects);
  const indicators = readCount(stats.totalIndicators);
  const verifiedIndicators = readCount(stats.verifiedIndicators);
  if (projects === 0 || completed + inProgress + notStarted !== projects || verifiedIndicators > indicators) {
    throw new Error("Programme totals do not reconcile");
  }

  return { data: { projects, completed, inProgress, indicators, verifiedIndicators }, checkedAt: new Date().toISOString() };
}, ["100-days-dashboard-v1"], { revalidate: cacheSeconds });

const readDepartments = unstable_cache(async (): Promise<SourceResult<DepartmentDelivery[]>> => {
  const payload = await readObject(programmeDepartmentsApiUrl);
  if (!Array.isArray(payload.departments) || payload.departments.length === 0 || payload.departments.length > 200) {
    throw new Error("Programme departments response has an unexpected size");
  }

  const ids = new Set<string>();
  const data = payload.departments.map((department): DepartmentDelivery => {
    if (!isObject(department)) throw new Error("Programme department is invalid");

    const id = department.departmentPublicId;
    const name = typeof department.nameEn === "string" ? department.nameEn.replace(/\s+/g, " ").trim() : "";
    if (typeof id !== "string" || !/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(id) || ids.has(id.toLowerCase()) || !name || name.length > 200) {
      throw new Error("Programme department identity is invalid");
    }
    ids.add(id.toLowerCase());

    const projects = readCount(department.projects);
    const completed = readCount(department.projectsCompleted);
    const indicators = readCount(department.indicators);
    const verifiedIndicators = readCount(department.indicatorsCompleted);
    if (completed > projects || verifiedIndicators > indicators) throw new Error("Programme department totals do not reconcile");

    return { name, projects, completed, indicators, verifiedIndicators, detailUrl: `${portalOrigin}/api/public/department/${id}` };
  });

  data.sort((a, b) => (b.projects - b.completed) - (a.projects - a.completed)
    || (b.indicators - b.verifiedIndicators) - (a.indicators - a.verifiedIndicators)
    || a.name.localeCompare(b.name, "en-IN"));
  return { data, checkedAt: new Date().toISOString() };
}, ["100-days-departments-v1"], { revalidate: cacheSeconds });

async function readObject(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    cache: "no-store",
    redirect: "error",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  if (!response.ok || !response.headers.get("content-type")?.includes("application/json") || !response.body) {
    throw new Error("Programme feed is unavailable");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxResponseBytes) {
        void reader.cancel().catch(() => {});
        throw new Error("Programme feed exceeded the response limit");
      }
      body += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }

  const payload: unknown = JSON.parse(body + decoder.decode());
  if (!isObject(payload)) throw new Error("Programme feed returned an unexpected format");
  return payload;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function readCount(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error("Programme count is invalid");
  return value;
}
