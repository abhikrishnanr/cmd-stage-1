import type { DataProvenance } from "@/components/DataProvenance";

export const labourForceSource = {
  source: "National Statistics Office · MoSPI",
  dataset: "Periodic Labour Force Survey quarterly bulletin",
  url: "https://mospi.gov.in/uploads/publications_reports/publications_reports1794297172776_05eae330-7f2d-45ec-84c5-07031201ecf1_PLFS_QB_July-Sept_2026_m.pdf",
  period: "Jul–Sep 2026",
  basis: "Published survey estimates in Current Weekly Status, rural and urban combined",
  sourceUpdatedAt: "10 Nov 2026 (release)",
  fetchedAt: "27 Nov 2026",
} satisfies DataProvenance;

export const unemploymentComparisonSource = {
  ...labourForceSource,
  dataset: "PLFS quarterly bulletin · Table 5, A-19–A-20",
  url: `${labourForceSource.url}#page=39`,
} satisfies DataProvenance;

// Table 5, rural and urban combined, persons column for both age groups.
const keralaUnemployment = { region: "Kerala", age15Plus: 8.7, age15To29: 28.9 } as const;
const indiaUnemployment = { region: "India", age15Plus: 5.1, age15To29: 15.3 } as const;

export const unemploymentComparisons = [
  keralaUnemployment,
  indiaUnemployment,
  { region: "Tamil Nadu", age15Plus: 5.0, age15To29: 16.6 },
  { region: "Karnataka", age15Plus: 2.8, age15To29: 9.0 },
] as const;

export const youngWomenUnemployment = { kerala: 43.0, india: 18.7 } as const;

export const employmentRegisterSource = {
  source: "Directorate of Employment · Kerala State Planning Board",
  dataset: "Economic Review 2025, Appendix 7.2.10",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf",
  period: "31 Aug 2025",
  basis: "Employment exchange registrations",
  fetchedAt: "27 Nov 2026",
} satisfies DataProvenance;

export const labourRates = [
  { label: "Labour force participation", kerala: 50.9, india: 55.5, male: 70.5, female: 34.1 },
  { label: "Worker population ratio", kerala: 46.5, india: 52.7, male: 65.7, female: 30.0 },
  { label: "Unemployment rate", kerala: keralaUnemployment.age15Plus, india: indiaUnemployment.age15Plus, male: 6.8, female: 12.1 },
];

export const youthUnemployment = {
  kerala: keralaUnemployment.age15To29,
  india: indiaUnemployment.age15To29,
  male: 20.9,
  female: youngWomenUnemployment.kerala,
};

export const labourSectors = [
  { label: "Agriculture", kerala: 18.8, india: 41.7 },
  { label: "Secondary sector", kerala: 24.9, india: 24.7 },
  { label: "Tertiary sector", kerala: 56.4, india: 33.5 },
];

// District totals from the final two reported gender columns in Appendix 7.2.10.
export const employmentRegistrations = [
  { district: "Thiruvananthapuram", men: 136541, women: 241305 },
  { district: "Kollam", men: 101321, women: 161998 },
  { district: "Pathanamthitta", men: 32755, women: 51792 },
  { district: "Alappuzha", men: 71113, women: 112966 },
  { district: "Kottayam", men: 49102, women: 78430 },
  { district: "Idukki", men: 28604, women: 43514 },
  { district: "Ernakulam", men: 77815, women: 138248 },
  { district: "Thrissur", men: 57486, women: 109835 },
  { district: "Palakkad", men: 55402, women: 102938 },
  { district: "Malappuram", men: 61635, women: 109720 },
  { district: "Kozhikode", men: 73468, women: 159568 },
  { district: "Wayanad", men: 21816, women: 38978 },
  { district: "Kannur", men: 41132, women: 77275 },
  { district: "Kasaragod", men: 21449, women: 41445 },
];
