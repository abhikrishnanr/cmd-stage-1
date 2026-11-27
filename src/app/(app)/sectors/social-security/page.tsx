import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { socialSecurityDashboard } from "@/data/departmentDashboards/socialSecurity";

export default function SocialSecurityPage() {
  return <DepartmentDashboard data={socialSecurityDashboard} />;
}
