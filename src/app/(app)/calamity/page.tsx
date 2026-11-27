import {
  formatTransportNumber as number, TransportBars, TransportHeader, TransportMetrics, TransportSection, TransportTable, TransportValues,
} from "@/components/TransportReport";
import { calamitySources, irrigationReservoirs, ksebReservoirs, observedRainfall, southwestMonsoon } from "@/data/calamityActuals";

const reservoirColumns = ["Reservoir", "District", "Water level", "Live storage"];

export default function CalamityPage() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <TransportHeader
        title="Calamity & Climate"
        icon="CloudRainWind"
        description="Observed rainfall, measured reservoir levels and Kerala’s official disaster management resources."
        sources={Object.values(calamitySources)}
        links={[
          { label: "Rainfall", href: "#observed-rainfall" }, { label: "Reservoirs", href: "#reservoir-levels" },
          { label: "Disaster management", href: "#disaster-management" }, { label: "Environment", href: "/sectors/environment-climate" },
        ]}
      />

      <TransportMetrics metrics={[
        { label: "Southwest monsoon rainfall", value: number(southwestMonsoon.observedMm) + " mm", source: calamitySources.monsoon, color: "water" },
        { label: "Monsoon departure from normal", value: number(southwestMonsoon.departurePercent) + "%", source: calamitySources.monsoon, color: "safety" },
        { label: "Angadippuram 24-hour rainfall", value: number(observedRainfall[0].mm) + " mm", source: calamitySources.dailyRain, color: "network" },
        { label: "Idukki reservoir live storage", value: number(ksebReservoirs[0].storagePercent) + "%", source: calamitySources.powerReservoirs, color: "service" },
      ]} />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <TransportSection id="observed-rainfall" title="24-hour rainfall at selected gauges" source={calamitySources.dailyRain}>
          <TransportTable
            label="Observed rainfall at selected IMD gauges in Kerala"
            columns={["Station", "District", "Rainfall (mm)"]}
            rows={observedRainfall.map((row) => [row.station, row.district, row.mm])}
          />
        </TransportSection>
        <TransportSection title="Kerala southwest monsoon rainfall" source={calamitySources.monsoon}>
          <TransportBars items={[
            { label: "Observed rainfall", value: southwestMonsoon.observedMm, color: "#0e7490" },
            { label: "IMD normal for the period", value: southwestMonsoon.normalMm, color: "#64748b" },
          ]} unit="mm" />
        </TransportSection>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <TransportSection id="reservoir-levels" title="Selected KSEB reservoirs" source={calamitySources.powerReservoirs}>
          <TransportTable label="Selected KSEB reservoir observations" columns={reservoirColumns} rows={ksebReservoirs.map((row) => [row.name, row.district, row.level, number(row.storagePercent) + "%"])} />
        </TransportSection>
        <TransportSection title="Selected irrigation reservoirs" source={calamitySources.irrigationReservoirs}>
          <TransportTable label="Selected irrigation reservoir observations" columns={reservoirColumns} rows={irrigationReservoirs.map((row) => [row.name, row.district, row.level, number(row.storagePercent) + "%"])} />
        </TransportSection>
      </div>

      <TransportSection id="disaster-management" title="Official disaster management resources" source={calamitySources.preparedness}>
        <TransportValues items={[
          { label: "State Disaster Management Plan update", value: "G.O. (Rt) 424/2026/DMD" },
        ]} />
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="https://sdma.kerala.gov.in/rainfall-2/" className="text-xs font-bold text-blue-800 hover:underline" target="_blank" rel="noreferrer">KSDMA rainfall and warning bulletin</a>
          <a href="https://sdma.kerala.gov.in/dam-water-level/" className="text-xs font-bold text-blue-800 hover:underline" target="_blank" rel="noreferrer">KSDMA reservoir bulletins</a>
          <a href="https://sdma.kerala.gov.in/notified-disasters/" className="text-xs font-bold text-blue-800 hover:underline" target="_blank" rel="noreferrer">Notified disasters and relief norms</a>
        </div>
      </TransportSection>
    </div>
  );
}
