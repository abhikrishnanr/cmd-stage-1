export interface RbmProject {
  slug: string;
  title: string;
  shortTitle: string;
  department: string;
  outcomeStatement: string;
  source?: { label: string; url: string; note: string };
  deliveryRoute: string;
  priorityRoute?: string;
}

const roadmap = "https://kerala.gov.in/articledetail/MTA2ODUxMTUzOC4xNg%3D%3D/1?lan=en";

export const rbmProjects: RbmProject[] = [
  {
    slug: "priyadashini-free-travel",
    deliveryRoute: "/indira/free-ksrtc-travel",
    title: "Priyadarshini Free Travel for Women",
    shortTitle: "Free Travel for Women",
    department: "Transport",
    outcomeStatement: "Free travel for women on eligible KSRTC services under the Priyadarshini scheme.",
    source: { label: "Kerala Transport Department order", url: "https://kerala.gov.in/assets/ckupload/document-651_1781175097.pdf", note: "Scheme implementation order, June 2026." },
  },
  {
    slug: "college-girl-student-support",
    deliveryRoute: "/indira/girl-student-support",
    title: "College Girl Student Retention Support",
    shortTitle: "Girl Student Support",
    department: "Higher Education",
    outcomeStatement: "A monthly scholarship for women pursuing higher education was announced in June 2026.",
    source: { label: "Higher Education Minister’s announcement", url: "https://keralacalling.kerala.gov.in/roji-m-john/", note: "Published policy announcement, June 2026." },
  },
  {
    slug: "welfare-pension-security",
    deliveryRoute: "/indira/welfare-pension",
    title: "Welfare Pension & Household Security",
    shortTitle: "Welfare Pension",
    department: "Local Self Government",
    outcomeStatement: "Social security pension support administered through Kerala’s local governments.",
    source: { label: "Sevana pension orders", url: "https://welfarepension.lsgkerala.gov.in/Order_en.aspx", note: "Official orders and eligibility guidance." },
  },
  {
    slug: "family-health-financial-protection",
    deliveryRoute: "/indira/family-health-insurance",
    title: "Family Health Insurance & Financial Protection",
    shortTitle: "Family Health Insurance",
    department: "Health & Family Welfare",
    outcomeStatement: "The state budget roadmap announces the Oommen Chandy Health Insurance Scheme.",
    source: { label: "Kerala Government budget roadmap", url: roadmap, note: "Scheme announcement in the budget roadmap. Check the programme’s reporting documents for delivery results." },
  },
  {
    slug: "youth-enterprise-jobs",
    deliveryRoute: "/indira/youth-entrepreneur-loan",
    title: "Youth Enterprise & Local Jobs",
    shortTitle: "Youth Enterprise & Jobs",
    department: "Industries & Commerce",
    outcomeStatement: "The State Planning Board’s draft approach paper lists interest-free loans of ₹5 lakh as a commitment for young entrepreneurs.",
    source: { label: "Kerala State Planning Board draft approach paper", url: "https://spb.kerala.gov.in/wp-content/uploads/2026/02/15th-five-year-plan_draft-approach-paper_english_.pdf", note: "Published commitment in the draft plan." },
  },
  {
    slug: "elderly-community-care",
    deliveryRoute: "/indira/elderly-welfare",
    title: "Elderly Community Care & Independent Living",
    shortTitle: "Elderly Community Care",
    department: "Senior Citizens",
    outcomeStatement: "The Cabinet’s first briefing announced a dedicated department for senior citizens.",
    source: { label: "Chief Minister’s official Cabinet briefing", url: "https://keralacm.gov.in/storage/2026/06/cabinet-briefings-18.05.2026.pdf", note: "Published 18 May 2026." },
    priorityRoute: "/rbm-new/elder-friendly-office-certification",
  },
  {
    slug: "mission-samudra",
    deliveryRoute: "/dream-projects/mission-samudra",
    title: "Mission Samudra Maritime Transformation",
    shortTitle: "Mission Samudra",
    department: "Ports & Coastal Shipping",
    outcomeStatement: "The state budget roadmap earmarks ₹400 crore for Mission Samudra, an integrated maritime development initiative centred on Vizhinjam.",
    source: { label: "Kerala Government budget roadmap", url: roadmap, note: "Budget allocation and planned programme scope." },
    priorityRoute: "/rbm-new/mission-samudra",
  },
];

export function rbmProjectBySlug(slug: string) {
  return rbmProjects.find((project) => project.slug === slug);
}
