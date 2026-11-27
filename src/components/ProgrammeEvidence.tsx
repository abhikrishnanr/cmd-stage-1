import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProvenanceTooltip } from "@/components/DataProvenance";
import { Icon } from "@/components/primitives";
import { TransportHeader, TransportMetrics, TransportSection } from "@/components/TransportReport";
import type { ProgrammeRecord } from "@/data/programmeEvidence";
import { transportSourcesCheckedOn, type TransportSource } from "@/data/transportActuals";
import styles from "./ProgrammeEvidence.module.css";

type ProgrammePageConfig = {
  title: string;
  description: string;
  icon: string;
  base: string;
  imageDirectory: string;
  imageExtension: string;
};

export const indiraProgrammePage: ProgrammePageConfig = {
  title: "Indira Guarantees",
  description: "Six commitments, with government decisions and published results for each programme where available.",
  icon: "HandHeart",
  base: "/indira",
  imageDirectory: "/img/heroes",
  imageExtension: "jpg",
};

export const dreamProgrammePage: ProgrammePageConfig = {
  title: "Dream Projects",
  description: "Project proposals, consultation records and published milestones for Kerala’s maritime, industry and aviation initiatives.",
  icon: "Mountain",
  base: "/dream-projects",
  imageDirectory: "/img/projects",
  imageExtension: "png",
};

function uniqueSources(sources: TransportSource[]) {
  return Array.from(new Map(sources.map((source) => [source.dataset + source.period, source])).values());
}

export function ProgrammeIndex({ config, programs, featuredSource }: {
  config: ProgrammePageConfig;
  programs: ProgrammeRecord[];
  featuredSource: TransportSource;
}) {
  const sources = uniqueSources([featuredSource, ...programs.map((program) => program.source)]);

  return (
    <div className={styles.page}>
      <TransportHeader title={config.title} description={config.description} icon={config.icon} sources={sources} links={[{ label: "Browse programmes", href: "#programmes" }]} />
      <section id="programmes" className={styles.cards} aria-label={config.title}>
        {programs.map((program) => (
          <article key={program.slug} className={styles.card}>
            <div className={styles.art} style={{ backgroundImage: "linear-gradient(145deg, #122c4766, #0b142a20), url(" + config.imageDirectory + "/" + program.slug + "." + config.imageExtension + ")" }}>
              <span className={styles.emblem}><Icon name={program.icon} size={22} /></span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.statusLine}>
                <span className={styles.status} data-status={program.status}>{program.status}</span>
                <ProvenanceTooltip provenance={{ ...program.source, note: "Source checked " + transportSourcesCheckedOn }} />
              </div>
              <h2>{program.title}</h2>
              <p>{program.summary}</p>
              <div className={styles.cardLinks}>
                <Link aria-label={"View details for " + program.title} href={config.base + "/" + program.slug}>View details <ArrowRight size={15} aria-hidden="true" /></Link>
                <a aria-label={"Original source for " + program.title} href={program.source.url} target="_blank" rel="noreferrer">Source <ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export function ProgrammeDetail({ config, program }: { config: ProgrammePageConfig; program: ProgrammeRecord }) {
  const sources = uniqueSources([program.source, ...program.records.map((record) => record.source)]);

  return (
    <div className={styles.page}>
      <TransportHeader title={program.title} description={program.summary} icon={program.icon} sources={sources} links={[
        { label: "All " + config.title.toLowerCase(), href: config.base },
        { label: "Programme status", href: "#programme-status" },
      ]} />
      <TransportSection id="programme-status" title="Programme status" source={program.source}>
        <div className={styles.statusLine}>
          <span className={styles.status} data-status={program.status}>{program.status}</span>
          <span className={styles.recordDate}>{program.source.sourceUpdatedAt ?? program.source.period}</span>
        </div>
      </TransportSection>
      {program.records.map((record) => (
        <TransportSection key={record.title} title={record.title} source={record.source}>
          <p className={styles.detail}>{record.detail}</p>
          {record.metrics?.length ? <TransportMetrics metrics={record.metrics.map((metric) => ({ ...metric, source: record.source }))} /> : null}
        </TransportSection>
      ))}
    </div>
  );
}
