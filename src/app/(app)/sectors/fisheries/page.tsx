import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { fisheriesDashboard } from "@/data/departmentDashboards/fisheries";

export default function FisheriesPage() {
  return <DepartmentDashboard data={fisheriesDashboard} />;
}
