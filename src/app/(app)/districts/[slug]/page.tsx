import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionCard } from "@/components/primitives";
import {
  districtAdministrationBySlug,
  districtDirectorySource,
  districtLocalBodiesSource,
  districtPopulationSource,
} from "@/data/districtAdministration";
import { majorProjects } from "@/data/majorProjectsActuals";

const count = new Intl.NumberFormat("en-IN");

export default async function DistrictDetail({ params }: { params: Promise<{ slug: string }> }) {
  const district = districtAdministrationBySlug((await params).slug);
  if (!district) notFound();
  const projects = majorProjects.filter((project) => project.districts?.includes(district.name));

  const officerSource = {
    ...districtDirectorySource,
    source: `${district.name} district administration`,
    dataset: "District Collector",
    url: district.profile,
  };
  const contactSource = {
    ...districtDirectorySource,
    source: `Collector’s office · ${district.name}`,
    dataset: "Office contact directory",
    url: district.contact,
    basis: "Published office address, email and telephone",
  };

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <Link href="/districts" className="inline-flex items-center gap-1.5 rounded text-sm font-bold text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-blue-700">
        <ArrowLeft size={15} aria-hidden="true" /> All districts
      </Link>
      <PageHero
        title={`${district.name} district`}
        subtitle="District Collector, office contacts and local government profile."
        icon="MapPin"
        statusLabel="Official district profile"
        gradient="linear-gradient(112deg,#102542 0%,#1c4262 55%,#0d7065 100%)"
        provenance={[officerSource, districtPopulationSource, districtLocalBodiesSource]}
        stats={[
          { label: "Population", value: count.format(district.population), sub: "2011 Census", icon: "Users", provenance: districtPopulationSource },
          { label: "Grama panchayats", value: count.format(district.gramaPanchayats), sub: "2024 audit", icon: "MapPinned", provenance: districtLocalBodiesSource },
          { label: "Block panchayats", value: count.format(district.blockPanchayats), sub: "2024 audit", icon: "Layers", provenance: districtLocalBodiesSource },
          { label: "Municipalities", value: count.format(district.municipalities), sub: "2024 audit", icon: "Building2", provenance: districtLocalBodiesSource },
          { label: "Municipal corporations", value: count.format(district.corporations), sub: "2024 audit", icon: "Landmark", provenance: districtLocalBodiesSource },
        ]}
      />

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <SectionCard title="District Collector" icon="Landmark" provenance={officerSource}>
          <div className="rounded-xl bg-teal-50 p-4 text-teal-950">
            <p className="text-lg font-extrabold">{district.collector}</p>
            <p className="text-sm">Collector and District Magistrate</p>
          </div>
          <a href={district.profile} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:underline">
            Official Collector profile <ExternalLink size={14} aria-hidden="true" />
          </a>
        </SectionCard>

        <SectionCard title="Collector’s office" icon="Phone" provenance={contactSource}>
          <address className="space-y-3 text-sm not-italic text-slate-700">
            <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-teal-800" aria-hidden="true" /> {district.office}</p>
            <p className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-teal-800" aria-hidden="true" />
              <a href={`tel:+91${district.phone.replace(/\D/g, "").slice(1)}`} className="font-bold hover:underline">{district.phone}</a>
            </p>
            <p className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-teal-800" aria-hidden="true" />
              <a href={`mailto:${district.email}`} className="break-all font-bold hover:underline">{district.email}</a>
            </p>
          </address>
          {district.contact !== district.profile && (
            <a href={district.contact} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:underline">
              Official office contacts <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </SectionCard>
      </div>

      {projects.length > 0 && (
        <SectionCard title={`Major infrastructure in ${district.name}`} icon="HardHat">
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <p className="text-xs font-bold text-teal-900">{project.stage} · {project.source.period}</p>
                <Link href={`/projects#project-${project.id}`} className="mt-1 inline-flex items-center gap-1.5 text-sm font-extrabold text-slate-900 hover:underline">
                  {project.name} <ArrowUpRight size={13} className="shrink-0" aria-hidden="true" />
                </Link>
                <p className="mt-1.5 text-sm text-slate-700">{project.summary}</p>
                <a href={project.source.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:underline">
                  {project.source.source} <ExternalLink size={12} className="shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}
    </div>
  );
}
