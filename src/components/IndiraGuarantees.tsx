import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, BusFront, Check, HandHeart } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { Icon } from "@/components/primitives";
import {
  indiraGuarantees, indiraProgressSource, indiraStages, priyadarshiniUsage, type IndiraGuarantee,
} from "@/data/indiraTracker";
import styles from "./IndiraGuarantees.module.css";

const number = new Intl.NumberFormat("en-IN");

function Progress({ guarantee }: { guarantee: IndiraGuarantee }) {
  return (
    <div className={styles.progress}>
      <div><span>Implementation progress</span><strong>{guarantee.progress}%</strong></div>
      <div className={styles.meter} role="meter" aria-label={guarantee.title + " implementation progress"}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={guarantee.progress}>
        <span style={{ width: `${guarantee.progress}%` }} />
      </div>
    </div>
  );
}

function Milestone({ milestone }: { milestone: NonNullable<IndiraGuarantee["milestone"]> }) {
  return (
    <div className={styles.milestone}>
      <Check size={15} aria-hidden="true" />
      <span>{milestone.label}</span>
      <time dateTime={milestone.date}>{milestone.dateLabel}</time>
    </div>
  );
}

function Status({ progress }: { progress: IndiraGuarantee["progress"] }) {
  return <span className={styles.status} data-progress={progress}>{indiraStages[progress]}</span>;
}

function cardStyle(guarantee: IndiraGuarantee): CSSProperties {
  return {
    "--accent": guarantee.color,
    "--photo": `url("/img/heroes/${guarantee.slug}.jpg")`,
  } as CSSProperties;
}

function GuaranteeCard({ guarantee }: { guarantee: IndiraGuarantee }) {
  return (
    <article className={styles.card} style={cardStyle(guarantee)}>
      <div className={styles.art}>
        <span className={styles.icon}><Icon name={guarantee.icon} size={23} /></span>
      </div>
      <div className={styles.cardBody}>
        <header className={styles.cardTitle}>
          <div><h3>{guarantee.title}</h3><Status progress={guarantee.progress} /></div>
          <CmSourceDetails sources={[indiraProgressSource, guarantee.evidence]} label={guarantee.title + " sources"} />
        </header>
        <p>{guarantee.detail}</p>
        <Progress guarantee={guarantee} />
        {guarantee.milestone && <Milestone milestone={guarantee.milestone} />}
        <Link className={styles.cardLink} href={`/indira/${guarantee.slug}`} aria-label={`Open ${guarantee.title} details`}>
          Open guarantee <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function PriyadarshiniChart() {
  return (
    <section className={styles.usage} aria-labelledby="priyadarshini-usage">
      <header className={styles.usageHeader}>
        <span className={styles.icon}><BusFront size={21} aria-hidden="true" /></span>
        <div><h2 id="priyadarshini-usage">Priyadarshini ridership</h2><p>First 100 days · {priyadarshiniUsage.source.period}</p></div>
        <CmSourceDetails sources={[priyadarshiniUsage.source]} label="Ridership source" />
      </header>
      <div className={styles.usageBody}>
        <div className={styles.total}>
          <p><strong>{number.format(priyadarshiniUsage.totalTrips)}</strong> free trips</p>
          <span>{priyadarshiniUsage.districts} districts · {priyadarshiniUsage.reportingUnits} reporting units</span>
        </div>
        <figure className={styles.chart}>
          <figcaption>Average free trips per day (lakh)</figcaption>
          <ul className={styles.bars} aria-label="Reported daily free trips by period">
            {priyadarshiniUsage.averages.map((row) => (
              <li key={row.period}>
                <span>{row.period}</span>
                <span className={styles.barTrack} aria-hidden="true"><span style={{ width: `${100 * row.lakhsPerDay / 15}%` }} /></span>
                <strong>{row.lakhsPerDay.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </figure>
      </div>
      <p className={styles.usageNote}><strong>What to watch</strong> · Daily trips dipped to 12.00 lakh in August, then reached 13.70 lakh over 1–22 September. Counts include repeat journeys.</p>
    </section>
  );
}

export function IndiraGuaranteesOverview() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="hero-grid" aria-hidden="true" />
        <div className={styles.heroCopy}>
          <div className={styles.heroTop}>
            <span className={styles.heroIcon}><HandHeart size={25} aria-hidden="true" /></span>
            <div><h1>Indira Guarantees</h1><p>Implementation tracker · 27 Nov 2026</p></div>
            <CmSourceDetails sources={[indiraProgressSource]} label="Implementation tracker source" inverted />
          </div>
          <dl className={styles.summary} aria-label="Guarantees by implementation stage">
            {([100, 50, 0] as const).map((stage) => (
              <div key={stage}><dt>{indiraStages[stage]}</dt><dd>{indiraGuarantees.filter((item) => item.progress === stage).length}</dd></div>
            ))}
          </dl>
        </div>
      </header>
      <section aria-labelledby="six-guarantees">
        <h2 id="six-guarantees" className={styles.sectionTitle}>Six priority guarantees</h2>
        <div className={styles.cards}>{indiraGuarantees.map((guarantee) => <GuaranteeCard key={guarantee.slug} guarantee={guarantee} />)}</div>
      </section>
      <PriyadarshiniChart />
    </div>
  );
}

export function IndiraGuaranteeDetail({ guarantee }: { guarantee: IndiraGuarantee }) {
  return (
    <div className={styles.page}>
      <Link href="/indira" className={styles.back}><ArrowLeft size={16} aria-hidden="true" /> All Indira Guarantees</Link>
      <section className={`${styles.card} ${styles.detailCard}`} style={cardStyle(guarantee)}>
        <div className={styles.art}><span className={styles.icon}><Icon name={guarantee.icon} size={26} /></span></div>
        <div className={styles.cardBody}>
          <header className={styles.cardTitle}>
            <div><h1>{guarantee.title}</h1><Status progress={guarantee.progress} /></div>
            <CmSourceDetails sources={[indiraProgressSource, guarantee.evidence]} label={guarantee.title + " sources"} />
          </header>
          <p>{guarantee.detail}</p>
          <Progress guarantee={guarantee} />
          {guarantee.milestone && <Milestone milestone={guarantee.milestone} />}
        </div>
      </section>
      {guarantee.slug === "free-ksrtc-travel" && <PriyadarshiniChart />}
    </div>
  );
}
