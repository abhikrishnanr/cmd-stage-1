export type Rag = "red" | "amber" | "green" | "blue";

export interface TrendPoint {
  label: string;
  value: number;
  v2?: number;
}

export interface DistrictDatum {
  // exact name as it appears in kerala.geojson "District" property
  geoName: string;
  name: string;
  collector: string;
  collectorPhoto?: string;
  collectorSource?: string;
  heroImage?: string;
  heroCredit?: string;
  population: string;
  governance: number; // 0-100
  indira: number; // 0-100
  fundUtil: number; // 0-100
  grievances: number;
  healthRisk: Rag;
  projectDelay: number; // days avg
  openTickets: number;
  rag: Rag;
  risk: number; // 0-100 (higher = worse)
  sectors: Record<string, number>; // sector -> score
}

export interface JourneyStage {
  stage: string;
  value: number;
}

export interface GuaranteeKpi {
  label: string;
  value: string;
  delta?: string;
  sub?: string;
  spark?: number[];
  sparkColor?: string;
  icon: string; // lucide name
  color: string; // css var token e.g. var(--color-c-violet)
}

export interface TravelAnalytics {
  totalTrips: string;
  averageDistance: string;
  distanceSlabs: {
    label: string;
    count: string;
    percent: number;
    color: string;
  }[];
  genderOccupancy: {
    district: string;
    region: "South" | "Central" | "North";
    women: number;
    men: number;
  }[];
  financials: {
    revenuePeriods: {
      id: "day" | "week" | "month" | "year";
      label: string;
      currentLabel: string;
      previousLabel: string;
      totalRevenueCr: number;
      previousRevenueCr: number;
      paidRevenueCr: number;
      freeTickets: string;
      freeTicketAmountCr: number;
      trend: TrendPoint[];
    }[];
    governmentSettlement: {
      liabilityCr: number;
      disbursedCr: number;
      pendingCr: number;
      underVerificationCr: number;
      latestDisbursement: string;
      nextSettlementDue: string;
    };
  };
}

export interface Guarantee {
  id: string;
  slug: string;
  short: string;
  title: string;
  subtitle: string;
  ribbon: string;
  updated: string;
  theme: string; // primary accent css color
  hero: string; // gradient css
  owner: string;
  source: string;
  rag: Rag;
  score: number; // achievement 0-100
  target: string;
  achieved: string;
  beneficiaries: string;
  allocated: string; // ₹
  released: string; // ₹
  pending: string; // pending applications
  grievances: number;
  districtsOnTrack: number;
  districtsAtRisk: number;
  kpis: GuaranteeKpi[];
  glance: { step: string; desc: string; icon: string }[];
  pillars: { title: string; desc: string; icon: string; color: string }[];
  districtTable: { rank: number; district: string; metricLabel: string; value: number }[];
  metricUnit: string;
  trendBeneficiaries: TrendPoint[];
  fundTrend: TrendPoint[];
  pendingTrend: TrendPoint[];
  grievanceTrend: TrendPoint[];
  purposeSplit: { label: string; value: number; color: string }[];
  topDistricts: { label: string; value: number }[];
  categorySplit: { label: string; value: number; color: string }[];
  segments: { label: string; value: number; color: string }[];
  avgSupport: { value: string; label: string; sub: string };
  cumulative: { value: string; label: string; points: { label: string; desc: string; icon: string }[] };
  outcomes: { label: string; icon: string; color: string }[];
  operational: { label: string; value: string; icon: string }[];
  nextFocus: { title: string; desc: string; icon: string }[];
  journey: JourneyStage[];
  travelAnalytics?: TravelAnalytics;
}

export interface DreamProject {
  id: string;
  name: string;
  dept: string;
  progress: number;
  physical: number;
  financial: number;
  budget: string;
  jobs: string;
  risk: Rag;
  nextMilestone: string;
  districts: number;
  bottlenecks: Record<string, Rag>;
  stages: { stage: string; status: "done" | "active" | "todo" }[];
  slug?: string;
  img?: string;
  priority?: boolean;
}

export interface ModuleDatum {
  code: string;
  name: string;
  group: string;
  score: number;
  rag: Rag;
  source: string;
  lastSync: string;
  confidence: number;
  alerts: number;
  tickets: number;
  spark: number[];
}

export interface SourceSystem {
  name: string;
  method: string;
  frequency: string;
  lastSync: string;
  status: "live" | "delayed" | "failed";
  confidence: number;
  feeds: string;
}

export interface Ticket {
  id: string;
  title: string;
  priority: "Critical" | "High" | "Medium" | "Watch";
  assignee: string;
  related: string;
  due: string;
  lastResponse: string;
  status: "Open" | "In Review" | "Waiting Reply" | "Overdue" | "Closed";
  cmNote?: string;
  voiceNote?: { title: string; duration: string; transcript: string };
  attachments?: { name: string; type: string; size: string; source: string }[];
  eofficeFiles?: string[];
  timeline?: { actor: "CM" | "Secretary"; time: string; text: string; rag: Rag }[];
}

export interface AlertItem {
  rag: Rag;
  text: string;
  owner?: string;
  time?: string;
}
