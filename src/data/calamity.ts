export const calamitySummary = {
  rainfallAnomaly: "+38%", floodAlert: "HIGH", reliefCamps: 142, readinessScore: 71,
};

export const calamityCards = [
  { label: "Rainfall Anomaly", value: "+38%", sub: "vs normal (48h)", rag: "amber" as const, icon: "CloudRain" },
  { label: "Flood Risk", value: "HIGH", sub: "5 districts", rag: "red" as const, icon: "Waves" },
  { label: "Landslide Risk", value: "HIGH", sub: "Wayanad, Idukki", rag: "red" as const, icon: "Mountain" },
  { label: "Dam Level Watch", value: "82%", sub: "Idukki reservoir", rag: "amber" as const, icon: "Container" },
  { label: "Coastal Erosion", value: "Severe", sub: "3 stretches", rag: "amber" as const, icon: "Waves" },
  { label: "Heat Stress", value: "Moderate", sub: "Palakkad", rag: "amber" as const, icon: "Thermometer" },
  { label: "Relief Camp Readiness", value: "142", sub: "camps on standby", rag: "green" as const, icon: "Tent" },
  { label: "KSEB Outage Risk", value: "Medium", sub: "high-wind zones", rag: "amber" as const, icon: "Zap" },
];

export const districtDisasterRisk: Record<string, number> = {
  Wayanad: 92, Idukki: 84, Alappuzha: 78, Palakkad: 66, Kottayam: 60,
  Ernakulam: 55, Thrissur: 58, Pathanamthitta: 64, Kollam: 50, Malappuram: 57,
  Kannur: 52, Kasaragod: 54, Kozhikode: 53, Thiruvananthapuram: 48,
};

export const warningTimeline = [
  { time: "06:00", text: "IMD orange alert issued — Idukki, Wayanad, Kozhikode", rag: "amber" as const },
  { time: "09:30", text: "Dam shutter opening advisory — Idukki reservoir at 82%", rag: "amber" as const },
  { time: "12:15", text: "Landslide red alert — 3 panchayats in Wayanad on evacuation standby", rag: "red" as const },
  { time: "15:40", text: "Relief camps activated — 142 camps, 18,400 capacity", rag: "green" as const },
  { time: "18:00", text: "KSEB pre-emptive shutdown in high-wind coastal zones", rag: "amber" as const },
];

export const calamityActions = [
  { text: "Pre-position NDRF + SDRF teams in Wayanad & Idukki before midnight", rag: "red" as const, owner: "Disaster Management" },
  { text: "Issue dam-release public warning downstream of Idukki (Periyar belt)", rag: "red" as const, owner: "Collector" },
  { text: "Stock relief camps with 72-hr essentials in flood-prone Kuttanad", rag: "amber" as const, owner: "DMO" },
];
