import type { DataProvenance } from "@/components/DataProvenance";

export const missionSamudraCheckedAt = "27 Nov 2026";

export const missionSamudraSources = {
  quarterOne: {
    source: "Adani Ports and Special Economic Zone",
    dataset: "Q1 FY 2026–27 operational highlights · port volumes, PDF page 33",
    url: "https://www.adaniports.com/-/media/project/ports/investor/investor-downloads/operational-highlights/q1-fy27.pdf#page=33",
    period: "Apr–Jun 2025 and Apr–Jun 2026",
    basis: "Port operator’s exchange filing, reported in thousand TEU to one decimal place.",
    sourceUpdatedAt: "29 Jul 2026",
  },
  quarterTwo: {
    source: "Adani Ports and Special Economic Zone",
    dataset: "Q2 FY 2026–27 operational highlights · port volumes, PDF page 42",
    url: "https://www.adaniports.com/-/media/project/ports/investor/investor-downloads/operational-highlights/q2-fy27.pdf#page=42",
    period: "Jul–Sep 2025 and Jul–Sep 2026",
    basis: "Port operator’s exchange filing, rounded to the nearest thousand twenty-foot equivalent units (TEU).",
    sourceUpdatedAt: "28 Oct 2026",
  },
  route: {
    source: "Kerala Information and Public Relations Department",
    dataset: "Vizhinjam to Kottayam import consignment · PNX 4929/2026",
    url: "https://prd.kerala.gov.in/ml/node/367493",
    period: "21 Nov 2026",
    basis: "Shipment announcement describing the planned route and customs process.",
    sourceUpdatedAt: "21 Nov 2026",
  },
  approach: {
    source: "Kerala Maritime Board",
    dataset: "State World Maritime Day valedictory session",
    url: "https://kmb.kerala.gov.in/en/news/world-maritime-day-celebrations-2026-conclude-with-logo-launch-and-strategic-initiatives-under-mission-samudra",
    period: "24 Sep 2026",
    sourceUpdatedAt: "24 Sep 2026",
  },
  exim: {
    source: "Vizhinjam International Seaport Limited",
    dataset: "Port operations overview",
    url: "https://vizhinjamport.in/",
    period: "August 2026",
  },
  shipbuilding: {
    source: "Kerala Information and Public Relations Department",
    dataset: "Mission Samudra shipbuilding clarification · PNX 2619/2026",
    url: "https://prd.kerala.gov.in/ml/node/352613",
    period: "17 Jul 2026",
    sourceUpdatedAt: "17 Jul 2026",
  },
  railSanction: {
    source: "Kerala Fisheries and Ports Department",
    dataset: "Rail alignment and administrative sanction · G.O.(Ms) No. 4/2025/F&P",
    url: "https://document.kerala.gov.in/documents/governmentorders/govtorder2103202512%3A10%3A12.pdf",
    period: "20 Mar 2025",
    sourceUpdatedAt: "20 Mar 2025",
  },
  railTender: {
    source: "Adani Vizhinjam Port Private Limited · VISL",
    dataset: "Phase I environment compliance, rail connectivity condition",
    url: "https://vizhinjamport.in/wp-content/uploads/2026/06/Phase-I-HYCR-for-the-period-from-Oct-2025-to-MArch-2026.pdf",
    period: "Oct 2025–Mar 2026 compliance period",
    sourceUpdatedAt: "29 May 2026 (filed condition update)",
  },
  portExpansion: {
    source: "Adani Ports and Special Economic Zone",
    dataset: "FY 2025–26 integrated annual report · Vizhinjam operations",
    url: "https://www.adaniports.com/digital-reports/ports/2026/operational-performance-ports.html",
    period: "FY 2025–26",
    basis: "Construction milestone reported by the operator. The completion date is the operator’s target.",
  },
} satisfies Record<string, DataProvenance>;

export const missionSamudraQuarterVolumes = [
  { quarter: "Apr–Jun", previousThousands: 314.4, latestThousands: 346.4, source: missionSamudraSources.quarterOne },
  { quarter: "Jul–Sep", previousThousands: 315, latestThousands: 376, source: missionSamudraSources.quarterTwo },
] as const;

export const missionSamudraShipment = {
  containers: 60,
  approximateTonnes: 1500,
  groups: 3,
  dateTime: "2026-11-21",
  date: "21 Nov 2026",
} as const;

export const missionSamudraMilestones = [
  {
    dateTime: "2025-03-20", date: "20 Mar 2025", title: "Vizhinjam–Balaramapuram rail link sanctioned", status: "Sanctioned",
    detail: "The state sanctioned a 10.77 km link, including a 9 km tunnel, to connect the port to the national rail network.",
    source: missionSamudraSources.railSanction,
  },
  {
    dateTime: "2026-05-29", date: "29 May 2026", title: "Port compliance filing places rail link in tendering", status: "Procurement reported",
    detail: "The operator reported that Konkan Railway had been engaged and the project was at the tendering stage on the filing date.",
    source: missionSamudraSources.railTender,
  },
  {
    dateTime: "2026-07-17", date: "17 Jul 2026", title: "Preliminary shipbuilding works reported at Cochin Port", status: "Early works reported",
    detail: "Kerala I&PRD reported that the Malabar Cements and Artson Engineering joint venture had secured major institutional approvals and waterfront land from Cochin Port Authority.",
    source: missionSamudraSources.shipbuilding,
  },
  {
    dateTime: "2026-08", date: "Aug 2026", title: "Vizhinjam direct import and export operations began", status: "Operational",
    detail: "VISL records the start of direct import and export operations, adding a gateway service alongside the port’s transshipment operations.",
    source: missionSamudraSources.exim,
  },
  {
    dateTime: "2026-09-24", date: "24 Sep 2026", title: "Mission Samudra approach paper released", status: "Released",
    detail: "Kerala Maritime Board reported the release of policy guidance for sustainable port development, inland navigation and coastal logistics.",
    source: missionSamudraSources.approach,
  },
  {
    dateTime: missionSamudraShipment.dateTime, date: missionSamudraShipment.date, title: "Kottayam inland depot shipment announced", status: "Announced",
    detail: "Kerala I&PRD described routing a rubber consignment through Vizhinjam to Kottayam for customs clearance and onward delivery to Kochi.",
    source: missionSamudraSources.route,
  },
] as const;

export function missionSamudraVolumeChange(previous: number, latest: number) {
  return Math.round((latest / previous - 1) * 100);
}
