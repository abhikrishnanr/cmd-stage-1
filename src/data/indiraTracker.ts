import type { DataProvenance } from "@/components/DataProvenance";
import { indiraApproachSource } from "@/data/programmeEvidence";

export const indiraProgressSource: DataProvenance = {
  source: "Dashboard tracker",
  dataset: "Manually supplied progress",
  period: "27 Nov 2026",
  basis: "The progress values describe the implementation stages used on this dashboard.",
};

const launchOrder: DataProvenance = {
  source: "Transport Department, Government of Kerala",
  dataset: "G.O. (Ms) 16/2026/TRANS · Priyadarshini rollout",
  url: "https://kerala.gov.in/assets/ckupload/document-651_1781175097.pdf",
  period: "11 Jun 2026",
  sourceUpdatedAt: "11 Jun 2026",
  basis: "Authorizes the first phase on ordinary services from 15 Jun 2026.",
};

const elderlyOrder: DataProvenance = {
  source: "Finance Department, Government of Kerala",
  dataset: "Revised budget speech · Confirmation of the department’s creation",
  url: "https://www.finance.kerala.gov.in/includeWeb/fileViewer.jsp?dId=d6we5vb8ye5vd6w",
  period: "19 May 2026",
  note: "The date is from G.O. (Ms) 63/2026/GAD in the government order register.",
};

export const priyadarshiniUsage = {
  source: {
    source: "Government of Kerala",
    dataset: "Priyadarshini · first 100 days",
    url: "https://kerala.gov.in/articledetail/MTEwMDU1NjM3Ny44/0",
    period: "15 Jun–22 Sep 2026",
    sourceUpdatedAt: "24 Sep 2026",
    basis: "The report counts trips, including repeat trips, across 95 reporting units.",
  },
  totalTrips: 128956892,
  reportingUnits: 95,
  districts: 14,
  averages: [
    { period: "15–30 Jun", lakhsPerDay: 12.12 },
    { period: "Jul", lakhsPerDay: 13.62 },
    { period: "Aug", lakhsPerDay: 12.00 },
    { period: "1–22 Sep", lakhsPerDay: 13.70 },
  ],
};

export type IndiraGuarantee = {
  slug: string;
  title: string;
  detail: string;
  icon: string;
  color: string;
  progress: 0 | 50 | 100;
  evidence: DataProvenance;
  milestone?: { label: string; date: string; dateLabel: string };
};

export const indiraGuarantees: readonly IndiraGuarantee[] = [
  {
    slug: "free-ksrtc-travel",
    title: "Priyadarshini",
    detail: "Free travel for women and transgender people on KSRTC ordinary services.",
    icon: "BusFront",
    color: "#0c7666",
    progress: 100,
    evidence: launchOrder,
    milestone: { label: "Free travel launched", date: "2026-06-15", dateLabel: "15 Jun 2026" },
  },
  {
    slug: "elderly-welfare",
    title: "Elderly",
    detail: "A dedicated department for senior citizens’ welfare.",
    icon: "HeartHandshake",
    color: "#6040a1",
    progress: 50,
    evidence: elderlyOrder,
    milestone: { label: "Department constituted", date: "2026-05-19", dateLabel: "19 May 2026" },
  },
  {
    slug: "girl-student-support",
    title: "Women college students",
    detail: "Published commitment of ₹1,000 per month for women college students.",
    icon: "GraduationCap",
    color: "#9b286a",
    progress: 0,
    evidence: indiraApproachSource,
  },
  {
    slug: "welfare-pension",
    title: "Welfare pension",
    detail: "Published commitment to raise the monthly welfare pension to ₹3,000.",
    icon: "HandCoins",
    color: "#9c4e16",
    progress: 0,
    evidence: indiraApproachSource,
  },
  {
    slug: "family-health-insurance",
    title: "Family health insurance",
    detail: "Published commitment of up to ₹25 lakh in health insurance per family.",
    icon: "HeartPulse",
    color: "#28598d",
    progress: 0,
    evidence: indiraApproachSource,
  },
  {
    slug: "youth-entrepreneur-loan",
    title: "Youth entrepreneurship loans",
    detail: "Published commitment of ₹5 lakh interest-free loans for young entrepreneurs.",
    icon: "BriefcaseBusiness",
    color: "#536423",
    progress: 0,
    evidence: indiraApproachSource,
  },
];

export const indiraStages = { 0: "Not started", 50: "In progress", 100: "Complete" } as const;
