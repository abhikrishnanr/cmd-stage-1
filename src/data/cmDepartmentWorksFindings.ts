import { getDepartmentChart, type CmDepartmentFinding } from "@/data/cmDepartmentFinding";
import { forestWildlifeDashboard } from "@/data/departmentDashboards/forestWildlife";
import { municipalDashboard } from "@/data/departmentDashboards/municipal";
import { airStations, environmentSources } from "@/data/environmentActuals";
import { powerDaily, powerReservoirHistory, powerStorageSource } from "@/data/power";
import { kunnathurStation, pwdProgramme, pwdProgrammeSource } from "@/data/publicWorksActuals";
import { kochiMetro, transportSources } from "@/data/transportActuals";

const conflict = getDepartmentChart(forestWildlifeDashboard, "fatal-wildlife-conflict");
const fund = getDepartmentChart(municipalDashboard, "local-development-fund");
const storageDecline = (100 * (1 - powerDaily.reservoirStorageMu / powerDaily.priorYearStorageMu)).toFixed(1);
const metroTotals = kochiMetro.reduce(
  (totals, { prior, current }) => ({ prior: totals.prior + prior, current: totals.current + current }),
  { prior: 0, current: 0 },
);
const metroGrowth = (100 * (metroTotals.current / metroTotals.prior - 1)).toFixed(1);

export const worksFindings = [
  {
    department: "Public Works",
    title: "Kunnathur Mini Civil Station remains in progress",
    metric: `${kunnathurStation.physicalPct}% physical progress`,
    summary: `${pwdProgramme.completed} of ${pwdProgramme.completed + pwdProgramme.inProgress} Public Works projects in the 100 Days Programme were reported complete. The Kunnathur project is in Kollam.`,
    period: "100 Days Programme · Checked 27 Nov 2026",
    href: "/public-works#project-follow-up",
    tone: "attention",
    points: [
      { label: "Physical progress", value: kunnathurStation.physicalPct },
      { label: "Financial progress", value: kunnathurStation.financialPct },
    ],
    unit: "%",
    sources: [pwdProgrammeSource, kunnathurStation.source],
  },
  {
    department: "Forest & Wildlife",
    title: "Elephants and wild pigs caused most conflict deaths",
    metric: "30 of 33 deaths",
    summary: "Elephants accounted for 19 reported deaths and wild pigs for 11. The report counts snakebites outside forests separately.",
    period: "FY 2024–25",
    href: `/sectors/forest-wildlife#${conflict.id}`,
    tone: "attention",
    points: [
      ...conflict.rows.slice(0, 2),
      { label: "Other wildlife", value: conflict.rows.slice(2).reduce((total, row) => total + row.value, 0) },
    ],
    unit: "deaths",
    sources: conflict.sources,
  },
  {
    department: "Environment",
    title: "Four stations had no daily AQI",
    metric: "4 of 9 stations without AQI",
    summary: "Palayam, MG Road and Vytilla had insufficient data. Kollam reported a power failure. All five reported readings were Good or Satisfactory.",
    period: environmentSources.air.period,
    href: "/sectors/environment-climate#air-quality",
    tone: "attention",
    points: [
      { label: "Reported AQI", value: airStations.length },
      { label: "Insufficient data", value: 3 },
      { label: "Power failure", value: 1 },
    ],
    unit: "stations",
    sources: [environmentSources.air],
  },
  {
    department: "Municipalities & Panchayats",
    title: "Corporations used the smallest share of released funds",
    metric: "74.93% spent",
    summary: "Corporations spent 12.76 percentage points less than Kerala’s statewide Development Fund utilisation rate of 87.69%.",
    period: fund.sources[0].period,
    href: `/sectors/municipal-panchayats#${fund.id}`,
    tone: "attention",
    points: [
      ...fund.rows.filter(({ label }) => label === "Corporations"),
      { label: "Statewide", value: 87.69 },
      ...fund.rows.filter(({ label }) => label === "Grama panchayats"),
    ],
    unit: "%",
    sources: fund.sources,
  },
  {
    department: "Power",
    title: "Hydroelectric storage fell year on year",
    metric: `${storageDecline}% below 2025`,
    summary: "Stored generation capability fell from 3,372.10 to 2,689.40 million units. Reservoirs held 65% of listed storage capability on 25 November.",
    period: `Same-date comparison · ${powerStorageSource.period}`,
    href: "/power#power-reservoirs",
    tone: "attention",
    points: powerReservoirHistory.slice(-3).map(({ year, storageMu }) => ({ label: String(year), value: storageMu })),
    unit: "MU",
    sources: [powerStorageSource],
  },
  {
    department: "Transport",
    title: "Kochi Metro ridership increased",
    metric: `+${metroGrowth}% year on year`,
    summary: "Kochi Metro recorded 1.17 crore rides from January to April 2026, up from 1.12 crore over the same months in 2025.",
    period: "January–April · 2025 and 2026",
    href: "/sectors/transportation#rail-and-metro",
    tone: "improving",
    points: [
      { label: "2025", value: metroTotals.prior / 10000000 },
      { label: "2026", value: metroTotals.current / 10000000 },
    ],
    unit: "crore rides",
    sources: [transportSources.metroRail],
  },
] satisfies readonly CmDepartmentFinding[];
