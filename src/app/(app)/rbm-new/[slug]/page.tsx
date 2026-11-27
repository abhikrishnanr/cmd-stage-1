import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RbmNewSchemeDashboard from "@/components/RbmNewSchemeDashboard";
import { rbmNewSchemeBySlug, rbmNewSchemes } from "@/data/rbm-new";

export function generateStaticParams() {
  return rbmNewSchemes.map((scheme) => ({ slug: scheme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scheme = rbmNewSchemeBySlug(slug);
  if (!scheme) return {};
  return {
    title: `${scheme.shortTitle} | RBM Projects (Priority)`,
    description: scheme.purpose,
  };
}

export default async function RbmNewSchemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scheme = rbmNewSchemeBySlug(slug);
  if (!scheme) notFound();
  return <RbmNewSchemeDashboard scheme={scheme} />;
}
