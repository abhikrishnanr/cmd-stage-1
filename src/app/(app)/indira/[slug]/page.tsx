import { notFound } from "next/navigation";
import { IndiraGuaranteeDetail } from "@/components/IndiraGuarantees";
import { indiraGuarantees } from "@/data/indiraTracker";

export function generateStaticParams() {
  return indiraGuarantees.map(({ slug }) => ({ slug }));
}

export default async function GuaranteePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guarantee = indiraGuarantees.find((record) => record.slug === slug);
  if (!guarantee) notFound();
  return <IndiraGuaranteeDetail guarantee={guarantee} />;
}
