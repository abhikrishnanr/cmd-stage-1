import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const serviceSource = {
  source: "Government of Kerala · e-Services Dashboard",
  dataset: "Scheduled Tribes Development · eGrantz application status",
  url: "https://dashboard.kerala.gov.in/e-services/department.php?FMfcgzGkZtCkPcNLhJMdzBHNLnttCdGcZvAm=ZGlkPTM3",
  period: "Cumulative applications through 6 May 2026",
  sourceUpdatedAt: "6 May 2026, 3:49 pm IST",
  fetchedAt: "27 Nov 2026",
  basis: "Three reported eGrantz services. Counts record applications and their status at the source update.",
} satisfies DepartmentSource;

const postMatricSource = {
  ...serviceSource,
  dataset: "ST post-matric scholarship · service 1883",
  url: "https://dashboard.kerala.gov.in/e-services/service.php?fcgzGljlqlQrXcSXWDDRKHpqTpMzsq=ZGlkPTM3JnNlcj1QT1NUTUFUUklDK1NDSE9MQVJTSElQK0ZPUitTVCtTVFVERU5UUyUyOEVHUkFOVFolMjkmYXBwPVNjaG9sYXJzaGlw",
  period: "June 2018 to 6 May 2026",
} satisfies DepartmentSource;

const assistance = {
  source: "Scheduled Tribes Development Department · Kerala State Planning Board",
  dataset: "Economic Review 2025 · Appendix 8.2.32",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf",
  period: "FY 2019–20 to FY 2024–25",
  fetchedAt: "27 Nov 2026",
  basis: "Yearly students assisted by type of education support. The outcome series is separate from cumulative application counts.",
} satisfies DepartmentSource;

const totals = { received: 56079, approved: 50619, pending: 5315, rejected: 145 };
const postMatric = { received: 13888, approved: 9225, pending: 4520, rejected: 143 };
const preMatric = { received: 42126, approved: 41356, pending: 770, rejected: 0 };
const stOec = {
  received: totals.received - postMatric.received - preMatric.received,
  approved: totals.approved - postMatric.approved - preMatric.approved,
  pending: totals.pending - postMatric.pending - preMatric.pending,
  rejected: totals.rejected - postMatric.rejected - preMatric.rejected,
};
const services = [
  { label: "ST post-matric", ...postMatric },
  { label: "ST pre-matric, Classes IX–X", ...preMatric },
  { label: "ST–OEC post-matric", ...stOec },
];
const count = new Intl.NumberFormat("en-IN");

export const scholarshipsDashboard = {
  title: "Scholarships",
  description: "Published application decisions and education assistance for Scheduled Tribe students in Kerala.",
  icon: "Award",
  accent: "#664391",
  measures: [
    { label: "ST eGrantz applications", value: count.format(totals.received), source: serviceSource },
    { label: "Applications approved", value: count.format(totals.approved), source: serviceSource },
    { label: "Pending or processing", value: count.format(totals.pending), source: serviceSource },
    { label: "Post-matric students assisted", value: "14,438", note: "FY 2024–25", source: assistance },
  ],
  attention: [
    {
      title: "ST post-matric processing queue", value: `${count.format(postMatric.pending)} applications`,
      detail: `ST post-matric applications accounted for ${Math.round(postMatric.pending / totals.pending * 100)}% of recorded pending applications across the three services on 6 May 2026. Review the current queue and processing times with the department.`,
      sources: [serviceSource, postMatricSource], section: "scholarship-queues",
    },
    {
      title: "Post-matric assistance below earlier level", value: "14,438 students assisted",
      detail: "Post-matric assistance rose by 200 students in FY 2024–25 against FY 2023–24, and remained below the FY 2022–23 count of 17,652. Review how many eligible students received assistance.",
      sources: [assistance], section: "post-matric-trend",
    },
  ],
  charts: [
    {
      id: "scholarship-status", title: "Application status", period: serviceSource.period, kind: "composition",
      sources: [serviceSource], rows: [{ label: "Approved", value: totals.approved }, { label: "Pending or processing", value: totals.pending }, { label: "Rejected or returned", value: totals.rejected }],
      note: "Application counts can include more than one record for a student.",
    },
    {
      id: "scholarship-queues", title: "Pending by scholarship service", period: serviceSource.period, sources: [serviceSource, postMatricSource],
      unit: "applications", rows: services.map(({ label, pending: value }) => ({ label, value })),
      details: { columns: ["Service", "Received", "Approved", "Pending", "Rejected or returned"], rows: services.map(({ label, received, approved, pending, rejected }) => [label, received, approved, pending, rejected]) },
      note: "Status reflects the date of the public snapshot. ST–OEC status counts are calculated from the published department totals. Payment and application age are outside this table.",
    },
    {
      id: "post-matric-trend", title: "Post-matric students assisted", period: assistance.period, kind: "trend", sources: [assistance],
      rows: [
        { label: "2019–20", value: 16583 }, { label: "2020–21", value: 15820 }, { label: "2021–22", value: 14558 },
        { label: "2022–23", value: 17652 }, { label: "2023–24", value: 14238 }, { label: "2024–25", value: 14438 },
      ],
    },
    {
      id: "other-education-support", title: "Other ST education support", period: "Students assisted · FY 2024–25",
      sources: [assistance], rows: [{ label: "Pre-matric scholarship", value: 7557 }, { label: "Brilliant student assistance", value: 2320 }, { label: "Ayyankali Talent Search", value: 557 }, { label: "Study outside Kerala or abroad", value: 52 }],
      note: "The report counts beneficiaries separately for each programme.",
    },
  ],
} satisfies DepartmentDashboardData;
