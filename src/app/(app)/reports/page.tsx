import { SourcedBrief } from "@/components/SourcedBrief";
import { cabinetArchiveUrl } from "@/data/cabinetFeed";

export default function ReportsPage() {
  return (
    <SourcedBrief title="Reports and Briefings" description="Original reports, Cabinet publications and the authorised government reporting workspace."
      references={[
        { title: "Cabinet briefings", description: "The Chief Minister’s official archive of Cabinet briefing PDFs.", provenance: { source: "Chief Minister’s Office", dataset: "Cabinet briefing archive", url: cabinetArchiveUrl } },
        { title: "Economic Review 2025", description: "The State Planning Board’s review, sector chapters and tables.", provenance: { source: "Kerala State Planning Board", dataset: "Economic Review 2025", url: "https://spb.kerala.gov.in/economic-review/ER2025/" } },
        { title: "Kerala state accounts", description: "CAG monthly key indicators and financial publications.", provenance: { source: "Accountant General, Kerala", dataset: "State accounts report index", url: "https://cag.gov.in/ae/kerala/en/state-accounts-report?defuat_account_report_type=360" } },
        { title: "Keralam on Track Reports", description: "Sign in to access authorised government reports.", provenance: { source: "Keralam on Track", dataset: "Reports workspace", url: "https://keralamontrack.webtestingonline.com/reports" } },
      ]}
    />
  );
}
