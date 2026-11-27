import { Rag } from "./types";

export const landBankSource = {
  title: "Kerala Strategic Project Land Bank",
  badge: "Prototype Data",
  note:
    "Prototype Data: synthetic demonstration inventory for dashboard prototyping. The official industrial land column is retained as the verified numerical input; all other land classes are prototype planning data.",
};

export const landBankRows = [
  { district: "Thiruvananthapuram", official: 27.53, revenue: 210, psu: 95, brownfield: 38, privateEstate: 120, acquisition: 160, total: 650.53 },
  { district: "Kollam", official: 5.94, revenue: 260, psu: 70, brownfield: 55, privateEstate: 95, acquisition: 110, total: 595.94 },
  { district: "Pathanamthitta", official: 24.73, revenue: 180, psu: 35, brownfield: 28, privateEstate: 55, acquisition: 70, total: 392.73 },
  { district: "Alappuzha", official: 35.69, revenue: 160, psu: 45, brownfield: 62, privateEstate: 90, acquisition: 85, total: 477.69 },
  { district: "Kottayam", official: 0, revenue: 190, psu: 55, brownfield: 44, privateEstate: 105, acquisition: 75, total: 469 },
  { district: "Idukki", official: 0, revenue: 120, psu: 28, brownfield: 18, privateEstate: 42, acquisition: 35, total: 243 },
  { district: "Ernakulam", official: 18, revenue: 310, psu: 180, brownfield: 125, privateEstate: 240, acquisition: 260, total: 1133 },
  { district: "Thrissur", official: 8.55, revenue: 270, psu: 95, brownfield: 76, privateEstate: 160, acquisition: 135, total: 744.55 },
  { district: "Palakkad", official: 83.63, revenue: 520, psu: 110, brownfield: 95, privateEstate: 210, acquisition: 280, total: 1298.63 },
  { district: "Malappuram", official: 18.97, revenue: 290, psu: 60, brownfield: 58, privateEstate: 170, acquisition: 145, total: 741.97 },
  { district: "Kozhikode", official: 97.26, revenue: 230, psu: 85, brownfield: 72, privateEstate: 150, acquisition: 130, total: 764.26 },
  { district: "Wayanad", official: 0.45, revenue: 85, psu: 20, brownfield: 12, privateEstate: 35, acquisition: 25, total: 177.45 },
  { district: "Kannur", official: 212.03, revenue: 430, psu: 90, brownfield: 68, privateEstate: 145, acquisition: 210, total: 1155.03 },
  { district: "Kasaragod", official: 63.51, revenue: 390, psu: 75, brownfield: 52, privateEstate: 130, acquisition: 180, total: 890.51 },
];

export const landBankSummary = {
  totalCandidate: 9734.29,
  official: 596.29,
  revenue: 3645,
  psu: 1043,
  brownfield: 803,
  privateEstate: 1747,
  acquisition: 1900,
  districtsWithOfficial: "12 of 14",
  largestCandidate: "Palakkad, 1,298.63 acres",
  largestOfficial: "Kannur, 212.03 acres",
};

export const landCategories = [
  { title: "Ready for allotment", icon: "BadgeCheck", rag: "green" as Rag, points: ["Clear government ownership", "Survey completed", "Road, electricity and water available", "No major legal or environmental constraints"] },
  { title: "Conditionally available", icon: "CircleDashed", rag: "amber" as Rag, points: ["Land identified", "Mutation or departmental transfer pending", "Boundary survey pending", "Utility augmentation required"] },
  { title: "Under acquisition", icon: "FileClock", rag: "amber" as Rag, points: ["Acquisition notification issued", "Compensation or rehabilitation pending", "Expected possession date available"] },
  { title: "Brownfield", icon: "Factory", rag: "blue" as Rag, points: ["Closed industrial units", "Defunct public-sector premises", "Abandoned warehouses, factories or estates", "Existing buildings potentially reusable"] },
  { title: "Government and Revenue land", icon: "Landmark", rag: "green" as Rag, points: ["Puramboke or unassigned government land", "Departmental land that may be transferred", "Infrastructure-suitable non-assignment land"] },
  { title: "PSU and institutional land", icon: "Building2", rag: "blue" as Rag, points: ["Excess land held by boards or corporations", "Public institution land", "Railway, port, utility or transport-agency partnership land"] },
  { title: "Private land aggregation", icon: "Handshake", rag: "amber" as Rag, points: ["Private Industrial Estate proposals", "Land pooling", "Campus Industrial Park land", "Investor-owned contiguous parcels"] },
];

export const parcelFields = [
  "Parcel ID", "District", "Taluk", "Village", "Local body", "Survey number", "Latitude and longitude", "Ownership agency",
  "Land category", "Total extent", "Usable extent", "Contiguous extent", "Current use", "Legal status", "Acquisition status",
  "Environmental status", "Wetland or paddy restriction", "Forest or ESZ restriction", "CRZ restriction", "Flood and landslide risk",
  "Road width", "Nearest national/state highway", "Nearest railway station", "Nearest airport", "Nearest port", "Power availability",
  "Water availability", "Waste-treatment availability", "Preferred project sectors", "Estimated development cost", "Readiness score",
  "Expected availability date", "Nodal officer", "Last verified date",
];

export const readinessModel = [
  { label: "Title and ownership clearance", value: 20, icon: "FileCheck2" },
  { label: "Statutory and environmental clearance", value: 20, icon: "ShieldCheck" },
  { label: "Road connectivity", value: 15, icon: "Route" },
  { label: "Power and water readiness", value: 15, icon: "PlugZap" },
  { label: "Parcel contiguity and usable area", value: 10, icon: "ScanLine" },
  { label: "Hazard and climate suitability", value: 10, icon: "CloudSun" },
  { label: "Acquisition or transfer progress", value: 10, icon: "RefreshCcw" },
];

export const readinessClasses = [
  { range: "80-100", label: "Project-ready", rag: "green" as Rag },
  { range: "60-79", label: "Ready with minor intervention", rag: "amber" as Rag },
  { range: "40-59", label: "Major intervention required", rag: "red" as Rag },
  { range: "Below 40", label: "Long-term land pipeline", rag: "blue" as Rag },
];
