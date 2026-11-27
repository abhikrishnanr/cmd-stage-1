import {
  formatTransportNumber as number, TransportBars, TransportHeader, TransportMetrics, TransportSection, TransportTable, TransportValues,
} from "@/components/TransportReport";
import {
  completedPwdBridges, highwayOpenings, pwdBridges, pwdBridgeTotal, pwdRoadDistricts, pwdRoadTotals,
  rebuildCompletions, transportSources as sources,
} from "@/data/transportActuals";

const districtRoads = [...pwdRoadDistricts].sort((first, second) => second.totalKm - first.totalKm);
const topDistricts = districtRoads.slice(0, 5).map((row) => ({ label: row.district, value: row.totalKm }));

export default function PublicWorksPage() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <TransportHeader
        title="Public Works"
        description="Kerala’s PWD roads and bridges, with district inventories and documented project completions."
        publicWorks
        sources={[sources.pwdDistricts, sources.pwdSurface, sources.pwdBridges, sources.pwdCompletions, sources.rebuild, sources.openings]}
        links={[
          { label: "PWD roads", href: "#pwd-roads" }, { label: "Bridges", href: "#pwd-bridges" },
          { label: "Completed works", href: "#completed-works" }, { label: "Highway openings", href: "#highway-openings" },
          { label: "Transportation", href: "/sectors/transportation" },
        ]}
      />

      <TransportMetrics metrics={[
        { label: "PWD Roads Wing network", value: number(pwdRoadTotals.totalKm) + " km", source: sources.pwdDistricts, color: "works" },
        { label: "PWD roads of BMBC standard", value: number(pwdRoadTotals.bmbcKm) + " km", source: sources.pwdSurface, color: "works" },
        { label: "Bridges maintained", value: number(pwdBridgeTotal), source: sources.pwdBridges, color: "network" },
        { label: "New bridges completed", value: number(completedPwdBridges), source: sources.pwdCompletions, color: "service" },
      ]} />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <TransportSection id="pwd-roads" title="PWD road lengths by district" source={sources.pwdDistricts}>
          <TransportTable
            label="PWD road network by district, in kilometres"
            columns={["District", "State Highways (km)", "Major District Roads (km)", "Total (km)"]}
            rows={districtRoads.map((row) => [row.district, row.highwayKm, row.districtRoadKm, row.totalKm])}
          />
        </TransportSection>
        <div className="space-y-4">
          <TransportSection title="Five largest PWD road networks" source={sources.pwdDistricts}>
            <TransportBars items={topDistricts} unit="km" color="#a0440d" />
            <TransportValues items={[
              { label: "State Highways", value: number(pwdRoadTotals.highwayKm) + " km" },
              { label: "Major District Roads", value: number(pwdRoadTotals.districtRoadKm) + " km" },
            ]} />
          </TransportSection>
          <TransportSection id="pwd-bridges" title="Bridges by road category" source={sources.pwdBridges}>
            <TransportBars items={pwdBridges} />
          </TransportSection>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <TransportSection id="completed-works" title="Rebuild Kerala Initiative completions" source={sources.rebuild}>
          <TransportValues items={[
            { label: "KSTP / PWD works", value: number(rebuildCompletions.kstpPwdWorks) },
            { label: "Local-government road works", value: number(rebuildCompletions.localRoadWorks) },
            { label: "Village offices", value: number(rebuildCompletions.villageOffices) },
            { label: "Other Revenue Department buildings", value: number(rebuildCompletions.otherRevenueBuildings) },
          ]} />
        </TransportSection>
        <TransportSection id="highway-openings" title="National and rural road openings" source={sources.openings}>
          <TransportTable
            label="Road works inaugurated on 11 March 2026"
            columns={["Road or programme", "Work recorded"]}
            rows={highwayOpenings.map((row) => [row.name, row.work])}
          />
        </TransportSection>
      </div>
    </div>
  );
}
