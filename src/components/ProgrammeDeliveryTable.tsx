"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { DepartmentDelivery } from "@/lib/programmeDelivery";

const count = new Intl.NumberFormat("en-IN");
const numberCell = "whitespace-nowrap px-3 py-3 text-right tabular-nums";

export function ProgrammeDeliveryTable({ departments }: { departments: DepartmentDelivery[] }) {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const followUp = departments.filter((row) => row.completed < row.projects || row.verifiedIndicators < row.indicators);
  const baseRows = showAll ? departments : followUp;
  const selectedRows = baseRows.filter((row) => row.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div role="group" aria-label="Department coverage" className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
          <button type="button" aria-pressed={!showAll} onClick={() => setShowAll(false)} className={filterButton(!showAll)}>
            Follow-up ({followUp.length})
          </button>
          <button type="button" aria-pressed={showAll} onClick={() => setShowAll(true)} className={filterButton(showAll)}>
            All departments ({departments.length})
          </button>
        </div>
        <label className="grid w-full max-w-xs gap-1 text-xs font-bold text-slate-700 sm:w-64">
          Find a department
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600" />
        </label>
      </div>
      <p className="mt-3 text-xs text-slate-600" role="status">Showing {selectedRows.length} of {baseRows.length} departments in this view.</p>
      <div tabIndex={0} role="region" aria-label="Programme progress by department" className="mt-3 overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-600">
        <table className="w-full min-w-[660px] border-collapse text-left text-sm text-slate-700">
          <caption className="sr-only">100 Days Programme project and indicator figures by department</caption>
          <thead className="bg-slate-100 text-xs text-slate-800">
            <tr>
              <th scope="col" className="px-3 py-2.5">Department</th>
              <th scope="col" className="px-3 py-2.5 text-right">Projects completed</th>
              <th scope="col" className="px-3 py-2.5 text-right">Projects remaining</th>
              <th scope="col" className="px-3 py-2.5 text-right">Indicators verified</th>
              <th scope="col" className="px-3 py-2.5 text-right">Indicators unverified</th>
              <th scope="col" className="px-3 py-2.5">Original record</th>
            </tr>
          </thead>
          <tbody>
            {selectedRows.map((row) => {
              const remaining = row.projects - row.completed;
              const unverified = row.indicators - row.verifiedIndicators;
              return (
                <tr key={row.detailUrl} className="border-t border-slate-200 even:bg-slate-50/70">
                  <th scope="row" className="px-3 py-3 font-semibold text-slate-800">{row.name}</th>
                  <td className={numberCell}>{count.format(row.completed)} of {count.format(row.projects)}</td>
                  <td className={numberCell}><Gap value={remaining} /></td>
                  <td className={numberCell}>{count.format(row.verifiedIndicators)} of {count.format(row.indicators)}</td>
                  <td className={numberCell}><Gap value={unverified} /></td>
                  <td className="px-3 py-3">
                    <a href={row.detailUrl} target="_blank" rel="noreferrer" aria-label={`${row.name} official project records (JSON)`}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-blue-800 underline-offset-2 hover:underline">
                      Projects (JSON) <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              );
            })}
            {!selectedRows.length && <tr><td colSpan={6} className="px-3 py-5 text-center">No departments match this view.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Gap({ value }: { value: number }) {
  return <span className={value > 0 ? "rounded-md bg-amber-100 px-2 py-1 font-bold text-amber-950" : "text-slate-500"}>{count.format(value)}</span>;
}

function filterButton(active: boolean) {
  return `rounded-lg px-3 py-2 text-xs font-bold focus-visible:outline-2 focus-visible:outline-blue-600 ${active ? "bg-white text-blue-900 shadow-sm" : "text-slate-700 hover:bg-white/75"}`;
}
