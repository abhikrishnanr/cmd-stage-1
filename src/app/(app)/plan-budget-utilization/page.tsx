"use client";

import { useState } from "react";
import { ArrowUpRight, Building2, CalendarDays, ChartNoAxesCombined, IndianRupee, Layers3 } from "lucide-react";
import { ProvenanceStrip, ProvenanceTooltip, type DataProvenance } from "@/components/DataProvenance";
import { SectionCard } from "@/components/primitives";
import snapshot from "@/data/planspaceSnapshot.json";

const report = snapshot.yearwise_monthwise.find((year) => year.is_current)!;
const latest = report.months.at(-1)!;
const generated = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(snapshot.generated_at));
const source: DataProvenance = {
  source: "PlanSpace 2.0 · Kerala State Planning Board",
  dataset: "CM Dashboard staging export",
  url: "https://www.planspace.kerala.gov.in/index",
  basis: "Reported plan expenditure and plan outlay",
  period: `FY ${report.fin_year} through ${latest.month_name}`,
  sourceUpdatedAt: `${generated} IST (export generated)`,
};

const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const crore = (value: number) => `₹${decimal.format(value)} cr`;
const percent = (value: number) => `${decimal.format(value)}%`;

const total = snapshot.sector_wise.reduce((sum, row) => ({ outlay: sum.outlay + row.tot_outlay, expenditure: sum.expenditure + row.tot_expense }), { outlay: 0, expenditure: 0 });
const funding = [
  { name: "State plan excluding LSGIs", outlay: snapshot.at_a_glance.state_outlay, expenditure: snapshot.at_a_glance.state_expenditure, utilisation: snapshot.at_a_glance.state_perc, color: "#156aa7" },
  { name: "Central share of CSS", outlay: snapshot.at_a_glance.css_outlay, expenditure: snapshot.at_a_glance.css_expenditure, utilisation: snapshot.at_a_glance.css_perc, color: "#7553ad" },
  { name: "Local government plan", outlay: snapshot.at_a_glance.lsgi_outlay, expenditure: snapshot.at_a_glance.lsgi_expenditure, utilisation: snapshot.at_a_glance.lsgi_perc, color: "#0e8877" },
];

const history = snapshot.yearwise_monthwise.map((year) => {
  const month = year.months.find((entry) => entry.fy_order === latest.fy_order);
  return month ? { year: year.fin_year, utilisation: month.overall_perc } : null;
}).filter((year) => year !== null);

export default function PlanBudgetUtilizationPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"sector" | "department">("sector");
  const spending = view === "sector"
    ? snapshot.sector_wise.map((row) => ({ id: row.sector_id, name: row.sector_name, outlay: row.tot_outlay, expenditure: row.tot_expense, utilisation: row.tot_perc }))
    : snapshot.department_wise.map((row) => ({ id: row.secretary_id, name: row.secretary_name, outlay: row.tot_outlay, expenditure: row.tot_expense, utilisation: row.tot_perc }));
  const rows = spending.filter((row) => row.name.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => b.expenditure - a.expenditure);

  return (
    <main className="space-y-5 pb-3">
      <header className="overflow-hidden rounded-[1.5rem] bg-[radial-gradient(ellipse_at_top_right,#167972,transparent_55%),linear-gradient(115deg,#14244e,#244681)] p-5 text-white sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold text-emerald-100"><CalendarDays size={15} aria-hidden="true" /> {source.period}</p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl">Plan Budget Utilisation</h1>
            <p className="mt-2 text-sm text-white/80">Plan outlay, expenditure and funding channels reported by PlanSpace.</p>
          </div>
          <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-2 text-xs font-bold hover:bg-white/10">Open PlanSpace <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <ProvenanceStrip items={[source]} inverted className="mt-5" />
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Reported plan expenditure", value: crore(total.expenditure), icon: IndianRupee, accent: "#176768", caption: "Sum of the 12 PlanSpace sectors" },
          { label: "Plan outlay", value: crore(total.outlay), icon: Layers3, accent: "#365999", caption: "Budget allocation" },
          { label: "Overall utilisation", value: percent(latest.overall_perc), icon: ChartNoAxesCombined, accent: "#6f4b9c", caption: `${latest.month_name} cumulative utilisation` },
        ].map(({ label, value, icon: Icon, accent, caption }) => (
          <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4" style={{ borderTop: `3px solid ${accent}` }}>
            <div className="flex items-start justify-between gap-2"><Icon size={19} style={{ color: accent }} aria-hidden="true" /><ProvenanceTooltip provenance={source} /></div>
            <h2 className="mt-2 text-xs font-bold text-slate-600">{label}</h2>
            <p className="mt-1 text-2xl font-extrabold tabular-nums" style={{ color: accent }}>{value}</p>
            <p className="mt-2 text-xs text-slate-600">{caption}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Funding channels" icon="Landmark" provenance={source}>
          <div className="space-y-3">
            {funding.map((row) => (
              <article key={row.name} className="rounded-xl border border-slate-100 bg-white p-3">
                <div className="flex flex-wrap justify-between gap-2 text-sm font-bold text-slate-800"><h4>{row.name}</h4><strong style={{ color: row.color }}>{percent(row.utilisation)}</strong></div>
                <div className="my-2 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true"><div className="h-full rounded-full" style={{ background: row.color, width: `${Math.min(row.utilisation, 100)}%` }} /></div>
                <p className="text-xs text-slate-600">{crore(row.expenditure)} spent · {crore(row.outlay)} outlay</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Utilisation across financial years" subtitle={`Cumulative ${latest.month_name} figures`} icon="ChartNoAxesCombined" provenance={source}>
          <ul aria-label={`Historical ${latest.month_name} utilisation`} className="space-y-3 py-2">
            {history.map((entry) => (
              <li key={entry.year} className="grid grid-cols-[4.8rem_1fr_4rem] items-center gap-3 text-xs tabular-nums text-slate-700">
                <span>{entry.year}</span><div className="h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true"><div className="h-full rounded-full" style={{ background: entry.year === report.fin_year ? "#0e8877" : "#526da8", width: `${Math.min(entry.utilisation, 100)}%` }} /></div><strong className="text-right">{percent(entry.utilisation)}</strong>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-600">The FY {report.fin_year} figure is from the export generated on {generated} IST.</p>
          <div className="mt-4 border-t border-slate-100 pt-3">
            <h4 className="mb-2 text-sm font-bold text-slate-800">Monthly utilisation in FY {report.fin_year}</h4>
            <ul className="flex flex-wrap gap-2" aria-label="Reported monthly cumulative utilisation">
              {report.months.map((month) => <li key={month.fy_order} className="rounded-lg bg-slate-100 px-2 py-1.5 text-xs text-slate-700">{month.month_name.slice(0, 3)} <strong>{percent(month.overall_perc)}</strong></li>)}
            </ul>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Breakdown of plan spending" icon="Table2" provenance={source}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1" role="group" aria-label="Spending grouping">
            <button type="button" onClick={() => { setView("sector"); setQuery(""); }} aria-pressed={view === "sector"} className={`rounded-md px-3 py-1.5 text-xs font-bold ${view === "sector" ? "bg-white text-blue-800 shadow" : "text-slate-600"}`}>Sectors</button>
            <button type="button" onClick={() => { setView("department"); setQuery(""); }} aria-pressed={view === "department"} className={`rounded-md px-3 py-1.5 text-xs font-bold ${view === "department" ? "bg-white text-blue-800 shadow" : "text-slate-600"}`}><Building2 size={13} className="mr-1 inline" aria-hidden="true" />Departments</button>
          </div>
          <input type="search" aria-label={`Filter ${view}s`} placeholder={`Filter ${view}s`} value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs sm:w-56" />
        </div>
        <div className="max-h-[36rem] overflow-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[35rem] border-collapse bg-white text-xs text-slate-700">
            <thead className="sticky top-0 bg-slate-100 text-slate-800">
              <tr><th scope="col" className="px-3 py-2.5 text-left">{view === "sector" ? "Sector" : "Department"}</th><th scope="col" className="px-3 py-2.5 text-right">Plan outlay</th><th scope="col" className="px-3 py-2.5 text-right" aria-sort="descending">Expenditure</th><th scope="col" className="px-3 py-2.5 text-right">Utilisation</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100 even:bg-slate-50/60"><th scope="row" className="px-3 py-2.5 text-left font-semibold">{row.name}</th><td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums">{crore(row.outlay)}</td><td className="whitespace-nowrap px-3 py-2.5 text-right font-bold tabular-nums">{crore(row.expenditure)}</td><td className={`px-3 py-2.5 text-right font-bold tabular-nums ${row.utilisation > 100 ? "text-amber-800" : "text-teal-800"}`}>{row.outlay > 0 ? percent(row.utilisation) : "—"}</td></tr>
              ))}
              {!rows.length && <tr><td colSpan={4} className="px-3 py-4 text-center">No {view}s match this search.</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-600">Rows above 100% show expenditure exceeding outlay in the export. A dash indicates zero outlay.</p>
      </SectionCard>
    </main>
  );
}
