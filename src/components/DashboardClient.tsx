"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CloudLightning,
  Database,
  HeartPulse,
  Landmark,
  MessageSquareText,
  PieChart,
  ReceiptIndianRupee,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { stageModules } from "@/data/modules";
import {
  chartPalette,
  mainBusinessPerformance,
  mainDisasterRisk,
  mainDreamProjects,
  mainFiscalComparison,
  mainGuaranteeProgress,
  mainGrievanceTrend,
  mainHealthTrend,
  mainPriorityCards,
  type DemoChart,
} from "@/data/demoDashboards";
import { usePortal } from "./PortalContext";
import { ModuleIcon } from "./ModuleIcon";
import { AnalyticsChart } from "./AnalyticsChart";

const priorityIcons: Record<string, LucideIcon> = {
  income: TrendingUp,
  expenditure: ReceiptIndianRupee,
  budget: PieChart,
  business: Building2,
  disaster: CloudLightning,
  grievance: MessageSquareText,
  health: HeartPulse,
  indira: ShieldCheck,
  dream: Rocket,
};

const overviewCharts: DemoChart[] = [
  {
    id: "main-fiscal",
    title: "Income, expenditure and plan fund",
    subtitle: "Planned value versus achieved / utilized value (₹ Cr)",
    type: "bar",
    xKey: "category",
    data: mainFiscalComparison,
    series: [
      { key: "plan", label: "Plan / target", color: chartPalette.blue },
      { key: "achieved", label: "Achieved / spent", color: chartPalette.teal },
    ],
    unit: "₹ Cr",
  },
  {
    id: "main-business",
    title: "Investments and business delivery",
    subtitle: "Agency physical versus financial progress",
    type: "bar",
    xKey: "agency",
    data: mainBusinessPerformance,
    series: [
      { key: "physical", label: "Physical", color: chartPalette.blue },
      { key: "financial", label: "Financial", color: chartPalette.amber },
    ],
    unit: "%",
  },
  {
    id: "main-disaster",
    title: "Disaster monitoring",
    subtitle: "District composite risk score",
    type: "bar",
    xKey: "district",
    data: mainDisasterRisk,
    series: [{ key: "risk", label: "Risk score", color: chartPalette.red }],
    horizontal: true,
  },
  {
    id: "main-health",
    title: "Health surveillance",
    subtitle: "Monthly reported disease cases",
    type: "line",
    xKey: "month",
    data: mainHealthTrend,
    series: [
      { key: "dengue", label: "Dengue", color: chartPalette.red },
      { key: "lepto", label: "Leptospirosis", color: chartPalette.amber },
      { key: "chikungunya", label: "Chikungunya", color: chartPalette.violet },
    ],
  },
  {
    id: "main-grievances",
    title: "Grievance and feedback flow",
    subtitle: "Weekly cases received and resolved",
    type: "area",
    xKey: "week",
    data: mainGrievanceTrend,
    series: [
      { key: "received", label: "Received", color: chartPalette.orange },
      { key: "resolved", label: "Resolved", color: chartPalette.green },
    ],
  },
  {
    id: "main-guarantees",
    title: "Indira Guarantees performance",
    subtitle: "Progress across six guarantee programmes",
    type: "bar",
    xKey: "guarantee",
    data: mainGuaranteeProgress,
    series: [{ key: "progress", label: "Progress", color: chartPalette.green }],
    unit: "%",
    horizontal: true,
  },
  {
    id: "main-dream-projects",
    title: "Dream Projects",
    subtitle: "Physical versus financial progress",
    type: "bar",
    xKey: "project",
    data: mainDreamProjects,
    series: [
      { key: "physical", label: "Physical", color: chartPalette.blue },
      { key: "financial", label: "Financial", color: chartPalette.amber },
    ],
    unit: "%",
  },
];

export function DashboardClient() {
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

  return (
    <div className="page-stack dashboard-page analytics-dashboard">
      <section className="dashboard-hero analytics-dashboard-hero">
        <div className="hero-pattern" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-content">
          <div className="hero-kicker"><span>Government of Kerala</span><i /> Stage 1 executive dashboard</div>
          <h1>Kerala at a glance.</h1>
          <p>Financial performance, public services, guarantees, risks and priority projects in one decision view.</p>
          <div className="hero-role">
            <span className="hero-role-avatar">{activeRole.initials}</span>
            <div><small>Current role view</small><strong>{activeRole.name} · {activeRole.title}</strong><span>{activeRole.focus}</span></div>
          </div>
        </div>
        <div className="hero-brief analytics-hero-brief">
          <span className="demo-data-badge light"><Database size={14} /> Demo data</span>
          <div className="brief-number">9</div>
          <strong>executive priority views</strong>
          <div className="brief-rule" />
          <div className="brief-row"><BarChart3 size={15} /><span>Charts, comparisons and trends</span></div>
          <div className="brief-row muted"><ShieldCheck size={15} /><span>Seeded from the existing main portal</span></div>
        </div>
      </section>

      <section className="priority-views executive-priorities" aria-labelledby="priority-views-title">
        <div className="section-heading priority-heading">
          <div>
            <span className="section-kicker">Main dashboard</span>
            <h2 id="priority-views-title">Executive priorities</h2>
            <p>The nine most prominent measures requested for Stage 1.</p>
          </div>
          <span className="priority-seal"><Landmark size={15} /> Portfolio overview</span>
        </div>
        <div className="executive-priority-grid">
          {mainPriorityCards.map((item, index) => {
            const Icon = priorityIcons[item.id];
            return (
              <Link href={item.href} className={`executive-priority-card tone-${item.tone}`} key={item.id}>
                <div className="executive-priority-head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i><Icon size={20} /></i>
                  <ArrowUpRight size={17} />
                </div>
                <h3>{item.name}</h3>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="analytics-section executive-analysis" aria-labelledby="executive-analysis-title">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Decision views</span>
            <h2 id="executive-analysis-title">Performance and trends</h2>
            <p>Chart-led monitoring across finance, grievances, guarantees and major projects.</p>
          </div>
          <span className="demo-source-note"><Database size={14} /> Existing portal seed data</span>
        </div>
        <div className="executive-chart-grid">
          {overviewCharts.map((chart, index) => (
            <article id={chart.id === "main-guarantees" ? "indira-performance" : undefined} className={`analytics-panel ${index === 0 ? "executive-panel-wide" : ""}`} key={chart.id}>
              <div className="analytics-panel-head">
                <div><h3>{chart.title}</h3><p>{chart.subtitle}</p></div>
                <span>{chart.type === "area" ? "Trend" : "Comparison"}</span>
              </div>
              <AnalyticsChart chart={chart} />
            </article>
          ))}
        </div>
      </section>

      <section id="modules" className="section-card module-directory dashboard-module-directory">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Stage 1 modules</span>
            <h2>Open a detailed dashboard</h2>
            <p>Each module includes KPI cards, charts, comparisons and a supporting data table.</p>
          </div>
          <span className="result-count">{filtered.length} of {stageModules.length}</span>
        </div>

        <div className="directory-tools analytics-directory-tools">
          <label className="module-search">
            <Search size={17} />
            <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dashboards" />
            {query ? <button onClick={() => setQuery("")} type="button">Clear</button> : <kbd>/</kbd>}
          </label>
        </div>

        {filtered.length ? (
          <div className="module-grid">
            {filtered.map((module) => (
              <Link href={`/modules/${module.slug}`} className="module-card analytics-module-card" key={module.slug}>
                <div className="module-card-top">
                  <span className="module-number">{String(module.order).padStart(2, "0")}</span>
                  <span className="module-card-icon" style={{ color: module.accent, background: `${module.accent}12` }}><ModuleIcon name={module.icon} size={23} /></span>
                  <ArrowRight className="module-arrow" size={18} />
                </div>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
                <div className="module-card-bottom analytics-module-bottom"><span><BarChart3 size={13} /> Open dashboard</span><strong>View <ArrowRight size={13} /></strong></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search size={24} /><h3>No matching dashboard</h3><p>Clear the search to view all ten Stage 1 modules.</p><button onClick={() => setQuery("")}>Reset search</button>
          </div>
        )}
      </section>

      <aside className="analytics-provenance dashboard-provenance">
        <Database size={17} />
        <div><strong>Data basis</strong><p>All figures are demonstration values carried over from the existing main portal. They show the intended dashboard design and must not be read as a current operational feed.</p></div>
      </aside>
    </div>
  );
}
