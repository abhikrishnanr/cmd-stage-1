"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, SectionCard, RagBadge } from "./primitives";
import { StackedBars, Donut, Bars, Legend } from "./charts";
import KeralaMap from "./KeralaMap";
import { useUI } from "@/store/ui";
import {
  MS, CAT_COLOR, FUND_COLOR, FY_LIST, fyIndex, activityRange, inr, pct,
  applyFilters, buildDeps, validate, activitiesCSV, downloadCSV, Filters,
  scheduleStatus, SCHED_LEGEND,
} from "@/lib/missionSamudra";
import { msLocations, districtIntensity } from "@/config/mission-samudra-locations.config";

const NAVY = "var(--color-navy)";
const TABS = MS.page.tabs as { id: string; label: string }[];
const CURRENT_FY: string = MS.metadata.currentFiscalYear;
const acts = MS.activities as any[];
const byId = (id: number) => acts.find((a) => a.id === id);
const TAB_ICONS: Record<string, string> = {
  overview: "LayoutDashboard", roadmap: "GanttChartSquare", activities: "ListChecks",
  investment: "Landmark", clusters: "Map", dependencies: "GitBranch",
  ecosystem: "Building2", manifesto: "ScrollText", "data-quality": "ShieldCheck",
};
const TAB_HELP: Record<string, string> = {
  overview: "Command summary",
  roadmap: "FY timeline",
  activities: "33 activities",
  investment: "Funding flow",
  clusters: "Ports and nodes",
  dependencies: "Critical links",
  ecosystem: "Agencies and schemes",
  manifesto: "Promise mapping",
  "data-quality": "Source checks",
};
const TAB_ACCENT: Record<string, string> = {
  overview: "#1aa6c9",
  roadmap: "#2563eb",
  activities: "#16a34a",
  investment: "#7c3aed",
  clusters: "#f5821f",
  dependencies: "#0f766e",
  ecosystem: "#3b82f6",
  manifesto: "#e0245e",
  "data-quality": "#64748b",
};

export default function MissionSamudra() {
  const { showToast, openTicket, role } = useUI();
  const [tab, setTab] = useState("overview");
  const [f, setF] = useState<Filters>({});
  const [sel, setSel] = useState<any>(null);

  // URL sync (tab + filters) without useSearchParams Suspense requirement
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setTab(q.get("tab") || "overview");
    setF({ stage: q.get("stage") || undefined, category: q.get("category") || undefined, type: q.get("type") || undefined, fy: q.get("fy") || undefined, scheme: q.get("scheme") || undefined, agency: q.get("agency") || undefined, fund: q.get("fund") || undefined, q: q.get("q") || undefined });
  }, []);
  const sync = (nextTab: string, nf: Filters) => {
    const q = new URLSearchParams();
    if (nextTab !== "overview") q.set("tab", nextTab);
    Object.entries(nf).forEach(([k, v]) => v && q.set(k, String(v)));
    const s = q.toString();
    window.history.replaceState(null, "", window.location.pathname + (s ? "?" + s : ""));
  };
  const setTabU = (t: string) => { setTab(t); sync(t, f); };
  const setFU = (nf: Filters) => { setF(nf); sync(tab, nf); };

  const filtered = useMemo(() => applyFilters(acts, f), [f]);
  const v = useMemo(() => validate(), []);

  return (
    <div className="mission-samudra-page space-y-5 p-4 sm:p-5">
      <div className="flex items-center gap-1 text-[12px] font-semibold text-slate-400">
        <Link href="/dream-projects" className="flex items-center gap-1 text-[color:var(--color-navy)]"><Icon name="ArrowLeft" size={14} /> Dream Projects</Link>
        <Icon name="ChevronRight" size={13} /> <span>Mission Samudra</span>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl text-white shadow-[0_22px_55px_rgba(11,45,94,.28)]" style={{ background: "linear-gradient(120deg,#082044 0%,#0f4f7e 46%,#13a6c3 100%)" }}>
        <img src="/img/projects/mission-samudra.png" alt="" className="absolute right-0 top-0 hidden h-full w-2/5 object-cover opacity-35 md:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,.22),transparent_28%),linear-gradient(90deg,rgba(4,16,42,.18),transparent_62%)]" />
        <div className="hero-grid absolute inset-0 opacity-25" />
        <div className="relative p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="max-w-3xl">
              <div className="text-[12px] font-black uppercase tracking-[0.22em] text-cyan-100">Infrastructure & Mission Programmes</div>
              <h1 className="display mt-1 text-3xl font-black leading-tight sm:text-5xl">Mission Samudra</h1>
              <p className="mt-2 max-w-2xl text-[15px] font-medium leading-relaxed text-white/84 sm:text-base">{MS.page.subtitle}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/15 px-3 py-1.5 font-bold"><Icon name="CalendarRange" size={14} /> {MS.metadata.programmeWindow}</span>
                <span className="rounded-full bg-white px-3 py-1.5 font-black text-[color:var(--color-navy)]">Current: {CURRENT_FY}</span>
                <span className="rounded-full bg-amber-300 px-3 py-1.5 font-black text-amber-950">Planning Framework</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Link href="/rbm/mission-samudra" className="flex items-center gap-1.5 rounded-xl bg-amber-300 px-3 py-2 text-[12px] font-black text-amber-950 shadow-lg hover:bg-amber-200"><Icon name="ChartNoAxesColumnIncreasing" size={14} /> Project Progress &amp; Statistics</Link>
              <button onClick={() => showToast(`Source: ${MS.sourceSystems[0]["Source System"]} · ${MS.metadata.generatedOn}`)} className="flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-[12px] font-bold text-white hover:bg-white/25"><Icon name="Database" size={14} /> Source</button>
              <button onClick={() => { downloadCSV("mission-samudra-activities.csv", activitiesCSV(filtered)); showToast("Exported activities CSV"); }} className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[12px] font-bold text-[color:var(--color-navy)] hover:bg-white/90"><Icon name="Download" size={14} /> Export</button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {[["Total", inr(MS.headline.total_investment_cr)], ["Private", `${MS.headline.funding_share_percent.Private}%`], ["GoK", `${MS.headline.funding_share_percent.GoK}%`], ["GoI", `${MS.headline.funding_share_percent.GoI}%`], ["Activities", "33"], ["Peak FY28-29", inr(MS.headline.peakAnnualInvestmentCr)]].map(([l, val]) => (
              <div key={l} className="rounded-xl border border-white/12 bg-white/13 p-3.5 backdrop-blur"><div className="text-[11px] font-bold uppercase tracking-wide text-white/62">{l}</div><div className="display mt-1 text-[19px] font-black leading-tight">{val}</div></div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <MissionPillar icon="Ship" title="Port-led growth" text="Vizhinjam, Kochi and Beypore as maritime industry anchors." />
            <MissionPillar icon="Plane" title="Sea-air gateway" text="High-value cargo, airport economic zones and logistics parks." />
            <MissionPillar icon="Fish" title="Coastal livelihoods" text="Fisheries value-add, skilling, cold chain and tourism." />
          </div>
        </div>
      </section>

      {/* STICKY TABS */}
      <div className="sticky top-[52px] z-20">
        <div className="overflow-x-auto scrollbar-thin rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-[0_12px_30px_rgba(15,45,92,.12)] backdrop-blur">
          <div className="flex min-w-max gap-1.5">
            {TABS.map((t) => {
              const on = tab === t.id;
              const accent = TAB_ACCENT[t.id] || NAVY;
              return (
                <button key={t.id} onClick={() => setTabU(t.id)}
                  className={`group relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2 text-[12.5px] font-black transition ${on ? "text-[color:var(--color-ink)]" : "text-slate-500 hover:bg-slate-50 hover:text-[color:var(--color-ink)]"}`}>
                  {on && <motion.span layoutId="ms-tab" className="absolute inset-0 rounded-xl border" style={{ background: `${accent}12`, borderColor: `${accent}55`, boxShadow: `0 10px 22px -14px ${accent}` }} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <motion.span
                    className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                    style={on ? { background: accent, color: "#fff" } : { background: `${accent}14`, color: accent }}
                    animate={on ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={on ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15 }}
                  >
                    <Icon name={TAB_ICONS[t.id] || "Circle"} size={17} />
                    {on && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white" style={{ background: accent }} />}
                  </motion.span>
                  <span className="relative whitespace-nowrap">{t.label}</span>
                  <span className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full transition group-hover:scale-x-100" style={{ background: accent }} />
                  {on && (
                    <motion.span
                      layoutId="ms-tab-underline"
                      className="absolute inset-x-3 bottom-1 h-0.5 rounded-full"
                      style={{ background: accent }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FILTER BAR (shared) — hidden on overview KPI exactness but applies to analytics */}
      {tab !== "data-quality" && <FilterBar f={f} setF={setFU} count={filtered.length} />}

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          {tab === "overview" && <Overview filtered={filtered} setSel={setSel} openTicket={openTicket} />}
          {tab === "roadmap" && <Roadmap filtered={filtered} setSel={setSel} />}
          {tab === "activities" && <Activities filtered={filtered} setSel={setSel} showToast={showToast} />}
          {tab === "investment" && <Investment filtered={filtered} />}
          {tab === "clusters" && <Clusters />}
          {tab === "dependencies" && <Dependencies setSel={setSel} />}
          {tab === "ecosystem" && <Ecosystem />}
          {tab === "manifesto" && <Manifesto setSel={setSel} />}
          {tab === "data-quality" && <DataQuality v={v} role={role} />}
        </motion.div>
      </AnimatePresence>

      <ActivityDrawer a={sel} onClose={() => setSel(null)} setSel={setSel} openTicket={openTicket} />
    </div>
  );
}

/* ---------------- shared bits ---------------- */
function MissionPillar({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/12 p-3.5 backdrop-blur">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/18 text-cyan-100">
        <Icon name={icon} size={24} />
      </span>
      <span>
        <span className="block text-[15px] font-black leading-tight text-white">{title}</span>
        <span className="mt-0.5 block text-[12.5px] font-medium leading-snug text-white/68">{text}</span>
      </span>
    </div>
  );
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600"><Icon name={icon} size={12} /> {text}</span>;
}
function Sel({ label, value, options, onChange }: { label: string; value?: string; options: string[]; onChange: (v?: string) => void }) {
  return (
    <select value={value || ""} onChange={(e) => onChange(e.target.value || undefined)}
      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-semibold text-slate-600 outline-none focus:border-[color:var(--color-navy)]">
      <option value="">{label}</option>
      {options.map((o) => <option key={o} value={o}>{o.length > 38 ? o.slice(0, 36) + "…" : o}</option>)}
    </select>
  );
}
function FilterBar({ f, setF, count }: { f: Filters; setF: (f: Filters) => void; count: number }) {
  const schemes = MS.schemes.map((s: any) => s.name);
  const active = Object.entries(f).filter(([, v]) => v);
  return (
    <div className="card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Icon name="Filter" size={15} className="text-slate-400" />
        <Sel label="All stages" value={f.stage} options={["Stage 1", "Stage 2", "Stage 3"]} onChange={(v) => setF({ ...f, stage: v })} />
        <Sel label="All categories" value={f.category} options={Object.keys(CAT_COLOR)} onChange={(v) => setF({ ...f, category: v })} />
        <Sel label="Any type" value={f.type} options={["New", "Augment"]} onChange={(v) => setF({ ...f, type: v })} />
        <Sel label="Any fiscal year" value={f.fy} options={FY_LIST} onChange={(v) => setF({ ...f, fy: v })} />
        <Sel label="Any scheme" value={f.scheme} options={schemes} onChange={(v) => setF({ ...f, scheme: v })} />
        <Sel label="Any funding" value={f.fund} options={["Private", "GoK", "GoI"]} onChange={(v) => setF({ ...f, fund: v })} />
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
          <Icon name="Search" size={13} className="text-slate-400" />
          <input value={f.q || ""} onChange={(e) => setF({ ...f, q: e.target.value || undefined })} placeholder="Search…" className="w-32 text-[12px] outline-none" />
        </div>
        <span className="ml-auto text-[11.5px] font-bold text-slate-400">{count} / 33 activities</span>
        {active.length > 0 && <button onClick={() => setF({})} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11.5px] font-bold text-slate-600 hover:bg-slate-200">Clear all</button>}
      </div>
      {active.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {active.map(([k, val]) => (
            <span key={k} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-bold text-[color:var(--color-navy)]">{k}: {String(val).slice(0, 24)}<button onClick={() => setF({ ...f, [k]: undefined })}><Icon name="X" size={11} /></button></span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- OVERVIEW ---------------- */
function Overview({ filtered, setSel, openTicket }: any) {
  const h = MS.headline;
  const kpis = [
    { label: "Total Investment", value: inr(h.total_investment_cr), sub: "10-yr programme", icon: "Landmark", color: "#0b2d5e" },
    { label: "Private", value: inr(h.private_investment_cr), sub: `${h.funding_share_percent.Private}%`, icon: "TrendingUp", color: "#7c3aed" },
    { label: "Govt of Kerala", value: inr(h.gok_investment_cr), sub: `${h.funding_share_percent.GoK}%`, icon: "Building2", color: "#1c3f7c" },
    { label: "Govt of India", value: inr(h.goi_investment_cr), sub: `${h.funding_share_percent.GoI}%`, icon: "Flag", color: "#16a34a" },
    { label: "Activities", value: "33", sub: "New 29 · Augment 4", icon: "ListChecks", color: "#1aa6c9" },
    { label: "Peak Annual Plan", value: inr(h.peakAnnualInvestmentCr), sub: "FY28 & FY29", icon: "Activity", color: "#f5821f" },
  ];
  const stageBars = MS.stageSummary.map((s: any) => ({ label: s.stage, Private: s.privateCr, GoK: s.gokCr, GoI: s.goiCr }));
  const annualBars = MS.annualInvestment.map((y: any) => ({ label: y.fiscalYear, Private: y.privateCr, GoK: y.gokCr, GoI: y.goiCr }));
  const catComp = MS.categorySummary.map((c: any) => ({ label: c.category, value: c.totalCr, color: CAT_COLOR[c.category] }));
  const top10 = MS.topProjects;
  const { succ } = buildDeps();
  const exposure = [...acts].map((a) => ({ a, n: (succ[a.id] || []).length })).sort((x, y) => y.n - x.n).slice(0, 6);
  const upcoming = filtered.filter((a: any) => activityRange(a)[0] === FY_LIST.indexOf(CURRENT_FY));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="card relative overflow-hidden p-3.5">
            <span className="absolute left-0 top-0 h-full w-1" style={{ background: k.color }} />
            <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `${k.color}1a`, color: k.color }}><Icon name={k.icon} size={16} /></span>
            <div className="mt-2 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">{k.label}</div>
            <div className="display text-[18px] font-extrabold leading-tight" style={{ color: k.color }}>{k.value}</div>
            <div className="text-[11px] text-slate-500">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Stage Investment" subtitle="Private · GoK · GoI (₹ Cr)" icon="BarChart3" expandable>
          <StackedBars data={stageBars} keys={["Private", "GoK", "GoI"]} colors={[FUND_COLOR.Private, FUND_COLOR.GoK, FUND_COLOR.GoI]} height={210} />
          <div className="mt-1 grid grid-cols-3 gap-1.5 text-center">{MS.stageSummary.map((s: any) => <div key={s.stage} className="rounded bg-slate-50 p-1.5"><div className="text-[11px] font-black text-[color:var(--color-navy)]">{inr(s.totalCr)}</div><div className="text-[9px] text-slate-400">{s.privateSharePercent}% pvt</div></div>)}</div>
        </SectionCard>
        <SectionCard title="Annual Investment Flow" subtitle="FY26–FY35 · peak FY28–29" icon="LineChart" expandable>
          <StackedBars data={annualBars} keys={["Private", "GoK", "GoI"]} colors={[FUND_COLOR.Private, FUND_COLOR.GoK, FUND_COLOR.GoI]} height={210} />
        </SectionCard>
        <SectionCard title="Programme Composition" subtitle="investment by category" icon="PieChart" expandable>
          <Donut data={catComp} height={170} />
          <ul className="mt-2 space-y-1">{MS.categorySummary.map((c: any) => <li key={c.category} className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-1.5 text-slate-600"><span className="h-2.5 w-2.5 rounded" style={{ background: CAT_COLOR[c.category] }} />{c.category}</span><span className="font-bold">{c.activityCount} · {inr(c.totalCr)}</span></li>)}</ul>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <SectionCard title="Top 10 Projects by Planned Investment" icon="ListOrdered" expandable>
          <table className="w-full text-left text-[12.5px]">
            <thead><tr className="border-b border-slate-100 text-[10.5px] uppercase tracking-wide text-slate-400"><th className="px-2 py-1.5">#</th><th>Activity</th><th>Stage</th><th className="text-right">₹ Cr</th></tr></thead>
            <tbody>{top10.map((p: any, i: number) => (
              <tr key={p.id} className="cursor-pointer border-b border-slate-50 hover:bg-blue-50/40" onClick={() => setSel(byId(p.id))}>
                <td className="px-2 py-1.5 text-slate-400">{i + 1}</td><td className="px-2 py-1.5 font-semibold">{p.activity}</td>
                <td className="px-2 py-1.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: CAT_COLOR[p.category] }}>{p.stage}</span></td>
                <td className="px-2 py-1.5 text-right font-bold">{p.totalCr.toLocaleString("en-IN")}</td>
              </tr>))}</tbody>
          </table>
        </SectionCard>
        <div className="space-y-4">
          <SectionCard title="Stage Cards" icon="Layers">
            {MS.stageSummary.map((s: any) => (
              <div key={s.stage} className="mb-2 rounded-xl border border-slate-100 p-2.5 last:mb-0">
                <div className="flex items-center justify-between"><span className="text-[12.5px] font-bold text-[color:var(--color-navy)]">{s.stage}</span><span className="text-[12px] font-black">{inr(s.totalCr)}</span></div>
                <div className="text-[11px] text-slate-400">{s.periodAndTheme} · {s.activityCount} activities</div>
              </div>
            ))}
          </SectionCard>
          <SectionCard title="Dependency Exposure" subtitle="most downstream-enabling" icon="GitBranch">
            {exposure.map(({ a, n }) => <div key={a.id} className="flex items-center justify-between border-b border-slate-50 py-1.5 text-[12px] last:border-0"><span className="truncate text-slate-600">{a.code} · {a.activity}</span><span className="font-bold text-[color:var(--color-navy)]">{n} →</span></div>)}
          </SectionCard>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <SectionCard title={`Upcoming Starts in ${CURRENT_FY}`} subtitle="planned starts in current fiscal year" icon="CalendarClock">
          {upcoming.length ? upcoming.map((a: any) => <div key={a.id} className="cursor-pointer border-b border-slate-50 py-1.5 text-[12.5px] last:border-0 hover:bg-slate-50" onClick={() => setSel(a)}><span className="font-semibold">{a.code}</span> · {a.activity} <span className="text-slate-400">({a.timeline.plannedStart})</span></div>) : <p className="text-sm text-slate-400">No activities start in {CURRENT_FY} under current filters.</p>}
        </SectionCard>
        <SectionCard title="Maritime Locations Preview" subtitle="configured project nodes" icon="MapPin">
          <div className="flex flex-wrap gap-1.5">
            {msLocations.map((l) => <span key={l.name} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{l.name}</span>)}
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Source: {MS.sourceSystems[0]["Source System"]} · {MS.metadata.dataNature}. Operational progress not connected.</p>
        </SectionCard>
      </div>
    </div>
  );
}

/* ---------------- ROADMAP (Gantt) ---------------- */
function Roadmap({ filtered, setSel }: any) {
  const N = FY_LIST.length;
  const ROADMAP_CURRENT_FY = "FY28";
  const curIdx = FY_LIST.indexOf(ROADMAP_CURRENT_FY);
  const currentLineLeft = ((curIdx + 0.5) / N) * 100;
  const stages = ["Stage 1", "Stage 2", "Stage 3"];
  const statusFor = (a: any) => {
    const [s, e] = activityRange(a);
    if (s > curIdx) return { key: "upcoming", label: "Upcoming", color: "#64748b", icon: "Clock" };
    if (e < curIdx) return { key: "elapsed", label: "Planned-complete", color: "#16a34a", icon: "CircleCheck" };
    if (e === curIdx) return { key: "due", label: "Due in FY28", color: "#1aa6c9", icon: "AlarmClock" };
    return { key: "active", label: "Active", color: "#f59e0b", icon: "LoaderCircle" };
  };
  const progressFor = (a: any) => {
    const [s, e] = activityRange(a);
    if (curIdx < s) return 0;
    if (curIdx >= e) return 100;
    return Math.round(((curIdx - s + 1) / (e - s + 1)) * 100);
  };
  const counts = filtered.reduce((acc: Record<string, number>, a: any) => {
    const ss = statusFor(a);
    acc[ss.key] = (acc[ss.key] || 0) + 1;
    return acc;
  }, {});

  return (
    <SectionCard title="Implementation Roadmap Gantt (FY26-FY36)" subtitle="planned duration, FY28 progress shading and current-year marker · click an activity" icon="GanttChartSquare" expandable>
      <div className="mb-4 grid gap-2 sm:grid-cols-4">
        {[
          ["Active in FY28", counts.active || 0, "#f59e0b", "LoaderCircle"],
          ["Due in FY28", counts.due || 0, "#1aa6c9", "AlarmClock"],
          ["Planned Complete", counts.elapsed || 0, "#16a34a", "CircleCheck"],
          ["Upcoming", counts.upcoming || 0, "#64748b", "Clock"],
        ].map(([label, value, color, icon]) => (
          <div key={String(label)} className="rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-black uppercase tracking-wide text-slate-400">{label}</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: String(color) }}><Icon name={String(icon)} size={16} /></span>
            </div>
            <div className="display mt-1 text-2xl font-black text-[color:var(--color-navy)]">{String(value)}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[1220px]">
          <div className="sticky top-0 z-10 flex rounded-t-xl border border-slate-200 bg-white pb-1 pt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            <div className="w-[300px] shrink-0 px-3">Activity</div>
            <div className="relative grid flex-1" style={{ gridTemplateColumns: `repeat(${N},1fr)` }}>
              <div className="absolute bottom-0 top-0 w-[2px] rounded-full bg-amber-500" style={{ left: `${currentLineLeft}%` }} />
              {FY_LIST.map((fy, i) => <div key={fy} className={`px-1 text-center ${i === curIdx ? "rounded bg-amber-100 text-amber-700" : ""}`}>{fy}</div>)}
            </div>
            <div className="w-[190px] shrink-0 px-3 text-right">Progress / Status</div>
          </div>
          {stages.map((st) => {
            const rows = filtered.filter((a: any) => a.stage === st);
            if (!rows.length) return null;
            return (
              <div key={st}>
                <div className="mt-2 rounded-lg bg-slate-100 px-3 py-2 text-[12px] font-extrabold text-[color:var(--color-navy)]">{st}</div>
                {rows.map((a: any) => {
                  const [s, e] = activityRange(a);
                  const left = (s / N) * 100;
                  const width = ((e - s + 1) / N) * 100;
                  const c = CAT_COLOR[a.category];
                  const ss = statusFor(a);
                  const progress = progressFor(a);
                  return (
                    <div key={a.id} className="flex cursor-pointer items-center border-b border-slate-100 py-2 hover:bg-blue-50/50" onClick={() => setSel(a)}>
                      <div className="flex w-[300px] shrink-0 items-center gap-2 px-3">
                        <span className="grid h-7 w-12 shrink-0 place-items-center rounded-lg text-[10px] font-black text-white" style={{ background: c }}>{a.code.replace("MS-", "")}</span>
                        <div className="min-w-0">
                          <div className="truncate text-[12px] font-extrabold text-slate-800">{a.activity}</div>
                          <div className="truncate text-[10px] font-semibold text-slate-400">{a.timeline.plannedStart} to {a.timeline.plannedEnd} · {inr(a.funding.totalCr)}</div>
                        </div>
                      </div>
                      <div className="relative h-9 flex-1">
                        <div className="absolute inset-0 grid rounded-lg bg-slate-50" style={{ gridTemplateColumns: `repeat(${N},1fr)` }}>
                          {FY_LIST.map((fy, i) => <div key={fy} className={`border-l border-white ${i === curIdx ? "bg-amber-50/90" : ""}`} />)}
                        </div>
                        <div className="absolute bottom-0 top-0 w-[2px] rounded-full bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,.16)]" style={{ left: `${currentLineLeft}%` }} />
                        <div className="absolute top-1/2 overflow-hidden rounded-xl border border-white/90 bg-white shadow-[0_5px_16px_rgba(15,45,92,.14)]" style={{ left: `${left}%`, width: `${width}%`, height: 22, transform: "translateY(-50%)" }} title={`${a.timeline.plannedStart} to ${a.timeline.plannedEnd} · ${progress}% shaded by FY28`}>
                          <div className="h-full rounded-xl opacity-25" style={{ background: c }} />
                          <div className="absolute inset-y-0 left-0 rounded-xl" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${c}, ${ss.color})` }} />
                          <div className="absolute inset-0 flex items-center justify-center px-2 text-[9px] font-black text-white drop-shadow">{progress}%</div>
                        </div>
                      </div>
                      <div className="flex w-[190px] shrink-0 items-center justify-end gap-2 px-3">
                        <span className="font-black text-[color:var(--color-navy)]">{progress}%</span>
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold" style={{ background: `${ss.color}1a`, color: ss.color }}><Icon name={ss.icon} size={11} /> {ss.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="mt-3 space-y-1.5 px-2 text-[11px]">
            <div className="flex flex-wrap items-center gap-3"><span className="font-bold text-slate-400">Category:</span>{Object.entries(CAT_COLOR).map(([k, c]) => <span key={k} className="flex items-center gap-1.5 text-slate-600"><span className="h-2.5 w-4 rounded-full" style={{ background: c }} />{k}</span>)}</div>
            <div className="flex flex-wrap items-center gap-3"><span className="font-bold text-slate-400">Status vs plan:</span>{SCHED_LEGEND.map((l) => <span key={l.label} className="flex items-center gap-1.5 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />{l.label === "Due this FY" ? "Due in FY28" : l.label}</span>)}</div>
            <p className="text-slate-400">Roadmap assumes the current year is 2028 ({ROADMAP_CURRENT_FY}). Shading indicates planned elapsed progress by FY28; operational progress/delays are not connected.</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ---------------- ACTIVITIES ---------------- */
function Activities({ filtered, setSel, showToast }: any) {
  const [sort, setSort] = useState<{ k: string; dir: 1 | -1 }>({ k: "id", dir: 1 });
  const rows = [...filtered].sort((a, b) => {
    const get = (x: any) => sort.k === "total" ? x.funding.totalCr : sort.k === "activity" ? x.activity : x.id;
    return (get(a) > get(b) ? 1 : -1) * sort.dir;
  });
  const th = (k: string, label: string) => <th onClick={() => setSort((s) => ({ k, dir: s.k === k ? (s.dir * -1) as 1 : 1 }))} className="cursor-pointer px-2 py-2 font-semibold hover:text-[color:var(--color-navy)]">{label}{sort.k === k ? (sort.dir === 1 ? " ▲" : " ▼") : ""}</th>;
  return (
    <SectionCard title="Activity Register" subtitle={`${rows.length} of 33 · click a row for full detail`} icon="ListChecks" expandable
      right={<button onClick={() => { downloadCSV("mission-samudra-activities.csv", activitiesCSV(rows)); showToast("CSV exported"); }} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold hover:bg-slate-200">Export CSV</button>}>
      {/* mobile cards */}
      <div className="space-y-2 md:hidden">
        {rows.map((a: any) => (
          <button key={a.id} onClick={() => setSel(a)} className="block w-full rounded-xl border border-slate-100 p-2.5 text-left">
            <div className="flex items-center justify-between"><span className="text-[12.5px] font-bold">{a.code} · {a.activity}</span><RagBadge rag="blue" label={a.stage.replace("Stage ", "S")} /></div>
            <div className="text-[11px] text-slate-400">{a.category} · {a.activityType} · {a.timeline.plannedStart}→{a.timeline.plannedEnd} · {inr(a.funding.totalCr)}</div>
          </button>
        ))}
      </div>
      {/* desktop table */}
      <div className="hidden overflow-x-auto scrollbar-thin md:block">
        <table className="w-full min-w-[1100px] text-left text-[12px]">
          <thead><tr className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400">{th("id", "Code")}{th("activity", "Activity")}<th className="px-2 py-2">Stage</th><th className="px-2 py-2">Category</th><th className="px-2 py-2">Type</th><th className="px-2 py-2">Start</th><th className="px-2 py-2">End</th><th className="px-2 py-2">Dep</th><th className="px-2 py-2">GoK Agency</th><th className="px-2 py-2">Private</th>{th("total", "Total")}<th className="px-2 py-2">Instrument</th></tr></thead>
          <tbody>
            {rows.map((a: any) => (
              <tr key={a.id} className="cursor-pointer border-b border-slate-50 hover:bg-blue-50/40" onClick={() => setSel(a)}>
                <td className="px-2 py-1.5 font-bold text-[color:var(--color-navy)]">{a.code}</td>
                <td className="px-2 py-1.5 font-semibold">{a.activity}</td>
                <td className="px-2 py-1.5">{a.stage}</td>
                <td className="px-2 py-1.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: CAT_COLOR[a.category] }}>{a.category.split(" ")[0]}</span></td>
                <td className="px-2 py-1.5">{a.activityType}</td>
                <td className="px-2 py-1.5">{a.timeline.plannedStart}</td>
                <td className="px-2 py-1.5">{a.timeline.plannedEnd}</td>
                <td className="px-2 py-1.5 text-slate-400">{(a.dependencies || []).join(",") || "—"}</td>
                <td className="max-w-[180px] truncate px-2 py-1.5 text-slate-500">{a.governmentOfKerala.agency}</td>
                <td className="max-w-[140px] truncate px-2 py-1.5 text-slate-500">{a.privateSector.entity}</td>
                <td className="px-2 py-1.5 font-bold">{a.funding.totalCr.toLocaleString("en-IN")}</td>
                <td className="max-w-[200px] truncate px-2 py-1.5 text-slate-400">{a.funding.financialInstrument}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

/* ---------------- INVESTMENT ---------------- */
function Investment({ filtered }: any) {
  const fundComp = [
    { label: "Private", value: MS.headline.private_investment_cr, color: FUND_COLOR.Private },
    { label: "Govt of Kerala", value: MS.headline.gok_investment_cr, color: FUND_COLOR.GoK },
    { label: "Govt of India", value: MS.headline.goi_investment_cr, color: FUND_COLOR.GoI },
  ];
  const annual = MS.annualInvestment.map((y: any) => ({ label: y.fiscalYear, Private: y.privateCr, GoK: y.gokCr, GoI: y.goiCr }));
  const leverage = MS.stageSummary.map((s: any) => ({ label: s.stage, value: s.privateSharePercent }));
  const instr: Record<string, number> = {};
  filtered.forEach((a: any) => { const key = (a.funding.financialInstrument || "—").split(";")[0].split("(")[0].trim().slice(0, 26); instr[key] = (instr[key] || 0) + 1; });
  const v = validate();
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Funding-source Composition" icon="PieChart" expandable><Donut data={fundComp} height={170} label={inr(MS.headline.total_investment_cr).replace(" Cr", "")} /><Legend data={fundComp.map((c) => ({ label: c.label, value: pct(c.value, MS.headline.total_investment_cr), color: c.color }))} /></SectionCard>
        <SectionCard title="Annual Stacked (FY26–35)" icon="BarChart3" expandable className="lg:col-span-2"><StackedBars data={annual} keys={["Private", "GoK", "GoI"]} colors={[FUND_COLOR.Private, FUND_COLOR.GoK, FUND_COLOR.GoI]} height={200} /></SectionCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Stage-wise Funding Matrix" subtitle="₹ Cr" icon="Grid3x3" expandable>
          <table className="w-full text-left text-[12.5px]"><thead><tr className="border-b border-slate-100 text-[10.5px] uppercase tracking-wide text-slate-400"><th className="px-2 py-1.5">Stage</th><th className="text-right">Private</th><th className="text-right">GoK</th><th className="text-right">GoI</th><th className="text-right">Total</th></tr></thead>
            <tbody>{MS.stageSummary.map((s: any) => <tr key={s.stage} className="border-b border-slate-50"><td className="px-2 py-1.5 font-semibold">{s.stage}</td><td className="py-1.5 text-right">{s.privateCr.toLocaleString("en-IN")}</td><td className="py-1.5 text-right">{s.gokCr.toLocaleString("en-IN")}</td><td className="py-1.5 text-right">{s.goiCr.toLocaleString("en-IN")}</td><td className="py-1.5 text-right font-bold">{s.totalCr.toLocaleString("en-IN")}</td></tr>)}</tbody></table>
        </SectionCard>
        <SectionCard title="Category-wise Funding Matrix" subtitle="₹ Cr" icon="Grid3x3" expandable>
          <table className="w-full text-left text-[12.5px]"><thead><tr className="border-b border-slate-100 text-[10.5px] uppercase tracking-wide text-slate-400"><th className="px-2 py-1.5">Category</th><th className="text-right">Private</th><th className="text-right">GoK</th><th className="text-right">GoI</th><th className="text-right">Total</th></tr></thead>
            <tbody>{MS.categorySummary.map((c: any) => <tr key={c.category} className="border-b border-slate-50"><td className="px-2 py-1.5 font-semibold">{c.category}</td><td className="py-1.5 text-right">{c.privateCr.toLocaleString("en-IN")}</td><td className="py-1.5 text-right">{c.gokCr.toLocaleString("en-IN")}</td><td className="py-1.5 text-right">{c.goiCr.toLocaleString("en-IN")}</td><td className="py-1.5 text-right font-bold">{c.totalCr.toLocaleString("en-IN")}</td></tr>)}</tbody></table>
        </SectionCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <SectionCard title="Private Leverage by Stage" subtitle="private %" icon="TrendingUp" expandable><Bars data={leverage} color={FUND_COLOR.Private} height={200} /></SectionCard>
        <SectionCard title="Financing Instruments" subtitle="activity count by instrument (filtered)" icon="Landmark" expandable><Bars data={Object.entries(instr).map(([label, value]) => ({ label, value }))} color="var(--color-c-teal)" height={200} horizontal /></SectionCard>
      </div>
      <SectionCard title="Reconciliation" subtitle="Private + GoK + GoI = Total" icon="CheckCircle">
        <div className="flex flex-wrap items-center gap-3 text-[13px]">
          <span className="font-bold">{inr(v.priv)}</span><span>+</span><span className="font-bold">{inr(v.gok)}</span><span>+</span><span className="font-bold">{inr(v.goi)}</span><span>=</span><span className="font-black text-[color:var(--color-navy)]">{inr(v.total)}</span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${v.reconciled && v.totalOk ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{v.reconciled && v.totalOk ? "Reconciled ✓" : "Mismatch"}</span>
        </div>
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[12px] text-amber-700">Spent / released / utilised / variance are not provided by the planning workbook — shown as “Data not connected”.</p>
      </SectionCard>
    </div>
  );
}

/* ---------------- CLUSTERS ---------------- */
function Clusters() {
  const { openDrawer } = useUI();
  const [view, setView] = useState<"map" | "list">("map");
  const [type, setType] = useState<string>("all");
  const [selLoc, setSelLoc] = useState(msLocations[0]);
  const intensity = districtIntensity();
  const locs = msLocations.filter((l) => type === "all" || l.type === type);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1">{["map", "list"].map((vv) => <button key={vv} onClick={() => setView(vv as any)} className={`rounded-lg px-3 py-1.5 text-[12px] font-bold capitalize ${view === vv ? "bg-[color:var(--color-navy)] text-white" : "bg-slate-100 text-slate-500"}`}>{vv}</button>)}</div>
        <div className="flex gap-1">{["all", "Major Port", "Minor Port", "Cluster", "Corridor"].map((t) => <button key={t} onClick={() => setType(t)} className={`rounded-lg px-2.5 py-1.5 text-[11.5px] font-bold ${type === t ? "bg-[color:var(--color-c-teal)] text-white" : "bg-slate-100 text-slate-500"}`}>{t}</button>)}</div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <SectionCard title="Kerala Maritime Map" subtitle="associated activities by district" icon="Map" expandable>
          {view === "map"
            ? <KeralaMap values={intensity} height={360} unit="activities" onSelect={(d) => openDrawer({ title: `${d} · Mission Samudra nodes`, rag: "blue", source: "UI location config", updated: MS.metadata.generatedOn, confidence: 70, achieved: `${intensity[d] || 0} associated activities`, action: "Location mapping is UI configuration, not source coordinates." })} />
            : <div className="space-y-1.5">{locs.map((l) => <button key={l.name} onClick={() => setSelLoc(l)} className="flex w-full items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-left text-[12.5px] hover:bg-slate-50"><span className="font-semibold">{l.name}</span><span className="text-[11px] text-slate-400">{l.district} · {l.type}</span></button>)}</div>}
        </SectionCard>
        <SectionCard title="Location Summary" subtitle={selLoc.name} icon="MapPin">
          <div className="mb-2 flex items-center gap-2"><RagBadge rag="blue" label={selLoc.type} /><span className="text-[12px] text-slate-500">{selLoc.district}</span>{selLoc.activityIds.length === 0 && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Location mapping pending</span>}</div>
          <div className="mb-2 flex flex-wrap gap-1.5">{["all", "Major Port", "Minor Port", "Cluster", "Corridor", "Policy"].slice(0, 0)}</div>
          <div className="text-[12px] text-slate-500">Associated activities: <b>{selLoc.activityIds.length}</b> · Planned investment: <b>{inr(selLoc.activityIds.reduce((s, id) => s + (byId(id)?.funding.totalCr || 0), 0))}</b></div>
          <div className="mt-2 max-h-60 space-y-1 overflow-y-auto scrollbar-thin">
            {selLoc.activityIds.map((id) => { const a = byId(id); return a ? <div key={id} className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[12px]"><span className="font-semibold">{a.code}</span> · {a.activity} <span className="text-slate-400">· {inr(a.funding.totalCr)}</span></div> : null; })}
            {selLoc.activityIds.length === 0 && <p className="text-[12px] text-slate-400">No activities mapped to this node yet.</p>}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

/* ---------------- DEPENDENCIES ---------------- */
function Dependencies({ setSel }: any) {
  const { succ, pred } = buildDeps();
  const [focus, setFocus] = useState<number>(13);
  const exposure = [...acts].map((a) => ({ a, n: (succ[a.id] || []).length })).filter((x) => x.n > 0).sort((x, y) => y.n - x.n);
  const fa = byId(focus);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <SectionCard title="Dependency Exposure Ranking" subtitle="downstream activities enabled" icon="GitBranch" expandable>
          {exposure.map(({ a, n }) => <button key={a.id} onClick={() => setFocus(a.id)} className={`flex w-full items-center justify-between border-b border-slate-50 py-1.5 text-left text-[12px] last:border-0 hover:bg-slate-50 ${focus === a.id ? "bg-blue-50/60" : ""}`}><span className="truncate text-slate-600">{a.code} · {a.activity}</span><span className="font-bold text-[color:var(--color-navy)]">{n} →</span></button>)}
        </SectionCard>
        <SectionCard title="Focus Mode" subtitle={fa ? `${fa.code} · ${fa.activity}` : ""} icon="Crosshair" expandable>
          <div className="grid grid-cols-3 gap-2 text-[11.5px]">
            <Col title="Predecessors" items={(pred[focus] || []).map(byId)} onClick={setSel} color="#94a3b8" />
            <div className="flex flex-col items-center justify-center rounded-xl p-2 text-center text-white" style={{ background: CAT_COLOR[fa?.category] }}><div className="text-[11px] font-black">{fa?.code}</div><div className="text-[10px]">{fa?.activity}</div></div>
            <Col title="Successors" items={(succ[focus] || []).map(byId)} onClick={setSel} color="var(--color-c-teal)" />
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Root Enablers" subtitle="activities with no predecessors" icon="Anchor">
        <div className="flex flex-wrap gap-1.5">{MS.dependencies.rootActivityIds.map((id: number) => { const a = byId(id); return a ? <button key={id} onClick={() => setSel(a)} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-200">{a.code} · {a.activity}</button> : null; })}</div>
      </SectionCard>
      <SectionCard title="Dependency Edges" subtitle={`${MS.dependencies.edgeCount} edges · all reference valid IDs`} icon="Workflow" expandable>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">{MS.dependencies.edges.map((e: any, i: number) => <div key={i} className="rounded-lg bg-slate-50 px-2 py-1 text-[11px]"><b>{byId(e.fromActivityId)?.code}</b> → {byId(e.toActivityId)?.code}</div>)}</div>
        <p className="mt-2 text-[11px] text-slate-400">Term used: <b>Dependency Exposure</b> (not critical path — no scheduling duration logic applied).</p>
      </SectionCard>
    </div>
  );
}
function Col({ title, items, onClick, color }: any) {
  return <div className="rounded-xl border border-slate-100 p-2"><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">{title}</div>{items.length ? items.map((a: any) => a ? <button key={a.id} onClick={() => onClick(a)} className="mb-1 block w-full truncate rounded px-1.5 py-1 text-left hover:bg-slate-50" style={{ color }}>{a.code} · {a.activity}</button> : null) : <span className="text-[11px] text-slate-300">none</span>}</div>;
}

/* ---------------- AGENCIES & SCHEMES ---------------- */
function Ecosystem() {
  const [sub, setSub] = useState<"agencies" | "schemes">("agencies");
  const [q, setQ] = useState("");
  return (
    <div className="space-y-3">
      <div className="flex gap-1">{["agencies", "schemes"].map((s) => <button key={s} onClick={() => setSub(s as any)} className={`rounded-lg px-3 py-1.5 text-[12.5px] font-bold capitalize ${sub === s ? "bg-[color:var(--color-navy)] text-white" : "bg-slate-100 text-slate-500"}`}>{s}</button>)}
        <div className="ml-auto flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5"><Icon name="Search" size={13} className="text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-36 text-[12px] outline-none" /></div>
      </div>
      {sub === "agencies" ? (
        <SectionCard title={`Agencies (${MS.agencies.length})`} subtitle="level · roles · linked activities · planned exposure" icon="Building2" expandable>
          <div className="overflow-x-auto scrollbar-thin"><table className="w-full min-w-[680px] text-left text-[12px]"><thead><tr className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400"><th className="px-2 py-2">Level</th><th>Agency / Entity</th><th>Roles</th><th className="text-right">Activities</th><th className="text-right">Exposure ₹Cr</th></tr></thead>
            <tbody>{MS.agencies.filter((a: any) => a.name.toLowerCase().includes(q.toLowerCase())).sort((a: any, b: any) => b.plannedInvestmentExposureCr - a.plannedInvestmentExposureCr).map((a: any, i: number) => (
              <tr key={i} className="border-b border-slate-50"><td className="px-2 py-1.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: a.level === "Private" ? FUND_COLOR.Private : a.level === "GoK" ? FUND_COLOR.GoK : FUND_COLOR.GoI }}>{a.level}</span></td><td className="px-2 py-1.5 font-semibold">{a.name}</td><td className="max-w-[260px] truncate px-2 py-1.5 text-slate-500">{a.roles.join(", ")}</td><td className="px-2 py-1.5 text-right font-bold">{a.activityCount}</td><td className="px-2 py-1.5 text-right">{a.plannedInvestmentExposureCr.toLocaleString("en-IN")}</td></tr>
            ))}</tbody></table></div>
          <p className="mt-2 text-[11px] text-slate-400">Planned-investment exposure = total of linked activities; not the same as an agency’s own contribution.</p>
        </SectionCard>
      ) : (
        <SectionCard title={`Schemes (${MS.schemes.length})`} subtitle="linked activities · stages · planned exposure" icon="Landmark" expandable>
          <div className="overflow-x-auto scrollbar-thin"><table className="w-full min-w-[680px] text-left text-[12px]"><thead><tr className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400"><th className="px-2 py-2">Scheme</th><th>Stages</th><th className="text-right">Activities</th><th className="text-right">Exposure ₹Cr</th></tr></thead>
            <tbody>{MS.schemes.filter((a: any) => a.name.toLowerCase().includes(q.toLowerCase())).sort((a: any, b: any) => b.plannedInvestmentExposureCr - a.plannedInvestmentExposureCr).map((a: any, i: number) => (
              <tr key={i} className="border-b border-slate-50"><td className="px-2 py-1.5 font-semibold">{a.name}</td><td className="px-2 py-1.5 text-slate-500">{a.stages.map((s: string) => s.replace("Stage ", "S")).join(", ")}</td><td className="px-2 py-1.5 text-right font-bold">{a.activityCount}</td><td className="px-2 py-1.5 text-right">{a.plannedInvestmentExposureCr.toLocaleString("en-IN")}</td></tr>
            ))}</tbody></table></div>
        </SectionCard>
      )}
    </div>
  );
}

/* ---------------- MANIFESTO ---------------- */
function Manifesto({ setSel }: any) {
  const [q, setQ] = useState("");
  const decls = MS.manifestoDeclarations.filter((d: any) => d.text.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2"><div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5"><Icon name="Search" size={13} className="text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search declarations…" className="w-48 text-[12px] outline-none" /></div><span className="text-[11.5px] text-slate-400">{decls.length} declarations</span></div>
      <div className="grid gap-3 md:grid-cols-2">
        {decls.map((d: any, i: number) => (
          <div key={i} className="card p-3.5">
            <div className="mb-1.5 flex items-center gap-2"><span className="rounded-md bg-[color:var(--color-ribbon)] px-2 py-0.5 text-[11px] font-black text-white">#{d.declarationNumbers.join(", #")}</span><span className="text-[11px] font-bold text-slate-400">{d.activityIds.length} activities · {inr(d.plannedInvestmentCr)}</span></div>
            <p className="text-[12.5px] leading-relaxed text-slate-700">{d.text}</p>
            <div className="mt-2 flex flex-wrap gap-1">{d.activityIds.map((id: number) => { const a = byId(id); return a ? <button key={id} onClick={() => setSel(a)} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 hover:bg-slate-200">{a.code}</button> : null; })}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- DATA QUALITY ---------------- */
function DataQuality({ v, role }: any) {
  const admin = /PMU Admin|Chief Minister|Chief Secretary/.test(role);
  if (!admin) return <SectionCard title="Data Source Note" icon="Database"><p className="text-[13px] text-slate-600">Mission Samudra figures are a <b>planning framework</b> from {MS.sourceSystems[0]["Source System"]} ({MS.metadata.dataNature}). Detailed data-quality validation is available to PMU Admin and Chief Secretary roles.</p></SectionCard>;
  const ok = (b: boolean) => <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${b ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{b ? "OK" : "REVIEW"}</span>;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DQ label="Activity count" value={`${v.count} / ${v.expectedCount}`} ok={v.count === v.expectedCount} />
        <DQ label="Duplicate IDs" value={v.dupes.length ? v.dupes.join(",") : "None"} ok={v.dupes.length === 0} />
        <DQ label="Dependency refs valid" value={v.badEdges.length ? `${v.badEdges.length} invalid` : "All valid"} ok={v.badEdges.length === 0} />
        <DQ label="Funding reconciles" value={v.reconciled ? "Yes" : "No"} ok={v.reconciled} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Funding Reconciliation" icon="CheckCircle">
          <Row label="Total" a={v.total} b={v.exp.total} ok={ok} /><Row label="Private" a={v.priv} b={v.exp.private} ok={ok} /><Row label="GoK" a={v.gok} b={v.exp.gok} ok={ok} /><Row label="GoI" a={v.goi} b={v.exp.goi} ok={ok} />
          <div className="mt-2 text-[11px] font-bold text-slate-400">Stage totals</div>
          {MS.stageSummary.map((s: any) => <Row key={s.stage} label={s.stage} a={v.stageSum[s.stage]} b={MS.validation.expectedStageTotalsCr[s.stage]} ok={ok} />)}
          <div className="mt-2 text-[11px] font-bold text-slate-400">Category totals</div>
          {MS.categorySummary.map((c: any) => <Row key={c.category} label={c.category} a={v.catSum[c.category]} b={MS.validation.expectedCategoryTotalsCr[c.category]} ok={ok} />)}
        </SectionCard>
        <div className="space-y-4">
          <SectionCard title="Operational Data Availability" icon="Activity">
            <p className="text-[12.5px] text-slate-600">Physical progress, financial progress, committed/released/spent, RAG, delay days and risk count are <b>not provided</b> by the planning workbook for any of the 33 activities.</p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-[12px] font-bold text-amber-700"><Icon name="Unplug" size={14} /> Data not connected</div>
          </SectionCard>
          <SectionCard title="Source System" icon="Server">
            {Object.entries(MS.sourceSystems[0]).map(([k, val]) => <div key={k} className="flex justify-between border-b border-slate-50 py-1 text-[12px] last:border-0"><span className="text-slate-500">{k}</span><span className="font-semibold">{String(val)}</span></div>)}
            <div className="mt-1.5 text-[11px] text-slate-400">Freshness & ingestion/audit: placeholder — not connected.</div>
          </SectionCard>
        </div>
      </div>
      <SectionCard title="Source Discrepancies (review items — not auto-corrected)" icon="TriangleAlert" expandable>
        <ul className="space-y-1.5">{MS.dataQualityWarnings.map((w: string, i: number) => <li key={i} className="flex gap-2 rounded-lg bg-amber-50 p-2.5 text-[12px] text-amber-800"><Icon name="AlertTriangle" size={14} className="mt-0.5 shrink-0" />{w}</li>)}</ul>
      </SectionCard>
    </div>
  );
}
function DQ({ label, value, ok }: any) {
  return <div className="card p-3"><div className="flex items-center justify-between"><span className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{label}</span><span className={`h-2.5 w-2.5 rounded-full ${ok ? "bg-emerald-500" : "bg-rose-500"}`} /></div><div className="mt-1 text-[13px] font-bold">{value}</div></div>;
}
function Row({ label, a, b, ok }: any) {
  return <div className="flex items-center justify-between border-b border-slate-50 py-1 text-[12px] last:border-0"><span className="truncate text-slate-600">{label}</span><span className="flex items-center gap-2"><span className="tabular-nums">{(a || 0).toLocaleString("en-IN")} / {(b || 0).toLocaleString("en-IN")}</span>{ok(a === b)}</span></div>;
}

/* ---------------- ACTIVITY DRAWER ---------------- */
function ActivityDrawer({ a, onClose, setSel, openTicket }: any) {
  const { succ, pred } = a ? buildDeps() : { succ: {}, pred: {} } as any;
  return (
    <AnimatePresence>
      {a && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[1100] bg-black/45 backdrop-blur-[2px]" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 30 }} className="fixed right-0 top-0 z-[1101] flex h-full w-full max-w-[520px] flex-col bg-[color:var(--color-app)] shadow-2xl">
            <div className="flex items-start justify-between gap-3 p-5 text-white" style={{ background: CAT_COLOR[a.category] }}>
              <div>
                <div className="mb-1 flex items-center gap-2"><span className="rounded bg-white/20 px-2 py-0.5 text-[11px] font-black">{a.code}</span><span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">{a.stage} · {a.activityType}</span></div>
                <h2 className="text-lg font-black leading-tight">{a.activity}</h2>
                <p className="mt-1 text-xs text-white/80">{a.category} · {a.stagePeriod} · {a.stageTheme}</p>
              </div>
              <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/10"><Icon name="X" size={20} /></button>
            </div>
            <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto p-5 text-[12.5px]">
              <Block title="Manifesto Declaration"><p className="leading-relaxed text-slate-700">{a.manifestoDeclaration}</p></Block>
              <Block title="Planned Timeline">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-4"><KV k="Start" v={a.timeline.plannedStart} /><KV k="End" v={a.timeline.plannedEnd} /></div>
                  {(() => { const ss = scheduleStatus(a); return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: `${ss.color}1a`, color: ss.color }}><Icon name={ss.icon} size={12} /> {ss.label}</span>; })()}
                </div>
                <p className="mt-1 text-[10.5px] text-slate-400">Status reflects position vs the planned timeline — operational progress is not connected.</p>
              </Block>
              <Block title="Funding (₹ Cr)">
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[["Total", a.funding.totalCr], ["Private", a.funding.privateCr], ["GoK", a.funding.gokCr], ["GoI", a.funding.goiCr]].map(([k, val]) => <div key={k} className="rounded-lg bg-white p-2"><div className="text-[13px] font-black text-[color:var(--color-navy)]">{Number(val).toLocaleString("en-IN")}</div><div className="text-[9px] uppercase text-slate-400">{k}</div></div>)}
                </div>
                <div className="mt-2 text-[11.5px] text-slate-500">Financing expectation (Pvt:GoK:GoI): <b>{a.funding.financingExpectation}</b></div>
                <div className="text-[11.5px] text-slate-500">Instrument: <b>{a.funding.financialInstrument}</b></div>
              </Block>
              <Block title="Government of India"><KV k="Agency" v={a.governmentOfIndia.agency} /><KV k="Role" v={a.governmentOfIndia.role} /><div className="mt-1 flex flex-wrap gap-1">{a.governmentOfIndia.schemes.map((s: string) => <span key={s} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10.5px] font-semibold text-slate-600">{s}</span>)}</div></Block>
              <Block title="Government of Kerala"><KV k="Agency" v={a.governmentOfKerala.agency} /><KV k="Role" v={a.governmentOfKerala.role} /></Block>
              <Block title="Private Sector"><KV k="Entity" v={a.privateSector.entity} /><KV k="Role" v={a.privateSector.role} /></Block>
              <div className="grid grid-cols-2 gap-3">
                <Block title="Predecessors">{(pred[a.id] || []).length ? (pred[a.id]).map((id: number) => <button key={id} onClick={() => setSel(byId(id))} className="mb-1 block text-left text-[11.5px] font-semibold text-[color:var(--color-navy)] hover:underline">{byId(id)?.code} · {byId(id)?.activity}</button>) : <span className="text-[11.5px] text-slate-400">None (root enabler)</span>}</Block>
                <Block title="Successors">{(succ[a.id] || []).length ? (succ[a.id]).map((id: number) => <button key={id} onClick={() => setSel(byId(id))} className="mb-1 block text-left text-[11.5px] font-semibold text-[color:var(--color-c-teal)] hover:underline">{byId(id)?.code} · {byId(id)?.activity}</button>) : <span className="text-[11.5px] text-slate-400">None</span>}</Block>
              </div>
              <Block title="Stakeholders"><div className="flex flex-wrap gap-1">{a.stakeholders.map((s: string) => <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-600">{s}</span>)}</div></Block>
              <Block title="Operational Metrics"><div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-[12px] font-bold text-amber-700"><Icon name="Unplug" size={13} /> Data not connected</div><p className="mt-1 text-[11px] text-slate-400">{a.operationalMetrics.note}</p></Block>
              <Block title="Source & Validation"><p className="text-[11.5px] text-slate-500">Source: {MS.sourceSystems[0]["Source System"]} · {MS.metadata.dataNature} · generated {MS.metadata.generatedOn}. Funding split reconciles to total.</p></Block>
            </div>
            <div className="border-t border-slate-200 bg-white p-3">
              <button onClick={() => openTicket({ itemType: "Mission Samudra Activity", itemName: `${a.code} · ${a.activity}`, rag: "blue", secretary: "Industries Secretary" })} className="w-full rounded-xl bg-[color:var(--color-ribbon)] px-3 py-2.5 text-[12.5px] font-bold text-white hover:opacity-90">Create Review Ticket</button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
function Block({ title, children }: any) { return <div className="card p-3"><div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{title}</div>{children}</div>; }
function KV({ k, v }: any) { return <div className="text-[12px]"><span className="text-slate-400">{k}: </span><span className="font-semibold text-slate-700">{v}</span></div>; }
