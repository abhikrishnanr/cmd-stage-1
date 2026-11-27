import {
  formatTransportNumber as number, TransportBars, TransportHeader, TransportMetrics, TransportSection, TransportTable, TransportValues,
} from "@/components/TransportReport";
import {
  cochinAirport, ferryTotals, kochiMetro, ksrtcDistricts, ksrtcTotals, newVehicleRegistrations, railKilometres,
  registeredVehicles, roadAccidents, roadNetworkKm, roadsByAgency, transportSources as sources, waterMetroTotals,
} from "@/data/transportActuals";

const latestRegistration = registeredVehicles[registeredVehicles.length - 1];
const latestAccidents = roadAccidents[roadAccidents.length - 1];

export default function TransportationPage() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <TransportHeader
        title="Transportation"
        description="Kerala’s road network, road safety and passenger transport, with reporting dates from each operator."
        sources={[sources.roadNetwork, sources.registrations, sources.newRegistrations, sources.roadSafety, sources.bus, sources.busFleet, sources.busRidership, sources.ferry, sources.waterMetro, sources.metroRail, sources.rail, sources.airport]}
        links={[
          { label: "Roads and vehicles", href: "#roads" }, { label: "Road safety", href: "#road-safety" },
          { label: "Bus services", href: "#buses" }, { label: "Water transport", href: "#water-transport" },
          { label: "Rail and metro", href: "#rail-and-metro" }, { label: "Aviation", href: "#aviation" },
          { label: "Public Works", href: "/public-works" },
        ]}
      />

      <TransportMetrics metrics={[
        { label: "Kerala road network", value: number(roadNetworkKm) + " km", source: sources.roadNetwork, color: "network" },
        { label: "Registered vehicles", value: number(latestRegistration.value), source: { ...sources.registrations, period: "31 March 2025" }, color: "network" },
        { label: "Reported road accidents", value: number(latestAccidents.accidents), source: { ...sources.roadSafety, period: latestAccidents.period }, color: "safety" },
        { label: "Kochi Water Metro passengers", value: number(waterMetroTotals.dailyPassengers), source: sources.waterMetro, color: "water" },
      ]} />

      <div className="grid gap-4 xl:grid-cols-2">
        <TransportSection id="roads" title="Road length by maintaining agency" source={sources.roadNetwork}>
          <TransportBars items={roadsByAgency} unit="km" />
        </TransportSection>
        <TransportSection title="Registered motor vehicles" source={sources.registrations}>
          <TransportBars items={registeredVehicles} />
        </TransportSection>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.75fr_1fr]">
        <TransportSection id="road-safety" title="Reported road accidents and casualties" source={sources.roadSafety}>
          <TransportTable label="Kerala road accidents, deaths and injuries by period" columns={["Period", "Accidents", "Deaths", "Injuries"]} rows={roadAccidents.map((row) => [row.period, row.accidents, row.deaths, row.injuries])} />
        </TransportSection>
        <TransportSection title="New vehicle registrations" source={sources.newRegistrations}>
          <TransportValues items={[{ label: "Vehicles registered during the year", value: number(newVehicleRegistrations) }]} />
        </TransportSection>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <TransportSection id="buses" title="KSRTC buses and schedules by district" source={sources.bus}>
          <TransportValues items={[{ label: "Buses held", value: number(ksrtcTotals.buses) }, { label: "Schedules", value: number(ksrtcTotals.schedules) }]} />
          <TransportTable label="KSRTC buses held and schedules by district" columns={["District", "Buses held", "Schedules"]} rows={ksrtcDistricts.map((row) => [row.district, row.buses, row.schedules])} />
        </TransportSection>
        <div className="space-y-4">
          <TransportSection title="KSRTC fleet operations" source={sources.busFleet}>
            <TransportValues items={[
              { label: "Average fleet operated", value: number(ksrtcTotals.averageFleetOperated) + " buses" },
              { label: "Average occupancy", value: number(ksrtcTotals.occupancy) + "%" },
            ]} />
          </TransportSection>
          <TransportSection title="KSRTC daily passenger average" source={{ ...sources.busRidership, period: "2025" }}>
            <TransportValues items={[{ label: "Average daily passengers", value: number(ksrtcTotals.averageDailyPassengersLakh) + " lakh" }]} />
          </TransportSection>
          <TransportSection id="water-transport" title="State Water Transport Department" source={sources.ferry}>
            <TransportValues items={[
              { label: "Passengers carried", value: number(ferryTotals.passengersLakh) + " lakh" },
              { label: "Scheduled trips", value: number(ferryTotals.scheduledTrips) },
              { label: "Boats in operation", value: number(ferryTotals.boatsOperated) },
            ]} />
          </TransportSection>
          <TransportSection title="Kochi Water Metro" source={sources.waterMetro}>
            <TransportValues items={[
              { label: "Passengers on 25 November", value: number(waterMetroTotals.dailyPassengers) },
              { label: "Cumulative passengers shown", value: number(waterMetroTotals.cumulativePassengers) },
            ]} />
          </TransportSection>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <TransportSection id="rail-and-metro" title="Indian Railways network in Kerala" source={sources.rail}>
          <TransportValues items={[
            { label: "Route length", value: number(railKilometres.route) + " km" },
            { label: "Running track length", value: number(railKilometres.runningTrack) + " km" },
            { label: "Total track length", value: number(railKilometres.totalTrack) + " km" },
          ]} />
        </TransportSection>
        <TransportSection title="Kochi Metro rail ridership" source={sources.metroRail}>
          <TransportTable label="Kochi Metro ridership by month, 2025 and 2026" columns={["Month", "2025 passengers", "2026 passengers"]} rows={kochiMetro.map((row) => [row.month, row.prior, row.current])} />
        </TransportSection>
      </div>

      <TransportSection id="aviation" title="Cochin International Airport traffic" source={sources.airport}>
        <TransportValues items={[
          { label: "Total passenger movements", value: number(cochinAirport.passengers) },
          { label: "Domestic passenger movements", value: number(cochinAirport.domesticPassengers) },
          { label: "International passenger movements", value: number(cochinAirport.internationalPassengers) },
          { label: "Aircraft movements", value: number(cochinAirport.aircraftMovements) },
          { label: "Passenger movements in FY 2024–25", value: number(cochinAirport.priorYearPassengers) },
        ]} />
      </TransportSection>
    </div>
  );
}
