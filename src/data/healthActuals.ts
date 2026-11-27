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

export const diseaseTrendSources = [
  { ...diseaseSurveillanceSource, url: "https://dhs.kerala.gov.in/wp-content/uploads/2026/11/DR-CD-13.11.2026.pdf", period: "Through 13 Nov 2026", sourceUpdatedAt: "13 Nov 2026 (report date)" },
  { ...diseaseSurveillanceSource, url: "https://dhs.kerala.gov.in/wp-content/uploads/2026/11/DR-CD-18.11.2026sd.pdf", period: "Through 18 Nov 2026", sourceUpdatedAt: "18 Nov 2026 (report date)" },
  diseaseSurveillanceSource,
];

// Confirmed month-to-date cases from the same column in each IDSP daily report.
export const diseaseReportingCheckpoints = [
  { day: 13, label: "13 Nov", dengue: 618, hepatitisA: 231, leptospirosis: 114, influenza: 207 },
  { day: 18, label: "18 Nov", dengue: 900, hepatitisA: 322, leptospirosis: 152, influenza: 266 },
  { day: 25, label: "25 Nov", dengue: diseaseSurveillanceRows[0].monthCases, hepatitisA: diseaseSurveillanceRows[1].monthCases, leptospirosis: diseaseSurveillanceRows[3].monthCases, influenza: diseaseSurveillanceRows[2].monthCases },
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

export const healthSurveySource = {
  source: "Ministry of Health and Family Welfare · IIPS",
  dataset: "NFHS-6 Kerala fact sheet · indicators 44, 62, 68–70",
  url: "https://nhm.gov.in/New-Update-2025-26/NFHS-6-factsheet.pdf#page=54",
  period: "NFHS-5 (2019–21) and NFHS-6 (2023–24)",
  basis: "Provisional survey estimates for the age group specified for each indicator",
  fetchedAt: checked,
} satisfies DataProvenance;

export const healthSurveyMeasures = [
  { label: "Fully vaccinated", group: "Children 12–23 months · card or recall", earlier: 78.4, latest: 84.9, rural: 84.1, urban: 85.8 },
  { label: "Exclusively breastfed", group: "Children under 6 months", earlier: 55.5, latest: 72.7, rural: 75.2, urban: 69.5 },
  { label: "Receiving an adequate diet", group: "Children 6–23 months", earlier: 23.3, latest: 26.0, rural: 24.7, urban: 27.4 },
  { label: "Stunting", group: "Children under 5 years", earlier: 23.4, latest: 20.1, rural: 21.3, urban: 18.8 },
  { label: "Wasting", group: "Children under 5 years", earlier: 15.8, latest: 10.9, rural: 11.3, urban: 10.5 },
] as const;

export const eHealthFootprintSource = {
  source: "eHealth Kerala · Department of Health and Family Welfare",
  dataset: "eHealth institutions and project statistics",
  url: "https://dashboard.ehealth.kerala.gov.in/index.php/Init",
  period: "25 Nov 2026 snapshot",
  basis: "Active institutions in the dashboard's list. District and year counts group current listed institutions using the district and implementation date shown for each.",
  sourceUpdatedAt: "25 Nov 2026 (dashboard date)",
  fetchedAt: checked,
} satisfies DataProvenance;

export const eHealthFacilityCounts = [
  { label: "Primary and family health centres", value: 599 },
  { label: "Community health centres", value: 115 },
  { label: "Urban primary health centres", value: 99 },
  { label: "Taluk hospitals", value: 85 },
  { label: "District and general hospitals", value: 33 },
  { label: "Medical college hospitals", value: 19 },
  { label: "Specialty hospitals", value: 16 },
  { label: "Public health laboratories", value: 4 },
  { label: "Other institutions", value: 193 },
] as const;

export const eHealthDistrictCounts = [
  { name: "Alappuzha", value: 72 }, { name: "Ernakulam", value: 140 }, { name: "Idukki", value: 36 },
  { name: "Kannur", value: 76 }, { name: "Kasaragod", value: 43 }, { name: "Kollam", value: 75 },
  { name: "Kottayam", value: 70 }, { name: "Kozhikode", value: 93 }, { name: "Malappuram", value: 113 },
  { name: "Palakkad", value: 82 }, { name: "Pathanamthitta", value: 44 }, { name: "Thiruvananthapuram", value: 158 },
  { name: "Thrissur", value: 117 }, { name: "Wayanad", value: 44 },
] as const;

export const eHealthImplementationCohorts = [
  { year: 2016, value: 10 }, { year: 2017, value: 3 }, { year: 2018, value: 19 }, { year: 2019, value: 57 },
  { year: 2020, value: 86 }, { year: 2021, value: 152 }, { year: 2022, value: 161 }, { year: 2023, value: 114 },
  { year: 2024, value: 65 }, { year: 2025, value: 408 }, { year: 2026, value: 88 },
] as const;

export const eHealthWorkflow = {
  permanentRegistrations: 26956710,
  temporaryRegistrations: 81826659,
  permanentVisits: 85709776,
  temporaryVisits: 197465435,
  inpatientAdmissions: 2217266,
  advanceAppointmentVisits: 2808812,
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
