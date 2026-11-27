import type { TransportSource } from "./transportActuals";

export const calamitySources = {
  dailyRain: {
    source: "IMD · Kerala State Emergency Operations Centre", dataset: "Observed rainfall at IMD gauges",
    url: "https://sdma.kerala.gov.in/wp-content/uploads/2026/11/Actual-Vs-Prediction-8.pdf",
    period: "25–26 Nov 2026, 8:30 am IST to 8:30 am IST", sourceUpdatedAt: "26 Nov 2026, noon IST",
    basis: "Selected station measurements from the observation column",
  },
  monsoon: {
    source: "India Meteorological Department · Thiruvananthapuram", dataset: "Southwest Monsoon 2026 · cumulative rainfall for Kerala",
    url: "https://mausam.imd.gov.in/thiruvananthapuram/mcdata/CUMULATIVE%20RAINFALL%20FOR%20KERALA-SW%20MONSOON.pdf",
    period: "1 Jun to 30 Sep 2026", basis: "Seasonal observed rainfall and IMD’s published normal",
  },
  powerReservoirs: {
    source: "KSEB · Kerala State Disaster Management Authority", dataset: "Daily water levels of major KSEB reservoirs",
    url: "https://sdma.kerala.gov.in/wp-content/uploads/2026/11/KSEB-SITE-23.pdf", period: "26 Nov 2026, 11 am IST bulletin",
    basis: "Observed water level and live storage share reported on the bulletin",
  },
  irrigationReservoirs: {
    source: "Kerala Irrigation Department · KSDMA", dataset: "Daily water levels of major irrigation reservoirs",
    url: "https://sdma.kerala.gov.in/wp-content/uploads/2026/11/IRR-SITE-24.pdf", period: "26 Nov 2026, 11 am IST bulletin",
    basis: "Observed water level and reported storage share",
  },
  preparedness: {
    source: "Kerala State Disaster Management Authority", dataset: "State Disaster Management Plan · 2026 update",
    url: "https://sdma.kerala.gov.in/wp-content/uploads/2026/10/GO422026_KSDMP2026.pdf", period: "13 Oct 2026", sourceUpdatedAt: "13 Oct 2026 (order date)",
  },
} satisfies Record<string, TransportSource>;

export const southwestMonsoon = { observedMm: 1446.6, normalMm: 2018.6, departurePercent: -28 };

export const observedRainfall = [
  { station: "Angadippuram", district: "Malappuram", mm: 96.2 },
  { station: "Thodupuzha", district: "Idukki", mm: 76.4 },
  { station: "Perumbavoor", district: "Ernakulam", mm: 67 },
  { station: "Hosdurg", district: "Kasaragod", mm: 45 },
  { station: "Kozhikode", district: "Kozhikode", mm: 45 },
  { station: "Karipur airport", district: "Malappuram", mm: 44 },
  { station: "Thrithala", district: "Palakkad", mm: 43.6 },
  { station: "Kuppadi", district: "Wayanad", mm: 39.6 },
];

export const ksebReservoirs = [
  { name: "Idukki", district: "Idukki", level: "2,368.66 ft", storagePercent: 62.70 },
  { name: "Kakki (Anathode)", district: "Pathanamthitta", level: "972.25 m", storagePercent: 68.92 },
  { name: "Idamalayar", district: "Ernakulam", level: "158.77 m", storagePercent: 71.31 },
  { name: "Sholayar", district: "Thrissur", level: "2,656.70 ft", storagePercent: 88.45 },
  { name: "Banasura Sagar", district: "Wayanad", level: "771.80 m", storagePercent: 77.39 },
];

export const irrigationReservoirs = [
  { name: "Malampuzha", district: "Palakkad", level: "110.87 m", storagePercent: 60 },
  { name: "Peechi", district: "Thrissur", level: "77.52 m", storagePercent: 76 },
  { name: "Karapuzha", district: "Wayanad", level: "757.05 m", storagePercent: 42 },
];
