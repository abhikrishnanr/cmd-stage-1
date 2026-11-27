"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Landmark, Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProvenanceTooltip } from "@/components/DataProvenance";
import { districtAdministration, districtDirectorySource, districtPopulationSource } from "@/data/districtAdministration";
import { slugify } from "@/data/districts";

const count = new Intl.NumberFormat("en-IN");

export default function DistrictsPage() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const districts = districtAdministration.filter(({ name, collector }) => `${name} ${collector}`.toLowerCase().includes(search));

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <PageHero
        icon="MapPinned"
        title="Districts"
        subtitle="District Collectors, published office contacts and local administration across Kerala."
        gradient="linear-gradient(112deg,#102542 0%,#1c4262 55%,#0d7065 100%)"
        statusLabel="Official directory"
        provenance={[districtDirectorySource, districtPopulationSource]}
      />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">District directory</h2>
          <p className="text-sm text-slate-600" aria-live="polite">{districts.length} of {districtAdministration.length} districts</p>
        </div>
        <label className="block w-full max-w-sm text-xs font-semibold text-slate-700">
          Search by district or Collector
          <span className="relative mt-1 block">
            <Search className="pointer-events-none absolute left-3 top-2.5 text-slate-400" size={16} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm font-normal text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-teal-600" />
          </span>
        </label>
      </div>

      {districts.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {districts.map((district) => (
            <li key={district.name} className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-teal-500 hover:shadow-md">
              <div className="relative flex min-w-0 flex-wrap items-center justify-between gap-1 rounded-t-2xl bg-gradient-to-br from-[#e9f3f8] to-[#ebf8f3] px-4 py-3">
                <Link href={`/districts/${slugify(district.name)}`} className="group inline-flex min-w-0 items-center gap-1.5 rounded text-base font-extrabold text-slate-900 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-teal-700">
                  {district.name}<ArrowUpRight size={15} className="shrink-0 text-teal-800 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <ProvenanceTooltip provenance={{ ...districtDirectorySource, url: district.profile, note: `${district.name} Collector profile is linked from the detail page.` }} />
              </div>
              <div className="p-4">
                <div className="flex items-start gap-2.5">
                  <Landmark className="mt-1 shrink-0 text-teal-800" size={17} aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-600">District Collector</p>
                    <p className="text-sm font-bold text-slate-900">{district.collector}</p>
                  </div>
                </div>
                <p className="mt-3 border-t border-slate-100 pt-2 text-xs text-slate-600">
                  <strong className="font-bold tabular-nums text-slate-900">{count.format(district.population)}</strong> population · 2011 Census
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-700">No districts match your search.</p>}
    </div>
  );
}
