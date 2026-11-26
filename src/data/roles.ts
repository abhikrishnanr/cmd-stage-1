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
    focus: "State performance and matters requiring review",
  },
  {
    id: "chief-secretary",
    name: "Dr. A. Jayathilak IAS",
    title: "Chief Secretary",
    initials: "AJ",
    kind: "secretary",
    focus: "Cross-department performance and coordination",
  },
  {
    id: "secretary-to-cm",
    name: "Rathan U. Kelkar IAS",
    title: "Secretary to the Chief Minister",
    initials: "RK",
    kind: "secretary",
    focus: "CMO coordination and departmental follow-up",
  },
  {
    id: "it-secretary",
    name: "S Suhas IAS",
    title: "Secretary, Electronics & Information Technology",
    initials: "SS",
    kind: "secretary",
    focus: "Digital systems and departmental data integration",
  },
];
