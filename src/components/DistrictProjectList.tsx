import Link from "next/link";
import { ArrowRight, ChevronDown, Construction } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { DistrictMiniBars } from "@/components/DistrictBriefing";
import { isOngoingDistrictProject, type MajorProject } from "@/data/majorProjectsActuals";
import styles from "./DistrictBriefing.module.css";

function ProjectCards({ projects }: { projects: MajorProject[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id} className={`${styles.projectCard} flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm`}>
          <header className="flex items-start justify-between gap-2">
            <div>
              <p className="inline-block rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-extrabold text-sky-900">{project.historical ? "Earlier progress report" : project.stage}</p>
              <h3 className="mt-1.5 text-sm font-extrabold leading-tight text-slate-900">{project.name}</h3>
            </div>
            <CmSourceDetails label={`${project.name} source`} sources={[project.source]} />
          </header>
          <p className="text-xs font-medium text-slate-600">{project.location} · {project.source.period}</p>
          <p className="text-sm leading-snug text-slate-700">{project.summary}</p>
          {project.measure && (
            <p className="rounded-lg bg-slate-100 px-2.5 py-2 text-xs text-slate-700"><strong className="font-extrabold text-slate-900">{project.measure.value}</strong> {project.measure.label}</p>
          )}
          {project.progress && project.progress.length > 0 && (
            <DistrictMiniBars rows={project.progress.map(({ label, percent }) => ({ label, value: percent }))} unit="%" maximum={100} label={`${project.name} reported progress`} />
          )}
          <Link href={`/projects#project-${project.id}`} className={styles.link} aria-label={`Project record for ${project.name}`}>
            Project record <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function DistrictProjectList({ name, projects }: { name: string; projects: MajorProject[] }) {
  const underway = projects.filter(isOngoingDistrictProject);
  const approved = projects.filter(({ stage }) => stage === "Contract awarded" || stage === "Sanctioned");
  const delivered = projects.filter(({ stage }) => stage === "Completed" || stage === "Operational");
  const historical = projects.filter((project) => project.historical);

  return (
    <section id="district-projects" className="scroll-mt-20 space-y-3" aria-labelledby="district-projects-heading">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="district-projects-heading" className="flex items-center gap-2 text-lg font-extrabold text-slate-900"><Construction size={19} className="text-teal-800" aria-hidden="true" /> Ongoing major projects</h2>
        <Link href="/projects#project-records" className={styles.link}>State project register <ArrowRight size={14} aria-hidden="true" /></Link>
      </header>
      {underway.length > 0 ? <ProjectCards projects={underway} /> : (
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">The register has no verified in-progress record for {name} in this update.</p>
      )}
      {[
        { label: "Sanctioned and awarded projects", records: approved },
        { label: "Completed and operational projects", records: delivered },
        { label: "Earlier progress reports", records: historical },
      ].map(({ label, records }) => records.length > 0 && (
        <details key={label} className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            <ChevronDown size={15} aria-hidden="true" /> {label} ({records.length})
          </summary>
          <ProjectCards projects={records} />
        </details>
      ))}
    </section>
  );
}
