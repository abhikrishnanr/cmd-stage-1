import type { DataProvenance } from "@/components/DataProvenance";

const checked = "27 Nov 2026";

export const diseaseSurveillanceSource = {
  source: "Directorate of Health Services, Kerala",
  dataset: "IDSP communicable diseases daily report · page 3",
  url: "https://dhs.kerala.gov.in/wp-content/uploads/2026/11/DR-CD-25.11.2026.pdf",
  period: "Through 25 Nov 2026",
  basis: "Preliminary confirmed case and death counts, subject to lab results and death audits",
  sourceUpdatedAt: "25 Nov 2026 (report date)",
  fetchedAt: checked,
} satisfies DataProvenance;

export const diseaseSurveillanceRows = [
  { label: "Dengue fever", daily: 75, monthCases: 1294, monthDeaths: 0, yearCases: 14574, yearDeaths: 44 },
  { label: "Hepatitis A", daily: 17, monthCases: 452, monthDeaths: 4, yearCases: 6998, yearDeaths: 48 },
  { label: "Influenza", daily: 12, monthCases: 340, monthDeaths: 2, yearCases: 12395, yearDeaths: 125 },
  { label: "Leptospirosis", daily: 13, monthCases: 214, monthDeaths: 7, yearCases: 2666, yearDeaths: 130 },
  { label: "Chikungunya", daily: 3, monthCases: 39, monthDeaths: 0, yearCases: 316, yearDeaths: 1 },
  { label: "Amoebic meningoencephalitis", daily: 0, monthCases: 4, monthDeaths: 0, yearCases: 188, yearDeaths: 45 },
];

export const infantMortalitySource = {
  source: "Office of the Registrar General, India",
  dataset: "Sample Registration System Bulletin, 2024 · Table 1",
  url: "https://censusindia.gov.in/nada/index.php/catalog/47150/study-description",
  period: "2024",
  basis: "Sample Registration System estimate, deaths under age one per 1,000 live births",
  sourceUpdatedAt: "20 May 2026 (catalogue publication)",
  fetchedAt: checked,
} satisfies DataProvenance;

export const maternalMortalitySource = {
  source: "Office of the Registrar General, India",
  dataset: "Special Bulletin on Maternal Mortality · Table 1",
  url: "https://censusindia.gov.in/nada/index.php/catalog/47151",
  period: "2022–24",
  basis: "Sample Registration System estimate, maternal deaths per 1,00,000 live births",
  sourceUpdatedAt: "20 May 2026 (catalogue publication)",
  fetchedAt: checked,
} satisfies DataProvenance;

export const healthOutcomes = {
  infantMortality: { kerala: 8, india: 24, rural: 5, urban: 10 },
  maternalMortality: { kerala: 24, india: 87 },
};

export const healthAssuranceSource = {
  source: "State Health Agency, Kerala",
  dataset: "March 2026 fact sheet · KASP summary and claims analysis",
  url: "https://sha.kerala.gov.in/wp-content/uploads/2026/05/Fact-Sheet-March-2026-SHA-Kerala.pdf",
  period: "Mar 2026",
  basis: "National Health Authority administrative records, claims data available on 1 Apr 2026",
  sourceUpdatedAt: null,
  fetchedAt: checked,
} satisfies DataProvenance;

export const healthAssurance = {
  familiesWithCard: 4307073,
  publicHospitals: 182,
  privateHospitals: 362,
  kaspClaimsConverted: 47253,
  beneficiariesForClaims: 43228,
};

export const clinicalRegisterUrl = "https://clinicalestablishments.kerala.gov.in/register-of-clinical-establishments/";
