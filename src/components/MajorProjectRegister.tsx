"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { MajorProjectAttention, ProjectProgress, ProjectScheduleDates } from "@/components/MajorProjectAttention";
import { slugify } from "@/data/districts";
import { isOngoingDistrictProject, majorProjects, majorProjectSectors, type MajorProject, type MajorProjectStage } from "@/data/majorProjectsActuals";
import { majorProjectSchedules } from "@/data/majorProjectSchedule";
import styles from "./MajorProjectRegister.module.css";

const stages: Record<MajorProjectStage, string> = {
  "Works in progress": "bg-blue-50 text-blue-900",
  "Contract awarded": "bg-violet-50 text-violet-900",
  Sanctioned: "bg-amber-50 text-amber-900",
  Operational: "bg-teal-50 text-teal-900",
  Completed: "bg-emerald-50 text-emerald-900",
};

const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600";
const stageOrder = Object.keys(stages);
const districts = [...new Set(majorProjects.flatMap(({ districts }) => districts ?? []))].sort((a, b) => a.localeCompare(b, "en-IN"));
const statewide = "Statewide and multi-district";
const blankFilters = { search: "", district: "", sector: "", stage: "" };

function ProjectRecord({ project }: { project: MajorProject }) {
  const schedule = majorProjectSchedules[project.id];

  return (
    <article id={`project-${project.id}`} className={styles.item}>
      <header>
        <div>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-extrabold ${project.historical ? "bg-slate-100 text-slate-700" : stages[project.stage]}`}>{project.historical ? "Earlier progress report" : project.stage}</span>
          <h4>{project.name}</h4>
        </div>
        <CmSourceDetails label={`${project.name} source`} sources={[project.source]} />
      </header>
      <p className={styles.meta}>{project.location} · {project.sector} · {project.source.period}</p>
      <p className={styles.copy}>{project.summary}</p>
      <ProjectProgress project={project} />
      {project.measure && <p className={styles.measure}><strong>{project.measure.value}</strong> · {project.measure.label}</p>}
      {schedule && (
        <div className={styles.schedule}>
          <header>
            <strong>{schedule.delayMonths} months added to schedule</strong>
            <CmSourceDetails label={`${project.name} schedule evidence`} sources={[schedule.source]} />
          </header>
          <ProjectScheduleDates schedule={schedule} />
        </div>
      )}
    </article>
  );
}

export default function MajorProjectRegister() {
  const [filters, setFilters] = useState(blankFilters);
  const term = filters.search.trim().toLocaleLowerCase("en-IN");
  const records = majorProjects.filter((record) =>
    (!filters.district || (filters.district === statewide ? record.districts?.length !== 1 : record.districts?.includes(filters.district))) &&
    (!filters.sector || record.sector === filters.sector) &&
    (!filters.stage || (record.stage === filters.stage && !record.historical)) &&
    (!term || `${record.name} ${record.location} ${record.districts?.join(" ") ?? ""} ${record.summary}`.toLocaleLowerCase("en-IN").includes(term)),
  );

  const ongoing = records.filter(isOngoingDistrictProject);
  const groups = [...districts, statewide].map((name) => ({
    name,
    projects: ongoing.filter((project) => (project.districts?.length === 1 ? project.districts[0] : statewide) === name),
  })).filter(({ projects }) => projects.length > 0);
  const other = records.filter((project) => !isOngoingDistrictProject(project)).sort((a, b) => Number(!!a.historical) - Number(!!b.historical) || stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage));
  const hasFilters = Object.values(filters).some(Boolean);

  function setFilter(key: keyof typeof blankFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function reveal(id: string) {
    if (records.some((record) => record.id === id)) return;
    setFilters(blankFilters);
    window.requestAnimationFrame(() => document.getElementById(`project-${id}`)?.scrollIntoView({ block: "start" }));
  }

  return (
    <>
      <MajorProjectAttention reveal={reveal} />
      <section id="project-records" className="scroll-mt-20 space-y-3" aria-labelledby="projects-register-heading">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <header className={styles.heading}>
            <div>
              <h2 id="projects-register-heading">Projects by district</h2>
              <p>Ongoing projects first. Sanctions, awards, completed works and earlier reports appear below.</p>
            </div>
            {hasFilters && <button type="button" className={styles.link} onClick={() => setFilters(blankFilters)}>Clear filters</button>}
          </header>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.35fr_1fr_1fr_1fr]">
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">Search by project or district
              <input type="search" value={filters.search} className={field} onChange={(event) => setFilter("search", event.target.value)} />
            </label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">District
              <select className={field} value={filters.district} onChange={(event) => setFilter("district", event.target.value)}>
                <option value="">All districts</option>
                {districts.map((name) => <option key={name}>{name}</option>)}
                <option>{statewide}</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">Sector
              <select className={field} value={filters.sector} onChange={(event) => setFilter("sector", event.target.value)}>
                <option value="">All sectors</option>
                {majorProjectSectors.map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-bold text-slate-700">Reported stage
              <select className={field} value={filters.stage} onChange={(event) => setFilter("stage", event.target.value)}>
                <option value="">All stages</option>
                {stageOrder.map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
          </div>
          <p role="status" className="mt-3 text-xs font-medium text-slate-600">Showing {records.length} of {majorProjects.length} sourced records · {ongoing.length} ongoing</p>
        </div>
        {groups.map(({ name, projects }) => (
          <section key={name} className={styles.districtGroup} aria-label={`${name} ongoing projects`}>
            <header>
              <div className="flex flex-wrap items-center gap-2"><h3>{name}</h3><span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-700">{projects.length} ongoing</span></div>
              {name !== statewide && <Link href={`/districts/${slugify(name)}#district-projects`} className={styles.link} aria-label={`Open ${name} district projects`}>District projects <ArrowUpRight size={13} aria-hidden="true" /></Link>}
            </header>
            <div className={styles.cards}>{projects.map((project) => <ProjectRecord key={project.id} project={project} />)}</div>
          </section>
        ))}
        {other.length > 0 && (
          <section className={styles.group} aria-labelledby="other-project-records-heading">
            <header className={styles.heading}><h3 id="other-project-records-heading">Other project records</h3></header>
            <div className={styles.cards}>{other.map((project) => <ProjectRecord key={project.id} project={project} />)}</div>
          </section>
        )}
        {records.length === 0 && <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">No projects match these filters.</p>}
      </section>
    </>
  );
}
