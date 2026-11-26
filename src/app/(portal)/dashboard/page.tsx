import type { Metadata } from "next";
import { DashboardClient } from "@/components/DashboardClient";
import { getEcoStatData, getIndustryKeraData } from "@/data/departmentSources";

export const metadata: Metadata = { title: "Overview" };
export const revalidate = 1800;

export default async function DashboardPage() {
  const [ecoStatData, industryKeraData] = await Promise.all([getEcoStatData(), getIndustryKeraData()]);
  return <DashboardClient ecoStatData={ecoStatData} industryKeraData={industryKeraData} />;
}
