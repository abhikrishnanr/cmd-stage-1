import type { TransportSource } from "./transportActuals";

export const majorProjectSectors = ["Roads", "Rail and metro", "Ports and waterways", "Aviation", "Water and sanitation"] as const;
export type MajorProjectStage = "Works in progress" | "Contract awarded" | "Sanctioned" | "Operational" | "Completed";

type MajorProject = {
  id: string;
  name: string;
  sector: (typeof majorProjectSectors)[number];
  location: string;
  districts?: string[];
  stage: MajorProjectStage;
  summary: string;
  measure?: { label: string; value: string };
  source: TransportSource;
};

const sources = {
  kozhikodeWater: {
    source: "Kerala Water Authority · PASK", dataset: "Koyilandy municipality water supply scheme · status update",
    url: "https://pask.kwa.kerala.gov.in/project/mainstatus/reference/7fb0e93718cc2bbf2ad75d2dfb497c77h4OKfIo", period: "13 Nov 2026", sourceUpdatedAt: "13 Nov 2026",
  },
  waste: {
    source: "World Bank · Implementation Status and Results Report", dataset: "Kerala Solid Waste Management Project · P168633",
    url: "https://documents1.worldbank.org/curated/en/099111326124567514/pdf/P168633-fcd1c97c-66b8-4bbc-9ad3-34dc9f67edeb.pdf", period: "13 Nov 2026", sourceUpdatedAt: "13 Nov 2026",
  },
  capitalSewer: {
    source: "Kerala Water Authority · PASK", dataset: "AMRUT 2.0 Block N sewerage · status updates",
    url: "https://pask.kwa.kerala.gov.in/project/statusupdations/reference/df0e19d29493ef2136fc3e2fc029c054h4SFeYc", period: "6 Nov 2026", sourceUpdatedAt: "6 Nov 2026",
  },
  vizhinjamExim: {
    source: "Vizhinjam International Seaport Limited", dataset: "Port development and operations overview",
    url: "https://vizhinjamport.in/", period: "August 2026",
  },
  vizhinjamExpansion: {
    source: "Adani Ports and Special Economic Zone", dataset: "FY 2025–26 integrated annual report · Vizhinjam operations",
    url: "https://www.adaniports.com/digital-reports/ports/2026/operational-performance-ports.html", period: "FY 2025–26",
  },
  highwayDrainage: {
    source: "National Highways Authority of India · PIB", dataset: "NH-66 drainage works sanction",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2298533&lang=2&reg=48", period: "12 Aug 2026", sourceUpdatedAt: "12 Aug 2026",
  },
  metroTrack: {
    source: "Kochi Metro Rail Limited · AIIB", dataset: "KBT 01 contract award notice",
    url: "https://www.aiib.org/en/projects/details/2026/_download/India/Kochi-Metro-Rail-Project-Phase-IIKBT-01_Contract_AwardGoods_Works_NCS.pdf", period: "17 Jul 2026 (publication)", sourceUpdatedAt: "17 Jul 2026",
  },
  metroTraction: {
    source: "Kochi Metro Rail Limited · AIIB", dataset: "KBE 04 contract award notice",
    url: "https://www.aiib.org/en/projects/details/2026/_download/India/Kochi-Metro-Rail-Project-Phase-IIKBE-04_Contract_AwardGoods_Works_NCS.pdf", period: "17 Jul 2026 (publication)", sourceUpdatedAt: "17 Jul 2026",
  },
  railwayDoubling: {
    source: "Ministry of Railways · PIB", dataset: "Mararikulam–Alappuzha doubling approval",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2270368&lang=1&reg=48", period: "8 Jun 2026", sourceUpdatedAt: "8 Jun 2026",
  },
  highwaysOpened: {
    source: "Press Information Bureau", dataset: "New India Samachar · Kerala project inaugurations",
    url: "https://newindiasamachar.pib.gov.in/WriteReadData/flipbook/2026/Apr/1st/English/files/basic-html/page37.html", period: "11 Mar 2026", sourceUpdatedAt: "1–15 Apr 2026 (issue date)",
  },
  waterwayWorks: {
    source: "Ministry of Ports, Shipping and Waterways · PIB", dataset: "Lok Sabha reply on Kerala inland waterways",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227667&lang=1&reg=3", period: "13 Feb 2026", sourceUpdatedAt: "13 Feb 2026",
  },
  airportCargo: {
    source: "Cochin International Airport Limited", dataset: "FY 2025–26 annual report · Chairperson’s message",
    url: "https://www.cial.aero/ckeditor/upload/CIAL_Annual_Report_2025_2026.pdf", period: "FY 2025–26",
  },
  railwayWorks: {
    source: "Ministry of Railways · PIB", dataset: "Lok Sabha reply on Kerala railway works",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2238570&lang=2&reg=48", period: "11 Mar 2026", sourceUpdatedAt: "11 Mar 2026",
  },
} satisfies Record<string, TransportSource>;

export const majorProjectSources = Object.values(sources);

export const majorProjects: MajorProject[] = [
  {
    id: "koyilandy-water", name: "Koyilandy municipal water supply scheme", sector: "Water and sanitation", location: "Kozhikode", districts: ["Kozhikode"], stage: "Works in progress",
    summary: "KWA reported that 90 km of the distribution network was activated and water supply had started on that part of the network.", measure: { label: "Pipeline laid out of 360 km", value: "330.8 km" }, source: sources.kozhikodeWater,
  },
  {
    id: "solid-waste", name: "Kerala Solid Waste Management Project", sector: "Water and sanitation", location: "Kerala · urban local bodies", stage: "Works in progress",
    summary: "The World Bank reported active municipal procurement for collection and recycling and ongoing dumpsite remediation work.", measure: { label: "Dumpsite remediation contracts under implementation", value: "3" }, source: sources.waste,
  },
  {
    id: "capital-sewer", name: "AMRUT 2.0 Block N sewerage works", sector: "Water and sanitation", location: "Thiruvananthapuram", districts: ["Thiruvananthapuram"], stage: "Completed",
    summary: "KWA reported completion of all works and submission of the final bill.", source: sources.capitalSewer,
  },
  {
    id: "vizhinjam-exim", name: "Vizhinjam direct import and export services", sector: "Ports and waterways", location: "Thiruvananthapuram", districts: ["Thiruvananthapuram"], stage: "Operational",
    summary: "The port authority recorded the start of direct import and export operations in August 2026.", source: sources.vizhinjamExim,
  },
  {
    id: "nh66-drainage", name: "NH-66 drainage connectivity works", sector: "Roads", location: "Alappuzha and Kollam", districts: ["Alappuzha", "Kollam"], stage: "Sanctioned",
    summary: "NHAI sanctioned drainage links from highway outfalls to natural drains, allocating ₹14.05 crore to Alappuzha and ₹28.55 crore to Kollam.", measure: { label: "Amount sanctioned", value: "₹42.6 crore" }, source: sources.highwayDrainage,
  },
  {
    id: "kochi-metro-track", name: "Kochi Metro Phase II · track installation", sector: "Rail and metro", location: "Ernakulam", districts: ["Ernakulam"], stage: "Contract awarded",
    summary: "KMRL awarded the JLN Stadium–Infopark elevated track package to Texmaco Rail & Engineering.", measure: { label: "Awarded contract price", value: "₹130.22 crore" }, source: sources.metroTrack,
  },
  {
    id: "kochi-metro-traction", name: "Kochi Metro Phase II · traction power", sector: "Rail and metro", location: "Ernakulam", districts: ["Ernakulam"], stage: "Contract awarded",
    summary: "KMRL awarded the traction electrification and substation package to Kalpataru Projects International.", measure: { label: "Awarded contract price", value: "₹223.59 crore" }, source: sources.metroTraction,
  },
  {
    id: "mararikulam-doubling", name: "Mararikulam–Alappuzha rail doubling", sector: "Rail and metro", location: "Alappuzha", districts: ["Alappuzha"], stage: "Sanctioned",
    summary: "Indian Railways approved doubling the 10.65 km section on the Ernakulam–Kayamkulam corridor.", measure: { label: "Sanctioned cost", value: "₹220.51 crore" }, source: sources.railwayDoubling,
  },
  {
    id: "vizhinjam-expansion", name: "Vizhinjam capacity expansion", sector: "Ports and waterways", location: "Thiruvananthapuram", districts: ["Thiruvananthapuram"], stage: "Works in progress",
    summary: "The concessionaire reported that construction for the expansion had commenced during FY 2025–26.", source: sources.vizhinjamExpansion,
  },
  {
    id: "cochin-cargo", name: "Cochin airport export cargo warehouse expansion", sector: "Aviation", location: "Ernakulam", districts: ["Ernakulam"], stage: "Operational",
    summary: "CIAL reported that the expanded export warehouse increased annual cargo capacity from 75,000 metric tonnes.", measure: { label: "Annual capacity after expansion", value: "1,25,000 tonnes" }, source: sources.airportCargo,
  },
  {
    id: "thalapady-chengala", name: "NH-66 Thalapady–Chengala six-laning", sector: "Roads", location: "Kasaragod", districts: ["Kasaragod"], stage: "Completed",
    summary: "The upgraded six-lane national highway section was inaugurated on 11 March 2026.", source: sources.highwaysOpened,
  },
  {
    id: "kozhikode-bypass", name: "Vengalam–Ramanattukara bypass six-laning", sector: "Roads", location: "Kozhikode", districts: ["Kozhikode"], stage: "Completed",
    summary: "The six-laned Kozhikode Bypass section was inaugurated on 11 March 2026.", source: sources.highwaysOpened,
  },
  {
    id: "amrit-bharat-stations", name: "Amrit Bharat station redevelopment in Kerala", sector: "Rail and metro", location: "Multiple districts", stage: "Works in progress",
    summary: "The Ministry reported 11 completed station redevelopments, including Shoranur, Kuttippuram and Changanassery, with work underway at other selected stations.", measure: { label: "Station redevelopments completed", value: "11" }, source: sources.railwayWorks,
  },
  {
    id: "thrikunnapuzha-lock", name: "Thrikunnapuzha navigation lock and bridge", sector: "Ports and waterways", location: "Alappuzha", districts: ["Alappuzha"], stage: "Works in progress",
    summary: "The ministry reported reconstruction under way on National Waterway 3.", measure: { label: "Reported physical progress", value: "52%" }, source: sources.waterwayWorks,
  },
  {
    id: "kovilthottam-bridge", name: "Kovilthottam bridge, Chavara", sector: "Ports and waterways", location: "Kollam", districts: ["Kollam"], stage: "Works in progress",
    summary: "The ministry reported construction progress on the single-lane bridge over National Waterway 3.", measure: { label: "Reported physical progress", value: "80%" }, source: sources.waterwayWorks,
  },
];

export const majorProjectPortfolio = {
  highways: {
    count: 61,
    kilometres: 1513,
    source: {
      source: "Ministry of Road Transport and Highways · PIB", dataset: "Kerala National Highway quality and maintenance review",
      url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2256002&lang=1&reg=3", period: "27 Apr 2026", sourceUpdatedAt: "27 Apr 2026",
    },
  },
  rail: {
    kilometresCommissioned: 26,
    expenditureCrore: 3250,
    source: { ...sources.railwayWorks, period: "Through March 2025", basis: "Six projects falling wholly or partly in Kerala" },
  },
};
