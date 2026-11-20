"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CircleDashed,
  CloudLightning,
  Database,
  FileCheck2,
  Filter,
  HeartPulse,
  Landmark,
  MessageSquareText,
  Network,
  PieChart,
  ReceiptIndianRupee,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
  UserRoundCheck,
} from "lucide-react";
import { stageModules, statusMeta, type ApiStatus } from "@/data/modules";
import { usePortal } from "./PortalContext";
import { ModuleIcon } from "./ModuleIcon";
import { StatusPill } from "./StatusPill";

type StatusFilter = "all" | ApiStatus;

const filterOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All modules" },
  { value: "available", label: "API available" },
  { value: "nic", label: "NIC coordination" },
  { value: "not-available", label: "Alternative intake" },
];

interface PriorityView {
  name: string;
  note: string;
  icon: LucideIcon;
  tone: string;
  href?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  pending?: boolean;
}

const priorityViews: PriorityView[] = [
  {
    name: "Income",
    note: "Source module: Budget (Income / Revenue)",
    href: "/modules/budget-income-revenue",
    icon: TrendingUp,
    tone: "blue",
  },
  {
    name: "Expenditure",
    note: "Source modules: Planspace and Non-Plan Expenditure",
    href: "/modules/non-plan-expenditure",
    primaryLabel: "Non-plan expenditure",
    secondaryHref: "/modules/planspace",
    secondaryLabel: "Plan expenditure",
    icon: ReceiptIndianRupee,
    tone: "violet",
  },
  {
    name: "Budget & Utilization",
    note: "Source module: Planspace (Plan Expenditure)",
    href: "/modules/planspace",
    icon: PieChart,
    tone: "teal",
  },
  {
    name: "Investments & Business",
    note: "K-SWIFT is the related Stage 1 module; investment-detail scope is pending confirmation",
    href: "/modules/k-swift",
    icon: Building2,
    tone: "orange",
    pending: true,
  },
  {
    name: "Disaster Monitoring",
    note: "Source module: Disaster Management",
    href: "/modules/disaster-management",
    icon: CloudLightning,
    tone: "red",
  },
  {
    name: "Grievance & Feedback Monitoring",
    note: "No Stage 1 data source is confirmed; CMO is shown only as a related integration",
    href: "/modules/cmo",
    icon: MessageSquareText,
    tone: "indigo",
    pending: true,
  },
  {
    name: "Health",
    note: "Source module: e-Health",
    href: "/modules/e-health",
    icon: HeartPulse,
    tone: "rose",
  },
  {
    name: "Indira Guarantees",
    note: "Scope and data connection to be confirmed",
    icon: ShieldCheck,
    tone: "gold",
    pending: true,
  },
  {
    name: "Dream Projects",
    note: "Mission Samudra is the documented linked module; broader portfolio scope is pending",
    href: "/modules/mission-samudra",
    icon: Rocket,
    tone: "cyan",
  },
];

export function DashboardClient() {
  const { activeRole } = usePortal();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
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
    return stageModules.filter((module) => {
      const matchesStatus = status === "all" || module.apiStatus === status;
      const haystack = `${module.name} ${module.description} ${module.scope.join(" ")}`.toLowerCase();
      return matchesStatus && (!normalized || haystack.includes(normalized));
    });
  }, [query, status]);

  const available = stageModules.filter((module) => module.apiStatus === "available").length;
  const nic = stageModules.filter((module) => module.apiStatus === "nic").length;
  const alternate = stageModules.filter((module) => module.apiStatus === "not-available").length;

  return (
    <div className="page-stack dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-pattern" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-content">
          <div className="hero-kicker"><span>Government of Kerala</span><i /> Stage 1 command view</div>
          <h1>A focused portfolio for the first ten confirmed modules.</h1>
          <p>Review documented service scope, data availability and the next integration action without placeholder performance figures.</p>
          <div className="hero-role">
            <span className="hero-role-avatar">{activeRole.initials}</span>
            <div><small>Current role view</small><strong>{activeRole.name} · {activeRole.title}</strong><span>{activeRole.focus}</span></div>
          </div>
        </div>
        <div className="hero-brief">
          <div className="brief-head"><ShieldCheck size={18} /><span>Scope briefing</span></div>
          <div className="brief-number">10</div>
          <strong>confirmed modules</strong>
          <div className="brief-rule" />
          <div className="brief-row"><FileCheck2 size={15} /><span>Requirements mapped</span></div>
          <div className="brief-row muted"><Database size={15} /><span>Live metric data not connected</span></div>
        </div>
      </section>

      <section className="readiness-grid" aria-label="Documented data availability summary">
        <ReadinessCard icon={<CheckCircle2 />} value={available} label="API available" detail="Ready to begin the documented integration action" tone="green" />
        <ReadinessCard icon={<Network />} value={nic} label="NIC-coordinated" detail="Credentials and documentation to be obtained" tone="amber" />
        <ReadinessCard icon={<CircleDashed />} value={alternate} label="Alternative intake" detail="Upload, flat-file or data-entry path required" tone="slate" />
        <div className="role-focus-card">
          <div className="role-focus-icon"><UserRoundCheck size={20} /></div>
          <div><span>Role focus</span><strong>{activeRole.title}</strong><p>{activeRole.focus}</p></div>
        </div>
      </section>

      <section className="priority-views" aria-labelledby="priority-views-title">
        <div className="section-heading priority-heading">
          <div>
            <span className="section-kicker">Main dashboard</span>
            <h2 id="priority-views-title">Priority views</h2>
            <p>Nine requested views, connected to documented modules where Stage 1 scope exists.</p>
          </div>
          <span className="priority-seal"><Landmark size={15} /> Portfolio entry points</span>
        </div>
        <div className="priority-grid">
          {priorityViews.map((view, index) => {
            const Icon = view.icon;
            const hasDualLinks = Boolean(view.href && view.secondaryHref);
            const card = (
              <>
                <div className="priority-card-head">
                  <span className="priority-order">{String(index + 1).padStart(2, "0")}</span>
                  <span className="priority-icon"><Icon size={23} /></span>
                  {view.href && !hasDualLinks && <ArrowUpRight className="priority-arrow" size={18} />}
                </div>
                <h3>{view.name}</h3>
                <p>{view.note}</p>
                <div className="priority-card-foot">
                  {view.pending ? <span className="confirmation-tag"><CircleDashed size={12} /> Confirmation required</span> : <span className="mapped-tag"><CheckCircle2 size={12} /> Source mapped</span>}
                  {hasDualLinks && view.href && view.secondaryHref && (
                    <span className="priority-dual-links">
                      <Link className="secondary-theme-link" href={view.href}>{view.primaryLabel} <ArrowRight size={12} /></Link>
                      <Link className="secondary-theme-link" href={view.secondaryHref}>{view.secondaryLabel} <ArrowRight size={12} /></Link>
                    </span>
                  )}
                </div>
              </>
            );

            return hasDualLinks ? (
              <article key={view.name} className={`priority-card priority-${view.tone}`}>{card}</article>
            ) : view.href ? (
              <Link key={view.name} href={view.href} className={`priority-card priority-${view.tone}`}>{card}</Link>
            ) : (
              <article key={view.name} className={`priority-card priority-${view.tone} pending-card`}>{card}</article>
            );
          })}
        </div>
      </section>

      <section id="modules" className="section-card module-directory">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Stage 1 directory</span>
            <h2>Confirmed modules</h2>
            <p>Open a module to review scope, readiness and its integration plan.</p>
          </div>
          <span className="result-count">{filtered.length} of {stageModules.length}</span>
        </div>

        <div className="directory-tools">
          <label className="module-search">
            <Search size={17} />
            <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search modules or documented scope" />
            {query ? <button onClick={() => setQuery("")} type="button">Clear</button> : <kbd>/</kbd>}
          </label>
          <div className="filter-row" aria-label="Filter by data availability">
            <Filter size={15} />
            {filterOptions.map((option) => (
              <button key={option.value} onClick={() => setStatus(option.value)} className={status === option.value ? "active" : ""}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length ? (
          <div className="module-grid">
            {filtered.map((module) => (
              <Link href={`/modules/${module.slug}`} className="module-card" key={module.slug}>
                <div className="module-card-top">
                  <span className="module-number">{String(module.order).padStart(2, "0")}</span>
                  <span className="module-card-icon" style={{ color: module.accent, background: `${module.accent}12` }}>
                    <ModuleIcon name={module.icon} size={23} />
                  </span>
                  <ArrowRight className="module-arrow" size={18} />
                </div>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
                <div className="module-card-bottom">
                  <StatusPill status={module.apiStatus} compact />
                  <span>{module.scope.length} {module.scope.length === 1 ? "scope item" : "scope items"}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search size={24} />
            <h3>No matching Stage 1 module</h3>
            <p>Clear the search or choose a different readiness filter.</p>
            <button onClick={() => { setQuery(""); setStatus("all"); }}>Reset directory</button>
          </div>
        )}
      </section>

      <section className="section-card integration-register">
        <div className="section-heading compact">
          <div>
            <span className="section-kicker">Implementation reference</span>
            <h2>Integration register</h2>
            <p>Documented availability and the next action for each module.</p>
          </div>
        </div>
        <div className="register-table-wrap">
          <table className="register-table">
            <thead><tr><th>Module</th><th>Data pathway</th><th>Next documented action</th><th><span className="sr-only">Open</span></th></tr></thead>
            <tbody>
              {stageModules.map((module) => (
                <tr key={module.slug}>
                  <td><span className="table-index">{String(module.order).padStart(2, "0")}</span><strong>{module.name}</strong></td>
                  <td><StatusPill status={module.apiStatus} compact /></td>
                  <td>{module.nextAction}</td>
                  <td><Link href={`/modules/${module.slug}`} aria-label={`Open ${module.name}`}><ArrowRight size={16} /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ReadinessCard({ icon, value, label, detail, tone }: { icon: React.ReactNode; value: number; label: string; detail: string; tone: string }) {
  return (
    <div className={`readiness-card tone-${tone}`}>
      <div className="readiness-icon">{icon}</div>
      <div className="readiness-value">{value}</div>
      <strong>{label}</strong>
      <p>{detail}</p>
    </div>
  );
}
