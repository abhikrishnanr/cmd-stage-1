"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import KeralaMap from "@/components/KeralaMap";
import { Bars, Donut, Gauge, StackedBars, TrendLine } from "@/components/charts";
import { Icon, RagBadge, SectionCard, StatTile } from "@/components/primitives";
import { PageHero } from "@/components/PageHero";
import { useUI } from "@/store/ui";
import { RAG_HEX } from "@/lib/ui";
import {
  aiEducationInsights,
  bottomEducationWatch,
  demandMatrix,
  educationAlerts,
  educationDistrictMetrics,
  educationInventoryTabs,
  educationKpis,
  educationPipeline,
  educationUpdatedAt,
  infraProjects,
  learningOutcomes,
  skillStats,
  supportStats,
  teacherWorkforce,
} from "@/data/educationCommand";
import { Rag } from "@/data/types";

const tabs = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard" },
  { id: "inventory", label: "Inventory", icon: "TableProperties" },
  { id: "districts", label: "Districts", icon: "Map" },
  { id: "outcomes", label: "Learning", icon: "LineChart" },
  { id: "demand", label: "Demand Gap", icon: "GitCompareArrows" },
  { id: "workforce", label: "Workforce", icon: "UsersRound" },
  { id: "projects", label: "Projects", icon: "HardHat" },
  { id: "support", label: "Support", icon: "HandHeart" },
  { id: "insights", label: "AI Insights", icon: "Sparkles" },
];

const layerOptions = [
  ["students", "Total student population", "students"],
  ["schoolCapacity", "School capacity", "%"],
  ["plusTwoCapacity", "Higher secondary capacity", "%"],
  ["higherEdCapacity", "Arts and science capacity", "%"],
  ["engineeringCapacity", "Engineering capacity", "%"],
  ["medicalCapacity", "Medical education capacity", "%"],
  ["skillCapacity", "Skill development capacity", "%"],
  ["hostelCapacity", "Hostel capacity", "%"],
  ["teacherVacancies", "Teacher vacancies", "risk"],
  ["infraGap", "Infrastructure gap", "gap"],
  ["utilisation", "Capacity utilisation", "%"],
  ["passPct", "Pass percentage", "%"],
];

export default function EducationCommandCentre() {
  const { openDrawer, openTicket } = useUI();
  const [tab, setTab] = useState("overview");
  const [inventoryTab, setInventoryTab] = useState("school");
  const [district, setDistrict] = useState("Malappuram");
  const [layer, setLayer] = useState("plusTwoCapacity");

  const inventory = educationInventoryTabs.find((x) => x.id === inventoryTab)!;
  const mapValues = useMemo(() => Object.fromEntries(Object.entries(educationDistrictMetrics).map(([name, m]: any) => [name, m[layer]])), [layer]);
  const selectedMetric: any = educationDistrictMetrics[district] || Object.values(educationDistrictMetrics)[0];
  const layerMeta = layerOptions.find(([id]) => id === layer) || layerOptions[0];

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <div className="flex items-center gap-1 text-[12px] font-semibold text-slate-400">
        <Link href="/sectors" className="flex items-center gap-1 text-[color:var(--color-navy)]"><Icon name="ArrowLeft" size={14} /> Sectors</Link>
        <Icon name="ChevronRight" size={13} />
        <span>Education Command Centre</span>
      </div>

      <PageHero
        icon="GraduationCap"
        badge="Education"
        title="Education Command Centre"
        subtitle="Infrastructure, capacity, learning outcomes, higher education, skill development and future demand across Kerala."
        gradient="linear-gradient(120deg,#0f172a 0%,#1d4ed8 48%,#0f766e 100%)"
        stats={[
          { label: "Academic year", value: "2026-27", icon: "CalendarDays" },
          { label: "District", value: district, icon: "MapPin" },
          { label: "Last updated", value: "11:40 AM", icon: "RefreshCw" },
          { label: "Capacity use", value: "87.4%", icon: "Gauge" },
          { label: "Scholarships", value: "18.6 L", icon: "BadgeIndianRupee" },
          { label: "Infra gaps", value: "1,284", icon: "HardHat" },
        ]}
      >
        <div className="mt-5 grid gap-2 lg:grid-cols-6">
          <Control label="Academic Year" value="2026-27" icon="CalendarDays" />
          <Control label="District" value={district} icon="MapPin" />
          <Control label="Category" value="All institutions" icon="Layers3" />
          <Control label="Management" value="Govt / Aided / Private" icon="Building2" />
          <button onClick={() => openDrawer({ title: "Compare Districts", rag: "blue", source: "Education command data", updated: educationUpdatedAt, confidence: 86, achieved: "4 district comparison", action: "Compare up to four districts across capacity, pass percentage, vacancies and infrastructure gap." })} className="rounded-xl bg-white/12 px-3 py-2 text-left text-[11px] font-bold text-white hover:bg-white/18"><Icon name="GitCompareArrows" size={14} className="mb-1" /> Compare districts</button>
          <button onClick={() => openDrawer({ title: "Education Report", rag: "green", source: "Education command data", updated: educationUpdatedAt, confidence: 90, achieved: "Report ready", action: "Downloadable executive PDF and district annexures." })} className="rounded-xl bg-white px-3 py-2 text-left text-[11px] font-black text-[color:var(--color-navy)] hover:bg-white/90"><Icon name="Download" size={14} className="mb-1" /> Download report</button>
        </div>
      </PageHero>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        {educationKpis.map((k) => <StatTile key={k.label} label={k.label} value={k.value} sub={k.sub} rag={k.rag} icon={k.icon} />)}
      </div>

      <div className="sticky top-16 z-20 -mx-1 overflow-x-auto rounded-2xl border border-slate-100 bg-white/85 p-1 shadow-sm backdrop-blur scrollbar-thin">
        <div className="flex min-w-max gap-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-extrabold transition ${tab === t.id ? "bg-[color:var(--color-navy)] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}>
              <Icon name={t.icon} size={14} /> {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "overview" && (
        <div className="space-y-5">
          <SectionCard title="Education Ecosystem Pipeline" subtitle="institution count, enrolment, capacity and transition flow" icon="Route" expandable>
            <div className="overflow-x-auto scrollbar-thin">
              <div className="flex min-w-[1220px] items-stretch gap-3">
                {educationPipeline.map((p: any, i) => (
                  <div key={p.stage} className="relative w-[150px] shrink-0 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                    {i < educationPipeline.length - 1 && <Icon name="ArrowRight" size={18} className="absolute -right-6 top-1/2 z-10 text-slate-300" />}
                    <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: p.utilisation >= 85 ? RAG_HEX.green : p.utilisation >= 70 ? RAG_HEX.amber : RAG_HEX.blue }}><Icon name={stageIcon(p.stage)} size={17} /></span>
                    <div className="mt-2 min-h-[36px] text-[12px] font-extrabold leading-tight text-[color:var(--color-ink)]">{p.stage}</div>
                    <Metric mini label="Institutions" value={p.institutions ? p.institutions.toLocaleString("en-IN") : "-"} />
                    <Metric mini label="Enrolment" value={p.enrolment.toLocaleString("en-IN")} />
                    <Metric mini label="Capacity" value={p.capacity ? p.capacity.toLocaleString("en-IN") : "-"} />
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(100, p.utilisation || p.transition)}%` }} /></div>
                    <div className="mt-1 text-[10px] font-bold text-slate-500">Pass {p.pass || "-"}% | Drop {p.dropout || "-"}%</div>
                    <div className="text-[10px] text-slate-400">Next transition {p.transition || "-"}%</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <SectionCard title="Executive Performance Mix" subtitle="capacity, pass percentage and support trend" icon="Activity" expandable>
              <TrendLine data={[{ label: "2022", value: 81, v2: 78 }, { label: "2023", value: 83, v2: 79 }, { label: "2024", value: 84, v2: 81 }, { label: "2025", value: 86, v2: 82 }, { label: "2026", value: 87, v2: 84 }]} color="#2563eb" height={260} k2="v2" />
            </SectionCard>
            <SectionCard title="Alerts and Escalations" subtitle="teacher vacancies, seats, projects and welfare" icon="Siren">
              <div className="space-y-2">
                {educationAlerts.map((a) => <AlertRow key={`${a.text}-${a.district}`} alert={a} onTicket={() => openTicket({ itemType: "Education Alert", itemName: a.text, rag: a.rag, secretary: a.owner })} />)}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {tab === "inventory" && (
        <SectionCard title="Institution and Infrastructure Inventory" subtitle="category-wise capacity, staffing and facility readiness" icon="Building2" expandable>
          <SubTabs tabs={educationInventoryTabs} active={inventoryTab} setActive={setInventoryTab} />
          <InventoryTable rows={inventory.rows} />
        </SectionCard>
      )}

      {tab === "districts" && (
        <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <SectionCard title="District-wise Education Capacity Map" subtitle={`Layer: ${layerMeta[1]}`} icon="Map" expandable>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {layerOptions.map(([id, label]) => <button key={id} onClick={() => setLayer(id)} className={`rounded-lg px-2.5 py-1 text-[10.5px] font-bold ${layer === id ? "bg-[color:var(--color-navy)] text-white" : "bg-slate-100 text-slate-500"}`}>{label}</button>)}
            </div>
            <KeralaMap values={mapValues} height={420} unit={layerMeta[2]} onSelect={(d) => setDistrict(d)} />
          </SectionCard>
          <SectionCard title={`${district} District Detail`} subtitle="click another district on the map to update" icon="PanelRight" expandable>
            <div className="grid grid-cols-2 gap-3">
              <Metric label="School-age population" value={selectedMetric.students.toLocaleString("en-IN")} />
              <Metric label="School capacity" value={`${selectedMetric.schoolCapacity}%`} />
              <Metric label="Plus Two capacity" value={`${selectedMetric.plusTwoCapacity}%`} />
              <Metric label="Higher education capacity" value={`${selectedMetric.higherEdCapacity}%`} />
              <Metric label="Teacher vacancies" value={`${selectedMetric.teacherVacancies}% risk`} />
              <Metric label="Infrastructure gap" value={`${selectedMetric.infraGap}%`} />
              <Metric label="Capacity utilisation" value={`${selectedMetric.utilisation}%`} />
              <Metric label="Pass percentage" value={`${selectedMetric.passPct}%`} />
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-[12.5px] leading-relaxed text-slate-600">
              Includes government, aided and private distribution, course availability, gender and social-category participation, faculty vacancies, hostel capacity, and migration into/out of district for education.
            </div>
          </SectionCard>
          <SectionCard className="xl:col-span-2" title="Four District Comparison" subtitle="capacity, pass percentage, vacancy and infrastructure gap" icon="GitCompareArrows" expandable>
            <StackedBars data={["Malappuram", "Wayanad", "Ernakulam", "Kozhikode"].map((d) => {
              const m: any = educationDistrictMetrics[d];
              return { label: d, Capacity: m.plusTwoCapacity, Pass: m.passPct, Vacancy: m.teacherVacancies, Infra: m.infraGap };
            })} keys={["Capacity", "Pass", "Vacancy", "Infra"]} colors={["#2563eb", "#16a34a", "#f59e0b", "#e11d48"]} height={300} />
          </SectionCard>
        </div>
      )}

      {tab === "outcomes" && (
        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <SectionCard title="Learning Outcome and Pass Percentage" subtitle="appeared, passed, distinction, dropout and progression" icon="Trophy" expandable>
            <OutcomeTable />
          </SectionCard>
          <SectionCard title="Pass Percentage by Stream" subtitle="selected categories" icon="BarChart3" expandable>
            <Bars data={learningOutcomes.slice(0, 10).map((x) => ({ label: x.label.split(" ")[0], value: x.passPct }))} color="#2563eb" height={360} />
          </SectionCard>
        </div>
      )}

      {tab === "demand" && (
        <div className="space-y-5">
          <SectionCard title="Capacity, Demand and Course Gap Analysis" subtitle="demand, seats, filled seats, projected gap and batches required" icon="GitCompareArrows" expandable>
            <DemandTable />
          </SectionCard>
          <div className="grid gap-5 xl:grid-cols-2">
            <SectionCard title="Demand vs Seats" icon="BarChart3" expandable>
              <StackedBars data={demandMatrix.map((d) => ({ label: d.course.slice(0, 14), Demand: d.demand, Seats: d.seats, Filled: d.filled }))} keys={["Demand", "Seats", "Filled"]} colors={["#2563eb", "#f59e0b", "#16a34a"]} height={300} />
            </SectionCard>
            <SectionCard title="Highlighted Course Gaps" icon="TriangleAlert">
              <div className="grid gap-2">
                {demandMatrix.filter((d) => d.gap < 0).map((d) => <div key={d.course} className="rounded-xl border border-rose-100 bg-rose-50 p-3"><div className="font-extrabold text-rose-700">{d.course}</div><div className="text-[12px] text-rose-600">{d.districts}: shortage of {Math.abs(d.gap).toLocaleString("en-IN")} seats; add {d.batches} batches.</div></div>)}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {tab === "workforce" && (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <SectionCard title="Teacher and Faculty Workforce" subtitle="sanctioned, filled, vacancies and retirement risk" icon="UsersRound" expandable>
            <div className="grid grid-cols-2 gap-3">
              {teacherWorkforce.map((w) => <StatTile key={w.label} label={w.label} value={w.value.toLocaleString("en-IN")} sub={w.filled ? `${w.filled.toLocaleString("en-IN")} filled` : "requires action"} rag={w.rag} icon={w.label.includes("Vacanc") ? "UserX" : "UserRoundCheck"} />)}
            </div>
          </SectionCard>
          <SectionCard title="Subject Shortage Watch" subtitle="mathematics, physics and technical trades" icon="BookOpenCheck" expandable>
            <Bars horizontal data={[{ label: "Mathematics", value: 28 }, { label: "Physics", value: 24 }, { label: "Computer Science", value: 19 }, { label: "English", value: 13 }, { label: "ITI trades", value: 22 }, { label: "Nursing faculty", value: 16 }]} color="#e11d48" height={320} />
          </SectionCard>
        </div>
      )}

      {tab === "projects" && (
        <SectionCard title="Infrastructure and Project Monitoring" subtitle="buildings, labs, smart classrooms, hostels, libraries and KIIFB/CSS projects" icon="HardHat" expandable>
          <ProjectTable />
        </SectionCard>
      )}

      {tab === "support" && (
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <SectionCard title="Scholarships, Inclusion and Student Support" subtitle="financial assistance, meals, textbooks, transport, hostels and dropout prevention" icon="HandHeart" expandable>
            <div className="grid grid-cols-2 gap-3">
              {supportStats.map((s) => <StatTile key={s.label} label={s.label} value={s.value} sub={s.sub} rag={s.rag} icon={supportIcon(s.label)} />)}
            </div>
          </SectionCard>
          <SectionCard title="Skill Development and Employability" subtitle="training, certification, apprenticeships, placements and sector gaps" icon="Wrench" expandable>
            <div className="grid grid-cols-2 gap-3">
              {skillStats.map((s) => <StatTile key={s.label} label={s.label} value={s.value} rag={s.rag} icon={s.icon} />)}
            </div>
          </SectionCard>
        </div>
      )}

      {tab === "insights" && (
        <div className="space-y-5">
          <SectionCard title="AI Insights and Decision Support" subtitle="evidence-backed recommendations for CM review" icon="Sparkles" expandable>
            <div className="grid gap-3 xl:grid-cols-2">
              {aiEducationInsights.map((i) => <InsightCard key={i.title} insight={i} onTicket={() => openTicket({ itemType: "Education AI Insight", itemName: i.title, rag: i.priority === "Critical" ? "red" : i.priority === "High" ? "amber" : "blue", secretary: i.dept })} />)}
            </div>
          </SectionCard>
          <BottomWatch />
        </div>
      )}
    </div>
  );
}

function Control({ label, value, icon }: { label: string; value: string; icon: string }) {
  return <div className="rounded-xl bg-white/12 px-3 py-2"><div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-white/50"><Icon name={icon} size={12} /> {label}</div><div className="truncate text-[12px] font-black text-white">{value}</div></div>;
}

function SubTabs({ tabs, active, setActive }: { tabs: any[]; active: string; setActive: (id: string) => void }) {
  return <div className="mb-4 flex flex-wrap gap-1.5">{tabs.map((t) => <button key={t.id} onClick={() => setActive(t.id)} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold ${active === t.id ? "bg-[color:var(--color-navy)] text-white" : "bg-slate-100 text-slate-500"}`}><Icon name={t.icon} size={14} /> {t.label}</button>)}</div>;
}

function InventoryTable({ rows }: { rows: any[] }) {
  const heads = ["Category", "Count", "Govt", "Seats", "Enrolment", "Vacant", "Teachers", "Non-teach", "STR", "Hostel", "Lab", "Library", "Internet", "Access", "Infra"];
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[1180px] text-left text-[12px]">
        <thead><tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">{heads.map((h) => <th key={h} className="px-3 py-2 font-bold">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]} className="border-b border-slate-50 hover:bg-slate-50">{r.map((c: any, i: number) => <td key={i} className={`px-3 py-2 ${i === 0 ? "font-extrabold text-[color:var(--color-ink)]" : "font-semibold text-slate-600"}`}>{typeof c === "number" ? c.toLocaleString("en-IN") : c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function OutcomeTable() {
  return <div className="overflow-x-auto scrollbar-thin"><table className="w-full min-w-[900px] text-left text-[12px]"><thead><tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">{["Category", "Appeared", "Passed", "Pass %", "High-grade %", "Dropout %", "Progression %"].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead><tbody>{learningOutcomes.map((r) => <tr key={r.label} className="border-b border-slate-50 hover:bg-slate-50"><td className="px-3 py-2 font-extrabold">{r.label}</td><td className="px-3 py-2">{r.appeared.toLocaleString("en-IN")}</td><td className="px-3 py-2">{r.passed.toLocaleString("en-IN")}</td><td className="px-3 py-2 font-black text-green-700">{r.passPct}%</td><td className="px-3 py-2">{r.distinction}%</td><td className="px-3 py-2">{r.dropout}%</td><td className="px-3 py-2">{r.progression}%</td></tr>)}</tbody></table></div>;
}

function DemandTable() {
  return <div className="overflow-x-auto scrollbar-thin"><table className="w-full min-w-[980px] text-left text-[12px]"><thead><tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">{["Course / Stream", "Districts", "Demand", "Seats", "Filled", "Gap", "Batches", "RAG"].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead><tbody>{demandMatrix.map((r) => <tr key={r.course} className="border-b border-slate-50 hover:bg-slate-50"><td className="px-3 py-2 font-extrabold">{r.course}</td><td className="px-3 py-2 text-slate-500">{r.districts}</td><td className="px-3 py-2">{r.demand.toLocaleString("en-IN")}</td><td className="px-3 py-2">{r.seats.toLocaleString("en-IN")}</td><td className="px-3 py-2">{r.filled.toLocaleString("en-IN")}</td><td className={`px-3 py-2 font-black ${r.gap < 0 ? "text-rose-600" : "text-green-700"}`}>{r.gap.toLocaleString("en-IN")}</td><td className="px-3 py-2">{r.batches}</td><td className="px-3 py-2"><RagBadge rag={r.rag} /></td></tr>)}</tbody></table></div>;
}

function ProjectTable() {
  return <div className="overflow-x-auto scrollbar-thin"><table className="w-full min-w-[980px] text-left text-[12px]"><thead><tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">{["Project", "District", "Cost", "Source", "Physical", "Financial", "Due", "Delay", "Agency", "Bottleneck"].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead><tbody>{infraProjects.map((p) => <tr key={p.project} className="border-b border-slate-50 hover:bg-slate-50"><td className="px-3 py-2 font-extrabold">{p.project}</td><td className="px-3 py-2">{p.district}</td><td className="px-3 py-2">{p.cost}</td><td className="px-3 py-2">{p.source}</td><td className="px-3 py-2"><Progress v={p.physical} /></td><td className="px-3 py-2"><Progress v={p.financial} /></td><td className="px-3 py-2">{p.due}</td><td className="px-3 py-2"><RagBadge rag={p.delay === "Red" ? "red" : p.delay === "Amber" ? "amber" : "green"} label={p.delay} /></td><td className="px-3 py-2">{p.agency}</td><td className="px-3 py-2 text-slate-500">{p.bottleneck}</td></tr>)}</tbody></table></div>;
}

function Progress({ v }: { v: number }) {
  return <div className="min-w-24"><div className="mb-1 text-[10px] font-bold text-slate-500">{v}%</div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${v}%` }} /></div></div>;
}

function Metric({ label, value, mini }: { label: string; value: string; mini?: boolean }) {
  return <div className={mini ? "mt-2" : "rounded-xl bg-slate-50 p-3"}><div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</div><div className={`${mini ? "text-[12px]" : "text-lg"} font-black text-[color:var(--color-ink)]`}>{value}</div></div>;
}

function AlertRow({ alert, onTicket }: { alert: any; onTicket: () => void }) {
  return <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: RAG_HEX[alert.rag] }}><Icon name="TriangleAlert" size={16} /></span><div className="min-w-0 flex-1"><div className="text-[13px] font-extrabold">{alert.text}</div><div className="text-[11px] text-slate-500">{alert.district} - {alert.owner}</div></div><button onClick={onTicket} className="rounded-lg bg-[color:var(--color-ribbon)] px-2.5 py-1.5 text-[11px] font-bold text-white">Ticket</button></div>;
}

function InsightCard({ insight, onTicket }: { insight: any; onTicket: () => void }) {
  const rag: Rag = insight.priority === "Critical" ? "red" : insight.priority === "High" ? "amber" : "blue";
  return <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><div className="mb-3 flex items-start justify-between gap-3"><div className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: RAG_HEX[rag] }}><Icon name="Sparkles" size={18} /></span><div><div className="font-extrabold text-[color:var(--color-ink)]">{insight.title}</div><div className="text-[11px] text-slate-500">{insight.districts}</div></div></div><RagBadge rag={rag} label={insight.priority} /></div><p className="text-[12.5px] leading-relaxed text-slate-600">{insight.evidence}</p><div className="mt-3 grid grid-cols-2 gap-2 text-[11px]"><Metric label="Students affected" value={insight.students} /><Metric label="Investment" value={insight.investment} /><Metric label="Department" value={insight.dept} /><Metric label="Expected outcome" value={insight.outcome} /></div><div className="mt-3 rounded-xl bg-blue-50 p-3 text-[12px] font-semibold text-blue-800">{insight.action}</div><button onClick={onTicket} className="mt-3 rounded-xl bg-[color:var(--color-ribbon)] px-3 py-2 text-[12px] font-bold text-white">Create CM ticket</button></div>;
}

function BottomWatch() {
  const groups = [
    ["Top-performing districts", bottomEducationWatch.topDistricts, "Trophy"],
    ["Districts requiring intervention", bottomEducationWatch.interventionDistricts, "Siren"],
    ["Top-performing institutions", bottomEducationWatch.topInstitutions, "School"],
    ["Critical gaps", bottomEducationWatch.criticalInstitutions, "TriangleAlert"],
    ["Upcoming calendar", bottomEducationWatch.calendar, "CalendarClock"],
  ];
  return <SectionCard title="Bottom Watchlist" subtitle="districts, institutions, examinations, admissions, renewals and deadlines" icon="ListChecks" expandable><div className="grid gap-3 lg:grid-cols-5">{groups.map(([title, items, icon]: any) => <div key={title} className="rounded-2xl border border-slate-100 p-4"><div className="mb-2 flex items-center gap-2 font-extrabold"><Icon name={icon} size={16} /> {title}</div><div className="space-y-1.5">{items.map((x: string) => <div key={x} className="rounded-lg bg-slate-50 px-2 py-1.5 text-[11.5px] font-semibold text-slate-600">{x}</div>)}</div></div>)}</div></SectionCard>;
}

function stageIcon(stage: string) {
  if (stage.includes("Medical")) return "Stethoscope";
  if (stage.includes("Engineering") || stage.includes("Polytechnic") || stage.includes("ITI")) return "Cpu";
  if (stage.includes("Skill")) return "Wrench";
  if (stage.includes("Employment")) return "BriefcaseBusiness";
  if (stage.includes("Universities")) return "University";
  return "School";
}

function supportIcon(label: string) {
  if (label.includes("Scholarship") || label.includes("Amount")) return "BadgeIndianRupee";
  if (label.includes("meal")) return "Utensils";
  if (label.includes("Transport")) return "Bus";
  if (label.includes("Hostel")) return "BedDouble";
  if (label.includes("Digital")) return "Laptop";
  if (label.includes("risk")) return "TriangleAlert";
  return "HandHeart";
}
