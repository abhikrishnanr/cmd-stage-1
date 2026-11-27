import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { scholarshipsDashboard } from "@/data/departmentDashboards/scholarships";

export default function ScholarshipsPage() {
  return <DepartmentDashboard data={scholarshipsDashboard} />;
}
