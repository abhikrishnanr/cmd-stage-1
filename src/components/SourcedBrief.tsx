import { ArrowUpRight, FileText } from "lucide-react";
import { ProvenanceStrip, ProvenanceTooltip, type DataProvenance } from "@/components/DataProvenance";

export interface BriefMetric {
  label: string;
  value: string;
  note?: string;
  provenance: DataProvenance;
}

export interface BriefReference {
  title: string;
  description: string;
  provenance: DataProvenance & { url: string };
}

const accents = ["#165b85", "#137765", "#6b489a", "#84561b"];

export function SourcedBrief({ title, description, metrics = [], references, children }: {
  title: string;
  description: string;
  metrics?: BriefMetric[];
  references: BriefReference[];
  children?: React.ReactNode;
}) {
  const sources = [...new Set([...metrics.map((item) => item.provenance), ...references.map((item) => item.provenance)])];

  return (
    <div className="min-w-0 space-y-4 p-4 sm:p-5">
      <header className="rounded-3xl bg-[radial-gradient(ellipse_at_top_right,#176f76,transparent_55%),linear-gradient(110deg,#142348,#234381)] p-5 text-white sm:p-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85">{description}</p>
        {sources.length > 0 && <ProvenanceStrip items={sources} inverted className="mt-5" />}
      </header>

      {metrics.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label={`${title} figures`}>
          {metrics.map((metric, index) => (
            <article key={metric.label} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4" style={{ borderTop: `3px solid ${accents[index % accents.length]}` }}>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xs font-bold text-slate-700">{metric.label}</h2>
                <ProvenanceTooltip provenance={metric.provenance} />
              </div>
              <p className="mt-1 break-words text-2xl font-extrabold tabular-nums" style={{ color: accents[index % accents.length] }}>{metric.value}</p>
              {metric.note && <p className="mt-2 text-xs leading-relaxed text-slate-600">{metric.note}</p>}
            </article>
          ))}
        </div>
      )}

      {children}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h2 className="text-sm font-extrabold text-[#172c55]">Original sources</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {references.map(({ title, description, provenance }) => (
            <li key={title} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <a href={provenance.url} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm font-bold text-[#1a4b87] hover:underline">
                <FileText size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{title} <ArrowUpRight size={12} className="inline" aria-hidden="true" /></span>
              </a>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
