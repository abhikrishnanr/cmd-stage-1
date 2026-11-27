// Mission Samudra — detailed monitoring dataset (from Implementation Framework + Phased Roadmap)
export const CAT = {
  V: { label: "Vizhinjam & Major Infra", color: "#1c3f7c" },
  M: { label: "Minor Ports & Clusters", color: "#1aa6c9" },
  P: { label: "Policy / Governance / Social", color: "#f5821f" },
} as const;
export type CatKey = keyof typeof CAT;

export const FY = ["FY26", "FY27", "FY28", "FY29", "FY30", "FY31", "FY32", "FY33", "FY34", "FY35", "FY36"];

export interface Activity {
  id: number; name: string; cat: CatKey; stage: 1 | 2 | 3;
  s: number; e: number; // FY index start/end (0=FY26)
  total: number; pvt: number; gok: number; goi: number;
  dep: string; status: "done" | "active" | "todo";
}

// s/e are indices into FY (FY26=0 … FY36=10)
export const activities: Activity[] = [
  { id: 1, name: "EXIM gateway fully operational", cat: "V", stage: 1, s: 0, e: 1, total: 1200, pvt: 0, gok: 1000, goi: 200, dep: "—", status: "active" },
  { id: 2, name: "BPCL LNG bunkering FID", cat: "V", stage: 1, s: 0, e: 2, total: 1500, pvt: 1500, gok: 0, goi: 0, dep: "—", status: "active" },
  { id: 3, name: "CONCOR ICD commissioned", cat: "V", stage: 1, s: 0, e: 1, total: 500, pvt: 300, gok: 200, goi: 0, dep: "—", status: "active" },
  { id: 4, name: "Shipping line berth agreements", cat: "V", stage: 1, s: 0, e: 0, total: 600, pvt: 600, gok: 0, goi: 0, dep: "—", status: "done" },
  { id: 5, name: "Mission Samudra Authority constituted", cat: "P", stage: 1, s: 0, e: 0, total: 50, pvt: 0, gok: 50, goi: 0, dep: "—", status: "done" },
  { id: 6, name: "KMB PPP concession template", cat: "P", stage: 1, s: 0, e: 0, total: 15, pvt: 0, gok: 15, goi: 0, dep: "5", status: "done" },
  { id: 7, name: "Kollam FTWZ notified", cat: "M", stage: 1, s: 0, e: 2, total: 800, pvt: 400, gok: 300, goi: 100, dep: "5", status: "active" },
  { id: 8, name: "Deep-freeze units (Neendakara/Ponnani)", cat: "M", stage: 1, s: 0, e: 1, total: 200, pvt: 100, gok: 100, goi: 0, dep: "—", status: "active" },
  { id: 9, name: "Alappuzha WCC EDO nodes", cat: "M", stage: 1, s: 0, e: 2, total: 400, pvt: 0, gok: 400, goi: 0, dep: "—", status: "active" },
  { id: 10, name: "Azhikkal dredging + land acquisition", cat: "M", stage: 1, s: 0, e: 2, total: 600, pvt: 0, gok: 350, goi: 250, dep: "—", status: "active" },
  { id: 11, name: "Beypore electric barge PPP", cat: "M", stage: 1, s: 0, e: 2, total: 200, pvt: 150, gok: 50, goi: 0, dep: "5", status: "active" },
  { id: 12, name: "Fishermen welfare package", cat: "P", stage: 1, s: 0, e: 1, total: 500, pvt: 0, gok: 500, goi: 0, dep: "5", status: "active" },
  { id: 13, name: "Vizhinjam Phase 2 (5.7M TEUs)", cat: "V", stage: 2, s: 0, e: 3, total: 19500, pvt: 16000, gok: 3500, goi: 0, dep: "1,4", status: "active" },
  { id: 14, name: "Balaramapuram rail tunnel", cat: "V", stage: 2, s: 2, e: 5, total: 4500, pvt: 0, gok: 1500, goi: 3000, dep: "1,13", status: "todo" },
  { id: 15, name: "OAGC SPV (land-acquisition powers)", cat: "P", stage: 2, s: 2, e: 4, total: 1000, pvt: 0, gok: 1000, goi: 0, dep: "5,13", status: "todo" },
  { id: 16, name: "Pharma / MedDevice anchor tenants", cat: "V", stage: 2, s: 2, e: 4, total: 3000, pvt: 3000, gok: 0, goi: 0, dep: "15,13", status: "todo" },
  { id: 17, name: "Maritime Academy (first batch)", cat: "P", stage: 2, s: 1, e: 3, total: 400, pvt: 0, gok: 300, goi: 100, dep: "5", status: "active" },
  { id: 18, name: "First 5 cruise ship calls", cat: "V", stage: 2, s: 2, e: 3, total: 250, pvt: 100, gok: 150, goi: 0, dep: "13,1", status: "todo" },
  { id: 19, name: "Azhikkal industrial park Phase 1", cat: "M", stage: 2, s: 2, e: 5, total: 1500, pvt: 900, gok: 400, goi: 200, dep: "10", status: "todo" },
  { id: 20, name: "Munambam coastal terminal", cat: "M", stage: 2, s: 2, e: 4, total: 700, pvt: 500, gok: 200, goi: 0, dep: "6", status: "todo" },
  { id: 21, name: "NW-3 barge corridor (0.5 MMT)", cat: "M", stage: 2, s: 2, e: 4, total: 500, pvt: 0, gok: 150, goi: 350, dep: "9", status: "todo" },
  { id: 22, name: "Ship management cluster / GCCs", cat: "V", stage: 2, s: 2, e: 4, total: 600, pvt: 600, gok: 0, goi: 0, dep: "13,17", status: "todo" },
  { id: 23, name: "Women SHG cooperatives", cat: "P", stage: 2, s: 2, e: 4, total: 300, pvt: 50, gok: 250, goi: 0, dep: "8,12", status: "todo" },
  { id: 24, name: "Beypore AUV manufacturing", cat: "M", stage: 2, s: 2, e: 4, total: 500, pvt: 400, gok: 100, goi: 0, dep: "11", status: "todo" },
  { id: 25, name: "Ammonia / H₂ bunkering (IMO 2050)", cat: "V", stage: 3, s: 4, e: 9, total: 2000, pvt: 1500, gok: 0, goi: 500, dep: "2,13", status: "todo" },
  { id: 26, name: "Ship chandling SEZ", cat: "V", stage: 3, s: 4, e: 7, total: 1000, pvt: 800, gok: 200, goi: 0, dep: "13,16", status: "todo" },
  { id: 27, name: "Green Maritime Cert. Authority", cat: "P", stage: 3, s: 4, e: 6, total: 150, pvt: 0, gok: 150, goi: 0, dep: "17", status: "todo" },
  { id: 28, name: "Maritime Arbitration Court", cat: "P", stage: 3, s: 4, e: 7, total: 250, pvt: 0, gok: 200, goi: 50, dep: "5,22", status: "todo" },
  { id: 29, name: "Phase 3 expansion (10M+ TEUs)", cat: "V", stage: 3, s: 6, e: 10, total: 20000, pvt: 18000, gok: 1500, goi: 500, dep: "13,14,15", status: "todo" },
  { id: 30, name: "All 13 minor ports PPP-operated", cat: "M", stage: 3, s: 4, e: 9, total: 5000, pvt: 3500, gok: 1000, goi: 500, dep: "6,7,20", status: "todo" },
  { id: 31, name: "Vizhinjam–Beypore–Azhikkal corridor", cat: "M", stage: 3, s: 4, e: 9, total: 4000, pvt: 2000, gok: 1200, goi: 800, dep: "19,14", status: "todo" },
  { id: 32, name: "Mangrove blue carbon bonds (GCF)", cat: "P", stage: 3, s: 4, e: 9, total: 300, pvt: 100, gok: 200, goi: 0, dep: "—", status: "todo" },
  { id: 33, name: "Kerala declared premier maritime state", cat: "P", stage: 3, s: 4, e: 6, total: 100, pvt: 0, gok: 100, goi: 0, dep: "13,25,29", status: "todo" },
];

export const stages = [
  { stage: "Stage 1", theme: "FY 26–27 · Lock in the Wins", pvt: 3050, gok: 2965, goi: 550, total: 6565, pct: 46 },
  { stage: "Stage 2", theme: "FY 28–29 · Build the Pull", pvt: 21550, gok: 7550, goi: 3650, total: 32750, pct: 66 },
  { stage: "Stage 3", theme: "FY 30–35 · Scale & Decarbonise", pvt: 25900, gok: 4550, goi: 2350, total: 32800, pct: 79 },
];

export const yearFlow = [
  { label: "FY26", pvt: 800, gok: 900, goi: 150, total: 1850 },
  { label: "FY27", pvt: 2250, gok: 2065, goi: 400, total: 4715 },
  { label: "FY28", pvt: 8500, gok: 3200, goi: 1500, total: 13200 },
  { label: "FY29", pvt: 8500, gok: 3200, goi: 1500, total: 13200 },
  { label: "FY30", pvt: 1550, gok: 750, goi: 650, total: 2950 },
  { label: "FY31", pvt: 5000, gok: 1100, goi: 400, total: 6500 },
  { label: "FY32", pvt: 5350, gok: 1100, goi: 550, total: 7000 },
  { label: "FY33", pvt: 5000, gok: 900, goi: 250, total: 6150 },
  { label: "FY34", pvt: 5000, gok: 350, goi: 250, total: 5600 },
  { label: "FY35", pvt: 4000, gok: 350, goi: 250, total: 4600 },
];

export const categoryTotals = [
  { label: "Vizhinjam & Major Infra", value: 54650, color: CAT.V.color },
  { label: "Minor Ports & Clusters", value: 14400, color: CAT.M.color },
  { label: "Policy / Governance / Social", value: 3065, color: CAT.P.color },
];

export const financingMix = [
  { label: "Private", value: 50500, pct: 70, color: "#7c3aed" },
  { label: "Govt of Kerala", value: 15065, pct: 21, color: "#1c3f7c" },
  { label: "Govt of India", value: 6550, pct: 9, color: "#16a34a" },
];

export const samudraKpis = [
  { label: "Total Investment", value: "₹72,115 Cr", sub: "10-year programme", icon: "Landmark" },
  { label: "Private Capital", value: "70%", sub: "₹50,500 Cr", icon: "TrendingUp" },
  { label: "Activities", value: "33", sub: "across 3 stages", icon: "ListChecks" },
  { label: "Vizhinjam Capacity", value: "10M+ TEUs", sub: "by Phase 3", icon: "Anchor" },
  { label: "Coastline", value: "600 km", sub: "44 rivers · 34 lakes", icon: "Waves" },
  { label: "Jobs Potential", value: "2.4 L+", sub: "direct & indirect", icon: "Briefcase" },
];

export const samudraMilestones = [
  { date: "Sep 2026", text: "Mission Samudra Authority constituted; KMB PPP template ready", rag: "green" as const },
  { date: "Mar 2027", text: "EXIM gateway operational · CONCOR ICD · Stage 1 'wins' locked", rag: "amber" as const },
  { date: "Mar 2029", text: "Vizhinjam Phase 2 (5.7M TEUs) commissioned — anchor of Stage 2", rag: "amber" as const },
  { date: "Mar 2031", text: "Balaramapuram rail tunnel + Azhikkal industrial park online", rag: "todo" as any },
  { date: "Mar 2035", text: "Phase 3 (10M+ TEUs), green H₂ bunkering, Kerala premier maritime state", rag: "todo" as any },
];

export const samudraDistrict: Record<string, number> = {
  Thiruvananthapuram: 96, Ernakulam: 74, Kollam: 64, Kozhikode: 70, Alappuzha: 58,
  Kasaragod: 60, Kannur: 62, Malappuram: 50, Thrissur: 54, Pathanamthitta: 30,
  Kottayam: 34, Idukki: 22, Palakkad: 28, Wayanad: 18,
};

export const samudraBottlenecks = {
  land: "amber", power: "green", clearance: "amber", finance: "green", litigation: "green", contractor: "amber",
} as const;
