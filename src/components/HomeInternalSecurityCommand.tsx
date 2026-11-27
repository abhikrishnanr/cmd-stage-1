"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import KeralaMap from "@/components/KeralaMap";
import { Bars, Donut, Gauge, Sparkline, StackedBars, TrendLine } from "@/components/charts";
import { Icon, RagBadge, SectionCard, StatTile } from "@/components/primitives";
import { useUI } from "@/store/ui";
import { RAG_HEX } from "@/lib/ui";
import type { Rag } from "@/data/types";

const DISTRICTS = ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"];

const mapModes = [
  { id: "crime", label: "Crime", unit: "risk" },
  { id: "response", label: "Emergency response", unit: "min" },
  { id: "cyber", label: "Cybercrime", unit: "index" },
  { id: "traffic", label: "Traffic safety", unit: "risk" },
  { id: "fire", label: "Fire incidents", unit: "calls" },
  { id: "prison", label: "Prison occupancy", unit: "%" },
  { id: "forensic", label: "Forensic backlog", unit: "samples" },
];

const mapValues: Record<string, Record<string, number>> = {
  crime: mk([78, 61, 42, 55, 48, 38, 86, 69, 64, 72, 75, 34, 67, 49]),
  response: mk([8.4, 9.1, 12.4, 10.2, 9.6, 14.8, 7.2, 8.8, 11.3, 12.1, 8.6, 15.2, 10.4, 13.5]),
  cyber: mk([82, 48, 32, 41, 46, 28, 91, 63, 52, 59, 76, 25, 57, 39]),
  traffic: mk([73, 66, 45, 58, 52, 61, 79, 74, 71, 68, 72, 49, 62, 57]),
  fire: mk([42, 31, 18, 26, 21, 19, 57, 38, 34, 36, 44, 15, 29, 24]),
  prison: mk([92, 84, 76, 88, 81, 72, 118, 96, 91, 89, 104, 68, 87, 79]),
  forensic: mk([420, 230, 96, 165, 142, 72, 610, 318, 275, 284, 392, 58, 228, 119]),
};

const executiveKpis = [
  ["Cognisable cases YTD", "1.86 L", "+4.2%", "Target: monitor", "Scale", "amber", [42, 43, 46, 48, 47, 50, 54]],
  ["Cases today", "612", "-3.1%", "7-day avg 646", "FilePlus2", "green", [70, 66, 64, 68, 62, 61, 57]],
  ["Crime rate / lakh", "524", "+2.8%", "Benchmark <500", "Activity", "amber", [41, 42, 42, 44, 46, 47, 49]],
  ["Disposed / detected", "78.4%", "+1.6%", "Target 82%", "CheckCircle2", "amber", [65, 66, 67, 68, 69, 72, 74]],
  ["Avg response time", "9.8 min", "-0.7", "Target <10 min", "Timer", "green", [15, 14, 13, 12, 11, 10, 9]],
  ["Women and child cases", "18,420", "+5.9%", "Watch trend", "HeartHandshake", "amber", [22, 24, 26, 25, 29, 31, 33]],
  ["Cyber complaints", "42,860", "+18.5%", "Priority risk", "ShieldAlert", "red", [20, 24, 31, 38, 44, 52, 61]],
  ["Cyber amount frozen", "Rs 94.6 Cr", "+12.1%", "Recovery drive", "Landmark", "green", [16, 19, 22, 26, 31, 36, 43]],
  ["Missing traced", "91.2%", "+2.4%", "Target 92%", "SearchCheck", "green", [72, 74, 75, 76, 79, 84, 87]],
  ["Road fatalities", "1,842", "+6.8%", "Reduce trend", "Car", "red", [32, 34, 35, 39, 38, 41, 45]],
  ["Active fire incidents", "37", "-9", "Live queue", "Flame", "green", [19, 24, 21, 20, 17, 14, 12]],
  ["Prison occupancy", "96%", "+3", "Safe <100%", "Landmark", "amber", [80, 82, 85, 88, 91, 94, 96]],
  ["Pending prosecution", "68,200", "+2.1%", "Ageing focus", "Gavel", "amber", [40, 39, 41, 43, 45, 46, 47]],
  ["Forensic samples pending", "18,740", "+7.4%", "SLA breach risk", "Microscope", "red", [26, 29, 31, 35, 38, 42, 45]],
] as const;

const commandStatus = [
  ["Police control rooms", "14/14 online", "Just now", "green"],
  ["Emergency 112", "Operational", "2 min ago", "green"],
  ["CCTNS / THUNA", "Available", "6 min ago", "green"],
  ["Fire control rooms", "14/14 online", "4 min ago", "green"],
  ["Prison control room", "Stable", "11 min ago", "green"],
  ["Forensic lab status", "Backlog watch", "18 min ago", "amber"],
  ["Critical incidents", "6 open", "Live", "red"],
  ["High-priority alerts", "18 pending", "Live", "amber"],
  ["Districts attention", "5 districts", "Hourly", "amber"],
] as const;

const monthlyCrime = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => ({
  label: m,
  bns: [13200, 12850, 13920, 14110, 14620, 15180, 14940, 15460, 15810, 16320, 16060, 16680][i],
  women: [1380, 1420, 1510, 1480, 1560, 1620, 1710, 1680, 1740, 1810, 1860, 1920][i],
  cyber: [2210, 2360, 2620, 2880, 3160, 3420, 3610, 3860, 4010, 4280, 4510, 4780][i],
  traffic: [318, 306, 335, 349, 341, 366, 372, 389, 401, 418, 410, 432][i],
}));

const crimeDistribution = [
  { label: "Property", value: 22, color: "#2563eb" },
  { label: "Violent", value: 11, color: "#dc2626" },
  { label: "Financial fraud", value: 14, color: "#f59e0b" },
  { label: "Cybercrime", value: 17, color: "#7c3aed" },
  { label: "Women", value: 13, color: "#ec4899" },
  { label: "Children", value: 7, color: "#06b6d4" },
  { label: "Narcotics", value: 9, color: "#16a34a" },
  { label: "Public order", value: 7, color: "#64748b" },
];

const districtRows = DISTRICTS.map((d, i) => ({
  district: d,
  cases: [18920, 11340, 5240, 8420, 7290, 4110, 26580, 14160, 11870, 15430, 16840, 3290, 12670, 6810][i],
  detection: [79, 81, 84, 78, 82, 86, 76, 80, 77, 74, 78, 88, 81, 83][i],
  disposal: [72, 76, 79, 73, 75, 82, 70, 74, 71, 69, 72, 84, 77, 80][i],
  rate: [552, 510, 438, 491, 466, 382, 612, 536, 519, 544, 571, 361, 528, 442][i],
  pending: [1220, 760, 310, 540, 470, 190, 1880, 920, 850, 1110, 1080, 160, 790, 380][i],
  response: [8.4, 9.1, 12.4, 10.2, 9.6, 14.8, 7.2, 8.8, 11.3, 12.1, 8.6, 15.2, 10.4, 13.5][i],
  risk: (["amber", "green", "green", "amber", "green", "green", "red", "amber", "amber", "amber", "red", "green", "amber", "green"] as Rag[])[i],
}));

const emergencyFunnel = [
  { label: "112 calls", value: 14820 },
  { label: "Validated", value: 11940 },
  { label: "Dispatch", value: 10380 },
  { label: "Arrival", value: 9810 },
  { label: "Closure", value: 9360 },
];

const hourlyCalls = Array.from({ length: 24 }, (_, h) => ({ label: `${h}`, value: [28, 22, 18, 16, 20, 34, 56, 72, 86, 92, 88, 96, 104, 112, 108, 116, 128, 142, 168, 154, 126, 94, 68, 42][h] }));

const cyberPatterns = [
  ["Investment fraud", 6840, "red"],
  ["Loan app fraud", 4120, "amber"],
  ["Job fraud", 3380, "amber"],
  ["Online harassment", 2910, "amber"],
  ["Identity theft", 1850, "green"],
];

const alerts = [
  ["Critical", "Ernakulam", "Cyber-financial fraud complaints up 22% over three weeks.", "Cyber Cell ADGP", "Escalated"],
  ["Critical", "Kozhikode", "Road fatalities rising continuously on night corridor clusters.", "Traffic IG", "Action due"],
  ["High", "Forensic", "Toxicology sample backlog above target SLA.", "FSL Director", "Under review"],
  ["High", "Prisons", "Institution occupancy projected above safe threshold next month.", "Prisons DGP", "Mitigation plan"],
  ["Medium", "Idukki", "Emergency response SLA breach in high-range pockets.", "District Police Chief", "Resource check"],
  ["Monitoring", "Fire", "Coverage gap in fast-growing urban edge zones.", "Fire Services Director", "Monitoring"],
] as const;

const insights = [
  ["Cyber-financial fraud has increased for three consecutive weeks in Ernakulam, Kozhikode and Thiruvananthapuram.", "Increase public awareness and rapid bank-freeze coordination.", "88%", "Cyber Cell"],
  ["Emergency response time is above benchmark in rural and high-range station limits.", "Review vehicle availability, duty rosters and district control-room triage.", "82%", "Police HQ"],
  ["A prison institution is projected to exceed safe occupancy next month.", "Prepare transfer, parole review and court-production acceleration options.", "76%", "Prisons"],
  ["Forensic toxicology backlog may delay charge-sheet filing in priority cases.", "Create temporary priority queue and weekend disposal drive.", "81%", "FSL"],
  ["Night-time accident fatalities concentrate along identified road corridors.", "Coordinate enforcement, lighting, blackspot rectification and trauma response.", "84%", "Traffic"],
];

const departments = [
  ["Kerala Police", 78, 82, 74, 69, "6 min", 11, "amber", "Shield"],
  ["Fire and Rescue Services", 84, 86, 80, 78, "4 min", 3, "green", "Flame"],
  ["Civil Defence and Home Guards", 76, 80, 72, 74, "1 hr", 2, "amber", "UsersRound"],
  ["Prisons and Correctional Services", 73, 76, 68, 70, "11 min", 4, "amber", "Landmark"],
  ["Directorate of Prosecution", 69, 72, 66, 61, "Daily", 6, "amber", "Gavel"],
  ["Forensic Science Laboratory", 62, 68, 58, 54, "18 min", 8, "red", "Microscope"],
  ["Chemical Examiner Laboratory", 65, 70, 59, 56, "Daily", 5, "red", "FlaskConical"],
] as const;

const sources = [
  ["Kerala Police Crime Statistics", "CSV / API", "Monthly", "15 Jun 2026 10:30", "1.86 L", 86, "green"],
  ["CCTNS", "Secure API", "15 min", "15 Jun 2026 10:28", "24.2 L", 82, "green"],
  ["THUNA", "Service API", "Hourly", "15 Jun 2026 10:20", "8.39 L", 84, "green"],
  ["Emergency 112", "Event stream", "Live", "15 Jun 2026 10:31", "14,820", 88, "green"],
  ["Cybercrime reporting systems", "Secure API", "Hourly", "15 Jun 2026 10:12", "42,860", 78, "amber"],
  ["Traffic Police systems", "API / ETL", "Hourly", "15 Jun 2026 10:18", "2.34 L", 80, "amber"],
  ["Fire control-room systems", "Event stream", "15 min", "15 Jun 2026 10:26", "7,420", 86, "green"],
  ["Kerala Prisons / e-Prisons", "Secure API", "Daily", "15 Jun 2026 08:00", "8,940", 74, "amber"],
  ["Directorate of Prosecution", "Case extract", "Daily", "15 Jun 2026 07:30", "68,200", 70, "amber"],
  ["State Forensic Science Laboratory", "LIMS", "Hourly", "15 Jun 2026 10:14", "18,740", 62, "red"],
  ["Chemical Examiner Laboratory", "LIMS", "Daily", "15 Jun 2026 08:15", "9,860", 65, "red"],
] as const;

export default function HomeInternalSecurityCommand() {
  const { openDrawer, openTicket, showToast } = useUI();
  const [mode, setMode] = useState("crime");
  const selectedMode = mapModes.find((m) => m.id === mode) || mapModes[0];
  const mapData = mapValues[mode];
  const topDistricts = useMemo(() => Object.entries(mapData).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([label, value]) => ({ label, value })), [mapData]);

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <div className="flex items-center gap-1 text-[12px] font-semibold text-slate-400">
        <Link href="/sectors" className="flex items-center gap-1 text-[color:var(--color-navy)]"><Icon name="ArrowLeft" size={14} /> Sectors</Link>
        <Icon name="ChevronRight" size={13} />
        <span>Home & Internal Security</span>
      </div>

      <section className="relative overflow-hidden rounded-2xl text-white shadow-[0_22px_55px_rgba(15,45,92,.24)]" style={{ background: "linear-gradient(120deg,#0b1328 0%,#173f73 48%,#0f766e 100%)" }}>
        <div className="hero-grid absolute inset-0 opacity-20" />
        <div className="absolute right-0 top-0 hidden h-full w-1/2 opacity-20 lg:block">
          <div className="grid h-full grid-cols-3 gap-3 p-8">
            {["MonitorCog", "Siren", "Flame", "ShieldAlert", "Map", "LockKeyhole"].map((icon, i) => <div key={icon} className="grid place-items-center rounded-2xl border border-white/15 bg-white/10" style={{ transform: `translateY(${i % 2 ? 22 : 0}px)` }}><Icon name={icon} size={42} /></div>)}
          </div>
        </div>
        <div className="relative p-5 sm:p-6">
          <div className="flex flex-wrap items-start gap-5">
            <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-white/15 text-center shadow-xl">
              <Icon name="UserRoundCheck" size={44} />
              <div className="px-2 text-[10px] font-bold text-white/70">Home Minister portrait</div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-black uppercase tracking-[0.22em] text-cyan-100">Home Department Command Centre</div>
              <h1 className="display mt-1 text-3xl font-black leading-tight sm:text-5xl">Home & Internal Security</h1>
              <p className="mt-2 max-w-3xl text-[15px] font-medium leading-relaxed text-white/84 sm:text-base">Law and order, public safety, emergency response and correctional administration.</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
                <span className="rounded-full bg-emerald-300 px-3 py-1.5 font-black text-emerald-950">State Security Status: Stable</span>
                <span className="rounded-full bg-white/15 px-3 py-1.5 font-bold">Last refresh: 15 Jun 2026, 10:31 AM</span>
                <span className="rounded-full bg-amber-300 px-3 py-1.5 font-black text-amber-950">Demo statistics - not live operational feed</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => showToast("Critical alerts filtered")} className="rounded-xl bg-rose-500 px-3 py-2 text-[12px] font-bold text-white hover:bg-rose-600">View Critical Alerts</button>
              <button onClick={() => showToast("Situation report generated")} className="rounded-xl bg-white px-3 py-2 text-[12px] font-bold text-[color:var(--color-navy)] hover:bg-white/90">Generate Situation Report</button>
              <button onClick={() => showToast("Dashboard export queued")} className="rounded-xl bg-white/15 px-3 py-2 text-[12px] font-bold text-white hover:bg-white/25">Export Dashboard</button>
            </div>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {["Date range", "District", "Police district", "Commissionerate / Rural district", "Department or agency"].map((f) => <FilterChip key={f} label={f} />)}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-7">
        {executiveKpis.map(([label, value, delta, target, icon, rag, spark]) => <KpiCard key={label} label={label} value={value} delta={delta} target={target} icon={icon} rag={rag as Rag} spark={spark as number[]} />)}
      </div>

      <SectionCard title="State Command Status" subtitle="live-status style indicators and last-sync timestamps" icon="RadioTower" expandable>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {commandStatus.map(([label, value, sync, rag]) => <StatusPill key={label} label={label} value={value} sync={sync} rag={rag as Rag} />)}
        </div>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Kerala Safety and Crime Map" subtitle="district-wise aggregated indicators only; no tactical locations or personal data" icon="Map" expandable>
          <div className="mb-3 flex flex-wrap gap-2">
            {mapModes.map((m) => <button key={m.id} onClick={() => setMode(m.id)} className={`rounded-full px-3 py-1.5 text-[11px] font-black transition ${mode === m.id ? "bg-[color:var(--color-navy)] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{m.label}</button>)}
          </div>
          <KeralaMap values={mapData} height={440} unit={selectedMode.unit} onSelect={(district) => openDrawer({ title: `${district} - ${selectedMode.label}`, rag: "amber", source: "Demo Home Department command dataset", updated: "15 Jun 2026 10:31", confidence: 78, achieved: `${mapData[district] ?? "NA"} ${selectedMode.unit}`, action: "Open district KPIs, trend charts, alerts and responsible officer summary. Sensitive locations remain masked." })} />
        </SectionCard>
        <SectionCard title="District Attention Ranking" subtitle={selectedMode.label} icon="ListOrdered" expandable>
          <Bars data={topDistricts} horizontal color="#0f766e" height={300} />
          <div className="mt-3 rounded-xl bg-slate-50 p-3 text-[12px] leading-relaxed text-slate-500">Map click opens a side panel with district KPIs, major alerts and officer responsibility. Tactical deployment maps, VIP movement and victim details are intentionally excluded.</div>
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Crime and Law-and-Order Analytics" subtitle="monthly trend by major public-statistics categories" icon="LineChart" expandable>
          <TrendLine data={monthlyCrime.map((d) => ({ label: d.label, value: d.bns, women: d.women, cyber: d.cyber }))} color="#2563eb" height={280} />
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <MiniTrend label="Women cases" data={monthlyCrime.map((d) => d.women)} color="#ec4899" />
            <MiniTrend label="Cybercrime" data={monthlyCrime.map((d) => d.cyber)} color="#7c3aed" />
            <MiniTrend label="Traffic fatalities" data={monthlyCrime.map((d) => d.traffic)} color="#dc2626" />
          </div>
        </SectionCard>
        <SectionCard title="Crime Category Distribution" subtitle="aggregated demo distribution" icon="ChartPie" expandable>
          <Donut data={crimeDistribution} height={260} inner={72} label="Cases" />
          <div className="grid grid-cols-2 gap-2">
            {crimeDistribution.map((c) => <div key={c.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px]"><span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded" style={{ background: c.color }} />{c.label}</span><b>{c.value}%</b></div>)}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="District Performance Table" subtitle="district roll-up for executive review" icon="TableProperties" expandable>
        <div className="max-h-[520px] overflow-auto rounded-xl border border-slate-100 scrollbar-thin">
          <table className="w-full min-w-[1080px] text-left text-[12px]">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500"><tr>{["District", "Cases", "Detection", "Disposal", "Crime rate", "Pending >90d", "Response", "Trend", "Risk"].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
            <tbody>{districtRows.map((r) => <tr key={r.district} className="border-b border-slate-50 hover:bg-slate-50"><td className="px-3 py-2 font-extrabold">{r.district}</td><td className="px-3 py-2">{r.cases.toLocaleString("en-IN")}</td><td className="px-3 py-2">{r.detection}%</td><td className="px-3 py-2">{r.disposal}%</td><td className="px-3 py-2">{r.rate}</td><td className="px-3 py-2">{r.pending.toLocaleString("en-IN")}</td><td className="px-3 py-2">{r.response} min</td><td className="px-3 py-2"><Sparkline data={[40, 42, 44, r.rate / 10, r.rate / 9]} color={RAG_HEX[r.risk]} /></td><td className="px-3 py-2"><RagBadge rag={r.risk} /></td></tr>)}</tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <SectionCard title="Emergency Response and Public Service Delivery" subtitle="112 call flow, petitions and citizen-service load" icon="Siren" expandable>
          <StackedBars data={emergencyFunnel.map((x) => ({ label: x.label, Calls: x.value }))} keys={["Calls"]} colors={["#2563eb"]} height={250} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              ["Calls attended", "80.6%", "green"],
              ["Avg dispatch", "3.1 min", "green"],
              ["Avg arrival", "9.8 min", "green"],
              ["SLA exceeded", "1,284", "amber"],
              ["Passport verification", "48,210", "green"],
              ["THUNA usage", "8.39 L", "green"],
            ].map(([l, v, r]) => <SmallStat key={l} label={l} value={v} rag={r as Rag} />)}
          </div>
        </SectionCard>
        <SectionCard title="Hourly Emergency Call Volume" subtitle="peak-load view for control rooms" icon="Clock3" expandable>
          <Bars data={hourlyCalls} color="#0f766e" height={280} />
        </SectionCard>
      </div>

      <TwoColumnSections />

      <SectionCard title="Critical Alerts and Escalation Queue" subtitle="critical, high, medium and monitoring queues" icon="TriangleAlert" expandable>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {alerts.map(([level, district, text, authority, status]) => {
            const rag = level === "Critical" ? "red" : level === "High" ? "amber" : level === "Medium" ? "blue" : "green";
            return (
              <div key={`${level}-${district}`} className="rounded-xl border border-slate-100 p-4">
                <div className="mb-3 flex items-center justify-between"><RagBadge rag={rag as Rag} label={level} /><span className="text-[11px] font-bold text-slate-400">{district}</span></div>
                <div className="text-[13px] font-extrabold text-slate-800">{text}</div>
                <div className="mt-2 text-[11.5px] text-slate-500">{authority} · {status}</div>
                <button onClick={() => openTicket({ itemType: "Home Security Alert", itemName: text, rag: rag as Rag, secretary: authority })} className="mt-3 rounded-lg bg-[color:var(--color-ribbon)] px-3 py-1.5 text-[11px] font-bold text-white">Action</button>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="AI Insights and Recommended Actions" subtitle="explainable recommendations, confidence and accountable department" icon="Sparkles" expandable>
          <div className="space-y-3">{insights.map(([indicator, action, conf, dept]) => <Insight key={indicator} indicator={indicator} action={action} conf={conf} dept={dept} />)}</div>
        </SectionCard>
        <SectionCard title="Role-Based Security and Governance" subtitle="visibility controls for sensitive law-and-order information" icon="LockKeyhole" expandable>
          <div className="grid gap-2">
            {["Public view receives aggregate district statistics only.", "CM, Home Minister, Chief Secretary and Home Secretary views use role-based drill-down.", "Victim names, investigation records, live patrol routes, VIP movement and tactical locations are masked.", "Every data access and update is audit-trailed.", "English and Malayalam labels can be toggled at source-integration stage."].map((x) => <div key={x} className="flex gap-2 rounded-xl bg-slate-50 p-3 text-[12.5px] font-semibold text-slate-700"><Icon name="ShieldCheck" size={16} className="text-emerald-600" />{x}</div>)}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Department Performance Scorecards" subtitle="service delivery, capacity, pendency and data freshness" icon="Building2" expandable>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {departments.map(([name, overall, service, capacity, pendency, freshness, critical, rag, icon]) => <DepartmentCard key={name} name={name} overall={overall as number} service={service as number} capacity={capacity as number} pendency={pendency as number} freshness={String(freshness)} critical={critical as number} rag={rag as Rag} icon={String(icon)} />)}
        </div>
      </SectionCard>

      <SectionCard title="Data Source and Integration Health" subtitle="method, refresh frequency, records received, confidence and status" icon="DatabaseZap" expandable>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sources.map(([name, method, freq, sync, records, confidence, rag]) => <SourceCard key={name} name={name} method={method} freq={freq} sync={sync} records={records} confidence={confidence as number} rag={rag as Rag} />)}
        </div>
      </SectionCard>
    </div>
  );
}

function TwoColumnSections() {
  const sections = [
    ["Women and Child Safety", "HeartHandshake", "#ec4899", [["Cases registered", "18,420"], ["Charge sheets", "71%"], ["Missing traced", "91.2%"], ["Avg investigation", "48 days"]]],
    ["Cybercrime Command", "ShieldAlert", "#7c3aed", [["Complaints", "42,860"], ["Amount reported", "Rs 312 Cr"], ["Amount on hold", "Rs 94.6 Cr"], ["Freeze time", "6.4 hrs"]]],
    ["Traffic Safety", "Car", "#dc2626", [["Accidents", "21,840"], ["Fatal accidents", "1,506"], ["Blackspots", "286"], ["Auto alerts", "2.34 L"]]],
    ["Police Readiness", "BadgeCheck", "#2563eb", [["Working strength", "92%"], ["Women police", "15.8%"], ["Stations", "564"], ["CCTV uptime", "96%"]]],
    ["Fire and Rescue Services", "Flame", "#ea580c", [["Calls received", "7,420"], ["Fire incidents", "1,284"], ["Avg response", "11.2 min"], ["NOC pending", "1,168"]]],
    ["Prisons and Correctional Services", "Landmark", "#0f766e", [["Capacity", "9,310"], ["Population", "8,940"], ["Occupancy", "96%"], ["Education enrolled", "1,842"]]],
    ["Prosecution Performance", "Gavel", "#64748b", [["Cases assigned", "1.24 L"], ["Disposed", "56,840"], ["Conviction rate", "64%"], ["Pending >3 yrs", "9,860"]]],
    ["Forensic and Chemical Examiner", "Microscope", "#be123c", [["Samples received", "74,200"], ["Samples pending", "18,740"], ["Avg TAT", "41 days"], ["Beyond SLA", "6,820"]]],
  ];
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {sections.map(([title, icon, color, rows]) => (
        <SectionCard key={String(title)} title={String(title)} subtitle="aggregated demo indicators and executive drill-down" icon={String(icon)} expandable>
          <div className="grid grid-cols-2 gap-2">
            {(rows as string[][]).map(([l, v]) => <div key={l} className="rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-3"><div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{l}</div><div className="display mt-1 text-2xl font-black" style={{ color: String(color) }}>{v}</div></div>)}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-[0.7fr_1.3fr]">
            <Gauge value={title === "Forensic and Chemical Examiner" ? 62 : title === "Traffic Safety" ? 68 : 78} color={String(color)} height={170} label="Score" />
            {title === "Cybercrime Command" ? <Donut data={cyberPatterns.map(([label, value, rag]) => ({ label, value: value as number, color: RAG_HEX[rag as Rag] }))} height={170} inner={52} label="Cyber" /> : <Bars data={DISTRICTS.slice(0, 6).map((d, i) => ({ label: d.slice(0, 4), value: [82, 76, 71, 68, 64, 59][i] }))} color={String(color)} height={170} />}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

function KpiCard({ label, value, delta, target, icon, rag, spark }: { label: string; value: string; delta: string; target: string; icon: string; rag: Rag; spark: number[] }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="card overflow-hidden p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: RAG_HEX[rag] }}><Icon name={icon} size={16} /></span>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-black" style={{ background: `${RAG_HEX[rag]}16`, color: RAG_HEX[rag] }}>{delta}</span>
      </div>
      <div className="display text-xl font-black leading-tight text-[color:var(--color-navy)]">{value}</div>
      <div className="mt-1 min-h-8 text-[11px] font-extrabold leading-tight text-slate-700">{label}</div>
      <div className="text-[10px] font-semibold text-slate-400">{target}</div>
      <Sparkline data={spark} color={RAG_HEX[rag]} />
    </motion.div>
  );
}

function FilterChip({ label }: { label: string }) {
  return <button className="flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-left text-[12px] font-bold text-white/84"><span>{label}</span><Icon name="ChevronDown" size={14} /></button>;
}

function StatusPill({ label, value, sync, rag }: { label: string; value: string; sync: string; rag: Rag }) {
  return <div className="rounded-xl border border-slate-100 bg-slate-50 p-3"><div className="flex items-center gap-2"><span className="live-dot h-2.5 w-2.5 rounded-full" style={{ background: RAG_HEX[rag] }} /><span className="text-[11px] font-black uppercase tracking-wide text-slate-400">{label}</span></div><div className="mt-1 text-[14px] font-extrabold text-slate-800">{value}</div><div className="text-[10.5px] text-slate-400">Sync: {sync}</div></div>;
}

function MiniTrend({ label, data, color }: { label: string; data: number[]; color: string }) {
  return <div className="rounded-xl border border-slate-100 p-3"><div className="text-[11px] font-black text-slate-500">{label}</div><Sparkline data={data} color={color} height={44} /></div>;
}

function SmallStat({ label, value, rag }: { label: string; value: string; rag: Rag }) {
  return <div className="rounded-xl bg-slate-50 p-3"><div className="text-[10px] font-bold uppercase text-slate-400">{label}</div><div className="text-[17px] font-black" style={{ color: RAG_HEX[rag] }}>{value}</div></div>;
}

function Insight({ indicator, action, conf, dept }: { indicator: string; action: string; conf: string; dept: string }) {
  return <div className="rounded-xl border border-slate-100 p-3"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-700"><Icon name="Sparkles" size={17} /></span><div><div className="text-[12.5px] font-extrabold text-slate-800">{indicator}</div><div className="mt-1 text-[12px] leading-relaxed text-slate-500">{action}</div><div className="mt-2 flex flex-wrap gap-2 text-[10px] font-black"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">Confidence {conf}</span><span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">{dept}</span></div></div></div></div>;
}

function DepartmentCard({ name, overall, service, capacity, pendency, freshness, critical, rag, icon }: { name: string; overall: number; service: number; capacity: number; pendency: number; freshness: string; critical: number; rag: Rag; icon: string }) {
  return <div className="rounded-xl border border-slate-100 p-4"><div className="flex items-start justify-between gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: RAG_HEX[rag] }}><Icon name={icon} size={19} /></span><RagBadge rag={rag} /></div><div className="mt-3 text-[13px] font-black text-slate-800">{name}</div><div className="display mt-1 text-3xl font-black" style={{ color: RAG_HEX[rag] }}>{overall}</div><div className="mt-2 space-y-1.5 text-[11px]"><BarMini label="Service" value={service} /><BarMini label="Capacity" value={capacity} /><BarMini label="Pendency" value={pendency} /></div><div className="mt-3 flex items-center justify-between text-[10.5px] font-bold text-slate-400"><span>Fresh {freshness}</span><span>{critical} alerts</span></div><button className="mt-3 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50">View Details</button></div>;
}

function SourceCard({ name, method, freq, sync, records, confidence, rag }: { name: string; method: string; freq: string; sync: string; records: string; confidence: number; rag: Rag }) {
  return <div className="rounded-xl border border-slate-100 p-4"><div className="flex items-start justify-between gap-2"><div className="text-[13px] font-black text-slate-800">{name}</div><RagBadge rag={rag} /></div><div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500"><div><b>Method</b><br />{method}</div><div><b>Refresh</b><br />{freq}</div><div><b>Records</b><br />{records}</div><div><b>Last sync</b><br />{sync}</div></div><div className="mt-3"><BarMini label="Confidence" value={confidence} color={RAG_HEX[rag]} /></div></div>;
}

function BarMini({ label, value, color = "#1c3f7c" }: { label: string; value: number; color?: string }) {
  return <div><div className="mb-1 flex justify-between"><span>{label}</span><b>{value}%</b></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} /></div></div>;
}

function mk(values: number[]) {
  return Object.fromEntries(DISTRICTS.map((d, i) => [d, values[i]]));
}
