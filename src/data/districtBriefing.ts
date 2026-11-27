import type { DataProvenance } from "@/components/DataProvenance";
import { ekycDistricts, ekycSource, statewideEkyc } from "./departmentDashboards/foodSupplies";
import { districtEconomy, districtEconomyChecked, districtEconomyPeriod, districtOutputSource, districtPerCapitaSource } from "./districtEconomy";
import { districtWaterAccess, districtWaterAccessSource, districtWaterAccessTotal } from "./districtWaterAccess";
import { slugify } from "./districts";

const numbers = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const percent = (value: number) => `${numbers.format(value)}%`;
const previousPerPerson = {
  Thiruvananthapuram: 185800, Kollam: 225569, Pathanamthitta: 141702, Alappuzha: 241851,
  Kottayam: 214853, Idukki: 192677, Ernakulam: 245372, Thrissur: 201166, Palakkad: 146333,
  Malappuram: 116748, Kozhikode: 158603, Wayanad: 122258, Kannur: 167420, Kasaragod: 143803,
} satisfies Record<keyof typeof districtEconomy, number>;

export const districtPerPersonProvenance = {
  source: districtPerCapitaSource.publisher,
  dataset: districtPerCapitaSource.title,
  url: districtPerCapitaSource.url,
  period: "FY 2023–24 provisional and FY 2024–25 quick estimates",
  fetchedAt: districtEconomyChecked,
  basis: "Gross district domestic product per person at constant 2011–12 prices. Statewide growth in the same table was 5.67%.",
} satisfies DataProvenance;

export const districtOutputProvenance = {
  source: districtOutputSource.publisher,
  dataset: districtOutputSource.title,
  url: districtOutputSource.url,
  period: districtEconomyPeriod,
  fetchedAt: districtEconomyChecked,
  basis: "Gross district domestic product at current prices, shown here in ₹ crore.",
} satisfies DataProvenance;

export type DistrictBar = { label: string; value: number; href?: string; reference?: boolean };

export type DistrictFinding = {
  id: string;
  title: string;
  metric?: string;
  period: string;
  detail: string;
  source: DataProvenance;
  rows: DistrictBar[];
  unit?: "%" | "₹";
  maximum?: number;
  link?: { label: string; href: string };
};

const waterDate = districtWaterAccessSource.period;
const ekycDate = ekycSource.sourceUpdatedAt;
const districtHref = (name: string, section: string) => `/districts/${slugify(name)}#${section}`;
const economyRows = Object.entries(districtEconomy).map(([name, [, , growth]]) => ({ name, growth }));

export const statewideDistrictFindings = {
  water: {
    id: "district-water-comparison",
    title: "Lowest rural tap coverage",
    period: waterDate,
    detail: `${percent(districtWaterAccessTotal.percent)} of rural households had a reported tap connection statewide.`,
    source: districtWaterAccessSource,
    rows: [...districtWaterAccess].sort((a, b) => a.percent - b.percent).slice(0, 3).map(({ district, percent: value }) => ({ label: district, value, href: districtHref(district, "district-water") })),
    unit: "%", maximum: 100,
    link: { label: "Kerala water dashboard", href: "/water#rural-water" },
  },
  ekyc: {
    id: "district-ration-comparison",
    title: "Largest pending ration eKYC counts",
    period: ekycDate,
    detail: "Beneficiaries in the Antyodaya Anna Yojana and Priority Household registers without an eKYC update.",
    source: ekycSource,
    rows: ekycDistricts.slice(0, 3).map(({ label, value }) => ({ label, value, href: districtHref(label, "district-ration") })),
    link: { label: "Compare all districts", href: "/sectors/food-civil-supplies#district-ration-ekyc" },
  },
  economy: {
    id: "district-growth-comparison",
    title: "Fastest growth in output per person",
    period: districtEconomyPeriod,
    detail: "Year-on-year change in gross district domestic product per person at constant prices.",
    source: districtPerPersonProvenance,
    rows: economyRows.sort((a, b) => b.growth - a.growth).slice(0, 3).map(({ name, growth }) => ({ label: name, value: growth, href: districtHref(name, "district-economy-growth") })),
    unit: "%",
    link: { label: "Compare district economies", href: "/dashboard-cm#district-economy" },
  },
} satisfies Record<string, DistrictFinding>;

export function districtFindings(name: string) {
  const water = districtWaterAccess.find(({ district }) => district === name);
  const ekyc = ekycDistricts.find(({ label }) => label === name);
  const economyName = name as keyof typeof districtEconomy;
  const economy = Object.hasOwn(districtEconomy, economyName) ? districtEconomy[economyName] : undefined;
  if (!water || !ekyc || !economy) return undefined;

  const [output, perPerson, growth] = economy;
  return {
    waterCoverage: water.percent,
    outputCrore: output / 100,
    attention: [
      {
        id: "district-water", title: "Rural tap connection gap",
        metric: `${numbers.format(water.count)} households`, period: waterDate,
        detail: `Jal Jeevan Mission recorded tap connections for ${numbers.format(water.with)} of ${numbers.format(water.denom)} rural households. The headline counts households without a recorded tap.`,
        source: districtWaterAccessSource,
        rows: [{ label: name, value: water.percent }, { label: "Kerala coverage", value: districtWaterAccessTotal.percent, reference: true }],
        unit: "%", maximum: 100,
        link: { label: "Rural tap coverage by district", href: "/water#rural-water" },
      },
      {
        id: "district-ration", title: "Pending ration eKYC updates",
        metric: `${numbers.format(ekyc.value)} beneficiaries`, period: ekycDate,
        detail: `AePDS recorded eKYC updates for ${numbers.format(ekyc.updated)} of ${numbers.format(ekyc.total)} beneficiaries in the Antyodaya Anna Yojana and Priority Household registers.`,
        source: ekycSource,
        rows: [{ label: `${name} pending share`, value: 100 - ekyc.coverage }, { label: "Kerala pending share", value: 100 - statewideEkyc.coverage, reference: true }],
        unit: "%",
        link: { label: "Ration eKYC by district", href: "/sectors/food-civil-supplies#district-ration-ekyc" },
      },
    ] satisfies DistrictFinding[],
    economy: {
      id: "district-economy-growth", title: "Real output per person rose",
      metric: `+${percent(growth)} year on year`, period: districtEconomyPeriod,
      detail: "Gross district domestic product per person at constant 2011–12 prices. Kerala’s growth rate was 5.67% in the same release.",
      source: districtPerPersonProvenance,
      rows: [{ label: "FY 2023–24 · provisional", value: previousPerPerson[economyName], reference: true }, { label: "FY 2024–25 · quick estimate", value: perPerson }],
      unit: "₹",
      link: { label: "Compare district economies", href: "/dashboard-cm#district-economy" },
    } satisfies DistrictFinding,
  };
}
