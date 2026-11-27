import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RbmProjectDashboard from "@/components/RbmProjectDashboard";
import { rbmProjectBySlug, rbmProjects } from "@/data/rbm";

export function generateStaticParams() {
  return rbmProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = rbmProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.shortTitle} RBM | CM Governance Dashboard`;
  return {
    title,
    description: project.outcomeStatement,
    openGraph: { title, description: project.outcomeStatement, images: [] },
    twitter: { title, description: project.outcomeStatement, images: [] },
  };
}

export default async function RbmProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = rbmProjectBySlug(slug);
  if (!project) notFound();
  return <RbmProjectDashboard project={project} />;
}
