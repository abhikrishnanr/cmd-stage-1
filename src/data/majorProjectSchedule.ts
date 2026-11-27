import type { TransportSource } from "@/data/transportActuals";

export type MajorProjectSchedule = {
  baseline: string;
  revised: string;
  delayMonths: number;
  source: TransportSource;
};

const report = "https://paimana-proj.mospi.gov.in/ProjectMonitoring/ViewPdf?id=140&path=Content%5CArchiveReport%5CPerformanceMonitoringReport%5C2026-27%2FFlashReport_October_2026.pdf";
const monthLabel = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
type ReportMonth = readonly [year: number, month: number];

function fromPaimana(code: number, page: number, original: ReportMonth, revision: ReportMonth): MajorProjectSchedule {
  const [originalYear, originalMonth] = original;
  const [revisedYear, revisedMonth] = revision;

  return {
    baseline: monthLabel.format(Date.UTC(originalYear, originalMonth - 1)),
    revised: monthLabel.format(Date.UTC(revisedYear, revisedMonth - 1)),
    delayMonths: (revisedYear - originalYear) * 12 + revisedMonth - originalMonth,
    source: {
      source: "Ministry of Statistics and Programme Implementation · MoSPI",
      dataset: `PAIMANA Flash Report · Table 6, project ${code}`,
      url: `${report}#page=${page}`,
      period: "October 2026",
      sourceUpdatedAt: "25 Nov 2026 (report release)",
      fetchedAt: "27 Nov 2026",
      basis: "Calendar-month difference between the original target and revised completion months reported by the implementing agency.",
    },
  };
}

export const majorProjectSchedules: Readonly<Partial<Record<string, MajorProjectSchedule>>> = {
  "nh66-kadambattukonam-kazhakkoottam": fromPaimana(619208, 119, [2025, 1], [2027, 3]),
  "nh66-kottankulangara-kollam-bypass": fromPaimana(618607, 119, [2024, 10], [2027, 12]),
  "nh66-aroor-thuravoor": fromPaimana(618604, 119, [2026, 1], [2026, 12]),
  "kochi-metro-phase-2-corridor": fromPaimana(702664, 69, [2026, 11], [2027, 8]),
  "azhiyur-vengalam": fromPaimana(618597, 118, [2024, 7], [2028, 3]),
  "taliparamba-muzhappilangad": fromPaimana(618596, 118, [2024, 5], [2028, 4]),
  "chengala-neeleshwaram": fromPaimana(618595, 118, [2024, 4], [2027, 3]),
};
