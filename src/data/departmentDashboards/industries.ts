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

const programmeTotalsSource = {
  ...programme,
  dataset: "Year of Enterprises · All view",
  period: "FY 2022–23 through in-progress FY 2026–27",
  basis: "Cumulative starts, investment and employment reported by the programme. The current financial year is partial.",
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

const districts = [
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

const fiscalYearProgramme = { starts: 71741, investment: 6065.16, employment: 155198 };
const ernakulamShare = (100 * districts[0].value / fiscalYearProgramme.investment).toFixed(1);
const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export const industriesDashboard = {
  title: "Industries",
  description: "Track industrial output and the enterprises, investment and employment reported by Kerala’s Year of Enterprises programme.",
  icon: "Factory",
  accent: "#245d7d",
  measures: [
    { label: "General industrial production index", value: "84.6", note: "Apr–Jun 2026 · FY 2011–12 = 100", source: iipReport },
    { label: "Programme enterprise starts", value: "4,73,284", note: "Cumulative · all programme years", source: programmeTotalsSource },
    { label: "Programme-reported investment", value: "₹32,833.08 crore", note: "Cumulative · all programme years", source: programmeTotalsSource },
    { label: "Programme-reported employment", value: "10,12,649", note: "Cumulative · all programme years", source: programmeTotalsSource },
  ],
  attention: [
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
    {
      title: "Ernakulam led reported programme investment", value: `${ernakulamShare}% of statewide programme investment`,
      detail: `Ernakulam reported ₹${number.format(districts[0].value)} crore in FY 2025–26. Thrissur recorded the highest number of programme starts, at ${number.format(districts[2].starts)}.`,
      sources: [programmeDistrictsSource], section: "industry-districts",
    },
  ],
  charts: [
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
      id: "industry-districts", title: "Programme investment by district", period: "Six highest reported amounts · FY 2025–26",
      sources: [programmeDistrictsSource], unit: "₹ crore", color: "#76518b", rows: districts.slice(0, 6),
      details: {
        columns: ["District", "Programme starts", "Investment (₹ crore)", "Reported employment"],
        rows: [
          ...districts.map(({ label, starts, value, employment }) => [label, starts, value, employment]),
          ["Kerala total", fiscalYearProgramme.starts, fiscalYearProgramme.investment, fiscalYearProgramme.employment],
        ],
      },
      note: "District amounts are rounded independently by the publisher.",
    },
  ],
} satisfies DepartmentDashboardData;
