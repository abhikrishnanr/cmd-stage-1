import { SourcedBrief } from "@/components/SourcedBrief";
import { cabinetArchiveUrl } from "@/data/cabinetFeed";
import { grievanceHelp, serviceDashboard } from "@/data/publicServiceActuals";

export default function PublicPage() {
  return (
    <SourcedBrief title="Public View" description="Find original government publications, service dashboards and grievance channels."
      references={[
        { title: "Official Cabinet briefings", description: "Browse the Chief Minister’s published briefing archive.", provenance: { source: "Chief Minister’s Office", dataset: "Cabinet briefing archive", url: cabinetArchiveUrl } },
        { title: "Government press releases", description: "Find dated state and district announcements.", provenance: { source: "Kerala Information and Public Relations Department", dataset: "Press release archive", url: "https://prd.kerala.gov.in/ml/pressrelease" } },
        { title: "Kerala online services", description: "See the publicly reported coverage and application statistics for online services.", provenance: serviceDashboard },
        { title: "Submit or track a grievance", description: "Use the Chief Minister’s grievance portal and official help.", provenance: grievanceHelp },
        { title: "Economic Review 2025", description: "Read the State Planning Board’s economic and sector publications.", provenance: { source: "Kerala State Planning Board", dataset: "Economic Review 2025", url: "https://spb.kerala.gov.in/economic-review/ER2025/" } },
      ]}
    />
  );
}
