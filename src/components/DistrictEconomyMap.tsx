"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Map as MapIcon, Maximize2, X } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import KeralaMap from "@/components/KeralaMap";
import { districtMapIndicators, type DistrictMapIndicator } from "@/data/districtMapIndicators";
import { slugify } from "@/data/districts";

const paletteStops = {
  economy: [[208, 241, 225], [24, 56, 112]],
  water: [[22, 98, 140], [222, 239, 248]],
  ration: [[255, 238, 210], [145, 64, 17]],
  projects: [[236, 229, 255], [103, 60, 158]],
} as const;

function colorScale(id: string) {
  const stops = id === "water" ? paletteStops.water : id === "ration" ? paletteStops.ration : id === "projects" ? paletteStops.projects : paletteStops.economy;
  return (fraction: number) => `rgb(${stops[0].map((start, index) => Math.round(start + (stops[1][index] - start) * fraction)).join(", ")})`;
}

function districtHref(district: string, section?: string) {
  return `/districts/${slugify(district)}${section ? `#${section}` : ""}`;
}

function DistrictMapPanel({ indicators, activeIndex, selectIndicator, selected, selectDistrict, height }: {
  indicators: readonly DistrictMapIndicator[];
  activeIndex: number;
  selectIndicator: (index: number) => void;
  selected: string | null;
  selectDistrict: (district: string) => void;
  height: number;
}) {
  const id = useId();
  const indicator = indicators[activeIndex];
  const shade = colorScale(indicator.id);
  const direction = indicator.order === "asc" ? 1 : -1;
  const ranked = [...indicator.rows].sort((a, b) => direction * (a.value - b.value) || a.district.localeCompare(b.district, "en-IN"));
  const values = Object.fromEntries(ranked.map(({ district, value }) => [district, value]));
  const minimum = Math.min(...ranked.map(({ value }) => value));
  const maximum = Math.max(...ranked.map(({ value }) => value));
  const selectedRow = ranked.find(({ district }) => district === selected);
  const projects = selectedRow?.projects ?? [];
  const sources = projects.length > 0
    ? Array.from(new Map(projects.map(({ source }) => [source.url, source])).values())
    : indicator.sources;

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = indicators.length - 1;
    const next = { ArrowLeft: index === 0 ? last : index - 1, ArrowRight: index === last ? 0 : index + 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    selectIndicator(next);
    document.getElementById(`${id}-${indicators[next].id}`)?.focus();
  }

  return (
    <>
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div role="tablist" aria-label="District indicators" className="flex min-w-0 flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
          {indicators.map((entry, index) => (
            <button key={entry.id} id={`${id}-${entry.id}`} type="button" role="tab" aria-selected={activeIndex === index} aria-controls={`${id}-panel`} tabIndex={activeIndex === index ? 0 : -1} onClick={() => selectIndicator(index)} onKeyDown={(event) => moveTab(event, index)} className={`rounded-lg px-2.5 py-2 text-xs font-bold focus-visible:outline-2 focus-visible:outline-blue-700 ${activeIndex === index ? "bg-white text-[#17366e] shadow-sm" : "text-slate-600 hover:bg-white/80"}`}>
              {entry.name}
            </button>
          ))}
        </div>
        <CmSourceDetails key={indicator.id} label={`${indicator.name} sources`} sources={sources} />
      </div>

      <div role="tabpanel" tabIndex={0} id={`${id}-panel`} aria-labelledby={`${id}-${indicator.id}`} className="rounded-xl focus-visible:outline-2 focus-visible:outline-blue-700">
        <p className="mb-3 mt-2 text-xs leading-relaxed text-slate-600">{indicator.description} <span className="font-semibold text-slate-700">{indicator.period}</span></p>
        <div className="grid min-w-0 gap-3 min-[640px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-[#f4f8fb] p-2.5">
            <div className="relative" style={{ minHeight: height }}>
              <KeralaMap values={values} fitDistricts height={height} colorScale={shade} formatValue={indicator.format} selectedDistrict={selected ?? undefined} onSelect={selectDistrict} />
            </div>
            <div className="px-1 pb-1 text-[10px] font-semibold text-slate-600" aria-label={`Colour scale from ${indicator.format(minimum)} to ${indicator.format(maximum)}`}>
              <div className="mb-1 h-1.5 rounded-full" style={{ background: minimum === maximum ? shade(0.6) : `linear-gradient(to right, ${shade(0)}, ${shade(1)})` }} />
              <div className="flex flex-wrap justify-between gap-x-1"><span>{indicator.format(minimum)}</span>{minimum !== maximum && <span>{indicator.format(maximum)}</span>}</div>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-2.5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-1 px-1">
              <h4 className="text-[13px] font-extrabold text-[#172956]">District comparison</h4>
              <span className="text-[10px] font-medium text-slate-600">{ranked.length} districts</span>
            </div>
            <ol className="space-y-1 overflow-y-auto pr-1" style={{ maxHeight: height - 12 }} aria-label={`Districts by ${indicator.name.toLowerCase()}`}>
              {ranked.map(({ district, value }) => (
                <li key={district} className={`flex min-w-0 items-stretch gap-1 rounded-lg border ${selected === district ? "border-[#35708e] bg-[#e4f3ef]" : "border-slate-200 bg-white hover:border-slate-400"}`}>
                  <button type="button" aria-pressed={selected === district} onClick={() => selectDistrict(district)} className="flex min-h-8 min-w-0 flex-1 items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-[11px] focus-visible:outline-2 focus-visible:outline-blue-700">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border border-slate-300" style={{ background: shade(maximum === minimum ? 0.6 : (value - minimum) / (maximum - minimum)) }} />
                    <span className="min-w-0 flex-1 break-words font-semibold text-slate-800">{district}</span>
                    <strong className="shrink-0 whitespace-nowrap tabular-nums text-[#172956]">{indicator.format(value)}</strong>
                  </button>
                  <Link href={districtHref(district, indicator.hrefSection)} aria-label={`Open ${district} district page for ${indicator.name}`} title={`Open ${district} district page`} className="grid min-w-8 place-items-center rounded-lg text-[#225487] hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700"><ArrowUpRight size={15} aria-hidden="true" /></Link>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-[#172956]">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div aria-live="polite" className="space-y-1">
              <p className="font-extrabold">{selectedRow ? `${selectedRow.district} · ${indicator.format(selectedRow.value)}` : "Select a district on the map or in the list."}</p>
              {selectedRow?.detail && <p className="text-slate-700">{selectedRow.detail}</p>}
            </div>
            {selectedRow && <Link className="inline-flex items-center gap-1 font-bold text-[#225487] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-700" href={districtHref(selectedRow.district, indicator.hrefSection)}>Open {selectedRow.district} district page <ArrowRight size={14} aria-hidden="true" /></Link>}
          </div>
          {projects.length > 0 && (
            <ul aria-label={`Tracked projects in ${selectedRow?.district}`} className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.id} className="relative flex min-w-0 items-start justify-between gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2 has-[details[open]]:z-10 [&>details]:static [&>details>div]:top-10 [&>details>div]:max-w-[calc(100%_-_1rem)] [&>details>div]:right-2">
                  <div>
                    <Link href={`/projects#project-${project.id}`} className="font-extrabold text-[#225487] underline underline-offset-2">{project.name}</Link>
                    <p className="mt-0.5 text-[11px] text-slate-600">{project.source.period}{project.progress?.map(({ label, percent }) => ` · ${label} ${percent.toLocaleString("en-IN", { maximumFractionDigits: 2 })}%`)}</p>
                  </div>
                  <CmSourceDetails label={`${project.name} source`} sources={[project.source]} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export function DistrictEconomyMap({ includeDistrictFindings = false }: { includeDistrictFindings?: boolean }) {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  const indicators = includeDistrictFindings ? districtMapIndicators : districtMapIndicators.filter(({ id }) => id === "output" || id === "per-capita" || id === "growth");
  const panel = { indicators, activeIndex, selectIndicator: setActiveIndex, selected, selectDistrict: setSelected };

  return (
    <section className="card min-w-0 p-4 sm:p-5" aria-labelledby={`${id}-title`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#1c3f7c]/10 text-[#17366e]"><MapIcon size={17} aria-hidden="true" /></span>
          <h3 id={`${id}-title`} className="text-[15px] font-extrabold text-[#172956]">District Command Map</h3>
        </div>
        <button ref={expandButton} type="button" aria-label="Expand district map to full screen" title="Expand to full screen" onClick={() => { dialog.current?.showModal(); setExpanded(true); }} className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"><Maximize2 size={16} aria-hidden="true" /></button>
      </div>
      <DistrictMapPanel {...panel} height={330} />
      <dialog ref={dialog} aria-labelledby={`${id}-expanded-title`} onClose={() => { setExpanded(false); expandButton.current?.focus(); }} className="fixed inset-0 m-auto max-h-[calc(100dvh_-_1.5rem)] w-[calc(100%_-_1.5rem)] max-w-6xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-xl backdrop:bg-slate-950/60 sm:p-5">
        <header className="mb-3 flex items-center justify-between gap-2">
          <h3 id={`${id}-expanded-title`} className="font-extrabold text-[#172956]">District Command Map</h3>
          <button type="button" aria-label="Close full-screen district map" onClick={() => dialog.current?.close()} className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"><X size={20} aria-hidden="true" /></button>
        </header>
        {expanded && <DistrictMapPanel {...panel} height={440} />}
      </dialog>
    </section>
  );
}
