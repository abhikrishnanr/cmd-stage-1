import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, BusFront, ChevronDown, Ship, TriangleAlert } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import {
  formatTransportNumber as number, TransportBars, TransportHeader, TransportMetrics, TransportSection, TransportTable, TransportValues,
} from "@/components/TransportReport";
import {
  cochinAirport, ferryTotals, kochiMetro, ksrtcDistricts, ksrtcTotals, newVehicleRegistrations, railKilometres,
  registeredVehicles, roadAccidents, roadNetworkKm, roadsByAgency, transportSources as sources,
  waterMetroTotals, type TransportSource,
} from "@/data/transportActuals";
import {
  cochinAirportPriorAircraftMovements, earlierRoadSafetyTotals, ksrtcDailyPassengers, priorRoadSafetyWindow,
  swtdAnnualOperations, transportDashboardSources as dashboardSources,
} from "@/data/transportDashboard";
import styles from "./TransportDashboard.module.css";

const change = (current: number, previous: number) => (current / previous - 1) * 100;
const percent = (value: number) => value.toFixed(1) + "%";
const lakh = (value: number) => number(value / 100000) + " lakh";

const latestRegistration = registeredVehicles[registeredVehicles.length - 1];
const latestAccidents = roadAccidents[roadAccidents.length - 1];
const fullYears = [...earlierRoadSafetyTotals, ...roadAccidents.filter((row) => /^\d{4}$/.test(row.period))];
const roadAccidentChange = change(latestAccidents.accidents, priorRoadSafetyWindow.accidents);
const roadFatalityChange = change(latestAccidents.deaths, priorRoadSafetyWindow.deaths);
const fleetDifference = ksrtcTotals.buses - ksrtcTotals.averageFleetOperated;
const fleetShare = ksrtcTotals.averageFleetOperated / ksrtcTotals.buses * 100;
const priorFerry = swtdAnnualOperations[swtdAnnualOperations.length - 2];
const ferryTripChange = change(ferryTotals.scheduledTrips, priorFerry.scheduledTrips);
const ferryPassengerChange = change(ferryTotals.passengersLakh, priorFerry.passengersLakh);
const metroPrior = kochiMetro.reduce((total, row) => total + row.prior, 0);
const metroCurrent = kochiMetro.reduce((total, row) => total + row.current, 0);
const localRoadShare = roadsByAgency[0].value / roadNetworkKm * 100;
const latestBusYear = ksrtcDailyPassengers[ksrtcDailyPassengers.length - 1];
const airportChange = change(cochinAirport.passengers, cochinAirport.priorYearPassengers);
const flightChange = change(cochinAirport.aircraftMovements, cochinAirportPriorAircraftMovements);

type ChartGroup = { period: string; values: number[] };
type ChartSeries = { label: string; color: string };

function Columns({ groups, series, maximum, label, unit }: {
  groups: ChartGroup[];
  series: ChartSeries[];
  maximum: number;
  label: string;
  unit?: string;
}) {
  return (
    <figure className={styles.figure} aria-label={label}>
      {series.length > 1 && (
        <ul className={styles.legend} aria-label="Chart series">
          {series.map((item) => <li key={item.label}><i aria-hidden="true" style={{ background: item.color }} />{item.label}</li>)}
        </ul>
      )}
      <div className={styles.chartScroll} role="region" aria-label={label + " chart"} tabIndex={0}>
        <div className={styles.columnChart} style={{ minWidth: Math.max(260, groups.length * 38 + 58) }}>
          <div className={styles.axis} aria-hidden="true">
            <span>{number(maximum)}</span><span>{number(maximum / 2)}</span><span>0</span>
          </div>
          <ol className={styles.groups} style={{ gridTemplateColumns: "repeat(" + groups.length + ", minmax(0, 1fr))" }}>
            {groups.map((group) => (
              <li key={group.period}>
                <div className={styles.barGroup}>
                  {group.values.map((value, index) => (
                    <span key={series[index].label} title={series[index].label + " · " + number(value) + (unit ? " " + unit : "")}
                      className={styles.column} style={{ height: value / maximum * 100 + "%", background: series[index].color }}>
                      <span className="sr-only">{series[index].label} {number(value)} {unit}</span>
                    </span>
                  ))}
                </div>
                <span className={styles.period}>{group.period}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {unit && <figcaption className={styles.chartUnit}>{unit}</figcaption>}
    </figure>
  );
}

function Ring({ value, display, color, label }: { value: number; display: string; color: string; label: string }) {
  return (
    <div className={styles.ring} style={{ background: "conic-gradient(" + color + " 0 " + value + "%, #e8edf3 " + value + "% 100%)" }}>
      <div><strong style={{ color }}>{display}</strong><span>{label}</span></div>
    </div>
  );
}

function DataTable({ children }: { children: ReactNode }) {
  return (
    <details className={styles.dataTable}>
      <summary>View exact figures <ChevronDown size={15} aria-hidden="true" /></summary>
      {children}
    </details>
  );
}

function ReviewCard({ tone, icon, title, value, children, href, sources: cardSources }: {
  tone: "safety" | "fleet" | "water";
  icon: ReactNode;
  title: string;
  value: string;
  children: ReactNode;
  href: string;
  sources: TransportSource[];
}) {
  return (
    <article className={styles.reviewCard} data-tone={tone}>
      <div className={styles.reviewHead}>
        <span className={styles.reviewIcon}>{icon}</span>
        <h3>{title}</h3>
        <CmSourceDetails sources={cardSources} label={title + " sources"} />
      </div>
      <strong className={styles.reviewValue}>{value}</strong>
      <p>{children}</p>
      <Link href={href}>See figures <ArrowDownRight size={14} aria-hidden="true" /></Link>
    </article>
  );
}

function SafetyWindow() {
  return (
    <div className={styles.splitFacts}>
      {[
        { label: "Reported crashes", old: priorRoadSafetyWindow.accidents, current: latestAccidents.accidents, delta: roadAccidentChange },
        { label: "Reported fatalities", old: priorRoadSafetyWindow.deaths, current: latestAccidents.deaths, delta: roadFatalityChange },
      ].map(({ label, old, current, delta }) => (
        <div key={label} className={styles.comparison}>
          <h3>{label}</h3>
          <strong>{number(current)}</strong>
          <span className={styles.rising}><ArrowUpRight aria-hidden="true" size={14} /> {percent(delta)} higher</span>
          <div className={styles.coloredPairs}>
            {[{ period: priorRoadSafetyWindow.period, value: old }, { period: latestAccidents.period, value: current }].map((item) => (
              <div key={item.period}>
                <span>{item.period}</span><b>{number(item.value)}</b>
                <div aria-hidden="true"><i style={{ width: item.value / Math.max(old, current) * 100 + "%" }} /></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TransportationPage() {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      <TransportHeader title="Transportation" sourceIcons
        description="Road safety, vehicles and passenger services across Kerala. Each chart shows the period reported by its operator or agency."
        sources={[sources.roadNetwork, sources.registrations, sources.newRegistrations, sources.roadSafety, dashboardSources.safetyBaseline, sources.bus, sources.busFleet, dashboardSources.busPassengers, dashboardSources.ferry, sources.waterMetro, sources.metroRail, dashboardSources.rail, dashboardSources.airport]}
        links={[
          { label: "Road safety", href: "#road-safety" }, { label: "Roads and vehicles", href: "#roads" },
          { label: "Bus services", href: "#buses" }, { label: "Water transport", href: "#water-transport" },
          { label: "Rail and metro", href: "#rail-and-metro" }, { label: "Aviation", href: "#aviation" },
          { label: "Public Works", href: "/public-works" },
        ]}
      />

      <TransportMetrics sourceIcons metrics={[
        { label: "Kerala road network", value: number(roadNetworkKm) + " km", source: sources.roadNetwork, color: "network" },
        { label: "Registered vehicles", value: number(latestRegistration.value), source: { ...sources.registrations, period: "31 March 2025" }, color: "network" },
        { label: "Road fatalities", value: number(latestAccidents.deaths), source: { ...sources.roadSafety, period: latestAccidents.period }, color: "safety" },
        { label: "Kochi Water Metro passengers", value: number(waterMetroTotals.dailyPassengers), source: sources.waterMetro, color: "water" },
      ]} />

      <section className={styles.review} aria-labelledby="transport-watch">
        <h2 id="transport-watch">What needs attention</h2>
        <div className={styles.reviewGrid}>
          <ReviewCard tone="safety" icon={<TriangleAlert size={17} aria-hidden="true" />} title="Road fatalities" value={percent(roadFatalityChange) + " higher"} href="#road-safety" sources={[sources.roadSafety, dashboardSources.safetyBaseline]}>
            Kerala recorded {number(latestAccidents.deaths)} fatalities in Jan–Aug 2026, up from {number(priorRoadSafetyWindow.deaths)} in the same 2025 window. Use the increase to prioritise a district-level crash review.
          </ReviewCard>
          <ReviewCard tone="fleet" icon={<BusFront size={17} aria-hidden="true" />} title="KSRTC fleet operations" value={number(fleetDifference) + "-bus difference"} href="#buses" sources={[sources.busFleet]}>
            In FY 2024–25, KSRTC reported an average of {number(ksrtcTotals.averageFleetOperated)} buses operated against {number(ksrtcTotals.buses)} held. Review the gap alongside depot and schedule data.
          </ReviewCard>
          <ReviewCard tone="water" icon={<Ship size={17} aria-hidden="true" />} title="State ferry use" value={percent(Math.abs(ferryPassengerChange)) + " fewer passengers"} href="#water-transport" sources={[dashboardSources.ferry]}>
            Scheduled trips grew {percent(ferryTripChange)} in FY 2024–25 while reported ridership fell. Review route-level usage before changing frequency.
          </ReviewCard>
        </div>
      </section>

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <TransportSection id="road-safety" title="Road safety · same-period comparison" source={{ ...sources.roadSafety, period: "January to August 2026" }} sourceIcons>
          <SafetyWindow />
          <p className={styles.caption}>Both windows cover January to August. The 2025 figures sum the Police monthly table. The 2026 bulletin also reports {number(latestAccidents.injuries)} injuries in this period.</p>
          <div className={styles.secondarySource}><span>2025 comparison source</span><CmSourceDetails sources={[dashboardSources.safetyBaseline]} label="Road safety 2025 comparison source" /></div>
        </TransportSection>
        <TransportSection title="Full-year crash and injury trend" source={dashboardSources.safetyTrend} sourceIcons>
          <Columns label="Annual crashes and injuries" groups={fullYears.map(({ period, accidents, injuries }) => ({ period, values: [accidents, injuries] }))}
            series={[{ label: "Crashes", color: "#2563a5" }, { label: "Injuries", color: "#bd4962" }]} maximum={60000} />
          <DataTable><TransportTable label="Annual road crashes, deaths and injuries" columns={["Year", "Crashes", "Fatalities", "Injuries"]} rows={fullYears.map((row) => [row.period, row.accidents, row.deaths, row.injuries])} /></DataTable>
        </TransportSection>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <TransportSection id="roads" title="Road length by maintaining agency" source={sources.roadNetwork} sourceIcons>
          <div className={styles.ringGrid}>
            <Ring value={localRoadShare} display={percent(localRoadShare)} color="#0e7185" label="local body share" />
            <TransportBars items={roadsByAgency} unit="km" />
          </div>
          <p className={styles.caption}>The Planning Board reports {number(roadNetworkKm)} km statewide. Agency lengths retain the source’s published precision.</p>
        </TransportSection>
        <TransportSection title="Registered motor vehicles" source={sources.registrations} sourceIcons>
          <Columns label="Registered vehicle stock by financial year" groups={registeredVehicles.map(({ label, value }) => ({ period: label, values: [value / 100000] }))}
            series={[{ label: "Registered vehicles", color: "#2d68ae" }]} maximum={200} unit="lakh registered vehicles" />
          <p className={styles.caption}>Registered vehicle stock grew {percent(change(latestRegistration.value, registeredVehicles[registeredVehicles.length - 2].value))} in FY 2024–25.</p>
          <div className={styles.secondarySource}><span><strong>{number(newVehicleRegistrations)}</strong> new registrations in FY 2024–25</span><CmSourceDetails sources={[sources.newRegistrations]} label="New registration source" /></div>
          <DataTable><TransportTable label="Registered vehicles at financial year-end" columns={["FY", "Vehicles"]} rows={registeredVehicles.map(({ label, value }) => [label, value])} /></DataTable>
        </TransportSection>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <TransportSection id="buses" title="KSRTC fleet operations" source={sources.busFleet} sourceIcons>
          <div className={styles.ringGrid}>
            <Ring value={fleetShare} display={percent(fleetShare)} color="#6350ae" label="operated share" />
            <TransportValues items={[
              { label: "Average fleet held", value: number(ksrtcTotals.buses) },
              { label: "Average fleet operated", value: number(ksrtcTotals.averageFleetOperated) },
              { label: "Average occupancy", value: number(ksrtcTotals.occupancy) + "%" },
            ]} />
          </div>
          <p className={styles.caption}>Operated share is the ratio of the two reported fleet averages.</p>
        </TransportSection>
        <TransportSection title="KSRTC average daily ridership" source={dashboardSources.busPassengers} sourceIcons>
          <Columns label="KSRTC average passengers per day" groups={ksrtcDailyPassengers.map(({ period, value }) => ({ period, values: [value] }))}
            series={[{ label: "Average daily passengers", color: "#6350ae" }]} maximum={30} unit="lakh passengers per day" />
          <p className={styles.caption}>{number(latestBusYear.value)} lakh in 2025, up from {number(ksrtcDailyPassengers[ksrtcDailyPassengers.length - 2].value)} lakh in 2024.</p>
          <DataTable><TransportTable label="KSRTC average daily passengers by year" columns={["Year", "Passengers per day (lakh)"]} rows={ksrtcDailyPassengers.map(({ period, value }) => [period, value])} /></DataTable>
        </TransportSection>
      </div>

      <TransportSection title="KSRTC schedules by district" source={sources.bus} sourceIcons>
        <div className="grid min-w-0 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <TransportBars items={[...ksrtcDistricts].sort((a, b) => b.schedules - a.schedules).slice(0, 5).map((row) => ({ label: row.district, value: row.schedules }))} color="#6350ae" />
          <div>
            <p className={styles.caption}>The bars show the five districts with the most schedules at 31 March 2025.</p>
            <TransportValues items={[
              { label: "Statewide schedules", value: number(ksrtcTotals.schedules) },
              { label: "Buses held", value: number(ksrtcTotals.buses) },
            ]} />
            <DataTable><TransportTable label="KSRTC buses and schedules by district" columns={["District", "Buses held", "Schedules"]} rows={ksrtcDistricts.map((row) => [row.district, row.buses, row.schedules])} /></DataTable>
          </div>
        </div>
      </TransportSection>

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <TransportSection id="water-transport" title="State Water Transport Department" source={dashboardSources.ferry} sourceIcons>
          <Columns label="Passengers carried by the State Water Transport Department" groups={swtdAnnualOperations.map(({ period, passengersLakh }) => ({ period, values: [passengersLakh] }))}
            series={[{ label: "Passengers carried", color: "#17796c" }]} maximum={120} unit="lakh passengers" />
          <TransportValues items={[
            { label: "FY 2024–25 scheduled trips", value: number(ferryTotals.scheduledTrips) },
            { label: "FY 2024–25 boats in operation", value: number(ferryTotals.boatsOperated) },
          ]} />
          <DataTable><TransportTable label="State ferry passengers and scheduled trips" columns={["FY", "Passengers (lakh)", "Scheduled trips"]} rows={swtdAnnualOperations.map((row) => [row.period, row.passengersLakh, row.scheduledTrips])} /></DataTable>
        </TransportSection>
        <TransportSection title="Kochi Water Metro" source={sources.waterMetro} sourceIcons>
          <div className={styles.waterMetro}>
            <span><Ship size={23} aria-hidden="true" /></span>
            <div><p>One-day ridership</p><strong>{number(waterMetroTotals.dailyPassengers)}</strong><time dateTime="2026-11-25">25 November 2026</time></div>
          </div>
          <TransportValues items={[{ label: "Cumulative passengers displayed by the operator", value: number(waterMetroTotals.cumulativePassengers) }]} />
        </TransportSection>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <TransportSection id="rail-and-metro" title="Kochi Metro rail ridership" source={sources.metroRail} sourceIcons>
          <Columns label="Kochi Metro monthly passengers in 2025 and 2026"
            groups={kochiMetro.map(({ month, prior, current }) => ({ period: month.slice(0, 3), values: [prior / 100000, current / 100000] }))}
            series={[{ label: "2025", color: "#6e88a6" }, { label: "2026", color: "#197d71" }]} maximum={40} unit="lakh passengers" />
          <p className={styles.caption}><strong>{percent(change(metroCurrent, metroPrior))} higher</strong> in Jan–Apr 2026 ({lakh(metroCurrent)}) than in the same months of 2025 ({lakh(metroPrior)}).</p>
          <DataTable><TransportTable label="Kochi Metro monthly passenger totals" columns={["Month", "2025", "2026"]} rows={kochiMetro.map(({ month, prior, current }) => [month, prior, current])} /></DataTable>
        </TransportSection>
        <TransportSection title="Indian Railways network in Kerala" source={dashboardSources.rail} sourceIcons>
          <TransportBars color="#255d98" unit="km" items={[
            { label: "Route length", value: railKilometres.route },
            { label: "Running track length", value: railKilometres.runningTrack },
            { label: "Total track length", value: railKilometres.totalTrack },
          ]} />
          <p className={styles.caption}>The Railway Board reports these three measures separately. They overlap and should be read individually.</p>
        </TransportSection>
      </div>

      <TransportSection id="aviation" title="Cochin International Airport traffic" source={dashboardSources.airport} sourceIcons>
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          <TransportBars color="#285f9e" items={[
            { label: "Domestic passengers", value: cochinAirport.domesticPassengers },
            { label: "International passengers", value: cochinAirport.internationalPassengers },
          ]} />
          <TransportValues items={[
            { label: "FY 2025–26 passenger movements · up " + percent(airportChange), value: number(cochinAirport.passengers) },
            { label: "FY 2025–26 aircraft movements · down " + percent(Math.abs(flightChange)), value: number(cochinAirport.aircraftMovements) },
          ]} />
        </div>
        <DataTable><TransportTable label="CIAL passenger and aircraft movements" columns={["Financial year", "Passenger movements", "Aircraft movements"]} rows={[
          ["2024–25", cochinAirport.priorYearPassengers, cochinAirportPriorAircraftMovements],
          ["2025–26", cochinAirport.passengers, cochinAirport.aircraftMovements],
        ]} /></DataTable>
      </TransportSection>
    </div>
  );
}
