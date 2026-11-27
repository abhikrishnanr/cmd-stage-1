import { transportSources, type TransportSource } from "@/data/transportActuals";

export const transportDashboardSources = {
  safetyBaseline: {
    source: "Kerala Police · State Crime Records Bureau",
    dataset: "2025 month-wise road accident statistics",
    url: "https://keralapolice.gov.in/storage/crime/699c29870dd03.pdf",
    period: "January to August 2025",
    basis: "Sum of reported crashes and deaths across the first eight rows of the Police monthly table.",
    fetchedAt: "27 Nov 2026",
  },
  safetyTrend: { ...transportSources.roadSafety, period: "Full calendar years 2020–2025" },
  busPassengers: {
    ...transportSources.busRidership,
    period: "2016 to 2025",
  },
  ferry: { ...transportSources.ferry, period: "FY 2021–22 to FY 2024–25" },
  airport: { ...transportSources.airport, url: `${transportSources.airport.url}#page=19`, period: "FY 2024–25 and FY 2025–26" },
  rail: { ...transportSources.rail, url: `${transportSources.rail.url}#page=64` },
} satisfies Record<string, TransportSource>;

export const priorRoadSafetyWindow = { period: "Jan–Aug 2025", accidents: 32609, deaths: 2489 };

export const earlierRoadSafetyTotals = [
  { period: "2020", accidents: 27877, deaths: 2979, injuries: 30510 },
  { period: "2021", accidents: 33296, deaths: 3429, injuries: 40204 },
  { period: "2022", accidents: 43910, deaths: 4317, injuries: 49307 },
];

export const ksrtcDailyPassengers = [
  { period: "2016", value: 28.2 }, { period: "2017", value: 28.8 },
  { period: "2018", value: 23.3 }, { period: "2019", value: 26.6 },
  { period: "2020", value: 10.5 }, { period: "2021", value: 10.1 },
  { period: "2022", value: 16.9 }, { period: "2023", value: 19.4 },
  { period: "2024", value: 19.8 }, { period: "2025", value: 20.3 },
];

export const swtdAnnualOperations = [
  { period: "2021–22", passengersLakh: 67.19, scheduledTrips: 218001 },
  { period: "2022–23", passengersLakh: 103.59, scheduledTrips: 231300 },
  { period: "2023–24", passengersLakh: 107.71, scheduledTrips: 236064 },
  { period: "2024–25", passengersLakh: 106.05, scheduledTrips: 296975 },
];

export const cochinAirportPriorAircraftMovements = 76068;
