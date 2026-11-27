import pack from "@/data/mission-samudra-page-data-pack.json";

export const MS: any = pack;

export const CAT_COLOR: Record<string, string> = {
  "Vizhinjam & Major Infra": "#1c3f7c",
  "Minor Ports & Clusters": "#1aa6c9",
  "Policy / Governance / Social": "#f5821f",
};
export const FUND_COLOR = { Private: "#7c3aed", GoK: "#1c3f7c", GoI: "#16a34a" };
export const FY_LIST = ["FY26", "FY27", "FY28", "FY29", "FY30", "FY31", "FY32", "FY33", "FY34", "FY35", "FY36"];

const MONTHS: Record<string, number> = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };

// "Apr 2026" -> FY index (FY26 = 0). Indian FY runs Apr–Mar.
export function fyIndex(monthYear: string): number {
  if (!monthYear) return 0;
  const [m, y] = monthYear.trim().split(/\s+/);
  const mon = MONTHS[m] ?? 4;
  const year = parseInt(y, 10) || 2026;
  const fy = mon >= 4 ? year : year - 1;
  return Math.max(0, Math.min(FY_LIST.length - 1, fy - 2026));
}
export function activityRange(a: any): [number, number] {
  return [fyIndex(a.timeline?.plannedStart), fyIndex(a.timeline?.plannedEnd)];
}
export const fyLabelOf = (i: number) => FY_LIST[i];

export function inr(n: number | null | undefined): string {
  if (n == null) return "—";
  return "₹" + Number(n).toLocaleString("en-IN") + " Cr";
}
export function pct(part: number, whole: number) {
  return whole ? +((part / whole) * 100).toFixed(1) : 0;
}

export interface Filters {
  stage?: string; category?: string; type?: string; fy?: string;
  scheme?: string; agency?: string; fund?: string; q?: string;
}
export function applyFilters(activities: any[], f: Filters): any[] {
  return activities.filter((a) => {
    if (f.stage && a.stage !== f.stage) return false;
    if (f.category && a.category !== f.category) return false;
    if (f.type && a.activityType !== f.type) return false;
    if (f.fy) {
      const [s, e] = activityRange(a);
      const idx = FY_LIST.indexOf(f.fy);
      if (idx < s || idx > e) return false;
    }
    if (f.scheme && !(a.governmentOfIndia?.schemes || []).includes(f.scheme)) return false;
    if (f.agency) {
      const all = `${a.governmentOfKerala?.agency} ${a.governmentOfIndia?.agency} ${a.privateSector?.entity}`;
      if (!all.includes(f.agency)) return false;
    }
    if (f.fund) {
      const k = f.fund === "Private" ? a.funding?.privateCr : f.fund === "GoK" ? a.funding?.gokCr : a.funding?.goiCr;
      if (!k) return false;
    }
    if (f.q) {
      const hay = JSON.stringify(a).toLowerCase();
      if (!hay.includes(f.q.toLowerCase())) return false;
    }
    return true;
  });
}

// successor map from dependency edges
export function buildDeps() {
  const succ: Record<number, number[]> = {};
  const pred: Record<number, number[]> = {};
  (MS.dependencies.edges as any[]).forEach((e) => {
    (succ[e.fromActivityId] ||= []).push(e.toActivityId);
    (pred[e.toActivityId] ||= []).push(e.fromActivityId);
  });
  return { succ, pred };
}

export function validate() {
  const acts = MS.activities as any[];
  const sum = (k: string) => acts.reduce((s, a) => s + (a.funding?.[k] || 0), 0);
  const total = sum("totalCr"), priv = sum("privateCr"), gok = sum("gokCr"), goi = sum("goiCr");
  const exp = MS.validation.expectedTotalsCr;
  const stageSum: Record<string, number> = {};
  acts.forEach((a) => { stageSum[a.stage] = (stageSum[a.stage] || 0) + (a.funding?.totalCr || 0); });
  const catSum: Record<string, number> = {};
  acts.forEach((a) => { catSum[a.category] = (catSum[a.category] || 0) + (a.funding?.totalCr || 0); });
  const ids = acts.map((a) => a.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  const validIds = new Set(ids);
  const badEdges = (MS.dependencies.edges as any[]).filter((e) => !validIds.has(e.fromActivityId) || !validIds.has(e.toActivityId));
  const reconciled = priv + gok + goi === total;
  return {
    count: acts.length, expectedCount: MS.validation.expectedActivityCount,
    total, priv, gok, goi, exp, reconciled,
    stageSum, catSum, dupes, badEdges,
    totalOk: total === exp.total, privOk: priv === exp.private, gokOk: gok === exp.gok, goiOk: goi === exp.goi,
  };
}

export function activitiesCSV(acts: any[]): string {
  const head = ["Code", "Activity", "Stage", "Category", "Type", "PlannedStart", "PlannedEnd", "Dependencies", "GoK Agency", "GoI Agency", "Private Entity", "Total Cr", "Private Cr", "GoK Cr", "GoI Cr", "Instrument"];
  const rows = acts.map((a) => [
    a.code, a.activity, a.stage, a.category, a.activityType,
    a.timeline?.plannedStart, a.timeline?.plannedEnd, (a.dependencies || []).join(" "),
    a.governmentOfKerala?.agency, a.governmentOfIndia?.agency, a.privateSector?.entity,
    a.funding?.totalCr, a.funding?.privateCr, a.funding?.gokCr, a.funding?.goiCr, a.funding?.financialInstrument,
  ].map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","));
  return [head.join(","), ...rows].join("\n");
}
export function downloadCSV(name: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

// Schedule status vs the PLANNED timeline (not operational delay — actuals are not connected).
export interface SchedStatus { key: string; label: string; color: string; icon: string; }
export function scheduleStatus(a: any): SchedStatus {
  const cur = FY_LIST.indexOf(MS.metadata.currentFiscalYear);
  const [s, e] = activityRange(a);
  if (s > cur) return { key: "upcoming", label: "Upcoming", color: "#64748b", icon: "Clock" };
  if (e < cur) return { key: "elapsed", label: "Planned-complete", color: "#16a34a", icon: "CircleCheck" };
  if (e === cur) return { key: "due", label: "Due this FY", color: "#1aa6c9", icon: "AlarmClock" };
  return { key: "active", label: "Active (planned)", color: "#f59e0b", icon: "LoaderCircle" };
}
export const SCHED_LEGEND = [
  { label: "Upcoming", color: "#64748b" },
  { label: "Active (planned)", color: "#f59e0b" },
  { label: "Due this FY", color: "#1aa6c9" },
  { label: "Planned-complete", color: "#16a34a" },
];
