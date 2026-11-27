import Link from "next/link";
import { ArrowRight, ChevronDown, TrendingUp, TriangleAlert } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { educationFindings } from "@/data/cmDepartmentEducationFindings";
import type { CmDepartmentFinding } from "@/data/cmDepartmentFinding";
import { healthFindings } from "@/data/cmDepartmentHealthFindings";
import { worksFindings } from "@/data/cmDepartmentWorksFindings";
import styles from "./CmDepartmentBriefing.module.css";

const findings: readonly CmDepartmentFinding[] = [...healthFindings, ...educationFindings, ...worksFindings];
const groups = [
  { tone: "improving", title: "What’s improving", Icon: TrendingUp },
  { tone: "attention", title: "What needs attention", Icon: TriangleAlert },
] as const;
const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

function BriefingChart({ finding }: { finding: CmDepartmentFinding }) {
  const minimum = Math.min(0, ...finding.points.map(({ value }) => value));
  const maximum = Math.max(0, ...finding.points.map(({ value }) => value));
  const range = maximum - minimum || 1;

  return (
    <ul className={styles.chart} aria-label={`${finding.title} figures`}>
      {finding.points.map(({ label, value }) => (
        <li className={styles.observation} key={label}>
          <span>{label}</span>
          <strong>{number.format(value)}{finding.unit && (finding.unit === "%" ? "%" : ` ${finding.unit}`)}</strong>
          <span className={styles.track} aria-hidden="true">
            <span style={{ left: `${(Math.min(0, value) - minimum) / range * 100}%`, width: `${Math.abs(value) / range * 100}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function BriefingCard({ finding }: { finding: CmDepartmentFinding }) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <div><p className={styles.department}>{finding.department}</p><h4>{finding.title}</h4></div>
        <CmSourceDetails label={`${finding.department} briefing sources`} sources={finding.sources} />
      </header>
      <div className={styles.headline}>
        <strong>{finding.metric}</strong>
        <p>{finding.period}</p>
      </div>
      <BriefingChart finding={finding} />
      <p className={styles.context}>{finding.summary}</p>
      <Link href={finding.href} className={styles.link} aria-label={`${finding.department} detailed figures`}>
        Detailed figures <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}

export function CmDepartmentBriefing() {
  return (
    <section id="department-briefing" className={styles.section} aria-labelledby="department-briefing-title">
      <header className={styles.heading}>
        <h2 id="department-briefing-title">Department briefing</h2>
        <Link className={styles.link} href="/sectors">All department dashboards <ArrowRight size={15} aria-hidden="true" /></Link>
      </header>
      <div className={styles.groups}>
        {groups.map(({ tone, title, Icon }) => {
          const items = findings.filter((finding) => finding.tone === tone);
          const featured = [...items.filter((finding) => finding.featured), ...items.filter((finding) => !finding.featured)].slice(0, 2);
          const others = items.filter((finding) => !featured.includes(finding));

          return (
            <section key={tone} className={`${styles.group} ${styles[tone]}`} aria-labelledby={`department-briefing-${tone}`}>
              <h3 id={`department-briefing-${tone}`} className={styles.groupTitle}><Icon size={18} aria-hidden="true" />{title}</h3>
              <div className={styles.cards}>
                {featured.map((finding) => <BriefingCard key={finding.department} finding={finding} />)}
              </div>
              {others.length > 0 && (
                <details className={styles.more}>
                  <summary>
                    <ChevronDown size={15} aria-hidden="true" />
                    <span className={styles.showMore}>{`Show ${others.length} more ${tone === "improving" ? "improvements" : "findings for review"}`}</span>
                    <span className={styles.showLess}>{`Show fewer ${tone === "improving" ? "improvements" : "findings for review"}`}</span>
                  </summary>
                  <div className={styles.cards}>
                    {others.map((finding) => <BriefingCard key={finding.department} finding={finding} />)}
                  </div>
                </details>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
