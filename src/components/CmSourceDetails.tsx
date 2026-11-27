import { ArrowUpRight, Info } from "lucide-react";
import type { DataProvenance } from "@/components/DataProvenance";

export function CmSourceDetails({ sources, label = "Data sources", inverted = false }: {
  sources: readonly DataProvenance[];
  label?: string;
  inverted?: boolean;
}) {
  if (sources.length === 0) return null;

  return (
    <details className="relative shrink-0 open:z-40">
      <summary
        aria-label={label}
        title={label}
        className={`grid h-8 w-8 cursor-pointer list-none place-items-center rounded-full border outline-offset-2 focus-visible:outline-2 [&::-webkit-details-marker]:hidden ${inverted ? "border-white/40 bg-white/10 text-white hover:bg-white/20" : "border-slate-200 bg-white text-[#174d70] hover:bg-slate-100"}`}
      >
        <Info size={16} aria-hidden="true" />
      </summary>
      <div className="absolute right-0 top-[calc(100%+0.45rem)] z-40 max-h-[min(70vh,420px)] w-[min(20rem,calc(100vw-3.5rem))] overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 text-left text-xs font-normal normal-case leading-relaxed text-slate-700 shadow-xl">
        <p className="font-extrabold text-slate-900">{label}</p>
        <ul className="mt-1 divide-y divide-slate-100">
          {sources.map((source, index) => (
            <li className="space-y-0.5 py-2 last:pb-0" key={`${source.url ?? source.source}-${index}`}>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 font-bold text-[#175784] underline underline-offset-2">
                  {source.dataset ?? source.source}<ArrowUpRight size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
                </a>
              ) : <strong>{source.dataset ?? source.source}</strong>}
              {source.dataset && <p>{source.source}</p>}
              {source.period && <p><strong>Period</strong> · {source.period}</p>}
              {"sourceUpdatedAt" in source && <p><strong>Source updated</strong> · {source.sourceUpdatedAt ?? "Date unavailable"}</p>}
              {source.fetchedAt && <p><strong>Checked</strong> · {source.fetchedAt}</p>}
              {source.basis && <p>{source.basis}</p>}
              {source.note && <p>{source.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
