"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  ClipboardList,
  CloudUpload,
  Database,
  FileSpreadsheet,
  Info,
  Network,
  PlugZap,
} from "lucide-react";
import { stageModules, type StageModule } from "@/data/modules";
import { ModuleIcon } from "./ModuleIcon";
import { StatusPill } from "./StatusPill";
import { usePortal } from "./PortalContext";

type DetailTab = "overview" | "readiness" | "integration";

const tabs: { id: DetailTab; label: string; icon: typeof Info }[] = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "readiness", label: "Data readiness", icon: Database },
  { id: "integration", label: "Integration plan", icon: PlugZap },
];

export function ModuleDetail({ module }: { module: StageModule }) {
  const [tab, setTab] = useState<DetailTab>("overview");
  const { activeRole } = usePortal();
  const previous = stageModules[module.order - 2];
  const next = stageModules[module.order];

  return (
    <div className="page-stack module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Stage 1 overview</Link>
        <ChevronRight size={13} />
        <span>{module.name}</span>
      </div>

      <section className="module-hero" style={{ "--module-accent": module.accent } as React.CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><ModuleIcon name={module.icon} size={30} /></div>
          <div>
            <div className="module-hero-kicker">Module {String(module.order).padStart(2, "0")} · Stage 1</div>
            <h1>{module.name}</h1>
            <p>{module.description}</p>
          </div>
        </div>
        <div className="module-hero-side">
          <span>Documented data pathway</span>
          <StatusPill status={module.apiStatus} />
          <small>Current view: {activeRole.title}</small>
        </div>
      </section>

      <div className="module-tabs" role="tablist" aria-label={`${module.name} sections`}>
        {tabs.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={tab === item.id}
              aria-controls={`panel-${item.id}`}
              className={tab === item.id ? "active" : ""}
              onClick={() => setTab(item.id)}
            >
              <Icon size={16} /> {item.label}
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <div id="panel-overview" role="tabpanel" className="detail-grid">
          <section className="section-card detail-primary">
            <div className="detail-heading">
              <span className="detail-icon"><ClipboardList size={19} /></span>
              <div><span>Confirmed requirement</span><h2>Scope for Stage 1</h2></div>
            </div>
            <div className="scope-list">
              {module.scope.map((item, index) => (
                <div className="scope-item" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                  <CheckCircle2 size={17} />
                </div>
              ))}
            </div>
            {module.scope.length === 1 && (
              <div className="boundary-note"><Info size={17} /><p>No further sub-modules or metric fields were specified for this service in the Stage 1 requirements.</p></div>
            )}
          </section>

          <aside className="detail-aside">
            <section className="section-card pathway-card">
              <span className="section-kicker">Data pathway</span>
              <h3>{module.apiLabel}</h3>
              <p>{module.nextAction}</p>
              <button onClick={() => setTab("integration")} className="text-button">View integration plan <ArrowRight size={15} /></button>
            </section>
            <EmptyMetrics />
          </aside>
        </div>
      )}

      {tab === "readiness" && (
        <div id="panel-readiness" role="tabpanel" className="detail-grid">
          <section className="section-card detail-primary readiness-detail">
            <div className="detail-heading">
              <span className="detail-icon"><Database size={19} /></span>
              <div><span>Stage 1 readiness</span><h2>Data connection status</h2></div>
            </div>
            <div className={`connection-status connection-${module.apiStatus}`}>
              <div className="connection-icon">
                {module.apiStatus === "available" ? <CheckCircle2 size={25} /> : module.apiStatus === "nic" ? <Network size={25} /> : <CircleDashed size={25} />}
              </div>
              <div><span>Documented availability</span><h3>{module.apiLabel}</h3><p>{module.nextAction}</p></div>
            </div>
            <div className="not-connected-panel">
              <div className="not-connected-visual"><Database size={28} /><span /></div>
              <div><h3>No live metric data connected</h3><p>This version does not display sample values. Dashboard measures can be introduced after the documented data pathway and fields are confirmed.</p></div>
            </div>
          </section>
          <aside className="detail-aside">
            {module.intake ? <IntakePlaceholder module={module} /> : <ConfigurationCard />}
          </aside>
        </div>
      )}

      {tab === "integration" && (
        <div id="panel-integration" role="tabpanel" className="detail-grid">
          <section className="section-card detail-primary integration-plan">
            <div className="detail-heading">
              <span className="detail-icon"><PlugZap size={19} /></span>
              <div><span>Documented next step</span><h2>Integration action</h2></div>
            </div>
            <div className="action-statement">
              <span>Next action</span>
              <p>{module.nextAction}</p>
            </div>
            <div className="integration-boundary">
              <Info size={18} />
              <div><strong>Configuration boundary</strong><p>No endpoint, credentials, data schema, refresh schedule or metric values are included in this portal version.</p></div>
            </div>
          </section>
          <aside className="detail-aside">
            <section className="section-card view-context-card">
              <span className="section-kicker">Workflow view</span>
              <div className="context-avatar">{activeRole.initials}</div>
              <h3>{activeRole.name}</h3>
              <p>{activeRole.title}</p>
              <div className="context-focus">{activeRole.focus}</div>
            </section>
            {module.intake && <IntakePlaceholder module={module} compact />}
          </aside>
        </div>
      )}

      <nav className="module-pagination" aria-label="Module navigation">
        {previous ? (
          <Link href={`/modules/${previous.slug}`}><ChevronLeft size={17} /><span><small>Previous module</small><strong>{previous.shortName}</strong></span></Link>
        ) : <span />}
        {next ? (
          <Link href={`/modules/${next.slug}`}><span><small>Next module</small><strong>{next.shortName}</strong></span><ChevronRight size={17} /></Link>
        ) : <Link href="/dashboard"><span><small>Return to</small><strong>Stage 1 overview</strong></span><ChevronRight size={17} /></Link>}
      </nav>
    </div>
  );
}

function EmptyMetrics() {
  return (
    <section className="section-card empty-metrics-card">
      <div className="empty-mini-chart"><span /><span /><span /><span /></div>
      <h3>Metrics awaiting connection</h3>
      <p>No placeholder figures are displayed.</p>
    </section>
  );
}

function ConfigurationCard() {
  return (
    <section className="section-card configuration-card">
      <PlugZap size={22} />
      <span className="section-kicker">Connection configuration</span>
      <h3>Not configured</h3>
      <p>Connection details will be added after the documented integration action is completed.</p>
    </section>
  );
}

function IntakePlaceholder({ module, compact = false }: { module: StageModule; compact?: boolean }) {
  if (!module.intake) return null;
  return (
    <section className={`section-card intake-card ${compact ? "compact" : ""}`}>
      <span className="section-kicker">Planned interface</span>
      <div className="intake-icon">{module.intake.mode === "entry-upload" ? <FileSpreadsheet size={23} /> : <CloudUpload size={23} />}</div>
      <h3>{module.intake.title}</h3>
      <p>{module.intake.description}</p>
      {!compact && (
        <div className="disabled-dropzone" aria-disabled="true">
          <CloudUpload size={23} />
          <strong>Interface not connected</strong>
          <span>File selection and submission are unavailable in this version.</span>
        </div>
      )}
    </section>
  );
}
