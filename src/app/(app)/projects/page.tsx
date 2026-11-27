import MajorProjectRegister from "@/components/MajorProjectRegister";
import { formatTransportNumber as number, TransportHeader, TransportMetrics } from "@/components/TransportReport";
import { majorProjectPortfolio, majorProjectSources } from "@/data/majorProjectsActuals";

const { highways, rail } = majorProjectPortfolio;

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 p-4 sm:p-5">
      <TransportHeader
        title="Major Infrastructure Projects"
        description="Browse ongoing works in Kerala’s 14 districts and review documented changes to completion dates."
        publicWorks
        sourceIcons
        sources={[highways.source, ...majorProjectSources]}
        links={[
          { label: "What needs attention", href: "#project-attention" },
          { label: "Projects by district", href: "#project-records" },
          { label: "District directory", href: "/districts" },
          { label: "Public Works", href: "/public-works" },
          { label: "Transportation", href: "/sectors/transportation" },
        ]}
      />
      <MajorProjectRegister />
      <details className="rounded-xl border border-slate-200 bg-white p-4">
        <summary className="cursor-pointer text-sm font-extrabold text-slate-900">Statewide highway and rail context</summary>
        <div className="mt-3">
          <TransportMetrics sourceIcons metrics={[
            { label: "National Highway projects reviewed", value: number(highways.count), source: highways.source, color: "works" },
            { label: "National Highway length reviewed", value: number(highways.kilometres) + " km", source: highways.source, color: "works" },
            { label: "Railway length commissioned", value: number(rail.kilometresCommissioned) + " km", source: rail.source, color: "network" },
            { label: "Expenditure on six railway projects", value: "₹" + number(rail.expenditureCrore) + " crore", source: rail.source, color: "network" },
          ]} />
        </div>
      </details>
    </div>
  );
}
