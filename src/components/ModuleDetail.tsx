"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Gauge,
  Info,
  Table2,
  TrendingUp,
} from "lucide-react";
import { stageModules, type StageModule } from "@/data/modules";
import type { CmoData, EcoStatData, IndustryKeraData } from "@/data/departmentSources";
import { moduleDashboards, type DemoKpi } from "@/data/demoDashboards";
import { AnalyticsChart } from "./AnalyticsChart";
import { ModuleIcon } from "./ModuleIcon";
import { ModuleHeaderMeta } from "./ModuleHeaderMeta";
import { SignalBadge } from "./SignalBadge";
import { PlanspaceDashboard } from "./modules/PlanspaceDashboard";
import { EcoStatDashboard } from "./modules/EcoStatDashboard";
import { IndustriesKeraDashboard } from "./modules/IndustriesKeraDashboard";
import { KsrtcPriyadarshiniDashboard } from "./modules/KsrtcPriyadarshiniDashboard";
import { KsdmaDashboard } from "./modules/KsdmaDashboard";
import { CmoDashboard } from "./modules/CmoDashboard";

export function ModuleDetail({ module, ecoStatData, industryKeraData, cmoData }: { module: StageModule; ecoStatData?: EcoStatData; industryKeraData?: IndustryKeraData; cmoData?: CmoData }) {
  const dashboard = moduleDashboards[module.slug];
  const previous = stageModules[module.order - 2];
  const next = stageModules[module.order];

  if (module.slug === "planspace") return <PlanspaceDashboard />;
  if (module.slug === "economics-statistics" && ecoStatData) return <EcoStatDashboard data={ecoStatData} />;
  if (module.slug === "k-swift" && industryKeraData) return <IndustriesKeraDashboard data={industryKeraData} />;
  if (module.slug === "ksrtc") return <KsrtcPriyadarshiniDashboard />;
  if (module.slug === "disaster-management") return <KsdmaDashboard />;
  if (module.slug === "cmo" && cmoData) return <CmoDashboard data={cmoData} />;

  if (!dashboard) return null;

  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Chief Minister Dashboard</Link>
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
        <ModuleHeaderMeta />
      </section>

      <section className="analytics-kpi-grid" aria-label={`${module.name} key performance indicators`}>
        {dashboard.kpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </section>

      <section className="analytics-insight">
        <span><TrendingUp size={18} /></span>
        <div><small>Key observation</small><p>{dashboard.insight}</p></div>
      </section>

      <section className="analytics-section" aria-labelledby="module-charts-title">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Charts</span>
            <h2 id="module-charts-title">Trends and comparisons</h2>
            <p>Reference values retained from the existing portal, pending the dated departmental feed.</p>
          </div>
          <span className="analytics-count"><Gauge size={15} /> {dashboard.charts.length} charts</span>
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
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>
                      {cellIndex === 0 ? <strong>{cell}</strong> : <SignalBadge value={cell} context={dashboard.table.columns[cellIndex]} />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="analytics-provenance">
        <Info size={17} />
        <div><strong>Source note</strong><p>Reference figures are retained from the existing CMO portal. The departmental source and reporting date will replace this note when the agreed data exchange is connected.</p></div>
      </aside>

      <nav className="module-pagination" aria-label="Module navigation">
        {previous ? (
          <Link href={`/modules/${previous.slug}`}><ChevronLeft size={17} /><span><small>Previous module</small><strong>{previous.shortName}</strong></span></Link>
        ) : <span />}
        {next ? (
          <Link href={`/modules/${next.slug}`}><span><small>Next module</small><strong>{next.shortName}</strong></span><ChevronRight size={17} /></Link>
        ) : <Link href="/dashboard"><span><small>Return to</small><strong>Chief Minister Dashboard</strong></span><ChevronRight size={17} /></Link>}
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
