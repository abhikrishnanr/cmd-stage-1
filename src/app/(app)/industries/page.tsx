import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { industriesDashboard } from "@/data/departmentDashboards/industries";

export default function IndustriesPage() {
  return <DepartmentDashboard data={industriesDashboard} />;
}
