import type { ReactNode } from "react";
import { Activity, ArrowDownRight, Baby, HeartPulse, Hospital, ShieldPlus, Siren } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import type { DataProvenance } from "@/components/DataProvenance";
import { EHealthDistrictMap } from "@/components/EHealthDistrictMap";
import { TransportTable } from "@/components/TransportReport";
import {
  clinicalRegisterUrl, diseaseReportingCheckpoints, diseaseSurveillanceRows, diseaseSurveillanceSource, diseaseTrendSources,
  eHealthFacilityCounts, eHealthFootprintSource, eHealthImplementationCohorts, eHealthWorkflow, healthAssurance,
  healthAssuranceSource, healthOutcomes, healthSurveyMeasures, healthSurveySource, infantMortalitySource, maternalMortalitySource,
} from "@/data/healthActuals";
import styles from "./health.module.css";

const count = new Intl.NumberFormat("en-IN");
const percentage = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const facilityTotal = eHealthFacilityCounts.reduce((total, item) => total + item.value, 0);
const kaspHospitals = healthAssurance.publicHospitals + healthAssurance.privateHospitals;
const visitTotal = eHealthWorkflow.permanentVisits + eHealthWorkflow.temporaryVisits;
const temporaryVisitShare = eHealthWorkflow.temporaryVisits / visitTotal * 100;
const leptospirosis = diseaseSurveillanceRows.find(({ label }) => label === "Leptospirosis")!;
const dengue = diseaseSurveillanceRows.find(({ label }) => label === "Dengue fever")!;
const childDiet = healthSurveyMeasures[2];

const clinicalSource: DataProvenance = {
  source: "Kerala State Council for Clinical Establishments",
  dataset: "Official register of clinical establishments",
  url: clinicalRegisterUrl,
  basis: "Facility registrations recorded by the council",
};

const jumpLinks = [
  ["health-attention", "What needs attention"], ["health-surveillance", "Disease surveillance"],
  ["health-outcomes", "Maternal and child health"], ["health-digital", "eHealth institutions"], ["health-assurance", "Health assurance"],
];

const signals = [
  { title: "Leptospirosis deaths", value: `${count.format(leptospirosis.monthDeaths)} confirmed deaths`, period: "November through 25 Nov 2026", text: "Leptospirosis had the most confirmed November deaths among the six conditions shown. Review district case follow-up and death-audit updates.", sources: [diseaseSurveillanceSource], href: "#health-surveillance", tone: "rose" },
  { title: "Dengue case burden", value: `${count.format(dengue.monthCases)} confirmed cases`, period: "November through 25 Nov 2026", text: "Dengue accounted for the largest November case count among the six conditions shown. Review local case concentrations using the district reports.", sources: diseaseTrendSources, href: "#health-surveillance", tone: "amber" },
  { title: "Young children’s diet", value: `${percentage.format(childDiet.latest)}% received an adequate diet`, period: "Kerala NFHS-6 · ages 6–23 months", text: `The share was ${percentage.format(childDiet.rural)}% in rural Kerala and ${percentage.format(childDiet.urban)}% in urban Kerala. Review complementary feeding support.`, sources: [healthSurveySource], href: "#health-nutrition", tone: "violet" },
] as const;

const heroMetrics = [
  { label: "Dengue cases", value: count.format(dengue.monthCases), period: "November through 25 Nov 2026", icon: Activity, source: diseaseSurveillanceSource },
  { label: "Infant mortality rate", value: `${healthOutcomes.infantMortality.kerala} per 1,000`, period: "Live births · SRS 2024", icon: Baby, source: infantMortalitySource },
  { label: "eHealth institutions", value: count.format(facilityTotal), period: "Dashboard snapshot · 25 Nov 2026", icon: Hospital, source: eHealthFootprintSource },
  { label: "Families with a KASP card", value: count.format(healthAssurance.familiesWithCard), period: "March 2026 fact sheet", icon: ShieldPlus, source: healthAssuranceSource },
];

function Panel({ id, title, period, sources, children }: { id?: string; title: string; period: string; sources: DataProvenance[]; children: ReactNode }) {
  return (
    <article className={styles.panel} id={id}>
      <header className={styles.panelHeader}>
        <div><h3>{title}</h3><p>{period}</p></div>
        <CmSourceDetails label={`${title} sources`} sources={sources} />
      </header>
      {children}
    </article>
  );
}

function ComparisonBars({ items, max, suffix = "" }: { items: readonly { label: string; value: number; color?: string }[]; max: number; suffix?: string }) {
  return (
    <ul className={styles.bars}>
      {items.map(({ label, value, color }) => (
        <li key={label}>
          <div><span>{label}</span><strong>{count.format(value)}{suffix}</strong></div>
          <span className={styles.track} aria-hidden="true"><i style={{ width: `${value / max * 100}%`, background: color }} /></span>
        </li>
      ))}
    </ul>
  );
}

const trendMeasures = [
  { key: "dengue", title: "Dengue fever", color: "#ad4a15" },
  { key: "hepatitisA", title: "Hepatitis A", color: "#7955a4" },
  { key: "leptospirosis", title: "Leptospirosis", color: "#b33754" },
  { key: "influenza", title: "Influenza", color: "#23618b" },
] as const;

function DiseaseTrendCards() {
  return (
    <div className={styles.trendGrid}>
      {trendMeasures.map(({ key, title, color }) => {
        const max = Math.max(...diseaseReportingCheckpoints.map((row) => row[key]));
        const plot = diseaseReportingCheckpoints.map((row) => ({
          ...row, x: 8 + (row.day - 13) / 12 * 224, y: 68 - (row[key] / max) * 54,
        }));
        const line = plot.map(({ x, y }) => `${x},${y}`).join(" ");
        return (
          <figure className={styles.trend} key={key}>
            <figcaption>{title}</figcaption>
            <svg viewBox="0 0 240 74" aria-hidden="true" className={styles.sparkline}>
              <path d="M8 68H232" stroke="#cbd5e1" />
              <polygon points={`8,68 ${line} 232,68`} fill={color} opacity=".11" />
              <polyline points={line} fill="none" stroke={color} strokeWidth="3" />
              {plot.map(({ day, x, y }) => <circle key={day} cx={x} cy={y} r="3.5" fill={color} />)}
            </svg>
            <ol className={styles.checkpoints}>
              {plot.map((row) => <li key={row.day}><strong>{count.format(row[key])}</strong><span>{row.label}</span></li>)}
            </ol>
          </figure>
        );
      })}
    </div>
  );
}

export default function HealthPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroHeading}>
          <div><div className={styles.heroIcon}><HeartPulse size={25} aria-hidden="true" /></div><h1>Health &amp; Disease Radar</h1><p>Surveillance, health outcomes, eHealth institutions and care access in Kerala.</p></div>
          <CmSourceDetails inverted label="Health dashboard sources" sources={[diseaseSurveillanceSource, healthSurveySource, infantMortalitySource, maternalMortalitySource, eHealthFootprintSource, healthAssuranceSource, clinicalSource]} />
        </div>
        <div className={styles.heroGrid}>
          {heroMetrics.map(({ label, value, period, icon: Icon, source }) => (
            <article key={label} className={styles.metric}>
              <div><span><Icon size={16} aria-hidden="true" /> {label}</span><CmSourceDetails inverted label={`${label} source`} sources={[source]} /></div>
              <strong>{value}</strong><span>{period}</span>
            </article>
          ))}
        </div>
      </header>

      <nav className={styles.nav} aria-label="Health sections">
        {jumpLinks.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="health-attention" className={styles.group} aria-labelledby="health-attention-title">
        <h2 className={styles.sectionTitle} id="health-attention-title"><Siren size={19} aria-hidden="true" />What needs attention</h2>
        <div className={styles.attentionGrid}>
          {signals.map(({ title, value, period, text, sources, href, tone }) => (
            <article className={styles.attention} data-tone={tone} key={title}>
              <header><h3>{title}</h3><CmSourceDetails label={`${title} sources`} sources={sources} /></header>
              <strong>{value}</strong><small>{period}</small><p>{text}</p>
              <a href={href}>See figures <ArrowDownRight size={14} aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="health-surveillance" className={styles.group} aria-labelledby="health-surveillance-title">
        <h2 className={styles.sectionTitle} id="health-surveillance-title"><Activity size={19} aria-hidden="true" />Communicable disease surveillance</h2>
        <Panel title="Confirmed November cases" period="IDSP month-to-date reporting checkpoints · 13, 18 and 25 Nov 2026" sources={diseaseTrendSources}>
          <DiseaseTrendCards />
          <p className={styles.note}>Each chart has its own case scale. Reports count cases cumulatively within November and are subject to revisions after lab tests and death audits.</p>
        </Panel>
        <Panel title="Case and death counts" period="Preliminary IDSP report through 25 Nov 2026" sources={[diseaseSurveillanceSource]}>
          <TransportTable label="Confirmed cases and deaths for six selected conditions" columns={["Condition", "Cases on 25 Nov", "November cases", "November deaths", "2026 cases", "2026 deaths"]}
            rows={diseaseSurveillanceRows.map((row) => [row.label, row.daily, row.monthCases, row.monthDeaths, row.yearCases, row.yearDeaths])} />
        </Panel>
      </section>

      <section id="health-outcomes" className={styles.group} aria-labelledby="health-outcomes-title">
        <h2 className={styles.sectionTitle} id="health-outcomes-title"><Baby size={19} aria-hidden="true" />Maternal and child health</h2>
        <div className={styles.twoColumns}>
          <Panel title="Infant mortality rate" period="SRS 2024 · deaths under age one per 1,000 live births" sources={[infantMortalitySource]}>
            <ComparisonBars max={24} items={[
              { label: "Kerala", value: healthOutcomes.infantMortality.kerala }, { label: "India", value: healthOutcomes.infantMortality.india, color: "#647b9b" },
              { label: "Rural Kerala", value: healthOutcomes.infantMortality.rural, color: "#208374" }, { label: "Urban Kerala", value: healthOutcomes.infantMortality.urban, color: "#7955a4" },
            ]} />
            <p className={styles.note}>Kerala’s urban estimate is {healthOutcomes.infantMortality.urban - healthOutcomes.infantMortality.rural} deaths per 1,000 live births higher than its rural estimate.</p>
          </Panel>
          <Panel title="Maternal mortality ratio" period="SRS 2022–24 · maternal deaths per 1,00,000 live births" sources={[maternalMortalitySource]}>
            <ComparisonBars max={87} items={[{ label: "Kerala", value: healthOutcomes.maternalMortality.kerala }, { label: "India", value: healthOutcomes.maternalMortality.india, color: "#647b9b" }]} />
          </Panel>
        </div>
        <Panel id="health-nutrition" title="Child vaccination and nutrition" period="Kerala survey estimates · NFHS-5 (2019–21) and NFHS-6 (2023–24)" sources={[healthSurveySource]}>
          <div className={styles.legend}><span><i data-legend="earlier" /> NFHS-5</span><span><i data-legend="latest" /> NFHS-6</span></div>
          <ul className={styles.surveyGrid}>
            {healthSurveyMeasures.map((item) => (
              <li key={item.label}>
                <h4>{item.label}</h4><small>{item.group}</small>
                <ComparisonBars max={100} suffix="%" items={[{ label: "NFHS-5", value: item.earlier, color: "#8596ad" }, { label: "NFHS-6", value: item.latest }]} />
              </li>
            ))}
          </ul>
          <details className={styles.dataDisclosure}>
            <summary>View rural and urban estimates</summary>
            <TransportTable label="Kerala NFHS-6 urban and rural estimates" columns={["Indicator", "Age group", "Rural", "Urban"]} rows={healthSurveyMeasures.map((row) => [row.label, row.group, `${percentage.format(row.rural)}%`, `${percentage.format(row.urban)}%`])} />
          </details>
          <p className={styles.note}>NFHS-6 estimates are provisional. The charts show published estimates for each survey round.</p>
        </Panel>
      </section>

      <section id="health-digital" className={styles.group} aria-labelledby="health-digital-title">
        <h2 className={styles.sectionTitle} id="health-digital-title"><Hospital size={19} aria-hidden="true" />eHealth institutions and workflow</h2>
        <Panel title="eHealth institutions by district" period="Official facility list · 25 Nov 2026" sources={[eHealthFootprintSource]}>
          <EHealthDistrictMap />
          <p className={styles.note}>Counts describe institutions listed on eHealth. They do not measure district-wide facility coverage, capacity or health risk.</p>
        </Panel>
        <div className={styles.twoColumns}>
          <Panel title="eHealth facility mix" period="Dashboard classifications · 25 Nov 2026" sources={[eHealthFootprintSource]}>
            <ComparisonBars max={599} items={eHealthFacilityCounts} />
          </Panel>
          <Panel title="Implementation year of listed institutions" period="2016–25 Nov 2026 · groups current institutions by reported start year" sources={[eHealthFootprintSource]}>
            <div className={styles.plotScroll}>
              <ol className={styles.columns}>
                {eHealthImplementationCohorts.map(({ year, value }) => (
                  <li key={year}><strong>{value}</strong><span aria-hidden="true"><i style={{ height: `${value / 408 * 100}%` }} /></span><small>{year}</small></li>
                ))}
              </ol>
            </div>
            <p className={styles.note}>2026 is through 25 November. The chart groups institutions currently listed by start year.</p>
            <div className={styles.summaryLine}>
              <span>Clinical establishments register</span><CmSourceDetails label="Clinical establishments register source" sources={[clinicalSource]} />
            </div>
          </Panel>
        </div>
        <Panel title="eHealth patient workflow" period="Dashboard totals · 25 Nov 2026 snapshot" sources={[eHealthFootprintSource]}>
          <div className={styles.workflow}>
            <figure className={styles.mix}>
              <div className={styles.ring} aria-hidden="true" style={{ background: `conic-gradient(#187d78 ${temporaryVisitShare}%, #9baecf ${temporaryVisitShare}%)` }}><i>{percentage.format(temporaryVisitShare)}%</i></div>
              <figcaption><span className="sr-only">{percentage.format(temporaryVisitShare)}% </span>Temporary UHID visits</figcaption>
            </figure>
            <dl className={styles.outcomeGrid}>
              <Stat label="Temporary UHID visits" value={eHealthWorkflow.temporaryVisits} />
              <Stat label="Permanent UHID visits" value={eHealthWorkflow.permanentVisits} />
              <Stat label="Temporary UHID registrations" value={eHealthWorkflow.temporaryRegistrations} />
              <Stat label="Permanent UHID registrations" value={eHealthWorkflow.permanentRegistrations} />
              <Stat label="Inpatient admissions" value={eHealthWorkflow.inpatientAdmissions} />
              <Stat label="Advance appointment visits" value={eHealthWorkflow.advanceAppointmentVisits} />
            </dl>
          </div>
          <p className={styles.note}>UHID means unique health identification. Visit and registration records count activity in eHealth.</p>
        </Panel>
      </section>

      <section id="health-assurance" className={styles.group} aria-labelledby="health-assurance-title">
        <h2 className={styles.sectionTitle} id="health-assurance-title"><ShieldPlus size={19} aria-hidden="true" />Health assurance</h2>
        <Panel title="Karunya Arogya Suraksha Padhathi" period="State Health Agency · March 2026" sources={[healthAssuranceSource]}>
          <div className={styles.twoColumns}>
            <div>
              <h4 className={styles.chartLabel}>{count.format(kaspHospitals)} empanelled hospitals</h4>
              <ComparisonBars max={kaspHospitals} items={[{ label: "Public hospitals", value: healthAssurance.publicHospitals }, { label: "Private hospitals", value: healthAssurance.privateHospitals, color: "#7955a4" }]} />
            </div>
            <dl className={styles.outcomeGrid}>
              <Stat label="Families with a KASP card" value={healthAssurance.familiesWithCard} />
              <Stat label="KASP claims converted" value={healthAssurance.kaspClaimsConverted} />
              <Stat label="Beneficiaries in claims analysis" value={healthAssurance.beneficiariesForClaims} />
            </dl>
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className={styles.stat}><dt>{label}</dt><dd>{count.format(value)}</dd></div>;
}
