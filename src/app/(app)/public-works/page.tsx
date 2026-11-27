import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HardHat, Route, TrafficCone } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { PublicWorksDistricts } from "@/components/PublicWorksDistricts";
import {
  formatTransportNumber as number, TransportBars, TransportHeader, TransportMetrics, TransportSection, TransportTable,
} from "@/components/TransportReport";
import { kunnathurStation, pwdProgramme, pwdProgrammeCompletions, pwdProgrammeSource, thrissurTrafficNotice } from "@/data/publicWorksActuals";
import {
  completedPwdBridges, highwayOpenings, pwdBridges, pwdBridgeTotal, pwdRoadDistricts, pwdRoadTotals,
  rebuildCompletions, transportSources as sources,
} from "@/data/transportActuals";
import styles from "./public-works.module.css";

export const metadata: Metadata = { title: "Public Works | Stage 1" };

const districtRoads = [...pwdRoadDistricts].sort((a, b) => b.totalKm - a.totalKm);
const surfaceShare = pwdRoadTotals.bmbcKm / pwdRoadTotals.totalKm * 100;
const completionShare = pwdProgramme.completed / pwdProgramme.listed * 100;
const bridgeStops = pwdBridges.map((row, index) => {
  const start = pwdBridges.slice(0, index).reduce((sum, item) => sum + item.value, 0);
  return `${row.color} ${start / pwdBridgeTotal * 100}% ${(start + row.value) / pwdBridgeTotal * 100}%`;
});

const attention = [
  {
    label: "Kunnathur Mini Civil Station",
    value: `${kunnathurStation.physicalPct}% physical progress`,
    note: "The only PWD project still listed in progress in the 100 Days Programme snapshot. Check the remaining finishing and services works.",
    href: "#project-follow-up",
    action: "Review project status",
    icon: Building2,
    source: [pwdProgrammeSource, kunnathurStation.source],
  },
  {
    label: "Thrissur culvert works",
    value: "Closure announced from 23 Nov",
    note: "The notice covers km 1/00 on the Thriprayar–Kanjani–Chavakkad road. Confirm the reopening date with the Roads Section.",
    href: "#traffic-notice",
    action: "See the corridor notice",
    icon: TrafficCone,
    source: [thrissurTrafficNotice],
  },
  {
    label: "PWD road surfacing",
    value: `${surfaceShare.toFixed(1)}% at BMBC standard`,
    note: "Use this statewide surfacing inventory to review upgrade priorities alongside district condition surveys.",
    href: "#road-surface",
    action: "Compare the road figures",
    icon: Route,
    source: [sources.pwdSurface, sources.pwdDistricts],
  },
];

export default function PublicWorksPage() {
  return (
    <div className={styles.page}>
      <TransportHeader
        title="PWD Works Monitor"
        description="Public Works road and bridge inventories, completion records and traffic notices for Kerala."
        publicWorks
        sourceIcons
        sources={[pwdProgrammeSource, kunnathurStation.source, thrissurTrafficNotice, sources.pwdDistricts, sources.pwdSurface, sources.pwdBridges, sources.pwdCompletions, sources.rebuild, sources.openings]}
        links={[
          { label: "Needs attention", href: "#pwd-attention" }, { label: "District roads", href: "#pwd-roads" },
          { label: "Bridges", href: "#pwd-bridges" }, { label: "Project follow-up", href: "#project-follow-up" },
          { label: "Completions", href: "#completed-works" }, { label: "Transportation", href: "/sectors/transportation" },
        ]}
      />

      <TransportMetrics sourceIcons metrics={[
        { label: "PWD Roads Wing network", value: `${number(pwdRoadTotals.totalKm)} km`, source: sources.pwdDistricts, color: "works" },
        { label: "PWD roads of BMBC standard", value: `${number(pwdRoadTotals.bmbcKm)} km`, source: sources.pwdSurface, color: "network" },
        { label: "Bridges in PWD inventory", value: number(pwdBridgeTotal), source: sources.pwdBridges, color: "water" },
        { label: "PWD programme projects complete", value: `${pwdProgramme.completed} of ${pwdProgramme.listed}`, source: pwdProgrammeSource, color: "service" },
      ]} />

      <section id="pwd-attention" className={styles.attention} aria-labelledby="pwd-attention-heading">
        <h2 id="pwd-attention-heading"><HardHat size={18} aria-hidden="true" /> What needs attention</h2>
        <div className={styles.attentionGrid}>
          {attention.map(({ label, value, note, href, action, icon: Icon, source }) => (
            <article key={label}>
              <div className={styles.attentionHeader}>
                <span><Icon size={17} aria-hidden="true" />{label}</span>
                <CmSourceDetails label={`${label} sources`} sources={source} />
              </div>
              <strong>{value}</strong>
              <p>{note}</p>
              <Link href={href}>{action}<ArrowRight size={14} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <TransportSection id="project-follow-up" title="PWD programme progress" source={pwdProgrammeSource} sourceIcons>
        <div className={styles.twoColumns}>
          <figure className={styles.progressPanel} aria-label="Reported PWD projects in the 100 Days Programme">
            <figcaption>100 Days Programme · Public Works Department</figcaption>
            <strong>{pwdProgramme.completed} of {pwdProgramme.listed} projects complete</strong>
            <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${completionShare}%` }} /></div>
            <p>{pwdProgramme.inProgress} project in progress · checked 27 Nov 2026</p>
          </figure>
          <article className={styles.project}>
            <div className={styles.attentionHeader}>
              <h3>{kunnathurStation.name} · {kunnathurStation.district}</h3>
              <CmSourceDetails label="Mini Civil Station project source" sources={[kunnathurStation.source]} />
            </div>
            <div className={styles.meterGroup}>
              {[
                { label: "Physical progress", value: kunnathurStation.physicalPct, color: "#a24714" },
                { label: "Financial progress", value: kunnathurStation.financialPct, color: "#2563a8" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <span>{label}<strong>{value}%</strong></span>
                  <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${value}%`, backgroundColor: color }} /></div>
                </div>
              ))}
            </div>
            <p>Exterior plastering, tiling, electrical and plumbing works were reported in progress.</p>
          </article>
        </div>
        <div className={styles.completedList}>
          <h3>Selected recorded completions</h3>
          {pwdProgrammeCompletions.map((item) => (
            <article key={item.name}>
              <span><strong>{item.name}</strong><small>{item.district} · {item.source.period}</small></span>
              <CmSourceDetails label={`${item.name} source`} sources={[item.source]} />
            </article>
          ))}
        </div>
      </TransportSection>

      <TransportSection id="pwd-roads" title="PWD road network by district" source={sources.pwdDistricts} sourceIcons>
        <PublicWorksDistricts />
        <details className={styles.detail}>
          <summary>View all 14 district road lengths</summary>
          <TransportTable
            label="PWD road network by district, in kilometres"
            columns={["District", "State Highways (km)", "Major District Roads (km)", "Total (km)"]}
            rows={districtRoads.map((row) => [row.district, row.highwayKm, row.districtRoadKm, row.totalKm])}
          />
        </details>
      </TransportSection>

      <div className={styles.twoColumns}>
        <TransportSection id="road-surface" title="Road surfacing and network mix" source={sources.pwdSurface} sourceIcons>
          <figure className={styles.progressPanel} aria-label="PWD roads maintained to BMBC standard">
            <figcaption>Bituminous Macadam and Bituminous Concrete (BMBC)</figcaption>
            <strong>{number(pwdRoadTotals.bmbcKm)} km at BMBC standard</strong>
            <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${surfaceShare}%` }} /></div>
            <p>{surfaceShare.toFixed(1)}% of the {number(pwdRoadTotals.totalKm)} km PWD Roads Wing network.</p>
          </figure>
          <div className={styles.attentionHeader}>
            <h3>Inventory by road class</h3>
            <CmSourceDetails label="Road inventory source" sources={[sources.pwdDistricts]} />
          </div>
          <TransportBars unit="km" items={[
            { label: "State Highways", value: pwdRoadTotals.highwayKm, color: "#a24714" },
            { label: "Major District Roads", value: pwdRoadTotals.districtRoadKm, color: "#146676" },
          ]} />
        </TransportSection>
        <TransportSection id="pwd-bridges" title="Bridges by road category" source={sources.pwdBridges} sourceIcons>
          <figure className={styles.bridgeMix} aria-label="PWD bridge inventory by road category">
            <div className={styles.donut} style={{ background: `conic-gradient(${bridgeStops.join(", ")})` }}>
              <span><strong>{number(pwdBridgeTotal)}</strong><small>bridges</small></span>
            </div>
            <ul className={styles.bridgeLegend}>
              {pwdBridges.map((row) => (
                <li key={row.label}><i aria-hidden="true" style={{ backgroundColor: row.color }} /><span>{row.label}</span><strong>{number(row.value)}</strong></li>
              ))}
            </ul>
          </figure>
          <div className={styles.project}>
            <div className={styles.attentionHeader}>
              <p><strong>{completedPwdBridges} bridges</strong> were completed in FY 2024–25.</p>
              <CmSourceDetails label="PWD bridge completions source" sources={[sources.pwdCompletions]} />
            </div>
          </div>
        </TransportSection>
      </div>

      <div className={styles.twoColumns}>
        <TransportSection id="completed-works" title="Rebuild Kerala Initiative completions" source={sources.rebuild} sourceIcons>
          <TransportBars items={[
            { label: "KSTP / PWD works", value: rebuildCompletions.kstpPwdWorks, color: "#a24714" },
            { label: "Local-government road works", value: rebuildCompletions.localRoadWorks, color: "#146676" },
            { label: "Village offices", value: rebuildCompletions.villageOffices, color: "#2563a8" },
            { label: "Other Revenue Department buildings", value: rebuildCompletions.otherRevenueBuildings, color: "#7b51a1" },
          ]} />
        </TransportSection>
        <TransportSection id="highway-openings" title="National and rural road openings" source={sources.openings} sourceIcons>
          <TransportTable
            label="Road works inaugurated on 11 March 2026"
            columns={["Road or programme", "Work recorded"]}
            rows={highwayOpenings.map((row) => [row.name, row.work])}
          />
        </TransportSection>
      </div>

      <TransportSection id="traffic-notice" title="Thriprayar–Kanjani–Chavakkad road notice" source={thrissurTrafficNotice} sourceIcons>
        <p className={styles.notice}>The Valapad Roads Section announced a full traffic restriction at km 1/00 near Devasthanam temple from 23 November 2026 for culvert construction. The notice says the restriction lasts until the work is finished and the road reopens.</p>
      </TransportSection>
    </div>
  );
}
