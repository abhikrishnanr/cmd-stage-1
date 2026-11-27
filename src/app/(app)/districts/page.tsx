import { DistrictStatewideBriefing } from "@/components/DistrictBriefing";
import { DistrictDirectory } from "@/components/DistrictDirectory";
import { PageHero } from "@/components/PageHero";
import { districtAdministration, districtDirectorySource } from "@/data/districtAdministration";
import { districtWaterAccess, districtWaterAccessSource } from "@/data/districtWaterAccess";
import { slugify } from "@/data/districts";
import { districtProjectRecords, isOngoingDistrictProject } from "@/data/majorProjectsActuals";

export default function DistrictsPage() {
  const entries = districtAdministration.map((district) => {
    const water = districtWaterAccess.find(({ district: name }) => name === district.name);
    return {
      name: district.name,
      href: `/districts/${slugify(district.name)}`,
      collector: district.collector,
      sources: [district.collectorSource, districtWaterAccessSource],
      waterCoverage: water?.percent,
      inProgress: districtProjectRecords(district.name).filter(isOngoingDistrictProject).length,
    };
  });

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-4 p-4 sm:p-5">
      <PageHero
        icon="MapPinned"
        title="Districts"
        subtitle="Compare service gaps and district growth. Open a district for its Collector, office contacts and ongoing projects."
        gradient="linear-gradient(112deg,#102542 0%,#1c4262 55%,#0d7065 100%)"
        statusLabel="District profiles"
        provenance={[districtDirectorySource]}
      >
        <a href="#district-directory" className="mt-3 inline-block rounded-lg bg-white/15 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white">Find a district</a>
      </PageHero>

      <DistrictStatewideBriefing />
      <DistrictDirectory entries={entries} />
    </div>
  );
}
