import Link from "next/link";
import { DepartmentDashboard } from "@/components/DepartmentDashboard";
import { environmentDashboard } from "@/data/departmentDashboards/environment";

export default function EnvironmentPage() {
  return (
    <>
      <DepartmentDashboard data={environmentDashboard} />
      <div className="px-5 pb-5 text-sm">
        <Link className="font-semibold text-sky-800 underline underline-offset-4" href="/calamity">Calamity &amp; Climate</Link>
      </div>
    </>
  );
}
