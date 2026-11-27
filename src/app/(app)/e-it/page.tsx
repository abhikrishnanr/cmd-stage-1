import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { eitDashboard } from "@/data/departmentDashboards/eit";

export default function EitPage() {
  return <DepartmentDashboard data={eitDashboard} />;
}
