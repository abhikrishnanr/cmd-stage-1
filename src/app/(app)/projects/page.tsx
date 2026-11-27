import MajorProjectRegister from "@/components/MajorProjectRegister";
import { formatTransportNumber as number, TransportHeader, TransportMetrics } from "@/components/TransportReport";
import { majorProjectPortfolio, majorProjectSources } from "@/data/majorProjectsActuals";

const { highways, rail } = majorProjectPortfolio;

export default function ProjectsPage() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <TransportHeader
        title="Major Infrastructure Projects"
        description="Selected milestones and progress reports from Kerala’s infrastructure agencies and project partners."
        publicWorks
        sources={[highways.source, ...majorProjectSources]}
        links={[
          { label: "Project records", href: "#project-records" },
          { label: "Public Works", href: "/public-works" },
          { label: "Transportation", href: "/sectors/transportation" },
        ]}
      />
      <TransportMetrics metrics={[
        { label: "National Highway projects reviewed", value: number(highways.count), source: highways.source, color: "works" },
        { label: "National Highway length reviewed", value: number(highways.kilometres) + " km", source: highways.source, color: "works" },
        { label: "Railway length commissioned", value: number(rail.kilometresCommissioned) + " km", source: rail.source, color: "network" },
        { label: "Expenditure on six railway projects", value: "₹" + number(rail.expenditureCrore) + " crore", source: rail.source, color: "network" },
      ]} />
      <MajorProjectRegister />
    </div>
  );
}
