"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  Building2,
  CircleAlert,
  ClipboardCheck,
  Database,
  FileCheck2,
  IndianRupee,
  Layers3,
  Search,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ModuleHeaderMeta } from "@/components/ModuleHeaderMeta";
import planspaceJson from "@/data/planspace-source.json";

type MonthRecord = {
  fy_order: number;
  month_name: string;
  state_perc: number;
  central_perc: number;
  overall_perc: number;
};

type FinancialYear = {
  months: MonthRecord[];
  year_id: number;
  fin_year: string;
  is_current: boolean;
};

type Sector = {
  sector_id: number;
  sector_name: string;
  tot_outlay: number;
  tot_expense: number;
  tot_perc: number;
  state_outlay: number;
  state_fin_expense: number;
  central_outlay: number;
  central_fin_expense: number;
  no_of_schemes: number;
};

type Department = {
  secretary_id: number;
  secretary_name: string;
  tot_outlay: number;
  tot_expense: number;
  tot_perc: number;
  state_outlay: number;
  state_fin_expense: number;
  central_outlay: number;
  central_fin_expense: number;
  no_of_schemes: number;
};

type PlanspaceSource = {
  generated_at: string;
  at_a_glance: {
    css_perc: number;
    lsgi_perc: number;
    css_outlay: number;
    state_perc: number;
    lsgi_outlay: number;
    state_outlay: number;
    css_expenditure: number;
    lsgi_expenditure: number;
    state_expenditure: number;
  };
  as_details: {
    aspendingamountnew: number;
    aspendingamountcont: number;
    asreceivedamountnew: number;
    asreceivedamountcont: number;
    aspendingcompcountnew: number;
    aspendingschmcountnew: number;
    aspendingcompcountcont: number;
    aspendingschmcountcont: number;
    asreceivedcompcountnew: number;
    asreceivedschmcountnew: number;
    asreceivedcompcountcont: number;
    asreceivedschmcountcont: number;
    compnotdefinedschmsnew: number;
    compnotdefinedschmscont: number;
  };
  sector_wise: Sector[];
  department_wise: Department[];
  yearwise_monthwise: FinancialYear[];
};

type SortKey = "secretary_name" | "tot_outlay" | "tot_expense" | "tot_perc" | "no_of_schemes";

const source = planspaceJson as PlanspaceSource;
const blue = "#2563eb";
const teal = "#0f766e";
const amber = "#f59e0b";
const violet = "#7c3aed";

const cardStyle: CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(20, 49, 86, 0.1)",
  borderRadius: 18,
  boxShadow: "0 1px 2px rgba(17,42,76,.05), 0 5px 18px rgba(17,42,76,.04)",
};

export function PlanspaceDashboard() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("tot_expense");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const totals = useMemo(
    () =>
      source.sector_wise.reduce(
        (acc, sector) => ({
          outlay: acc.outlay + sector.tot_outlay,
          expense: acc.expense + sector.tot_expense,
          schemes: acc.schemes + sector.no_of_schemes,
        }),
        { outlay: 0, expense: 0, schemes: 0 },
      ),
    [],
  );

  const currentYear = source.yearwise_monthwise.find((year) => year.is_current)!;
  const latestMonth = currentYear.months.at(-1)!;
  const historicalMarch = source.yearwise_monthwise
    .filter((year) => !year.is_current)
    .map((year) => {
      const march = year.months.find((month) => month.month_name === "March");
      return { year: year.fin_year, utilisation: march?.overall_perc ?? 0 };
    });

  const fundingChannels = [
    {
      channel: "State plan",
      outlay: source.at_a_glance.state_outlay,
      expenditure: source.at_a_glance.state_expenditure,
      utilisation: source.at_a_glance.state_perc,
    },
    {
      channel: "Centrally sponsored schemes",
      outlay: source.at_a_glance.css_outlay,
      expenditure: source.at_a_glance.css_expenditure,
      utilisation: source.at_a_glance.css_perc,
    },
    {
      channel: "Local government plan",
      outlay: source.at_a_glance.lsgi_outlay,
      expenditure: source.at_a_glance.lsgi_expenditure,
      utilisation: source.at_a_glance.lsgi_perc,
    },
  ];

  const sectorChart = [...source.sector_wise]
    .sort((a, b) => b.tot_outlay - a.tot_outlay)
    .map((sector) => ({
      sector: shortSector(sector.sector_name),
      outlay: sector.tot_outlay,
      expenditure: sector.tot_expense,
    }));

  const sectorUtilisation = [...source.sector_wise]
    .sort((a, b) => b.tot_perc - a.tot_perc)
    .map((sector) => ({ sector: shortSector(sector.sector_name), utilisation: sector.tot_perc }));

  const departments = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return source.department_wise
      .filter((department) => department.secretary_name.toLocaleLowerCase().includes(normalized))
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const comparison = typeof av === "string" ? av.localeCompare(String(bv)) : Number(av) - Number(bv);
        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [query, sortDirection, sortKey]);

  function changeSort(key: SortKey) {
    if (sortKey === key) setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDirection(key === "secretary_name" ? "asc" : "desc");
    }
  }

  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Dashboard</Link>
        <span>/</span>
        <span>Planspace</span>
      </div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": blue } as CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><Layers3 size={30} /></div>
          <div>
            <div className="module-hero-kicker">Plan monitoring · 2026–27</div>
            <h1>Planspace</h1>
            <p>Plan outlay, expenditure, utilisation, administrative sanctions, sectors and departments.</p>
          </div>
        </div>
        <ModuleHeaderMeta lastUpdated={formatSourceTimestamp(source.generated_at)} source="planspace.kerala.gov.in" sourceUrl="https://planspace.kerala.gov.in/" />
      </section>

      <section className="analytics-kpi-grid" aria-label="Planspace key indicators">
        <Metric label="Total plan outlay" value={money(totals.outlay)} detail="All 12 sectors" icon={<IndianRupee size={16} />} tone="info" />
        <Metric label="Expenditure" value={money(totals.expense)} detail={`Through ${latestMonth.month_name}`} icon={<FileCheck2 size={16} />} tone="good" />
        <Metric label="Overall utilisation" value={percent(latestMonth.overall_perc)} detail={`${currentYear.fin_year} cumulative`} icon={<ClipboardCheck size={16} />} tone="watch" />
        <Metric label="Schemes" value={integer(totals.schemes)} detail="Across sector records" icon={<Layers3 size={16} />} tone="info" />
        <Metric label="Departments" value={integer(source.department_wise.length)} detail="Department-wise records" icon={<Building2 size={16} />} tone="info" />
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Financial position</span>
            <h2>Utilisation and funding channels</h2>
            <p>Current-year cumulative progress and source-level expenditure.</p>
          </div>
          <span className="analytics-count"><Database size={15} /> Planspace source file</span>
        </div>

        <div className="analytics-chart-grid">
          <ChartPanel title="Monthly utilisation" subtitle="Cumulative percentage · FY 2026–27" label="Trend" wide>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentYear.months} margin={{ top: 16, right: 20, left: 0, bottom: 12 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="month_name" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={axisTick} tickLine={false} axisLine={false} width={44} />
                <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 700 }} />
                <Line type="monotone" dataKey="overall_perc" name="Overall" stroke={blue} strokeWidth={3} dot={{ r: 3 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="state_perc" name="State + LSGI" stroke={teal} strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="central_perc" name="CSS" stroke={amber} strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartPanel>

          <ChartPanel title="Funding channels" subtitle="Outlay and expenditure · ₹ crore" label="Comparison">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fundingChannels} layout="vertical" margin={{ top: 12, right: 18, left: 28, bottom: 8 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} />
                <XAxis type="number" tickFormatter={compactNumber} tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="channel" width={130} tick={axisTick} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => money(Number(value))} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 700 }} />
                <Bar dataKey="outlay" name="Outlay" fill="#b5cae8" radius={[0, 6, 6, 0]} maxBarSize={22} isAnimationActive={false} />
                <Bar dataKey="expenditure" name="Expenditure" fill={teal} radius={[0, 6, 6, 0]} maxBarSize={22} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>

        <div style={{ ...cardStyle, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, padding: 18, marginTop: 16 }}>
          {fundingChannels.map((channel) => (
            <div key={channel.channel} style={{ padding: 14, borderRadius: 13, background: "#f6f9fc", border: "1px solid #e4eaf1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 11, fontWeight: 800, color: "#40506b" }}>
                <span>{channel.channel}</span><strong style={{ color: blue }}>{percent(channel.utilisation)}</strong>
              </div>
              <div style={{ height: 7, overflow: "hidden", background: "#e4eaf1", borderRadius: 99, margin: "11px 0 8px" }}>
                <span style={{ display: "block", height: "100%", width: `${Math.min(channel.utilisation, 100)}%`, background: channel.utilisation < 20 ? amber : teal, borderRadius: 99 }} />
              </div>
              <small style={{ color: "#738197" }}>{money(channel.expenditure)} of {money(channel.outlay)}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Sector review</span>
            <h2>Sector allocation and utilisation</h2>
            <p>All 12 Planspace sectors, ordered for comparison.</p>
          </div>
        </div>
        <div className="analytics-chart-grid">
          <ChartPanel title="Outlay and expenditure by sector" subtitle="₹ crore · largest outlay first" label="All sectors" tall>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorChart} layout="vertical" margin={{ top: 8, right: 16, left: 52, bottom: 8 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} />
                <XAxis type="number" tickFormatter={compactNumber} tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="sector" width={138} tick={axisTick} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => money(Number(value))} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 700 }} />
                <Bar dataKey="outlay" name="Outlay" fill="#b5cae8" radius={[0, 6, 6, 0]} maxBarSize={16} isAnimationActive={false} />
                <Bar dataKey="expenditure" name="Expenditure" fill={blue} radius={[0, 6, 6, 0]} maxBarSize={16} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
          <ChartPanel title="Sector utilisation" subtitle="Expenditure as reported against outlay" label="Percentage" tall>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorUtilisation} layout="vertical" margin={{ top: 8, right: 20, left: 52, bottom: 8 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} />
                <XAxis type="number" tickFormatter={(value) => `${value}%`} tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="sector" width={138} tick={axisTick} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => percent(Number(value))} />
                <Bar dataKey="utilisation" name="Utilisation" fill={teal} radius={[0, 6, 6, 0]} maxBarSize={18} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>
        <div style={{ ...cardStyle, display: "flex", alignItems: "flex-start", gap: 12, padding: 15, marginTop: 16, color: "#586982" }}>
          <CircleAlert size={19} color={amber} style={{ flex: "0 0 auto", marginTop: 1 }} />
          <p style={{ margin: 0, fontSize: 11, lineHeight: 1.6 }}>
            <strong style={{ color: "#2b374d" }}>Source check:</strong> Rural Development (152.75%) and General Services (181.84%) are above 100% in the supplied records. They are retained exactly and should be reconciled with source accounting entries before review conclusions are drawn.
          </p>
        </div>
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Year comparison</span>
            <h2>Full-year utilisation</h2>
            <p>March utilisation for completed financial years. The current year is shown separately through November.</p>
          </div>
          <span className="analytics-count">Current year {percent(latestMonth.overall_perc)}</span>
        </div>
        <div className="analytics-chart-grid">
          <ChartPanel title="Completed financial years" subtitle="Overall utilisation recorded in March" label="March values">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalMarch} margin={{ top: 16, right: 18, left: 0, bottom: 10 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="year" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={axisTick} tickLine={false} axisLine={false} width={44} />
                <Tooltip formatter={(value) => percent(Number(value))} />
                <Bar dataKey="utilisation" name="March utilisation" fill={violet} radius={[7, 7, 2, 2]} maxBarSize={44} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
          <div style={{ ...cardStyle, padding: 20 }}>
            <div className="analytics-panel-head"><div><h3>Year-end record</h3><p>Comparable March values only</p></div><span>4 years</span></div>
            <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
              {historicalMarch.map((year) => (
                <div key={year.year} style={{ display: "grid", gridTemplateColumns: "80px 1fr 58px", alignItems: "center", gap: 12 }}>
                  <strong style={{ fontSize: 11, color: "#40506b" }}>{year.year}</strong>
                  <div style={{ height: 8, overflow: "hidden", background: "#edf1f6", borderRadius: 99 }}>
                    <span style={{ display: "block", width: `${year.utilisation}%`, height: "100%", background: violet, borderRadius: 99 }} />
                  </div>
                  <b style={{ color: "#12335b", textAlign: "right", fontSize: 12 }}>{percent(year.utilisation)}</b>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22, padding: 14, background: "#f6f4fc", border: "1px solid #e6dff5", borderRadius: 12, color: "#586982", fontSize: 10.5, lineHeight: 1.55 }}>
              The 2026–27 value covers April to November and is not compared as a completed year.
            </div>
          </div>
        </div>
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div>
            <span className="section-kicker">Administrative sanctions</span>
            <h2>Received and pending</h2>
            <p>New and continuing scheme records in the supplied Planspace file.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 18 }}>
          <SanctionGroup
            title="New schemes"
            receivedAmount={source.as_details.asreceivedamountnew}
            receivedComponents={source.as_details.asreceivedcompcountnew}
            receivedSchemes={source.as_details.asreceivedschmcountnew}
            pendingAmount={source.as_details.aspendingamountnew}
            pendingComponents={source.as_details.aspendingcompcountnew}
            pendingSchemes={source.as_details.aspendingschmcountnew}
            undefinedSchemes={source.as_details.compnotdefinedschmsnew}
          />
          <SanctionGroup
            title="Continuing schemes"
            receivedAmount={source.as_details.asreceivedamountcont}
            receivedComponents={source.as_details.asreceivedcompcountcont}
            receivedSchemes={source.as_details.asreceivedschmcountcont}
            pendingAmount={source.as_details.aspendingamountcont}
            pendingComponents={source.as_details.aspendingcompcountcont}
            pendingSchemes={source.as_details.aspendingschmcountcont}
            undefinedSchemes={source.as_details.compnotdefinedschmscont}
          />
        </div>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div>
            <span className="section-kicker"><Building2 size={14} /> Department details</span>
            <h2>Department-wise plan position</h2>
            <p>Search all {source.department_wise.length} records and sort by any main measure.</p>
          </div>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 9, maxWidth: 460, padding: "10px 13px", marginTop: 16, background: "#fff", border: "1px solid #dde3ec", borderRadius: 11 }}>
          <Search size={16} color="#738197" />
          <span className="sr-only">Search departments</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search department" style={{ minWidth: 0, width: "100%", border: 0, outline: 0, background: "transparent", fontSize: 12 }} />
        </label>
        <div className="analytics-table-wrap">
          <table className="analytics-table">
            <thead>
              <tr>
                <SortHeader label="Department" field="secretary_name" current={sortKey} direction={sortDirection} onSort={changeSort} />
                <SortHeader label="Schemes" field="no_of_schemes" current={sortKey} direction={sortDirection} onSort={changeSort} />
                <SortHeader label="Outlay (₹ Cr)" field="tot_outlay" current={sortKey} direction={sortDirection} onSort={changeSort} />
                <SortHeader label="Expenditure (₹ Cr)" field="tot_expense" current={sortKey} direction={sortDirection} onSort={changeSort} />
                <SortHeader label="Utilisation" field="tot_perc" current={sortKey} direction={sortDirection} onSort={changeSort} />
                <th>State / CSS expenditure</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.secretary_id}>
                  <td><strong>{department.secretary_name}</strong></td>
                  <td>{integer(department.no_of_schemes)}</td>
                  <td>{number(department.tot_outlay)}</td>
                  <td>{number(department.tot_expense)}</td>
                  <td><UtilisationCell value={department.tot_perc} /></td>
                  <td>{number(department.state_fin_expense)} / {number(department.central_fin_expense)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ margin: "10px 2px 0", color: "#738197", fontSize: 10 }}>{departments.length} department record{departments.length === 1 ? "" : "s"} shown</p>
      </section>

      <aside className="analytics-provenance">
        <Database size={17} />
        <div>
          <strong>Source: Planspace file supplied for the Chief Minister Dashboard</strong>
          <p>Generated 23 November 2026 at 3:42 PM IST. Figures are displayed as supplied; values above 100% are preserved for source reconciliation.</p>
        </div>
      </aside>
    </div>
  );
}

function Metric({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: React.ReactNode; tone: "good" | "watch" | "info" }) {
  return (
    <article className={`analytics-kpi tone-${tone}`}>
      <div className="analytics-kpi-top"><span>{label}</span>{icon}</div>
      <strong>{value}</strong>
      <div className="analytics-kpi-bottom"><span>{detail}</span></div>
    </article>
  );
}

function ChartPanel({ title, subtitle, label, wide, tall, children }: { title: string; subtitle: string; label: string; wide?: boolean; tall?: boolean; children: React.ReactNode }) {
  return (
    <article className={`analytics-panel ${wide ? "analytics-panel-wide" : ""}`}>
      <div className="analytics-panel-head"><div><h3>{title}</h3><p>{subtitle}</p></div><span>{label}</span></div>
      <div className="analytics-chart" style={tall ? { height: 500 } : undefined}>{children}</div>
    </article>
  );
}

function SanctionGroup(props: { title: string; receivedAmount: number; receivedComponents: number; receivedSchemes: number; pendingAmount: number; pendingComponents: number; pendingSchemes: number; undefinedSchemes: number }) {
  return (
    <article style={{ ...cardStyle, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, color: "#12335b" }}><FileCheck2 size={18} color={blue} /><h3 style={{ margin: 0, fontSize: 16 }}>{props.title}</h3></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, marginTop: 16 }}>
        <SanctionMetric label="AS received" amount={props.receivedAmount} components={props.receivedComponents} schemes={props.receivedSchemes} color={teal} />
        <SanctionMetric label="AS pending" amount={props.pendingAmount} components={props.pendingComponents} schemes={props.pendingSchemes} color={amber} />
      </div>
      <p style={{ margin: "12px 0 0", paddingTop: 11, borderTop: "1px solid #e9edf3", color: "#738197", fontSize: 10 }}>
        Component details not defined for {integer(props.undefinedSchemes)} schemes in the source file.
      </p>
    </article>
  );
}

function SanctionMetric({ label, amount, components, schemes, color }: { label: string; amount: number; components: number; schemes: number; color: string }) {
  return (
    <div style={{ padding: 14, border: "1px solid #e6ebf2", borderTop: `3px solid ${color}`, borderRadius: 12, background: "#fbfcfe" }}>
      <span style={{ color: "#586982", fontSize: 10, fontWeight: 800 }}>{label}</span>
      <strong style={{ display: "block", margin: "8px 0 5px", color: "#12335b", fontSize: 20 }}>{money(amount)}</strong>
      <small style={{ color: "#738197", fontSize: 9.5 }}>{integer(components)} components · {integer(schemes)} schemes</small>
    </div>
  );
}

function SortHeader({ label, field, current, direction, onSort }: { label: string; field: SortKey; current: SortKey; direction: "asc" | "desc"; onSort: (field: SortKey) => void }) {
  return (
    <th aria-sort={current === field ? (direction === "asc" ? "ascending" : "descending") : "none"}>
      <button type="button" onClick={() => onSort(field)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: 0, color: "inherit", background: "transparent", font: "inherit", letterSpacing: "inherit", textTransform: "inherit" }}>
        {label}<ArrowUpDown size={11} />
      </button>
    </th>
  );
}

function UtilisationCell({ value }: { value: number }) {
  const color = value > 100 ? "#c64555" : value < 20 ? amber : value >= 50 ? teal : blue;
  return (
    <div style={{ minWidth: 104 }}>
      <strong style={{ color }}>{percent(value)}</strong>
      <div style={{ height: 4, width: 86, marginTop: 5, overflow: "hidden", background: "#e9edf3", borderRadius: 99 }}>
        <span style={{ display: "block", width: `${Math.min(value, 100)}%`, height: "100%", background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}

function shortSector(value: string) {
  return value
    .replace("Agriculture and allied Services", "Agriculture & allied")
    .replace("Irrigation and Flood Control", "Irrigation & flood")
    .replace("Transport and Communications", "Transport")
    .replace("Scientific Services and Research", "Science & research")
    .replace("Social and Community Services", "Social services")
    .replace("Local Level Plan Programms of Local Self Government", "Local government plan");
}

function money(value: number) {
  return `₹${number(value)} Cr`;
}

function number(value: number) {
  return value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function integer(value: number) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function percent(value: number) {
  return `${value.toLocaleString("en-IN", { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 })}%`;
}

function compactNumber(value: number) {
  return Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function formatSourceTimestamp(value: string) {
  const match = value.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s+(\d{2}):(\d{2})/);
  if (!match) return value;
  const [, day, month, year, hour, minute] = match;
  const hour24 = Number(hour);
  const hour12 = hour24 % 12 || 12;
  return `${Number(day)} ${month.slice(0, 3)} ${year} · ${hour12}:${minute} ${hour24 >= 12 ? "PM" : "AM"}`;
}

const axisTick = { fill: "#718096", fontSize: 10, fontWeight: 650 };
