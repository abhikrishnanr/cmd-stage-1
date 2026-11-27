import type { MouseEvent, ReactNode } from "react";
import { ArrowRight, ChevronDown, TriangleAlert } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { DistrictMiniBars } from "@/components/DistrictBriefing";
import { majorProjectAttention } from "@/data/majorProjectAttention";
import { majorProjects, type MajorProject } from "@/data/majorProjectsActuals";
import { majorProjectSchedules, type MajorProjectSchedule } from "@/data/majorProjectSchedule";
import styles from "./MajorProjectRegister.module.css";

const reportedSchedules = majorProjects.flatMap((project) => {
  const schedule = majorProjectSchedules[project.id];
  return schedule ? [{ project, schedule }] : [];
}).sort((a, b) => b.schedule.delayMonths - a.schedule.delayMonths);

const issues = majorProjectAttention.flatMap((issue) => {
  const project = majorProjects.find(({ id }) => id === issue.projectId);
  return project ? [{ project, issue }] : [];
});

export function ProjectScheduleDates({ schedule }: { schedule: MajorProjectSchedule }) {
  return (
    <dl className={styles.dates}>
      <div><dt>Original target</dt><dd>{schedule.baseline}</dd></div>
      <div><dt>Revised target</dt><dd>{schedule.revised}</dd></div>
    </dl>
  );
}

export function ProjectProgress({ project }: { project: MajorProject }) {
  if (!project.progress?.length) return null;
  return <DistrictMiniBars rows={project.progress.map(({ label, percent }) => ({ label, value: percent }))} unit="%" maximum={100} label={`${project.name} reported progress`} />;
}

function ProjectAnchor({ projectId, reveal }: { projectId: string; reveal: (id: string) => void }) {
  function follow(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) reveal(projectId);
  }

  return <a href={`#project-${projectId}`} onClick={follow} className={styles.link}>Project record <ArrowRight size={14} aria-hidden="true" /></a>;
}

function MoreFindings({ count, label, children }: { count: number; label: string; children: ReactNode }) {
  return (
    <details className={styles.more}>
      <summary><ChevronDown size={15} aria-hidden="true" /><span className={styles.showMore}>Show {count} more {label}</span><span className={styles.showFewer}>Show fewer {label}</span></summary>
      {children}
    </details>
  );
}

export function MajorProjectAttention({ reveal }: { reveal: (id: string) => void }) {
  const delayCards = reportedSchedules.map(({ project, schedule }) => (
    <article key={project.id} className={`${styles.item} ${styles.delayCard}`}>
      <header>
        <div><p className={styles.meta}>{project.location} · {schedule.source.period}</p><h4>{project.name}</h4></div>
        <CmSourceDetails label={`${project.name} schedule source`} sources={[schedule.source]} />
      </header>
      <strong className={styles.value}>{schedule.delayMonths} months added to schedule</strong>
      <ProjectScheduleDates schedule={schedule} />
      <ProjectProgress project={project} />
      <ProjectAnchor projectId={project.id} reveal={reveal} />
    </article>
  ));
  const issueCards = issues.map(({ project, issue }) => (
    <article key={project.id} className={`${styles.item} ${styles.issueCard}`}>
      <header>
        <div><p className={styles.meta}>{project.location} · {issue.source.period}</p><h4>{issue.title}</h4></div>
        <CmSourceDetails label={`${issue.title} source`} sources={[issue.source]} />
      </header>
      <strong className={styles.value}>{issue.value}</strong>
      {issue.points ? <DistrictMiniBars rows={issue.points} unit={issue.unit} maximum={issue.unit === "%" ? 100 : undefined} label={`${issue.title} figures`} /> : <ProjectProgress project={project} />}
      <p className={styles.copy}>{issue.detail}</p>
      <ProjectAnchor projectId={project.id} reveal={reveal} />
    </article>
  ));

  return (
    <section id="project-attention" className={styles.attention} aria-labelledby="project-attention-heading">
      <header className={styles.heading}>
        <h2 id="project-attention-heading" className="flex items-center gap-2"><TriangleAlert className="text-amber-800" size={20} aria-hidden="true" /> What needs attention</h2>
        <a href="#project-records" className={styles.link}>Projects by district <ArrowRight size={14} aria-hidden="true" /></a>
      </header>
      <section className={styles.group} aria-labelledby="project-delays-heading">
        <header className={styles.heading}>
          <div><h3 id="project-delays-heading">Documented schedule delays</h3><p>{reportedSchedules.length} projects with a revised completion target in the October 2026 PAIMANA report. The difference is measured in calendar months.</p></div>
        </header>
        <div className={styles.cards}>{delayCards.slice(0, 3)}</div>
        {delayCards.length > 3 && <MoreFindings count={delayCards.length - 3} label="schedule changes"><div className={styles.cards}>{delayCards.slice(3)}</div></MoreFindings>}
      </section>
      <section className={styles.group} aria-labelledby="project-issues-heading">
        <header className={styles.heading}><h3 id="project-issues-heading">Reported delivery issues</h3></header>
        <div className={styles.cards}>{issueCards.slice(0, 3)}</div>
        {issueCards.length > 3 && <MoreFindings count={issueCards.length - 3} label="delivery issues"><div className={styles.cards}>{issueCards.slice(3)}</div></MoreFindings>}
      </section>
    </section>
  );
}
