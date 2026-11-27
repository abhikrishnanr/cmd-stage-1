import { SourcedBrief } from "@/components/SourcedBrief";
import { keralamCabinetFeedUrl } from "@/data/cabinetFeed";
import { CAG_KERALA_ACCOUNTS_PAGE_URL } from "@/data/cagKeralaAccountsSnapshot";
import { eOfficeCollectorates, grievancesSnapshot, serviceDashboard } from "@/data/publicServiceActuals";

export default function DataSourcesPage() {
  return (
    <SourcedBrief title="Data Sources" description="See where dashboard figures come from and which publisher supplies each dataset."
      references={[
        { title: "Keralam on Track Cabinet feed", description: "Public JSON feed of English Cabinet briefing summaries with original PDFs.", provenance: { source: "Keralam on Track", dataset: "Cabinet Decisions API", url: keralamCabinetFeedUrl } },
        { title: "Kerala monthly state accounts", description: "CAG reports and workbook links used by Finance and Revenue.", provenance: { source: "Accountant General, Kerala", dataset: "State accounts report index", url: CAG_KERALA_ACCOUNTS_PAGE_URL } },
        { title: "PlanSpace 2.0", description: "Official home of the plan monitoring system. Plan Budget Utilisation uses the dated staging export.", provenance: { source: "Kerala State Planning Board", dataset: "PlanSpace monitoring", url: "https://www.planspace.kerala.gov.in/index" } },
        { title: "Ecostat Data Catalogue", description: "Browse the Department of Economics and Statistics’ public datasets and dashboards.", provenance: { source: "Kerala Department of Economics and Statistics", dataset: "Ecostat data catalogue", url: "https://www.ecostat.kerala.gov.in/data-catalogue" } },
        { title: "State Load Despatch Centre", description: "System operations, energy demand, imports and storage readings used on Power.", provenance: { source: "Kerala State Load Despatch Centre", dataset: "Daily system operations", url: "https://sldckerala.com/index.php?id=1" } },
        { title: "Collectorate eFile statistics", description: "Published eOffice activity counters for each district.", provenance: eOfficeCollectorates },
        { title: "Public grievance dashboard", description: "Chief Minister’s grievance and CMDRF application totals.", provenance: grievancesSnapshot },
        { title: "Kerala e-Services Dashboard", description: "Coverage and reporting from online government services.", provenance: serviceDashboard },
      ]}
    />
  );
}
