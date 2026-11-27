import type { DataProvenance } from "@/components/DataProvenance";
import type { DepartmentDashboardData } from "@/components/DepartmentDashboard";

export type CmDepartmentFinding = {
  department: string;
  title: string;
  metric: string;
  summary: string;
  period: string;
  href: string;
  tone: "improving" | "attention";
  points: readonly { label: string; value: number }[];
  unit: string;
  sources: readonly DataProvenance[];
  featured?: boolean;
};

export function getDepartmentChart({ title, charts }: DepartmentDashboardData, id: string) {
  const chart = charts.find((entry) => entry.id === id);
  if (!chart) throw new Error(`Missing ${title} chart: ${id}`);
  return chart;
}
