import { notFound } from "next/navigation";
import { indiraProgrammePage, ProgrammeDetail } from "@/components/ProgrammeEvidence";
import { indiraProgrammeRecords } from "@/data/programmeEvidence";

export function generateStaticParams() {
  return indiraProgrammeRecords.map(({ slug }) => ({ slug }));
}

export default async function GuaranteePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = indiraProgrammeRecords.find((record) => record.slug === slug);
  if (!program) notFound();
  return <ProgrammeDetail config={indiraProgrammePage} program={program} />;
}
