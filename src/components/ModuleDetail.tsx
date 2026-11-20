"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Database,
  Gauge,
  Info,
  Table2,
  TrendingUp,
} from "lucide-react";
import { stageModules, type StageModule } from "@/data/modules";
import { moduleDashboards, type DemoKpi } from "@/data/demoDashboards";
import { AnalyticsChart } from "./AnalyticsChart";
import { ModuleIcon } from "./ModuleIcon";
import { usePortal } from "./PortalContext";

export function ModuleDetail({ module }: { module: StageModule }) {
  const { activeRole } = usePortal();
  const dashboard = moduleDashboards[module.slug];
  const previous = stageModules[module.order - 2];
  const next = stageModules[module.order];

  if (!dashboard) return null;

  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Executive dashboard</Link>
        <ChevronRight size={13} />
        <span>{module.name}</span>
      </div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": module.accent } as React.CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><ModuleIcon name={module.icon} size={30} /></div>
          <div>
            <div className="module-hero-kicker">Module {String(module.order).padStart(2, "0")} · Stage 1</div>
            <h1>{dashboard.title}</h1>
            <p>{dashboard.description}</p>
          </div>
        </div>
        <div className="module-hero-side analytics-hero-side">
          <span className="demo-data-badge"><Database size={14} /> Demo data</span>
          <strong>Seeded from existing main portal</strong>
          <small>Viewing as {activeRole.title}</small>
        </div>
      </section>

      <section className="analytics-kpi-grid" aria-label={`${module.name} key performance indicators`}>
        {dashboard.kpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </section>

      <section className="analytics-insight">
        <span><TrendingUp size={18} /></span>
        <div><small>Executive reading</small><p>{dashboard.insight}</p></div>
      </section>

      <section className="analytics-section" aria-labelledby="module-charts-title">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Performance analysis</span>
            <h2 id="module-charts-title">Trends and comparisons</h2>
            <p>Interactive views built from the existing portal&apos;s seeded datasets.</p>
          </div>
          <span className="analytics-count"><Gauge size={15} /> {dashboard.charts.length} visual views</span>
        </div>
        <div className={`analytics-chart-grid ${dashboard.charts.length === 3 ? "three-charts" : ""}`}>
          {dashboard.charts.map((chart, index) => (
            <article className={`analytics-panel ${index === 0 && dashboard.charts.length > 3 ? "analytics-panel-wide" : ""}`} key={chart.id}>
              <div className="analytics-panel-head">
                <div><h3>{chart.title}</h3><p>{chart.subtitle}</p></div>
                <span>{chart.type === "donut" ? "Composition" : chart.type === "bar" ? "Comparison" : "Trend"}</span>
              </div>
              <AnalyticsChart chart={chart} />
            </article>
          ))}
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><Table2 size={14} /> Detail register</span>
            <h2>{dashboard.table.title}</h2>
            <p>{dashboard.table.subtitle}</p>
          </div>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead><tr>{dashboard.table.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>
              {dashboard.table.rows.map((row, rowIndex) => (
                <tr key={`${module.slug}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cellIndex === 0 ? <strong>{cell}</strong> : cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="analytics-provenance">
        <Info size={17} />
        <div><strong>Demo-data note</strong><p>Figures on this page are seeded from the existing main portal to demonstrate the intended dashboard experience. They are not presented as a current operational feed.</p></div>
      </aside>

      <nav className="module-pagination" aria-label="Module navigation">
        {previous ? (
          <Link href={`/modules/${previous.slug}`}><ChevronLeft size={17} /><span><small>Previous module</small><strong>{previous.shortName}</strong></span></Link>
        ) : <span />}
        {next ? (
          <Link href={`/modules/${next.slug}`}><span><small>Next module</small><strong>{next.shortName}</strong></span><ChevronRight size={17} /></Link>
        ) : <Link href="/dashboard"><span><small>Return to</small><strong>Executive dashboard</strong></span><ChevronRight size={17} /></Link>}
      </nav>
    </div>
  );
}

function KpiCard({ kpi }: { kpi: DemoKpi }) {
  const SignalIcon = kpi.tone === "risk" ? CircleAlert : CircleCheck;
  return (
    <article className={`analytics-kpi tone-${kpi.tone}`}>
      <div className="analytics-kpi-top"><span>{kpi.label}</span><SignalIcon size={16} /></div>
      <strong>{kpi.value}</strong>
      <div className="analytics-kpi-bottom"><span>{kpi.detail}</span>{kpi.delta && <b>{kpi.delta}</b>}</div>
    </article>
  );
}
