import { SourcedBrief } from "@/components/SourcedBrief";
import { grievanceHelp, grievancesSnapshot } from "@/data/publicServiceActuals";

export default function GrievancesPage() {
  return (
    <SourcedBrief title="Grievances" description="Figures published by the Chief Minister’s Public Grievance Redressal System since 18 May 2026."
      metrics={[
        { label: "Grievances", value: "77,153", provenance: grievancesSnapshot },
        { label: "CMDRF applications", value: "79,970", provenance: grievancesSnapshot },
        { label: "Offices connected", value: "9,939", provenance: grievancesSnapshot },
      ]}
      references={[
        { title: "Chief Minister’s grievance dashboard", description: "Official totals, submission channels and department charts.", provenance: grievancesSnapshot },
        { title: "Grievance submission and help", description: "Official guidance on submitting, tracking or asking about a grievance.", provenance: grievanceHelp },
      ]}
    />
  );
}
