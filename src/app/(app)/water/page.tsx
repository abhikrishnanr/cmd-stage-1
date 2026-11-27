import {
  formatTransportNumber as number, TransportBars, TransportHeader, TransportMetrics, TransportSection, TransportTable, TransportValues,
} from "@/components/TransportReport";
import { DistrictWaterAccessTable } from "@/components/DistrictWaterAccessTable";
import { districtWaterAccessSource, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import { waterConnections, waterConnectionTotal, waterOffices, waterQuality, waterSources } from "@/data/water";

export default function WaterPage() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <TransportHeader
        title="Water"
        icon="Droplets"
        description="Kerala Water Authority connections and quality testing, with rural tap water coverage from Jal Jeevan Mission."
        sources={[...Object.values(waterSources), districtWaterAccessSource]}
        links={[
          { label: "KWA connections", href: "#water-connections" }, { label: "Rural households", href: "#rural-water" },
          { label: "Water quality", href: "#water-testing" }, { label: "Consumer services", href: "#water-services" },
          { label: "Infrastructure projects", href: "/projects#project-koyilandy-water" },
        ]}
      />

      <TransportMetrics metrics={[
        { label: "KWA connections", value: number(waterConnectionTotal), source: waterSources.connections, color: "water" },
        { label: "Domestic KWA connections", value: number(waterConnections[0].value), source: waterSources.connections, color: "network" },
        { label: "Rural households with tap connections", value: number(districtWaterAccessTotal.percent) + "%", source: districtWaterAccessSource, color: "service" },
        { label: "KWA lab and field tests", value: number(waterQuality.total), source: waterSources.quality, color: "water" },
      ]} />

      <div className="grid gap-4 xl:grid-cols-2">
        <TransportSection id="water-connections" title="KWA connections by category" source={waterSources.connections}>
          <TransportBars items={waterConnections} color="#0e7490" />
          <a className="text-xs font-bold text-blue-800 hover:underline" href="https://kwa.kerala.gov.in/en/connection-statistics/" target="_blank" rel="noreferrer">Open KWA’s office statistics</a>
        </TransportSection>
        <TransportSection title="KWA connections by operating region" source={waterSources.connections}>
          <p className="text-sm text-slate-600">Regional totals sum the sections with published counts.</p>
          <TransportTable
            label="KWA connections reported by office region"
            columns={["Region", "Connections", "Sections with data", "Listed sections"]}
            rows={waterOffices.map((row) => [row.region, row.connections, row.sectionsWithCounts, row.sectionsListed])}
          />
        </TransportSection>
      </div>

      <TransportSection id="rural-water" title="Rural tap connections by district" source={districtWaterAccessSource}>
        <DistrictWaterAccessTable />
      </TransportSection>

      <div className="grid gap-4 xl:grid-cols-2">
        <TransportSection id="water-testing" title="KWA water quality tests" source={waterSources.quality}>
          <TransportValues items={[
            { label: "Physical and chemical lab tests", value: number(waterQuality.physicoChemicalLab) },
            { label: "Bacteriological lab tests", value: number(waterQuality.bacteriologicalLab) },
            { label: "Treated water samples tested in field", value: number(waterQuality.treatedWaterField) },
            { label: "Failed treated samples reported", value: number(waterQuality.failedTreatedSamples) },
          ]} />
        </TransportSection>
        <TransportSection id="water-services" title="Water connection service standards" source={waterSources.services}>
          <TransportValues items={[
            { label: "Domestic application fee", value: "₹500" },
            { label: "Non-domestic application fee", value: "₹1,000" },
            { label: "Right to Service time limit", value: "15 days" },
            { label: "KWA toll-free number", value: "1916" },
          ]} />
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="https://kwa.kerala.gov.in/en/statistics/" className="text-xs font-bold text-blue-800 hover:underline" target="_blank" rel="noreferrer">KWA statistics portal</a>
            <a href="https://pask.kwa.kerala.gov.in/" className="text-xs font-bold text-blue-800 hover:underline" target="_blank" rel="noreferrer">KWA project status portal</a>
          </div>
        </TransportSection>
      </div>
    </div>
  );
}
