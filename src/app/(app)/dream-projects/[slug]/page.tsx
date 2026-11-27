import { notFound } from "next/navigation";
import { MissionSamudraDetail } from "@/components/MissionSamudraDetail";
import { dreamProgrammePage, ProgrammeDetail } from "@/components/ProgrammeEvidence";
import { dreamProgrammeRecords } from "@/data/programmeEvidence";

export function generateStaticParams() {
  return dreamProgrammeRecords.map(({ slug }) => ({ slug }));
}

export default async function DreamProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "mission-samudra") return <MissionSamudraDetail />;
  const program = dreamProgrammeRecords.find((record) => record.slug === slug);
  if (!program) notFound();
  return <ProgrammeDetail config={dreamProgrammePage} program={program} />;
}
