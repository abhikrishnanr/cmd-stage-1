"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight, ArrowUpRight, BarChart3, Building2, CloudLightning, Database, Droplets,
  HeartPulse, LandPlot, Landmark, MessageSquareText, PieChart,
  Mic, ReceiptIndianRupee, Rocket, Search, ShieldCheck, ShoppingBasket, Stethoscope, TrendingUp, Zap,
  type LucideIcon,
} from "lucide-react";
import { stageModules } from "@/data/modules";
import type { CmoData, EcoStatData, IndustryKeraData } from "@/data/departmentSources";
import planspaceJson from "@/data/planspace-source.json";
import {
  chartPalette, mainDreamProjects, mainGuaranteeProgress,
  mainHealthTrend, type DemoChart,
} from "@/data/demoDashboards";
import { usePortal } from "./PortalContext";
import { ModuleIcon } from "./ModuleIcon";
import { AnalyticsChart } from "./AnalyticsChart";
import { SignalBadge, type DataSignalTone } from "./SignalBadge";

const priorityIcons: Record<string, LucideIcon> = {
  income: TrendingUp, expenditure: ReceiptIndianRupee, budget: PieChart,
  business: Building2, disaster: CloudLightning, grievance: MessageSquareText,
  health: HeartPulse, indira: ShieldCheck, dream: Rocket,
};

const currentPlanYear = planspaceJson.yearwise_monthwise.find((year) => year.is_current)!;
const latestPlanMonth = currentPlanYear.months.at(-1)!;
const planTotals = planspaceJson.at_a_glance;
const totalPlanOutlay = planTotals.state_outlay + planTotals.css_outlay + planTotals.lsgi_outlay;
const totalPlanExpense = planTotals.state_expenditure + planTotals.css_expenditure + planTotals.lsgi_expenditure;

export function DashboardClient({ ecoStatData, industryKeraData, cmoData }: { ecoStatData: EcoStatData; industryKeraData: IndustryKeraData; cmoData: CmoData }) {
  const { activeRole } = usePortal();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stageModules;
    return stageModules.filter((module) => `${module.name} ${module.description} ${module.scope.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  const priceMovers = useMemo(() => ecoStatData.latest
    .map((row) => ({ commodity: shorten(row.commodity, 23), movement: row.price != null && row.prevDay ? Math.abs(((row.price - row.prevDay) / row.prevDay) * 100) : 0 }))
    .filter((row) => row.movement > 0)
    .sort((a, b) => b.movement - a.movement)
    .slice(0, 10), [ecoStatData.latest]);

  const industryDistricts = useMemo(() => [...industryKeraData.districts]
    .sort((a, b) => b.enterprises - a.enterprises)
    .slice(0, 10)
    .map((row) => ({ district: shortDistrict(row.district), enterprises: row.enterprises })), [industryKeraData.districts]);

  const priorityCards = [
    { id: "income", name: "Income", value: "₹1.12L Cr", detail: "Revenue recorded in the existing CMO portal reference", source: "CMO reference", tone: "good", href: "/modules/budget-income-revenue" },
    { id: "expenditure", name: "Expenditure", value: `₹${formatNumber(totalPlanExpense)} Cr`, detail: `Plan expenditure through ${latestPlanMonth.month_name} 2026`, source: "Planspace", tone: "info", href: "/modules/planspace" },
    { id: "budget", name: "Budget & Utilization", value: `${latestPlanMonth.overall_perc.toFixed(2)}%`, detail: `₹${formatNumber(totalPlanOutlay)} Cr plan outlay`, source: "Planspace", tone: "watch", href: "/modules/planspace" },
    { id: "business", name: "Investments & Business", value: `₹${formatNumber(industryKeraData.investment)} Cr`, detail: `${formatNumber(industryKeraData.enterprises)} enterprises`, source: "Year of Enterprises", tone: "good", href: "/modules/k-swift" },
    { id: "disaster", name: "Disaster Monitoring", value: "37 reservoirs", detail: "Daily KSDMA dam bulletin coverage", source: "KSDMA · 25 Nov 2026", tone: "info", href: "/modules/disaster-management" },
    { id: "grievance", name: "Grievance & Feedback", value: formatNumber(cmoData.grievances), detail: `${formatNumber(cmoData.applicationsDisposed)} disposed of ${formatNumber(cmoData.applicationsReceived)} in the processing series`, source: `CMO · ${cmoData.lastUpdatedDisplay}`, tone: "watch", href: "/modules/cmo" },
    { id: "health", name: "Health", value: "1,114", detail: "eHealth institutions in the existing portal reference", source: "CMO reference", tone: "info", href: "/modules/e-health" },
    { id: "indira", name: "Indira Guarantees", value: "12.54 Cr", detail: "Priyadarshini journeys reported at 97 days", source: "I&PRD · 22 Sep 2026", tone: "good", href: "/modules/ksrtc" },
    { id: "dream", name: "Dream Projects", value: "₹72,115 Cr", detail: "Mission Samudra programme value in the existing portal", source: "CMO reference", tone: "info", href: "/modules/mission-samudra" },
  ];

  const overviewCharts: DemoChart[] = [
    {
      id: "plan-monthly", title: "Plan utilisation in 2026–27", subtitle: "Cumulative utilisation through November · Planspace",
      type: "line", xKey: "month",
      data: currentPlanYear.months.map((row) => ({ month: row.month_name.slice(0, 3), state: row.state_perc, css: row.central_perc, overall: row.overall_perc })),
      series: [{ key: "state", label: "State incl. LSGI", color: chartPalette.blue }, { key: "css", label: "CSS", color: chartPalette.amber }, { key: "overall", label: "Overall", color: chartPalette.teal }], unit: "%",
    },
    {
      id: "industry-districts", title: "Enterprises by district", subtitle: "Top districts by enterprises started · departmental public dashboard",
      type: "bar", xKey: "district", data: industryDistricts, series: [{ key: "enterprises", label: "Enterprises", color: chartPalette.blue }],
    },
    {
      id: "ecostat-movers", title: "Daily wholesale price movement", subtitle: `Largest absolute one-day changes · ${formatDate(ecoStatData.priceDate)}`,
      type: "bar", xKey: "commodity", data: priceMovers, series: [{ key: "movement", label: "Absolute change", color: chartPalette.orange }], unit: "%", horizontal: true,
    },
    {
      id: "priyadarshini", title: "Priyadarshini travel", subtitle: "Official journey milestones in 2026", type: "bar", xKey: "measure",
      data: [{ measure: "First week daily", value: 11 }, { measure: "97-day daily", value: 14 }, { measure: "Peak day", value: 15 }],
      series: [{ key: "value", label: "Journeys", color: chartPalette.violet }], unit: "Lakh",
    },
    {
      id: "main-grievances", title: "Petitions and applications by intake channel", subtitle: `Official CMO dashboard · statistics since ${cmoData.statisticsSince}`, type: "bar", xKey: "channel", data: cmoData.channels,
      series: [{ key: "received", label: "Petitions", color: chartPalette.violet }],
    },
    {
      id: "main-health", title: "Health surveillance", subtitle: "Reported disease cases · existing CMO reference series", type: "line", xKey: "month", data: mainHealthTrend,
      series: [{ key: "dengue", label: "Dengue", color: chartPalette.red }, { key: "lepto", label: "Leptospirosis", color: chartPalette.amber }, { key: "chikungunya", label: "Chikungunya", color: chartPalette.violet }],
    },
    {
      id: "main-guarantees", title: "Indira Guarantees", subtitle: "Programme progress · existing CMO reference series", type: "bar", xKey: "guarantee", data: mainGuaranteeProgress,
      series: [{ key: "progress", label: "Progress", color: chartPalette.green }], unit: "%", horizontal: true,
    },
    {
      id: "main-dream-projects", title: "Dream Projects", subtitle: "Physical and financial progress · existing CMO reference series", type: "bar", xKey: "project", data: mainDreamProjects,
      series: [{ key: "physical", label: "Physical", color: chartPalette.blue }, { key: "financial", label: "Financial", color: chartPalette.amber }], unit: "%",
    },
  ];

  return (
    <div className="page-stack dashboard-page analytics-dashboard">
      <section className="dashboard-hero analytics-dashboard-hero">
        <div className="hero-pattern" /><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="hero-content">
          <div className="hero-kicker"><span>Government of Kerala</span><i /> Stage 1</div>
          <h1>Chief Minister Dashboard</h1>
          <p>Income, expenditure, plan utilisation, investment, public services, guarantees, disaster monitoring and priority projects.</p>
          <div className="hero-role"><span className="hero-role-avatar">{activeRole.initials}</span><div><small>Current role</small><strong>{activeRole.name} · {activeRole.title}</strong><span>{activeRole.focus}</span></div></div>
        </div>
        <div className="hero-brief analytics-hero-brief">
          <span className="source-date-chip"><Database size={14} /> Dated departmental sources</span>
          <div className="brief-number">10</div><strong>main modules</strong><div className="brief-rule" />
          <div className="brief-row"><BarChart3 size={15} /><span>Charts, tables and district comparisons</span></div>
          <div className="brief-row muted"><ShieldCheck size={15} /><span>Planspace source: 23 Nov 2026</span></div>
        </div>
      </section>

      <section aria-labelledby="key-indicators-title">
        <div className="section-heading analytics-section-heading"><div><span className="section-kicker">Overall performance</span><h2 id="key-indicators-title">Key indicators</h2><p>Confirmed values from Planspace, EcoStat, Industries, Priyadarshini and the official CMO dashboard.</p></div><span className="analytics-count"><Database size={15} /> Source dates shown in each module</span></div>
        <div className="analytics-kpi-grid" style={{ marginTop: 16 }}>
          <Kpi label="Plan outlay" value={`₹${formatNumber(totalPlanOutlay)} Cr`} detail="2026–27" tone="info" icon={Landmark} />
          <Kpi label="Plan expenditure" value={`₹${formatNumber(totalPlanExpense)} Cr`} detail={`Through ${latestPlanMonth.month_name}`} tone="good" icon={ReceiptIndianRupee} />
          <Kpi label="Overall utilisation" value={`${latestPlanMonth.overall_perc.toFixed(2)}%`} detail="Planspace" tone="watch" icon={PieChart} />
          <Kpi label="Enterprises" value={formatNumber(industryKeraData.enterprises)} detail="Year of Enterprises" tone="good" icon={Building2} />
          <Kpi label="Wholesale commodities" value={formatNumber(ecoStatData.latest.length)} detail={formatDate(ecoStatData.priceDate)} tone="info" icon={ShoppingBasket} />
          <Kpi label="CMO grievances" value={formatNumber(cmoData.grievances)} detail={cmoData.lastUpdatedDisplay} tone="watch" icon={MessageSquareText} />
        </div>
      </section>

      <section className="priority-views executive-priorities" aria-labelledby="priority-views-title">
        <div className="section-heading priority-heading"><div><span className="section-kicker">Main dashboard</span><h2 id="priority-views-title">Priority areas</h2><p>The nine areas selected for the Chief Minister&apos;s first-stage view.</p></div><span className="priority-seal"><Landmark size={15} /> Stage 1</span></div>
        <div className="executive-priority-grid">
          {priorityCards.map((item, index) => {
            const Icon = priorityIcons[item.id];
            return <Link href={item.href} className={`executive-priority-card tone-${item.tone}`} key={item.id}><div className="executive-priority-head"><span>{String(index + 1).padStart(2, "0")}</span><i><Icon size={20} /></i><ArrowUpRight size={17} /></div><h3>{item.name}</h3><strong>{item.value}</strong><p>{item.detail}</p><span className="priority-source">{item.source}</span></Link>;
          })}
        </div>
      </section>

      <section className="section-card cm-review-section">
        <div className="section-heading"><div><span className="section-kicker">Follow-up</span><h2>Items for CM review</h2><p>Source-backed matters visible in the present data and the agreed departmental exchanges.</p></div></div>
        <div className="cm-review-grid">
          <ReviewItem number="01" title="Plan utilisation" text={`Overall utilisation is ${latestPlanMonth.overall_perc.toFixed(2)}%; CSS is ${latestPlanMonth.central_perc.toFixed(2)}% and LSGI is ${planTotals.lsgi_perc.toFixed(2)}% through November.`} source="Planspace · 23 Nov 2026" tone="watch" />
          <ReviewItem number="02" title="Source reconciliation" text="Rural Development and General Services show expenditure above outlay in the supplied Planspace file. Confirm classification before using these as performance conclusions." source="Planspace · 23 Nov 2026" tone="risk" />
          <ReviewItem number="03" title="Enterprise delivery" text={`${formatNumber(industryKeraData.enterprises)} enterprises report ₹${formatNumber(industryKeraData.investment)} Cr investment and ${formatNumber(industryKeraData.employment)} employment.`} source={`Industries · checked ${industryKeraData.fetchedAt}`} tone="good" />
          <ReviewItem number="04" title="Disaster data exchange" text="KSDMA routine monitoring and War Room fields are mapped. The dashboard is ready to receive dated rainfall, river, dam, camp, relief and response-team updates." source="Department meeting note and KSDMA formats" tone="info" />
        </div>
      </section>

      <section className="analytics-section" aria-labelledby="charts-title">
        <div className="section-heading analytics-section-heading"><div><span className="section-kicker">Charts</span><h2 id="charts-title">Performance and trends</h2><p>Financial, economic, service and project views with the source basis stated in each chart.</p></div><span className="analytics-count"><BarChart3 size={15} /> {overviewCharts.length} charts</span></div>
        <div className="executive-chart-grid">
          {overviewCharts.map((chart, index) => <article id={chart.id === "main-guarantees" ? "indira-performance" : undefined} className={`analytics-panel ${index === 0 ? "executive-panel-wide" : ""}`} key={chart.id}><div className="analytics-panel-head"><div><h3>{chart.title}</h3><p>{chart.subtitle}</p></div><div className="analytics-panel-actions"><span>{chart.type === "area" || chart.type === "line" ? "Trend" : "Comparison"}</span><button type="button" onClick={() => openReview(`Review: ${chart.title}`)}><Mic size={12} /> Review</button></div></div><AnalyticsChart chart={chart} /></article>)}
        </div>
      </section>

      <section className="section-card departmental-feeds">
        <div className="section-heading"><div><span className="section-kicker">Department data streams</span><h2>Fields prepared for department sharing</h2><p>The following sections are included without inventing current values.</p></div></div>
        <div className="feed-field-grid">
          <FeedCard icon={Stethoscope} title="Health" text="Medical staff availability and vacancies, medicine stock, hospital capacity and disease surveillance." />
          <FeedCard icon={Zap} title="Power" text="Power availability, peak demand, electricity consumption, outages and service-area breakdown." />
          <FeedCard icon={Droplets} title="Water" text="Availability, shortages, supply interruptions, storage and regional coverage." />
          <FeedCard icon={LandPlot} title="Land bank" text="Parcel inventory, district, ownership, extent, infrastructure readiness and constraints." />
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading"><div><span className="section-kicker"><Database size={14} /> Source register</span><h2>Data basis and reference dates</h2><p>Each current figure is tied to a departmental source or identified as an existing CMO reference series.</p></div></div>
        <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Area</th><th>Source</th><th>Reference date</th><th>Coverage</th></tr></thead><tbody>
          <SourceRow area="Plan expenditure" source="Planspace supplied JSON" date="23 Nov 2026" coverage="Outlay, expenditure, utilisation, sectors, departments and sanctions" />
          <SourceRow area="Market prices" source="EcoStat public datasets" date={formatDate(ecoStatData.priceDate)} coverage={`${formatNumber(ecoStatData.dailyTotal)} district/centre daily records`} />
          <SourceRow area="State economy" source="EcoStat GSDP/NSDP dataset" date="2024–25 Quick Estimate" coverage="GSDP, NSDP, growth and per-capita measures" />
          <SourceRow area="Investments and business" source="Year of Enterprises public dashboard" date={industryKeraData.fetchedAt} coverage="Enterprises, investment, employment, district, category and participation" />
          <SourceRow area="Priyadarshini" source="Kerala I&PRD 97-day report" date="22 Sep 2026" coverage="Journeys, daily and peak use, zero-ticket value" />
          <SourceRow area="Disaster monitoring" source="KSDMA daily reports and department exchange" date="25–26 Nov 2026" coverage="Reservoir bulletin plus routine and War Room field structure" />
          <SourceRow area="CMO grievances" source="cmo.kerala.gov.in" date={cmoData.lastUpdatedDisplay} coverage="Offices, grievances, CMDRF, petition/application channels, processing and department totals" />
        </tbody></table></div>
      </section>

      <section id="modules" className="section-card module-directory dashboard-module-directory">
        <div className="section-heading"><div><span className="section-kicker">Stage 1 modules</span><h2>Open a detailed dashboard</h2><p>Detailed charts, comparisons, registers and source notes for each area.</p></div><span className="result-count">{filtered.length} of {stageModules.length}</span></div>
        <div className="directory-tools analytics-directory-tools"><label className="module-search"><Search size={17} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dashboards" />{query ? <button onClick={() => setQuery("")} type="button">Clear</button> : <kbd>/</kbd>}</label></div>
        {filtered.length ? <div className="module-grid">{filtered.map((module) => <Link href={`/modules/${module.slug}`} className="module-card analytics-module-card" style={{ "--module-color": module.accent } as CSSProperties} key={module.slug}><div className="module-card-top"><span className="module-number">{String(module.order).padStart(2, "0")}</span><span className="module-card-icon"><ModuleIcon name={module.icon} size={23} /></span><ArrowRight className="module-arrow" size={18} /></div><h3>{module.name}</h3><p>{module.description}</p><div className="module-card-bottom analytics-module-bottom"><span><BarChart3 size={13} /> Open dashboard</span><strong>View <ArrowRight size={13} /></strong></div></Link>)}</div> : <div className="no-results"><Search size={24} /><h3>No matching dashboard</h3><p>Clear the search to view all Stage 1 modules.</p><button onClick={() => setQuery("")}>Reset search</button></div>}
      </section>
    </div>
  );
}

function Kpi({ label, value, detail, tone, icon: Icon }: { label: string; value: string; detail: string; tone: "good" | "watch" | "info"; icon: LucideIcon }) {
  return <article className={`analytics-kpi tone-${tone}`}><div className="analytics-kpi-top"><span>{label}</span><Icon size={16} /></div><strong>{value}</strong><div className="analytics-kpi-bottom"><span>{detail}</span></div></article>;
}

function ReviewItem({ number, title, text, source, tone }: { number: string; title: string; text: string; source: string; tone: DataSignalTone }) {
  const signalLabel = tone === "risk" ? "Critical" : tone === "watch" ? "Watch" : tone === "good" ? "On track" : "Information";
  return <article className={`cm-review-item tone-${tone}`}><span>{number}</span><div><div className="review-title-row"><h3>{title}</h3><SignalBadge value={signalLabel} tone={tone} force /></div><p>{text}</p><small>{source}</small><button type="button" className="inline-review-button" onClick={() => openReview(`Review: ${title}`)}><Mic size={12} /> Send for review</button></div></article>;
}

function FeedCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <article><Icon size={19} /><h3>{title}</h3><p>{text}</p><span>Department data exchange</span></article>;
}

function SourceRow({ area, source, date, coverage }: { area: string; source: string; date: string; coverage: string }) {
  return <tr><td><strong>{area}</strong></td><td>{source}</td><td>{date}</td><td>{coverage}</td></tr>;
}

function formatNumber(value: number) { return value.toLocaleString("en-IN", { maximumFractionDigits: 2 }); }
function formatDate(value: string) { return value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"; }
function shorten(value: string, length: number) { return value.length > length ? `${value.slice(0, length - 1)}…` : value; }
function shortDistrict(value: string) { return value.replace("Thiruvananthapuram", "TVM").replace("Pathanamthitta", "PTA").replace("Ernakulam", "EKM"); }
function openReview(title: string) { window.dispatchEvent(new CustomEvent("cmd-stage1-review", { detail: { title } })); }
