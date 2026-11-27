// UI MAPPING CONFIGURATION ONLY — not part of the source data pack.
// Maps Mission Samudra named project nodes to Kerala districts for the map/list view.
// Coordinates/intensities here are illustrative UI config, not authoritative source figures.
export interface MSLocation {
  name: string;
  district: string;        // must match kerala.geojson district name
  type: "Major Port" | "Minor Port" | "Cluster" | "Corridor" | "Policy";
  activityIds: number[];   // activities associated (by id) — editable
  note?: string;
}

export const msLocations: MSLocation[] = [
  { name: "Vizhinjam (Major Port)", district: "Thiruvananthapuram", type: "Major Port", activityIds: [1, 13, 29, 18, 22] },
  { name: "Balaramapuram rail / OAGC", district: "Thiruvananthapuram", type: "Cluster", activityIds: [14, 15, 16] },
  { name: "Poovar ship repair", district: "Thiruvananthapuram", type: "Minor Port", activityIds: [] },
  { name: "Kollam FTWZ / Neendakara", district: "Kollam", type: "Cluster", activityIds: [7, 8] },
  { name: "Alappuzha WCC / NW-3", district: "Alappuzha", type: "Corridor", activityIds: [9, 21] },
  { name: "Kochi / Vallarpadam ICTT", district: "Ernakulam", type: "Major Port", activityIds: [3, 30] },
  { name: "Munambam terminal", district: "Ernakulam", type: "Minor Port", activityIds: [20] },
  { name: "Ponnani deep-freeze", district: "Malappuram", type: "Cluster", activityIds: [8] },
  { name: "Beypore (boats/AUV/barge)", district: "Kozhikode", type: "Minor Port", activityIds: [11, 24] },
  { name: "Azhikkal port & ind. park", district: "Kannur", type: "Minor Port", activityIds: [10, 19, 31] },
  { name: "Statewide policy & SHGs", district: "Thiruvananthapuram", type: "Policy", activityIds: [5, 6, 12, 17, 23, 25, 26, 27, 28, 32, 33, 2, 4] },
];

// district -> number of associated activities (for choropleth intensity)
export function districtIntensity(): Record<string, number> {
  const m: Record<string, number> = {};
  msLocations.forEach((l) => { m[l.district] = (m[l.district] || 0) + l.activityIds.length; });
  return m;
}
