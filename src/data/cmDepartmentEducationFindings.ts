import { getDepartmentChart, type CmDepartmentFinding } from "@/data/cmDepartmentFinding";
import { agricultureDashboard } from "@/data/departmentDashboards/agriculture";
import { fisheriesDashboard } from "@/data/departmentDashboards/fisheries";
import { foodSuppliesDashboard } from "@/data/departmentDashboards/foodSupplies";
import { industriesDashboard } from "@/data/departmentDashboards/industries";
import { scholarshipsDashboard } from "@/data/departmentDashboards/scholarships";
import { educationSources, secondaryDropoutHistory } from "@/data/educationActuals";

const harvest = getDepartmentChart(agricultureDashboard, "winter-comparison");
const seafoodExports = getDepartmentChart(fisheriesDashboard, "kochi-seafood-exports");
const production = getDepartmentChart(industriesDashboard, "industry-output");
const scholarshipQueue = getDepartmentChart(scholarshipsDashboard, "scholarship-queues");
const rationEkyc = getDepartmentChart(foodSuppliesDashboard, "district-ration-ekyc");

export const educationFindings = [
  {
    department: "Education",
    title: "Secondary dropout fell",
    metric: "2.9% dropout",
    summary: "In Classes IX–XII, Kerala’s dropout rate fell from 3.5% to 2.9%. The national rate was 7.0% in 2025–26.",
    period: "Academic years 2024–25 and 2025–26",
    href: "/sectors/education#retention",
    tone: "improving",
    featured: true,
    points: secondaryDropoutHistory.slice(-2),
    unit: "%",
    sources: [educationSources.dropout],
  },
  {
    department: "Agriculture",
    title: "Winter rice harvest increased",
    metric: "+29.7% output",
    summary: "Wetland winter rice rose from 2.09 to 2.71 lakh tonnes across the two seasons.",
    period: "Winter seasons · FY 2024–25 and FY 2025–26",
    href: `/sectors/agriculture#${harvest.id}`,
    tone: "improving",
    featured: true,
    points: harvest.rows.map(({ label, value }) => ({ label, value: value / 100000 })),
    unit: "lakh tonnes",
    sources: harvest.sources,
  },
  {
    department: "Fisheries",
    title: "Seafood export value rose at Kochi",
    metric: "+20.4% in rupee value",
    summary: "Seafood shipped through Kochi reached ₹7,285.40 crore in FY 2025–26. Shipment volume rose 8.1% year on year.",
    period: "Kochi port · FY 2023–24 to FY 2025–26",
    href: `/sectors/fisheries#${seafoodExports.id}`,
    tone: "improving",
    points: seafoodExports.rows.slice(-3),
    unit: "₹ crore",
    sources: seafoodExports.sources,
  },
  {
    department: "Industries",
    title: "Industrial output fell in Q1",
    metric: "−9.31% year on year",
    summary: "Kerala’s index fell from a revised 93.3 to 84.6. Mining and quarrying recorded the sharpest sector decline at 62.70%.",
    period: "April–June · FY 2024–25 to FY 2026–27",
    href: `/industries#${production.id}`,
    tone: "attention",
    featured: true,
    points: production.rows.slice(-3),
    unit: "index points",
    sources: production.sources,
  },
  {
    department: "Scholarships",
    title: "ST post-matric applications dominate the pending queue",
    metric: "4,520 pending",
    summary: "The ST post-matric service accounted for 85% of the 5,315 applications pending across three reported eGrantz services.",
    period: "Cumulative application status · 6 May 2026",
    href: `/sectors/scholarships-grants#${scholarshipQueue.id}`,
    tone: "attention",
    points: [
      scholarshipQueue.rows[0],
      { label: "Other two services", value: scholarshipQueue.rows.slice(1).reduce((total, row) => total + row.value, 0) },
    ],
    unit: "applications",
    sources: scholarshipQueue.sources,
  },
  {
    department: "Food & Supplies",
    title: "Malappuram has the most pending ration eKYC updates",
    metric: "68,481 pending in Malappuram",
    summary: "The three largest pending counts were in Malappuram, Thiruvananthapuram and Palakkad. Statewide coverage was 97.02% for AAY and PHH beneficiaries.",
    period: "AePDS beneficiary snapshot · 27 Nov 2026",
    href: `/sectors/food-civil-supplies#${rationEkyc.id}`,
    tone: "attention",
    points: rationEkyc.rows.slice(0, 3),
    unit: "beneficiaries",
    sources: rationEkyc.sources,
  },
] satisfies readonly CmDepartmentFinding[];
