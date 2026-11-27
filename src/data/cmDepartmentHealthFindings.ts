import { getDepartmentChart, type CmDepartmentFinding } from "@/data/cmDepartmentFinding";
import { eitDashboard } from "@/data/departmentDashboards/eit";
import { homeInternalSecurityDashboard } from "@/data/departmentDashboards/homeInternalSecurity";
import { socialSecurityDashboard } from "@/data/departmentDashboards/socialSecurity";
import { districtWaterAccess, districtWaterAccessSource, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import { diseaseSurveillanceRows, diseaseSurveillanceSource } from "@/data/healthActuals";

const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const largestCaseCounts = [...diseaseSurveillanceRows]
  .sort((first, second) => second.monthCases - first.monthCases)
  .slice(0, 3)
  .map(({ label, monthCases: value }) => ({ label, value }));
const childProtection = getDepartmentChart(homeInternalSecurityDashboard, "child-protection");
const itParkExports = getDepartmentChart(eitDashboard, "park-export-trend");
const pensionMustering = getDepartmentChart(socialSecurityDashboard, "pension-mustering");
const lowestRuralCoverage = districtWaterAccess.reduce((lowest, district) => district.percent < lowest.percent ? district : lowest);

export const healthFindings = [
  {
    department: "Health",
    title: "Dengue case burden",
    metric: "1,294 confirmed dengue cases",
    summary: "Dengue had the largest November case count among the six conditions tracked here. Review district case concentrations and local response.",
    period: "Preliminary cases · 1–25 Nov 2026",
    href: "/health#health-surveillance",
    tone: "attention",
    points: largestCaseCounts,
    unit: "cases",
    sources: [diseaseSurveillanceSource],
    featured: true,
  },
  {
    department: "Home & Internal Security",
    title: "Child protection caseload",
    metric: "3,323 POCSO cases registered",
    summary: "Malappuram recorded 372 cases, the highest count among police units. Review case follow-up and capacity to support victims.",
    period: "Jan–Sep 2026 · three highest police-unit counts",
    href: `/sectors/home-internal-security#${childProtection.id}`,
    tone: "attention",
    points: childProtection.rows.slice(0, 3),
    unit: "cases",
    sources: childProtection.sources,
  },
  {
    department: "E & IT",
    title: "Public IT park exports rose",
    metric: "₹26,770 crore in exports",
    summary: "Combined exports at Technopark, Infopark and Cyberpark rose 8.0% from the previous financial year.",
    period: "FY 2022–23 to FY 2024–25",
    href: `/e-it#${itParkExports.id}`,
    tone: "improving",
    points: itParkExports.rows,
    unit: "₹ crore",
    sources: itParkExports.sources,
  },
  {
    department: "Social Security",
    title: "Welfare board pension verification lags",
    metric: "80.28% verified electronically",
    summary: "Welfare boards trail grama panchayats by 12.10 percentage points. Review access to assisted verification and life certificates.",
    period: "Sevana snapshot · 26 Nov 2026",
    href: `/sectors/social-security#${pensionMustering.id}`,
    tone: "attention",
    points: pensionMustering.rows
      .filter(({ label }) => label === "Grama panchayats" || label === "Welfare boards")
      .map(({ label, value }) => ({ label, value })),
    unit: "%",
    sources: pensionMustering.sources,
  },
  {
    department: "Water",
    title: "Kasaragod has the lowest rural tap coverage",
    metric: `${number.format(lowestRuralCoverage.percent)}% of rural households with taps`,
    summary: `Kasaragod ranks lowest in the district report, against ${number.format(districtWaterAccessTotal.percent)}% coverage statewide. Review the district’s connection backlog.`,
    period: "Jal Jeevan Mission · 26 Nov 2026",
    href: "/water#rural-water",
    tone: "attention",
    points: [{ label: "Kasaragod", value: lowestRuralCoverage.percent }, { label: "Kerala", value: districtWaterAccessTotal.percent }],
    unit: "%",
    sources: [districtWaterAccessSource],
  },
] satisfies readonly CmDepartmentFinding[];
