import type { BriefMetric, BriefReference } from "@/components/SourcedBrief";

type SectorActuals = {
  title: string;
  description: string;
  metrics?: BriefMetric[];
  references: BriefReference[];
};

const checked = "27 Nov 2026";
const reviewVolume = "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume1%20Eng%20final.pdf";
const reviewAppendices = "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf";
const planningBoard = "Kerala State Planning Board";

function source(publisher: string, dataset: string, url: string, period?: string, sourceUpdatedAt: string | null = null) {
  return { source: publisher, dataset, url, period, sourceUpdatedAt, fetchedAt: checked };
}

function figure(label: string, value: string, provenance: BriefMetric["provenance"], note?: string): BriefMetric {
  return { label, value, provenance, note };
}

const annualCrops = source(planningBoard, "Economic Review 2025, Appendix 3.1.4", reviewAppendices, "FY 2024–25");
const winterRice = source("Kerala Department of Economics and Statistics", "Final estimates of winter rice area and production", "https://ecostat.kerala.gov.in/publication-detail/final-estimate-of-area-and-production-of-rice-2025-26-winter-season", "Winter season, FY 2025–26", "13 Jul 2026 (publication)");
const schoolEnrolment = source("Kerala Department of General Education", "Educational Statistics 2024–25, Chapter 3", "https://education.kerala.gov.in/wp-content/uploads/2026/11/Educational-Statistics-2024-25_25112026.pdf", "Academic year 2024–25");
const schoolCounts = source("Ministry of Education · PIB", "UDISE+ annexures to Rajya Sabha reply 1170", "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2291272&lang=2&reg=48", "Academic year 2025–26", "29 Jul 2026 (published reply)");
const pensions = source(planningBoard, "Economic Review 2025, Social Security Pensions", "https://spb.kerala.gov.in/economic-review/ER2025/83.php?pid=83", "October 2025");
const fishProduction = source(planningBoard, "Economic Review 2025, Appendix 3.4.4", reviewAppendices, "FY 2024–25");
const fishExports = source(planningBoard, "Economic Review 2025, Fisheries Development", reviewVolume, "FY 2024–25");
const policeCases = source("Kerala Police", "BNS/IPC crime statistics", "https://keralapolice.gov.in/crime-statistics/ipc-cases", "January–September 2026", "11 Nov 2026");
const policeTotal = source("Kerala Police", "Total BNS/IPC and Special and Local Laws cases", "https://keralapolice.gov.in/crime/total-cases", "January–September 2026", "11 Nov 2026");
const forestCover = source("Forest Survey of India", "India State of Forest Report, Table 10.13.3", "https://fsi.nic.in/uploads/isfr2023/isfr_book_eng-vol-2_2023.pdf", "2023 assessment");
const scholarshipServices = source("Kerala e-Services Dashboard", "Cumulative service applications, eGrantz 3.0", "https://dashboard.kerala.gov.in/e-services/services.php", "Snapshot on 6 May 2026", "6 May 2026, 3:49 pm IST");
const rationCards = source(planningBoard, "Economic Review 2025, Public Distribution System", reviewVolume, "31 March 2025");
const grainDistribution = source(planningBoard, "Economic Review 2025, Public Distribution System", reviewVolume, "FY 2024–25");
const rationTransactions = source("Kerala Civil Supplies Department", "AePDS statewide transaction dashboard", "https://epos.kerala.gov.in/", "November 2026 through the 27 November refresh", "27 Nov 2026, 00:40:02 IST");
const localBodies = source("Comptroller and Auditor General of India", "Local Self-Government Institutions, Table 1.1", "https://cag.gov.in/en/audit-report/details/125849", "August 2025 counts");
const wardDelimitation = source("Directorate of Health Services, Kerala", "DHS/14493/2024-PH5, reorganisation after ward delimitation", "https://ashasoft.kerala.gov.in/uploads/gos/4ca6dda6a289194f67a9.pdf", "Post-delimitation ward count", "19 Mar 2026 (circular)");

export const sectorActuals: Record<string, SectorActuals> = {
  agriculture: {
    title: "Agriculture",
    description: "Kerala’s published paddy area, rice output and crop productivity. The winter figures cover one season of the following financial year.",
    metrics: [
      figure("Wetland paddy area", "1,76,360.38 ha", annualCrops, "FY 2024–25"),
      figure("Wetland rice production", "5,30,223.86 tonnes", annualCrops, "FY 2024–25"),
      figure("Wetland rice productivity", "3,006 kg/ha", annualCrops, "FY 2024–25"),
      figure("Winter wetland rice production", "2,71,223.713 tonnes", winterRice, "Final crop survey, 76,450.82 hectares sown"),
    ],
    references: [
      { title: "Principal crops", description: "Area, production and productivity from the State Planning Board tables.", provenance: annualCrops },
      { title: "Winter season rice returns", description: "District-wise final crop survey figures for 2025–26.", provenance: winterRice },
    ],
  },
  education: {
    title: "Education",
    description: "School enrolment by management and the published UDISE+ count of schools in Kerala.",
    metrics: [
      figure("Pupils in Classes I–X", "36,43,642", schoolEnrolment, "2024–25 · Sixth Working Day census"),
      figure("Pupils in government schools", "11,60,609", schoolEnrolment, "Classes I–X · 31.85% of enrolment"),
      figure("Pupils in government-aided schools", "21,27,066", schoolEnrolment, "Classes I–X · 58.38% of enrolment"),
      figure("Pupils in recognised unaided schools", "3,55,967", schoolEnrolment, "Classes I–X · 9.77% of enrolment"),
      figure("Girls in Classes I–X", "17,89,694", schoolEnrolment, "Boys · 18,53,948"),
      figure("Schools in Kerala", "15,750", schoolCounts, "2025–26 · UDISE+"),
    ],
    references: [
      { title: "Kerala Educational Statistics", description: "School enrolment by class, gender and management in Chapter 3.", provenance: schoolEnrolment },
      { title: "UDISE+ school counts", description: "Kerala’s row in the Ministry of Education’s published parliamentary reply.", provenance: schoolCounts },
    ],
  },
  "social-security": {
    title: "Social Security",
    description: "Published social security pension beneficiary counts and payment channels for Kerala. Welfare board pensions have their own reporting.",
    metrics: [
      figure("Social security pensioners", "49.74 lakh", pensions, "October 2025"),
      figure("Women pensioners", "31.08 lakh", pensions, "62.49% of registered beneficiaries"),
      figure("Beneficiaries paid by bank transfer", "53.56%", pensions, "Other beneficiaries receive payments through the direct-to-home channel"),
      figure("Pension for unmarried women", "81,964", pensions, "October 2025 beneficiary count"),
    ],
    references: [
      { title: "Social security pensions in Kerala", description: "Beneficiary counts, pension categories and payment channels in Economic Review 2025.", provenance: pensions },
    ],
  },
  fisheries: {
    title: "Fisheries",
    description: "Kerala’s reported marine and inland fish production alongside marine product exports.",
    metrics: [
      figure("Total fish production", "9,27,440 tonnes", fishProduction, "FY 2024–25"),
      figure("Marine fish production", "6,47,252 tonnes", fishProduction),
      figure("Inland fish production", "2,80,188 tonnes", fishProduction),
      figure("Marine product exports", "₹6,941.29 crore", fishExports, "1.80 lakh tonnes exported · FY 2024–25"),
    ],
    references: [
      { title: "Fish production by district", description: "Kerala and district totals in the fisheries appendix.", provenance: fishProduction },
      { title: "Marine product exports", description: "Breakdown in the State Planning Board’s fisheries chapter.", provenance: fishExports },
      { title: "Fisheries Department statistics", description: "State production tables, fish seed statistics and related reports.", provenance: source("Kerala Fisheries Department", "Sector statistics", "https://fisheries.kerala.gov.in/en/data") },
    ],
  },
  "home-internal-security": {
    title: "Home & Internal Security",
    description: "Kerala Police’s published counts of cases registered under criminal law and under Special and Local Laws through September 2026.",
    metrics: [
      figure("Cognisable BNS/IPC cases", "1,12,681", policeCases, "Through September 2026"),
      figure("Special and Local Laws cases", "2,09,479", policeTotal, "Through September 2026"),
      figure("Total registered cases", "3,22,160", policeTotal, "BNS/IPC and Special and Local Laws cases combined"),
    ],
    references: [
      { title: "BNS/IPC crime heads", description: "Data by offence type and reporting year from Kerala Police.", provenance: policeCases },
      { title: "Combined registered cases", description: "State totals by legal classification.", provenance: policeTotal },
    ],
  },
  "forest-wildlife": {
    title: "Forest & Wildlife",
    description: "Forest Survey of India measurements for Kerala and official state forestry and wildlife publications.",
    metrics: [
      figure("Forest cover", "22,059.36 km²", forestCover, "56.78% of Kerala’s geographical area"),
      figure("Very dense forest", "2,041.17 km²", forestCover),
      figure("Moderately dense forest", "9,321.82 km²", forestCover),
      figure("Open forest", "10,696.37 km²", forestCover),
    ],
    references: [
      { title: "Forest Survey of India, Kerala chapter", description: "Forest-cover classes and district comparisons in the 2023 assessment.", provenance: forestCover },
      { title: "Kerala Forest Department publications", description: "State forest statistics and wildlife reports.", provenance: source("Kerala Forest & Wildlife Department", "Publications", "https://forest.kerala.gov.in/forestapp/public/publications_more") },
    ],
  },
  "scholarships-grants": {
    title: "Scholarships",
    description: "Published application records for two Scheduled Tribe scholarship services and the official application portal.",
    metrics: [
      figure("ST post-matric applications received", "13,888", scholarshipServices, "Service 1883 · 9,225 approved"),
      figure("ST pre-matric applications received", "42,126", scholarshipServices, "Service 1885 · Classes IX–X · 41,356 approved"),
    ],
    references: [
      { title: "e-Services scholarship records", description: "Application and decision totals for individual services at the last published update.", provenance: scholarshipServices },
      { title: "eGrantz 3.0", description: "Scheme notices, registration and scholarship application status.", provenance: source("Government of Kerala", "eGrantz 3.0", "https://egrantz.kerala.gov.in/") },
    ],
  },
  "food-civil-supplies": {
    title: "Food & Supplies",
    description: "Kerala’s public distribution network, valid ration cards and actual foodgrain distribution.",
    metrics: [
      figure("Ration cards in AePDS", "96,03,758", rationTransactions, "November 2026 snapshot"),
      figure("Cards that availed ration", "61,04,234", rationTransactions, "November 2026 · 63.56% of cards"),
      figure("Fair Price Shops", "13,928", rationTransactions, "November 2026 snapshot"),
      figure("November transactions", "72,28,250", rationTransactions, "Through the 27 November refresh"),
      figure("Valid ration cards", "94.92 lakh", rationCards, "31 March 2025 · NFSA and non-NFSA"),
      figure("Foodgrains distributed through PDS", "13.69 lakh tonnes", grainDistribution, "FY 2024–25"),
    ],
    references: [
      { title: "Public Distribution System, Economic Review 2025", description: "Published ration card, shop network and distribution totals.", provenance: rationCards },
      { title: "Kerala PDS transaction reports", description: "Monthly ration use, transactions and fair price shop reports from the Civil Supplies Department.", provenance: rationTransactions },
    ],
  },
  "municipal-panchayats": {
    title: "Municipalities & Panchayats",
    description: "Published counts of Kerala’s rural and urban local bodies and wards after the delimitation exercise.",
    metrics: [
      figure("Local self-government institutions", "1,200", localBodies, "August 2025"),
      figure("Grama panchayats", "941", localBodies),
      figure("Block panchayats", "152", localBodies),
      figure("District panchayats", "14", localBodies),
      figure("Municipalities and corporations", "87 + 6", localBodies),
      figure("Wards after delimitation", "23,612", wardDelimitation, "Reported in the March 2026 circular"),
    ],
    references: [
      { title: "Local self-government audit", description: "Institution counts published by category in Table 1.1.", provenance: localBodies },
      { title: "Post-delimitation ward count", description: "State circular aligning health service field boundaries to the revised wards.", provenance: wardDelimitation },
      { title: "K-SMART local government services", description: "Official civic service applications and status tracking.", provenance: source("Kerala Local Self Government Department", "K-SMART portal", "https://ksmart.lsgkerala.gov.in/ui/web-portal") },
    ],
  },
  cmdrf: {
    title: "Chief Minister’s Distress Relief Fund",
    description: "Official fund information and the Chief Minister’s Office public service portal.",
    references: [
      { title: "Chief Minister’s Distress Relief Fund", description: "Published fund information and donation transparency records.", provenance: source("Government of Kerala", "CMDRF official portal", "https://donation.cmdrf.kerala.gov.in/") },
      { title: "Chief Minister’s Office public services", description: "Submit a request and check its status through the official service portal.", provenance: source("Chief Minister’s Office", "Public services portal", "https://cmo.kerala.gov.in/") },
    ],
  },
};
