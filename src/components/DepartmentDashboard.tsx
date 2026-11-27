import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowDownRight, Layers3, TriangleAlert } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import type { DataProvenance } from "@/components/DataProvenance";
import { Icon } from "@/components/primitives";
import { TransportBars, TransportTable } from "@/components/TransportReport";
import styles from "./DepartmentDashboard.module.css";

export type DepartmentSource = DataProvenance & { url: string; period: string };
type ChartRow = { label: string; value: number; color?: string };

type Measure = { label: string; value: string; source: DepartmentSource; note?: string; featured?: boolean };

type Attention = {
  title: string;
  value: string;
  detail: string;
  sources: readonly DepartmentSource[];
  section: string;
};

type Chart = {
  id: string;
  title: string;
  period: string;
  sources: readonly DepartmentSource[];
  kind?: "rank" | "trend" | "composition";
  color?: string;
  unit?: string;
  rows: readonly ChartRow[];
  note?: string;
  details?: { columns: string[]; rows: (string | number)[][] };
};

export type DepartmentDashboardData = {
  title: string;
  description: string;
  icon: string;
  accent: string;
  measures: readonly Measure[];
  attention: readonly Attention[];
  charts: readonly Chart[];
};

const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const palette = ["#126b68", "#325995", "#9b5d16", "#6d4b99", "#a83c62", "#4d782f"];

function format(value: number, unit?: string) {
  return `${number.format(value)}${unit ? `${unit === "%" ? "" : " "}${unit}` : ""}`;
}

export function DepartmentDashboard({ data }: { data: DepartmentDashboardData }) {
  const sources = Array.from(new Map(
    [...data.measures.map(({ source }) => source), ...data.charts.flatMap(({ sources }) => sources), ...data.attention.flatMap(({ sources }) => sources)]
      .map((source) => [`${source.url}|${source.dataset}|${source.period}`, source]),
  ).values());

  return (
    <div className={styles.page} style={{ "--department-accent": data.accent } as CSSProperties}>
      <header className={styles.hero}>
        <div className={styles.heading}>
          <span className={styles.badge}><Icon name={data.icon} size={27} /></span>
          <div><h1 className="display">{data.title}</h1><p>{data.description}</p></div>
          <CmSourceDetails sources={sources} label={`${data.title} sources`} inverted />
        </div>
        <div className={styles.metrics}>
          {data.measures.map(({ label, value, source, note, featured }) => (
            <article className={styles.metric} data-featured={featured || undefined} key={label}>
              <header><h2>{label}</h2><CmSourceDetails sources={[source]} label={`${label} source`} inverted /></header>
              <strong>{value}</strong>
              <p>{note ?? source.period}</p>
            </article>
          ))}
        </div>
      </header>

      <nav className={styles.links} aria-label={`${data.title} sections`}>
        {data.attention.length > 0 && <a href="#department-attention">What needs attention</a>}
        {data.charts.map(({ id, title }) => <a href={`#${id}`} key={id}>{title}</a>)}
        <Link href="/sectors">All sectors <Layers3 size={13} aria-hidden="true" /></Link>
      </nav>

      {data.attention.length > 0 && (
        <section id="department-attention" className={styles.attention}>
          <h2><TriangleAlert size={18} aria-hidden="true" /> What needs attention</h2>
          <div className={styles.attentionGrid}>
            {data.attention.map(({ title, value, detail, sources, section }) => (
              <article className={styles.signal} key={title}>
                <header><h3>{title}</h3><CmSourceDetails label={`${title} sources`} sources={sources} /></header>
                <strong>{value}</strong>
                <p>{detail}</p>
                <a href={`#${section}`}>See figures <ArrowDownRight size={13} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className={styles.charts}>
        {data.charts.map((chart) => <ChartCard chart={chart} key={chart.id} />)}
      </div>
    </div>
  );
}

function ChartCard({ chart }: { chart: Chart }) {
  const color = chart.color ?? "var(--department-accent)";
  return (
    <section id={chart.id} className={styles.card}>
      <header>
        <div><h2>{chart.title}</h2><p>{chart.period}</p></div>
        <CmSourceDetails label={`${chart.title} sources`} sources={chart.sources} />
      </header>
      {chart.kind === "trend" ? <Trend chart={chart} color={color} />
        : chart.kind === "composition" ? <Composition chart={chart} />
          : <TransportBars items={chart.rows.map((row) => ({ ...row }))} unit={chart.unit} color={color} />}
      {chart.note && <p className={styles.note}>{chart.note}</p>}
      {chart.details && (
        <details className={styles.details}>
          <summary>View exact figures</summary>
          <TransportTable label={chart.title} columns={chart.details.columns} rows={chart.details.rows} />
        </details>
      )}
    </section>
  );
}

function Trend({ chart, color }: { chart: Chart; color: string }) {
  const maximum = Math.max(1, ...chart.rows.map(({ value }) => value));
  return (
    <figure className={styles.trendScroll} aria-label={chart.title}>
      <ol className={styles.trend} style={{ gridTemplateColumns: `repeat(${chart.rows.length}, minmax(3.7rem, 1fr))` }}>
        {chart.rows.map(({ label, value, color: fill }) => (
          <li key={label}>
            <div className={styles.column} aria-hidden="true"><span style={{ height: `${100 * value / maximum}%`, background: fill ?? color }} /></div>
            <strong>{format(value, chart.unit)}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Composition({ chart }: { chart: Chart }) {
  const total = chart.rows.reduce((sum, { value }) => sum + value, 0);
  const rows = chart.rows.map((row, index) => ({ ...row, color: row.color ?? palette[index % palette.length] }));
  let offset = 0;
  const stops = rows.map(({ color, value }) => {
    const from = offset / total * 100;
    offset += value;
    return `${color} ${from}% ${offset / total * 100}%`;
  });

  return (
    <figure className={styles.composition} aria-label={chart.title}>
      <div className={styles.donut} style={{ backgroundImage: `conic-gradient(${stops.join(", ")})` }} aria-hidden="true">
        <span><strong>{format(total, chart.unit)}</strong><small>Total reported</small></span>
      </div>
      <ul className={styles.legend}>
        {rows.map(({ label, value, color }) => (
          <li key={label}><i style={{ background: color }} aria-hidden="true" /><span>{label}</span><strong>{format(value, chart.unit)}</strong></li>
        ))}
      </ul>
    </figure>
  );
}
