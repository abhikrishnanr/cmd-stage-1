import type { ReactNode } from "react";
import {
  Activity, ArrowUpRight, BatteryCharging, Factory, Gauge, House, TriangleAlert, Waves, Zap,
  type LucideIcon,
} from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import type { DataProvenance } from "@/components/DataProvenance";
import {
  powerConsumptionByVoltage, powerConsumptionSource, powerConsumerCategories, powerConsumersSource,
  powerDaily, powerGenerationSource, powerPeakSource, powerReservoirHistory, powerStorageSource, powerSupplyMonths,
} from "@/data/power";
import styles from "./power.module.css";

const count = new Intl.NumberFormat("en-IN");
const quantity = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

const [previousMonth, currentMonth] = powerSupplyMonths.slice(-2);
const peakIncrease = currentMonth.peakUnmetMw - previousMonth.peakUnmetMw;
const importShare = 100 * powerDaily.netImportMu / powerDaily.consumptionMu;
const storageDrop = 100 * (1 - powerDaily.reservoirStorageMu / powerDaily.priorYearStorageMu);
const peakScale = Math.ceil(Math.max(...powerSupplyMonths.map((row) => row.peakUnmetMw)) / 50) * 50;
const energyScale = Math.ceil(Math.max(...powerSupplyMonths.map((row) => row.energyUnservedMu)) / 10) * 10;

const consumerGroups = [
  { label: "LT", title: "Low tension", color: "#0f7568", icon: House },
  { label: "HT", title: "High tension", color: "#3156a9", icon: Factory },
  { label: "EHT", title: "Extra high tension", color: "#8553a5", icon: Zap },
] as const;
const groupTotals = consumerGroups.map((group) => ({
  ...group,
  total: powerConsumerCategories[group.label].reduce((sum, row) => sum + row.count, 0),
  consumption: powerConsumptionByVoltage[group.label],
}));
const totalConsumers = groupTotals.reduce((sum, group) => sum + group.total, 0);
const totalConsumption = groupTotals.reduce((sum, group) => sum + group.consumption, 0);
const domesticShare = 100 * powerConsumerCategories.LT[0].count / groupTotals[0].total;

const colors = ["#1a776b", "#4871bb", "#a86719", "#9a5bb4", "#487c2e", "#b14a64"];
const sections = [
  { id: "power-attention", label: "What needs attention" },
  { id: "power-supply", label: "Monthly supply" },
  { id: "power-grid", label: "Daily grid and storage" },
  { id: "power-consumers", label: "Consumers and usage" },
];

export default function PowerPage() {
  return (
    <div className={styles.page}>
      <PowerHero />
      <nav aria-label="Power page sections" className={styles.navigation}>
        {sections.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <WatchPanel />
      <MonthlySupply />
      <DailyGrid />
      <ConsumerProfile />
    </div>
  );
}

function PowerHero() {
  const metrics = [
    { label: "Evening peak", value: `${count.format(powerDaily.eveningPeakMw)} MW`, period: `25 Nov · ${powerDaily.eveningPeakTime}`, icon: Activity, source: powerPeakSource },
    { label: "Electricity consumed", value: `${quantity.format(powerDaily.consumptionMu)} MU`, period: powerGenerationSource.period, icon: Zap, source: powerGenerationSource },
    { label: "Peak demand met", value: `${count.format(currentMonth.peakMetMw)} MW`, period: `${currentMonth.label} · CEA`, icon: Gauge, source: currentMonth.peakSource },
    { label: "KSEB consumers", value: count.format(totalConsumers), period: powerConsumersSource.period, icon: House, source: powerConsumersSource },
  ];
  return (
    <header className={styles.hero}>
      <div className="hero-grid" aria-hidden="true" />
      <div className={styles.heroHeading}>
        <span className={styles.heroIcon}><Zap size={27} aria-hidden="true" /></span>
        <div><h1 className="display">Power Command Dashboard</h1>
          <p>Kerala’s reported electricity demand, supply, reservoir storage and consumer connections.</p>
        </div>
        <CmSourceDetails inverted label="Power dashboard sources" sources={[
          currentMonth.peakSource, currentMonth.energySource, powerPeakSource, powerGenerationSource,
          powerStorageSource, powerConsumersSource, powerConsumptionSource,
        ]} />
      </div>
      <div className={styles.heroMetrics}>
        {metrics.map(({ label, value, period, icon: Icon, source }) => (
          <article className={styles.heroMetric} key={label}>
            <div className={styles.metricHeader}><Icon size={15} aria-hidden="true" /><span>{label}</span>
              <CmSourceDetails inverted label={`${label} source`} sources={[source]} />
            </div>
            <strong>{value}</strong><span>{period}</span>
          </article>
        ))}
      </div>
      <p className={styles.heroNote}>MW measures power. MU is one million units (kWh) of electricity.</p>
    </header>
  );
}

function WatchPanel() {
  return (
    <section id="power-attention" className={styles.group} aria-labelledby="power-attention-title">
      <div className={styles.sectionHeading}><TriangleAlert size={20} aria-hidden="true" /><h2 id="power-attention-title">What needs attention</h2></div>
      <div className={styles.watchGrid}>
        <article className={styles.watch} data-tone="amber">
          <header><h3>Peak shortfall widened</h3><CmSourceDetails label="Peak shortfall comparison sources" sources={[previousMonth.peakSource, currentMonth.peakSource, previousMonth.energySource, currentMonth.energySource]} /></header>
          <div className={styles.watchValue}>{count.format(currentMonth.peakUnmetMw)} MW <span> · {currentMonth.label}</span></div>
          <p>Up {count.format(peakIncrease)} MW from {previousMonth.label} even as monthly energy unserved fell from {previousMonth.energyUnservedMu} to {currentMonth.energyUnservedMu} MU. Review peak-hour adequacy alongside total energy supplied.</p>
          <a href="#power-supply">Compare monthly gaps <ArrowUpRight size={13} aria-hidden="true" /></a>
        </article>
        <article className={styles.watch} data-tone="blue">
          <header><h3>Imports supplied most of the day’s energy</h3><CmSourceDetails label="Import share source" sources={[powerGenerationSource]} /></header>
          <div className={styles.watchValue}>{percent.format(importShare)}% <span> · {powerGenerationSource.period}</span></div>
          <p>Net imports accounted for {quantity.format(powerDaily.netImportMu)} MU of {quantity.format(powerDaily.consumptionMu)} MU consumed. This is a one-day measure to track alongside evening demand.</p>
          <a href="#power-grid">Review the supply mix <ArrowUpRight size={13} aria-hidden="true" /></a>
        </article>
        <article className={styles.watch} data-tone="violet">
          <header><h3>Hydro storage lower year on year</h3><CmSourceDetails label="Year-on-year storage source" sources={[powerStorageSource]} /></header>
          <div className={styles.watchValue}>{percent.format(storageDrop)}% lower <span> · {powerStorageSource.period}</span></div>
          <p>Stored generation capability was {quantity.format(powerDaily.reservoirStorageMu)} MU versus {quantity.format(powerDaily.priorYearStorageMu)} MU in last year’s comparison. Track inflows and hydro availability in dispatch reviews.</p>
          <a href="#power-reservoirs">Compare storage by year <ArrowUpRight size={13} aria-hidden="true" /></a>
        </article>
      </div>
    </section>
  );
}

function Panel({ title, subtitle, id, icon: Icon, sources, children }: {
  title: string;
  subtitle: string;
  id?: string;
  icon: LucideIcon;
  sources: readonly DataProvenance[];
  children: ReactNode;
}) {
  return (
    <article className={styles.panel} id={id}>
      <header className={styles.panelHeader}>
        <span className={styles.panelIcon}><Icon size={19} aria-hidden="true" /></span>
        <div><h3>{title}</h3><p>{subtitle}</p></div>
        <CmSourceDetails label={`${title} sources`} sources={sources} />
      </header>
      {children}
    </article>
  );
}

function MonthlySupply() {
  return (
    <section id="power-supply" className={styles.group} aria-labelledby="power-supply-title">
      <div className={styles.sectionHeading}><Activity size={20} aria-hidden="true" /><h2 id="power-supply-title">Monthly power supply</h2></div>
      <div className={styles.chartGrid}>
        <Panel title="Peak demand and supply" subtitle="CEA revised reports · Aug–Oct 2026" icon={Gauge} sources={powerSupplyMonths.map((row) => row.peakSource)}>
          <p className={styles.chartLabel}>Peak demand unmet · MW</p>
          <div className={styles.chartAxis} aria-hidden="true"><span>0</span><span>{peakScale / 2}</span><span>{peakScale} MW</span></div>
          <ul className={styles.bars}>
            {powerSupplyMonths.map((row) => (
              <li key={row.label}>
                <div><span>{row.label}</span><strong>{count.format(row.peakUnmetMw)} MW <small>· {row.peakUnmetPct.toFixed(1)}%</small></strong></div>
                <Bar value={row.peakUnmetMw} max={peakScale} color={row === currentMonth ? "#ab540f" : "#d49b48"} />
              </li>
            ))}
          </ul>
          <details className={styles.tableDetails}>
            <summary>View demand and supply figures</summary>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption className="sr-only">CEA revised monthly peak demand and supply in MW</caption>
                <thead><tr><th scope="col">Month</th><th scope="col">Demand</th><th scope="col">Met</th><th scope="col">Unmet</th></tr></thead>
                <tbody>{powerSupplyMonths.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{count.format(row.peakDemandMw)}</td><td>{count.format(row.peakMetMw)}</td><td>{count.format(row.peakUnmetMw)}</td></tr>)}</tbody>
              </table>
            </div>
          </details>
        </Panel>

        <Panel title="Monthly energy supply" subtitle="CEA revised reports · Aug–Oct 2026" icon={BatteryCharging} sources={powerSupplyMonths.map((row) => row.energySource)}>
          <p className={styles.chartLabel}>Energy unserved · MU</p>
          <div className={styles.chartAxis} aria-hidden="true"><span>0</span><span>{energyScale / 2}</span><span>{energyScale} MU</span></div>
          <ul className={styles.bars}>
            {powerSupplyMonths.map((row) => (
              <li key={row.label}>
                <div><span>{row.label}</span><strong>{count.format(row.energyUnservedMu)} MU <small>· {row.energyUnservedPct.toFixed(1)}%</small></strong></div>
                <Bar value={row.energyUnservedMu} max={energyScale} color={row === currentMonth ? "#147568" : "#6ba296"} />
              </li>
            ))}
          </ul>
          <details className={styles.tableDetails}>
            <summary>View requirement and supply figures</summary>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption className="sr-only">CEA revised monthly energy requirement and supply in MU</caption>
                <thead><tr><th scope="col">Month</th><th scope="col">Required</th><th scope="col">Supplied</th><th scope="col">Unserved</th></tr></thead>
                <tbody>{powerSupplyMonths.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{count.format(row.energyRequirementMu)}</td><td>{count.format(row.energySuppliedMu)}</td><td>{count.format(row.energyUnservedMu)}</td></tr>)}</tbody>
              </table>
            </div>
          </details>
        </Panel>
      </div>
    </section>
  );
}

function DailyGrid() {
  const supply = [
    { label: "Net imports", value: powerDaily.netImportMu, color: "#3156a9" },
    { label: "Internal generation", value: powerDaily.internalGenerationMu, color: "#168579" },
  ];
  return (
    <section id="power-grid" className={styles.group} aria-labelledby="power-grid-title">
      <div className={styles.sectionHeading}><Zap size={20} aria-hidden="true" /><h2 id="power-grid-title">Daily grid and storage</h2></div>
      <div className={styles.chartGrid}>
        <Panel title="Where electricity came from" subtitle={`Kerala SLDC · ${powerGenerationSource.period}`} icon={Zap} sources={[powerGenerationSource, powerPeakSource]}>
          <RingChart segments={supply} center={`${quantity.format(powerDaily.consumptionMu)} MU`} centerDetail="Consumed" format={(value) => `${quantity.format(value)} MU`} />
          <dl className={styles.statGrid}>
            <div><dt>Morning peak · {powerDaily.morningPeakTime}</dt><dd>{count.format(powerDaily.morningPeakMw)} MW</dd></div>
            <div><dt>Evening peak · {powerDaily.eveningPeakTime}</dt><dd>{count.format(powerDaily.eveningPeakMw)} MW</dd></div>
            <div><dt>SLDC hydel subtotal</dt><dd>{quantity.format(powerDaily.hydelGenerationMu)} MU</dd></div>
            <div><dt>November daily average through 25 Nov</dt><dd>{quantity.format(powerDaily.monthlyAverageConsumptionMu)} MU</dd></div>
            <div><dt>November consumption through 25 Nov</dt><dd>{quantity.format(powerDaily.monthlyConsumptionMu)} MU</dd></div>
          </dl>
        </Panel>
        <Panel id="power-reservoirs" title="Hydroelectric reservoir storage" subtitle={`Kerala SLDC · ${powerStorageSource.period}`} icon={Waves} sources={[powerStorageSource]}>
          <div className={styles.storageSummary}>
            <strong>{powerDaily.reservoirStoragePct}%</strong>
            <span>of total storage capability · {quantity.format(powerDaily.reservoirStorageMu)} of {quantity.format(powerDaily.reservoirCapacityMu)} MU</span>
          </div>
          <p className={styles.chartLabel}>Prior-year comparison · MU of stored generation capability</p>
          <ul className={styles.bars}>
            {powerReservoirHistory.map(({ year, storageMu }) => (
              <li key={year}>
                <div><span>{year}</span><strong>{quantity.format(storageMu)} MU</strong></div>
                <Bar value={storageMu} max={powerDaily.reservoirCapacityMu} color={year === 2026 ? "#8553a5" : "#627eaa"} />
              </li>
            ))}
          </ul>
          <p className={styles.panelNote}>November inflow through 25 Nov was <strong>{quantity.format(powerDaily.inflowMonthToDateMu)} MU</strong>, excluding Sholayar as reported by SLDC.</p>
        </Panel>
      </div>
    </section>
  );
}

function ConsumerProfile() {
  const ltMix = powerConsumerCategories.LT.map((row, index) => ({ label: row.label, value: row.count, color: colors[index] }));
  return (
    <section id="power-consumers" className={styles.group} aria-labelledby="power-consumers-title">
      <div className={styles.sectionHeading}><Factory size={20} aria-hidden="true" /><h2 id="power-consumers-title">Consumers and usage</h2></div>
      <div className={styles.chartGrid}>
        <Panel title="LT consumer composition" subtitle={`KSEB consumer counts · ${powerConsumersSource.period}`} icon={House} sources={[powerConsumersSource]}>
          <RingChart segments={ltMix} center={`${percent.format(domesticShare)}%`} centerDetail="Domestic share" format={(value) => count.format(value)} />
          <p className={styles.panelNote}>LT accounted for {count.format(groupTotals[0].total)} of {count.format(totalConsumers)} KSEB consumer connections.</p>
        </Panel>
        <Panel title="Electricity use by voltage group" subtitle={`KSEB consumption · ${powerConsumptionSource.period}`} icon={Zap} sources={[powerConsumptionSource]}>
          <div className={styles.storageSummary}><strong>{quantity.format(totalConsumption)} MU</strong><span>total across published voltage groups</span></div>
          <ul className={styles.bars}>
            {groupTotals.map(({ label, title, consumption, color }) => (
              <li key={label}><div><span>{title} ({label})</span><strong>{quantity.format(consumption)} MU</strong></div>
                <Bar value={consumption} max={totalConsumption} color={color} />
              </li>
            ))}
          </ul>
          <p className={styles.panelNote}>Bar lengths show each group’s share of the monthly total.</p>
        </Panel>
      </div>
      <div className={styles.consumerGrid}>
        {groupTotals.map(({ label, title, icon, total }) => (
          <Panel key={label} title={`${label} consumers`} subtitle={`${title} · ${powerConsumersSource.period}`} icon={icon} sources={[powerConsumersSource]}>
            <table className={styles.table}>
              <caption className="sr-only">{label} consumer connections by category</caption>
              <thead><tr><th scope="col">Category</th><th scope="col">Consumers</th></tr></thead>
              <tbody>{powerConsumerCategories[label].map((row) => (
                <tr key={row.label}><th scope="row">{row.label}</th><td>{count.format(row.count)}</td></tr>
              ))}</tbody>
              <tfoot><tr><th scope="row">Total</th><td>{count.format(total)}</td></tr></tfoot>
            </table>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  return <div className={styles.barTrack} aria-hidden="true"><span style={{ width: `${100 * value / max}%`, backgroundColor: color }} /></div>;
}

function RingChart({ segments, center, centerDetail, format }: {
  segments: readonly { label: string; value: number; color: string }[];
  center: string;
  centerDetail: string;
  format: (value: number) => string;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let offset = 0;
  const stops = segments.map(({ value, color }) => {
    const start = offset;
    offset += 100 * value / total;
    return `${color} ${start}% ${offset}%`;
  });
  return (
    <div className={styles.ringChart}>
      <div className={styles.ring} style={{ backgroundImage: `conic-gradient(${stops.join(", ")})` }}>
        <div><strong>{center}</strong><span>{centerDetail}</span></div>
      </div>
      <ul className={styles.legend}>
        {segments.map(({ label, value, color }) => (
          <li key={label}><span><i style={{ backgroundColor: color }} aria-hidden="true" />{label}</span><strong>{format(value)}</strong></li>
        ))}
      </ul>
    </div>
  );
}
