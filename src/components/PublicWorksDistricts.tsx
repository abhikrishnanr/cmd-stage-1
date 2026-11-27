"use client";

import { useState } from "react";
import Link from "next/link";
import KeralaMap from "@/components/KeralaMap";
import { formatTransportNumber as number } from "@/components/TransportReport";
import { slugify } from "@/data/districts";
import { pwdRoadDistricts } from "@/data/transportActuals";

const measures = [
  { key: "totalKm", label: "All PWD roads" },
  { key: "highwayKm", label: "State Highways" },
  { key: "districtRoadKm", label: "Major District Roads" },
] as const;

type Measure = typeof measures[number]["key"];

const mapColor = (fraction: number) => `hsl(30 80% ${92 - fraction * 48}%)`;
const km = (value: number) => `${number(value)} km`;

export function PublicWorksDistricts() {
  const [measure, setMeasure] = useState<Measure>("totalKm");
  const [selectedDistrict, selectDistrict] = useState<string | null>(null);
  const ranked = [...pwdRoadDistricts].sort((a, b) => b[measure] - a[measure]);
  const selected = pwdRoadDistricts.find((row) => row.district === selectedDistrict) ?? ranked[0];
  const maximum = ranked[0][measure];
  const minimum = ranked[ranked.length - 1][measure];
  const values = Object.fromEntries(ranked.map((row) => [row.district, row[measure]]));

  return (
    <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
      <figure className="grid min-w-0 gap-2 rounded-xl border border-amber-100 bg-amber-50/55 p-3" aria-label="Kerala PWD road inventory map">
        <figcaption className="text-sm font-bold text-slate-900">{measures.find((item) => item.key === measure)?.label} by district</figcaption>
        <KeralaMap values={values} height={290} fitDistricts onSelect={selectDistrict} selectedDistrict={selected.district} colorScale={mapColor} formatValue={km} />
        <div className="grid gap-1">
          <span className="h-2 rounded-full" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${mapColor(0)}, ${mapColor(1)})` }} />
          <div className="flex justify-between text-[11px] font-bold tabular-nums text-slate-700"><span>{km(minimum)}</span><span>{km(maximum)}</span></div>
        </div>
      </figure>
      <div className="grid min-w-0 content-start gap-3 rounded-xl border border-slate-200 p-3">
        <label className="grid gap-1 text-xs font-bold text-slate-700">Road category
          <select value={measure} onChange={(event) => setMeasure(event.target.value as Measure)} className="min-w-0 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800">
            {measures.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
        </label>
        <h3 className="text-sm font-bold text-slate-900">Five longest networks</h3>
        <ol className="grid gap-1">
          {ranked.slice(0, 5).map((row) => (
            <li key={row.district}>
              <button type="button" onClick={() => selectDistrict(row.district)} aria-pressed={selected.district === row.district} className="grid w-full gap-1 rounded-lg border border-slate-100 px-2 py-1.5 text-left text-xs text-slate-700 hover:border-amber-400 focus-visible:outline-2 focus-visible:outline-amber-700 aria-pressed:border-amber-300 aria-pressed:bg-amber-50">
                <span className="flex justify-between gap-2"><span>{row.district}</span><strong className="tabular-nums">{km(row[measure])}</strong></span>
                <span className="h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true"><span className="block h-full rounded-full bg-amber-700" style={{ width: `${row[measure] / maximum * 100}%` }} /></span>
              </button>
            </li>
          ))}
        </ol>
        <label className="grid gap-1 text-xs font-bold text-slate-700">District on map
          <select value={selected.district} onChange={(event) => selectDistrict(event.target.value)} className="min-w-0 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800">
            {pwdRoadDistricts.map((row) => <option key={row.district} value={row.district}>{row.district}</option>)}
          </select>
        </label>
        <p className="rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-700" aria-live="polite">
          <Link href={`/districts/${slugify(selected.district)}`} className="font-bold text-blue-800 underline-offset-2 hover:underline">{selected.district}</Link> · {km(selected[measure])}
        </p>
      </div>
    </div>
  );
}
