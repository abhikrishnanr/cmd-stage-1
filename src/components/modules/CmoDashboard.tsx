"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Gauge,
  HandCoins,
  Info,
  Landmark,
  MessageSquareText,
  Table2,
} from "lucide-react";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { ModuleHeaderMeta } from "@/components/ModuleHeaderMeta";
import { SignalBadge } from "@/components/SignalBadge";
import type { CmoData } from "@/data/departmentSources";
import { chartPalette, type DemoChart } from "@/data/demoDashboards";

type SignalTone = "good" | "watch" | "risk" | "info";

export function CmoDashboard({ data }: { data: CmoData }) {
  const disposalRate = data.applicationsReceived
    ? (data.applicationsDisposed / data.applicationsReceived) * 100
    : 0;
  const departmentChart = data.departments.map((row) => ({
    ...row,
    label: shortenDepartment(row.department),
  }));

  const charts: DemoChart[] = [
    {
      id: "cmo-intake-channels",
      title: "Petitions and applications by intake channel",
      subtitle: `Channels published by the official CMO dashboard · since ${data.statisticsSince}`,
      type: "donut",
      xKey: "channel",
      data: data.channels,
      series: [{ key: "received", label: "Petitions", color: chartPalette.blue }],
    },
    {
      id: "cmo-processing-series",
      title: "Application processing series",
      subtitle: `Received and disposed · statistics from ${data.statisticsSince}`,
      type: "bar",
      xKey: "status",
      data: [
        { status: "Received", value: data.applicationsReceived },
        { status: "Disposed", value: data.applicationsDisposed },
      ],
      series: [{ key: "value", label: "Applications", color: chartPalette.teal }],
    },
    {
      id: "cmo-department-processing",
      title: "Department petition processing",
      subtitle: "Received and disposed counts published by the official CMO dashboard",
      type: "bar",
      xKey: "label",
      data: departmentChart,
      series: [
        { key: "received", label: "Received", color: chartPalette.blue },
        { key: "disposed", label: "Disposed", color: chartPalette.green },
      ],
      horizontal: true,
    },
  ];

  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Chief Minister Dashboard</Link>
        <span>/</span>
        <span>CMO, Grievances &amp; Feedback</span>
      </div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": "#7c3aed" } as React.CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><Landmark size={30} /></div>
          <div>
            <div className="module-hero-kicker">Chief Minister&apos;s Office</div>
            <h1>CMO, Grievances &amp; Feedback</h1>
            <p>Official grievance, petition and CMDRF indicators, intake channels and department-level disposal.</p>
          </div>
        </div>
        <ModuleHeaderMeta lastUpdated={data.lastUpdatedDisplay} source="cmo.kerala.gov.in" sourceUrl={data.sourceUrl} />
      </section>

      <section className="analytics-kpi-grid" aria-label="CMO and grievance key indicators">
        <Kpi label="Offices connected" value={formatNumber(data.officesConnected)} detail="Official portal network" icon={<Building2 size={16} />} tone="info" />
        <Kpi label="Grievances" value={formatNumber(data.grievances)} detail="Headline portal total" icon={<MessageSquareText size={16} />} tone="watch" />
        <Kpi label="CMDRF applications" value={formatNumber(data.cmdrfApplications)} detail="Headline portal total" icon={<HandCoins size={16} />} tone="info" />
        <Kpi label="Applications disposed" value={formatNumber(data.applicationsDisposed)} detail={`of ${formatNumber(data.applicationsReceived)} since ${data.statisticsSince}`} icon={<FileCheck2 size={16} />} tone="good" />
        <Kpi label="Disposal rate" value={`${disposalRate.toFixed(2)}%`} detail="Calculated from the processing series" icon={<Gauge size={16} />} tone="good" />
      </section>

      <section className="analytics-insight">
        <span><CheckCircle2 size={18} /></span>
        <div>
          <small>Official processing position</small>
          <p>{formatNumber(data.applicationsDisposed)} of {formatNumber(data.applicationsReceived)} applications in the processing series have been disposed since {data.statisticsSince}. The {formatNumber(data.grievances)} headline grievance total is reported separately by the source portal.</p>
        </div>
      </section>

      <section className="analytics-section" aria-labelledby="cmo-charts-title">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Official dashboard data</span>
            <h2 id="cmo-charts-title">Petition and application receipt and disposal</h2>
            <p>Values are read from the public Chief Minister&apos;s Office dashboard and retain the source&apos;s separate reporting scopes.</p>
          </div>
          <span className="analytics-count"><MessageSquareText size={15} /> {charts.length} charts</span>
        </div>
        <div className="analytics-chart-grid cmo-chart-grid">
          {charts.map((chart, index) => (
            <article className={`analytics-panel ${index === 2 ? "analytics-panel-wide" : ""}`} key={chart.id}>
              <div className="analytics-panel-head">
                <div><h3>{chart.title}</h3><p>{chart.subtitle}</p></div>
                <span>{chart.type === "donut" ? "Composition" : "Comparison"}</span>
              </div>
              <AnalyticsChart chart={chart} />
            </article>
          ))}
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><Table2 size={14} /> Department register</span>
            <h2>Petitions by department</h2>
            <p>Received and disposed values as published on the official CMO dashboard.</p>
          </div>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead><tr><th>Department</th><th>Received</th><th>Disposed</th><th>Pending</th><th>Disposal rate</th></tr></thead>
            <tbody>
              {data.departments.map((row) => {
                const pending = Math.max(row.received - row.disposed, 0);
                const rate = row.received ? (row.disposed / row.received) * 100 : 0;
                const pendingRate = row.received ? (pending / row.received) * 100 : 0;
                return (
                  <tr key={row.department}>
                    <td><strong>{row.department}</strong></td>
                    <td>{formatNumber(row.received)}</td>
                    <td><SignalBadge value={formatNumber(row.disposed)} tone="good" force /></td>
                    <td><SignalBadge value={formatNumber(pending)} tone={pendingRate >= 50 ? "risk" : pendingRate >= 25 ? "watch" : "info"} force /></td>
                    <td><SignalBadge value={`${rate.toFixed(2)}%`} context="Disposal rate" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="analytics-provenance">
        <Info size={17} />
        <div>
          <strong>Source note</strong>
          <p>Chief Minister&apos;s Office public dashboard, last updated {data.lastUpdatedDisplay}. “Disposed” follows the chart label used by the source; the embedded department field is named “Approved”.</p>
          <a href={data.sourceUrl} target="_blank" rel="noreferrer">Open official CMO dashboard <ExternalLink size={13} /></a>
        </div>
      </aside>
    </div>
  );
}

function Kpi({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: React.ReactNode; tone: SignalTone }) {
  return (
    <article className={`analytics-kpi tone-${tone}`}>
      <div className="analytics-kpi-top"><span>{label}</span>{icon}</div>
      <strong>{value}</strong>
      <div className="analytics-kpi-bottom"><span>{detail}</span></div>
    </article>
  );
}

function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}

function shortenDepartment(value: string) {
  return value
    .replace("Local Self Government Department", "Local Self Govt")
    .replace("General Education Department", "General Education")
    .replace("Health and Family Welfare Department", "Health & Family Welfare")
    .replace("Labour and Skills Department", "Labour & Skills")
    .replace("Taxes Department (Commercial Taxes, Lotteries)", "Taxes")
    .replace(" Department", "");
}
