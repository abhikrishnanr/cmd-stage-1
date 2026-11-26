"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import {
  Activity,
  Apple,
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Database,
  ExternalLink,
  Gauge,
  IndianRupee,
  Layers3,
  MapPinned,
  Search,
  Store,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EcoStatData, MarketPriceRecord } from "@/data/departmentSources";
import {
  additionalRetailItems,
  cpiCentres,
  cpiSummary,
  dailyEssentialMovers,
  ecoStatCoverage,
  fruitRetailMovers,
  fruitWholesaleMovers,
  marketIntelligenceMovers,
  marketIntelligenceReferences,
  monthlyAnnualMovers,
  staplePrices,
} from "@/data/ecostatAttachments";

const green = "#147d68";
const blue = "#2f6fd0";
const amber = "#d98b19";
const red = "#c64555";

const gsdp = {
  period: "2024–25 Quick Estimate",
  current: 1248533.01,
  currentGrowth: 9.97,
  constant: 685283.16,
  realGrowth: 6.19,
  perCapitaCurrent: 346437,
  perCapitaConstant: 190149,
  nsdpCurrent: 1111229.4,
  nsdpConstant: 626426.29,
};

export function EcoStatDashboard({ data }: { data: EcoStatData }) {
  const [query, setQuery] = useState("");
  const [bulletin, setBulletin] = useState<"daily" | "variation" | "fruit" | "market" | "cpi">("daily");
  const monthlyCommodities = useMemo(
    () => Array.from(new Set(data.monthly.map((row) => row.commodity))).filter(Boolean).sort(),
    [data.monthly],
  );
  const preferredCommodity = monthlyCommodities.find((item) => item.includes("Coconut Oil")) || monthlyCommodities[0] || "";
  const [commodity, setCommodity] = useState(preferredCommodity);

  const enriched = useMemo(() => data.latest.map(addMovement), [data.latest]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return enriched;
    return enriched.filter((row) => row.commodity.toLowerCase().includes(normalized));
  }, [enriched, query]);
  const movers = useMemo(
    () => enriched.filter((row) => row.dayPercent != null).sort((a, b) => Math.abs(b.dayPercent || 0) - Math.abs(a.dayPercent || 0)).slice(0, 12),
    [enriched],
  );
  const monthlySeries = useMemo(
    () => data.monthly
      .filter((row) => row.commodity === commodity && row.value != null)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-18)
      .map((row) => ({ month: monthLabel(row.date), price: row.value })),
    [commodity, data.monthly],
  );
  const areaSeries = useMemo(
    () => data.areaSeries
      .filter((row) => row.price != null)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((row) => ({ date: shortDate(row.date), price: row.price, previous: row.prevDay })),
    [data.areaSeries],
  );

  return (
    <div className="page-stack module-page analytics-module-page">
      <div className="breadcrumbs">
        <Link href="/dashboard"><ArrowLeft size={14} /> Chief Minister Dashboard</Link>
        <span>/</span><span>Economics &amp; Statistics</span>
      </div>

      <section className="module-hero analytics-module-hero" style={{ "--module-accent": green } as CSSProperties}>
        <div className="module-hero-stripe" />
        <div className="module-hero-main">
          <div className="module-hero-icon"><BarChart3 size={30} /></div>
          <div>
            <div className="module-hero-kicker">EcoStat · prices and State economy</div>
            <h1>Economics &amp; Statistics</h1>
            <p>Daily essential and wholesale prices, fruit prices, centre-level market intelligence, CPI, monthly trends and the latest published State-income measures.</p>
          </div>
        </div>
        <div className="module-hero-side analytics-hero-side">
          <span>Latest wholesale price date</span>
          <strong>{formatDate(data.priceDate)}</strong>
          <small>Source checked {data.fetchedAt}</small>
        </div>
      </section>

      <section className="analytics-kpi-grid" aria-label="Economics and Statistics key indicators">
        <Kpi label="Essential price watch" value="50 items" detail="14 district headquarters · 24 Nov 2026" icon={<IndianRupee size={16} />} tone="good" />
        <Kpi label="CPI centre average" value={cpiSummary.octoberAverage.toFixed(2)} detail={`${cpiSummary.period} · base 2011–12`} icon={<Gauge size={16} />} tone="info" />
        <Kpi label="GSDP at current prices" value={`₹${formatLakhCrore(gsdp.current)} Cr`} detail={gsdp.period} icon={<Database size={16} />} tone="good" />
        <Kpi label="Real GSDP growth" value={`${gsdp.realGrowth}%`} detail="Constant-price growth, 2024–25 QE" icon={<TrendingUp size={16} />} tone="info" />
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div><span className="section-kicker"><Layers3 size={14} /> Data available from EcoStat</span><h2>Department data coverage</h2><p>Frequency, geography and collection are kept distinct so unlike price series are not combined.</p></div>
          <span className="analytics-count">7 collections</span>
        </div>
        <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Collection</th><th>Frequency</th><th>Geography</th><th>Access</th><th>Coverage</th></tr></thead><tbody>
          {ecoStatCoverage.map((row) => <tr key={row.dataset}><td><strong>{row.dataset}</strong></td><td>{row.frequency}</td><td>{row.geography}</td><td>{row.access}</td><td>{row.coverage}</td></tr>)}
        </tbody></table></div>
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div><span className="section-kicker">Published reports</span><h2>Price and index review</h2><p>Choose a dated report to see its own comparison period, unit and geography.</p></div>
          <span className="analytics-count"><CalendarDays size={15} /> 20–24 Nov 2026</span>
        </div>
        <div className="ecostat-tabs" role="tablist" aria-label="EcoStat published reports">
          <ReportTab active={bulletin === "daily"} onClick={() => setBulletin("daily")} icon={<IndianRupee size={15} />} label="50 + 20 items" />
          <ReportTab active={bulletin === "variation"} onClick={() => setBulletin("variation")} icon={<Activity size={15} />} label="Monthly & annual" />
          <ReportTab active={bulletin === "fruit"} onClick={() => setBulletin("fruit")} icon={<Apple size={15} />} label="Fruit prices" />
          <ReportTab active={bulletin === "market"} onClick={() => setBulletin("market")} icon={<Store size={15} />} label="Market Intelligence" />
          <ReportTab active={bulletin === "cpi"} onClick={() => setBulletin("cpi")} icon={<Gauge size={15} />} label="CPI" />
        </div>

        {bulletin === "daily" && <DailyBulletin />}
        {bulletin === "variation" && <VariationBulletin />}
        {bulletin === "fruit" && <FruitBulletin />}
        {bulletin === "market" && <MarketBulletin />}
        {bulletin === "cpi" && <CpiBulletin />}
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div><span className="section-kicker">Daily prices</span><h2>Wholesale price movement</h2><p>State-average comparison and an area-specific daily series from the official Market Intelligence dataset.</p></div>
          <span className="analytics-count"><CalendarDays size={15} /> {formatDate(data.priceDate)}</span>
        </div>
        <div className="analytics-chart-grid">
          <ChartPanel title="Largest one-day changes" subtitle="Absolute percentage movement against the previous available day" label="12 commodities" wide>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={movers.map((row) => ({ name: shorten(row.commodity, 26), change: Math.abs(row.dayPercent || 0), direction: (row.dayPercent || 0) >= 0 ? "Up" : "Down" }))} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 22 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} />
                <XAxis type="number" unit="%" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={axisTick} tickLine={false} axisLine={false} width={155} />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "Absolute change"]} />
                <Bar dataKey="change" name="Absolute change" fill={amber} radius={[0, 7, 7, 0]} maxBarSize={22} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
          <ChartPanel title="Area-wise daily price" subtitle={`${data.areaSeries[0]?.district || "Thiruvananthapuram"} · ${data.areaSeries[0]?.centre || "Thiruvananthapuram"} · ${data.areaSeries[0]?.commodity || "Coconut with husk"}`} label="Market centre">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={areaSeries} margin={{ top: 12, right: 18, bottom: 10, left: 2 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis tick={axisTick} tickLine={false} axisLine={false} width={55} />
                <Tooltip formatter={(value) => [`₹${formatNumber(Number(value))}`, "Price"]} />
                <Legend />
                <Line type="monotone" dataKey="price" name="Price" stroke={green} strokeWidth={3} dot={{ r: 3 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div><span className="section-kicker">Monthly price series</span><h2>Commodity trend</h2><p>Monthly State-average wholesale prices from the EcoStat series.</p></div>
          <label className="module-search" style={{ minWidth: 280 }}>
            <select value={commodity} onChange={(event) => setCommodity(event.target.value)} aria-label="Select commodity">
              {monthlyCommodities.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <article className="analytics-panel">
          <div className="analytics-panel-head"><div><h3>{commodity || "Monthly commodity series"}</h3><p>{data.monthlySourceName}</p></div><span>{monthlySeries.length} months</span></div>
          <div className="analytics-chart" style={{ height: 330 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySeries} margin={{ top: 12, right: 18, bottom: 12, left: 8 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis tick={axisTick} tickLine={false} axisLine={false} width={62} />
                <Tooltip formatter={(value) => [`₹${formatNumber(Number(value))}`, "Monthly average"]} />
                <Line type="monotone" dataKey="price" name="Monthly average" stroke={blue} strokeWidth={3} dot={{ r: 3 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="section-card analytics-table-card">
        <div className="section-heading compact analytics-section-heading">
          <div><span className="section-kicker"><IndianRupee size={14} /> Commodity prices</span><h2>Latest State-average wholesale prices</h2><p>Current price with previous day, month and year comparisons where the source supplies them.</p></div>
          <label className="module-search" style={{ minWidth: 260 }}><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commodity" /></label>
        </div>
        <div className="analytics-table-wrap" style={{ maxHeight: 610 }}>
          <table className="analytics-table">
            <thead><tr><th>Commodity</th><th>Date</th><th>Price</th><th>Previous day</th><th>Day change</th><th>Previous month</th><th>Previous year</th></tr></thead>
            <tbody>{filtered.map((row) => (
              <tr key={`${row.commodity}-${row.date}`}>
                <td><strong>{row.commodity}</strong></td><td>{formatDate(row.date)}</td><td>{rupees(row.price)}</td><td>{rupees(row.prevDay)}</td>
                <td><Movement value={row.dayPercent} /></td><td>{rupees(row.prevMonth)}</td><td>{rupees(row.prevYear)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="analytics-section">
        <div className="section-heading analytics-section-heading">
          <div><span className="section-kicker">State economy</span><h2>GSDP and NSDP</h2><p>Latest published 2024–25 Quick Estimate. Current-price and constant-price measures are shown separately.</p></div>
          <span className="analytics-count">{gsdp.period}</span>
        </div>
        <div className="analytics-kpi-grid">
          <Kpi label="GSDP, current prices" value={`₹${formatLakhCrore(gsdp.current)} Cr`} detail={`${gsdp.currentGrowth}% growth`} icon={<TrendingUp size={16} />} tone="good" />
          <Kpi label="GSDP, constant prices" value={`₹${formatLakhCrore(gsdp.constant)} Cr`} detail={`${gsdp.realGrowth}% real growth`} icon={<TrendingUp size={16} />} tone="info" />
          <Kpi label="Per-capita GSDP" value={`₹${formatNumber(gsdp.perCapitaCurrent)}`} detail="Current prices" icon={<IndianRupee size={16} />} tone="good" />
          <Kpi label="Per-capita GSDP" value={`₹${formatNumber(gsdp.perCapitaConstant)}`} detail="Constant prices" icon={<IndianRupee size={16} />} tone="info" />
        </div>
        <div className="analytics-chart-grid" style={{ marginTop: 16 }}>
          <ChartPanel title="State income comparison" subtitle="₹ crore · 2024–25 Quick Estimate" label="Current vs constant">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ measure: "GSDP", current: gsdp.current, constant: gsdp.constant }, { measure: "NSDP", current: gsdp.nsdpCurrent, constant: gsdp.nsdpConstant }]} margin={{ top: 10, right: 16, bottom: 20, left: 12 }}>
                <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
                <XAxis dataKey="measure" tick={axisTick} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `${(Number(value) / 100000).toFixed(1)}L`} tick={axisTick} tickLine={false} axisLine={false} width={54} />
                <Tooltip formatter={(value) => [`₹${formatNumber(Number(value))} Cr`, ""]} /><Legend />
                <Bar dataKey="current" name="Current prices" fill={blue} radius={[7, 7, 2, 2]} isAnimationActive={false} />
                <Bar dataKey="constant" name="Constant prices" fill={green} radius={[7, 7, 2, 2]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
          <article className="analytics-panel">
            <div className="analytics-panel-head"><div><h3>Published economic series</h3><p>Detailed EcoStat views available for further analysis</p></div><span>Coverage</span></div>
            <div style={{ display: "grid", gap: 10, padding: "16px 4px" }}>
              {["GSDP and NSDP at current and constant prices", "Sector-wise GSVA and sector share", "District GDDP and NDDP", "District per-capita income"].map((item) => <div key={item} style={{ padding: 13, border: "1px solid #e7edf4", borderRadius: 12, fontSize: 12, fontWeight: 750, color: "#334155" }}>{item}</div>)}
            </div>
          </article>
        </div>
      </section>

      <aside className="analytics-provenance">
        <Database size={17} />
        <div><strong>Sources and reference periods</strong><p>{data.latestSourceName}; EcoStat monthly price series; and EcoStat GSDP/NSDP dataset, 2024–25 Quick Estimate. Wholesale Market Intelligence and retail essential-commodity prices are separate collections.</p>
          <div className="source-links"><Link href="https://www.ecostat.kerala.gov.in/mi-prices-dashboard?lang=en" target="_blank">Market Intelligence <ExternalLink size={12} /></Link><Link href="https://www.ecostat.kerala.gov.in/dataset/27?page=3" target="_blank">State income <ExternalLink size={12} /></Link></div>
        </div>
      </aside>
    </div>
  );
}

function ReportTab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return <button type="button" role="tab" aria-selected={active} className={active ? "active" : ""} onClick={onClick}>{icon}<span>{label}</span></button>;
}

function DailyBulletin() {
  const chartData = [...dailyEssentialMovers].sort((a, b) => a.change - b.change);
  return <div className="ecostat-report" role="tabpanel">
    <div className="bulletin-summary-grid">
      <BulletinStat label="Reference date" value="24 Nov 2026" detail="Compared with 23 Nov" />
      <BulletinStat label="Largest increase" value="Tomato +2.83%" detail="₹47.43 to ₹48.77 per kg" tone="up" />
      <BulletinStat label="Largest decline" value="Achingapayar −9.99%" detail="₹58.33 to ₹52.50 per kg" tone="down" />
      <BulletinStat label="District coverage" value="14 headquarters" detail="State average in the published report" />
    </div>
    <div className="analytics-chart-grid">
      <ChartPanel title="Daily essential-price movement" subtitle="50-item retail report · percentage change from 23 to 24 November" label="₹ per reported unit" wide>
        <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 28 }}>
          <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} /><XAxis type="number" unit="%" tick={axisTick} tickLine={false} axisLine={false} /><YAxis type="category" dataKey="commodity" tick={axisTick} tickLine={false} axisLine={false} width={148} /><ReferenceLine x={0} stroke="#9aa8ba" /><Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "Daily change"]} />
          <Bar dataKey="change" name="Daily change" radius={[4, 4, 4, 4]} maxBarSize={20} isAnimationActive={false}>{chartData.map((row) => <Cell key={row.commodity} fill={row.change >= 0 ? red : green} />)}</Bar>
        </BarChart></ResponsiveContainer>
      </ChartPanel>
      <article className="analytics-panel">
        <div className="analytics-panel-head"><div><h3>Reference staples</h3><p>State-average retail price · 24 Nov 2026</p></div><span>50-item report</span></div>
        <div className="staple-price-grid">{staplePrices.map((row) => <div key={row.commodity}><span>{row.commodity}</span><strong>₹{formatNumber(row.price)}</strong><small>per {row.unit}</small></div>)}</div>
      </article>
    </div>
    <article className="section-card analytics-table-card">
      <div className="section-heading compact"><div><span className="section-kicker">Daily report</span><h3>Largest reported movements</h3><p>State averages; blank district quotations remain unavailable rather than zero.</p></div></div>
      <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Commodity</th><th>Unit</th><th>23 Nov</th><th>24 Nov</th><th>Change</th></tr></thead><tbody>{dailyEssentialMovers.map((row) => <tr key={row.commodity}><td><strong>{row.commodity}</strong></td><td>{row.unit}</td><td>₹{formatNumber(row.previous)}</td><td>₹{formatNumber(row.current)}</td><td><SignedChange value={row.change} suffix="%" /></td></tr>)}</tbody></table></div>
    </article>
    <article className="section-card analytics-table-card">
      <div className="section-heading compact"><div><span className="section-kicker">Additional items</span><h3>20-item retail monitoring</h3><p>20 Nov 2026 compared with 13 Nov 2026. This weekly comparison is shown separately from the daily 50-item report.</p></div><span className="analytics-count">Weekly comparison</span></div>
      <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Commodity</th><th>Unit</th><th>13 Nov</th><th>20 Nov</th><th>Change</th></tr></thead><tbody>{additionalRetailItems.map((row) => <tr key={row.commodity}><td><strong>{row.commodity}</strong></td><td>{row.unit}</td><td>₹{formatNumber(row.previous)}</td><td>₹{formatNumber(row.current)}</td><td><SignedChange value={row.change} suffix="%" /></td></tr>)}</tbody></table></div>
    </article>
  </div>;
}

function VariationBulletin() {
  return <div className="ecostat-report" role="tabpanel">
    <div className="bulletin-summary-grid">
      <BulletinStat label="Reference date" value="24 Nov 2026" detail="Month and year comparisons" />
      <BulletinStat label="Monthly rise" value="Onion small +33.53%" detail="Against 24 Oct 2026" tone="up" />
      <BulletinStat label="Annual rise" value="Onion big +126.58%" detail="Against 24 Nov 2025" tone="up" />
      <BulletinStat label="Annual decline" value="Coconut oil Kera −35.36%" detail="Against 24 Nov 2025" tone="down" />
    </div>
    <article className="analytics-panel">
      <div className="analytics-panel-head"><div><h3>Monthly and annual price movement</h3><p>State-average retail comparison; percentage change by commodity</p></div><span>24 Nov 2026</span></div>
      <div className="analytics-chart" style={{ height: 410 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyAnnualMovers} margin={{ top: 12, right: 18, bottom: 72, left: 8 }}>
        <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="commodity" tick={axisTick} tickLine={false} axisLine={false} angle={-35} textAnchor="end" interval={0} height={86} /><YAxis unit="%" tick={axisTick} tickLine={false} axisLine={false} width={52} /><ReferenceLine y={0} stroke="#9aa8ba" /><Tooltip formatter={(value) => value == null ? ["—", ""] : [`${Number(value).toFixed(2)}%`, ""]} /><Legend />
        <Bar dataKey="monthly" name="Monthly change" fill={amber} radius={[4, 4, 0, 0]} isAnimationActive={false} /><Bar dataKey="annual" name="Annual change" fill={blue} radius={[4, 4, 0, 0]} isAnimationActive={false} />
      </BarChart></ResponsiveContainer></div>
    </article>
    <article className="section-card analytics-table-card">
      <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Commodity</th><th>Current price</th><th>Unit</th><th>Monthly change</th><th>Annual change</th></tr></thead><tbody>{monthlyAnnualMovers.map((row) => <tr key={row.commodity}><td><strong>{row.commodity}</strong></td><td>{row.price == null ? "—" : `₹${formatNumber(row.price)}`}</td><td>{row.unit}</td><td>{row.monthly == null ? "—" : <SignedChange value={row.monthly} suffix="%" />}</td><td><SignedChange value={row.annual} suffix="%" /></td></tr>)}</tbody></table></div>
    </article>
  </div>;
}

function FruitBulletin() {
  return <div className="ecostat-report" role="tabpanel">
    <div className="bulletin-summary-grid">
      <BulletinStat label="Reference date" value="20 Nov 2026" detail="Compared with 13 Nov" />
      <BulletinStat label="Retail increase" value="Apple Washington +11.11%" detail="₹225 to ₹250 per kg" tone="up" />
      <BulletinStat label="Wholesale decline" value="Grapes juice −15.77%" detail="₹6,737.50 to ₹5,675 per quintal" tone="down" />
      <BulletinStat label="Coverage" value="14 headquarters" detail="Wholesale and retail kept separate" />
    </div>
    <div className="analytics-chart-grid">
      <FruitChart title="Fruit retail movement" subtitle="₹ per kg · weekly percentage change" data={fruitRetailMovers} />
      <FruitChart title="Fruit wholesale movement" subtitle="₹ per quintal · weekly percentage change" data={fruitWholesaleMovers} />
    </div>
    <div className="analytics-chart-grid">
      <FruitTable title="Fruit retail prices" unit="kg" rows={fruitRetailMovers} />
      <FruitTable title="Fruit wholesale prices" unit="quintal" rows={fruitWholesaleMovers} />
    </div>
  </div>;
}

function FruitChart({ title, subtitle, data }: { title: string; subtitle: string; data: typeof fruitRetailMovers }) {
  return <ChartPanel title={title} subtitle={subtitle} label="13–20 Nov"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 22 }}>
    <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} /><XAxis type="number" unit="%" tick={axisTick} tickLine={false} axisLine={false} /><YAxis type="category" dataKey="commodity" tick={axisTick} tickLine={false} axisLine={false} width={135} /><ReferenceLine x={0} stroke="#9aa8ba" /><Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "Weekly change"]} />
    <Bar dataKey="change" name="Weekly change" radius={[4, 4, 4, 4]} maxBarSize={22} isAnimationActive={false}>{data.map((row) => <Cell key={row.commodity} fill={row.change >= 0 ? red : green} />)}</Bar>
  </BarChart></ResponsiveContainer></ChartPanel>;
}

function FruitTable({ title, unit, rows }: { title: string; unit: string; rows: typeof fruitRetailMovers }) {
  return <article className="section-card analytics-table-card"><div className="section-heading compact"><div><span className="section-kicker">{unit}</span><h3>{title}</h3></div></div><div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Commodity</th><th>13 Nov</th><th>20 Nov</th><th>Change</th></tr></thead><tbody>{rows.map((row) => <tr key={row.commodity}><td><strong>{row.commodity}</strong></td><td>₹{formatNumber(row.previous)}</td><td>₹{formatNumber(row.current)}</td><td><SignedChange value={row.change} suffix="%" /></td></tr>)}</tbody></table></div></article>;
}

function MarketBulletin() {
  const chartData = [...marketIntelligenceMovers].sort((a, b) => a.change - b.change);
  return <div className="ecostat-report" role="tabpanel">
    <div className="bulletin-summary-grid">
      <BulletinStat label="Reference date" value="24 Nov 2026" detail="Compared with 23 Nov" />
      <BulletinStat label="Largest fall" value="Rubber Lot −₹1,500" detail="Idukki · ₹25,500 to ₹24,000" tone="down" />
      <BulletinStat label="Largest rise" value="Coconut +₹200" detail="Kollam · ₹5,500 to ₹5,700" tone="up" />
      <BulletinStat label="Report time" value="4:24 PM" detail="Market Intelligence Section" />
    </div>
    <div className="analytics-chart-grid">
      <ChartPanel title="Largest centre-level changes" subtitle="Absolute rupee difference; commodity unit is retained in the table" label="23–24 Nov" wide><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData.map((row) => ({ ...row, label: `${shorten(row.commodity, 20)} · ${row.centre}` }))} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 30 }}>
        <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} /><XAxis type="number" tickFormatter={(value) => `₹${formatNumber(Number(value))}`} tick={axisTick} tickLine={false} axisLine={false} /><YAxis type="category" dataKey="label" tick={axisTick} tickLine={false} axisLine={false} width={160} /><ReferenceLine x={0} stroke="#9aa8ba" /><Tooltip formatter={(value) => [`₹${formatNumber(Number(value))}`, "Absolute change"]} />
        <Bar dataKey="change" name="Absolute change" radius={[4, 4, 4, 4]} maxBarSize={20} isAnimationActive={false}>{chartData.map((row) => <Cell key={`${row.commodity}-${row.centre}`} fill={row.change >= 0 ? red : green} />)}</Bar>
      </BarChart></ResponsiveContainer></ChartPanel>
      <article className="analytics-panel"><div className="analytics-panel-head"><div><h3>Reference quotations</h3><p>Prices unchanged across the two dates</p></div><span>24 Nov</span></div><div className="market-reference-list">{marketIntelligenceReferences.map((row) => <div key={`${row.commodity}-${row.centre}`}><span><strong>{row.commodity}</strong><small>{row.centre} · per {row.unit}</small></span><b>₹{formatNumber(row.price)}</b></div>)}</div></article>
    </div>
    <article className="section-card analytics-table-card"><div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Commodity</th><th>Centre</th><th>Unit</th><th>23 Nov</th><th>24 Nov</th><th>₹ variation</th></tr></thead><tbody>{marketIntelligenceMovers.map((row) => <tr key={`${row.commodity}-${row.centre}`}><td><strong>{row.commodity}</strong></td><td>{row.centre}</td><td>{row.unit}</td><td>₹{formatNumber(row.previous)}</td><td>₹{formatNumber(row.current)}</td><td><SignedChange value={row.change} prefix="₹" /></td></tr>)}</tbody></table></div></article>
    <p className="report-quality-note">Blank quotations and source cells marked NaN remain unavailable; they are not converted to zero or used to calculate variation.</p>
  </div>;
}

function CpiBulletin() {
  return <div className="ecostat-report" role="tabpanel">
    <div className="bulletin-summary-grid">
      <BulletinStat label="Centre average" value={cpiSummary.octoberAverage.toFixed(2)} detail={`September ${cpiSummary.septemberAverage.toFixed(2)}`} />
      <BulletinStat label="Point movement" value={`+${cpiSummary.pointChange.toFixed(2)}`} detail="September to October" tone="up" />
      <BulletinStat label="Centre movement" value={`${cpiSummary.increased} up · ${cpiSummary.decreased} down`} detail={`${cpiSummary.unchanged} unchanged`} />
      <BulletinStat label="Highest index" value="Kasaragod 246" detail="Lowest: Palakkad 213" />
    </div>
    <article className="analytics-panel"><div className="analytics-panel-head"><div><h3>Consumer Price Index by centre</h3><p>Agricultural labourers and industrial workers · base 2011–12 = 100</p></div><span>October 2026</span></div><div className="analytics-chart" style={{ height: 430 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={cpiCentres} margin={{ top: 12, right: 16, bottom: 80, left: 6 }}>
      <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="centre" tick={axisTick} tickLine={false} axisLine={false} angle={-40} textAnchor="end" interval={0} height={96} /><YAxis domain={[200, 250]} tick={axisTick} tickLine={false} axisLine={false} width={42} /><Tooltip /><Legend /><Bar dataKey="september" name="September" fill="#9eb8d8" radius={[3, 3, 0, 0]} isAnimationActive={false} /><Bar dataKey="october" name="October" fill={blue} radius={[3, 3, 0, 0]} isAnimationActive={false} />
    </BarChart></ResponsiveContainer></div></article>
    <article className="section-card analytics-table-card"><div className="section-heading compact"><div><span className="section-kicker">17 centres</span><h3>Centre index register</h3><p>Published 24 Nov 2026.</p></div></div><div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Centre</th><th>September</th><th>October</th><th>Point movement</th></tr></thead><tbody>{cpiCentres.map((row) => <tr key={row.centre}><td><strong>{row.centre}</strong></td><td>{row.september}</td><td>{row.october}</td><td><SignedChange value={row.october - row.september} /></td></tr>)}</tbody></table></div></article>
  </div>;
}

function BulletinStat({ label, value, detail, tone }: { label: string; value: string; detail: string; tone?: "up" | "down" }) {
  return <article className={`bulletin-stat ${tone ? `tone-${tone}` : ""}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

function SignedChange({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const up = value > 0;
  const flat = value === 0;
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return <span className={`signed-change ${flat ? "flat" : up ? "up" : "down"}`}>{!flat && (up ? <TrendingUp size={13} /> : <TrendingDown size={13} />)}{sign}{prefix}{formatNumber(Math.abs(value))}{suffix}</span>;
}

function Kpi({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: React.ReactNode; tone: "good" | "info" }) {
  return <article className={`analytics-kpi tone-${tone}`}><div className="analytics-kpi-top"><span>{label}</span>{icon}</div><strong>{value}</strong><div className="analytics-kpi-bottom"><span>{detail}</span></div></article>;
}

function ChartPanel({ title, subtitle, label, wide, children }: { title: string; subtitle: string; label: string; wide?: boolean; children: React.ReactNode }) {
  return <article className={`analytics-panel ${wide ? "analytics-panel-wide" : ""}`}><div className="analytics-panel-head"><div><h3>{title}</h3><p>{subtitle}</p></div><span>{label}</span></div><div className="analytics-chart" style={{ height: 360 }}>{children}</div></article>;
}

function Movement({ value }: { value: number | null }) {
  if (value == null) return <span>—</span>;
  const up = value >= 0;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: up ? red : green, fontWeight: 850 }}>{up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{value > 0 ? "+" : ""}{value.toFixed(2)}%</span>;
}

function addMovement(row: MarketPriceRecord) {
  return { ...row, dayPercent: percentChange(row.price, row.prevDay), yearPercent: percentChange(row.price, row.prevYear) };
}

function percentChange(current: number | null, previous: number | null) {
  if (current == null || previous == null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

function rupees(value: number | null) { return value == null ? "—" : `₹${formatNumber(value)}`; }
function formatNumber(value: number) { return value.toLocaleString("en-IN", { maximumFractionDigits: 2 }); }
function formatLakhCrore(value: number) { return value.toLocaleString("en-IN", { maximumFractionDigits: 2 }); }
function formatDate(value: string) { return value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"; }
function shortDate(value: string) { return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }); }
function monthLabel(value: string) { return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }); }
function shorten(value: string, length: number) { return value.length > length ? `${value.slice(0, length - 1)}…` : value; }
const axisTick = { fill: "#718096", fontSize: 10, fontWeight: 650 };
