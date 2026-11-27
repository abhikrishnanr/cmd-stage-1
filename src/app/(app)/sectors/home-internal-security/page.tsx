import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { homeInternalSecurityDashboard } from "@/data/departmentDashboards/homeInternalSecurity";

export default function HomeInternalSecurityPage() {
  return <DepartmentDashboard data={homeInternalSecurityDashboard} />;
}
