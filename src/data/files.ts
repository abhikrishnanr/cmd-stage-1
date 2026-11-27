export const fileSummary = {
  total: "38,420", over7: 14200, over15: 8600, over30: 4100, over60: 1840, over90: 1240,
};

export const deptFiles = [
  { dept: "Revenue", delayed: 8400, loops: 42, rag: "red" as const },
  { dept: "LSGD", delayed: 6900, loops: 38, rag: "red" as const },
  { dept: "PWD", delayed: 5200, loops: 21, rag: "amber" as const },
  { dept: "Health", delayed: 3800, loops: 14, rag: "amber" as const },
  { dept: "Education", delayed: 3100, loops: 11, rag: "amber" as const },
  { dept: "Industries", delayed: 2400, loops: 9, rag: "green" as const },
];

export const officePendency = [
  { office: "Secretariat — Revenue (B)", over90: 142, total: 1240, rag: "red" as const },
  { office: "Collectorate — Palakkad", over90: 96, total: 880, rag: "red" as const },
  { office: "Directorate — Health Services", over90: 64, total: 720, rag: "amber" as const },
  { office: "PWD — Buildings South", over90: 58, total: 640, rag: "amber" as const },
  { office: "LSGD — Panchayat Dir.", over90: 88, total: 910, rag: "red" as const },
];

export const highImpactFiles = [
  { title: "Aided school staff fixation — 1,200 teachers", dept: "Education", days: 124, rag: "red" as const },
  { title: "Contractor dues clearance — ₹340 Cr", dept: "PWD", days: 96, rag: "red" as const },
  { title: "Land acquisition award — Outer Ring Road", dept: "Revenue", days: 88, rag: "amber" as const },
  { title: "Hospital equipment procurement note", dept: "Health", days: 72, rag: "amber" as const },
];

export const fileLoops = [
  { file: "F/REV/2284/2027 — Mutation appeal", moves: 9, between: "Tahsildar ↔ Deputy Collector", rag: "red" as const },
  { file: "F/LSGD/1190/2027 — Building reg.", moves: 7, between: "Secretary ↔ Engineer", rag: "amber" as const },
  { file: "F/PWD/882/2027 — DLP works", moves: 6, between: "AE ↔ EE ↔ SE", rag: "amber" as const },
];

export const districtFiles: Record<string, number> = {
  Thiruvananthapuram: 88, Ernakulam: 74, Malappuram: 71, Thrissur: 64, Kozhikode: 62,
  Palakkad: 78, Kollam: 58, Kannur: 55, Alappuzha: 60, Kottayam: 48, Kasaragod: 66,
  Idukki: 52, Pathanamthitta: 44, Wayanad: 50,
};
