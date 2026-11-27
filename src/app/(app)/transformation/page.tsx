import { SourcedBrief } from "@/components/SourcedBrief";

export default function TransformationPage() {
  return (
    <SourcedBrief title="Transformation Programmes" description="Published implementation records for Kerala’s resilience, agriculture and local service programmes."
      references={[
        { title: "Rebuild Kerala Initiative", description: "The government’s project monitoring site lists project records and their implementing departments.", provenance: { source: "Government of Kerala", dataset: "Rebuild Kerala monitoring portal", url: "https://pms.rebuild.kerala.gov.in/" } },
        { title: "Resilient Kerala Program for Results", description: "Implementation monitoring reports for the programme co-financed by AIIB, the World Bank and AFD.", provenance: { source: "Asian Infrastructure Investment Bank", dataset: "Resilient Kerala implementation reports", url: "https://aiib.org/en/projects/details/2021/approved/India-Resilient-Kerala-Program-for-Results.html" } },
        { title: "KERA agriculture programme", description: "Official materials on the Kerala Climate Resilient Agri-Value Chain Modernization project.", provenance: { source: "Government of Kerala", dataset: "KERA project portal", url: "https://kera.kerala.gov.in/" } },
        { title: "K-SMART local services", description: "Citizen portal for services provided by Kerala’s local bodies.", provenance: { source: "Local Self Government Department", dataset: "K-SMART", url: "https://ksmart.lsgkerala.gov.in/" } },
      ]}
    />
  );
}
