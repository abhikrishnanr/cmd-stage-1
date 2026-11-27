import { SourcedBrief } from "@/components/SourcedBrief";
import { grievancesSnapshot } from "@/data/publicServiceActuals";

export default function PublicFeedbackPage() {
  return (
    <SourcedBrief title="Public Feedback and Communications" description="Official channels for public feedback, complaints and government press releases."
      references={[
        { title: "Chief Minister’s public grievance dashboard", description: "Published submission and department data for the grievance system.", provenance: grievancesSnapshot },
        { title: "Government press releases", description: "Search official announcements by date and district.", provenance: { source: "Kerala Information and Public Relations Department", dataset: "Press releases", url: "https://prd.kerala.gov.in/ml/pressrelease" } },
      ]}
    />
  );
}
