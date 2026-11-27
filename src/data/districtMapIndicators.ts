import type { DataProvenance } from "@/components/DataProvenance";
import { ekycDistricts, ekycSource } from "@/data/departmentDashboards/foodSupplies";
import { districtOutputProvenance, districtPerPersonProvenance } from "@/data/districtBriefing";
import { districtEconomy, districtEconomyPeriod } from "@/data/districtEconomy";
import { districtWaterAccess, districtWaterAccessSource, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import { isOngoingDistrictProject, majorProjects, type MajorProject } from "@/data/majorProjectsActuals";

type DistrictMapRow = {
  district: string;
  value: number;
  detail?: string;
  projects?: readonly MajorProject[];
};

export type DistrictMapIndicator = {
  id: string;
  name: string;
  description: string;
  period: string;
  sources: readonly DataProvenance[];
  format: (value: number) => string;
  rows: readonly DistrictMapRow[];
  order: "asc" | "desc";
  hrefSection?: string;
};

const integer = new Intl.NumberFormat("en-IN");
const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const percent = (value: number) => `${decimal.format(value)}%`;

const economy = Object.entries(districtEconomy);
const ongoingProjects = majorProjects.filter((project) => project.districts?.length && isOngoingDistrictProject(project));
const projectSources = Array.from(new Map(ongoingProjects.map(({ source }) => [source.url, source])).values());

export const districtMapIndicators: readonly DistrictMapIndicator[] = [
  {
    id: "output",
    name: "District GDDP",
    description: "Gross District Domestic Product at current prices, in ₹ crore.",
    period: districtEconomyPeriod,
    sources: [districtOutputProvenance],
    format: (value) => `₹${decimal.format(value / 100)} cr`,
    rows: economy.map(([district, [value]]) => ({ district, value })),
    order: "desc",
  },
  {
    id: "per-capita",
    name: "GDDP per person",
    description: "District output per person at constant 2011–12 prices.",
    period: districtEconomyPeriod,
    sources: [districtPerPersonProvenance],
    format: (value) => `₹${integer.format(value)}`,
    rows: economy.map(([district, [, value]]) => ({ district, value })),
    order: "desc",
  },
  {
    id: "growth",
    name: "Per-person growth",
    description: "Change in real GDDP per person from FY 2023–24 to FY 2024–25.",
    period: districtPerPersonProvenance.period,
    sources: [districtPerPersonProvenance],
    format: percent,
    rows: economy.map(([district, [, , value]]) => ({ district, value })),
    order: "desc",
    hrefSection: "district-economy-growth",
  },
  {
    id: "water",
    name: "Water",
    description: `Rural tap coverage, lowest first. Kerala coverage was ${percent(districtWaterAccessTotal.percent)}.`,
    period: districtWaterAccessSource.period,
    sources: [districtWaterAccessSource],
    format: percent,
    rows: districtWaterAccess.map(({ district, percent: value, count }) => ({
      district, value, detail: `${integer.format(count)} rural households without a recorded tap connection.`,
    })),
    order: "asc",
    hrefSection: "district-water",
  },
  {
    id: "ration",
    name: "Ration eKYC",
    description: "Pending eKYC updates for beneficiaries in the Antyodaya Anna Yojana (AAY) and Priority Household (PHH) registers.",
    period: ekycSource.sourceUpdatedAt,
    sources: [ekycSource],
    format: (value) => `${integer.format(value)} pending`,
    rows: ekycDistricts.map(({ label: district, value, total }) => ({
      district, value, detail: `${percent(value / total * 100)} of the district’s AAY and PHH beneficiaries had a pending update.`,
    })),
    order: "desc",
    hrefSection: "district-ration",
  },
  {
    id: "projects",
    name: "Ongoing projects",
    description: `${integer.format(ongoingProjects.length)} ongoing major projects tracked across Kerala’s districts. Each project lists its own source and reporting period.`,
    period: "2026 project records",
    sources: projectSources,
    format: (value) => `${integer.format(value)} ${value === 1 ? "project" : "projects"}`,
    rows: economy.map(([district]) => {
      const projects = ongoingProjects.filter((project) => project.districts?.includes(district));
      return { district, value: projects.length, projects };
    }),
    order: "desc",
    hrefSection: "district-projects",
  },
];
