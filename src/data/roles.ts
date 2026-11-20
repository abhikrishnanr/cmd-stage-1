export interface PortalRole {
  id: string;
  name: string;
  title: string;
  initials: string;
  kind: "minister" | "secretary";
  focus: string;
}

export const portalRoles: PortalRole[] = [
  {
    id: "chief-minister",
    name: "VD Satheeshan",
    title: "Chief Minister",
    initials: "VS",
    kind: "minister",
    focus: "Stage 1 portfolio overview and decision view",
  },
  {
    id: "chief-secretary",
    name: "Dr. A. Jayathilak IAS",
    title: "Chief Secretary",
    initials: "AJ",
    kind: "secretary",
    focus: "Cross-department readiness and coordination view",
  },
  {
    id: "secretary-to-cm",
    name: "Rathan U. Kelkar IAS",
    title: "Secretary to the Chief Minister",
    initials: "RK",
    kind: "secretary",
    focus: "CMO coordination and integration action view",
  },
  {
    id: "it-secretary",
    name: "S Suhas IAS",
    title: "Secretary, Electronics & Information Technology",
    initials: "SS",
    kind: "secretary",
    focus: "Digital integration readiness and data pathway view",
  },
];
