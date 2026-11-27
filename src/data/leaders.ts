import { Rag } from "./types";

export interface LeaderKpi { label: string; value: string; sub?: string; rag?: Rag; icon: string; }
export interface Leader {
  slug: string;
  name: string;
  title: string;
  dept: string;
  initials: string;
  accent: string;
  banner: string;
  greeting: string;
  kpis: LeaderKpi[];
  sections: string[];
}

export const leaders: Leader[] = [
  {
    slug: "vd-satheeshan",
    name: "VD Satheeshan",
    title: "Chief Minister",
    dept: "Government of Kerala",
    initials: "VS",
    accent: "#16a34a",
    banner: "/img/leaders/vd-satheeshan.jpg",
    greeting: "Cabinet briefings, state finances and district economy",
    kpis: [],
    sections: [],
  },
  {
    slug: "pk-kunhalikutty",
    name: "P. K. Kunhalikutty",
    title: "Minister for Industries & IT",
    dept: "Industries and Information Technology",
    initials: "PK",
    accent: "#2f7df6",
    banner: "/img/leaders/pk-kunhalikutty.jpg",
    greeting: "Electronics, IT, digital transformation, parks, startups and investment delivery",
    kpis: [
      { label: "IT Exports", value: "₹26,770 Cr", sub: "FY 2024-25 govt parks", rag: "green", icon: "Globe2" },
      { label: "Direct IT Jobs", value: "1.56 L", sub: "Technopark, Infopark, Cyberpark", rag: "green", icon: "Users" },
      { label: "IT Companies", value: "1,162", sub: "government park baseline", rag: "green", icon: "Building2" },
      { label: "Jobs Since May", value: "22,100", sub: "realised IT jobs", rag: "green", icon: "UserPlus" },
      { label: "Budget Use", value: "40.64%", sub: "₹206.09 Cr / ₹507.14 Cr", rag: "red", icon: "PieChart" },
      { label: "CM Decisions", value: "6", sub: "E & IT intervention queue", rag: "red", icon: "Siren" },
    ],
    sections: ["eitExecutive", "eitParksLeader", "eitProjectsLeader", "eitStartupKfon", "eitBudgetLeader", "eitDecisionLeader", "industriesPortfolio", "landBankSnapshot"],
  },
  {
    slug: "k-muraleedharan",
    name: "K. Muraleedharan",
    title: "Minister for Health, Family Welfare & Devaswom",
    dept: "Health and Family Welfare",
    initials: "KM",
    accent: "#149aa6",
    banner: "/img/leaders/k-muraleedharan.jpg",
    greeting: "Health, disease radar and welfare",
    kpis: [
      { label: "Govt Hospitals", value: "406", sub: "hospital-class establishments", rag: "green", icon: "Landmark" },
      { label: "Private Hospitals", value: "1,150", sub: "registered hospital class", rag: "amber", icon: "Building2" },
      { label: "KCEA Register", value: "18,505", sub: "active establishments", rag: "blue", icon: "ClipboardList" },
      { label: "KASP Coverage", value: "92.4 L", sub: "families", rag: "green", icon: "ShieldPlus" },
      { label: "Active Disease Alerts", value: "5", sub: "needs response", rag: "red", icon: "Siren" },
      { label: "eHealth Footprint", value: "1,114", sub: "implemented institutions", rag: "green", icon: "Hospital" },
    ],
    sections: ["immediateAttention", "surveillance", "shortfalls", "insurance", "districtHealthMap", "healthPortfolio"],
  },
  {
    slug: "a-jayathilak",
    name: "Dr. A. Jayathilak",
    title: "Chief Secretary",
    dept: "Administrative Anchor, Government of Kerala",
    initials: "AJ",
    accent: "#2b56a6",
    banner: "/img/leaders/a-jayathilak.jpg",
    greeting: "Cross-department delivery and administration",
    kpis: [
      { label: "Delayed Files", value: "38,420", sub: ">90d: 1,240", rag: "red", icon: "FileStack" },
      { label: "Grievance SLA", value: "69%", sub: "within SLA", rag: "amber", icon: "MessageSquareWarning" },
      { label: "Delayed Projects", value: "38", sub: "red/amber", rag: "red", icon: "Clock" },
      { label: "Data Source Health", value: "31/35", sub: "live feeds", rag: "green", icon: "Server" },
      { label: "Open Tickets", value: "40", sub: "across depts", rag: "amber", icon: "TicketCheck" },
    ],
    sections: ["files", "grievances", "systems"],
  },
  {
    slug: "rathan-kelkar",
    name: "Rathan U. Kelkar",
    title: "Secretary to the Chief Minister",
    dept: "Chief Minister's Office",
    initials: "RK",
    accent: "#7c3aed",
    banner: "/img/leaders/rathan-kelkar.jpg",
    greeting: "CM office priorities, inbox and escalations",
    kpis: [
      { label: "Today's Decisions", value: "5", sub: "pending CM", rag: "amber", icon: "ClipboardCheck" },
      { label: "Critical Alerts", value: "7", sub: "escalations", rag: "red", icon: "AlertTriangle" },
      { label: "Unread Inbox", value: "5", sub: "from secretaries", rag: "amber", icon: "Inbox" },
      { label: "Overdue Tickets", value: "4", sub: "SLA breach", rag: "red", icon: "TicketCheck" },
      { label: "Burning Issues", value: "6", sub: "social sentiment", rag: "amber", icon: "Megaphone" },
      { label: "Indira Progress", value: "81%", sub: "promise tracker", rag: "green", icon: "ShieldCheck" },
    ],
    sections: ["priority", "inbox", "tickets", "social"],
  },
];

export const leaderBySlug = (slug: string) => leaders.find((l) => l.slug === slug);
