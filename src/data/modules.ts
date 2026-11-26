export type ApiStatus = "available" | "nic" | "not-available";

export type ModuleIcon =
  | "landmark"
  | "receipt"
  | "wallet"
  | "workflow"
  | "heart"
  | "bus"
  | "chart"
  | "shield"
  | "building"
  | "anchor";

export interface StageModule {
  order: number;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  scope: string[];
  apiStatus: ApiStatus;
  apiLabel: string;
  nextAction: string;
  icon: ModuleIcon;
  accent: string;
  intake?: {
    mode: "upload" | "entry-upload" | "sharing-upload";
    title: string;
    description: string;
  };
}

export const stageModules: StageModule[] = [
  {
    order: 1,
    slug: "planspace",
    name: "Planspace (Plan Expenditure)",
    shortName: "Planspace",
    description: "Plan fund utilization and administrative sanction coverage.",
    scope: [
      "At a Glance: Utilization of Plan Fund",
      "Sector-wise Utilization of Plan Fund",
      "Status of Administrative Sanction of Plan Fund",
      "Administrative Department-wise Utilization of Budget Schemes",
      "Plan Fund Utilization of CSS (Core & Core of the Core schemes)",
    ],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Start integration.",
    icon: "landmark",
    accent: "#2356a8",
  },
  {
    order: 2,
    slug: "non-plan-expenditure",
    name: "Non-Plan Expenditure",
    shortName: "Non-Plan Expenditure",
    description: "Non-plan expenditure coverage.",
    scope: ["Non-Plan expenditure metrics"],
    apiStatus: "nic",
    apiLabel: "Available with NIC team",
    nextAction: "Coordinate with the NIC team to obtain API credentials and documentation.",
    icon: "receipt",
    accent: "#6b4eb6",
  },
  {
    order: 3,
    slug: "budget-income-revenue",
    name: "Budget (Income / Revenue)",
    shortName: "Budget & Revenue",
    description: "Revenue and income coverage.",
    scope: ["Revenue and income metrics"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Schedule a discussion to finalize the required data points.",
    icon: "wallet",
    accent: "#15715f",
  },
  {
    order: 4,
    slug: "k-swift",
    name: "Industries, KERA & K-SWIFT",
    shortName: "Industries & KERA",
    description: "Enterprises, investment, employment, KERA delivery and clearance monitoring.",
    scope: ["Year of Enterprises", "District and sector performance", "KERA project delivery", "Investment pipeline", "K-SWIFT clearances", "Industrial land bank"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Schedule a discussion to finalize the required data points.",
    icon: "workflow",
    accent: "#b55b25",
  },
  {
    order: 5,
    slug: "e-health",
    name: "Health",
    shortName: "Health",
    description: "Service capacity, staffing, medicine stocks and disease surveillance.",
    scope: ["Hospital capacity", "Medical staff availability", "Medicine stocks", "Disease surveillance"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Initiate API handshake and data mapping.",
    icon: "heart",
    accent: "#b53e58",
  },
  {
    order: 6,
    slug: "ksrtc",
    name: "KSRTC - Priyadarshini",
    shortName: "KSRTC Priyadarshini",
    description: "Free ordinary-service travel for women and transgender persons.",
    scope: ["Cumulative and daily journeys", "Zero-ticket value", "Bus and service coverage", "District and depot use", "Government allocation and settlement"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Initiate API handshake and data mapping.",
    icon: "bus",
    accent: "#bf3a32",
  },
  {
    order: 7,
    slug: "economics-statistics",
    name: "Economics & Statistics (EcoStat)",
    shortName: "EcoStat",
    description: "Daily market prices, area-wise price enquiries and State-income statistics.",
    scope: ["State-average wholesale prices", "District and centre daily prices", "Monthly commodity trends", "GSDP and NSDP", "District and sector statistics"],
    apiStatus: "available",
    apiLabel: "Public source available",
    nextAction: "Complete the departmental data exchange for the full indicator catalogue.",
    icon: "chart",
    accent: "#457098",
    intake: {
      mode: "upload",
      title: "Alternative data intake",
      description: "Manual upload or periodic flat-file intake is to be defined.",
    },
  },
  {
    order: 8,
    slug: "disaster-management",
    name: "KSDMA / Disaster Management",
    shortName: "KSDMA",
    description: "Routine hazard monitoring and emergency response reporting.",
    scope: ["Dam and river levels", "Rainfall and warnings", "Relief camps", "Persons evacuated and accommodated", "Supplies and response teams", "War Room updates"],
    apiStatus: "available",
    apiLabel: "Department sharing confirmed",
    nextAction: "Map KSDMA's dated routine and War Room data fields into the agreed exchange.",
    icon: "shield",
    accent: "#a24b37",
    intake: {
      mode: "entry-upload",
      title: "Department data intake",
      description: "A dedicated data-entry and upload interface is planned for this module.",
    },
  },
  {
    order: 9,
    slug: "cmo",
    name: "CMO, Grievances & Feedback",
    shortName: "CMO & Grievances",
    description: "Chief Minister's Office follow-up, grievance and public feedback monitoring.",
    scope: ["Grievances received and resolved", "Resolution time", "District and department trends", "CM review items"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Initiate API handshake and data mapping.",
    icon: "building",
    accent: "#7047a3",
  },
  {
    order: 10,
    slug: "mission-samudra",
    name: "Dream Projects / Mission Samudra",
    shortName: "Dream Projects",
    description: "Physical and financial progress of high-priority projects.",
    scope: ["Project milestones", "Physical progress", "Financial progress", "Delays and decisions", "Mission Samudra"],
    apiStatus: "not-available",
    apiLabel: "API not available",
    nextAction: "Determine an alternative data-sharing mechanism or upload interface.",
    icon: "anchor",
    accent: "#126e78",
    intake: {
      mode: "sharing-upload",
      title: "Alternative data sharing",
      description: "An alternative data-sharing mechanism or upload interface is to be defined.",
    },
  },
];

export const moduleBySlug = (slug: string) => stageModules.find((module) => module.slug === slug);

export const statusMeta: Record<ApiStatus, { label: string; shortLabel: string; tone: string }> = {
  available: { label: "API available", shortLabel: "Available", tone: "green" },
  nic: { label: "Available with NIC team", shortLabel: "NIC coordination", tone: "amber" },
  "not-available": { label: "Alternative intake required", shortLabel: "Alternative intake", tone: "slate" },
};
