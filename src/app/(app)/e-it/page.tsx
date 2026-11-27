import { SourcedBrief } from "@/components/SourcedBrief";

const startupMission = {
  source: "Kerala Startup Mission",
  dataset: "Kerala startup ecosystem",
  url: "https://www.startupmission.kerala.gov.in/ecosystem",
  basis: "Figures published on the ecosystem page",
  note: "Checked 27 Nov 2026",
};
const developmentReport = {
  source: "Kerala State Planning Board",
  dataset: "Kerala Development Report 2026, Information Technology",
  url: "https://spb.kerala.gov.in/wp-content/uploads/2026/01/kerala-development-report_2026.pdf",
  period: "FY 2024–25",
};
const kfon = {
  source: "Kerala State Planning Board",
  dataset: "Economic Review 2025, Kerala at a Glance",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume1%20Eng%20final.pdf",
  period: "31 Aug 2025",
};

export default function EitPage() {
  return (
    <SourcedBrief title="Electronics and IT" description="Published startup ecosystem, IT park exports and fibre connectivity figures."
      metrics={[
        { label: "Technology startups", value: "8,000+", provenance: startupMission },
        { label: "Infopark export revenue", value: "₹12,065 cr", provenance: developmentReport },
        { label: "Cyberpark export revenue", value: "₹130 cr", provenance: developmentReport },
        { label: "KFON active connections", value: "1.13 lakh", provenance: kfon },
      ]}
      references={[
        { title: "Kerala Startup Mission ecosystem", description: "Programme figures, support network and district profiles.", provenance: startupMission },
        { title: "Kerala Development Report 2026", description: "Information Technology chapter, including reported exports and employment at IT parks.", provenance: developmentReport },
        { title: "Economic Review 2025", description: "Published KFON connection count and Kerala’s IT sector overview.", provenance: kfon },
      ]}
    />
  );
}
