import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const musterSource = {
  source: "Information Kerala Mission · Sevana Pension",
  dataset: "State-level pension mustering dashboard",
  url: "https://welfarepension.lsgkerala.gov.in/Web_Musterdashboard.aspx",
  period: "26 Nov 2026 snapshot",
  sourceUpdatedAt: "26 Nov 2026, 12:02 pm IST",
  fetchedAt: "27 Nov 2026",
  basis: "The dashboard reports electronic verification, unsuccessful electronic attempts and submitted life certificates as separate fields.",
} satisfies DepartmentSource;

const pensionSource = {
  source: "Information Kerala Mission · Kerala State Planning Board",
  dataset: "Economic Review 2025 · Appendix 8.3.5",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf",
  period: "21 Oct 2025",
  basis: "Beneficiaries in five social security pension schemes. Welfare board pensions are outside this table.",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const channelSource = {
  source: "Kerala State Planning Board",
  dataset: "Economic Review 2025 · Social Assistance Programmes",
  url: "https://spb.kerala.gov.in/economic-review/ER2025/83.php?pid=83",
  period: "October 2025",
  basis: "Social security pensioners by payment channel, excluding welfare board pensions.",
  fetchedAt: "27 Nov 2026",
} satisfies DepartmentSource;

const groups = [
  { label: "Grama panchayats", beneficiaries: 4248925, verified: 3925064, value: 92.38, unsuccessful: 4605, certificates: 67155 },
  { label: "Municipalities", beneficiaries: 630654, verified: 574891, value: 91.16, unsuccessful: 901, certificates: 11049 },
  { label: "Corporations", beneficiaries: 358651, verified: 323516, value: 90.20, unsuccessful: 424, certificates: 3706 },
  { label: "Welfare boards", beneficiaries: 1428587, verified: 1146841, value: 80.28, unsuccessful: 6954, certificates: 6409 },
] as const;

const musterTotals = { beneficiaries: 6666817, verified: 5970312, rate: 89.55, unsuccessful: 12884, certificates: 88319 };
const schemes = [
  { label: "Old age", value: 2883788 },
  { label: "Widow pension", value: 1323333 },
  { label: "Disability pension", value: 387141 },
  { label: "Agricultural worker pension", value: 298047 },
  { label: "Unmarried women over 50", value: 81964 },
];
const count = new Intl.NumberFormat("en-IN");

export const socialSecurityDashboard = {
  title: "Social Security",
  description: "Pension verification, service access and published beneficiary counts in Kerala.",
  icon: "HandCoins",
  accent: "#66478e",
  measures: [
    { label: "Beneficiaries in mustering register", value: count.format(musterTotals.beneficiaries), source: musterSource },
    { label: "Electronically verified", value: `${musterTotals.rate}%`, note: `${count.format(musterTotals.verified)} people · 26 Nov 2026`, source: musterSource },
    { label: "Life certificates submitted", value: count.format(musterTotals.certificates), source: musterSource },
    { label: "Social security pensioners", value: count.format(schemes.reduce((sum, row) => sum + row.value, 0)), source: pensionSource },
  ],
  attention: [
    {
      title: "Welfare board verification trails local bodies", value: `${groups[3].value}% verified`,
      detail: "Welfare boards recorded the lowest electronic verification share of the four groups. Review barriers to completing mustering and access to life certificates.",
      sources: [musterSource], section: "pension-mustering",
    },
    {
      title: "Electronic verification could not be completed", value: `${count.format(musterTotals.unsuccessful)} reported`,
      detail: `Welfare boards account for ${count.format(groups[3].unsuccessful)} of these records. Check support for people who need a different verification route.`,
      sources: [musterSource], section: "verification-support",
    },
  ],
  charts: [
    {
      id: "pension-mustering", title: "Electronic verification by group", period: "Sevana snapshot · 26 Nov 2026",
      sources: [musterSource], rows: groups, unit: "%",
      details: { columns: ["Group", "Beneficiaries", "Electronically verified", "Verified share"], rows: groups.map(({ label, beneficiaries, verified, value }) => [label, beneficiaries, verified, `${value.toFixed(2)}%`]) },
      note: "Official reported percentages. The register includes local government and welfare board beneficiaries.",
    },
    {
      id: "verification-support", title: "Electronic verification not completed", period: "Sevana snapshot · 26 Nov 2026",
      sources: [musterSource], unit: "records", rows: groups.map(({ label, unsuccessful: value }) => ({ label, value })),
      details: { columns: ["Group", "Electronic verification not completed", "Life certificates submitted"], rows: groups.map(({ label, unsuccessful, certificates }) => [label, unsuccessful, certificates]) },
      note: "Counts reflect the dashboard’s individual status fields. A life certificate is an alternative verification route.",
    },
    {
      id: "pension-schemes", title: "Social security pension schemes", period: "Beneficiaries at 21 Oct 2025 · Five schemes",
      kind: "composition", sources: [pensionSource], rows: schemes,
    },
    {
      id: "payment-channels", title: "Pension payment channels", period: "Social security pensioners · October 2025",
      kind: "composition", sources: [channelSource], unit: "%", rows: [{ label: "Bank transfer", value: 53.56 }, { label: "Direct to home", value: 46.44 }],
      note: "The direct-to-home share is the remainder of the published bank transfer share.",
    },
  ],
} satisfies DepartmentDashboardData;
