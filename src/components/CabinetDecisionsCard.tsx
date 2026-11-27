"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Files, Landmark } from "lucide-react";
import { cabinetArchiveCheckedOn, cabinetOfficialMeetings } from "@/data/cabinetOfficialArchive";
import {
  cabinetArchiveUrl, cabinetDocumentPortalUrl, cabinetMeetingLink, cabinetMinistryStart, cabinetRegisterUrl,
  formatCabinetDate, type CabinetFeed,
} from "@/data/cabinetFeed";
import styles from "./CabinetDecisionsCard.module.css";

const month = new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric", timeZone: "UTC" });
const initialFeed: CabinetFeed = {
  mode: "official-snapshot",
  schemaVersion: 1,
  ministryStart: cabinetMinistryStart,
  archiveCheckedOn: cabinetArchiveCheckedOn,
  meetings: [...cabinetOfficialMeetings].sort((a, b) => b.date.localeCompare(a.date)),
};

function monthCounts(feed: CabinetFeed) {
  const counts = new Map<string, number>();
  for (const meeting of feed.meetings) {
    const key = meeting.date.slice(0, 7);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const current = new Date(`${feed.ministryStart.slice(0, 7)}-01T00:00:00Z`);
  const end = feed.meetings[0]?.date.slice(0, 7);
  const months: { key: string; label: string; count: number }[] = [];
  if (!end) return months;

  while (current.toISOString().slice(0, 7) <= end) {
    const key = current.toISOString().slice(0, 7);
    months.push({ key, label: month.format(current), count: counts.get(key) ?? 0 });
    current.setUTCMonth(current.getUTCMonth() + 1);
  }
  return months;
}

export function CabinetDecisionsCard() {
  const [feed, setFeed] = useState<CabinetFeed>(initialFeed);

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
  const opening = feed.meetings.find((meeting) => meeting.date === feed.ministryStart && meeting.decisions.length > 0);
  const latestHighlights = feed.meetings.filter((meeting) => meeting !== opening && meeting.decisions.length > 0).slice(0, 2);
  const highlights = opening ? [...latestHighlights, opening] : latestHighlights;
  const viaKeralam = feed.mode === "keralam-on-track";
  const detailUrl = latest && viaKeralam ? cabinetMeetingLink(latest, feed) : cabinetRegisterUrl;

  return (
    <section className={styles.card} aria-labelledby="cm-cabinet-title">
      <header className={styles.banner}>
        <div className={styles.bannerCopy}>
          <p className={styles.kicker}><Landmark size={15} aria-hidden="true" /> V. D. Satheesan Ministry</p>
          <h2 id="cm-cabinet-title"><a href={detailUrl}>Cabinet Decisions</a></h2>
          <p className={styles.period}>
            Published briefings from <time dateTime={feed.ministryStart}>{formatCabinetDate(feed.ministryStart)}</time>
            {latest && <> to <time dateTime={latest.date}>{formatCabinetDate(latest.date)}</time></>}
          </p>
          <div className={styles.actions}>
            {viaKeralam && latest && <a className={styles.primaryLink} href={detailUrl}>Open latest briefing <ArrowUpRight size={15} aria-hidden="true" /></a>}
            <a className={viaKeralam ? styles.secondaryLink : styles.primaryLink} href={cabinetRegisterUrl}>View all on Keralam on Track <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <div className={styles.countPanel}>
          <Files size={20} aria-hidden="true" />
          <strong>{feed.meetings.length}</strong>
          <span>Published briefings<br />since the ministry began</span>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.timeline}>
          <h3>Briefings by month</h3>
          <ul aria-label="Published briefings per month">
            {months.map((entry) => (
              <li key={entry.key}>
                <time dateTime={entry.key}>{entry.label}</time>
                <span className={styles.track} aria-hidden="true"><span style={{ width: `${100 * entry.count / maxCount}%` }} /></span>
                <strong>{entry.count}</strong>
              </li>
            ))}
          </ul>
          <p>Counted from the official archive.</p>
        </div>

        <div className={styles.highlights}>
          <h3>Briefing highlights</h3>
          <p>Selected English summaries of published briefings.</p>
          <div className={styles.meetings}>
            {highlights.map((meeting) => (
              <article className={styles.meeting} key={meeting.id}>
                <div className={styles.meetingMeta}>
                  <span><CalendarDays size={14} aria-hidden="true" /> <time dateTime={meeting.date}>{formatCabinetDate(meeting.date)}</time>{meeting === opening && " · First briefing"}</span>
                  <a href={cabinetMeetingLink(meeting, feed)}>
                    {viaKeralam ? "Briefing details" : "Official PDF"} <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
                <ul>
                  {meeting.decisions.slice(0, 2).map((decision) => (
                    <li key={decision.title}><strong>{decision.title}</strong><span>{decision.summary}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>

      <details className={styles.orders}>
        <summary>Related Revenue Department orders</summary>
        <ul>
          <li><a href={cabinetDocumentPortalUrl}>G.O. (M/S) 198/2026/RD</a> · 25 Jun 2026 · Extended 21 posts in the Nemom railway doubling project’s land acquisition unit for one year. The order cites the 24 June Cabinet meeting.</li>
          <li><a href="https://document.kerala.gov.in/documents/governmentorders/eofficeorder_85_2806202602%3A01%3A31.pdf">G.O. (M/S) 195/2026/RD</a> · 25 Jun 2026 · Sanctioned ₹5 lakh for each of two bereaved families and full treatment costs for three injured Kudumbashree workers after the Bengaluru wall collapse. The order cites the 24 June Cabinet meeting.</li>
        </ul>
      </details>

      <footer className={styles.sources}>
        <span>{viaKeralam ? "Keralam on Track feed" : "Verified official archive snapshot"} · Checked <time dateTime={feed.archiveCheckedOn}>{formatCabinetDate(feed.archiveCheckedOn)}</time></span>
        <a href={cabinetArchiveUrl}>CM’s official archive <ArrowUpRight size={12} aria-hidden="true" /></a>
        <a href={cabinetDocumentPortalUrl}>Revenue Department orders <ArrowUpRight size={12} aria-hidden="true" /></a>
        <a href="https://eoffice.kerala.gov.in/EofficePortal/godetails">Official GO lookup <ArrowUpRight size={12} aria-hidden="true" /></a>
      </footer>
    </section>
  );
}
