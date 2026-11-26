"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  CloudRain,
  Database,
  ExternalLink,
  Gauge,
  House,
  RadioTower,
  ShieldAlert,
  Truck,
  Users,
  Waves,
} from "lucide-react";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { ModuleHeaderMeta } from "@/components/ModuleHeaderMeta";
type ChartSpec = Parameters<typeof AnalyticsChart>[0]["chart"];
type SignalTone = "good" | "watch" | "risk" | "info";

const chartPalette = {
  blue: "#2563eb",
  teal: "#0f766e",
  cyan: "#1aa6c9",
};

const routineCharts: ChartSpec[] = [
  {
    id: "ksdma-irrigation-storage",
    title: "Irrigation reservoir storage",
    subtitle: "Highest reported live storage; 26 Nov 2026, 11:00 AM",
    type: "bar",
    xKey: "reservoir",
    data: [
      { reservoir: "Kanjirappuzha", storage: 99 },
      { reservoir: "Neyyar", storage: 94 },
      { reservoir: "Chimoni", storage: 85 },
      { reservoir: "Malankara", storage: 78 },
      { reservoir: "Mangalam", storage: 77 },
      { reservoir: "Siruvani", storage: 76 },
      { reservoir: "Peechi", storage: 75 },
      { reservoir: "Kallada", storage: 69 },
      { reservoir: "Malampuzha", storage: 59 },
      { reservoir: "Pothundy", storage: 58 },
    ],
    series: [{ key: "storage", label: "Live storage", color: chartPalette.blue }],
    unit: "%",
    horizontal: true,
  },
  {
    id: "ksdma-kseb-storage",
    title: "KSEB reservoir storage",
    subtitle: "Highest reported storage; 25 Nov 2026, 11:00 AM",
    type: "bar",
    xKey: "reservoir",
    data: [
      { reservoir: "Sholayar", storage: 88.45 },
      { reservoir: "Kundala", storage: 85.62 },
      { reservoir: "Ponmudi", storage: 81.12 },
      { reservoir: "Banasurasagar", storage: 77.39 },
      { reservoir: "Idamalayar", storage: 71.31 },
      { reservoir: "Kakki", storage: 68.92 },
      { reservoir: "Kallarkutty", storage: 66.81 },
      { reservoir: "Lower Periyar", storage: 64.59 },
      { reservoir: "Anayirankal", storage: 64.51 },
      { reservoir: "Idukki", storage: 62.7 },
    ],
    series: [{ key: "storage", label: "Storage", color: chartPalette.teal }],
    unit: "%",
    horizontal: true,
  },
  {
    id: "ksdma-irrigation-outflow",
    title: "Reported irrigation-reservoir outflow",
    subtitle: "Highest stated outflow; 26 Nov 2026, 11:00 AM",
    type: "bar",
    xKey: "reservoir",
    data: [
      { reservoir: "Bhoothathankettu", outflow: 67.06 },
      { reservoir: "Malankara", outflow: 23.71 },
      { reservoir: "Malampuzha", outflow: 15.12 },
      { reservoir: "Chimoni", outflow: 12.36 },
      { reservoir: "Peechi", outflow: 11.3 },
      { reservoir: "Kallada", outflow: 7.22 },
      { reservoir: "Moolathara", outflow: 7.09 },
      { reservoir: "Pothundy", outflow: 6.05 },
    ],
    series: [{ key: "outflow", label: "Outflow", color: chartPalette.cyan }],
    unit: "m³/s",
    horizontal: true,
  },
];

const routineStreams = [
  ["Dam and reservoir levels", "KSEB and Irrigation bulletins", "Daily", "Available from KSDMA public bulletins"],
  ["River water levels", "Station level, warning level, danger level and trend", "Daily / event", "Department data list awaited"],
  ["Rainfall", "Station and district totals, rolling rainfall and warning threshold", "Daily / event", "Department data list awaited"],
  ["Public warnings", "Rainfall, high wave, flood, dam level, fishermen, lightning, strong wind, temperature and UV", "As issued", "Published by KSDMA"],
];

const responseStreams = [
  ["Relief camps", "District, camp, opened time, status and persons accommodated", "Event-based"],
  ["Supplies", "Item, quantity, destination, dispatch and receipt status", "Event-based"],
  ["Volunteers", "Registered, assigned, deployed and location", "Event-based"],
  ["Incidents", "Location, incident type, response owner, action and status", "Event-based"],
  ["District monitoring", "District summary, unmet need, escalation and next update", "Event-based"],
];

export function KsdmaDashboard() {
  const [view, setView] = useState<"routine" | "response">("routine");

  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Chief Minister Dashboard</Link>
        <span>/</span>
        <span>KSDMA</span>
      </div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": "#c64555" } as React.CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><ShieldAlert size={30} /></div>
          <div>
            <div className="module-hero-kicker">Kerala State Disaster Management Authority</div>
            <h1>Disaster monitoring</h1>
            <p>Daily hazard monitoring and event-response updates for review by the Chief Minister&apos;s Office.</p>
          </div>
        </div>
        <ModuleHeaderMeta />
      </section>

      <section className="analytics-kpi-grid" aria-label="KSDMA key indicators">
        <Kpi label="Irrigation reservoirs" value="20" detail="Reservoirs in the 26 Nov bulletin" tone="info" />
        <Kpi label="KSEB reservoirs" value="17" detail="Dams in the 25 Nov bulletin" tone="info" />
        <Kpi label="Dam alert status" value="No alerts" detail="Stated in both source bulletins" tone="good" />
        <Kpi label="Warning categories" value="9" detail="Categories published on KSDMA" tone="watch" />
      </section>

      <div className="module-tabs" role="tablist" aria-label="KSDMA update type">
        <button type="button" role="tab" aria-selected={view === "routine"} className={view === "routine" ? "active" : ""} onClick={() => setView("routine")}>
          <CloudRain size={15} /> Routine monitoring
        </button>
        <button type="button" role="tab" aria-selected={view === "response"} className={view === "response" ? "active" : ""} onClick={() => setView("response")}>
          <RadioTower size={15} /> War Room updates
        </button>
      </div>

      {view === "routine" ? <RoutineMonitoring /> : <ResponseMonitoring />}

      <aside className="analytics-provenance">
        <Database size={17} />
        <div>
          <strong>Sources and update position</strong>
          <p>Current dam figures are transcribed from KSDMA&apos;s KSEB bulletin dated 25 November 2026 at 11:00 AM and Irrigation bulletin dated 26 November 2026 at 11:00 AM. River, rainfall and event-response values will appear after KSDMA provides the agreed structured data points.</p>
          <a href="https://sdma.kerala.gov.in/dam-water-level/" target="_blank" rel="noreferrer">KSDMA dam water levels <ExternalLink size={12} /></a>
        </div>
      </aside>
    </div>
  );
}

function RoutineMonitoring() {
  return (
    <>
      <section className="analytics-insight">
        <span><Waves size={18} /></span>
        <div>
          <small>Latest published position</small>
          <p>The source bulletins state that there are no dam warnings or alerts. Kanjirappuzha has the highest reported irrigation-reservoir storage at 99%; Sholayar has the highest reported KSEB-reservoir storage at 88.45%.</p>
        </div>
      </section>

      <section className="analytics-section" aria-labelledby="ksdma-dam-title">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Dam and reservoir monitoring</span>
            <h2 id="ksdma-dam-title">Published storage and outflow</h2>
            <p>KSEB and Irrigation bulletins use separate reporting dates, shown on each chart.</p>
          </div>
          <span className="analytics-count"><Gauge size={15} /> Official bulletins</span>
        </div>
        <div className="analytics-chart-grid">
          {routineCharts.map((chart, index) => <ChartPanel key={chart.id} chart={chart} wide={index === 2} />)}
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><Activity size={14} /> Routine data streams</span>
            <h2>Daily monitoring coverage</h2>
            <p>Fields agreed in the departmental discussion and public warning categories maintained by KSDMA.</p>
          </div>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead><tr><th>Data stream</th><th>Fields</th><th>Frequency</th><th>Current position</th></tr></thead>
            <tbody>{routineStreams.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><ShieldAlert size={14} /> Public warnings</span>
            <h2>KSDMA warning categories</h2>
            <p>Categories displayed on the KSDMA public website.</p>
          </div>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead><tr><th>Weather and rainfall</th><th>Water and coast</th><th>Public safety</th></tr></thead>
            <tbody>
              <tr><td><strong>Rainfall warning</strong></td><td><strong>Flood warning</strong></td><td><strong>Lightning warning</strong></td></tr>
              <tr><td>Strong-wind warning</td><td>Dam-level warning</td><td>Temperature warning</td></tr>
              <tr><td>UV warning</td><td>High-wave warning</td><td>Fishermen warning</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function ResponseMonitoring() {
  return (
    <>
      <section className="analytics-insight">
        <span><RadioTower size={18} /></span>
        <div>
          <small>Event-response view</small>
          <p>This view is reserved for floods and other active events. No event figures are shown until KSDMA supplies a dated update; the table defines the response fields requested from the department.</p>
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><RadioTower size={14} /> Event data</span>
            <h2>War Room update structure</h2>
            <p>Each update should carry its event name, reference time, district and reporting officer.</p>
          </div>
          <span className="analytics-count"><Database size={15} /> Department feed awaited</span>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead><tr><th>Response area</th><th>Required fields</th><th>Frequency</th></tr></thead>
            <tbody>{responseStreams.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="analytics-chart-grid three-charts" aria-label="War Room response sections">
        <ResponseCard icon={<House size={22} />} title="Relief camps" copy="Active and closed camps, persons accommodated and district needs." />
        <ResponseCard icon={<Truck size={22} />} title="Supplies" copy="Dispatch, destination, receipt and gaps for food, water and essential items." />
        <ResponseCard icon={<Users size={22} />} title="Volunteers" copy="Available, assigned and deployed volunteers by district and task." />
      </section>
    </>
  );
}

function ResponseCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="analytics-panel">
      <div className="analytics-panel-head"><div><h3>{title}</h3><p>{copy}</p></div><span>Event update</span></div>
      <div className="not-connected-panel">
        <div className="not-connected-visual">{icon}<span /></div>
        <div><h3>Awaiting a dated department update</h3><p>Values will be displayed only with the event and reporting time.</p></div>
      </div>
    </article>
  );
}

function Kpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: SignalTone }) {
  return (
    <article className={`analytics-kpi tone-${tone}`}>
      <div className="analytics-kpi-top"><span>{label}</span><ShieldAlert size={16} /></div>
      <strong>{value}</strong>
      <div className="analytics-kpi-bottom"><span>{detail}</span></div>
    </article>
  );
}

function ChartPanel({ chart, wide = false }: { chart: ChartSpec; wide?: boolean }) {
  return (
    <article className={`analytics-panel ${wide ? "analytics-panel-wide" : ""}`}>
      <div className="analytics-panel-head">
        <div><h3>{chart.title}</h3><p>{chart.subtitle}</p></div>
        <span>Bulletin data</span>
      </div>
      <AnalyticsChart chart={chart} />
    </article>
  );
}
