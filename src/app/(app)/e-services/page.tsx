import { SourcedBrief } from "@/components/SourcedBrief";
import { sevanamReport, serviceDashboard, serviceDirectory } from "@/data/publicServiceActuals";

export default function EServicesPage() {
  return (
    <SourcedBrief title="e-Services" description="Published coverage of Kerala’s online services and their originating portals."
      metrics={[
        { label: "Departments in the state dashboard", value: "46", provenance: serviceDashboard },
        { label: "Services in the state dashboard", value: "546", provenance: serviceDashboard },
        { label: "Websites in the state dashboard", value: "63", provenance: serviceDashboard },
        { label: "Services listed on e-Sevanam", value: "939", note: "April 2026 NeSDA coverage", provenance: sevanamReport },
      ]}
      references={[
        { title: "Kerala e-Services Dashboard", description: "Department coverage and published service performance.", provenance: serviceDashboard },
        { title: "All e-services and update dates", description: "Search individual services for received, approved, processing and returned applications.", provenance: serviceDirectory },
        { title: "NeSDA’s April 2026 report", description: "National comparison of unified service portals, including e-Sevanam.", provenance: sevanamReport },
      ]}
    />
  );
}
