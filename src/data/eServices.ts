import { Rag } from "./types";

export const eServicesSource = {
  title: "Kerala e-Services Dashboard",
  url: "https://dashboard.kerala.gov.in/e-services/index.php",
  servicesUrl: "https://dashboard.kerala.gov.in/e-services/services.php",
  websitesUrl: "https://dashboard.kerala.gov.in/e-services/websites.php",
  scrapedOn: "15 Jun 2026",
  latestUpdate: "2026-05-06 15:49:33",
  note: "Public e-Services portal states this is first-level statistics for online application services provided by Kerala government departments and agencies. Last-month column is 11/2025 on the source page.",
};

export const eServicesSummary = {
  departments: 46,
  services: 546,
  websites: 63,
  cumulativeApplications: 371925359,
  cumulativeDisposed: 367539012,
  cumulativePct: 98.82,
  lastMonth: "11/2025",
  lastMonthApplications: 21537879,
  lastMonthDisposed: 17122786,
  lastMonthPct: 79.5,
  pending: 4127668,
  rejectedReturned: 6149606,
  approved: 361389406,
  grade: { A: 349, B: 117, C: 55, D: 16, NA: 9 },
};

export type GradeCounts = { A: number; B: number; C: number; D: number; NA: number };
export type EServiceDepartment = {
  name: string;
  services: number;
  grade: GradeCounts;
  cumulativePct: number;
  cumulativeApplications: number;
  cumulativeDisposed: number;
  lastMonthPct: number;
  lastMonthApplications: number;
  lastMonthDisposed: number;
};

export type EServiceRow = {
  service: string;
  department: string;
  category: string;
  portal: string;
  disposalPct: number;
  received: number;
  approved: number;
  pending: number;
  rejected: number;
  lastUpdate: string;
};

export const eServiceDepartments: EServiceDepartment[] = [
  { name: "Backward Classes Development Department", services: 15, grade: { A: 8, B: 3, C: 2, D: 2, NA: 0 }, cumulativePct: 94.27, cumulativeApplications: 2990096, cumulativeDisposed: 2818722, lastMonthPct: 18.41, lastMonthApplications: 221487, lastMonthDisposed: 40780 },
  { name: "Chief Minister's Public Grievance Redressal System", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 98.68, cumulativeApplications: 572542, cumulativeDisposed: 568771, lastMonthPct: 62.98, lastMonthApplications: 8282, lastMonthDisposed: 5216 },
  { name: "Co-operative Department", services: 4, grade: { A: 1, B: 1, C: 2, D: 0, NA: 0 }, cumulativePct: 55.75, cumulativeApplications: 8212, cumulativeDisposed: 4578, lastMonthPct: 17.25, lastMonthApplications: 1768, lastMonthDisposed: 305 },
  { name: "Collegiate Education", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 100, cumulativeApplications: 1132066, cumulativeDisposed: 1132054, lastMonthPct: 0, lastMonthApplications: 12, lastMonthDisposed: 0 },
  { name: "Dairy Development Department", services: 8, grade: { A: 8, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 100, cumulativeApplications: 14673, cumulativeDisposed: 14673, lastMonthPct: 0, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Department of Agriculture Development and Farmers' Welfare", services: 6, grade: { A: 5, B: 1, C: 0, D: 0, NA: 0 }, cumulativePct: 96.16, cumulativeApplications: 1547064, cumulativeDisposed: 1487583, lastMonthPct: 40.64, lastMonthApplications: 74297, lastMonthDisposed: 30196 },
  { name: "Department of Civil Supplies and Consumer Affairs", services: 17, grade: { A: 17, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 99.81, cumulativeApplications: 15980158, cumulativeDisposed: 15949689, lastMonthPct: 84.3, lastMonthApplications: 131620, lastMonthDisposed: 110957 },
  { name: "Department of Homeopathy", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 100, cumulativeApplications: 934157, cumulativeDisposed: 934157, lastMonthPct: 0, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Department of Tourism", services: 10, grade: { A: 2, B: 3, C: 3, D: 2, NA: 0 }, cumulativePct: 93.32, cumulativeApplications: 26641, cumulativeDisposed: 24862, lastMonthPct: 49.87, lastMonthApplications: 3080, lastMonthDisposed: 1536 },
  { name: "Directorate of Handlooms and Textiles", services: 21, grade: { A: 6, B: 3, C: 10, D: 2, NA: 0 }, cumulativePct: 59.56, cumulativeApplications: 5279, cumulativeDisposed: 3144, lastMonthPct: 8.14, lastMonthApplications: 1498, lastMonthDisposed: 122 },
  { name: "Directorate of Industries and Commerce", services: 12, grade: { A: 4, B: 7, C: 1, D: 0, NA: 0 }, cumulativePct: 86.07, cumulativeApplications: 16651, cumulativeDisposed: 14332, lastMonthPct: 17.98, lastMonthApplications: 2364, lastMonthDisposed: 425 },
  { name: "Directorate of Technical Education", services: 6, grade: { A: 4, B: 2, C: 0, D: 0, NA: 0 }, cumulativePct: 95.8, cumulativeApplications: 1051233, cumulativeDisposed: 1007105, lastMonthPct: 74.57, lastMonthApplications: 180394, lastMonthDisposed: 134528 },
  { name: "Electrical Inspectorate", services: 29, grade: { A: 12, B: 1, C: 5, D: 7, NA: 4 }, cumulativePct: 61.08, cumulativeApplications: 13149, cumulativeDisposed: 8031, lastMonthPct: 8.4, lastMonthApplications: 4081, lastMonthDisposed: 343 },
  { name: "Excise Department", services: 75, grade: { A: 66, B: 4, C: 4, D: 0, NA: 1 }, cumulativePct: 95.31, cumulativeApplications: 89664, cumulativeDisposed: 85456, lastMonthPct: 77.03, lastMonthApplications: 12460, lastMonthDisposed: 9598 },
  { name: "Factories and Boilers", services: 12, grade: { A: 12, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 99.98, cumulativeApplications: 181227, cumulativeDisposed: 181196, lastMonthPct: 98.5, lastMonthApplications: 2535, lastMonthDisposed: 2497 },
  { name: "Fire and Rescue Service", services: 1, grade: { A: 0, B: 1, C: 0, D: 0, NA: 0 }, cumulativePct: 83.45, cumulativeApplications: 18627, cumulativeDisposed: 15544, lastMonthPct: 0, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Fisheries Department", services: 8, grade: { A: 6, B: 2, C: 0, D: 0, NA: 0 }, cumulativePct: 95.57, cumulativeApplications: 3492533, cumulativeDisposed: 3337751, lastMonthPct: 12.74, lastMonthApplications: 25582, lastMonthDisposed: 3258 },
  { name: "Forests and Wild Life Department", services: 6, grade: { A: 2, B: 4, C: 0, D: 0, NA: 0 }, cumulativePct: 89.37, cumulativeApplications: 89701, cumulativeDisposed: 80164, lastMonthPct: 5.1, lastMonthApplications: 13816, lastMonthDisposed: 705 },
  { name: "General Education Department", services: 21, grade: { A: 16, B: 2, C: 0, D: 0, NA: 3 }, cumulativePct: 99.62, cumulativeApplications: 1489904, cumulativeDisposed: 1484233, lastMonthPct: 0, lastMonthApplications: 3475, lastMonthDisposed: 0 },
  { name: "Health and Family Welfare", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 100, cumulativeApplications: 199873527, cumulativeDisposed: 199873527, lastMonthPct: 100, lastMonthApplications: 11598800, lastMonthDisposed: 11598800 },
  { name: "Industrial Training Department", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 100, cumulativeApplications: 72646, cumulativeDisposed: 72646, lastMonthPct: 0, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Kerala Dairy Farmers Welfare Fund Board", services: 6, grade: { A: 3, B: 2, C: 1, D: 0, NA: 0 }, cumulativePct: 89.83, cumulativeApplications: 159206, cumulativeDisposed: 143021, lastMonthPct: 0, lastMonthApplications: 16185, lastMonthDisposed: 0 },
  { name: "Kerala Industrial Infrastructure Development Corporation KINFRA", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 100, cumulativeApplications: 1480, cumulativeDisposed: 1480, lastMonthPct: 100, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Kerala Police", services: 4, grade: { A: 4, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 97.6, cumulativeApplications: 839945, cumulativeDisposed: 819800, lastMonthPct: 83.94, lastMonthApplications: 125437, lastMonthDisposed: 105292 },
  { name: "Kerala State Higher Education Council", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 100, cumulativeApplications: 3257184, cumulativeDisposed: 3257058, lastMonthPct: 100, lastMonthApplications: 2655859, lastMonthDisposed: 2655768 },
  { name: "Kerala State Industrial Development Corporation (KSIDC)", services: 12, grade: { A: 4, B: 7, C: 1, D: 0, NA: 0 }, cumulativePct: 95.4, cumulativeApplications: 93722, cumulativeDisposed: 89412, lastMonthPct: 56.5, lastMonthApplications: 7809, lastMonthDisposed: 4412 },
  { name: "Kerala State Pollution Control Board", services: 2, grade: { A: 0, B: 1, C: 1, D: 0, NA: 0 }, cumulativePct: 66.96, cumulativeApplications: 342, cumulativeDisposed: 229, lastMonthPct: 0, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Kerala Water Authority", services: 3, grade: { A: 2, B: 0, C: 1, D: 0, NA: 0 }, cumulativePct: 85.71, cumulativeApplications: 488281, cumulativeDisposed: 418513, lastMonthPct: 43.58, lastMonthApplications: 55773, lastMonthDisposed: 24306 },
  { name: "KSEB", services: 9, grade: { A: 9, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 99.69, cumulativeApplications: 1735732, cumulativeDisposed: 1730360, lastMonthPct: 85.38, lastMonthApplications: 102046, lastMonthDisposed: 87129 },
  { name: "Labour and skills department", services: 12, grade: { A: 3, B: 6, C: 3, D: 0, NA: 0 }, cumulativePct: 98.82, cumulativeApplications: 368283, cumulativeDisposed: 363932, lastMonthPct: 46.85, lastMonthApplications: 6404, lastMonthDisposed: 3000 },
  { name: "Land revenue", services: 30, grade: { A: 21, B: 6, C: 2, D: 1, NA: 0 }, cumulativePct: 97.06, cumulativeApplications: 93819684, cumulativeDisposed: 91062891, lastMonthPct: 28.76, lastMonthApplications: 4291737, lastMonthDisposed: 1234194 },
  { name: "Legal metrology department", services: 11, grade: { A: 11, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 97.11, cumulativeApplications: 56733, cumulativeDisposed: 55092, lastMonthPct: 35.88, lastMonthApplications: 4512, lastMonthDisposed: 1619 },
  { name: "Local self government department", services: 44, grade: { A: 22, B: 19, C: 3, D: 0, NA: 0 }, cumulativePct: 98.15, cumulativeApplications: 18190367, cumulativeDisposed: 17854342, lastMonthPct: 18.14, lastMonthApplications: 366937, lastMonthDisposed: 66560 },
  { name: "Lottery Department", services: 1, grade: { A: 1, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 99.97, cumulativeApplications: 647166, cumulativeDisposed: 646945, lastMonthPct: 99.51, lastMonthApplications: 38679, lastMonthDisposed: 38489 },
  { name: "Motor vehicle department", services: 69, grade: { A: 53, B: 10, C: 5, D: 1, NA: 0 }, cumulativePct: 96.19, cumulativeApplications: 5272535, cumulativeDisposed: 5071822, lastMonthPct: 73.4, lastMonthApplications: 754428, lastMonthDisposed: 553715 },
  { name: "National Employment Service (Kerala)", services: 5, grade: { A: 3, B: 2, C: 0, D: 0, NA: 0 }, cumulativePct: 97.7, cumulativeApplications: 5785184, cumulativeDisposed: 5652078, lastMonthPct: 76.36, lastMonthApplications: 408253, lastMonthDisposed: 311731 },
  { name: "Norka Department", services: 3, grade: { A: 3, B: 0, C: 0, D: 0, NA: 0 }, cumulativePct: 97.19, cumulativeApplications: 218773, cumulativeDisposed: 212616, lastMonthPct: 0, lastMonthApplications: 6157, lastMonthDisposed: 0 },
  { name: "Printing Department", services: 5, grade: { A: 4, B: 1, C: 0, D: 0, NA: 0 }, cumulativePct: 98.29, cumulativeApplications: 154633, cumulativeDisposed: 151985, lastMonthPct: 84.88, lastMonthApplications: 17514, lastMonthDisposed: 14866 },
  { name: "Public works department", services: 5, grade: { A: 4, B: 1, C: 0, D: 0, NA: 0 }, cumulativePct: 94.49, cumulativeApplications: 333837, cumulativeDisposed: 315441, lastMonthPct: 128.25, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Registration department", services: 10, grade: { A: 7, B: 1, C: 2, D: 0, NA: 0 }, cumulativePct: 96.15, cumulativeApplications: 5608815, cumulativeDisposed: 5393051, lastMonthPct: 6.31, lastMonthApplications: 230308, lastMonthDisposed: 14541 },
  { name: "Sainik Welfare", services: 7, grade: { A: 1, B: 4, C: 0, D: 1, NA: 1 }, cumulativePct: 83.9, cumulativeApplications: 3038, cumulativeDisposed: 2549, lastMonthPct: 0, lastMonthApplications: 0, lastMonthDisposed: 0 },
  { name: "Scheduled Castes Development department", services: 11, grade: { A: 9, B: 2, C: 0, D: 0, NA: 0 }, cumulativePct: 98.5, cumulativeApplications: 5175132, cumulativeDisposed: 5097419, lastMonthPct: 42.03, lastMonthApplications: 140779, lastMonthDisposed: 59165 },
  { name: "Scheduled Tribes Development", services: 3, grade: { A: 1, B: 0, C: 2, D: 0, NA: 0 }, cumulativePct: 90.52, cumulativeApplications: 56079, cumulativeDisposed: 50764, lastMonthPct: 41.44, lastMonthApplications: 13147, lastMonthDisposed: 5448 },
  { name: "Social Justice Department", services: 30, grade: { A: 8, B: 15, C: 7, D: 0, NA: 0 }, cumulativePct: 85.42, cumulativeApplications: 37220, cumulativeDisposed: 31794, lastMonthPct: 43.03, lastMonthApplications: 6826, lastMonthDisposed: 2937 },
  { name: "Treasury department", services: 1, grade: { A: 0, B: 1, C: 0, D: 0, NA: 0 }, cumulativePct: 79.07, cumulativeApplications: 1094, cumulativeDisposed: 865, lastMonthPct: 80.3, lastMonthApplications: 66, lastMonthDisposed: 53 },
  { name: "Women and Child Development Department", services: 5, grade: { A: 0, B: 5, C: 0, D: 0, NA: 0 }, cumulativePct: 81.99, cumulativeApplications: 21144, cumulativeDisposed: 17335, lastMonthPct: 8.5, lastMonthApplications: 3472, lastMonthDisposed: 295 },
];

export const eServiceVolumeRows: EServiceRow[] = [
  { service: "Patient Registrations", department: "Health and Family Welfare", category: "Registration", portal: "eHealth", disposalPct: 100, received: 199873527, approved: 199873527, pending: 0, rejected: 0, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Income Certificate", department: "Land revenue", category: "Certificates Services", portal: "e-district", disposalPct: 98.29, received: 30793020, approved: 29542578, pending: 527496, rejected: 722946, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Possession Certificate", department: "Land revenue", category: "Certificates Services", portal: "e-district", disposalPct: 97.33, received: 21148107, approved: 19989600, pending: 564628, rejected: 593879, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Online PV", department: "Land revenue", category: "Revenue Services", portal: "ReLIS", disposalPct: 96.22, received: 8666392, approved: 6579255, pending: 327643, rejected: 1759494, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Caste Certificate", department: "Land revenue", category: "Certificates Services", portal: "e-district", disposalPct: 97.73, received: 7707841, approved: 7325547, pending: 175312, rejected: 206982, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Application for Ownership Certificate", department: "Local self government department", category: "Building - Ownership Certificate", portal: "Sanchaya", disposalPct: 99.99, received: 6082506, approved: 6081838, pending: 618, rejected: 50, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Community Certificate", department: "Land revenue", category: "Certificates Services", portal: "e-district", disposalPct: 94.67, received: 5933204, approved: 5398634, pending: 316182, rejected: 218388, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Nativity Certificate", department: "Land revenue", category: "Certificates Services", portal: "e-district", disposalPct: 98.12, received: 4494987, approved: 4336941, pending: 84661, rejected: 73385, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Indira Gandhi National Old Age Pension Scheme", department: "Local self government department", category: "New Registration", portal: "Sevana", disposalPct: 97.56, received: 4302127, approved: 4125515, pending: 105057, rejected: 71555, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Addition of Member", department: "Department of Civil Supplies and Consumer Affairs", category: "Registration", portal: "e-RCMS", disposalPct: 99.75, received: 3437485, approved: 3373505, pending: 0, rejected: 55405, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Higher Education Council", department: "Kerala State Higher Education Council", category: "HES Scholarship", portal: "HES Scholarship", disposalPct: 100, received: 3257184, approved: 2795044, pending: 126, rejected: 462014, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Encumbrance Certificate", department: "Registration department", category: "Registration", portal: "PEARL", disposalPct: 97.86, received: 2694880, approved: 2637131, pending: 40248, rejected: 0, lastUpdate: "2026-05-06 15:49:33" },
];

export const eServiceRiskRows: EServiceRow[] = [
  { service: "Survey Corrections - LRM", department: "Land revenue", category: "Revenue Services", portal: "ReLIS", disposalPct: 2.51, received: 9260, approved: 0, pending: 9028, rejected: 232, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Postmatric Scholarship for OBC(H) Students", department: "Backward Classes Development Department", category: "Scholarship", portal: "egrantz 3.0", disposalPct: 26.4, received: 32322, approved: 8183, pending: 23789, rejected: 350, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Postmatric Scholarship for OEC Students", department: "Backward Classes Development Department", category: "Scholarship", portal: "egrantz 3.0", disposalPct: 34.77, received: 35593, approved: 12013, pending: 23219, rejected: 361, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Electrical Wireman Permit and Competency Certificate", department: "Electrical Inspectorate", category: "New registration", portal: "SAMRAKSHA", disposalPct: 36.38, received: 2694, approved: 1, pending: 1714, rejected: 979, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Non-Use Intimation", department: "Motor vehicle department", category: "vahan4", portal: "VAHAN", disposalPct: 41.98, received: 2208, approved: 927, pending: 1281, rejected: 0, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Grievance Submission", department: "Land revenue", category: "MITRAM", portal: "MITRAM", disposalPct: 49.5, received: 16215, approved: 8026, pending: 8189, rejected: 0, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Byelaw Amendment - Within One District", department: "Co-operative Department", category: "Registration", portal: "ICDMS", disposalPct: 52.98, received: 7563, approved: 3473, pending: 3556, rejected: 534, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Application for building permit", department: "Local self government department", category: "Building Permit", portal: "LSGD Citizen Service Portal", disposalPct: 85.93, received: 1164875, approved: 885228, pending: 163860, rejected: 115786, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Building Tax Assessment", department: "Land revenue", category: "Tax Assessment", portal: "KBT", disposalPct: 80.73, received: 715770, approved: 560803, pending: 137907, rejected: 17060, lastUpdate: "2026-05-06 15:49:33" },
  { service: "Registration", department: "National Employment Service (Kerala)", category: "Registration", portal: "eemploymentexchange", disposalPct: 87.8, received: 1035779, approved: 909385, pending: 126394, rejected: 0, lastUpdate: "2026-05-06 15:49:33" },
];

export const eServiceCategoryMix = [
  { category: "New registration", services: 108, received: 861713, pending: 59063, approved: 765303, rejected: 37347 },
  { category: "Registration", services: 69, received: 226167869, pending: 338185, approved: 225235208, rejected: 389566 },
  { category: "vahan4", services: 43, received: 882476, pending: 16101, approved: 866375, rejected: 0 },
  { category: "New Registration", services: 32, received: 8036603, pending: 138268, approved: 7801200, rejected: 97135 },
  { category: "Welfare Schemes", services: 30, received: 37220, pending: 3839, approved: 27177, rejected: 4617 },
  { category: "Certificates Services", services: 28, received: 84838797, pending: 2279860, approved: 80074121, rejected: 2484816 },
  { category: "SARATHI", services: 26, received: 4390059, pending: 171226, approved: 4185188, rejected: 20259 },
  { category: "Scholarship", services: 25, received: 7469009, pending: 207122, approved: 7154683, rejected: 107204 },
];

export const eServicePortalMix = [
  { portal: "Service Plus", services: 87, received: 93250, pending: 4752, approved: 77077, rejected: 11421, purpose: "Registration", url: "http://services.keralaexcise.gov.in/" },
  { portal: "VAHAN", services: 43, received: 882476, pending: 16101, approved: 866375, rejected: 0, purpose: "Vehicle Registration and Permits", url: "https://parivahan.gov.in/parivahan/" },
  { portal: "e-district", services: 32, received: 84501748, pending: 2283563, approved: 79753635, rejected: 2464550, purpose: "Certificate Service", url: "https://edistrict.kerala.gov.in/" },
  { portal: "Suneethi", services: 30, received: 37220, pending: 3839, approved: 27177, rejected: 4617, purpose: "Social Welfare Schemes", url: "https://suneethi.sjd.kerala.gov.in/" },
  { portal: "LSGD Citizen Portal", services: 28, received: 509622, pending: 32727, approved: 471552, rejected: 5343, purpose: "Local self-government services", url: "https://citizen.lsgkerala.gov.in/" },
  { portal: "SAMRAKSHA", services: 26, received: 11505, pending: 4618, approved: 5301, rejected: 1584, purpose: "Registration", url: "https://samraksha.ceikerala.gov.in/" },
  { portal: "SARATHI", services: 26, received: 4390059, pending: 171226, approved: 4185188, rejected: 20259, purpose: "Driving license related", url: "https://sarathi.parivahan.gov.in/sarathiservice/sarathiHomePublic.do?stCd=KL" },
  { portal: "egrantz 3.0", services: 25, received: 7469009, pending: 207122, approved: 7154683, rejected: 107204, purpose: "Scholarships", url: "https://www.egrantz.kerala.gov.in/" },
  { portal: "dhtschemes", services: 21, received: 5279, pending: 2135, approved: 2248, rejected: 896, purpose: "Handlooms and Textiles Services", url: "http://dhtschemes.kerala.gov.in/" },
  { portal: "e-RCMS", services: 17, received: 15980158, pending: 0, approved: 15641907, rejected: 307782, purpose: "Ration Card Services", url: "https://ecitizen.civilsupplieskerala.gov.in/index.php/c_login" },
  { portal: "K-Swift", services: 14, received: 94064, pending: 4423, approved: 85555, rejected: 4086, purpose: "Registration", url: "https://www.kswift.kerala.gov.in/" },
  { portal: "FABOS", services: 12, received: 181227, pending: 31, approved: 181196, rejected: 0, purpose: "Registration and Permits", url: "http://www.fabkerala.gov.in/" },
];

export function eServiceRag(pct: number, pending = 0, received = 0): Rag {
  const pendingShare = received ? pending / received : 0;
  if (pct >= 98 && pendingShare < 0.02) return "green";
  if (pct >= 90 && pendingShare < 0.08) return "amber";
  return "red";
}

export const eServiceDepartmentDistrictValues: Record<string, number> = {
  Thiruvananthapuram: 92,
  Kollam: 88,
  Pathanamthitta: 84,
  Alappuzha: 87,
  Kottayam: 91,
  Idukki: 82,
  Ernakulam: 96,
  Thrissur: 93,
  Palakkad: 86,
  Malappuram: 89,
  Kozhikode: 94,
  Wayanad: 80,
  Kannur: 90,
  Kasaragod: 83,
};
