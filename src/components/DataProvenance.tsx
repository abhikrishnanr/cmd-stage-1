"use client";

import { Clock3, Database, ExternalLink, Info } from "lucide-react";

export interface DataProvenance {
  source: string;
  dataset?: string;
  url?: string;
  period?: string;
  basis?: string;
  sourceUpdatedAt?: string | null;
  fetchedAt?: string;
  note?: string;
}

export function formatProvenance(provenance: DataProvenance) {
  const parts = [
    `Source: ${provenance.source}`,
    provenance.dataset && `Dataset: ${provenance.dataset}`,
    provenance.period && `Period: ${provenance.period}`,
    provenance.basis && `Basis: ${provenance.basis}`,
    "sourceUpdatedAt" in provenance && `Source updated: ${provenance.sourceUpdatedAt || "Not published"}`,
    provenance.fetchedAt && `Last synced: ${provenance.fetchedAt}`,
    provenance.note,
  ].filter(Boolean);

  return parts.join(" · ");
}

export function ProvenanceTooltip({
  provenance,
  inverted = false,
  compact = false,
}: {
  provenance: DataProvenance;
  inverted?: boolean;
  compact?: boolean;
}) {
  const details = formatProvenance(provenance);

  if (compact) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${inverted ? "bg-white/12 text-white/75" : "bg-slate-100 text-slate-500"}`}
        title={details}
        aria-label={details}
      >
        <Info size={13} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span className="group/source relative inline-flex shrink-0">
      <button
        type="button"
        onClick={(event) => event.stopPropagation()}
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full outline-none transition ${
          inverted
            ? "bg-white/12 text-white/75 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
            : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500"
        }`}
        aria-label={`Show data source details. ${details}`}
        title={details}
      >
        <Info size={14} aria-hidden="true" />
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none invisible absolute right-0 top-[calc(100%+0.4rem)] z-[80] w-72 translate-y-1 rounded-xl border p-3 text-left opacity-0 shadow-xl transition group-hover/source:visible group-hover/source:translate-y-0 group-hover/source:opacity-100 group-focus-within/source:visible group-focus-within/source:translate-y-0 group-focus-within/source:opacity-100 ${
          inverted
            ? "border-white/15 bg-slate-950/95 text-white"
            : "border-slate-200 bg-white text-slate-700"
        }`}
      >
        <span className="block text-[11px] font-extrabold">{provenance.source}</span>
        {provenance.dataset && <span className={`mt-0.5 block text-[10px] ${inverted ? "text-white/65" : "text-slate-500"}`}>{provenance.dataset}</span>}
        <span className={`mt-2 grid gap-1 text-[10px] ${inverted ? "text-white/75" : "text-slate-600"}`}>
          {provenance.period && <span><strong>Period:</strong> {provenance.period}</span>}
          {provenance.basis && <span><strong>Basis:</strong> {provenance.basis}</span>}
          {"sourceUpdatedAt" in provenance && <span><strong>Source updated:</strong> {provenance.sourceUpdatedAt || "Not published by source"}</span>}
          {provenance.fetchedAt && <span><strong>Last synced:</strong> {provenance.fetchedAt}</span>}
          {provenance.note && <span className={inverted ? "text-white/55" : "text-slate-400"}>{provenance.note}</span>}
        </span>
        {provenance.url && <span className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${inverted ? "text-sky-300" : "text-blue-700"}`}><ExternalLink size={11} aria-hidden="true" /> Official source link shown in page source strip</span>}
      </span>
    </span>
  );
}

export function ProvenanceStrip({
  items,
  inverted = false,
  className = "",
}: {
  items: DataProvenance[];
  inverted?: boolean;
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border px-3 py-2.5 text-[10.5px] ${
        inverted ? "border-white/12 bg-white/8 text-white/75" : "border-slate-200 bg-slate-50 text-slate-600"
      } ${className}`}
      aria-label="Data sources and freshness"
    >
      <span className={`inline-flex items-center gap-1.5 font-extrabold ${inverted ? "text-white" : "text-slate-700"}`}>
        <Database size={13} aria-hidden="true" /> Sources
      </span>
      {items.map((item, index) => (
        <span key={`${item.source}-${item.dataset || index}`} className="inline-flex min-w-0 flex-wrap items-center gap-1.5">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline ${inverted ? "text-sky-300" : "text-blue-700"}`}>
              {item.source}<ExternalLink size={10} aria-hidden="true" />
            </a>
          ) : <strong className={inverted ? "text-white/90" : "text-slate-700"}>{item.source}</strong>}
          {item.dataset && <span>· {item.dataset}</span>}
          {item.period && <span>· {item.period}</span>}
          {item.basis && <span>· {item.basis}</span>}
          {"sourceUpdatedAt" in item && <span>· Source updated: {item.sourceUpdatedAt || "not published"}</span>}
          {item.fetchedAt && <span className="inline-flex items-center gap-1"><Clock3 size={10} aria-hidden="true" /> Last synced: {item.fetchedAt}</span>}
        </span>
      ))}
    </div>
  );
}
