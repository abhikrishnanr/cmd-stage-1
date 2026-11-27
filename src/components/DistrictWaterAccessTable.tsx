"use client";

import { useState } from "react";
import Link from "next/link";
import KeralaMap from "@/components/KeralaMap";
import { districtWaterAccess, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import { slugify } from "@/data/districts";

const whole = new Intl.NumberFormat("en-IN");
const percentage = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const cell = "px-3 py-2 text-right tabular-nums";

export function DistrictWaterAccessTable() {
  const [byCoverage, setByCoverage] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const ordered = [...districtWaterAccess].sort((a, b) => byCoverage
    ? (a.with / a.denom) - (b.with / b.denom) || b.count - a.count
    : b.count - a.count || a.district.localeCompare(b.district));
  const selected = districtWaterAccess.find((row) => row.district === selectedDistrict) ?? ordered[0];
  const mapValues = Object.fromEntries(ordered.map((row) => [row.district, byCoverage ? row.percent : row.count]));
  const minimum = Math.min(...Object.values(mapValues));
  const maximum = Math.max(...Object.values(mapValues));
  const formatValue = (value: number) => byCoverage ? `${percentage.format(value)}%` : whole.format(value);
  const mapColor = (fraction: number) => byCoverage
    ? `hsl(190 74% ${89 - 53 * fraction}%)`
    : `hsl(28 79% ${91 - 51 * fraction}%)`;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs leading-relaxed text-slate-600">Compare the number of households without taps or the share with a tap connection.</p>
        <label className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-slate-700">
          Order by
          <select value={byCoverage ? "coverage" : "count"} onChange={(event) => setByCoverage(event.target.value === "coverage")} className="max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800">
            <option value="count">Most households without taps</option>
            <option value="coverage">Lowest coverage</option>
          </select>
        </label>
      </div>
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <figure className="grid min-w-0 gap-2 rounded-xl border border-slate-200 bg-[#f2f8f9] p-3" aria-label="Kerala district water access map">
          <figcaption className="text-sm font-bold text-slate-800">{byCoverage ? "Rural tap connection coverage" : "Rural households without taps"}</figcaption>
          <KeralaMap values={mapValues} height={295} fitDistricts onSelect={setSelectedDistrict} selectedDistrict={selected.district} colorScale={mapColor} formatValue={formatValue} />
          <div className="grid gap-1">
            <span className="h-2 rounded-full" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${mapColor(0)}, ${mapColor(1)})` }} />
            <div className="flex justify-between text-[11px] font-semibold tabular-nums text-slate-600">
              <span>{formatValue(minimum)}</span><span>{formatValue(maximum)}</span>
            </div>
          </div>
        </figure>
        <div className="grid min-w-0 content-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
          <h3 className="text-sm font-bold text-slate-800">{byCoverage ? "Five lowest coverage rates" : "Five largest connection gaps"}</h3>
          <ol className="grid gap-1.5">
            {ordered.slice(0, 5).map((row) => (
              <li key={row.district}>
                <button type="button" className="grid w-full min-w-0 gap-1 rounded-lg border border-slate-100 px-2.5 py-1.5 text-left text-xs text-slate-700 hover:border-cyan-300 focus-visible:outline-2 focus-visible:outline-sky-600 aria-pressed:border-cyan-300 aria-pressed:bg-cyan-50" aria-pressed={selected.district === row.district} onClick={() => setSelectedDistrict(row.district)}>
                  <span className="flex justify-between gap-2"><span>{row.district}</span><strong className="tabular-nums">{formatValue(mapValues[row.district])}</strong></span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                    <span className="block h-full rounded-full" style={{ width: `${byCoverage ? row.percent : row.count / maximum * 100}%`, backgroundColor: byCoverage ? "#0e7490" : "#b45309" }} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <label className="grid gap-1 text-xs font-semibold text-slate-700">
            District on map
            <select value={selected.district} onChange={(event) => setSelectedDistrict(event.target.value)} className="min-w-0 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800">
              {districtWaterAccess.map((row) => <option key={row.district} value={row.district}>{row.district}</option>)}
            </select>
          </label>
          <div className="rounded-lg bg-slate-50 p-2.5 text-xs leading-relaxed text-slate-700" aria-live="polite">
            <p><strong>{selected.district}</strong> · {percentage.format(selected.percent)}% coverage · {whole.format(selected.count)} households without taps</p>
            <Link href={`/districts/${slugify(selected.district)}`} className="font-semibold text-sky-800 underline-offset-2 hover:underline">Open district profile</Link>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200" role="region" aria-label="Scrollable district water coverage table" tabIndex={0}>
        <table className="w-full min-w-[31rem] border-collapse text-sm text-slate-800" aria-label="Rural household tap connections by district">
          <thead className="bg-slate-100 text-xs">
            <tr>
              <th scope="col" className="px-3 py-2 text-left">District</th>
              <th scope="col" className={cell}>Rural households</th>
              <th scope="col" className={cell}>With taps</th>
              <th scope="col" className={cell} aria-sort={byCoverage ? undefined : "descending"}>Without taps</th>
              <th scope="col" className={cell} aria-sort={byCoverage ? "ascending" : undefined}>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((row) => (
              <tr key={row.district} className="border-t border-slate-100 even:bg-slate-50">
                <th scope="row" className="whitespace-nowrap px-3 py-2 text-left font-semibold"><Link className="text-blue-800 underline-offset-2 hover:underline" href={`/districts/${slugify(row.district)}`}>{row.district}</Link></th>
                <td className={cell}>{whole.format(row.denom)}</td>
                <td className={cell}>{whole.format(row.with)}</td>
                <td className={`${cell} font-semibold`}>{whole.format(row.count)}</td>
                <td className={cell}>
                  {percentage.format(row.percent)}%
                  <span className="ml-auto mt-1 block h-1.5 w-16 overflow-hidden rounded-full bg-teal-100" aria-hidden="true"><span className="block h-full rounded-full bg-teal-700" style={{ width: `${row.percent}%` }} /></span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-teal-200 bg-teal-50 font-bold">
            <tr>
              <th scope="row" className="px-3 py-2 text-left">Kerala</th>
              <td className={cell}>{whole.format(districtWaterAccessTotal.denom)}</td>
              <td className={cell}>{whole.format(districtWaterAccessTotal.with)}</td>
              <td className={cell}>{whole.format(districtWaterAccessTotal.count)}</td>
              <td className={cell}>{percentage.format(districtWaterAccessTotal.percent)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="text-xs leading-relaxed text-slate-600">Coverage is households with reported taps divided by rural households. Households without taps are the difference between those counts. The report measures connections.</p>
    </>
  );
}
