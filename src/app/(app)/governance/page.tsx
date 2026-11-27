import { SourcedBrief } from "@/components/SourcedBrief";

export default function GovernancePage() {
  return (
    <SourcedBrief title="Governance and Public Services" description="Official resources for state administration, local government services and citizen service standards."
      references={[
        { title: "Local government digital services", description: "Local Self Government Department documentation of K-SMART, Sulekha, Sevana and related systems.", provenance: { source: "Local Self Government Department", dataset: "Digital governance systems", url: "https://lsgd.kerala.gov.in/en/digital-governance/" } },
        { title: "Local Self Government Citizen Charter", description: "Published services, service delivery standards and time limits.", provenance: { source: "Local Self Government Department", dataset: "Citizen Charter", url: "https://lsgkerala.gov.in/en/resources/citizen-charter" } },
        { title: "Kerala eOffice", description: "File tracking, published government orders and eOffice statistics for the Secretariat and other offices.", provenance: { source: "Kerala eOffice Citizen Portal", dataset: "eOffice access and statistics", url: "https://eoffice.kerala.gov.in/EofficePortal/letterSearchRedirect" } },
      ]}
    />
  );
}
