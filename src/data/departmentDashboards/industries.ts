import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const checkedAt = "27 Nov 2026";
const iipReport = {
  source: "Kerala Department of Economics and Statistics",
  dataset: "Index of Industrial Production · Q1 FY 2026–27 release",
  url: "https://www.ecostat.kerala.gov.in/storage/publications/1935.pdf",
  sourceUpdatedAt: "24 Sep 2026 (release)",
  fetchedAt: checkedAt,
  period: "Apr–Jun 2026 and Apr–Jun 2025",
  basis: "Kerala IIP, base FY 2011–12 = 100. Prior-year figures and year-on-year changes use the comparison table in the latest release.",
} satisfies DepartmentSource;

const iipHistory = {
  source: "Kerala Department of Economics and Statistics",
  dataset: "Quarterly Index of Industrial Production · dataset 64",
  url: "https://ecostat.kerala.gov.in/dataset/64",
  sourceUpdatedAt: "28 Sep 2026 (dataset update)",
  fetchedAt: checkedAt,
  period: "Q1 FY 2022–23 through Q1 FY 2024–25 used here",
  basis: "Published first-quarter indices for Kerala. Base FY 2011–12 = 100.",
} satisfies DepartmentSource;

const programme = {
  source: "Kerala Directorate of Industries and Commerce",
  url: "https://yearofenterprises.kerala.gov.in/index.php/public_dashboard",
  fetchedAt: checkedAt,
};

const currentProgrammeSource = {
  ...programme,
  dataset: "Year of Enterprises · 2026–27 achievements and district and category reports",
  period: "FY 2026–27 to date",
  basis: "Select 2026–27 on the official dashboard. Figures cover investment, starts and employment reported by Year of Enterprises for the current financial year to date.",
} satisfies DepartmentSource;

const programmeDistrictsSource = {
  ...programme,
  dataset: "Year of Enterprises · District-wise performance",
  period: "FY 2025–26",
  basis: "Select 2025–26 on the official dashboard. District values are programme-reported starts, investment and employment.",
} satisfies DepartmentSource;

const enterpriseHistorySource = {
  source: "Kerala State Planning Board · Directorate of Industries and Commerce",
  dataset: "Kerala Development Report 2026 · Table 14.3",
  url: "https://spb.kerala.gov.in/wp-content/uploads/2026/01/kerala-development-report_2026.pdf#page=224",
  sourceUpdatedAt: "27 Mar 2026 (release notice)",
  fetchedAt: checkedAt,
  period: "FY 2022–23 through FY 2024–25",
  basis: "Published full-year MSME units started and associated investment and employment figures. Years shown are from the same table.",
} satisfies DepartmentSource;

const q1History = [
  { label: "2022–23", value: 96.8 },
  { label: "2023–24", value: 92.5 },
  { label: "2024–25", value: 91.0 },
  { label: "2025–26", value: 93.3 },
  { label: "2026–27", value: 84.6 },
] as const;

const latestSectors = [
  { label: "Manufacturing", value: 105.2, previous: 102.1, change: "+3.04%", color: "#28734b" },
  { label: "Electricity", value: 63.8, previous: 77.9, change: "−18.06%", color: "#255d96" },
  { label: "Mining and quarrying", value: 30.4, previous: 81.6, change: "−62.70%", color: "#a1541d" },
] as const;

const enterpriseHistory = [
  { label: "2022–23", value: 139839, investment: 8421.6, employment: 300051 },
  { label: "2023–24", value: 103595, investment: 7048.6, employment: 218179 },
  { label: "2024–25", value: 109692, investment: 7217.8, employment: 231468 },
] as const;

const currentDistricts = [
  { label: "Ernakulam", starts: 4911, value: 926.18, employment: 12492 },
  { label: "Thiruvananthapuram", starts: 6723, value: 505.94, employment: 15713 },
  { label: "Palakkad", starts: 4377, value: 478.19, employment: 10178 },
  { label: "Malappuram", starts: 4966, value: 374.22, employment: 12403 },
  { label: "Thrissur", starts: 5227, value: 319.78, employment: 10703 },
  { label: "Alappuzha", starts: 5543, value: 308.63, employment: 10354 },
  { label: "Kottayam", starts: 3405, value: 280.45, employment: 6872 },
  { label: "Kollam", starts: 5071, value: 271.03, employment: 10023 },
  { label: "Kozhikode", starts: 2107, value: 172.35, employment: 5380 },
  { label: "Kannur", starts: 1642, value: 152.31, employment: 3772 },
  { label: "Pathanamthitta", starts: 2703, value: 117.18, employment: 5636 },
  { label: "Wayanad", starts: 812, value: 61.91, employment: 1889 },
  { label: "Kasaragod", starts: 733, value: 58.94, employment: 1602 },
  { label: "Idukki", starts: 754, value: 57.08, employment: 1622 },
] as const;

const currentCategories = [
  { label: "Services", starts: 24663, value: 2011.15, employment: 57559, color: "#087b71" },
  { label: "Trade", starts: 20074, value: 1398.59, employment: 38947, color: "#3364a0" },
  { label: "Manufacturing", starts: 4237, value: 674.45, employment: 12133, color: "#a85e1a" },
] as const;

const previousDistricts = [
  { label: "Ernakulam", starts: 6635, value: 1480.04, employment: 15782 },
  { label: "Malappuram", starts: 7398, value: 636.99, employment: 17430 },
  { label: "Thrissur", starts: 8194, value: 557.26, employment: 17387 },
  { label: "Thiruvananthapuram", starts: 7654, value: 534.16, employment: 16862 },
  { label: "Palakkad", starts: 6596, value: 512.94, employment: 15313 },
  { label: "Kollam", starts: 6832, value: 417.94, employment: 13614 },
  { label: "Kottayam", starts: 4642, value: 386.90, employment: 9247 },
  { label: "Kozhikode", starts: 3906, value: 374.84, employment: 9059 },
  { label: "Alappuzha", starts: 7423, value: 365.85, employment: 14181 },
  { label: "Pathanamthitta", starts: 5219, value: 260.16, employment: 10074 },
  { label: "Kannur", starts: 2719, value: 217.84, employment: 5934 },
  { label: "Wayanad", starts: 1593, value: 138.70, employment: 3962 },
  { label: "Kasaragod", starts: 1915, value: 97.24, employment: 4205 },
  { label: "Idukki", starts: 1015, value: 84.30, employment: 2148 },
] as const;

const currentProgramme = { starts: 48974, investment: 4084.19, employment: 108639 };
const previousProgramme = { starts: 71741, investment: 6065.16, employment: 155198 };
const leadingDistrictsInvestment = currentDistricts.slice(0, 3).reduce((total, { value }) => total + value, 0);
const leadingDistrictsShare = (100 * leadingDistrictsInvestment / currentProgramme.investment).toFixed(1);
const servicesShare = (100 * currentCategories[0].value / currentProgramme.investment).toFixed(1);
const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export const industriesDashboard = {
  title: "Industries",
  description: "Track this financial year’s investment in Kerala’s Year of Enterprises programme, with district and sector breakdowns and the latest industrial production figures.",
  icon: "Factory",
  accent: "#245d7d",
  measures: [
    { label: "Year of Enterprises investment", value: `₹${number.format(currentProgramme.investment)} crore`, note: `FY 2026–27 to date · Checked ${checkedAt}`, source: currentProgrammeSource, featured: true },
    { label: "New enterprises", value: number.format(currentProgramme.starts), note: "FY 2026–27 to date · Year of Enterprises", source: currentProgrammeSource },
    { label: "Reported employment", value: number.format(currentProgramme.employment), note: "FY 2026–27 to date · Year of Enterprises", source: currentProgrammeSource },
    { label: "General industrial production index", value: "84.6", note: "Apr–Jun 2026 · FY 2011–12 = 100", source: iipReport },
  ],
  attention: [
    {
      title: "Three districts account for nearly half of investment", value: `${leadingDistrictsShare}% of FY 2026–27 investment`,
      detail: `Ernakulam leads at ₹${number.format(currentDistricts[0].value)} crore, followed by Thiruvananthapuram and Palakkad. The three districts report ₹${number.format(leadingDistrictsInvestment)} crore combined this financial year to date.`,
      sources: [currentProgrammeSource], section: "industry-districts",
    },
    {
      title: "Industrial production fell in the first quarter", value: "−9.31% year on year",
      detail: "The general index fell from a revised 93.3 to 84.6 in Apr–Jun 2026, the lowest first-quarter reading in the five years shown.",
      sources: [iipReport, iipHistory], section: "industry-output",
    },
    {
      title: "Mining and quarrying saw the sharpest fall", value: "−62.70% year on year",
      detail: "Manufacturing rose 3.04% year on year while the electricity production index fell 18.06%. Compare each sector against the same quarter.",
      sources: [iipReport], section: "industry-sectors",
    },
  ],
  charts: [
    {
      id: "industry-districts", title: "Year of Enterprises investment by district", period: "FY 2026–27 to date · Six highest reported amounts",
      sources: [currentProgrammeSource], unit: "₹ crore", color: "#087b71", rows: currentDistricts.slice(0, 6),
      details: {
        columns: ["District", "New enterprises", "Investment (₹ crore)", "Reported employment"],
        rows: [
          ...currentDistricts.map(({ label, starts, value, employment }) => [label, starts, value, employment]),
          ["Kerala total", currentProgramme.starts, currentProgramme.investment, currentProgramme.employment],
        ],
      },
      note: "Exact figures cover all 14 districts.",
    },
    {
      id: "industry-investment-sectors", title: "Year of Enterprises investment by sector", period: "FY 2026–27 to date · Investment reported by enterprise category",
      kind: "composition", sources: [currentProgrammeSource], unit: "₹ crore", rows: currentCategories,
      details: {
        columns: ["Sector", "New enterprises", "Investment (₹ crore)", "Reported employment"],
        rows: currentCategories.map(({ label, starts, value, employment }) => [label, starts, value, employment]),
      },
      note: `Services account for ${servicesShare}% of reported investment so far this financial year.`,
    },
    {
      id: "industry-output", title: "Industrial production in the first quarter", period: "Apr–Jun each year · FY 2011–12 = 100",
      kind: "trend", sources: [iipReport, iipHistory], rows: q1History,
      note: "FY 2025–26 uses the revised comparison figure in the FY 2026–27 release.",
    },
    {
      id: "industry-sectors", title: "Production indices by sector", period: "Apr–Jun 2026 · FY 2011–12 = 100",
      sources: [iipReport], rows: latestSectors,
      details: {
        columns: ["Sector", "Apr–Jun 2025 index", "Apr–Jun 2026 index", "Year-on-year change"],
        rows: latestSectors.map(({ label, value, previous, change }) => [label, previous, value, change]),
      },
      note: "The year-on-year changes follow the comparison table in the official release.",
    },
    {
      id: "industry-enterprises", title: "MSME starts by financial year", period: "Full financial years · State Planning Board report",
      kind: "trend", sources: [enterpriseHistorySource], unit: "units", color: "#28734b", rows: enterpriseHistory,
      details: {
        columns: ["Financial year", "New units", "Investment (₹ crore)", "Reported employment"],
        rows: enterpriseHistory.map(({ label, value, investment, employment }) => [label, value, investment, employment]),
      },
    },
    {
      id: "industry-districts-2025", title: "Previous year’s programme investment by district", period: "Full FY 2025–26 · Six highest reported amounts",
      sources: [programmeDistrictsSource], unit: "₹ crore", color: "#76518b", rows: previousDistricts.slice(0, 6),
      details: {
        columns: ["District", "Programme starts", "Investment (₹ crore)", "Reported employment"],
        rows: [
          ...previousDistricts.map(({ label, starts, value, employment }) => [label, starts, value, employment]),
          ["Kerala total", previousProgramme.starts, previousProgramme.investment, previousProgramme.employment],
        ],
      },
      note: "District amounts are rounded independently by the publisher.",
    },
  ],
} satisfies DepartmentDashboardData;
