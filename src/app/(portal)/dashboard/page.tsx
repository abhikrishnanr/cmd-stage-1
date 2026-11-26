import type { Metadata } from "next";
import { DashboardClient } from "@/components/DashboardClient";
import { getCmoData, getEHealthData, getEcoStatData, getIndustryKeraData } from "@/data/departmentSources";

export const metadata: Metadata = { title: "Overview" };
export const revalidate = 1800;

export default async function DashboardPage() {
  const [ecoStatData, industryKeraData, cmoData, eHealthData] = await Promise.all([getEcoStatData(), getIndustryKeraData(), getCmoData(), getEHealthData()]);
  return <DashboardClient ecoStatData={ecoStatData} industryKeraData={industryKeraData} cmoData={cmoData} eHealthData={eHealthData} />;
}
