import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, GraduationCap, Laptop, MapPinned } from "lucide-react";
import { TrendLine } from "@/components/charts";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { TransportMetrics, TransportSection, TransportTable } from "@/components/TransportReport";
import {
  classEnrolment, dropoutByStage, educationDistricts, educationSources, enrolmentByManagement, enrolmentTotals,
  schoolHistory, secondaryDropoutHistory, smartClassrooms,
} from "@/data/educationActuals";
import { DistrictEducationProfile } from "./DistrictEducationProfile";
import styles from "./education.module.css";

export const metadata: Metadata = { title: "Education Command Centre | Stage 1" };

const sources = educationSources;
const format = new Intl.NumberFormat("en-IN");
const number = (value: number) => format.format(value);
const signed = new Intl.NumberFormat("en-IN", { signDisplay: "exceptZero" });
const percent = (value: number) => value.toFixed(1) + "%";
const secondary = dropoutByStage[2];
const enrolmentLoss = enrolmentTotals.previous - enrolmentTotals.current;
const classThree = classEnrolment[2];
const lowestSmart = [...educationDistricts].sort((a, b) => a.smartShare - b.smartShare)[0];
const latestSchoolCount = schoolHistory[schoolHistory.length - 1].value;

const tabs = [
  { href: "#education-attention", label: "What needs attention" },
  { href: "#enrolment", label: "Enrolment" },
  { href: "#districts", label: "Districts" },
  { href: "#retention", label: "Retention" },
  { href: "#facilities", label: "Facilities" },
];

export default function EducationPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroHeader}>
          <span className={styles.heroIcon}><GraduationCap size={26} aria-hidden="true" /></span>
          <div>
            <h1>Education Command Centre</h1>
            <p>Kerala school enrolment, retention and classroom facilities.</p>
          </div>
          <CmSourceDetails label="Education dashboard sources" sources={Object.values(sources)} inverted />
        </div>
        <nav aria-label="Education sections" className={styles.nav}>
          {tabs.map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
        </nav>
      </header>

      <TransportMetrics sourceIcons metrics={[
        { label: "Pupils in Classes I–X", source: { ...sources.enrolment, period: "2024–25 · Kerala census" }, value: number(enrolmentTotals.current), color: "network" },
        { label: "Schools in Kerala", source: { ...sources.schools, period: "2025–26 · UDISE+" }, value: number(latestSchoolCount), color: "service" },
        { label: "Secondary dropout · IX–XII", source: { ...sources.dropout, period: "2025–26 · UDISE+ NEP" }, value: percent(secondary.kerala), color: "water" },
        { label: "Schools with smart classrooms", source: sources.facilities, value: number(smartClassrooms.schools), color: "works" },
      ]} />

      <section aria-labelledby="education-attention-title" id="education-attention" className={styles.watch}>
        <h2 id="education-attention-title">What needs attention</h2>
        <div className={styles.watchGrid}>
          <article className={styles.watchCard} data-tone="blue">
            <header><span><MapPinned size={17} aria-hidden="true" /> Enrolment fell</span><CmSourceDetails label="Enrolment change sources" sources={[sources.enrolment, sources.districts]} /></header>
            <strong>{number(enrolmentLoss)} fewer pupils</strong>
            <p>Kerala’s Classes I–X census fell 2.7% in 2024–25. Class III had the largest year-on-year decline, down {number(classThree.previous - classThree.current)}.</p>
            <a href="#enrolment">Compare classes <ArrowRight size={14} aria-hidden="true" /></a>
          </article>
          <article className={styles.watchCard} data-tone="teal">
            <header><span><BookOpenCheck size={17} aria-hidden="true" /> Secondary retention</span><CmSourceDetails label="Secondary retention source" sources={[sources.dropout]} /></header>
            <strong>{percent(secondary.boys)} boys · {percent(secondary.girls)} girls</strong>
            <p>Dropout in Classes IX–XII was 1.9 percentage points higher among boys in 2025–26. Review the gap alongside the state’s overall decline from 3.5% to 2.9%.</p>
            <a href="#retention">Compare rates <ArrowRight size={14} aria-hidden="true" /></a>
          </article>
          <article className={styles.watchCard} data-tone="violet">
            <header><span><Laptop size={17} aria-hidden="true" /> Smart-classroom access</span><CmSourceDetails label="Smart-classroom gap source" sources={[sources.facilities]} /></header>
            <strong>{percent(lowestSmart.smartShare)} in {lowestSmart.name}</strong>
            <p>{lowestSmart.name} had the lowest reported coverage in 2024–25, 14.2 percentage points below the state figure of 65.7%.</p>
            <a href="#districts">Compare districts <ArrowRight size={14} aria-hidden="true" /></a>
          </article>
        </div>
      </section>

      <div className={styles.profileGrid}>
        <TransportSection id="enrolment" title="Enrolment by class" source={sources.enrolment} sourceIcons>
          <div className={styles.legend} aria-label="Enrolment chart series">
            <span><i data-colour="prior" />2023–24</span><span><i data-colour="current" />2024–25</span>
          </div>
          <div className={styles.scroll} role="region" tabIndex={0} aria-label="Scrollable class enrolment chart">
            <figure className={styles.classChart} aria-label="Classes I–X in Kerala, enrolment by academic year">
              <div className={styles.scale} aria-hidden="true"><span>5 lakh</span><span>2.5 lakh</span><span>0</span></div>
              <ol className={styles.columns}>
                {classEnrolment.map(({ label, previous, current }) => (
                  <li key={label}>
                    <div className={styles.columnPair} data-focus={label === "III" ? "true" : undefined}>
                      <span style={{ height: `${previous / 5000}%` }} title={`Class ${label} · 2023–24 · ${number(previous)} pupils`}>
                        <span className="sr-only">2023–24 {number(previous)}</span>
                      </span>
                      <span style={{ height: `${current / 5000}%` }} title={`Class ${label} · 2024–25 · ${number(current)} pupils`}>
                        <span className="sr-only">2024–25 {number(current)}</span>
                      </span>
                    </div>
                    <span>{label}</span>
                  </li>
                ))}
              </ol>
            </figure>
          </div>
          <p className={styles.note}>Class III had the largest year-on-year decline. Class I and Class VIII recorded increases.</p>
          <details className={styles.tableDisclosure}>
            <summary>View class counts</summary>
            <TransportTable label="Enrolment comparison by class" columns={["Class", "2023–24", "2024–25", "Change"]}
              rows={classEnrolment.map(({ label, previous, current }) => [label, previous, current, signed.format(current - previous)])} />
          </details>
        </TransportSection>
        <TransportSection title="Enrolment by school management" source={sources.enrolment} sourceIcons>
          <ManagementMix />
        </TransportSection>
      </div>

      <TransportSection id="districts" title="District education map" source={sources.districts} sourceIcons>
        <DistrictEducationProfile />
      </TransportSection>

      <div className={styles.twoCols}>
        <TransportSection id="retention" title="Secondary dropout trend" source={sources.dropout} sourceIcons>
          <p className={styles.note}>Classes IX–XII under the NEP classification. Rates are percentages.</p>
          <div className={styles.legend} aria-label="Dropout chart series">
            <span><i data-colour="current" />Kerala</span><span><i data-colour="india" />India</span>
          </div>
          <TrendLine height={225} color="#067767" dataKey="Kerala" k2="India" data={
            secondaryDropoutHistory.map(({ label, value, india }) => ({ label, Kerala: value, India: india }))
          } />
          <TransportTable label="Secondary dropout in Kerala and India" columns={["Academic year", "Kerala", "India"]}
            rows={secondaryDropoutHistory.map(({ label, value, india }) => [label, percent(value), percent(india)])} />
        </TransportSection>
        <TransportSection title="Dropout by stage and gender" source={{ ...sources.dropout, period: "Academic year 2025–26" }} sourceIcons>
          <div className={styles.stageBars}>
            {dropoutByStage.map(({ label, kerala, india }) => (
              <div className={styles.stage} key={label}>
                <h3>{label}</h3>
                {[{ label: "Kerala", value: kerala }, { label: "India", value: india }].map((row) => (
                  <div className={styles.stageBar} data-series={row.label} key={row.label}>
                    <span>{row.label}</span><i aria-hidden="true"><b style={{ width: `${row.value / 8 * 100}%` }} /></i><strong>{percent(row.value)}</strong>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <TransportTable label="Kerala dropout rates by stage and gender" columns={["Kerala", "Boys", "Girls"]}
            rows={dropoutByStage.map(({ label, boys, girls }) => [label, percent(boys), percent(girls)])} />
        </TransportSection>
      </div>

      <div className={styles.twoCols}>
        <TransportSection id="facilities" title="Smart-classroom facilities" source={sources.facilities} sourceIcons>
          <div className={styles.facilities}>
            <div className={styles.gauge} style={{ background: `conic-gradient(#116d8a ${smartClassrooms.coverage}%, #dcecf4 0)` }}>
              <div><strong>{percent(smartClassrooms.coverage)}</strong><span>Coverage</span></div>
            </div>
            <ul className={styles.facilityList}>
              {[
                { label: "Government", value: smartClassrooms.government }, { label: "Aided", value: smartClassrooms.aided },
                { label: "Recognised unaided", value: smartClassrooms.unaided },
              ].map(({ label, value }) => (
                <li key={label}><div><span>{label}</span><strong>{percent(value)}</strong></div><span className={styles.track} aria-hidden="true"><i style={{ width: `${value}%` }} /></span></li>
              ))}
            </ul>
          </div>
          <p className={styles.note}>{number(smartClassrooms.schools)} schools had a smart classroom in the Directorate’s facilities inventory. The rate measures school-level availability.</p>
        </TransportSection>
        <TransportSection title="School inventory · UDISE+" source={sources.schools} sourceIcons>
          <TransportTable label="Three-year count of Kerala schools in UDISE+" columns={["Academic year", "Schools"]}
            rows={schoolHistory.map(({ label, value }) => [label, value])} />
          <p className={styles.note}>The UDISE+ inventory includes all managements. The Directorate’s pupil and facility figures above have their own reporting coverage.</p>
        </TransportSection>
      </div>
    </main>
  );
}

function ManagementMix() {
  let start = 0;
  const gradient = enrolmentByManagement.map(({ current, colour }) => {
    const end = start + current / enrolmentTotals.current * 100;
    const segment = `${colour} ${start}% ${end}%`;
    start = end;
    return segment;
  }).join(", ");

  return (
    <figure className={styles.management} aria-label="Share of pupils by school management in 2024–25">
      <div className={styles.donut} style={{ background: `conic-gradient(${gradient})` }}>
        <div><strong>{number(enrolmentTotals.current)}</strong><span>Pupils · 2024–25</span></div>
      </div>
      <ul>
        {enrolmentByManagement.map(({ label, current, previous, colour }) => (
          <li key={label}>
            <span><i aria-hidden="true" style={{ background: colour }} />{label}</span>
            <strong>{number(current)}</strong>
            <small>{percent(current / enrolmentTotals.current * 100)} of pupils · {signed.format(current - previous)} vs 2023–24</small>
          </li>
        ))}
      </ul>
    </figure>
  );
}
