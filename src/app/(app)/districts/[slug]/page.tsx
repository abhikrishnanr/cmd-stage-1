import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { DistrictBriefing } from "@/components/DistrictBriefing";
import { DistrictProjectList } from "@/components/DistrictProjectList";
import { PageHero } from "@/components/PageHero";
import { SectionCard } from "@/components/primitives";
import {
  districtAdministration,
  districtAdministrationBySlug,
  districtDirectorySource,
  districtLocalBodiesSource,
  districtPopulationSource,
} from "@/data/districtAdministration";
import { districtFindings, districtOutputProvenance } from "@/data/districtBriefing";
import { districtWaterAccessSource } from "@/data/districtWaterAccess";
import { slugify } from "@/data/districts";
import { districtProjectRecords } from "@/data/majorProjectsActuals";

const count = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
type DistrictPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return districtAdministration.map(({ name }) => ({ slug: slugify(name) }));
}

export async function generateMetadata({ params }: DistrictPageProps): Promise<Metadata> {
  const district = districtAdministrationBySlug((await params).slug);
  return { title: district ? `${district.name} District | CM Governance Dashboard` : "Districts | CM Governance Dashboard" };
}

export default async function DistrictDetail({ params }: DistrictPageProps) {
  const district = districtAdministrationBySlug((await params).slug);
  if (!district) notFound();
  const findings = districtFindings(district.name);
  const projects = districtProjectRecords(district.name);
  const contactSource = {
    source: `Collector’s office · ${district.name}`,
    dataset: "Published office contacts",
    url: district.contact,
    fetchedAt: districtDirectorySource.fetchedAt,
  };
  const localGovernment = [
    { label: "Grama panchayats", value: district.gramaPanchayats },
    { label: "Block panchayats", value: district.blockPanchayats },
    { label: "Municipalities", value: district.municipalities },
    { label: "Municipal corporations", value: district.corporations },
  ];
  const jumpLinks = [
    ...(findings ? [{ label: "District briefing", href: "#district-briefing" }] : []),
    { label: "Ongoing projects", href: "#district-projects" },
    { label: "Administration", href: "#district-administration" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-4 p-4 sm:p-5">
      <Link href="/districts#district-directory" className="inline-flex items-center gap-1.5 rounded text-sm font-bold text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-blue-700">
        <ArrowLeft size={15} aria-hidden="true" /> All districts
      </Link>
      <PageHero
        title={`${district.name} district`}
        subtitle={`District Collector · ${district.collector}`}
        icon="MapPin"
        statusLabel="District profile"
        gradient="linear-gradient(112deg,#102542 0%,#1c4262 55%,#0d7065 100%)"
        provenance={[district.collectorSource, districtPopulationSource, ...(findings ? [districtOutputProvenance, districtWaterAccessSource] : [])]}
        stats={[
          { label: "Population", value: count.format(district.population), sub: "2011 Census", icon: "Users" },
          ...(findings ? [
            { label: "District output", value: `₹${count.format(findings.outputCrore)} crore`, sub: "FY 2024–25 quick estimate · current prices", icon: "ChartNoAxesCombined" },
            { label: "Rural tap coverage", value: `${count.format(findings.waterCoverage)}%`, sub: districtWaterAccessSource.period, icon: "Droplets" },
          ] : []),
        ]}
      />
      <nav aria-label="District page sections" className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm">
        {jumpLinks.map(({ label, href }) => (
          <a key={href} href={href} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#19466c] hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-teal-700">{label}</a>
        ))}
      </nav>

      {findings && <DistrictBriefing attention={findings.attention} economy={findings.economy} />}
      <DistrictProjectList name={district.name} projects={projects} />

      <section id="district-administration" aria-labelledby="district-administration-heading" className="scroll-mt-20 space-y-3">
        <h2 id="district-administration-heading" className="text-lg font-extrabold text-slate-900">District administration</h2>
        <div className="grid items-start gap-3 lg:grid-cols-2">
          <SectionCard title="Collector’s office" icon="Landmark" right={<CmSourceDetails label={`${district.name} Collector and office sources`} sources={[district.collectorSource, contactSource]} />}>
            <p className="text-base font-extrabold text-teal-950">{district.collector}</p>
            <p className="mb-3 text-xs text-slate-600">Collector and District Magistrate</p>
            <address className="space-y-2 text-sm not-italic text-slate-700">
              <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-teal-800" aria-hidden="true" /> {district.office}</p>
              <p className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-teal-800" aria-hidden="true" />
                <a href={`tel:+91${district.phone.replace(/\D/g, "").replace(/^0/, "")}`} className="font-bold hover:underline">{district.phone}</a>
              </p>
              <p className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-teal-800" aria-hidden="true" />
                <a href={`mailto:${district.email}`} className="break-all font-bold hover:underline">{district.email}</a>
              </p>
            </address>
          </SectionCard>
          <SectionCard title="Local government" subtitle="CAG audit · Year ended March 2024" icon="Layers" right={<CmSourceDetails label={`${district.name} local government source`} sources={[districtLocalBodiesSource]} />}>
            <dl className="grid grid-cols-2 gap-2">
              {localGovernment.map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-slate-50 px-2.5 py-2">
                  <dt className="text-xs text-slate-600">{label}</dt>
                  <dd className="text-lg font-extrabold tabular-nums text-slate-900">{count.format(value)}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </div>
      </section>
    </div>
  );
}
