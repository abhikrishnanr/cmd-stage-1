import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, ClipboardList, Droplets, Zap } from "lucide-react";
import type { DataProvenance } from "@/components/DataProvenance";
import { ProvenanceTooltip } from "@/components/DataProvenance";
import { programmeMonitor, programmeProgress } from "@/data/deliveryActuals";
import { districtWaterAccess, districtWaterAccessSource, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import { unemploymentComparisonSource, unemploymentComparisons, youngWomenUnemployment } from "@/data/employmentCommand";
import { powerSupplyMonths } from "@/data/power";
import { programmeDashboardApiUrl } from "@/lib/programmeDelivery";
import styles from "./review.module.css";

export const metadata: Metadata = { title: "CM Review | Kerala CM Dashboard" };

const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const number = new Intl.NumberFormat("en-IN");
const percentage = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const [kerala, india] = unemploymentComparisons;
const jobsGap = kerala.age15To29 - india.age15To29;
const womenGap = youngWomenUnemployment.kerala - youngWomenUnemployment.india;
const [powerPrevious, powerCurrent] = powerSupplyMonths.slice(-2);
const largestWaterGap = districtWaterAccess.reduce((largest, row) => row.count > largest.count ? row : largest);
const lowestWaterCoverage = districtWaterAccess.reduce((lowest, row) => row.with / row.denom < lowest.with / lowest.denom ? row : lowest);
const programmeSource = { ...programmeMonitor, dataset: "100 Days Programme totals API", url: programmeDashboardApiUrl, sourceUpdatedAt: null };

function ModuleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.moduleLink} href={href}>{children} <ArrowUpRight aria-hidden="true" size={15} /></Link>;
}

function SourceLink({ source, label }: { source: DataProvenance; label?: string }) {
  return (
    <a href={source.url} className={styles.sourceLink} rel="noreferrer" target="_blank" title={source.dataset}>
      {label ?? source.source} <ArrowUpRight aria-hidden="true" size={12} />
    </a>
  );
}

export default function CmReviewPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <Link href="/dashboard-cm" className={styles.back}>Chief Minister Dashboard</Link>
        <h1>CM Review</h1>
        <p>Briefing questions, official evidence and the detail needed for follow-up.</p>
        <nav aria-label="CM review topics" className={styles.topics}>
          <a href="#delivery">Department follow-up</a>
          <a href="#jobs">Employment</a>
          <a href="#power">Power supply</a>
          <a href="#district-services">Rural tap connections</a>
        </nav>
      </header>

      <section id="delivery" className={styles.section} aria-labelledby="delivery-review-title">
        <header className={styles.heading}>
          <span className={styles.icon}><ClipboardList size={18} aria-hidden="true" /></span>
          <div><h2 id="delivery-review-title">Department follow-up</h2><p>Kerala’s 100 Days Programme · {programmeMonitor.period}</p></div>
          <ProvenanceTooltip provenance={programmeSource} />
        </header>
        <div className={styles.finding}>
          <p><strong>{number.format(programmeProgress.inProgress)} projects</strong> reported in progress and <strong>{number.format(programmeProgress.indicators - programmeProgress.verifiedIndicators)} indicators</strong> awaiting verification.</p>
          <p className={styles.note}>Programme snapshot · {programmeMonitor.note}. The department view checks the official feed.</p>
        </div>
        <div className={styles.reviewPrompt}><strong>Question for review</strong><p>Which departments have projects reported in progress or indicators awaiting verification?</p></div>
        <footer className={styles.sectionFooter}>
          <ModuleLink href="/delivery-rag#department-follow-up">Review department returns</ModuleLink>
          <SourceLink source={programmeSource} label="Government of Kerala programme data" />
        </footer>
      </section>

      <div className={styles.grid}>
        <section id="jobs" className={`${styles.section} ${styles.jobs}`} aria-labelledby="jobs-review-title">
          <header className={styles.heading}>
            <span className={styles.icon}><BriefcaseBusiness size={18} aria-hidden="true" /></span>
            <div><h2 id="jobs-review-title">Youth employment</h2><p>MoSPI survey estimates · {unemploymentComparisonSource.period}</p></div>
            <ProvenanceTooltip provenance={unemploymentComparisonSource} />
          </header>
          <div className={styles.finding}>
            <span className={styles.big}>{decimal.format(jobsGap)} pp</span>
            <p>Kerala’s youth unemployment rate above the India rate. The gap for young women was {decimal.format(womenGap)} percentage points.</p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table} aria-label="Kerala and India unemployment rate estimates ages 15 to 29">
              <thead><tr><th scope="col">Ages 15–29</th><th scope="col">Kerala</th><th scope="col">India</th></tr></thead>
              <tbody>
                <tr><th scope="row">All youth</th><td>{decimal.format(kerala.age15To29)}%</td><td>{decimal.format(india.age15To29)}%</td></tr>
                <tr><th scope="row">Young women</th><td>{decimal.format(youngWomenUnemployment.kerala)}%</td><td>{decimal.format(youngWomenUnemployment.india)}%</td></tr>
              </tbody>
            </table>
          </div>
          <p className={styles.note}>Share of the labour force in each group, using the survey’s seven-day reference period. Rural and urban combined.</p>
          <div className={styles.reviewPrompt}><strong>Question for review</strong><p>What barriers to work for young women should the employment and skills departments investigate?</p></div>
          <footer className={styles.sectionFooter}>
            <ModuleLink href="/employment">Compare with neighbouring states</ModuleLink>
            <SourceLink source={unemploymentComparisonSource} label="MoSPI PLFS, Table 5" />
          </footer>
        </section>

        <section id="power" className={`${styles.section} ${styles.power}`} aria-labelledby="power-review-title">
          <header className={styles.heading}>
            <span className={styles.icon}><Zap size={18} aria-hidden="true" /></span>
            <div><h2 id="power-review-title">Peak power and energy supply</h2><p>Central Electricity Authority · {powerPrevious.label} and {powerCurrent.label}</p></div>
            <ProvenanceTooltip provenance={powerCurrent.peakSource} />
          </header>
          <div className={styles.finding}>
            <span className={styles.big}>{number.format(powerCurrent.peakUnmetMw)} MW</span>
            <p>Unmet peak demand in {powerCurrent.label}. The monthly energy shortfall fell from {number.format(powerPrevious.energyUnservedMu)} to {number.format(powerCurrent.energyUnservedMu)} MU.</p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table} aria-label="Reported monthly peak and energy shortfalls">
              <thead><tr><th scope="col">Month</th><th scope="col">Unmet peak (MW)</th><th scope="col">Unserved energy (MU)</th></tr></thead>
              <tbody>
                {[powerPrevious, powerCurrent].map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td><SourceLink source={row.peakSource} label={number.format(row.peakUnmetMw)} /></td>
                    <td><SourceLink source={row.energySource} label={number.format(row.energyUnservedMu)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>MW measures the peak power gap. MU is one million kilowatt-hours of energy across the month. The figures are from CEA’s revised reports.</p>
          <div className={styles.reviewPrompt}><strong>Question for review</strong><p>Which hours and supply constraints account for the larger peak gap, even as the monthly energy shortfall fell?</p></div>
          <footer className={styles.sectionFooter}>
            <ModuleLink href="/power">Open Power dashboard</ModuleLink>
            <SourceLink source={powerCurrent.peakSource} label="CEA peak supply report" />
          </footer>
        </section>
      </div>

      <section id="district-services" className={`${styles.section} ${styles.water}`} aria-labelledby="water-review-title">
        <header className={styles.heading}>
          <span className={styles.icon}><Droplets size={18} aria-hidden="true" /></span>
          <div><h2 id="water-review-title">Rural tap connections</h2><p>Jal Jeevan Mission district report · {districtWaterAccessSource.period}</p></div>
          <ProvenanceTooltip provenance={districtWaterAccessSource} />
        </header>
        <div className={styles.finding}>
          <span className={styles.big}>{number.format(districtWaterAccessTotal.count)}</span>
          <p>Rural households without a recorded tap connection across Kerala. Statewide coverage was {percentage.format(districtWaterAccessTotal.percent)}%.</p>
        </div>
        <dl className={styles.districtGaps}>
          <div><dt>Largest number without taps</dt><dd>{largestWaterGap.district} · {number.format(largestWaterGap.count)} households</dd></div>
          <div><dt>Lowest share with taps</dt><dd>{lowestWaterCoverage.district} · {percentage.format(lowestWaterCoverage.percent)}% coverage</dd></div>
        </dl>
        <div className={styles.reviewPrompt}><strong>Question for review</strong><p>Which ongoing projects will close the largest connection gaps, and what support do the lowest-coverage districts need?</p></div>
        <footer className={styles.sectionFooter}>
          <ModuleLink href="/water#rural-water">Compare all districts</ModuleLink>
          <SourceLink source={districtWaterAccessSource} label="Jal Jeevan Mission district report" />
        </footer>
      </section>

      <details className={styles.methods}>
        <summary>Review approach and sources</summary>
        <ul>
          <li>Use published progress and clearly stated questions for follow-up. <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2329801&lang=1&reg=3">54th PRAGATI review</a></li>
          <li>Link the state brief to departmental and district detail. <a href="https://darpan.nic.in/Default.aspx">NIC’s DARPAN dashboard</a></li>
          <li>Show the reporting period, original source and definitions beside each measure. <a href="https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-testing-dashboards-for-design-and-accessibility/">UK Government Statistical Service guidance</a></li>
        </ul>
      </details>
    </div>
  );
}
