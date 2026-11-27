import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const reviewed = "27 Nov 2026";
const economicReview = "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume1%20Eng%20final.pdf";
const localBodiesSource = {
  source: "Comptroller and Auditor General of India",
  dataset: "Local Self-Government Institutions · Report No. 4 of 2026, Table 1.1",
  url: "https://cag.gov.in/en/audit-report/details/125849",
  period: "August 2025 institution counts",
  basis: "Count of local self-government institutions by tier.",
  fetchedAt: reviewed,
} satisfies DepartmentSource;

const wardsSource = {
  source: "Kerala Directorate of Health Services",
  dataset: "Circular DHS/14493/2024-PH5 · ward delimitation",
  url: "https://ashasoft.kerala.gov.in/uploads/gos/4ca6dda6a289194f67a9.pdf",
  period: "After ward delimitation",
  basis: "Statewide ward count in the circular on updating health service boundaries.",
  sourceUpdatedAt: "19 Mar 2026",
  fetchedAt: reviewed,
} satisfies DepartmentSource;

const fundsSource = {
  source: "Kerala State Planning Board · Information Kerala Mission",
  dataset: "Economic Review 2025 · Development Fund, Figure 12.1.1",
  url: economicReview,
  period: "FY 2024–25",
  basis: "Actual Development Fund expenditure as a share of funds released, grouped by local government tier.",
  sourceUpdatedAt: "4 Feb 2026 (release notice)",
  fetchedAt: reviewed,
} satisfies DepartmentSource;

const housingSource = {
  source: "Kerala State Planning Board · LIFE Mission",
  dataset: "Economic Review 2025 · Table 11.5.2",
  url: economicReview,
  period: "31 Oct 2025",
  basis: "District-level completions and homes under construction, including converged housing schemes.",
  sourceUpdatedAt: "4 Feb 2026 (release notice)",
  fetchedAt: reviewed,
} satisfies DepartmentSource;

const housingMilestoneSource = {
  source: "Kerala State Planning Board",
  dataset: "Kerala Development Report 2026 · LIFE Mission, p. 372",
  url: "https://spb.kerala.gov.in/wp-content/uploads/2026/01/kerala-development-report_2026.pdf",
  period: "February 2026",
  basis: "Statewide completion milestone reported separately from the October district snapshot.",
  fetchedAt: reviewed,
} satisfies DepartmentSource;

const wasteSource = {
  source: "Kerala State Planning Board · Suchitwa Mission",
  dataset: "Economic Review 2025 · Appendix 12.1.14",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf",
  period: "31 Aug 2025",
  basis: "Reported facilities for material collection and resource recovery by district.",
  sourceUpdatedAt: "4 Feb 2026 (release notice)",
  fetchedAt: reviewed,
} satisfies DepartmentSource;

const permitsSource = {
  ...localBodiesSource,
  dataset: "Local Self-Government Institutions · Report No. 4 of 2026, §5.7",
  url: "https://d1jmc0u14z2tmp.cloudfront.net/uploads/download_audit_report/2026/AR-LSGIs-2024_KERALA_Print-version-25.09.2026---signed-version-%281%29-06b07b692a720f2.34432161.pdf",
  period: "Audit of FY 2019–20 to FY 2023–24 records",
  basis: "Delayed permit cases identified by the audit of 14 selected urban local bodies.",
} satisfies DepartmentSource;

const fundUtilisation = [
  { label: "Grama panchayats", value: 91.98, color: "#197466" },
  { label: "Block panchayats", value: 90.40, color: "#197466" },
  { label: "Municipalities", value: 86.72, color: "#2b648f" },
  { label: "District panchayats", value: 80.71, color: "#2b648f" },
  { label: "Corporations", value: 74.93, color: "#af622d" },
];

const housingByDistrict = [
  { label: "Palakkad", value: 19076, completed: 50574 },
  { label: "Malappuram", value: 19073, completed: 56152 },
  { label: "Thiruvananthapuram", value: 15116, completed: 58456 },
  { label: "Kollam", value: 9706, completed: 40364 },
  { label: "Thrissur", value: 9407, completed: 34741 },
  { label: "Alappuzha", value: 8258, completed: 34128 },
  { label: "Idukki", value: 7651, completed: 25509 },
  { label: "Kozhikode", value: 7384, completed: 35234 },
  { label: "Wayanad", value: 6285, completed: 26829 },
  { label: "Ernakulam", value: 5661, completed: 36259 },
  { label: "Kasaragod", value: 5424, completed: 18341 },
  { label: "Kottayam", value: 5316, completed: 18919 },
  { label: "Pathanamthitta", value: 4443, completed: 13982 },
  { label: "Kannur", value: 3860, completed: 21954 },
];

const wasteByDistrict = [
  { label: "Kannur", mini: 2291, material: 96, value: 26 },
  { label: "Thrissur", mini: 966, material: 149, value: 26 },
  { label: "Ernakulam", mini: 1558, material: 130, value: 19 },
  { label: "Alappuzha", mini: 1638, material: 106, value: 18 },
  { label: "Kottayam", mini: 1639, material: 92, value: 17 },
  { label: "Thiruvananthapuram", mini: 2027, material: 112, value: 15 },
  { label: "Kollam", mini: 1884, material: 99, value: 14 },
  { label: "Kozhikode", mini: 1185, material: 95, value: 14 },
  { label: "Palakkad", mini: 1623, material: 118, value: 12 },
  { label: "Malappuram", mini: 1128, material: 143, value: 11 },
  { label: "Idukki", mini: 971, material: 63, value: 10 },
  { label: "Kasaragod", mini: 1412, material: 54, value: 9 },
  { label: "Pathanamthitta", mini: 968, material: 64, value: 8 },
  { label: "Wayanad", mini: 761, material: 29, value: 6 },
];

const permitDelays = [
  { label: "IBPMS records", value: 167, color: "#a65332" },
  { label: "SUVEGA records", value: 14, color: "#635785" },
];

const number = new Intl.NumberFormat("en-IN");
const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const totalHousingUnderConstruction = housingByDistrict.reduce((sum, row) => sum + row.value, 0);
const housingTopThree = housingByDistrict.slice(0, 3).reduce((sum, row) => sum + row.value, 0);
const housingShare = (100 * housingTopThree / totalHousingUnderConstruction).toFixed(1);
const auditedCases = permitDelays.reduce((sum, row) => sum + row.value, 0);

export const municipalDashboard = {
  title: "Municipalities & Panchayats",
  description: "Local development spending, LIFE housing, waste infrastructure and building permit audit findings.",
  icon: "Landmark",
  accent: "#146c67",
  measures: [
    { label: "Local self-government institutions", value: "1,200", note: "1,107 panchayats · 93 urban local bodies · August 2025", source: localBodiesSource },
    { label: "Wards after delimitation", value: "23,612", note: "21,900 before delimitation · March 2026 circular", source: wardsSource },
    { label: "Local Development Fund spent", value: "₹6,792.60 crore", note: "87.69% of funds released · FY 2024–25", source: fundsSource },
    { label: "LIFE Mission housing milestone", value: "5 lakh homes", note: "Statewide milestone reached by February 2026", source: housingMilestoneSource },
  ],
  attention: [
    {
      title: "Corporations spent the lowest share",
      value: "74.93% of releases",
      detail: "Corporations spent 74.93% of the Development Fund released to them in FY 2024–25. The statewide rate was 87.69%. Review the project-level gaps behind the difference.",
      sources: [fundsSource],
      section: "local-development-fund",
    },
    {
      title: "Housing construction was concentrated",
      value: `${housingShare}% in three districts`,
      detail: `Palakkad, Malappuram and Thiruvananthapuram together accounted for ${number.format(housingTopThree)} of ${number.format(totalHousingUnderConstruction)} LIFE homes under construction on 31 October 2025. Compare those districts in the next delivery review.`,
      sources: [housingSource],
      section: "life-housing",
    },
    {
      title: "CAG found building permit delays",
      value: "44–474 days",
      detail: "The audit documented 181 delayed cases across 14 selected urban bodies in its FY 2019–20 to FY 2023–24 review. Check current municipal turnaround for corrective follow-up.",
      sources: [permitsSource],
      section: "building-permit-audit",
    },
  ],
  charts: [
    {
      id: "local-development-fund",
      title: "Development Fund utilisation",
      period: "Actual expenditure as a share of releases · FY 2024–25",
      unit: "%",
      sources: [fundsSource],
      rows: fundUtilisation,
      note: "The State Planning Board reported ₹7,746.29 crore released and ₹6,792.60 crore spent across all tiers.",
      details: {
        columns: ["Local government tier", "Expenditure as share of release"],
        rows: [...fundUtilisation.map(({ label, value }) => [label, `${decimal.format(value)}%`]), ["Statewide", "87.69%"]],
      },
    },
    {
      id: "life-housing",
      title: "LIFE homes under construction",
      period: "Six largest district counts · 31 October 2025",
      unit: "homes",
      color: "#396899",
      sources: [housingSource],
      rows: housingByDistrict.slice(0, 6),
      note: "Kerala recorded 4,71,442 completed homes and 1,26,660 under construction in this October 2025 snapshot. The table covers all 14 districts.",
      details: {
        columns: ["District", "Completed homes", "Under construction"],
        rows: housingByDistrict.map(({ label, completed, value }) => [label, completed, value]),
      },
    },
    {
      id: "waste-infrastructure",
      title: "Resource recovery facilities",
      period: "Six largest district counts · 31 August 2025",
      unit: "facilities",
      color: "#538039",
      sources: [wasteSource],
      rows: wasteByDistrict.slice(0, 6),
      note: "Suchitwa Mission reported 205 resource recovery facilities, 1,350 material collection facilities and 20,051 mini collection facilities. The table covers all 14 districts.",
      details: {
        columns: ["District", "Mini collection", "Material collection", "Resource recovery"],
        rows: wasteByDistrict.map(({ label, mini, material, value }) => [label, mini, material, value]),
      },
    },
    {
      id: "building-permit-audit",
      title: "Delayed permits identified by CAG",
      period: "14 selected urban local bodies · FY 2019–20 to FY 2023–24",
      kind: "composition",
      unit: "cases",
      sources: [permitsSource],
      rows: permitDelays,
      note: "The two systems are the sources of the audited records. The chart counts documented delays in the sample.",
      details: {
        columns: ["Record system", "Delayed cases"],
        rows: [...permitDelays.map(({ label, value }) => [label, value]), ["Total identified in audit", auditedCases]],
      },
    },
  ],
} satisfies DepartmentDashboardData;
