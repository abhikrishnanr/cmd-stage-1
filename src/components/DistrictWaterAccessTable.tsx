"use client";

import { useState } from "react";
import Link from "next/link";
import { districtWaterAccess, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import { slugify } from "@/data/districts";

const whole = new Intl.NumberFormat("en-IN");
const percentage = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const cell = "px-3 py-2 text-right tabular-nums";

export function DistrictWaterAccessTable() {
  const [byCoverage, setByCoverage] = useState(false);
  const ordered = [...districtWaterAccess].sort((a, b) => byCoverage
    ? (a.with / a.denom) - (b.with / b.denom) || b.count - a.count
    : b.count - a.count || a.district.localeCompare(b.district));

  return (
    <>
      <label className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700">
        Order by
        <select value={byCoverage ? "coverage" : "count"} onChange={(event) => setByCoverage(event.target.value === "coverage")} className="max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800">
          <option value="count">Most households without taps</option>
          <option value="coverage">Lowest coverage</option>
        </select>
      </label>
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
