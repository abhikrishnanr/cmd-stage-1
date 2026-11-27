import type { TransportSource } from "@/data/transportActuals";
import type { TransportMetricData } from "@/components/TransportReport";

export type ProgrammeStatus = "Operating" | "Department established" | "Published commitment" | "Early works reported" | "Planning and consultation" | "Draft strategy";

export type ProgrammeRecord = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  status: ProgrammeStatus;
  source: TransportSource;
  records: { title: string; detail: string; source: TransportSource; metrics?: Omit<TransportMetricData, "source">[] }[];
};

const approachPaperUrl = "https://spb.kerala.gov.in/wp-content/uploads/2026/02/15th-five-year-plan_draft-approach-paper_english_.pdf";

function approachSource(chapter: string): TransportSource {
  return {
    source: "Kerala State Planning Board",
    url: approachPaperUrl,
    dataset: "Draft Fifteenth Five-Year Plan approach paper · " + chapter,
    period: "Plan period 2027–32",
    basis: "Draft policy document",
    sourceUpdatedAt: "November 2026",
  };
}

function prdSource(url: string, dataset: string, period: string, sourceUpdatedAt = period): TransportSource {
  return {
    source: "Kerala Information & Public Relations Department",
    url,
    dataset,
    period,
    sourceUpdatedAt,
  };
}

export const indiraApproachSource = approachSource("Inclusion, economic mobility and participation");
const gateways = approachSource("Gateway Keralam");
const aviationOperations: TransportSource = {
  source: "Cochin International Airport Limited",
  url: "https://www.cial.aero/ckeditor/upload/CIAL_Annual_Report_2025_2026.pdf",
  dataset: "CIAL 32nd Annual Report",
  period: "FY 2025–26",
  basis: "Airport operator’s annual report",
};
const priyadarshiniRollout = prdSource("https://prd.kerala.gov.in/ml/node/348404", "Cabinet briefing on Priyadarshini", "10 Jun 2026");
const priyadarshiniResults = {
  ...prdSource("https://www.prd.kerala.gov.in/index.php/en/node/359725", "Priyadarshini programme results", "First 97 days of operation", "22 Sep 2026"),
  basis: "Reported journeys and fare value",
};
const octoberPension = {
  ...prdSource("https://prd.kerala.gov.in/ml/node/363582", "October welfare pension release", "October 2026", "24 Oct 2026"),
  basis: "Authorized payments",
};
const elderlyOffice = prdSource("https://prd.kerala.gov.in/ml/node/358967", "Elder Friendly Office Certification", "11 Sep 2026");
const elderlyDepartment = prdSource("https://prd.kerala.gov.in/ml/node/365739/", "Department of Senior Citizens partnerships", "9 Nov 2026");
export const dreamProjectsWorkshop = prdSource("https://prd.kerala.gov.in/index.php/ml/node/359300", "Budget proposals roundtable", "16 Sep 2026");
const samudraBriefing = prdSource("https://prd.kerala.gov.in/ml/node/352613", "Mission Samudra and Cochin Port shipbuilding project", "17 Jul 2026");
const vizhinjamHarbours = prdSource("https://www.prd.kerala.gov.in/ml/node/361920/", "Vizhinjam fishing harbour works", "9 Oct 2026");
const portOperations: TransportSource = {
  source: "Vizhinjam International Seaport Limited",
  url: "https://vizhinjamport.in/",
  dataset: "Vizhinjam International Seaport operating milestones",
  period: "August 2026",
};

export const indiraProgrammeRecords: ProgrammeRecord[] = [
  {
    slug: "free-ksrtc-travel",
    title: "Priyadarshini free KSRTC travel",
    summary: "Women and transgender people have been eligible for free travel on KSRTC ordinary services since 15 June 2026.",
    icon: "BusFront",
    status: "Operating",
    source: priyadarshiniRollout,
    records: [
      {
        title: "First 97 days of service",
        detail: "The Transport Minister reported the number of journeys taken by women and the fare value waived. The journey count includes repeat trips.",
        source: priyadarshiniResults,
        metrics: [
          { label: "Journeys taken by women", value: "12.54 crore", color: "service" },
          { label: "Fare value waived for women", value: "₹266 crore", color: "water" },
        ],
      },
      {
        title: "Cabinet rollout decision",
        detail: "The first phase covers ordinary buses. The Cabinet briefing specifies eligibility without income or age conditions.",
        source: priyadarshiniRollout,
      },
    ],
  },
  {
    slug: "girl-student-support",
    title: "Support for women college students",
    summary: "The Planning Board lists a commitment to provide women college students ₹1,000 per month.",
    icon: "GraduationCap",
    status: "Published commitment",
    source: indiraApproachSource,
    records: [],
  },
  {
    slug: "welfare-pension",
    title: "Welfare pension",
    summary: "The Planning Board records a commitment to reach ₹3,000 per month and reports a current monthly rate of ₹2,000 in its November 2026 paper.",
    icon: "HandCoins",
    status: "Published commitment",
    source: indiraApproachSource,
    records: [
      {
        title: "October pension authorization",
        detail: "The government authorized these amounts for the existing social welfare and welfare fund board pension schemes. The official release scheduled payments to begin on 26 October.",
        source: octoberPension,
        metrics: [
          { label: "Social welfare pension authorized", value: "₹961.64 crore", color: "service" },
          { label: "Welfare fund board pension authorized", value: "₹119.46 crore", color: "works" },
        ],
      },
      {
        title: "Existing pension payments",
        detail: "The Planning Board reports disbursements under the existing welfare pension for FY 2024–25.",
        source: { ...indiraApproachSource, period: "FY 2024–25", basis: "Reported historical disbursement" },
        metrics: [
          { label: "Welfare pension disbursed", value: "₹10,760 crore", color: "network" },
        ],
      },
    ],
  },
  {
    slug: "family-health-insurance",
    title: "Family health insurance",
    summary: "The Planning Board lists a commitment to offer health insurance of up to ₹25 lakh per family.",
    icon: "HeartPulse",
    status: "Published commitment",
    source: indiraApproachSource,
    records: [],
  },
  {
    slug: "youth-entrepreneur-loan",
    title: "Youth entrepreneurship loans",
    summary: "The Planning Board lists a commitment to offer ₹5 lakh interest-free loans to young entrepreneurs.",
    icon: "BriefcaseBusiness",
    status: "Published commitment",
    source: indiraApproachSource,
    records: [],
  },
  {
    slug: "elderly-welfare",
    title: "Department of Senior Citizens",
    summary: "The government established a dedicated Department of Senior Citizens on 19 May 2026.",
    icon: "HeartHandshake",
    status: "Department established",
    source: elderlyDepartment,
    records: [
      {
        title: "Institutional agreements signed",
        detail: "The department signed agreements with research, academic and service organisations to support its work on senior citizens’ welfare.",
        source: elderlyDepartment,
        metrics: [
          { label: "Institutions that signed agreements", value: "12", color: "service" },
        ],
      },
      {
        title: "Elder Friendly Office Certification",
        detail: "The department announced an office certification scheme with assessments for accessibility and service. The announcement describes staged coverage across categories of public offices and participating institutions.",
        source: elderlyOffice,
      },
    ],
  },
];

export const dreamProgrammeRecords: ProgrammeRecord[] = [
  {
    slug: "mission-samudra",
    title: "Mission Samudra",
    summary: "Kerala’s maritime development plan covers shipbuilding and repair, offshore fabrication, freight links and coastal industry.",
    icon: "Anchor",
    status: "Early works reported",
    source: gateways,
    records: [
      {
        title: "Shipbuilding facility at Cochin Port",
        detail: "The government reported that the Malabar Cements and Artson Engineering joint venture had received the main approvals. Cochin Port Authority had made land available and preliminary development had started.",
        source: samudraBriefing,
      },
      {
        title: "Related port milestone",
        detail: "Vizhinjam International Seaport reports that its direct export and import operations began in August 2026.",
        source: portOperations,
      },
    ],
  },
  {
    slug: "aviation",
    title: "Aviation sector development",
    summary: "The draft plan proposes an aviation policy, maintenance and repair facilities, specialist training, and air-cargo and logistics infrastructure.",
    icon: "Plane",
    status: "Draft strategy",
    source: gateways,
    records: [
      {
        title: "Cochin International Airport operations",
        detail: "CIAL’s annual report documents passenger movements and the expanded designed capacity of its export warehouse. These figures cover the named airport.",
        source: aviationOperations,
        metrics: [
          { label: "CIAL passenger movements", value: "1,14,42,583", color: "service" },
          { label: "Expanded export warehouse annual capacity", value: "1,25,000 tonnes", color: "network" },
        ],
      },
    ],
  },
  {
    slug: "msme",
    title: "Kerala MSME Growth Scheme",
    summary: "The draft plan describes revolving, technology and challenge funds, with mentors for new ventures.",
    icon: "Factory",
    status: "Planning and consultation",
    source: approachSource("Manufacturing and the MSME base"),
    records: [
      {
        title: "State budget roundtable",
        detail: "The Industries Department and State Planning Board included the MSME Growth Scheme in their consultation on implementing state budget proposals.",
        source: dreamProjectsWorkshop,
      },
    ],
  },
  {
    slug: "coastal-corridor",
    title: "Southern Kerala Economic Corridor",
    summary: "The draft plan links Thiruvananthapuram, Kollam and Alappuzha through port connectivity and port-linked industrial development.",
    icon: "Route",
    status: "Planning and consultation",
    source: gateways,
    records: [
      {
        title: "State budget roundtable",
        detail: "The government included the corridor in the September consultation on how to implement the state budget proposals.",
        source: dreamProjectsWorkshop,
      },
    ],
  },
  {
    slug: "blue-economy",
    title: "Blue economy and coastal fisheries",
    summary: "The draft strategy proposes sustainable fisheries management, modern harbours, cold storage and support for coastal livelihoods.",
    icon: "Fish",
    status: "Draft strategy",
    source: approachSource("The blue economy"),
    records: [
      {
        title: "Vizhinjam fishing harbour works",
        detail: "The Chief Minister laid the foundation stone for a new fishing harbour and inaugurated the start of work to upgrade the existing fishing harbour.",
        source: vizhinjamHarbours,
      },
    ],
  },
  {
    slug: "logistics-hub",
    title: "Port-linked logistics and trade",
    summary: "The draft plan calls for freight handling, customs examination, warehousing and cold-chain facilities, alongside road and rail links.",
    icon: "Container",
    status: "Draft strategy",
    source: gateways,
    records: [
      {
        title: "Vizhinjam direct trade operations",
        detail: "Vizhinjam International Seaport reports that direct export and import operations began in August 2026, following the start of commercial operations in 2024.",
        source: portOperations,
      },
    ],
  },
];
