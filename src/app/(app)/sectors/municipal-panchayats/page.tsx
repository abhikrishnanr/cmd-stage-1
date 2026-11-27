import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { municipalDashboard } from "@/data/departmentDashboards/municipal";

export default function MunicipalPanchayatsPage() {
  return <DepartmentDashboard data={municipalDashboard} />;
}
