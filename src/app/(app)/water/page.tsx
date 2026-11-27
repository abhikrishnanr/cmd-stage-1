import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, FlaskConical, House, MapPinned } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { DistrictWaterAccessTable } from "@/components/DistrictWaterAccessTable";
import {
  formatTransportNumber as number, TransportBars, TransportMetrics, TransportSection, TransportTable, TransportValues,
} from "@/components/TransportReport";
import { StackedBars } from "@/components/charts";
import { districtWaterAccess, districtWaterAccessSource, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import {
  waterConnections, waterConnectionTotal, waterOffices, waterQuality, waterQualityMonthly, waterSources, waterTopSections,
} from "@/data/water";
import styles from "./water.module.css";

export const metadata: Metadata = { title: "Water | Stage 1" };

const sections = [
  { label: "Rural access", href: "#rural-water" },
  { label: "KWA connections", href: "#water-connections" },
  { label: "Water quality", href: "#water-testing" },
  { label: "Consumer services", href: "#water-services" },
  { label: "Infrastructure projects", href: "/projects#project-koyilandy-water" },
];

const largestGap = districtWaterAccess.reduce((largest, row) => row.count > largest.count ? row : largest);
const lowestCoverage = districtWaterAccess.reduce((lowest, row) => row.with / row.denom < lowest.with / lowest.denom ? row : lowest);
const lowestOfficeReporting = waterOffices.reduce((lowest, row) => row.sectionsWithCounts / row.sectionsListed < lowest.sectionsWithCounts / lowest.sectionsListed ? row : lowest);
const failureShare = (tested: number, failed: number) => failed / tested * 100;
const annualFailureShare = failureShare(waterQuality.treatedWaterField, waterQuality.failedTreatedSamples);
const highestFailureMonth = waterQualityMonthly.reduce((highest, row) =>
  failureShare(row.tested, row.failed) > failureShare(highest.tested, highest.failed) ? row : highest,
);

const highlights = [
  {
    icon: House,
    label: "Largest connection gap",
    value: `${number(largestGap.count)} households`,
    note: `${largestGap.district} has the most rural households without a reported tap connection.`,
    href: "#rural-water",
    action: "Compare district gaps",
    source: districtWaterAccessSource,
  },
  {
    icon: MapPinned,
    label: "Lowest coverage",
    value: `${number(lowestCoverage.percent)}% connected`,
    note: `${lowestCoverage.district} is ${number(districtWaterAccessTotal.percent - lowestCoverage.percent)} percentage points below the Kerala rate.`,
    href: "#rural-water",
    action: "Compare district coverage",
    source: districtWaterAccessSource,
  },
  {
    icon: FlaskConical,
    label: "Treated-water checks",
    value: `${number(waterQuality.failedTreatedSamples)} failed samples`,
    note: `KWA reported failures in ${annualFailureShare.toFixed(1)}% of treated-water field samples in FY 2024–25.`,
    href: "#water-testing",
    action: "Review monthly results",
    source: waterSources.quality,
  },
];

export default function WaterPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heading}>
          <div>
            <span className={styles.heroIcon}><Droplets size={24} aria-hidden="true" /></span>
            <h1>Water</h1>
            <p>Rural tap access, Kerala Water Authority connections and drinking-water testing.</p>
          </div>
          <CmSourceDetails label="Water dashboard sources" sources={[districtWaterAccessSource, ...Object.values(waterSources)]} inverted />
        </div>
        <nav className={styles.nav} aria-label="Water sections">
          {sections.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
      </header>

      <TransportMetrics sourceIcons metrics={[
        { label: "Rural tap coverage", value: `${number(districtWaterAccessTotal.percent)}%`, source: districtWaterAccessSource, color: "water" },
        { label: "Rural households without taps", value: number(districtWaterAccessTotal.count), source: districtWaterAccessSource, color: "works" },
        { label: "KWA connections", value: number(waterConnectionTotal), source: waterSources.connections, color: "network" },
        { label: "Treated-water field samples", value: number(waterQuality.treatedWaterField), source: waterSources.quality, color: "service" },
      ]} />

      <section aria-labelledby="water-attention-title" className={styles.attention}>
        <h2 id="water-attention-title">Needs attention</h2>
        <div className={styles.attentionGrid}>
          {highlights.map(({ icon: Icon, label, value, note, href, action, source }) => (
            <article key={label}>
              <div className={styles.attentionHeader}>
                <span><Icon size={17} aria-hidden="true" />{label}</span>
                <CmSourceDetails label={`${label} source`} sources={[source]} />
              </div>
              <strong>{value}</strong>
              <p>{note}</p>
              <Link href={href}>{action} <ArrowRight size={14} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <TransportSection id="rural-water" title="Rural tap connections by district" source={districtWaterAccessSource} sourceIcons>
        <DistrictWaterAccessTable />
      </TransportSection>

      <div className={styles.twoColumns}>
        <TransportSection id="water-connections" title="KWA connection mix" source={waterSources.connections} sourceIcons>
          <ConnectionMix />
        </TransportSection>
        <TransportSection title="KWA connections by operating region" source={waterSources.connections} sourceIcons>
          <TransportBars items={waterOffices.map((row) => ({ label: row.region, value: row.connections }))} color="#0e7490" />
          <TransportTable
            label="KWA connections reported by office region"
            columns={["Region", "Connections", "Sections with data", "Listed sections"]}
            rows={waterOffices.map((row) => [row.region, row.connections, row.sectionsWithCounts, row.sectionsListed])}
          />
          <p className={styles.note}>
            Review reporting gaps in the {lowestOfficeReporting.region} region, where {lowestOfficeReporting.sectionsListed - lowestOfficeReporting.sectionsWithCounts} of {lowestOfficeReporting.sectionsListed} listed sections have no published count. Regional totals sum the sections with counts.
          </p>
        </TransportSection>
      </div>

      <div className={styles.twoColumns}>
        <TransportSection title="Largest KWA sections by connections" source={waterSources.connections} sourceIcons>
          <p className={styles.note}>Ranked among sections with a published count.</p>
          <TransportBars items={waterTopSections} color="#2563eb" />
        </TransportSection>
        <TransportSection id="water-services" title="Water connection service standards" source={waterSources.services} sourceIcons>
          <TransportValues items={[
            { label: "Domestic connection fee", value: "₹500" },
            { label: "Non-domestic connection fee", value: "₹1,000" },
            { label: "Right to Service time limit", value: "15 days" },
            { label: "KWA toll-free number", value: "1916" },
          ]} />
          <div className={styles.servicesNote}>
            <span>Designated officers and appeals are listed in the Right to Service schedule.</span>
            <CmSourceDetails label="Right to Service schedule source" sources={[waterSources.rightToService]} />
          </div>
        </TransportSection>
      </div>

      <TransportSection id="water-testing" title="KWA water quality testing" source={waterSources.quality} sourceIcons>
        <TransportValues items={[
          { label: "Physical and chemical lab tests", value: number(waterQuality.physicoChemicalLab) },
          { label: "Bacteriological lab tests", value: number(waterQuality.bacteriologicalLab) },
          { label: "Treated-water field samples", value: number(waterQuality.treatedWaterField) },
          { label: "Failed treated-water samples", value: number(waterQuality.failedTreatedSamples) },
        ]} />
        <QualityChart />
      </TransportSection>
    </div>
  );
}

function ConnectionMix() {
  let before = 0;
  const stops = waterConnections.map(({ value, color }) => {
    const start = before / waterConnectionTotal * 100;
    before += value;
    return `${color} ${start}% ${before / waterConnectionTotal * 100}%`;
  });
  return (
    <figure className={styles.composition} aria-label="Statewide KWA connections by category">
      <div className={styles.donut} style={{ backgroundImage: `conic-gradient(${stops.join(", ")})` }}>
        <div><strong>{number(waterConnectionTotal)}</strong><span>KWA connections</span></div>
      </div>
      <ul className={styles.mixLegend}>
        {waterConnections.map(({ label, value, color }) => (
          <li key={label}>
            <span><i style={{ backgroundColor: color }} aria-hidden="true" />{label}</span>
            <strong>{number(value)}</strong>
          </li>
        ))}
      </ul>
      <figcaption className={styles.note}>
        Domestic connections account for {(waterConnections[0].value / waterConnectionTotal * 100).toFixed(1)}% of the statewide KWA total.
      </figcaption>
    </figure>
  );
}

function QualityChart() {
  return (
    <figure className={styles.qualityChart}>
      <figcaption>
        <h3>Treated-water field samples by month</h3>
        <p>{highestFailureMonth.month} had the highest reported monthly failure share at {failureShare(highestFailureMonth.tested, highestFailureMonth.failed).toFixed(1)}% of tested samples.</p>
      </figcaption>
      <ul className={styles.chartLegend} aria-label="Chart key">
        <li><i data-type="failed" aria-hidden="true" />Reported failed samples</li>
        <li><i data-type="other" aria-hidden="true" />Other tested samples</li>
      </ul>
      <div className={styles.chartScroll}>
        <div className={styles.plot}>
          <StackedBars height={244} keys={["Reported failed samples", "Other tested samples"]} colors={["#b45309", "#0e7490"]} data={waterQualityMonthly.map((row) => ({
            label: row.short,
            "Reported failed samples": row.failed,
            "Other tested samples": row.tested - row.failed,
          }))} />
        </div>
      </div>
      <details className={styles.qualityDetail}>
        <summary>View monthly test counts</summary>
        <TransportTable label="Monthly KWA treated-water field samples in FY 2024–25" columns={["Month", "Field samples", "Failed samples", "Failed share"]}
          rows={waterQualityMonthly.map((row) => [row.month, row.tested, row.failed, `${failureShare(row.tested, row.failed).toFixed(1)}%`])} />
      </details>
      <p className={styles.note}>The failure share describes the samples KWA tested in FY 2024–25.</p>
    </figure>
  );
}
