import { notFound } from "next/navigation";
import { SourcedBrief } from "@/components/SourcedBrief";
import { sectorActuals } from "@/data/sectorActuals";

export default async function SectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Object.hasOwn(sectorActuals, slug)) notFound();

  return <SourcedBrief {...sectorActuals[slug]} />;
}
