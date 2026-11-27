import Link from "next/link";
import { ArrowRight, TrendingUp, TriangleAlert } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { statewideDistrictFindings, type DistrictBar, type DistrictFinding } from "@/data/districtBriefing";
import styles from "./DistrictBriefing.module.css";

const numbers = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export function DistrictMiniBars({ rows, unit, maximum, label }: { rows: readonly DistrictBar[]; unit?: DistrictFinding["unit"] | "km" | "homes"; maximum?: number; label: string }) {
  const scale = maximum ?? Math.max(1, ...rows.map((row) => row.value));
  return (
    <ul aria-label={label} className={styles.chart}>
      {rows.map(({ label, value, href, reference }) => (
        <li key={label} className={styles.barRow}>
          {href ? <Link href={href} className={styles.rowLink}>{label}</Link> : <span>{label}</span>}
          <strong>{unit === "₹" && "₹"}{numbers.format(value)}{unit === "%" ? "%" : unit && unit !== "₹" ? ` ${unit}` : ""}</strong>
          <span className={styles.track} aria-hidden="true">
            <span className={reference ? styles.reference : undefined} style={{ width: `${value / scale * 100}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function FindingCard({ finding }: { finding: DistrictFinding }) {
  return (
    <article id={finding.id} className={styles.finding}>
      <header>
        <div><h3>{finding.title}</h3><p>{finding.period}</p></div>
        <CmSourceDetails label={`${finding.title} source`} sources={[finding.source]} />
      </header>
      {finding.metric && <strong className={styles.metric}>{finding.metric}</strong>}
      <DistrictMiniBars rows={finding.rows} unit={finding.unit} maximum={finding.maximum} label={`${finding.title} figures`} />
      <p className={styles.context}>{finding.detail}</p>
      {finding.link && <Link className={styles.link} href={finding.link.href}>{finding.link.label}<ArrowRight size={14} aria-hidden="true" /></Link>}
    </article>
  );
}

export function DistrictBriefing({ attention, economy }: { attention: DistrictFinding[]; economy: DistrictFinding }) {
  return (
    <div id="district-briefing" className={styles.briefing}>
      <section className={`${styles.group} ${styles.attention}`} aria-labelledby="district-attention-heading">
        <h2 id="district-attention-heading"><TriangleAlert size={17} aria-hidden="true" /> What needs attention</h2>
        <div className={styles.attentionCards}>{attention.map((finding) => <FindingCard key={finding.id} finding={finding} />)}</div>
      </section>
      <section className={`${styles.group} ${styles.improving}`} aria-labelledby="district-growth-heading">
        <h2 id="district-growth-heading"><TrendingUp size={17} aria-hidden="true" /> What’s improving</h2>
        <FindingCard finding={economy} />
      </section>
    </div>
  );
}

export function DistrictStatewideBriefing() {
  const { water, ekyc, economy } = statewideDistrictFindings;
  return <DistrictBriefing attention={[water, ekyc]} economy={economy} />;
}
