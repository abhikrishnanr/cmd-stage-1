"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, BookOpen, ChevronDown, Database, Search } from "lucide-react";
import { ProvenanceTooltip, type DataProvenance } from "@/components/DataProvenance";
import { Icon } from "@/components/primitives";
import { cagMetric, type CagKeralaAccountsData } from "@/data/cagKeralaAccountsSnapshot";
import type { KeralaBudgetAtGlanceRow, KeralaBudgetDataMode, KeralaBudgetSourceMetadata } from "@/data/keralaBudgetSnapshot";
import { KERALA_STATUS_PAPER_UPDATED_AT, KERALA_STATUS_PAPER_URL, type StatusPaperMetric } from "@/data/keralaStatusPaperFinance";
import { useCagKeralaAccounts } from "@/hooks/useCagKeralaAccounts";
import styles from "./FiscalWorkspace.module.css";

export type FiscalSource = DataProvenance & { id: string; status?: string; workbookUrl?: string };
export type FiscalMetric = {
  label: string;
  value: number;
  source: FiscalSource;
  detail?: string;
  reference?: string;
  tone?: "teal" | "violet" | "blue" | "amber" | "rose";
  icon?: string;
};
export type FiscalHead = { id: string; label: string; actual: number | null; estimate: number };
type FiscalArea = "finance" | "revenue" | "budget";

const areas: Record<FiscalArea, string> = { finance: "Finance", revenue: "Revenue", budget: "Budget" };
const heroImages: Record<FiscalArea, string> = {
  finance: "/img/heroes/fiscal-finance.webp",
  revenue: "/img/heroes/fiscal-revenue.webp",
  budget: "/img/heroes/fiscal-budget.webp",
};
const amount = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const timestamp = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
});

export function crore(value: number) {
  return `${value < 0 ? "−" : ""}₹${amount.format(Math.abs(value))} cr`;
}

export function cagFiscalSource(data: CagKeralaAccountsData): FiscalSource {
  const { source } = data;
  return {
    id: "cag-kerala-accounts",
    source: "CAG Kerala",
    dataset: source.dataset,
    url: source.pageUrl,
    workbookUrl: source.workbookUrl,
    period: source.period,
    basis: "Unaudited provisional accounts",
    sourceUpdatedAt: source.sourceUpdatedAt,
    fetchedAt: `${timestamp.format(new Date(source.fetchedAt))} IST`,
    status: data.mode === "live" ? "Synced" : "Saved official copy",
  };
}

export function budgetFiscalSource(metadata: KeralaBudgetSourceMetadata, mode: KeralaBudgetDataMode): FiscalSource {
  return {
    id: metadata.id,
    source: "Kerala Budget Portal",
    dataset: metadata.dataset,
    url: metadata.url,
    period: metadata.period,
    basis: metadata.basis,
    sourceUpdatedAt: metadata.sourceUpdatedAt,
    fetchedAt: `${timestamp.format(new Date(metadata.fetchedAt))} IST`,
    status: mode === "live" ? "Synced" : "Saved official copy",
  };
}

export function statusPaperFiscalSource(metric?: StatusPaperMetric): FiscalSource {
  return {
    id: "kerala-status-paper",
    source: "Finance Department data",
    dataset: metric ? `Kerala’s Fiscal Health: A Status Report · p. ${metric.page}` : "Kerala’s Fiscal Health: A Status Report",
    url: metric ? `${KERALA_STATUS_PAPER_URL}#page=${metric.page}` : KERALA_STATUS_PAPER_URL,
    period: metric?.period,
    basis: metric?.basis,
    sourceUpdatedAt: KERALA_STATUS_PAPER_UPDATED_AT,
    note: metric?.note,
    status: "Published report",
  };
}

export function FiscalWorkspace({ section, title, description, sources, children }: {
  section: FiscalArea;
  title: string;
  description: string;
  sources: FiscalSource[];
  children: ReactNode;
}) {
  const primarySource = sources[0];
  return (
    <div className={styles.workspace} data-area={section}>
      <header className={styles.hero}>
        {/* Decorative generated artwork. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImages[section]} alt="" width={1600} height={533} className={styles.heroImage} />
        <div className={styles.heroInner}>
          <nav className={styles.tabs} aria-label="Fiscal pages">
            {Object.entries(areas).map(([area, label]) => (
              <Link key={area} href={`/${area}`} aria-current={area === section ? "page" : undefined}>{label}</Link>
            ))}
          </nav>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </header>
      <details id="fiscal-sources" className={styles.sourceDetails}>
        <summary>
          <span className={styles.sourceSummaryLabel}><Database size={15} aria-hidden="true" /> Sources &amp; update times</span>
          {primarySource && <span className={styles.sourceSummaryDate}>{primarySource.source} · {primarySource.status === "Synced" ? "Last synced" : "Snapshot checked"} {primarySource.fetchedAt}</span>}
          <ChevronDown size={16} className={styles.sourceChevron} aria-hidden="true" />
        </summary>
        <div className={styles.sources}>
        {sources.map((source) => (
          <article key={source.id} className={styles.sourceCard}>
            <div className={styles.sourceHeading}>
              <BookOpen size={15} aria-hidden="true" />
              {source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.source}<ArrowUpRight size={12} aria-hidden="true" /></a> : <strong>{source.source}</strong>}
              {source.status && <span className={styles.sourceStatus} data-live={source.status === "Synced"}>{source.status}</span>}
            </div>
            <p>{source.dataset}{source.workbookUrl && <> · <a href={source.workbookUrl} target="_blank" rel="noreferrer">Workbook ↗</a></>}</p>
            {source.period && <p>{source.period}</p>}
            {"sourceUpdatedAt" in source && <p><span>Source updated</span> {source.sourceUpdatedAt ?? "Not published"}</p>}
            {source.fetchedAt && <p><span>{source.status === "Synced" ? "Last synced" : "Snapshot checked"}</span> {source.fetchedAt}</p>}
          </article>
        ))}
        </div>
      </details>
      {children}
    </div>
  );
}

export function FiscalSection({ id, title, description, source, children, action, className = "" }: {
  id?: string;
  title: string;
  description?: string;
  source?: FiscalSource;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      <header className={styles.sectionHeader}>
        <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
        {(source || action) && (
          <div className={styles.sectionAction}>
            {action}
            {source?.url && <a href={source.url} target="_blank" rel="noreferrer" aria-label={`Open ${source.dataset ?? source.source}`}>Source <ArrowUpRight size={12} aria-hidden="true" /></a>}
            {source && <ProvenanceTooltip provenance={source} />}
          </div>
        )}
      </header>
      {children}
    </section>
  );
}

export function FiscalMetrics({ items }: { items: FiscalMetric[] }) {
  return (
    <div className={styles.metrics}>
      {items.map(({ label, value, source, detail, reference, tone = "teal", icon = "IndianRupee" }) => (
        <article key={label} className={styles.metric} data-tone={tone}>
          <div className={styles.metricTop}><span className={styles.metricIcon}><Icon name={icon} size={19} /></span><ProvenanceTooltip provenance={source} /></div>
          <h3>{label}</h3>
          <p className={styles.metricValue}>{crore(value)}</p>
          {detail && <p className={styles.metricDetail}>{detail}</p>}
          {reference && <p className={styles.metricReference}>{reference}</p>}
        </article>
      ))}
    </div>
  );
}

export function FiscalSummary() {
  const { data } = useCagKeralaAccounts();
  const source = cagFiscalSource(data);
  const definitions = [
    { id: "revenue-receipts", label: "Revenue receipts", icon: "Coins", tone: "teal" },
    { id: "total-expenditure", label: "Total expenditure", icon: "Banknote", tone: "violet" },
    { id: "fiscal-balance", label: "Fiscal balance", icon: "Scale", tone: "rose" },
  ] as const;
  const items = definitions.flatMap(({ id, ...definition }) => {
    const metric = cagMetric(data, id);
    return metric ? [{ ...definition, value: metric.actual, source }] : [];
  });
  return (
    <div className={styles.compact}>
      <FiscalSection title="Kerala’s finances" description={`${source.period} · ${source.basis}`} source={source} action={
        <Link href="/finance">Finance overview <ArrowUpRight size={12} aria-hidden="true" /></Link>
      }>
        <FiscalMetrics items={items} />
      </FiscalSection>
    </div>
  );
}

const chartColors = ["#087e75", "#6653bb", "#286bb7", "#bb7818", "#b83a65", "#4c7f49"];

export function FiscalComparison({ items, total }: {
  items: { label: string; value: number; color?: string }[];
  total?: number;
}) {
  const scale = total ?? Math.max(0, ...items.map((item) => Math.abs(item.value)));
  return (
    <ul className={styles.comparison}>
      {items.map((item, index) => {
        const percent = scale > 0 ? Math.abs(item.value) / scale * 100 : 0;
        return (
          <li key={item.label} title={total && total > 0 ? `${item.label} · ${percent.toFixed(1)}% of stated total` : undefined}>
            <div><span>{item.label}</span><strong>{crore(item.value)}</strong></div>
            <div className={styles.chartTrack} aria-hidden="true">
              <span style={{ width: `${Math.min(100, percent)}%`, backgroundColor: item.color ?? chartColors[index % chartColors.length] }} />
            </div>
            {total !== undefined && scale > 0 && <small>{percent.toFixed(1)}% of total</small>}
          </li>
        );
      })}
    </ul>
  );
}

export function FiscalHeadTable({ rows, type, source, actualSource }: {
  rows: FiscalHead[]; type: "income" | "expenditure"; source: FiscalSource; actualSource: FiscalSource;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "actual" | "awaiting">("all");
  const filtered = rows.filter((row) =>
    row.label.toLowerCase().includes(query.trim().toLowerCase()) &&
    (filter === "all" || (filter === "actual" ? row.actual !== null : row.actual === null)),
  );
  const known = rows.filter((row) => row.actual !== null).length;
  const pending: FiscalSource = {
    id: "finance-department-pending",
    source: "Finance Department data",
    basis: "Actual awaiting data",
    sourceUpdatedAt: "Awaiting first submission",
  };
  return (
    <>
      <div className={styles.tableControls}>
        <label className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <input type="search" aria-label={`Find an ${type} head`} placeholder={`Find an ${type} head`} value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className={styles.toggle} role="group" aria-label="Actual availability">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All {rows.length}</button>
          <button type="button" aria-pressed={filter === "actual"} onClick={() => setFilter("actual")}>Actuals {known}</button>
          <button type="button" aria-pressed={filter === "awaiting"} onClick={() => setFilter("awaiting")}>Awaiting {rows.length - known}</button>
        </div>
      </div>
      <div className={styles.heads}>
        {filtered.map((row) => (
          <article key={row.id} className={styles.head} data-awaiting={row.actual === null}>
            <div className={styles.headTitle}><h3>{row.label}</h3><ProvenanceTooltip provenance={row.actual === null ? { ...pending, dataset: row.label } : actualSource} /></div>
            <p className={styles.headActual}>{row.actual === null ? "Actual awaiting data" : crore(row.actual)}</p>
            <p className={styles.headPeriod}>{row.actual === null ? "Finance Department data · Awaiting first submission" : actualSource.period}</p>
            <div className={styles.headReference}><span>BE reference · {crore(row.estimate)}</span><ProvenanceTooltip provenance={source} /></div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className={styles.empty} role="status">No {type} heads match those filters.</p>}
    </>
  );
}

export function FiscalHistory({ rows, source }: { rows: KeralaBudgetAtGlanceRow[]; source: FiscalSource }) {
  const [basis, setBasis] = useState<"accounts" | "estimates">("accounts");
  const columns = basis === "accounts"
    ? [{ name: "2023–24 Accounts", key: "accounts2023_24" }, { name: "2024–25 Accounts", key: "accounts2024_25" }] as const
    : [{ name: "2025–26 BE", key: "budgetEstimate2025_26" }, { name: "2025–26 RE", key: "revisedEstimate2025_26" }, { name: "2026–27 BE", key: "budgetEstimate2026_27" }] as const;
  return (
    <>
      <div className={styles.tableControls}>
        <div className={styles.toggle} role="group" aria-label="Accounting basis">
          <button type="button" aria-pressed={basis === "accounts"} onClick={() => setBasis("accounts")}>Accounts</button>
          <button type="button" aria-pressed={basis === "estimates"} onClick={() => setBasis("estimates")}>BE &amp; RE references</button>
        </div>
        <span className={styles.tableUnits}>₹ crore <ProvenanceTooltip provenance={source} /></span>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.history} data-estimates={basis === "estimates"}>
          <thead><tr><th scope="col">Measure</th>{columns.map(({ name }) => <th scope="col" key={name}>{name}</th>)}</tr></thead>
          <tbody>{rows.map((row) => (
            <tr key={row.id}>
              <th scope="row">{row.label}</th>
              {columns.map(({ key }) => <td key={key}>{amount.format(row[key])}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
      {basis === "estimates" && <p className={styles.tableNote}>BE = Budget Estimate. RE = Revised Estimate.</p>}
    </>
  );
}
