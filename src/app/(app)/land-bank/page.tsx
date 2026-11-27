import { SourcedBrief } from "@/components/SourcedBrief";

export default function LandBankPage() {
  return (
    <SourcedBrief title="Land Bank" description="Official industrial land listings, allotment rules and survey records."
      references={[
        {
          title: "Industrial land and building allotment",
          description: "Browse KINFRA industrial parks, available allotment options and applicable procedures.",
          provenance: { source: "KINFRA", dataset: "Land allotment portal", url: "https://landallotment.kerala.gov.in/" },
        },
        {
          title: "Invest Kerala Land Bank",
          description: "State industrial land framework for KINFRA and KSIDC properties.",
          provenance: { source: "Invest Kerala", dataset: "Land bank and allotment policy", url: "https://invest.kerala.gov.in/land-bank/" },
        },
        {
          title: "State digital resurvey dashboard",
          description: "Village survey and land record progress from the Ente Bhoomi portal.",
          provenance: { source: "Kerala Survey and Land Records Department", dataset: "Ente Bhoomi", url: "https://survey.entebhoomi.kerala.gov.in/portal/web/dashboard" },
        },
      ]}
    />
  );
}
