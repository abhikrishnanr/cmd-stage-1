import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { foodSuppliesDashboard } from "@/data/departmentDashboards/foodSupplies";

export default function FoodSuppliesPage() {
  return <DepartmentDashboard data={foodSuppliesDashboard} />;
}
