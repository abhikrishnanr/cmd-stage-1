"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import {
  ArrowLeft,
  Building2,
  Database,
  ExternalLink,
  Factory,
  IndianRupee,
  LandPlot,
  Leaf,
  MapPinned,
  Sprout,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { IndustryKeraData } from "@/data/departmentSources";
import { ModuleHeaderMeta } from "@/components/ModuleHeaderMeta";

const orange = "#f5821f";
const blue = "#2563eb";
const teal = "#1aa6c9";
const green = "#16a34a";
const amber = "#f59e0b";
const violet = "#7c3aed";

const keraCoverage = [
  ["Districts", "12"], ["Blocks", "133"], ["Grama panchayats", "824"],
  ["Municipalities", "76"], ["Corporations", "5"], ["Agro-ecological units", "20"],
];

const keraTargets = [
  { indicator: "Farmers adopting climate-smart practices", target: "4,00,000" },
  { indicator: "Climate-resilient agriculture area", target: "1,00,000 ha" },
  { indicator: "Tree-crop replanting farmers", target: "70,000" },
  { indicator: "Climate-resilient seedlings", target: "22.5 million" },
  { indicator: "FPCs linked with agribusinesses", target: "150" },
  { indicator: "Agri-tech startup technologies incubated", target: "150" },
  { indicator: "Green-practice MSMEs", target: "200" },
  { indicator: "New agribusiness jobs", target: "1,000" },
];

export function IndustriesKeraDashboard({ data }: { data: IndustryKeraData }) {
  const districtData = data.districts.map((row) => ({ ...row, short: shortDistrict(row.district) }));
  const keraFunnel = data.keraSchemes.map((row) => ({ scheme: row.name.replace(" replantation", ""), applications: row.applications, sanctioned: row.sanctioned, disbursed: row.disbursedApplications }));
  const totalKeraDisbursed = data.keraSchemes.reduce((sum, row) => sum + row.disbursedAmount, 0);

  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs"><Link href="/dashboard"><ArrowLeft size={14} /> Chief Minister Dashboard</Link><span>/</span><span>Industries &amp; KERA</span></div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": orange } as CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><Factory size={30} /></div>
          <div><div className="module-hero-kicker">Industries Department and KERA</div><h1>Investments &amp; Business</h1><p>Year of Enterprises results, district and category comparisons, and KERA agricultural value-chain delivery.</p></div>
        </div>
        <ModuleHeaderMeta source="Industries Department & KERA" />
      </section>

      <section className="analytics-kpi-grid" aria-label="Industries key indicators">
        <Kpi label="Enterprises started" value={formatNumber(data.enterprises)} detail="Published headline" icon={<Building2 size={16} />} tone="good" />
        <Kpi label="Investment" value={`₹${formatNumber(data.investment)} Cr`} detail="Published headline" icon={<IndianRupee size={16} />} tone="info" />
        <Kpi label="Employment generated" value={formatNumber(data.employment)} detail="Published headline" icon={<Users size={16} />} tone="good" />
        <Kpi label="Female-led enterprises" value={formatNumber(data.gender.find((row) => row.group === "Female")?.enterprises || 0)} detail={`${data.gender.find((row) => row.group === "Female")?.percentage || 0}% of gender-classified rows`} icon={<Users size={16} />} tone="info" />
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading"><div><span className="section-kicker">Year of Enterprises</span><h2>District and category performance</h2><p>Units, investment and employment from the Industries Department public dashboard.</p></div><span className="analytics-count"><MapPinned size={15} /> 14 districts</span></div>
        <div className="analytics-chart-grid">
          <ChartPanel title="Enterprises by district" subtitle="Number of enterprises started" label="District comparison" wide>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 16, bottom: 48, left: 8 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="short" tick={axisTick} tickLine={false} axisLine={false} angle={-28} textAnchor="end" height={64} interval={0} />
                <YAxis tickFormatter={compact} tick={axisTick} tickLine={false} axisLine={false} width={52} />
                <Tooltip formatter={(value) => [formatNumber(Number(value)), "Enterprises"]} />
                <Bar dataKey="enterprises" name="Enterprises" fill={blue} radius={[7, 7, 2, 2]} maxBarSize={34} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
          <ChartPanel title="Investment by district" subtitle="₹ crore" label="District comparison">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...districtData].sort((a, b) => b.investment - a.investment)} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 12 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} />
                <XAxis type="number" tickFormatter={compact} tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="short" tick={axisTick} tickLine={false} axisLine={false} width={88} />
                <Tooltip formatter={(value) => [`₹${formatNumber(Number(value))} Cr`, "Investment"]} />
                <Bar dataKey="investment" name="Investment" fill={teal} radius={[0, 7, 7, 0]} maxBarSize={20} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>
        <div className="analytics-chart-grid" style={{ marginTop: 16 }}>
          <ChartPanel title="Enterprise category mix" subtitle="Manufacturing, service and trade" label="Units and employment">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.categories} margin={{ top: 10, right: 16, bottom: 20, left: 4 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="category" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={compact} tick={axisTick} tickLine={false} axisLine={false} width={52} />
                <Tooltip formatter={(value) => [formatNumber(Number(value)), ""]} /><Legend />
                <Bar dataKey="enterprises" name="Enterprises" fill={blue} radius={[6, 6, 2, 2]} isAnimationActive={false} />
                <Bar dataKey="employment" name="Employment" fill={amber} radius={[6, 6, 2, 2]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
          <ChartPanel title="Participation by gender" subtitle="Enterprises in the published gender classification" label="Share">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.gender} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 12 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} />
                <XAxis type="number" unit="%" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="group" tick={axisTick} tickLine={false} axisLine={false} width={92} />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "Share"]} />
                <Bar dataKey="percentage" name="Share" fill={violet} radius={[0, 7, 7, 0]} maxBarSize={26} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading"><div><span className="section-kicker"><MapPinned size={14} /> District details</span><h2>Year of Enterprises register</h2><p>Published headline values by district. Source subtotals may differ slightly from the headline and are retained as published.</p></div></div>
        <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>District</th><th>Enterprises</th><th>Investment (₹ Cr)</th><th>Employment</th></tr></thead><tbody>{data.districts.map((row) => <tr key={row.district}><td><strong>{row.district}</strong></td><td>{formatNumber(row.enterprises)}</td><td>{formatNumber(row.investment)}</td><td>{formatNumber(row.employment)}</td></tr>)}</tbody></table></div>
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading"><div><span className="section-kicker">KERA</span><h2>Kerala Climate Resilient Agri-Value Chain Modernization Project</h2><p>KERA is shown separately from Year of Enterprises, with project coverage, current replantation scheme flow and approved programme targets.</p></div><span className="analytics-count"><Leaf size={15} /> Agricultural value chains</span></div>
        <div className="analytics-kpi-grid">
          {keraCoverage.map(([label, value], index) => <Kpi key={label} label={label} value={value} detail="KERA coverage" icon={index < 2 ? <MapPinned size={16} /> : <Sprout size={16} />} tone={index % 2 ? "info" : "good"} />)}
        </div>
        <div className="analytics-chart-grid" style={{ marginTop: 16 }}>
          <ChartPanel title="Replantation scheme flow" subtitle="Applications, sanctions and applications disbursed" label="Public scheme dashboard" wide>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={keraFunnel} margin={{ top: 10, right: 16, bottom: 20, left: 4 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="scheme" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={compact} tick={axisTick} tickLine={false} axisLine={false} width={52} />
                <Tooltip formatter={(value) => [formatNumber(Number(value)), ""]} /><Legend />
                <Bar dataKey="applications" name="Applications" fill={blue} radius={[6, 6, 2, 2]} isAnimationActive={false} />
                <Bar dataKey="sanctioned" name="Sanctioned" fill={amber} radius={[6, 6, 2, 2]} isAnimationActive={false} />
                <Bar dataKey="disbursed" name="Disbursed applications" fill={green} radius={[6, 6, 2, 2]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
          <article className="analytics-panel">
            <div className="analytics-panel-head"><div><h3>Replantation funding</h3><p>Sanctioned area and amount disbursed</p></div><span>Current source</span></div>
            <div style={{ display: "grid", gap: 10, paddingTop: 12 }}>
              {data.keraSchemes.map((row) => <div key={row.id} style={{ padding: 14, border: "1px solid #e7edf4", borderRadius: 12 }}><strong style={{ display: "block", color: "#15365d", fontSize: 13 }}>{row.name}</strong><span style={{ display: "block", marginTop: 5, color: "#64748b", fontSize: 11.5 }}>{formatNumber(row.sanctionedArea)} ha sanctioned · {formatRupees(row.disbursedAmount)} disbursed</span></div>)}
              <div style={{ padding: 14, borderRadius: 12, background: "#eef8f4", color: "#17634f" }}><strong style={{ display: "block", fontSize: 18 }}>{formatRupees(totalKeraDisbursed)}</strong><span style={{ fontSize: 11.5 }}>Total across the three published schemes</span></div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading"><div><span className="section-kicker"><Sprout size={14} /> Programme framework</span><h2>Approved KERA result targets</h2><p>These are programme targets from the World Bank project framework, not completed achievements.</p></div></div>
        <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Indicator</th><th>Project target</th></tr></thead><tbody>{keraTargets.map((row) => <tr key={row.indicator}><td><strong>{row.indicator}</strong></td><td>{row.target}</td></tr>)}</tbody></table></div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading"><div><span className="section-kicker"><LandPlot size={14} /> Data integration</span><h2>Additional Industries data fields</h2><p>Fields identified with the department for the next data exchange.</p></div></div>
        <div className="feed-field-grid">
          {[
            ["Investment pipeline", "Project, investor, sector, proposed investment, employment, stage and next milestone"],
            ["Clearances and K-SWIFT", "Application, department, service, received date, due date and disposal status"],
            ["Land bank", "Parcel, district, ownership, extent, infrastructure readiness, constraints and availability"],
            ["Delivery issues", "Project milestone, delay reason, department responsible and action due date"],
          ].map(([title, text]) => <article key={title}><LandPlot size={18} /><h3>{title}</h3><p>{text}</p><span>Department feed under preparation</span></article>)}
        </div>
      </section>

      <aside className="analytics-provenance"><Database size={17} /><div><strong>Sources and reference periods</strong><p>Industries Department Year of Enterprises public dashboard and KERA public scheme dashboard, checked {data.fetchedAt}. KERA coverage is from the official project site. Programme targets are from the approved World Bank results framework.</p><div className="source-links"><Link href="https://yearofenterprises.kerala.gov.in/index.php/public_dashboard" target="_blank">Year of Enterprises <ExternalLink size={12} /></Link><Link href="https://kera.kerala.gov.in/" target="_blank">KERA <ExternalLink size={12} /></Link><Link href="https://www.keraplantation.kerala.gov.in/public/index.php/public_scheme_dashboard" target="_blank">KERA scheme dashboard <ExternalLink size={12} /></Link></div></div></aside>
    </div>
  );
}

function Kpi({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: React.ReactNode; tone: "good" | "info" }) {
  return <article className={`analytics-kpi tone-${tone}`}><div className="analytics-kpi-top"><span>{label}</span>{icon}</div><strong>{value}</strong><div className="analytics-kpi-bottom"><span>{detail}</span></div></article>;
}

function ChartPanel({ title, subtitle, label, wide, children }: { title: string; subtitle: string; label: string; wide?: boolean; children: React.ReactNode }) {
  return <article className={`analytics-panel ${wide ? "analytics-panel-wide" : ""}`}><div className="analytics-panel-head"><div><h3>{title}</h3><p>{subtitle}</p></div><span>{label}</span></div><div className="analytics-chart" style={{ height: 380 }}>{children}</div></article>;
}

function formatNumber(value: number) { return value.toLocaleString("en-IN", { maximumFractionDigits: 2 }); }
function compact(value: number) { return Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value); }
function formatRupees(value: number) { return `₹${(value / 10000000).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`; }
function shortDistrict(value: string) { return value.replace("Thiruvananthapuram", "TVM").replace("Pathanamthitta", "PTA").replace("Ernakulam", "EKM").replace("Kasaragod", "Kasaragod"); }
const axisTick = { fill: "#718096", fontSize: 10, fontWeight: 650 };
