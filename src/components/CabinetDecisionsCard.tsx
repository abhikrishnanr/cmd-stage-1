"use client";

import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Landmark } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import type { DataProvenance } from "@/components/DataProvenance";
import { cabinetArchiveCheckedOn, cabinetOfficialMeetings } from "@/data/cabinetOfficialArchive";
import {
  cabinetArchiveUrl, cabinetDecisionLink, cabinetMinistryStart, cabinetPublicArchiveUrl,
  cabinetRegisterUrl, formatCabinetDate, keralamCabinetFeedUrl, type CabinetFeed,
} from "@/data/cabinetFeed";
import styles from "./CabinetDecisionsCard.module.css";

const month = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "UTC" });
const chartMonth = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
const shortDay = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });

const initialFeed: CabinetFeed = {
  mode: "official-snapshot",
  schemaVersion: 1,
  ministryStart: cabinetMinistryStart,
  archiveCheckedOn: cabinetArchiveCheckedOn,
  meetings: [...cabinetOfficialMeetings].sort((a, b) => b.date.localeCompare(a.date)),
};

const summonsSource: DataProvenance = {
  source: "Keralam Legislature Secretariat",
  dataset: "Gazette No. 3043 · Summons for the Assembly’s third session",
  period: "13 Nov 2026",
  url: "https://www.niyamasabha.org/codes/16kla/session_3/summoning.pdf",
  sourceUpdatedAt: "13 Nov 2026",
};

type Milestone = { date: string; label: string; source?: DataProvenance; scheduled?: boolean };
type DecisionStatus = {
  label: string;
  tone: "announced" | "approved" | "notified";
  event: string;
  milestones?: Milestone[];
};

const publishedStatus: Record<string, Record<string, DecisionStatus>> = {
  "2026-11-25": {
    "Legislative agenda announced": {
      label: "Agenda announced",
      tone: "announced",
      event: "Chief Minister outlined bills",
      milestones: [
        { date: "2026-11-30", label: "Assembly opening scheduled", source: summonsSource, scheduled: true },
      ],
    },
  },
  "2026-11-11": {
    "Kasaragod–Wayanad power line package": {
      label: "Package approved",
      tone: "approved",
      event: "Cabinet approved the package",
    },
    "Assembly session recommended": {
      label: "Assembly summoned",
      tone: "notified",
      event: "Cabinet recommended the session",
      milestones: [
        { date: "2026-11-13", label: "Gazette summons issued", source: summonsSource },
        { date: "2026-11-30", label: "Assembly opening scheduled", scheduled: true },
      ],
    },
  },
};

function monthCounts(feed: CabinetFeed) {
  const end = feed.meetings[0]?.date.slice(0, 7);
  if (!end) return [];

  const counts = new Map<string, number>();
  for (const meeting of feed.meetings) {
    const key = meeting.date.slice(0, 7);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const current = new Date(`${feed.ministryStart.slice(0, 7)}-01T00:00:00Z`);
  const months: { key: string; label: string; fullLabel: string; count: number }[] = [];
  while (current.toISOString().slice(0, 7) <= end) {
    const key = current.toISOString().slice(0, 7);
    months.push({ key, label: month.format(current), fullLabel: chartMonth.format(current), count: counts.get(key) ?? 0 });
    current.setUTCMonth(current.getUTCMonth() + 1);
  }
  return months.slice(-12);
}

export function CabinetDecisionsCard() {
  const [feed, setFeed] = useState<CabinetFeed>(initialFeed);
  const [selectedKey, setSelectedKey] = useState<string>();
  const titleId = useId();
  const detailId = useId();

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/cabinet-decisions", { signal: controller.signal })
      .then(async (response) => {
        if (response.ok) setFeed(await response.json() as CabinetFeed);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const latest = feed.meetings[0];
  const months = monthCounts(feed);
  const maxCount = Math.max(1, ...months.map((entry) => entry.count));
  const recent = feed.meetings.flatMap((meeting) => meeting.decisions.map((decision, index) => ({
    meeting,
    decision,
    index,
    key: `${meeting.id}:${decision.title}`,
    status: publishedStatus[meeting.date]?.[decision.title],
  }))).slice(0, 3);
  const selected = recent.find((item) => item.key === selectedKey) ?? recent[0];
  const viaKeralam = feed.mode === "keralam-on-track";
  const verifiedOn = formatCabinetDate(feed.archiveCheckedOn);
  const sourcePeriod = latest ? `${formatCabinetDate(feed.ministryStart)} to ${formatCabinetDate(latest.date)}` : undefined;
  const timeline: Milestone[] = selected ? [
    { date: selected.meeting.date, label: selected.status?.event ?? "Published in Cabinet briefing" },
    ...(selected.status?.milestones ?? []),
  ] : [];
  const followUpSources = timeline.flatMap((event) => event.source ? [event.source] : []);
  const archiveSources: DataProvenance[] = [
    {
      source: "Chief Minister’s Office, Government of Kerala",
      dataset: "Cabinet briefing archive",
      url: cabinetArchiveUrl,
      period: sourcePeriod,
      fetchedAt: verifiedOn,
      basis: "Count of published briefings since the ministry began",
    },
    {
      source: "Keralam on Track",
      dataset: "English briefing summaries",
      url: viaKeralam ? keralamCabinetFeedUrl : cabinetPublicArchiveUrl,
      period: sourcePeriod,
      fetchedAt: verifiedOn,
    },
  ];

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <header className={styles.banner}>
        <span className={styles.icon}><Landmark size={21} aria-hidden="true" /></span>
        <div>
          <h2 id={titleId}>Cabinet Decisions</h2>
          <p>V. D. Satheesan Ministry · Since <time dateTime={feed.ministryStart}>{formatCabinetDate(feed.ministryStart)}</time></p>
        </div>
        <CmSourceDetails sources={archiveSources} label="Cabinet sources" inverted />
      </header>

      <div className={styles.body}>
        <figure className={styles.figure} aria-label="Cabinet briefing totals and monthly counts">
          <div className={styles.figureTop}>
            <div>
              <strong className={styles.total}>{feed.meetings.length}</strong>
              <span className={styles.caption}>Published briefings</span>
            </div>
            {latest && (
              <div className={styles.latest}>
                <time dateTime={latest.date}>{formatCabinetDate(latest.date)}</time>
                <span>Latest briefing</span>
              </div>
            )}
          </div>
          <ul className={styles.chart} aria-label="Count of published Cabinet briefings per month">
            {months.map((entry) => (
              <li key={entry.key} className={styles.column} title={`${entry.fullLabel} · ${entry.count} briefings`}>
                <span className={styles.columnValue} aria-hidden="true">{entry.count}</span>
                <span className={styles.bar} aria-hidden="true"><span style={{ height: `${entry.count * 100 / maxCount}%` }} /></span>
                <span className={styles.columnLabel} aria-hidden="true">{entry.label}</span>
                <span className="sr-only">{entry.fullLabel}, {entry.count} briefings</span>
              </li>
            ))}
          </ul>
        </figure>

        {selected && (
          <div className={styles.statusPanel}>
            <h3>Recent decision status</h3>
            <div className={styles.choices} role="group" aria-label="Recent Cabinet decisions">
              {recent.map((item) => (
                <button
                  key={item.key}
                  className={styles.choice}
                  type="button"
                  aria-pressed={item === selected}
                  aria-controls={detailId}
                  onClick={() => setSelectedKey(item.key)}
                >
                  <span className={styles.status} data-tone={item.status?.tone ?? "announced"}>{item.status?.label ?? "Briefing published"}</span>
                  <span className={styles.choiceTitle}>{item.decision.title}</span>
                </button>
              ))}
            </div>
            <div className={styles.detail} id={detailId}>
              <p aria-live="polite">{selected.decision.summary}</p>
              <div className={styles.evidence}>
                <a href={cabinetDecisionLink(selected.meeting, feed, selected.index)} aria-label={`Decision details for ${selected.decision.title} on Keralam on Track`}>
                  Decision details <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <CmSourceDetails
                  label="Decision sources"
                  sources={[
                    {
                      source: "Chief Minister’s Office, Government of Kerala",
                      dataset: selected.decision.title,
                      url: selected.meeting.sourceUrl,
                      period: formatCabinetDate(selected.meeting.date),
                    },
                    ...followUpSources,
                  ]}
                />
              </div>
              <ol className={styles.milestones} aria-label="Published decision milestones">
                {timeline.map((event) => (
                  <li key={event.date} data-scheduled={event.scheduled || undefined}>
                    <time dateTime={event.date}>{shortDay.format(new Date(`${event.date}T00:00:00Z`))}</time>
                    <span>{event.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
      <footer className={styles.footer}>
        <p>Archive checked <time dateTime={feed.archiveCheckedOn}>{verifiedOn}</time> · Status from published records</p>
        <a href={cabinetRegisterUrl} title="Sign in to Keralam on Track to access the Chief Secretary’s register">
          Chief Secretary’s Cabinet register <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </section>
  );
}
