export const cabinetMinistryStart = "2026-05-18";
export const cabinetArchiveUrl = "https://keralacm.gov.in/post-1781675831/";
export const cabinetDocumentPortalUrl = "https://document.kerala.gov.in/deptdocumentdetails/en/eHcyeDczNDR5WEtGRnlEbDg4NWlNQT09/NVp3VEUrdnFpS0FpWmJPd0l4QVNHQT09";
export const keralamOnTrackOrigin = "https://keralamontrack.webtestingonline.com";
export const cabinetRegisterUrl = `${keralamOnTrackOrigin}/registers/cabinet`;
export const cabinetPublicArchiveUrl = `${keralamOnTrackOrigin}/cabinet-decisions`;
export const keralamCabinetFeedUrl = `${keralamOnTrackOrigin}/api/public/cabinet-decisions`;

export const cabinetCategories = ["Welfare", "Health", "Infrastructure", "Finance", "Education", "Administration", "Other"] as const;
export type CabinetCategory = (typeof cabinetCategories)[number];

export interface CabinetDecision {
  title: string;
  summary: string;
  category: CabinetCategory;
}

export interface CabinetMeeting {
  id: string;
  date: string;
  sourceUrl: string;
  decisions: CabinetDecision[];
}

export interface CabinetArchive {
  schemaVersion: 1;
  ministryStart: string;
  archiveCheckedOn: string;
  meetings: CabinetMeeting[];
}

export type CabinetFeed = CabinetArchive & {
  mode: "keralam-on-track" | "official-snapshot";
  detailsOrigin?: string;
};

const day = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" });

export function formatCabinetDate(value: string) {
  return day.format(new Date(`${value}T00:00:00Z`));
}

export function cabinetDecisionLink(meeting: CabinetMeeting, feed: CabinetFeed, index: number) {
  const origin = feed.detailsOrigin ?? keralamOnTrackOrigin;
  return `${origin}/cabinet-decisions/${encodeURIComponent(meeting.id)}#decision-${index + 1}`;
}
