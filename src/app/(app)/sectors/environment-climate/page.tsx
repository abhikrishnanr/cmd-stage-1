import {
  formatTransportNumber as number, TransportBars, TransportHeader, TransportMetrics, TransportSection, TransportTable,
} from "@/components/TransportReport";
import { airStations, districtForestCover, environmentSources, forestClasses, forestCover, ramsarWetlands, riverReadings } from "@/data/environmentActuals";

const forestDistricts = [...districtForestCover].sort((first, second) => second.squareKm - first.squareKm);

export default function EnvironmentPage() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <TransportHeader
        title="Environment"
        icon="CloudSun"
        description="Air and river monitoring readings, forest cover and Kerala’s designated Ramsar wetlands."
        sources={Object.values(environmentSources)}
        links={[
          { label: "Air quality", href: "#air-quality" }, { label: "River water", href: "#river-water" },
          { label: "Forest cover", href: "#forest-cover" }, { label: "Wetlands", href: "#wetlands" },
          { label: "Calamity & Climate", href: "/calamity" },
        ]}
      />

      <TransportMetrics metrics={[
        { label: "Kerala forest cover", value: number(forestCover.squareKm) + " km²", source: environmentSources.forests, color: "water" },
        { label: "Share of state area with forest cover", value: number(forestCover.stateAreaPercent) + "%", source: environmentSources.forests, color: "water" },
        { label: "Stations with AQI readings", value: number(airStations.length), source: environmentSources.air, color: "network" },
        { label: "Ramsar wetlands in Kerala", value: number(ramsarWetlands.length), source: environmentSources.wetlands, color: "service" },
      ]} />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.15fr]">
        <TransportSection id="air-quality" title="Daily ambient air quality" source={environmentSources.air}>
          <TransportTable
            label="Kerala station AQI, PM2.5 and PM10 on 17 November 2026"
            columns={["Station", "AQI", "PM₂.₅ (µg/m³)", "PM₁₀ (µg/m³)", "Category"]}
            rows={airStations.map((row) => [row.station, row.aqi, row.pm25, row.pm10, row.category])}
          />
        </TransportSection>
        <TransportSection id="river-water" title="River water samples" source={environmentSources.rivers}>
          <TransportTable
            label="Selected Kerala river readings from March 2026"
            columns={["Sampling location", "Date", "pH", "Dissolved oxygen (mg/L)", "BOD (mg/L)"]}
            rows={riverReadings.map((row) => [row.site, row.date, row.ph, row.dissolvedOxygen, row.bod])}
          />
          <p className="text-sm text-slate-600">BOD is biochemical oxygen demand. Each row is a sample from the stated location and date.</p>
        </TransportSection>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.15fr]">
        <div className="space-y-4">
          <TransportSection id="forest-cover" title="Forest cover by canopy density" source={environmentSources.forests}>
            <TransportBars items={forestClasses} unit="km²" />
          </TransportSection>
          <TransportSection id="wetlands" title="Designated Ramsar wetlands" source={environmentSources.wetlands}>
            <TransportTable label="Kerala Ramsar wetland areas" columns={["Wetland", "Designated area (hectares)"]} rows={ramsarWetlands.map((row) => [row.name, row.hectares])} />
          </TransportSection>
        </div>
        <TransportSection title="Forest cover by district" source={environmentSources.forests}>
          <TransportTable
            label="Forest area and coverage share across Kerala districts"
            columns={["District", "Forest cover (km²)", "Share of district (%)"]}
            rows={forestDistricts.map((row) => [row.district, row.squareKm, row.percent])}
          />
        </TransportSection>
      </div>
    </div>
  );
}
