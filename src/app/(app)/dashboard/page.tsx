import { DashboardDestinations } from "@/components/DashboardDestinations";
import { FiscalSummary } from "@/components/FiscalWorkspace";
import { SourcedBrief } from "@/components/SourcedBrief";
import { cabinetArchiveUrl } from "@/data/cabinetFeed";
import { programmeMonitor } from "@/data/deliveryActuals";
import { grievancesSnapshot } from "@/data/publicServiceActuals";

export default function KeralaTodayPage() {
  return (
    <SourcedBrief title="Kerala Today" description="Published state finances, programme delivery, grievances and Cabinet updates."
      references={[
        { title: "Cabinet briefing archive", description: "Original briefings published by the Chief Minister’s Office.", provenance: { source: "Chief Minister’s Office", dataset: "Cabinet decisions", url: cabinetArchiveUrl } },
        { title: "100 Days Programme monitor", description: "Government-reported project and indicator status.", provenance: programmeMonitor },
        { title: "CMO grievance dashboard", description: "Published totals for the state grievance system.", provenance: grievancesSnapshot },
        { title: "Recent government announcements", description: "Official press releases with dates and district filters.", provenance: { source: "Kerala Information and Public Relations Department", dataset: "Press releases", url: "https://prd.kerala.gov.in/ml/pressrelease" } },
      ]}
    >
      <FiscalSummary />
      <DashboardDestinations />
    </SourcedBrief>
  );
}
