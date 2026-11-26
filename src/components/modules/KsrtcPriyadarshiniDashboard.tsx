"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Bus,
  CalendarDays,
  CheckCircle2,
  Database,
  ExternalLink,
  MapPinned,
  ReceiptIndianRupee,
  Route,
  Users,
} from "lucide-react";
import { AnalyticsChart } from "@/components/AnalyticsChart";
type ChartSpec = Parameters<typeof AnalyticsChart>[0]["chart"];
type SignalTone = "good" | "watch" | "risk" | "info";

const chartPalette = {
  blue: "#2f6fd0",
  violet: "#7556c8",
};

const publishedCharts: ChartSpec[] = [
  {
    id: "priyadarshini-daily-journeys",
    title: "Daily journey milestones",
    subtitle: "Lakh journeys per day; the 7 September figure is reported as more than 15 lakh",
    type: "bar",
    xKey: "period",
    data: [
      { period: "First week", journeys: 11 },
      { period: "97-day report", journeys: 14 },
      { period: "7 Sep minimum", journeys: 15 },
    ],
    series: [{ key: "journeys", label: "Daily journeys", color: chartPalette.violet }],
    unit: "Lakh",
  },
  {
    id: "priyadarshini-finance",
    title: "Published financial figures",
    subtitle: "Zero-ticket value for 97 days and 2026–27 revised budget allocation",
    type: "bar",
    xKey: "indicator",
    data: [
      { indicator: "Zero-ticket value", amount: 266 },
      { indicator: "Revised allocation", amount: 600 },
    ],
    series: [{ key: "amount", label: "Amount", color: chartPalette.blue }],
    unit: "₹ Cr",
  },
];

const kpis: Array<{ label: string; value: string; detail: string; tone: SignalTone }> = [
  { label: "Journeys in 97 days", value: "12.54 Cr", detail: "Official report dated 22 September 2026", tone: "good" },
  { label: "Daily journeys", value: "14 lakh", detail: "Reported at the 97-day review", tone: "good" },
  { label: "Peak daily journeys", value: ">15 lakh", detail: "7 September 2026", tone: "good" },
  { label: "Zero-ticket value", value: "₹266 Cr", detail: "Value recorded during the first 97 days", tone: "info" },
  { label: "Revised allocation", value: "₹600 Cr", detail: "2026–27 budget provision", tone: "info" },
  { label: "Initial buses", value: "3,125", detail: "Buses at first-stage launch", tone: "info" },
];

const requestedViews = [
  ["District use", "District, depot, route, service and daily journeys", "Awaiting KSRTC feed"],
  ["Journey profile", "Distance slab, travel purpose and passenger category", "Awaiting KSRTC feed"],
  ["Service operation", "Buses, scheduled trips, operated trips and cancellations", "Awaiting KSRTC feed"],
  ["Financial settlement", "Claimed, verified, released and pending amounts by period", "Awaiting Finance / KSRTC feed"],
  ["Passenger feedback", "Grievances, category, depot, ageing and closure", "Awaiting KSRTC feed"],
];

export function KsrtcPriyadarshiniDashboard() {
  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Chief Minister Dashboard</Link>
        <span>/</span>
        <span>KSRTC – Priyadarshini</span>
      </div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": "#7556c8" } as React.CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><Bus size={30} /></div>
          <div>
            <div className="module-hero-kicker">KSRTC · Indira Guarantee</div>
            <h1>Priyadarshini free travel</h1>
            <p>Programme reach, free-travel value, service coverage and department reporting requirements.</p>
          </div>
        </div>
        <div className="module-hero-side analytics-hero-side">
          <span><CalendarDays size={14} /> Latest published review</span>
          <strong>22 September 2026 · 97 days</strong>
          <small>Scheme effective from 15 June 2026.</small>
        </div>
      </section>

      <section className="analytics-kpi-grid" aria-label="Priyadarshini key indicators">
        {kpis.map((item) => <Kpi key={item.label} {...item} />)}
      </section>

      <section className="analytics-insight">
        <span><Route size={18} /></span>
        <div>
          <small>Published progress</small>
          <p>Daily journeys rose from about 11 lakh in the first week to 14 lakh by the 97-day review. On 7 September, the scheme crossed 15 lakh journeys in one day, with a reported zero-ticket value of ₹3.29 crore.</p>
        </div>
      </section>

      <section className="analytics-section" aria-labelledby="priyadarshini-results-title">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Published results</span>
            <h2 id="priyadarshini-results-title">Travel and financial milestones</h2>
            <p>Only figures in the official 97-day programme report and the 2026–27 revised allocation are shown.</p>
          </div>
          <span className="analytics-count"><Activity size={15} /> Report dated 22 Sep 2026</span>
        </div>
        <div className="analytics-chart-grid">
          {publishedCharts.map((chart) => <ChartPanel key={chart.id} chart={chart} />)}
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><Users size={14} /> Scheme coverage</span>
            <h2>Who can travel and where</h2>
            <p>Eligibility and service conditions stated in the official scheme information.</p>
          </div>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead><tr><th>Item</th><th>Coverage</th><th>Passenger requirement</th></tr></thead>
            <tbody>
              <tr><td><strong>Eligible passengers</strong></td><td>All women and transgender persons</td><td>No age, income or social-category restriction stated</td></tr>
              <tr><td><strong>Eligible services</strong></td><td>Ordinary, limited-stop ordinary and town-to-town ordinary services</td><td>Collect a zero-value ticket for the journey</td></tr>
              <tr><td><strong>Registration</strong></td><td>No prior registration</td><td>No separate card or certificate required</td></tr>
              <tr><td><strong>Starting date</strong></td><td>15 June 2026</td><td>Travel under the scheme from the notified commencement</td></tr>
              <tr><td><strong>Initial service coverage</strong></td><td>3,125 buses</td><td>First-stage launch figure</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="analytics-section" aria-labelledby="priyadarshini-department-title">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Department reporting</span>
            <h2 id="priyadarshini-department-title">Detailed views to be connected</h2>
            <p>The dashboard structure is ready for district, service, journey and settlement records from KSRTC.</p>
          </div>
          <span className="analytics-count"><Database size={15} /> Dated feed required</span>
        </div>
        <div className="analytics-chart-grid three-charts">
          <FeedCard icon={<MapPinned size={22} />} title="District and route use" copy="Journeys by district, depot, route and service category." />
          <FeedCard icon={<ReceiptIndianRupee size={22} />} title="Settlement position" copy="Claims raised, checked, released and pending for each reporting period." />
          <FeedCard icon={<Users size={22} />} title="Passenger profile" copy="Distance, purpose and passenger group when supplied by KSRTC." />
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><Database size={14} /> Data register</span>
            <h2>Department feeds required</h2>
            <p>Fields needed to complete the detailed programme dashboard without estimating missing values.</p>
          </div>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead><tr><th>Dashboard view</th><th>Required fields</th><th>Current position</th></tr></thead>
            <tbody>{requestedViews.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <aside className="analytics-provenance">
        <CheckCircle2 size={17} />
        <div>
          <strong>Official sources</strong>
          <p>Kerala Government 97-day report dated 22 September 2026, the scheme order and launch report, and the 2026–27 revised budget summary. Detailed district and settlement figures are intentionally left for a dated KSRTC feed.</p>
          <a href="https://www.prd.kerala.gov.in/index.php/ml/node/359725" target="_blank" rel="noreferrer">97-day report <ExternalLink size={12} /></a>
          <a href="https://kerala.gov.in/assets/ckupload/document-651_1781175097.pdf" target="_blank" rel="noreferrer">Scheme order <ExternalLink size={12} /></a>
          <a href="https://prd.kerala.gov.in/index.php/en/node/348864" target="_blank" rel="noreferrer">Launch report <ExternalLink size={12} /></a>
          <a href="https://kerala.gov.in/articledetail/MTA2ODUxMTUzOC4xNg%3D%3D/1?lan=en" target="_blank" rel="noreferrer">Revised budget summary <ExternalLink size={12} /></a>
        </div>
      </aside>
    </div>
  );
}

function FeedCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="analytics-panel">
      <div className="analytics-panel-head"><div><h3>{title}</h3><p>{copy}</p></div><span>Department feed</span></div>
      <div className="not-connected-panel">
        <div className="not-connected-visual">{icon}<span /></div>
        <div><h3>Awaiting a dated KSRTC record</h3><p>The panel will show values only after the source period is provided.</p></div>
      </div>
    </article>
  );
}

function Kpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: SignalTone }) {
  return (
    <article className={`analytics-kpi tone-${tone}`}>
      <div className="analytics-kpi-top"><span>{label}</span><CheckCircle2 size={16} /></div>
      <strong>{value}</strong>
      <div className="analytics-kpi-bottom"><span>{detail}</span></div>
    </article>
  );
}

function ChartPanel({ chart }: { chart: ChartSpec }) {
  return (
    <article className="analytics-panel">
      <div className="analytics-panel-head">
        <div><h3>{chart.title}</h3><p>{chart.subtitle}</p></div>
        <span>Published data</span>
      </div>
      <AnalyticsChart chart={chart} />
    </article>
  );
}
