import type { DataProvenance } from "@/components/DataProvenance";

export type TransportSource = DataProvenance & { url: string; dataset: string; period: string };

export const transportSourcesCheckedOn = "27 Nov 2026";

const review = "https://spb.kerala.gov.in/economic-review/ER2025";

function economicReview(source: string, dataset: string, path: string, period: string, basis: string): TransportSource {
  return {
    source: `${source} · Kerala State Planning Board`,
    dataset: `Economic Review 2025 · ${dataset}`,
    url: `${review}/${path}`,
    period,
    basis,
    sourceUpdatedAt: "4 Feb 2026 (report publication notice)",
  };
}

export const transportSources = {
  roadNetwork: economicReview("PWD, NHAI, LSGD and Forest Department", "Table 11.1.2", "111.php?pid=111", "August 2025", "Reported classified and non-classified road length"),
  registrations: economicReview("Motor Vehicles Department", "Appendix 11.1.10", "appendix/11110.html", "FY 2019–20 to FY 2024–25", "Registered vehicle stock at financial year-end"),
  newRegistrations: economicReview("Motor Vehicles Department", "Appendix 11.1.8", "appendix/1118.html", "FY 2024–25", "New registrations during the financial year"),
  roadSafety: {
    source: "Kerala Police · State Crime Records Bureau", dataset: "Road accident statistics", url: "https://keralapolice.gov.in/crime/road-accidents", period: "2023 to August 2026", basis: "Reported road accidents, deaths and injuries", sourceUpdatedAt: "6 Oct 2026",
  },
  bus: economicReview("KSRTC", "Appendix 11.1.19", "appendix/11119.html", "31 March 2025", "Buses held and schedules by district"),
  busFleet: economicReview("KSRTC", "Appendix 11.1.16", "appendix/11116.html", "FY 2024–25", "Annual operating indicators reported by KSRTC"),
  busRidership: {
    source: "KSRTC · Kerala State Planning Board", dataset: "Kerala Development Report 2026 · Table 21.4", url: "https://spb.kerala.gov.in/wp-content/uploads/2026/01/kerala-development-report_2026.pdf", period: "2023 to 2025", basis: "Annual average daily passengers, in lakh",
  },
  ferry: economicReview("State Water Transport Department", "Appendix 11.1.31", "appendix/11131.html", "FY 2024–25", "Ferry operations reported by SWTD"),
  waterMetro: {
    source: "Kochi Water Metro", dataset: "Ridership updates", url: "https://watermetro.co.in/", period: "25 Nov 2026", basis: "Daily and cumulative passenger counts displayed by the operator", sourceUpdatedAt: "25 Nov 2026 (ridership snapshot)",
  },
  metroRail: {
    source: "Kochi Metro Rail Limited", dataset: "KMRL Ridership Details", url: "https://kochimetro.org/ridership/", period: "January to April 2026", basis: "Monthly passengers, compared with the same months in 2025",
  },
  rail: {
    source: "Indian Railways · Railway Board", dataset: "Indian Railways Year Book 2024–25 · State-wise kilometrage", url: "https://rb.indianrailways.gov.in/public/cms/pdf/reports/Indian_Railways_Annual_Statistical_Statements%2C_2024-25_%28Bilingual%29/Indian_Railways_Year_Book%2C_2024-25_%28English%29/2026/06/1782386987161INDIAN_RAILWAYS_YEAR_BOOK%2C_2024-25_ENGLISH.pdf", period: "31 March 2025", basis: "Route and track length in Kerala",
  },
  airport: {
    source: "Cochin International Airport Limited", dataset: "32nd Annual Report · Aircraft & Passenger Movement", url: "https://www.cial.aero/ckeditor/upload/CIAL_Annual_Report_2025_2026.pdf", period: "FY 2025–26", basis: "Passenger and aircraft movements at Cochin International Airport",
  },
  pwdDistricts: economicReview("PWD Roads Wing", "Appendix 11.1.3", "appendix/1113.html", "2025 inventory", "Maintained State Highways and Major District Roads"),
  pwdSurface: economicReview("PWD Roads Wing", "Kerala transport chapter", "111.php?pid=111", "FY 2024–25", "Reported Bituminous Macadam and Bituminous Concrete (BMBC) road length"),
  pwdBridges: economicReview("PWD Bridges Wing", "Appendix 11.1.5", "appendix/1115.html", "31 August 2025", "Bridge inventory by road category"),
  pwdCompletions: economicReview("PWD Bridges Wing", "Kerala transport chapter", "111.php?pid=111", "FY 2024–25", "Bridges whose construction was completed"),
  rebuild: {
    source: "Rebuild Kerala Initiative · Kerala State Planning Board", dataset: "Economic Review 2025 · Rebuild Kerala Development Programme", url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume1%20Eng%20final.pdf", period: "October 2025", basis: "Reported completed works under the Rebuild Kerala Initiative", sourceUpdatedAt: "4 Feb 2026 (report publication notice)",
  },
  openings: {
    source: "Press Information Bureau", dataset: "New India Samachar · Kerala project inaugurations", url: "https://newindiasamachar.pib.gov.in/WriteReadData/flipbook/2026/Apr/1st/English/files/basic-html/page37.html", period: "11 March 2026", basis: "Completed works inaugurated on that date", sourceUpdatedAt: "1–15 Apr 2026 (issue date)",
  },
} satisfies Record<string, TransportSource>;

export const transportDirectory = {
  href: "/sectors/transportation",
  title: "Transportation",
  summary: "Published figures for roads, registered vehicles, road safety, buses, rail, ferries and aviation.",
};

export const roadNetworkKm = 197448.34;
export const roadsByAgency = [
  { label: "Local self-governments", value: 158078.79, color: "#0e7490" },
  { label: "Public Works Department", value: 29573, color: "#2563eb" },
  { label: "Forest Department", value: 5189.35, color: "#047857" },
  { label: "Other agencies", value: 2749.04, color: "#64748b" },
  { label: "National Highways", value: 1858, color: "#7c3aed" },
];

export const registeredVehicles = [
  { label: "2019–20", value: 14478275 },
  { label: "2020–21", value: 15142047 },
  { label: "2021–22", value: 15872987 },
  { label: "2022–23", value: 16664475 },
  { label: "2023–24", value: 17408542 },
  { label: "2024–25", value: 18197585 },
];
export const newVehicleRegistrations = 789037;

export const roadAccidents = [
  { period: "2023", accidents: 48068, deaths: 4084, injuries: 54286 },
  { period: "2024", accidents: 48834, deaths: 3880, injuries: 54796 },
  { period: "2025", accidents: 49889, deaths: 3733, injuries: 56922 },
  { period: "Jan–Aug 2026", accidents: 35873, deaths: 2702, injuries: 41040 },
];

export const ksrtcDistricts = [
  { district: "Thiruvananthapuram", buses: 920, schedules: 1186 },
  { district: "Kollam", buses: 556, schedules: 520 },
  { district: "Pathanamthitta", buses: 239, schedules: 221 },
  { district: "Alappuzha", buses: 351, schedules: 331 },
  { district: "Kottayam", buses: 381, schedules: 336 },
  { district: "Ernakulam", buses: 460, schedules: 425 },
  { district: "Idukki", buses: 221, schedules: 195 },
  { district: "Thrissur", buses: 263, schedules: 223 },
  { district: "Palakkad", buses: 206, schedules: 180 },
  { district: "Malappuram", buses: 154, schedules: 130 },
  { district: "Kozhikode", buses: 230, schedules: 214 },
  { district: "Kannur", buses: 233, schedules: 211 },
  { district: "Kasaragod", buses: 151, schedules: 136 },
  { district: "Wayanad", buses: 244, schedules: 203 },
];

export const ksrtcTotals = { buses: 4609, schedules: 4511, averageFleetOperated: 4228, averageDailyPassengersLakh: 20.3, occupancy: 73.4 };

export const ferryTotals = { passengersLakh: 106.05, boatsOperated: 65, scheduledTrips: 296975 };
export const waterMetroTotals = { dailyPassengers: 4959, cumulativePassengers: 8174666 };

export const kochiMetro = [
  { month: "January", prior: 3159874, current: 3272067 },
  { month: "February", prior: 2622156, current: 2685765 },
  { month: "March", prior: 2569732, current: 2812607 },
  { month: "April", prior: 2805294, current: 2916747 },
];

export const railKilometres = { route: 1048, runningTrack: 1766, totalTrack: 2126 };
export const cochinAirport = { passengers: 11442583, domesticPassengers: 6040644, internationalPassengers: 5401939, aircraftMovements: 73134, priorYearPassengers: 11195965 };

export const pwdRoadDistricts = [
  { district: "Thiruvananthapuram", highwayKm: 226.05, districtRoadKm: 2154.46, totalKm: 2380.51 },
  { district: "Kollam", highwayKm: 149.06, districtRoadKm: 1776.43, totalKm: 1925.49 },
  { district: "Alappuzha", highwayKm: 169.87, districtRoadKm: 1236.95, totalKm: 1406.82 },
  { district: "Pathanamthitta", highwayKm: 249.21, districtRoadKm: 1745.46, totalKm: 1994.67 },
  { district: "Kottayam", highwayKm: 340.04, districtRoadKm: 2971.8, totalKm: 3311.84 },
  { district: "Idukki", highwayKm: 872.53, districtRoadKm: 1790.15, totalKm: 2662.68 },
  { district: "Ernakulam", highwayKm: 401.97, districtRoadKm: 2563.92, totalKm: 2965.89 },
  { district: "Thrissur", highwayKm: 379.62, districtRoadKm: 1554.12, totalKm: 1933.74 },
  { district: "Palakkad", highwayKm: 215.55, districtRoadKm: 1887.69, totalKm: 2103.24 },
  { district: "Malappuram", highwayKm: 384.05, districtRoadKm: 1992.62, totalKm: 2376.67 },
  { district: "Kozhikode", highwayKm: 208.83, districtRoadKm: 1744.79, totalKm: 1953.62 },
  { district: "Wayanad", highwayKm: 145.71, districtRoadKm: 731.29, totalKm: 877 },
  { district: "Kannur", highwayKm: 243.55, districtRoadKm: 1991.69, totalKm: 2235.24 },
  { district: "Kasaragod", highwayKm: 141.79, districtRoadKm: 1303.95, totalKm: 1445.74 },
];

export const pwdRoadTotals = { totalKm: 29573.15, highwayKm: 4127.83, districtRoadKm: 25445.32, bmbcKm: 17749.11 };
export const pwdBridges = [
  { label: "Major District Roads", value: 2145, color: "#c2410c" },
  { label: "State Highways", value: 550, color: "#a16207" },
  { label: "Other roads and rail overbridges", value: 154, color: "#0f766e" },
];
export const pwdBridgeTotal = 2849;
export const completedPwdBridges = 12;
export const rebuildCompletions = { kstpPwdWorks: 18, localRoadWorks: 346, villageOffices: 239, otherRevenueBuildings: 22 };

export const highwayOpenings = [
  { name: "NH-66 Thalapady–Chengala", work: "Six-lane highway section inaugurated" },
  { name: "Kozhikode bypass, Vengalam–Ramanattukara", work: "Six-lane bypass inaugurated" },
  { name: "Pradhan Mantri Gram Sadak Yojana", work: "23 completed rural roads inaugurated" },
];
