"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import {
  Activity,
  ArrowLeft,
  Building2,
  CalendarCheck,
  ClipboardList,
  Database,
  ExternalLink,
  FileHeart,
  FlaskConical,
  Hospital,
  MapPinned,
  Mic,
  SearchCheck,
  Stethoscope,
  UserRoundCheck,
  UserRoundX,
  UsersRound,
} from "lucide-react";
import type { EHealthData } from "@/data/departmentSources";
import type { DemoChart } from "@/data/demoDashboards";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { ModuleHeaderMeta } from "@/components/ModuleHeaderMeta";
import { SignalBadge } from "@/components/SignalBadge";

const pink = "#e11d48";
const blue = "#2563eb";
const green = "#16a34a";
const amber = "#f59e0b";
const teal = "#0f766e";
const violet = "#7c3aed";

export function HealthDashboard({ data }: { data: EHealthData }) {
  const charts: DemoChart[] = [
    {
      id: "health-daily-district-visits",
      title: "eHealth visits by district",
      subtitle: `Recorded transactions on ${formatDate(data.referenceDate)} · workload context, not a staffing-shortage measure`,
      type: "bar",
      xKey: "district",
      data: data.dailyDistrictVisits.map((row) => ({ ...row, district: shortDistrict(row.district) })),
      series: [{ key: "visits", label: "Visits", color: pink }],
      horizontal: true,
    },
    {
      id: "health-district-network",
      title: "Onboarded institutions by district",
      subtitle: "Digital-health network coverage published by eHealth Kerala",
      type: "bar",
      xKey: "district",
      data: data.districtCoverage.map((row) => ({ ...row, district: shortDistrict(row.district) })),
      series: [{ key: "institutions", label: "Institutions", color: teal }],
      horizontal: true,
    },
    {
      id: "health-facility-mix",
      title: "Institution mix",
      subtitle: "Onboarded institutions by published facility grouping",
      type: "bar",
      xKey: "facility",
      data: data.facilityMix.map((row) => ({ ...row, facility: shortFacility(row.facility) })),
      series: [{ key: "institutions", label: "Institutions", color: blue }],
      horizontal: true,
    },
    {
      id: "health-commissioning-trend",
      title: "Institutions added by year",
      subtitle: "Commissioning dates in the public institution register",
      type: "bar",
      xKey: "year",
      data: data.commissioningTrend,
      series: [{ key: "institutions", label: "Institutions added", color: green }],
    },
    {
      id: "health-daily-clinical-activity",
      title: "Daily clinical activity",
      subtitle: `Transactions recorded on ${formatDate(data.referenceDate)}`,
      type: "bar",
      xKey: "activity",
      data: [
        { activity: "Prechecks", value: data.daily.prechecks },
        { activity: "Diagnoses", value: data.daily.diagnoses },
        { activity: "Prescriptions", value: data.daily.prescriptions },
        { activity: "Lab tests", value: data.daily.labTests },
      ],
      series: [{ key: "value", label: "Transactions", color: violet }],
    },
    {
      id: "health-cumulative-service-records",
      title: "Cumulative digital service records",
      subtitle: "Published eHealth project totals",
      type: "bar",
      xKey: "record",
      data: [
        { record: "Registrations", value: data.registrations },
        { record: "Visits", value: data.visits },
        { record: "Prescriptions", value: data.prescriptions },
        { record: "Lab tests", value: data.labTests },
      ],
      series: [{ key: "value", label: "Records", color: amber }],
      horizontal: true,
    },
  ];

  return (
    <div className="page-stack module-page analytics-module-page health-dashboard">
      <div className="breadcrumbs"><Link href="/dashboard"><ArrowLeft size={14} /> Chief Minister Dashboard</Link><span>/</span><span>Health</span></div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": pink } as CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><Stethoscope size={30} /></div>
          <div><div className="module-hero-kicker">Health and Family Welfare</div><h1>Health workforce &amp; service monitoring</h1><p>Institution-wise doctor and health-staff requirements, supported by the latest public eHealth service and network indicators.</p></div>
        </div>
        <ModuleHeaderMeta lastUpdated={formatDate(data.referenceDate)} source="eHealth Kerala" sourceUrl={data.sourceUrl} />
      </section>

      <section className="analytics-kpi-grid health-kpi-grid" aria-label="Health key indicators">
        <Kpi label="Institutions onboarded" value={formatNumber(data.institutionsOnboarded)} detail="eHealth network" icon={<Building2 size={16} />} tone="good" />
        <Kpi label="Daily visits" value={formatNumber(data.daily.visits)} detail={formatDate(data.referenceDate)} icon={<Activity size={16} />} tone="info" />
        <Kpi label="Inpatient admissions" value={formatNumber(data.daily.inpatientAdmissions)} detail="Daily eHealth records" icon={<Hospital size={16} />} tone="info" />
        <Kpi label="Online appointments" value={formatNumber(data.daily.onlineAppointments)} detail="Daily visits booked online" icon={<CalendarCheck size={16} />} tone="good" />
        <Kpi label="Prescriptions" value={formatNumber(data.daily.prescriptions)} detail="Daily digital records" icon={<FileHeart size={16} />} tone="info" />
        <Kpi label="Lab tests" value={formatNumber(data.daily.labTests)} detail="Daily digital records" icon={<FlaskConical size={16} />} tone="info" />
      </section>

      <section className="section-card health-workforce-card" aria-labelledby="health-workforce-title">
        <div className="health-workforce-head">
          <div>
            <span className="section-kicker"><UsersRound size={14} /> Workforce requirement</span>
            <h2 id="health-workforce-title">Doctor and health-staff availability by institution</h2>
            <p>The register is prepared to identify institutions with the largest verified staffing gaps. Bed-capacity monitoring is not included because a maintainable source is not available.</p>
          </div>
          <div className="health-workforce-actions"><SignalBadge value="Department workforce feed required" tone="watch" force /><button type="button" onClick={() => openReview("Review: Health workforce requirements")}><Mic size={13} /> Review</button></div>
        </div>

        <div className="health-workforce-method">
          <div><UserRoundCheck size={20} /><span><small>Availability</small><strong>Sanctioned and staff in position</strong></span></div>
          <div><UserRoundX size={20} /><span><small>Vacancy</small><strong>Cadre, specialty and institution gap</strong></span></div>
          <div><SearchCheck size={20} /><span><small>Priority</small><strong>Vacancy rate with service workload</strong></span></div>
        </div>

        <div className="analytics-table-wrap health-workforce-table"><table className="analytics-table"><thead><tr><th>Institution</th><th>District</th><th>Facility type</th><th>Doctors sanctioned</th><th>Doctors working</th><th>Doctor vacancies</th><th>Other staff sanctioned</th><th>Other staff working</th><th>Staff vacancies</th><th>Critical specialty gap</th><th>Data date</th><th>Priority</th></tr></thead><tbody><tr className="health-empty-row"><td colSpan={12}><div><Database size={22} /><strong>No public institution-level workforce values are published by eHealth Kerala</strong><span>DHS, DME and NHM are to provide sanctioned posts, staff in position, vacancies, leave or deputation and specialty gaps with an update date. Priority ranking will activate only from that dated feed.</span></div></td></tr></tbody></table></div>

        <div className="health-method-note"><ClipboardList size={17} /><p><strong>Priority method after the feed is connected:</strong> show doctor vacancy percentage, other-staff vacancy percentage, unfilled critical specialties and eHealth workload side by side. High visit volume alone will not be labelled as a staffing shortage.</p></div>
      </section>

      <section className="analytics-section" aria-labelledby="health-service-title">
        <div className="section-heading analytics-section-heading"><div><span className="section-kicker">Official eHealth indicators</span><h2 id="health-service-title">Network coverage and service activity</h2><p>Published digital-health transactions and institution coverage useful for Chief Minister and Health Minister review.</p></div><span className="analytics-count"><Database size={15} /> Through {formatDate(data.referenceDate)}</span></div>
        <div className="analytics-chart-grid health-chart-grid">
          {charts.map((chart, index) => <article className={`analytics-panel ${index < 2 ? "health-chart-tall" : ""}`} key={chart.id}><div className="analytics-panel-head"><div><h3>{chart.title}</h3><p>{chart.subtitle}</p></div><div className="analytics-panel-actions"><span>{chart.horizontal ? "District comparison" : "Published activity"}</span><button type="button" onClick={() => openReview(`Review: ${chart.title}`)}><Mic size={12} /> Review</button></div></div><AnalyticsChart chart={chart} /></article>)}
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading"><div><span className="section-kicker"><MapPinned size={14} /> Institution register</span><h2>Latest institutions commissioned</h2><p>Most recent entries in the official eHealth institution register.</p></div></div>
        <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Institution</th><th>Facility type</th><th>District</th><th>Commissioned</th></tr></thead><tbody>{data.recentInstitutions.map((row) => <tr key={row.id}><td><strong>{sentenceCase(row.name)}</strong></td><td>{row.type}</td><td>{row.district}</td><td>{formatDate(row.startDate)}</td></tr>)}</tbody></table></div>
      </section>

      <section className="health-service-summary" aria-label="Published cumulative eHealth activity">
        <article><Activity size={19} /><span><small>Total visits</small><strong>{formatNumber(data.visits)}</strong></span></article>
        <article><Hospital size={19} /><span><small>Inpatient admissions</small><strong>{formatNumber(data.inpatientAdmissions)}</strong></span></article>
        <article><FileHeart size={19} /><span><small>Prescriptions</small><strong>{formatNumber(data.prescriptions)}</strong></span></article>
        <article><FlaskConical size={19} /><span><small>Lab tests</small><strong>{formatNumber(data.labTests)}</strong></span></article>
      </section>

      <aside className="analytics-provenance"><Database size={17} /><div><strong>Source and interpretation</strong><p>eHealth Kerala public dashboard, data through {formatDate(data.referenceDate)}; source checked {data.fetchedAt}. The source publishes institution coverage and digital service transactions, but not sanctioned posts, staff in position or vacancies. District visit counts indicate recorded eHealth workload and are not a standalone measure of staffing need.</p><div className="source-links"><Link href={data.sourceUrl} target="_blank">eHealth project dashboard <ExternalLink size={12} /></Link><Link href="https://dashboard.ehealth.kerala.gov.in/" target="_blank">State Digital Health Mission <ExternalLink size={12} /></Link></div></div></aside>
    </div>
  );
}

function Kpi({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: React.ReactNode; tone: "good" | "info" }) {
  return <article className={`analytics-kpi tone-${tone}`}><div className="analytics-kpi-top"><span>{label}</span>{icon}</div><strong>{value}</strong><div className="analytics-kpi-bottom"><span>{detail}</span></div></article>;
}

function formatNumber(value: number) { return value.toLocaleString("en-IN"); }
function formatDate(value: string) { return value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : ""; }
function shortDistrict(value: string) { return value.replace("Thiruvananthapuram", "TVM").replace("Pathanamthitta", "PTA").replace("Ernakulam", "EKM").replace("Kasaragod", "Kasaragod"); }
function shortFacility(value: string) { return value.replace("Medical College Hospitals", "Medical colleges").replace("Taluk Hospitals", "Taluk hospitals").replace("Specialty Hospital", "Specialty").replace("Public Health Labs", "Public health labs"); }
function sentenceCase(value: string) { return value.toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase()).replace(/\bPhc\b/g, "PHC").replace(/\bChc\b/g, "CHC").replace(/\bFhc\b/g, "FHC"); }
function openReview(title: string) { window.dispatchEvent(new CustomEvent("cmd-stage1-review", { detail: { title } })); }
