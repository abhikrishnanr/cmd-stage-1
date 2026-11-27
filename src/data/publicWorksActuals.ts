import type { TransportSource } from "./transportActuals";

const programmePortal = "https://www.100days.kerala.gov.in";
const checkedOn = "27 Nov 2026";
const departmentId = "ed9d2ab1-b9fd-4ab3-87c0-69f813d3261a";

export const pwdProgrammeSource = {
  source: "Government of Kerala · 100 Days Programme",
  dataset: "Public Works Department project dashboard",
  url: `${programmePortal}/public/departments/${departmentId}`,
  period: "Jul–Oct 2026 programme",
  basis: "Completion status of the 30 Public Works entries in the programme register",
  fetchedAt: checkedOn,
} satisfies TransportSource;

export const pwdProgramme = { listed: 30, completed: 29, inProgress: 1 };

export const thrissurTrafficNotice = {
  source: "Kerala Information and Public Relations Department · Thrissur",
  dataset: "Thriprayar–Kanjani–Chavakkad road restriction notice",
  url: "https://prd.kerala.gov.in/index.php/ml/node/367376",
  period: "Restriction announced from 23 Nov 2026",
  sourceUpdatedAt: "21 Nov 2026 (notice published)",
  basis: "PWD’s Valapad Roads Section announced a closure at km 1/00 for culvert construction until the road reopens.",
  fetchedAt: checkedOn,
} satisfies TransportSource;

function projectSource(id: string, dataset: string, period: string, basis: string): TransportSource {
  return {
    source: "Government of Kerala · 100 Days Programme",
    dataset,
    url: `${programmePortal}/public/projects/${id}`,
    period,
    basis,
    fetchedAt: checkedOn,
  };
}

export const kunnathurStation = {
  name: "Kunnathur Mini Civil Station",
  district: "Kollam",
  physicalPct: 72,
  financialPct: 48,
  source: projectSource(
    "1675a899-1770-4b0e-be85-7f378ef1ec78",
    "Kunnathur Mini Civil Station · HDP-2026-0415",
    "Status checked 27 Nov 2026",
    "Project indicator reports physical and financial progress against their respective targets.",
  ),
};

export const pwdProgrammeCompletions = [
  {
    name: "Pathanamthitta town improvements",
    district: "Pathanamthitta",
    source: projectSource("1fa4b737-1842-4528-9dcd-d901f35bf7b8", "Pathanamthitta town improvements", "1 Oct 2026", "Completion date recorded against the project"),
  },
  {
    name: "Pathanadu–Kulathoor road upgrade",
    district: "Kottayam",
    source: projectSource("a33f8568-4c9a-4872-9c2a-f08e8fd5c4d5", "Pathanadu–Kulathoor road upgrade", "25 Sep 2026", "Completion date recorded against the project"),
  },
  {
    name: "Gandhi Bhavan–Kochukadavu bridge",
    district: "Kollam",
    source: projectSource("825e71aa-a0b1-4748-ae82-43e40a04f4e1", "Gandhi Bhavan–Kochukadavu bridge", "14 Sep 2026", "Completion date recorded against the project"),
  },
];
