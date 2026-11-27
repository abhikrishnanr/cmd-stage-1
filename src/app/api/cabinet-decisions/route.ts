import { NextResponse } from "next/server";
import { cabinetArchiveCheckedOn, cabinetOfficialMeetings } from "@/data/cabinetOfficialArchive";
import {
  cabinetCategories, cabinetMinistryStart, keralamCabinetFeedUrl, keralamOnTrackOrigin,
  type CabinetArchive, type CabinetDecision, type CabinetFeed, type CabinetMeeting,
} from "@/data/cabinetFeed";

const MAX_FEED_BYTES = 512 * 1024;
const snapshot: CabinetArchive = {
  schemaVersion: 1,
  ministryStart: cabinetMinistryStart,
  archiveCheckedOn: cabinetArchiveCheckedOn,
  meetings: [...cabinetOfficialMeetings].sort((a, b) => b.date.localeCompare(a.date)),
};

function objectRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

function isDay(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function boundedText(value: unknown, length: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= length;
}

function officialSource(value: unknown): value is string {
  if (!boundedText(value, 500)) return false;
  try {
    const url = new URL(value);
    return url.origin === "https://keralacm.gov.in" && !url.username && !url.password &&
      url.pathname.startsWith("/storage/") && url.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

function normalizeDecision(value: unknown): CabinetDecision | null {
  const decision = objectRecord(value);
  if (!decision || !boundedText(decision.title, 200) || !boundedText(decision.summary, 1500)) return null;
  const category = cabinetCategories.find((item) => item === decision.category);
  return category ? { title: decision.title, summary: decision.summary, category } : null;
}

function normalizeMeeting(value: unknown): CabinetMeeting | null {
  const row = objectRecord(value);
  if (!row || !boundedText(row.id, 80) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.id) ||
      !isDay(row.date) || row.date < cabinetMinistryStart || !officialSource(row.sourceUrl) ||
      !Array.isArray(row.decisions) || row.decisions.length > 40) return null;
  const decisions = row.decisions.map(normalizeDecision);
  if (decisions.some((decision) => decision === null)) return null;
  return { id: row.id, date: row.date, sourceUrl: row.sourceUrl, decisions: decisions.filter((item) => item !== null) };
}

function archiveFrom(value: unknown): CabinetArchive | null {
  const data = objectRecord(value);
  const today = new Intl.DateTimeFormat("en-CA", {timeZone: "Asia/Kolkata"}).format(new Date());
  if (!data || data.schemaVersion !== 1 || data.ministryStart !== cabinetMinistryStart ||
      !isDay(data.archiveCheckedOn) || data.archiveCheckedOn < snapshot.archiveCheckedOn || data.archiveCheckedOn > today ||
      !Array.isArray(data.meetings) || data.meetings.length < snapshot.meetings.length ||
      data.meetings.length > 500) return null;

  const meetings: CabinetMeeting[] = [];
  const ids = new Set<string>();
  for (const input of data.meetings) {
    const row = normalizeMeeting(input);
    if (!row || row.date > data.archiveCheckedOn || ids.has(row.id)) return null;
    meetings.push(row);
    ids.add(row.id);
  }
  const sources = new Set(meetings.map((row) => row.sourceUrl));
  if (sources.size !== meetings.length || snapshot.meetings.some((row) => !sources.has(row.sourceUrl))) return null;
  return {
    schemaVersion: 1, ministryStart: cabinetMinistryStart, archiveCheckedOn: data.archiveCheckedOn,
    meetings: meetings.sort((a, b) => b.date.localeCompare(a.date)),
  };
}

function upstreamEndpoint() {
  const demoOrigin = process.env.KERALAM_CABINET_DEMO_ORIGIN;
  if (process.env.VERCEL !== "1" && demoOrigin && /^http:\/\/(localhost|127\.0\.0\.1):\d{1,5}$/.test(demoOrigin)) {
    return { url: `${demoOrigin}/api/public/cabinet-decisions`, origin: demoOrigin };
  }
  return { url: keralamCabinetFeedUrl, origin: keralamOnTrackOrigin };
}

export async function GET() {
  let feed: CabinetFeed = { ...snapshot, mode: "official-snapshot" };
  const endpoint = upstreamEndpoint();
  try {
    const response = await fetch(endpoint.url, {
      headers: { accept: "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(4_000),
      next: { revalidate: 300 },
    });
    if (response.ok && response.headers.get("content-type")?.includes("application/json") &&
        Number(response.headers.get("content-length") ?? 0) <= MAX_FEED_BYTES) {
      const raw = await response.text();
      if (Buffer.byteLength(raw) <= MAX_FEED_BYTES) {
        const upstream = archiveFrom(JSON.parse(raw));
        if (upstream) feed = { ...upstream, mode: "keralam-on-track", detailsOrigin: endpoint.origin };
      }
    }
  } catch {
    // The verified official archive remains available if the cross-portal feed is unavailable.
  }
  return NextResponse.json(feed, {
    headers: { "Cache-Control": feed.mode === "keralam-on-track" ? "public, s-maxage=300" : "public, s-maxage=60" },
  });
}
