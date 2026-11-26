import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleDetail } from "@/components/ModuleDetail";
import { getCmoData, getEcoStatData, getIndustryKeraData } from "@/data/departmentSources";
import { moduleBySlug, stageModules } from "@/data/modules";

export const revalidate = 1800;

export function generateStaticParams() {
  return stageModules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const module = moduleBySlug(slug);
  return { title: module?.name ?? "Module" };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = moduleBySlug(slug);
  if (!module) notFound();
  const ecoStatData = slug === "economics-statistics" ? await getEcoStatData() : undefined;
  const industryKeraData = slug === "k-swift" ? await getIndustryKeraData() : undefined;
  const cmoData = slug === "cmo" ? await getCmoData() : undefined;
  return <ModuleDetail module={module} ecoStatData={ecoStatData} industryKeraData={industryKeraData} cmoData={cmoData} />;
}
