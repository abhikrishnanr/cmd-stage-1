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
    name: "K-SWIFT",
    shortName: "K-SWIFT",
    description: "Departmental clearance and service coverage.",
    scope: ["Departmental clearance/service metrics"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Schedule a discussion to finalize the required data points.",
    icon: "workflow",
    accent: "#b55b25",
  },
  {
    order: 5,
    slug: "e-health",
    name: "e-Health",
    shortName: "e-Health",
    description: "Health sector coverage.",
    scope: ["Health sector metrics"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Initiate API handshake and data mapping.",
    icon: "heart",
    accent: "#b53e58",
  },
  {
    order: 6,
    slug: "ksrtc",
    name: "KSRTC",
    shortName: "KSRTC",
    description: "Transport sector coverage.",
    scope: ["Transport metrics"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Initiate API handshake and data mapping.",
    icon: "bus",
    accent: "#bf3a32",
  },
  {
    order: 7,
    slug: "economics-statistics",
    name: "Economics & Statistics",
    shortName: "Economics & Statistics",
    description: "Statistical indicator coverage.",
    scope: ["Statistical indicators"],
    apiStatus: "not-available",
    apiLabel: "API not available",
    nextAction: "Determine an alternative data-sharing mechanism, such as a manual upload interface or periodic flat files.",
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
    name: "Disaster Management",
    shortName: "Disaster Management",
    description: "Disaster management coverage.",
    scope: ["Disaster management metrics"],
    apiStatus: "not-available",
    apiLabel: "API not available",
    nextAction: "Build and provide a dedicated data-entry/upload interface for the department.",
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
    name: "CMO",
    shortName: "CMO",
    description: "Chief Minister's Office dashboard coverage.",
    scope: ["CMO dashboard metrics"],
    apiStatus: "available",
    apiLabel: "API available",
    nextAction: "Initiate API handshake and data mapping.",
    icon: "building",
    accent: "#7047a3",
  },
  {
    order: 10,
    slug: "mission-samudra",
    name: "Mission Samudra",
    shortName: "Mission Samudra",
    description: "Mission Samudra coverage.",
    scope: ["Mission Samudra metrics"],
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
