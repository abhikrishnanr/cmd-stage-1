"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Landmark, Search } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import type { DataProvenance } from "@/components/DataProvenance";
import styles from "./DistrictBriefing.module.css";

export type DistrictDirectoryEntry = {
  name: string;
  href: string;
  collector: string;
  sources: DataProvenance[];
  waterCoverage?: number;
  inProgress: number;
};

const percent = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export function DistrictDirectory({ entries }: { entries: DistrictDirectoryEntry[] }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase("en-IN");
  const districts = entries.filter(({ name, collector }) => `${name} ${collector}`.toLocaleLowerCase("en-IN").includes(search));

  return (
    <section id="district-directory" aria-labelledby="district-directory-heading" className="scroll-mt-20 space-y-3">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="district-directory-heading" className="text-lg font-extrabold text-slate-900">District directory</h2>
          <p className="text-sm text-slate-600" aria-live="polite">{districts.length} of {entries.length} districts</p>
        </div>
        <label className="block w-full max-w-sm text-xs font-semibold text-slate-700">
          Search by district or Collector
          <span className="relative mt-1 block">
            <Search className="pointer-events-none absolute left-3 top-2.5 text-slate-400" size={16} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm font-normal text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-teal-600" />
          </span>
        </label>
      </header>

      {districts.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {districts.map((district) => (
            <li key={district.name} className={`${styles.directoryEntry} rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-teal-500`}>
              <header className="flex min-w-0 items-center justify-between gap-1 rounded-t-2xl bg-gradient-to-br from-[#e8f2fa] to-[#e8f7ef] px-4 py-2.5">
                <Link href={district.href} className="inline-flex min-w-0 items-center gap-1.5 rounded text-base font-extrabold text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-teal-700">
                  {district.name}<ArrowUpRight size={14} className="shrink-0 text-teal-800" aria-hidden="true" />
                </Link>
                <CmSourceDetails label={`${district.name} district sources`} sources={district.sources} />
              </header>
              <div className="space-y-3 p-4">
                <div className="flex items-start gap-2.5">
                  <Landmark className="mt-1 shrink-0 text-teal-800" size={17} aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-600">District Collector</p>
                    <p className="text-sm font-bold text-slate-900">{district.collector}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-slate-200 pt-2 text-xs">
                  {district.waterCoverage !== undefined && <Link href={`${district.href}#district-water`} className={styles.rowLink}>{percent.format(district.waterCoverage)}% rural tap coverage</Link>}
                  {district.inProgress > 0 && <Link href={`${district.href}#district-projects`} className={styles.rowLink}>{district.inProgress} ongoing {district.inProgress === 1 ? "project" : "projects"} tracked</Link>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-700">No districts match your search.</p>}
    </section>
  );
}
