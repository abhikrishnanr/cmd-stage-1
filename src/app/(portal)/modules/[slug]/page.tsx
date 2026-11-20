import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleDetail } from "@/components/ModuleDetail";
import { moduleBySlug, stageModules } from "@/data/modules";

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
  return <ModuleDetail module={module} />;
}
