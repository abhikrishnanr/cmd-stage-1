"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import KeralaMap from "@/components/KeralaMap";
import { SectionCard } from "@/components/primitives";
import { slugify } from "@/data/districts";
import {
  districtEconomy, districtEconomyChecked, districtEconomyPeriod, districtOutputSource, districtPerCapitaSource,
} from "@/data/districtEconomy";

const integer = new Intl.NumberFormat("en-IN");
const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const indicators = [
  { id: "output", name: "District GDDP", description: "Gross District Domestic Product at current prices, in ₹ crore.", source: districtOutputSource, format: (value: number) => `₹${decimal.format(value / 100)} cr` },
  { id: "per-capita", name: "GDDP per person", description: "District output per person at constant 2011–12 prices.", source: districtPerCapitaSource, format: (value: number) => `₹${integer.format(value)}` },
  { id: "growth", name: "Per-person growth", description: "Change in real GDDP per person from FY 2023–24 to FY 2024–25.", source: districtPerCapitaSource, format: (value: number) => `${decimal.format(value)}%` },
] as const;

function districtShade(fraction: number) {
  return `rgb(${Math.round(208 - 184 * fraction)}, ${Math.round(241 - 185 * fraction)}, ${Math.round(225 - 113 * fraction)})`;
}

function DistrictEconomyBody() {
  const id = useId();
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const indicator = indicators[tab];
  const ranked = Object.entries(districtEconomy).map(([district, entries]) => ({ district, value: entries[tab] })).sort((a, b) => b.value - a.value);
  const values = Object.fromEntries(ranked.map(({ district, value }) => [district, value]));
  const maximum = ranked[0].value;
  const minimum = ranked[ranked.length - 1].value;
  const selectedValue = selected ? values[selected] : undefined;

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = indicators.length - 1;
    const destination = { ArrowLeft: index === 0 ? last : index - 1, ArrowRight: index === last ? 0 : index + 1, Home: 0, End: last }[event.key];
    if (destination === undefined) return;
    event.preventDefault();
    setTab(destination);
    document.getElementById(`${id}-${indicators[destination].id}`)?.focus();
  }

  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div role="tablist" aria-label="District economic indicators" className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
          {indicators.map((entry, index) => (
            <button key={entry.id} id={`${id}-${entry.id}`} type="button" role="tab" aria-selected={tab === index} aria-controls={`${id}-panel`} tabIndex={tab === index ? 0 : -1} onClick={() => setTab(index)} onKeyDown={(event) => moveTab(event, index)} className={`rounded-lg px-2.5 py-2 text-xs font-bold focus-visible:outline-2 focus-visible:outline-blue-700 ${tab === index ? "bg-white text-[#17366e] shadow-sm" : "text-slate-600 hover:bg-white/80"}`}>
              {entry.name}
            </button>
          ))}
        </div>
        <CmSourceDetails label="District economy source" sources={[{ source: indicator.source.publisher, dataset: indicator.source.title, url: indicator.source.url, period: districtEconomyPeriod, fetchedAt: districtEconomyChecked, basis: indicator.description }]} />
      </div>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${indicator.id}`}>
        <p className="mb-3 mt-2 text-xs leading-relaxed text-slate-600">{indicator.description}</p>
        <div className="grid min-w-0 gap-3 min-[530px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0 rounded-2xl border border-emerald-100 bg-[#f1faf7] p-2.5">
            <div className="relative min-h-[330px]">
              <KeralaMap values={values} fitDistricts height={330} colorScale={districtShade} formatValue={indicator.format} selectedDistrict={selected ?? undefined} onSelect={setSelected} />
            </div>
            <div className="px-1 pb-1 text-[10px] font-semibold text-slate-600" aria-label={`Colour scale from ${indicator.format(minimum)} to ${indicator.format(maximum)}`}>
              <div className="mb-1 h-1.5 rounded-full" style={{ background: `linear-gradient(to right, ${districtShade(0)}, ${districtShade(1)})` }} />
              <div className="flex flex-wrap justify-between gap-x-1"><span>{indicator.format(minimum)}</span><span>{indicator.format(maximum)}</span></div>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-2.5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-1 px-1">
              <h4 className="text-[13px] font-extrabold text-[#172956]">District ranking</h4>
              <span className="text-[10px] font-medium text-slate-600">14 districts</span>
            </div>
            <ol className="max-h-[318px] space-y-1 overflow-y-auto pr-1" aria-label={`Districts by ${indicator.name.toLowerCase()}`}>
              {ranked.map(({ district, value }, index) => (
                <li key={district}>
                  <button type="button" aria-pressed={selected === district} onClick={() => setSelected(district)} className={`flex min-h-8 w-full items-center gap-1.5 rounded-lg border px-1.5 py-1.5 text-left text-[11px] focus-visible:outline-2 focus-visible:outline-blue-700 ${selected === district ? "border-[#35708e] bg-[#e4f3ef]" : "border-slate-100 bg-white hover:border-emerald-200"}`}>
                    <span aria-hidden="true" className="w-4 shrink-0 text-center tabular-nums text-slate-600">{index + 1}</span>
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border border-slate-300" style={{ background: districtShade((value - minimum) / (maximum - minimum)) }} />
                    <span className="min-w-0 flex-1 break-words font-semibold text-slate-800">{district}</span>
                    <strong className="shrink-0 whitespace-nowrap tabular-nums text-[#172956]">{indicator.format(value)}</strong>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-xs font-semibold text-[#172956]">
          <p aria-live="polite">{selectedValue === undefined ? "Select a district on the map or in the ranking." : `${selected} · ${indicator.format(selectedValue)}`}</p>
          {selected && <Link className="text-[#225487] underline underline-offset-2" href={`/districts/${slugify(selected)}`}>Open {selected} district profile</Link>}
        </div>
      </div>
    </>
  );
}

export function DistrictEconomyMap() {
  return (
    <SectionCard title="District Command Map" subtitle={districtEconomyPeriod} icon="Map" expandable className="min-w-0">
      <DistrictEconomyBody />
    </SectionCard>
  );
}
