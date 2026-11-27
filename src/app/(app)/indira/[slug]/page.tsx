import { notFound } from "next/navigation";
import GuaranteeDashboard from "@/components/GuaranteeDashboard";
import { IndiraGuaranteeDetail } from "@/components/IndiraGuarantees";
import { guaranteeBySlug } from "@/data/guarantees";
import { indiraGuarantees } from "@/data/indiraTracker";

export function generateStaticParams() {
  return indiraGuarantees.map(({ slug }) => ({ slug }));
}

export default async function GuaranteePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "free-ksrtc-travel") {
    const snapshot = guaranteeBySlug(slug);
    if (!snapshot) notFound();
    return <GuaranteeDashboard g={snapshot} />;
  }

  const guarantee = indiraGuarantees.find((record) => record.slug === slug);
  if (!guarantee) notFound();
  return <IndiraGuaranteeDetail guarantee={guarantee} />;
}
