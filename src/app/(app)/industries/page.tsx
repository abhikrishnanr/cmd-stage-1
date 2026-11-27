import { SourcedBrief } from "@/components/SourcedBrief";

const enterpriseReport = {
  source: "Kerala Directorate of Industries and Commerce",
  dataset: "Year of Enterprises, All years",
  url: "https://yearofenterprises.kerala.gov.in/",
  period: "FY 2022–23 to FY 2026–27 as listed by the dashboard",
  basis: "Programme-reported achievements",
  note: "Checked 27 Nov 2026",
};
const land = {
  source: "Kerala Industrial Infrastructure Development Corporation",
  dataset: "Industrial land availability",
  url: "https://landallotment.kerala.gov.in/",
};

export default function IndustriesPage() {
  return (
    <SourcedBrief title="Industries" description="Reported enterprise formation, investment and employment under Kerala’s Year of Enterprises programme."
      metrics={[
        { label: "Units started", value: "4,73,284", provenance: enterpriseReport },
        { label: "Investment", value: "₹32,833.08 cr", provenance: enterpriseReport },
        { label: "Employment generated", value: "10,12,649", provenance: enterpriseReport },
      ]}
      references={[
        { title: "Year of Enterprises programme dashboard", description: "Filter by financial year, district or enterprise category.", provenance: enterpriseReport },
        { title: "Industrial land allotment", description: "Search KINFRA parks and the allotment resources published for investors.", provenance: land },
      ]}
    />
  );
}
