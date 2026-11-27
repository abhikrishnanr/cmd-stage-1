import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, BriefcaseBusiness, ClipboardCheck, Zap, type LucideIcon } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import type { DataProvenance } from "@/components/DataProvenance";
import { programmeMonitor, programmeProgress } from "@/data/deliveryActuals";
import { unemploymentComparisonSource, youngWomenUnemployment, youthUnemployment } from "@/data/employmentCommand";
import { powerSupplyMonths } from "@/data/power";
import { getProgrammeTotals, programmeDashboardApiUrl } from "@/lib/programmeDelivery";
import styles from "./CmDecisionSignals.module.css";

const integer = new Intl.NumberFormat("en-IN");
const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const checkedDate = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

function SignalCard({ title, period, tone, icon: Icon, sources, href, linkLabel, children }: {
  title: string;
  period: string;
  tone: "jobs" | "power" | "delivery";
  icon: LucideIcon;
  sources: readonly DataProvenance[];
  href: string;
  linkLabel: string;
  children: ReactNode;
}) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <header className={styles.cardHeader}>
        <span className={styles.icon}><Icon size={18} aria-hidden="true" /></span>
        <div><h3>{title}</h3><p>{period}</p></div>
        <CmSourceDetails sources={sources} label={`${title} sources`} />
      </header>
      {children}
      <Link href={href} className={styles.cardLink}>{linkLabel}<ArrowRight size={14} aria-hidden="true" /></Link>
    </article>
  );
}

function RateBar({ label, value, tone = "accent" }: { label: string; value: number; tone?: "accent" | "reference" }) {
  return (
    <div className={styles.rate}>
      <div><span>{label}</span><strong>{decimal.format(value)}%</strong></div>
      <span className={styles.track} aria-hidden="true"><span className={styles[tone]} style={{ width: `${value}%` }} /></span>
    </div>
  );
}

function YouthSignal() {
  return (
    <SignalCard title="Youth employment" period={unemploymentComparisonSource.period} tone="jobs" icon={BriefcaseBusiness} sources={[unemploymentComparisonSource]} href="/employment" linkLabel="Compare age groups and states">
      <div className={styles.finding}>
        <strong>{decimal.format(youthUnemployment.kerala - youthUnemployment.india)} pp</strong>
        <span>above the India youth unemployment rate</span>
      </div>
      <div className={styles.graph} aria-label="Youth unemployment rate by geography">
        <RateBar label="Kerala · ages 15–29" value={youthUnemployment.kerala} />
        <RateBar label="India · ages 15–29" value={youthUnemployment.india} tone="reference" />
      </div>
      <p className={styles.context}>Review barriers to work for young women. Their unemployment rate was {decimal.format(youngWomenUnemployment.kerala)}% in Kerala and {decimal.format(youngWomenUnemployment.india)}% across India.</p>
    </SignalCard>
  );
}

function PowerSignal() {
  const [before, latest] = powerSupplyMonths.slice(-2);
  return (
    <SignalCard title="Power supply" period={`${before.label} → ${latest.label}`} tone="power" icon={Zap} sources={[latest.peakSource, latest.energySource, before.peakSource, before.energySource]} href="/power" linkLabel="Open demand and supply detail">
      <div className={styles.finding}>
        <strong>{integer.format(latest.peakUnmetMw)} MW</strong>
        <span>unmet peak demand in {latest.label}</span>
      </div>
      <dl className={styles.movements}>
        <div><dt>Peak shortfall (MW)</dt><dd className={styles.up}><ArrowUp size={15} aria-label="Increased" />{integer.format(before.peakUnmetMw)} → {integer.format(latest.peakUnmetMw)}</dd></div>
        <div><dt>Energy shortfall (MU)</dt><dd className={styles.down}><ArrowDown size={15} aria-label="Decreased" />{integer.format(before.energyUnservedMu)} → {integer.format(latest.energyUnservedMu)}</dd></div>
      </dl>
      <p className={styles.context}>Review peak-hour constraints. The peak gap widened as the monthly energy shortfall fell.</p>
    </SignalCard>
  );
}

function ProgrammeSignal({ totals, checkedAt }: { totals: typeof programmeProgress; checkedAt: string | null }) {
  const awaiting = totals.indicators - totals.verifiedIndicators;
  const remaining = totals.projects - totals.completed;
  const completedRate = totals.completed / totals.projects * 100;
  const checked = checkedAt ? `${checkedDate.format(new Date(checkedAt))} IST` : "27 Nov 2026 snapshot";
  const source = {
    ...programmeMonitor,
    dataset: "100 Days Programme totals API",
    url: programmeDashboardApiUrl,
    sourceUpdatedAt: null,
    fetchedAt: checked,
    note: undefined,
  };

  return (
    <SignalCard title="Programme delivery" period="100 Days Programme · 1 Jul–9 Oct 2026" tone="delivery" icon={ClipboardCheck} sources={[source]} href="/delivery-rag#department-follow-up" linkLabel="Check department follow-up">
      <div className={styles.finding}>
        <strong>{decimal.format(completedRate)}%</strong>
        <span>of registered projects reported complete</span>
      </div>
      <div className={styles.graph}>
        <div className={styles.rate}>
          <div><span>Completed</span><strong>{integer.format(totals.completed)} of {integer.format(totals.projects)}</strong></div>
          <span className={styles.track} aria-hidden="true"><span className={styles.accent} style={{ width: `${completedRate}%` }} /></span>
        </div>
      </div>
      <p className={styles.context}><strong>{integer.format(remaining)} projects</strong> remain open and <strong>{integer.format(awaiting)} indicators</strong> await verification. <span className={styles.checked}>Checked {checked}.</span></p>
    </SignalCard>
  );
}

async function CurrentProgrammeSignal() {
  const live = await getProgrammeTotals();
  return <ProgrammeSignal totals={live?.data ?? programmeProgress} checkedAt={live?.checkedAt ?? null} />;
}

export function CmDecisionSignals() {
  return (
    <section id="what-to-watch" className={styles.section} aria-labelledby="what-to-watch-title">
      <div className={styles.heading}>
        <h2 id="what-to-watch-title">What to watch</h2>
        <Link href="/cm-review">Open CM Review <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
      <div className={styles.grid}>
        <YouthSignal />
        <PowerSignal />
        <Suspense fallback={<ProgrammeSignal totals={programmeProgress} checkedAt={null} />}><CurrentProgrammeSignal /></Suspense>
      </div>
    </section>
  );
}
