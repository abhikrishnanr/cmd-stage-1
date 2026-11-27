import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ChevronDown } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { ProvenanceTooltip } from "@/components/DataProvenance";
import { Icon } from "@/components/primitives";
import { transportSourcesCheckedOn, type TransportSource } from "@/data/transportActuals";
import styles from "./TransportReport.module.css";

const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export function formatTransportNumber(value: number) {
  return number.format(value);
}

type LinkItem = { label: string; href: string };

export function TransportHeader({ title, description, sources, links, publicWorks = false, icon, sourceIcons = false }: {
  title: string;
  description: string;
  sources: TransportSource[];
  links: LinkItem[];
  publicWorks?: boolean;
  icon?: string;
  sourceIcons?: boolean;
}) {
  return (
    <header>
      <div className={`${publicWorks ? styles.worksHero : styles.hero} ${sourceIcons ? styles.heroWithSources : ""}`}>
        {sourceIcons && <div className={styles.heroSources}><CmSourceDetails label={`${title} sources`} sources={sources.map(checkedSource)} inverted /></div>}
        <span className={styles.heroIcon}><Icon name={icon ?? (publicWorks ? "Construction" : "Bus")} size={24} /></span>
        <h1>{title}</h1>
        <p>{description}</p>
        <span className={styles.checked}><CalendarDays size={14} aria-hidden="true" /> Sources checked <time dateTime="2026-11-27">{transportSourcesCheckedOn}</time></span>
        <nav className={styles.jumpLinks} aria-label={title + " sections"}>
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
      {!sourceIcons && <details className={styles.sources}>
        <summary>Original sources and reporting periods <ChevronDown size={15} aria-hidden="true" /></summary>
        <ul className={styles.sourceList}>
          {sources.map((source) => (
            <li key={source.dataset + source.period}>
              <TransportSourceLink source={source} />
              <span>{source.dataset} · {source.period}</span>
              {source.sourceUpdatedAt && <span>{source.sourceUpdatedAt}</span>}
            </li>
          ))}
        </ul>
      </details>}
    </header>
  );
}

function TransportSourceLink({ source }: { source: TransportSource }) {
  return <a className={styles.sourceLink} href={source.url} target="_blank" rel="noreferrer">{source.source} <ArrowUpRight size={13} aria-hidden="true" /></a>;
}

function checkedSource(source: TransportSource) {
  return { ...source, fetchedAt: source.fetchedAt ?? transportSourcesCheckedOn };
}

export type TransportMetricData = {
  label: string;
  value: string;
  source: TransportSource;
  color: "network" | "safety" | "service" | "water" | "works";
};

export function TransportMetrics({ metrics, sourceIcons = false }: { metrics: TransportMetricData[]; sourceIcons?: boolean }) {
  return (
    <div className={styles.metrics}>
      {metrics.map((metric) => (
        <article key={metric.label} className={styles.metric} data-color={metric.color}>
          <div className={styles.metricLabel}>
            <h2>{metric.label}</h2>
            {sourceIcons
              ? <CmSourceDetails label={`${metric.label} source`} sources={[checkedSource(metric.source)]} />
              : <ProvenanceTooltip provenance={{ ...metric.source, note: "Source checked " + transportSourcesCheckedOn }} />}
          </div>
          <strong>{metric.value}</strong>
          <span className={styles.metricPeriod}>{metric.source.period}</span>
          {!sourceIcons && <TransportSourceLink source={metric.source} />}
        </article>
      ))}
    </div>
  );
}

export function TransportSection({ id, title, source, children, sourceIcons = false }: {
  id?: string;
  title: string;
  source: TransportSource;
  children: ReactNode;
  sourceIcons?: boolean;
}) {
  return (
    <section className={styles.section} id={id}>
      <header className={styles.sectionHeader}>
        <div><h2>{title}</h2><p>{source.period}</p></div>
        {sourceIcons
          ? <CmSourceDetails label={`${title} source`} sources={[checkedSource(source)]} />
          : <ProvenanceTooltip provenance={{ ...source, note: "Source checked " + transportSourcesCheckedOn }} />}
      </header>
      {children}
      {!sourceIcons && <footer className={styles.sectionSource}><TransportSourceLink source={source} /></footer>}
    </section>
  );
}

type Bar = { label: string; value: number; color?: string };

export function TransportBars({ items, unit, color = "#2563eb" }: { items: Bar[]; unit?: string; color?: string }) {
  const maximum = Math.max(...items.map((item) => item.value));
  return (
    <ul className={styles.bars}>
      {items.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <strong>{formatTransportNumber(item.value)}{unit ? " " + unit : ""}</strong>
          <div aria-hidden="true" className={styles.barTrack}>
            <span style={{ width: (item.value / maximum) * 100 + "%", backgroundColor: item.color ?? color }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function TransportTable({ columns, rows, label }: { columns: string[]; rows: (string | number)[][]; label: string }) {
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table} aria-label={label}>
        <thead><tr>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>
          {rows.map(([first, ...values]) => (
            <tr key={first}>
              <th scope="row">{first}</th>
              {values.map((value, index) => <td key={columns[index + 1]}>{typeof value === "number" ? formatTransportNumber(value) : value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TransportValues({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className={styles.values}>
      {items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
    </dl>
  );
}
