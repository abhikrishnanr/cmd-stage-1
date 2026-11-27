import { Rag } from "./types";

export const deliverySummary = {
  overall: 74,
  green: 9,
  amber: 10,
  red: 6,
  secretaryPending: 12,
  cmPending: 5,
  avgResponseHours: 18,
};

export const deliveryPillars = [
  { label: "CM Direction", value: 96, rag: "green" as Rag, icon: "Crown" },
  { label: "Secretary Acknowledgement", value: 82, rag: "green" as Rag, icon: "UserCheck" },
  { label: "Action Taken Report", value: 61, rag: "amber" as Rag, icon: "ClipboardCheck" },
  { label: "Evidence Attached", value: 58, rag: "amber" as Rag, icon: "Paperclip" },
  { label: "Decision Closure", value: 44, rag: "red" as Rag, icon: "CircleCheck" },
];

export const secretaryQueues = [
  { secretary: "Health Secretary", red: 2, amber: 3, green: 4, pendingToCM: 3, avgHours: 9, rag: "red" as Rag },
  { secretary: "Finance Secretary", red: 2, amber: 2, green: 3, pendingToCM: 2, avgHours: 14, rag: "red" as Rag },
  { secretary: "Industries Secretary", red: 1, amber: 4, green: 5, pendingToCM: 2, avgHours: 19, rag: "amber" as Rag },
  { secretary: "Revenue Secretary", red: 1, amber: 5, green: 3, pendingToCM: 3, avgHours: 24, rag: "amber" as Rag },
  { secretary: "LSGD Secretary", red: 0, amber: 3, green: 6, pendingToCM: 1, avgHours: 16, rag: "amber" as Rag },
  { secretary: "Education Secretary", red: 0, amber: 2, green: 5, pendingToCM: 1, avgHours: 21, rag: "green" as Rag },
];

export const deliveryItems = [
  { item: "Dengue cluster - Palakkad", owner: "Health Secretary", rag: "red" as Rag, stage: "Secretary to CM", due: "Today 18:00", ticket: "TK-2041", evidence: 2 },
  { item: "KIIFB repayment sequencing", owner: "Finance Secretary", rag: "red" as Rag, stage: "Secretary drafting", due: "Tomorrow", ticket: "TK-2039", evidence: 1 },
  { item: "Pension backlog assurance", owner: "LSGD Secretary", rag: "amber" as Rag, stage: "Back to CM", due: "Jun 16", ticket: "TK-2038", evidence: 1 },
  { item: "Vizhinjam Phase-2 recovery schedule", owner: "Industries Secretary", rag: "amber" as Rag, stage: "Secretary response", due: "Jun 17", ticket: "TK-2036", evidence: 1 },
  { item: "Revenue arrears amnesty note", owner: "Revenue Secretary", rag: "amber" as Rag, stage: "Back to CM", due: "Jun 18", ticket: "TK-2034", evidence: 1 },
  { item: "DBT failures reconciliation", owner: "Education Secretary", rag: "blue" as Rag, stage: "Secretary response", due: "Jun 21", ticket: "TK-2028", evidence: 0 },
];

export const cmSecretaryLoop = [
  { label: "CM creates direction", count: 23, color: "#2563eb", icon: "Send" },
  { label: "Secretary acknowledges", count: 19, color: "#16a34a", icon: "UserCheck" },
  { label: "Secretary submits ATR", count: 12, color: "#f59e0b", icon: "ClipboardCheck" },
  { label: "Back to CM decision", count: 5, color: "#e11d48", icon: "Undo2" },
];
