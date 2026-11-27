import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { forestWildlifeDashboard } from "@/data/departmentDashboards/forestWildlife";

export default function ForestWildlifePage() {
  return <DepartmentDashboard data={forestWildlifeDashboard} />;
}
