import { CabinetDecisionsCard } from "@/components/CabinetDecisionsCard";
import { CmDashboardHero } from "@/components/CmDashboardHero";
import { CmDecisionSignals } from "@/components/CmDecisionSignals";
import { CmDepartmentBriefing } from "@/components/CmDepartmentBriefing";
import { CmFiscalOverview } from "@/components/CmFiscalOverview";
import { CmIndiraProgress } from "@/components/CmIndiraProgress";
import { CmMissionSamudra } from "@/components/CmMissionSamudra";
import { DistrictEconomyMap } from "@/components/DistrictEconomyMap";

const dashboardSections = [
  { id: "what-to-watch", label: "What to watch" },
  { id: "department-briefing", label: "Departments" },
  { id: "cabinet", label: "Cabinet" },
  { id: "state-finances", label: "State finances" },
  { id: "indira-progress", label: "Indira Guarantees" },
  { id: "mission-samudra", label: "Mission Samudra" },
  { id: "district-economy", label: "District Command Map" },
];

export function ChiefMinisterOverview() {
  return (
    <div className="mx-auto grid w-full max-w-[1500px] min-w-0 gap-5 p-4 sm:p-5">
      <CmDashboardHero />
      <nav aria-label="Dashboard sections" className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm">
        {dashboardSections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#19466c] hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-teal-700">
            {section.label}
          </a>
        ))}
      </nav>
      <CmDecisionSignals />
      <CmDepartmentBriefing />
      <div id="cabinet" className="min-w-0 scroll-mt-20"><CabinetDecisionsCard /></div>
      <CmFiscalOverview />
      <CmIndiraProgress />
      <div id="mission-samudra" className="min-w-0 scroll-mt-20"><CmMissionSamudra /></div>
      <div id="district-economy" className="min-w-0 scroll-mt-20"><DistrictEconomyMap includeDistrictFindings /></div>
    </div>
  );
}
