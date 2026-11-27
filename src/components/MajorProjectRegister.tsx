"use client";

import { useState } from "react";
import { TransportSection, TransportValues } from "@/components/TransportReport";
import { majorProjects, majorProjectSectors, type MajorProjectStage } from "@/data/majorProjectsActuals";

const stages: Record<MajorProjectStage, string> = {
  "Works in progress": "bg-blue-50 text-blue-900",
  "Contract awarded": "bg-violet-50 text-violet-900",
  Sanctioned: "bg-amber-50 text-amber-900",
  Operational: "bg-teal-50 text-teal-900",
  Completed: "bg-emerald-50 text-emerald-900",
};

const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600";
const stageOrder = Object.keys(stages);

export default function MajorProjectRegister() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");
  const term = search.trim().toLowerCase();
  const records = majorProjects.filter((record) =>
    (!sector || record.sector === sector) && (!stage || record.stage === stage) &&
    (!term || `${record.name} ${record.location} ${record.summary}`.toLowerCase().includes(term)),
  ).sort((a, b) => stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage));

  return (
    <section id="project-records" className="scroll-mt-20 space-y-3" aria-labelledby="projects-register-heading">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h2 id="projects-register-heading" className="text-xl font-extrabold text-slate-900">Project records</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">Search by project or district
            <input type="search" className={field} value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">Sector
            <select className={field} value={sector} onChange={(event) => setSector(event.target.value)}>
              <option value="">All sectors</option>
              {majorProjectSectors.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-bold text-slate-700">Reported stage
            <select className={field} value={stage} onChange={(event) => setStage(event.target.value)}>
              <option value="">All stages</option>
              {Object.keys(stages).map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>
        <p role="status" className="mt-3 text-xs font-medium text-slate-600">Showing {records.length} of {majorProjects.length} sourced records</p>
      </div>
      <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-3">
        {records.map((record) => (
          <TransportSection key={record.id} id={"project-" + record.id} title={record.name} source={{ ...record.source, basis: record.stage }}>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              <span className={`rounded-full px-2.5 py-1 ${stages[record.stage]}`}>{record.stage}</span>
              <span>{record.location}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">{record.summary}</p>
            {record.measure && <TransportValues items={[record.measure]} />}
          </TransportSection>
        ))}
      </div>
    </section>
  );
}
