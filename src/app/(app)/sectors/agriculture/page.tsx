import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { agricultureDashboard } from "@/data/departmentDashboards/agriculture";

export default function AgriculturePage() {
  return <DepartmentDashboard data={agricultureDashboard} />;
}
