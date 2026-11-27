"use client";

import { useState } from "react";
import Link from "next/link";
import KeralaMap from "@/components/KeralaMap";
import { slugify } from "@/data/districts";
import { eHealthDistrictCounts } from "@/data/healthActuals";

const districtValues = Object.fromEntries(eHealthDistrictCounts.map(({ name, value }) => [name, value]));
const count = new Intl.NumberFormat("en-IN");
const shade = (fraction: number) => `hsl(171 68% ${91 - fraction * 52}%)`;
const ranking = [...eHealthDistrictCounts].sort((a, b) => b.value - a.value);
const highest = ranking[0].value;
const lowest = ranking[ranking.length - 1].value;

export function EHealthDistrictMap() {
  const [district, setDistrict] = useState<string>(ranking[0].name);

  return (
    <div className="grid min-w-0 gap-3 py-3 lg:grid-cols-2">
      <div className="min-w-0 rounded-xl border border-teal-100 bg-teal-50/60 p-3">
        <KeralaMap values={districtValues} height={285} fitDistricts onSelect={setDistrict} selectedDistrict={district} colorScale={shade} formatValue={count.format} />
        <span className="mt-2 block h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${shade(0)}, ${shade(1)})` }} aria-hidden="true" />
        <div className="mt-1 flex justify-between gap-2 text-xs text-slate-600"><span>{lowest} institutions</span><span>{highest} institutions</span></div>
      </div>
      <div className="grid min-w-0 content-start gap-3 rounded-xl border border-slate-200 p-3">
        <h4 className="text-sm font-extrabold text-slate-800">Five districts with the most listed institutions</h4>
        <ol className="grid gap-1.5">
          {ranking.slice(0, 5).map(({ name, value }) => (
            <li key={name}>
              <button className="grid w-full gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-teal-700 aria-pressed:border-teal-400 aria-pressed:bg-teal-50" type="button" aria-pressed={district === name} onClick={() => setDistrict(name)}>
                <span className="flex justify-between gap-2"><span>{name}</span><strong className="tabular-nums">{value}</strong></span>
                <span className="h-1.5 rounded-full bg-slate-100" aria-hidden="true"><i className="block h-full rounded-full bg-teal-700" style={{ width: `${value / highest * 100}%` }} /></span>
              </button>
            </li>
          ))}
        </ol>
        <label className="grid gap-1 text-xs font-semibold text-slate-700">
          District on eHealth map
          <select className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800" value={district} onChange={(event) => setDistrict(event.target.value)}>
            {eHealthDistrictCounts.map(({ name }) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <div className="rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-700" aria-live="polite">
          <p><strong>{district}</strong> · {count.format(districtValues[district])} eHealth institutions</p>
          <Link href={`/districts/${slugify(district)}`} className="font-semibold text-teal-800 underline-offset-2 hover:underline">Open district profile</Link>
        </div>
      </div>
    </div>
  );
}
