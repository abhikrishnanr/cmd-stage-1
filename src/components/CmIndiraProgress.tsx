import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { indiraGuarantees, indiraProgressSource, indiraStages } from "@/data/indiraTracker";

export function CmIndiraProgress() {
  const sources = [indiraProgressSource, ...indiraGuarantees.filter(({ milestone }) => milestone).map(({ evidence }) => evidence)];

  return (
    <section id="indira-progress" aria-labelledby="cm-indira-title" className="min-w-0 scroll-mt-20 rounded-2xl border border-violet-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#644491] text-white"><ShieldCheck size={19} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <h2 id="cm-indira-title" className="text-base font-extrabold text-[#243753]">Indira Guarantees</h2>
          <p className="text-xs text-slate-600">Tracker progress · {indiraProgressSource.period}</p>
        </div>
        <CmSourceDetails sources={sources} label="Indira Guarantee sources" />
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {indiraGuarantees.map(({ slug, title, progress, milestone, color }) => (
          <li key={slug} className="min-w-0">
            <Link href={`/indira/${slug}`} className="grid h-full min-w-0 gap-1 rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 hover:border-violet-400 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-violet-700">
              <span className="flex items-start justify-between gap-2 text-xs font-bold text-slate-800"><span>{title}</span><strong className="shrink-0 tabular-nums" style={{ color }}>{progress}%</strong></span>
              <span className="block h-1.5 overflow-hidden rounded-full bg-slate-200" aria-hidden="true"><span className="block h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: color }} /></span>
              <span className="text-[11px] font-medium text-slate-600">{milestone?.label ?? indiraStages[progress]}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/indira" className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[#5b4089] underline underline-offset-2">Open Indira Guarantees <ArrowRight size={14} aria-hidden="true" /></Link>
    </section>
  );
}
