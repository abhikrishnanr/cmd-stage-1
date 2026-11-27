import { CabinetDecisionsCard } from "@/components/CabinetDecisionsCard";
import { CmReviewLink } from "@/components/CmReviewLink";
import { DashboardDestinations } from "@/components/DashboardDestinations";
import { DistrictEconomyMap } from "@/components/DistrictEconomyMap";
import { FiscalSummary } from "@/components/FiscalWorkspace";
import { LeaderHero } from "@/components/LeaderHero";
import { leaderBySlug } from "@/data/leaders";

export function ChiefMinisterOverview() {
  const chiefMinister = leaderBySlug("vd-satheeshan");
  if (!chiefMinister) return null;

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <LeaderHero leader={chiefMinister} />
      <CmReviewLink />
      <CabinetDecisionsCard />
      <FiscalSummary />
      <DistrictEconomyMap />
      <DashboardDestinations />
    </div>
  );
}
