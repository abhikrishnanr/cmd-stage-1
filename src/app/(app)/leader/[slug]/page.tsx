"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Icon, SectionCard, RagBadge } from "@/components/primitives";
import { LeaderHero } from "@/components/LeaderHero";
import { Bars, Donut, StackedBars, TrendLine } from "@/components/charts";
import KeralaMap from "@/components/KeralaMap";
import { ChiefMinisterOverview } from "@/components/ChiefMinisterOverview";
import { useUI } from "@/store/ui";
import { leaderBySlug } from "@/data/leaders";
import { guarantees, indiraSummary } from "@/data/guarantees";
import { cmPriorityQueue, keyAlerts, socialIssues, dreamProjects, sectorPerformance } from "@/data/misc";
import { districts, slugify } from "@/data/districts";
import { hospitalCapacity, healthAlerts, districtHealthRisk } from "@/data/health";
import { deptFiles, fileSummary, districtFiles } from "@/data/files";
import { deptComplaints, districtGrievances } from "@/data/grievances";
import { sourceSystems } from "@/data/modules";
import { messages } from "@/data/inbox";
import { tickets } from "@/data/misc";
import { industriesAgencies, industriesBottlenecks, industriesPmsSummary } from "@/data/industriesPms";
import { eitAgencies, eitBottlenecks, eitSummary } from "@/data/eit";
import { landBankRows, landBankSummary } from "@/data/landBank";
import { diseaseTrends, specialistVacancy } from "@/data/health";
import { calamityCards, warningTimeline } from "@/data/calamity";
import { stages as samudraStages } from "@/data/dreamSamudra";
import { agencyPerformance, aiEitInsights, bottomExecutive, cmDecisionQueue, eitAlerts, eitKpis, kfonBaseline, parkPhases, startupBaseline, strategicProjects } from "@/data/eitCommand";
import { RAG_HEX } from "@/lib/ui";

export default function LeaderDashboardPage() {
  const params = useParams();
  const slug = String(params.slug);
  const leader = leaderBySlug(slug);
  const { openDrawer, openTicket } = useUI();
  if (!leader) return notFound();
  if (slug === "vd-satheeshan") return <ChiefMinisterOverview />;

  const govValues = Object.fromEntries(districts.map((d) => [d.name, d.governance]));

  const S: Record<string, any> = {
    indira: (
      <SectionCard key="indira" title="Indira Guarantees" subtitle={`${indiraSummary.score}% overall · ${indiraSummary.commitment}`} icon="ShieldCheck"
        right={<Link href="/indira" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Open →</Link>}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {guarantees.map((g) => (
            <Link key={g.id} href={`/indira/${g.slug}`} className="flex items-center gap-2 rounded-lg border border-slate-100 p-2 hover:bg-slate-50">
              <span className="h-2 w-2 rounded-full" style={{ background: RAG_HEX[g.rag] }} />
              <span className="flex-1 truncate text-[11px] font-semibold">{g.short}</span>
              <span className="text-[11px] font-bold" style={{ color: g.theme }}>{g.score}%</span>
            </Link>
          ))}
        </div>
      </SectionCard>
    ),
    priority: (
      <SectionCard key="priority" title="CM Attention queue" subtitle="urgent items" icon="ListChecks">
        <div className="space-y-2">
          {cmPriorityQueue.map((q, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 p-2.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[11px] font-black text-white" style={{ background: RAG_HEX[q.severity] }}>{i + 1}</span>
              <div className="min-w-0 flex-1"><div className="truncate text-[12.5px] font-semibold">{q.title}</div><div className="text-[11px] text-slate-400">{q.owner} · {q.due}</div></div>
              <button onClick={() => openTicket({ itemType: "Priority Item", itemName: q.title, rag: q.severity, secretary: q.owner })} className="shrink-0 rounded-lg bg-[color:var(--color-ribbon)] px-2.5 py-1.5 text-[11px] font-bold text-white hover:opacity-90">Review</button>
            </div>
          ))}
        </div>
      </SectionCard>
    ),
    districtMap: (
      <SectionCard key="districtMap" title="District Performance" subtitle="governance score" icon="Map" expandable>
        <KeralaMap values={govValues} height={300} unit="score" onSelect={(d) => { const dd = districts.find((x) => x.name === d)!; openDrawer({ title: `${d} District`, rag: dd.rag, source: "Composite index", updated: "12 min ago", confidence: 90, achieved: `${dd.governance}/100`, fullPage: `/districts/${slugify(d)}`, action: `Collector ${dd.collector}.` }); }} />
      </SectionCard>
    ),
    alerts: (
      <SectionCard key="alerts" title="Key Alerts & Escalations" icon="AlertTriangle">
        <div className="space-y-2">{keyAlerts.map((a, i) => <div key={i} className="flex items-start gap-2.5 rounded-xl border border-slate-100 p-2.5"><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: RAG_HEX[a.rag] }} /><div className="min-w-0 flex-1"><div className="text-[12.5px] font-medium leading-snug">{a.text}</div><div className="text-[11px] text-slate-400">{a.owner} · {a.time}</div></div></div>)}</div>
      </SectionCard>
    ),
    dreamProjects: (
      <SectionCard key="dreamProjects" title="Dream Projects" subtitle="flagship growth engines" icon="Rocket" right={<Link href="/dream-projects" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Open →</Link>}>
        <div className="grid gap-2 sm:grid-cols-2">
          {dreamProjects.map((p) => (
            <Link key={p.id} href={`/dream-projects/${p.slug}`} className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-2.5 hover:bg-slate-50">
              <img src={p.img} alt="" className="h-10 w-14 rounded object-cover" />
              <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-bold">{p.name}</div><div className="text-[10.5px] text-slate-400">{p.budget}{p.priority ? " · Priority" : ` · ${p.progress}%`}</div></div>
              <RagBadge rag={p.risk} />
            </Link>
          ))}
        </div>
      </SectionCard>
    ),
    industryDreamProjects: (
      <SectionCard key="industryDreamProjects" title="Industry-linked Project Portfolio" subtitle="projects mapped to Industries / IT-related delivery" icon="Rocket" right={<Link href="/dream-projects" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Projects -&gt;</Link>}>
        <div className="grid gap-2 sm:grid-cols-2">
          {dreamProjects.filter((p) => /Industries|KSIDC|Transport|Fisheries/.test(p.dept) && p.slug !== "mission-samudra").map((p) => (
            <Link key={p.id} href={`/dream-projects/${p.slug}`} className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-2.5 hover:bg-slate-50">
              <img src={p.img} alt="" className="h-10 w-14 rounded object-cover" />
              <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-bold">{p.name}</div><div className="text-[10.5px] text-slate-400">{p.dept} - {p.progress}%</div></div>
              <RagBadge rag={p.risk} />
            </Link>
          ))}
        </div>
      </SectionCard>
    ),
    industriesPortfolio: (
      <SectionCard key="industriesPortfolio" title="Industries PMS Portfolio" subtitle={`${industriesPmsSummary.portalProjects} projects, ${industriesPmsSummary.agencies} agencies`} icon="Factory" right={<Link href="/industries-pms" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Open -&gt;</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MiniMetric label="Physical" value={`${industriesPmsSummary.avgPhysical}%`} rag="amber" />
          <MiniMetric label="Financial" value={`${industriesPmsSummary.avgFinancial}%`} rag="amber" />
          <MiniMetric label="Delayed" value={`${industriesPmsSummary.delayedItems}`} rag="red" />
          <MiniMetric label="Critical" value={`${industriesPmsSummary.criticalItems}`} rag="red" />
        </div>
        <div className="mt-3">
          <Bars data={industriesAgencies.slice(0, 7).map((a) => ({ label: a.name, value: a.portalProjects }))} color="#2563eb" height={220} />
        </div>
      </SectionCard>
    ),
    eitPortfolio: (
      <SectionCard key="eitPortfolio" title="E & IT Delivery Portfolio" subtitle={`${eitSummary.portalProjects} projects, ${eitSummary.agencies} agencies`} icon="Cpu" right={<Link href="/e-it" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Open -&gt;</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MiniMetric label="Physical" value={`${eitSummary.avgPhysical}%`} rag="green" />
          <MiniMetric label="Financial" value={`${eitSummary.avgFinancial}%`} rag="amber" />
          <MiniMetric label="Delayed" value={`${eitSummary.delayedItems}`} rag="amber" />
          <MiniMetric label="Critical" value={`${eitSummary.criticalItems}`} rag="amber" />
        </div>
        <div className="mt-3">
          <Bars data={eitAgencies.slice(0, 7).map((a) => ({ label: a.name, value: a.portalProjects }))} color="#0f766e" height={220} />
        </div>
      </SectionCard>
    ),
    eitExecutive: (
      <SectionCard key="eitExecutive" title="Electronics, IT & Digital Transformation" subtitle="recent command-centre summary from E & IT page" icon="Cpu" right={<Link href="/e-it" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Command Centre -&gt;</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            ["IT Exports", "₹26,770 Cr", "green" as const],
            ["Direct Jobs", "1.56 L", "green" as const],
            ["Built-up Space", "23.2M sq ft", "green" as const],
            ["Occupancy", "86.6%", "amber" as const],
            ["Startups", startupBaseline.startups2025.toLocaleString("en-IN"), "green" as const],
            ["GCC Pipeline", "42", "blue" as const],
            ["Delayed Projects", "11", "amber" as const],
            ["CM Intervention", "6", "red" as const],
          ].map(([label, value, rag]) => <MiniMetric key={label} label={label} value={value} rag={rag as "red" | "amber" | "green" | "blue"} />)}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">Key KPI confidence</div>
            <div className="space-y-2">
              {eitKpis.slice(0, 6).map((k) => (
                <div key={k.label} className="flex items-center gap-3">
                  <span className="w-36 shrink-0 truncate text-[11.5px] font-semibold text-slate-600">{k.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${k.confidence}%`, background: RAG_HEX[k.rag] }} /></div>
                  <span className="w-9 text-right text-[11px] font-bold" style={{ color: RAG_HEX[k.rag] }}>{k.confidence}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-blue-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-[12px] font-extrabold text-blue-800"><Icon name="ShieldCheck" size={15} /> Data governance</div>
            <p className="text-[11.5px] leading-relaxed text-blue-700">Government-park totals are kept separate from total state IT estimates. Employment committed, realised, direct and indirect figures are not merged.</p>
          </div>
        </div>
      </SectionCard>
    ),
    eitParksLeader: (
      <SectionCard key="eitParksLeader" title="Technology Parks Performance" subtitle="exports, employment, space and occupancy by major park" icon="Building2" right={<Link href="/e-it" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Parks -&gt;</Link>} expandable>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Bars data={parkPhases.slice(0, 8).map((p) => ({ label: String(p.park).replace("Technopark ", "TP ").replace("Infopark ", "IP ").slice(0, 12), value: Number(p.exports) }))} color="#2563eb" height={240} />
          <div className="space-y-2">
            {parkPhases.slice(0, 6).map((p) => (
              <div key={p.park} className="rounded-xl border border-slate-100 p-2.5">
                <div className="flex items-start justify-between gap-2"><div className="truncate text-[12.5px] font-extrabold">{p.park}</div><RagBadge rag={p.rag} /></div>
                <div className="mt-1 grid grid-cols-3 gap-2 text-[10.5px] text-slate-500">
                  <span>{Number(p.employment).toLocaleString("en-IN")} jobs</span>
                  <span>₹{p.exports} Cr exports</span>
                  <span>{p.occupancy}% occ.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    ),
    eitProjectsLeader: (
      <SectionCard key="eitProjectsLeader" title="Strategic E & IT Projects" subtitle="QUAD, Digital Science Park, Cyberpark, KFON and investment-linked delivery" icon="GanttChartSquare" right={<Link href="/e-it" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Projects -&gt;</Link>} expandable>
        <div className="space-y-2.5">
          {strategicProjects.slice(0, 6).map((p) => (
            <div key={p.title} className="rounded-xl border border-slate-100 p-3">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="min-w-0"><div className="truncate text-[13px] font-extrabold">{p.title}</div><div className="text-[10.5px] text-slate-400">{p.agency} - {p.district}</div></div>
                <RagBadge rag={p.rag} label={p.status} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10.5px] text-slate-500">
                <span>{p.cost}</span>
                <span>{p.jobsCommitted.toLocaleString("en-IN")} jobs</span>
                <span>{p.physical}% physical</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${p.physical}%`, background: RAG_HEX[p.rag] }} /></div>
            </div>
          ))}
        </div>
      </SectionCard>
    ),
    eitStartupKfon: (
      <SectionCard key="eitStartupKfon" title="Startup, Innovation & KFON" subtitle="KSUM baseline, IEDCs and digital connectivity delivery" icon="Rocket" right={<Link href="/e-it" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Digital Infra -&gt;</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MiniMetric label="Tech startups" value={startupBaseline.startups2025.toLocaleString("en-IN")} rag="green" />
          <MiniMetric label="IEDCs" value={`${startupBaseline.iedcs}`} rag="green" />
          <MiniMetric label="Startup jobs" value={startupBaseline.employment.toLocaleString("en-IN")} rag="blue" />
          <MiniMetric label="Funding" value={startupBaseline.funding} rag="green" />
          <MiniMetric label="KFON active" value={kfonBaseline.active.toLocaleString("en-IN")} rag="green" />
          <MiniMetric label="BPL connected" value={kfonBaseline.bpl.toLocaleString("en-IN")} rag="amber" />
          <MiniMetric label="Govt offices" value={kfonBaseline.govt.toLocaleString("en-IN")} rag="amber" />
          <MiniMetric label="Uptime" value={kfonBaseline.uptime} rag="green" />
        </div>
      </SectionCard>
    ),
    eitBudgetLeader: (
      <SectionCard key="eitBudgetLeader" title="Budget & Agency Performance" subtitle="low utilisation and agency delivery risks" icon="PieChart" right={<Link href="/e-it" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Budget -&gt;</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MiniMetric label="FY24-25 allocation" value="₹507.14 Cr" rag="blue" />
          <MiniMetric label="Expenditure" value="₹206.09 Cr" rag="amber" />
          <MiniMetric label="Utilisation" value="40.64%" rag="red" />
          <MiniMetric label="FY25-26 outlay" value="₹517.64 Cr" rag="blue" />
        </div>
        <div className="mt-3">
          <Bars data={agencyPerformance.map((a) => ({ label: String(a.agency).replace("Kerala ", "").slice(0, 12), value: Number(a.utilisation) }))} color="#e11d48" height={220} />
        </div>
      </SectionCard>
    ),
    eitDecisionLeader: (
      <SectionCard key="eitDecisionLeader" title="CM / CS Decision Queue" subtitle="issues Kunhalikutty must escalate or close" icon="Crown" expandable>
        <div className="space-y-2.5">
          {cmDecisionQueue.map((d, i) => (
            <div key={d.programme} className="rounded-xl border border-slate-100 p-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="font-extrabold text-[color:var(--color-ink)]">{d.programme}</div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${d.time === "Critical" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>{d.time}</span>
              </div>
              <div className="text-[12px] leading-relaxed text-slate-600">{d.decision}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[10.5px] text-slate-500">
                <span>{d.finance}</span>
                <span>{d.employment}</span>
              </div>
              <button onClick={() => openTicket({ itemType: "E & IT CM Decision", itemName: d.programme, rag: d.time === "Critical" ? "red" : "amber", secretary: "Industries & IT Minister" })} className="mt-2 rounded-lg bg-[color:var(--color-ribbon)] px-3 py-1.5 text-[11px] font-bold text-white">Create decision ticket</button>
            </div>
          ))}
          <div className="rounded-xl bg-slate-950 p-3 text-white">
            <div className="mb-2 text-[12px] font-black">High-confidence AI findings</div>
            <div className="space-y-1.5">{aiEitInsights.slice(0, 3).map((i) => <div key={i.finding} className="text-[11.5px] text-white/75">- {i.finding}</div>)}</div>
          </div>
          <div className="rounded-xl bg-rose-50 p-3">
            <div className="mb-2 text-[12px] font-black text-rose-700">Active E & IT Alerts</div>
            <div className="space-y-1.5">{eitAlerts.slice(0, 4).map((a) => <div key={a.item} className="flex items-center gap-2 text-[11.5px] text-rose-700"><span className="h-2 w-2 rounded-full" style={{ background: RAG_HEX[a.rag] }} />{a.item} - {a.deadline}</div>)}</div>
          </div>
        </div>
      </SectionCard>
    ),
    landBankSnapshot: (
      <SectionCard key="landBankSnapshot" title="Strategic Project Land Bank" subtitle="prototype candidate inventory for project planning" icon="MapPinned" right={<Link href="/land-bank" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Land Bank -&gt;</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MiniMetric label="Candidate land" value={`${landBankSummary.totalCandidate.toLocaleString("en-IN")} ac`} rag="green" />
          <MiniMetric label="Official industrial" value={`${landBankSummary.official.toLocaleString("en-IN")} ac`} rag="green" />
          <MiniMetric label="Revenue land" value={`${landBankSummary.revenue.toLocaleString("en-IN")} ac`} rag="amber" />
          <MiniMetric label="Largest" value="Palakkad" rag="blue" />
        </div>
        <div className="mt-3">
          <Bars data={[...landBankRows].sort((a, b) => b.total - a.total).slice(0, 8).map((r) => ({ label: r.district, value: r.total }))} horizontal color="#16a34a" height={250} />
        </div>
      </SectionCard>
    ),
    industryBottlenecks: (
      <SectionCard key="industryBottlenecks" title="Portfolio Bottlenecks" subtitle="Industries + E & IT intervention queue" icon="Siren">
        <div className="grid gap-2 sm:grid-cols-2">
          {[...industriesBottlenecks, ...eitBottlenecks].slice(0, 8).map((b) => (
            <div key={`${b.agency}-${b.label}`} className="rounded-xl border border-slate-100 p-2.5">
              <div className="flex items-start justify-between gap-2"><div className="text-[12px] font-bold text-slate-700">{b.label}</div><RagBadge rag={b.rag} /></div>
              <div className="mt-1 text-[10.5px] text-slate-400">{b.agency} - {b.count} items</div>
            </div>
          ))}
        </div>
      </SectionCard>
    ),
    samudra: (
      <Link key="samudra" href="/dream-projects/mission-samudra" className="card card-hover relative block overflow-hidden">
        <img src="/img/projects/mission-samudra.png" alt="" className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20" />
        <div className="relative p-4">
          <div className="mb-1 flex items-center gap-2"><span className="rounded-full bg-[color:var(--color-ribbon)] px-2 py-0.5 text-[10px] font-black uppercase text-white">Priority Mission</span></div>
          <div className="display text-lg font-extrabold text-[color:var(--color-navy)]">Mission Samudra</div>
          <div className="text-[11px] text-slate-400">₹72,115 Cr · 33 activities · 70% private · maritime roadmap 2026–2035</div>
          <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-[color:var(--color-navy)]">Open monitoring page <Icon name="ArrowRight" size={13} /></div>
        </div>
      </Link>
    ),
    sector: (
      <SectionCard key="sector" title="Sector Performance" icon="BarChart3" expandable><Bars data={sectorPerformance} color="var(--color-c-blue)" height={240} /></SectionCard>
    ),
    health: (
      <SectionCard key="health" title="Hospital Capacity" subtitle="live load" icon="Hospital" right={<Link href="/health" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Radar →</Link>}>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">{hospitalCapacity.map((h) => { const pct = Math.round((h.used / h.total) * 100); return <div key={h.label} className="card p-2.5 text-center"><div className="text-[16px] font-black" style={{ color: pct > 85 ? RAG_HEX.red : pct > 70 ? RAG_HEX.amber : RAG_HEX.green }}>{pct}%</div><div className="text-[10.5px] text-slate-500">{h.label}</div></div>; })}</div>
      </SectionCard>
    ),
    diseaseAlerts: (
      <SectionCard key="diseaseAlerts" title="Disease Alerts" subtitle="assign to Health Secretary" icon="Siren">
        <div className="space-y-2">{healthAlerts.map((a, i) => <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 p-2.5"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: RAG_HEX[a.rag] }} /><div className="min-w-0 flex-1"><div className="text-[12.5px] font-medium">{a.text}</div><div className="text-[11px] text-slate-400">{a.district}</div></div><button onClick={() => openTicket({ itemType: "Health Alert", itemName: a.text.slice(0, 40), rag: a.rag, secretary: "Health Secretary" })} className="shrink-0 rounded-lg bg-[color:var(--color-ribbon)] px-2.5 py-1.5 text-[11px] font-bold text-white">Assign</button></div>)}</div>
      </SectionCard>
    ),
    insurance: (
      <Link key="insurance" href="/indira/family-health-insurance" className="card card-hover block p-4">
        <div className="flex items-center justify-between"><div className="display text-base font-extrabold text-[color:var(--color-navy)]">₹25 Lakh Family Health Insurance</div><RagBadge rag="green" /></div>
        <div className="text-[11px] text-slate-400">92.4 lakh families · ₹8,740 Cr treatment · 97.6% cashless · 1,286 hospitals</div>
        <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-[color:var(--color-navy)]">Open guarantee dashboard <Icon name="ArrowRight" size={13} /></div>
      </Link>
    ),
    districtHealthMap: (
      <SectionCard key="districtHealthMap" title="District Health Risk" subtitle="composite risk" icon="Map" expandable>
        <KeralaMap values={districtHealthRisk} height={300} unit="risk" onSelect={(d) => openDrawer({ title: `${d} · Health Risk`, rag: districtHealthRisk[d] >= 75 ? "red" : districtHealthRisk[d] >= 55 ? "amber" : "green", source: "SDHM / IDSP", updated: "15 min ago", confidence: 91, achieved: `risk ${districtHealthRisk[d]}/100`, action: "Deploy rapid response in hotspots." })} />
      </SectionCard>
    ),
    files: (
      <SectionCard key="files" title="File Pendency" subtitle={`${fileSummary.total} delayed · >90d ${fileSummary.over90}`} icon="FileStack" right={<Link href="/files" className="text-[11px] font-semibold text-[color:var(--color-navy)]">X-Ray →</Link>}>
        <Bars data={deptFiles.map((d) => ({ label: d.dept, value: d.delayed }))} color="var(--color-c-violet)" height={220} />
      </SectionCard>
    ),
    grievances: (
      <SectionCard key="grievances" title="Grievances by District" subtitle="volume" icon="MessageSquareWarning" expandable right={<Link href="/grievances" className="text-[11px] font-semibold text-[color:var(--color-navy)]">SLA →</Link>}>
        <KeralaMap values={districtGrievances} height={300} unit="complaints" onSelect={(d) => openDrawer({ title: `${d} · Grievances`, rag: districtGrievances[d] > 15000 ? "red" : districtGrievances[d] > 9000 ? "amber" : "green", source: "CMO / Nammude Keralam", updated: "13 min ago", confidence: 88, achieved: `${districtGrievances[d].toLocaleString()} complaints`, action: "Clear >15 day backlog." })} />
      </SectionCard>
    ),
    systems: (
      <SectionCard key="systems" title="Systems Health" subtitle="source feeds" icon="Server" right={<Link href="/systems" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Open →</Link>}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{sourceSystems.slice(0, 12).map((s) => { const tone = s.status === "live" ? RAG_HEX.green : s.status === "delayed" ? RAG_HEX.amber : RAG_HEX.red; return <div key={s.name} className="rounded-lg border border-slate-100 p-2"><div className="flex items-center justify-between"><span className="truncate text-[11px] font-bold">{s.name}</span><span className="h-2 w-2 rounded-full" style={{ background: tone }} /></div><div className="text-[10px] text-slate-400">{s.lastSync} · {s.confidence}%</div></div>; })}</div>
      </SectionCard>
    ),
    inbox: (
      <SectionCard key="inbox" title="Inbox" subtitle="messages from CM & secretaries" icon="Inbox" right={<Link href="/inbox" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Open →</Link>}>
        <div className="space-y-2">{messages.slice(0, 5).map((m) => <Link key={m.id} href="/inbox" className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-2.5 hover:bg-slate-50">{m.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-rag-blue)]" />}<div className="min-w-0 flex-1"><div className="truncate text-[12.5px] font-semibold">{m.subject}</div><div className="text-[11px] text-slate-400">{m.from} · {m.time}</div></div><span className="rounded px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: m.priority === "Critical" ? RAG_HEX.red : m.priority === "High" ? RAG_HEX.amber : RAG_HEX.blue }}>{m.priority}</span></Link>)}</div>
      </SectionCard>
    ),
    tickets: (
      <SectionCard key="tickets" title="Tickets" subtitle="overdue & open" icon="TicketCheck" right={<Link href="/tickets" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Board →</Link>}>
        <div className="space-y-2">{tickets.filter((t) => t.status !== "Closed").slice(0, 5).map((t) => <Link key={t.id} href={`/tickets/${t.id.toLowerCase()}`} className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-2.5 hover:bg-slate-50"><span className="text-[10px] font-black text-slate-400">{t.id}</span><div className="min-w-0 flex-1"><div className="truncate text-[12.5px] font-semibold">{t.title}</div><div className="text-[11px] text-slate-400">{t.assignee} · due {t.due}</div></div><span className="text-[11px] font-bold" style={{ color: t.status === "Overdue" ? RAG_HEX.red : RAG_HEX.amber }}>{t.status}</span></Link>)}</div>
      </SectionCard>
    ),
    social: (
      <SectionCard key="social" title="Social Burning Issues" icon="Megaphone" right={<Link href="/social" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Monitor →</Link>}>
        <div className="space-y-2">{socialIssues.slice(0, 5).map((s) => <div key={s.issue} className="flex items-center gap-3 rounded-xl border border-slate-100 p-2.5"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[11px] font-black ${s.sentiment < 0 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>{s.sentiment > 0 ? "+" : ""}{s.sentiment}</span><div className="min-w-0 flex-1"><div className="truncate text-[12.5px] font-semibold">{s.issue}</div><div className="text-[11px] text-slate-400">{(s.mentions / 1000).toFixed(1)}k · {s.dept}</div></div></div>)}</div>
      </SectionCard>
    ),
    samudraRich: (
      <SectionCard key="samudraRich" title="Mission Samudra" subtitle="Ports & Coastal Shipping · maritime roadmap 2026-2035" icon="Anchor" right={<Link href="/dream-projects/mission-samudra" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Monitor →</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MiniMetric label="Total" value="₹72,115 Cr" rag="blue" />
          <MiniMetric label="Private" value="70%" rag="green" />
          <MiniMetric label="Activities" value="33" rag="amber" />
          <MiniMetric label="Vizhinjam" value="10M+ TEUs" rag="blue" />
        </div>
        <div className="mt-3"><Bars data={samudraStages.map((st) => ({ label: st.stage, value: st.total }))} color="#1aa6c9" height={210} /></div>
        <p className="mt-1 text-center text-[10.5px] text-slate-400">Stage investment (₹ Cr) · planning framework</p>
      </SectionCard>
    ),
    calamity: (
      <SectionCard key="calamity" title="Disaster Management & Climate" subtitle="Disaster Management portfolio · live risk" icon="CloudRainWind" right={<Link href="/calamity" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Command →</Link>} expandable>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {calamityCards.slice(0, 4).map((c) => (
            <div key={c.label} className="card p-2.5"><div className="text-[14px] font-black" style={{ color: RAG_HEX[c.rag] }}>{c.value}</div><div className="text-[10px] font-semibold text-slate-600">{c.label}</div><div className="text-[9px] text-slate-400">{c.sub}</div></div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5">{warningTimeline.slice(0, 3).map((w, i) => <div key={i} className="flex items-start gap-2 text-[11.5px]"><span className="font-bold text-slate-400">{w.time}</span><span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: RAG_HEX[w.rag] }} /><span className="text-slate-600">{w.text}</span></div>)}</div>
      </SectionCard>
    ),
    immediateAttention: (
      <div key="immediateAttention" className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-white p-4 xl:col-span-2">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-500 text-white"><Icon name="Siren" size={18} /></span>
          <div><div className="display text-[15px] font-extrabold text-rose-700">Needs Immediate Attention</div><div className="text-[11px] text-rose-400">disease outbreaks, stock-outs & specialist gaps</div></div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { t: "Dengue outbreak threshold breached - Palakkad (+34% WoW)", rag: "red" as const, icon: "Activity", who: "Health Secretary" },
            { t: "Anti-snake venom stock < 2 weeks in 3 districts", rag: "red" as const, icon: "Pill", who: "Drugs Control" },
            { t: "Medicine stock at 18% - replenish essential drugs", rag: "red" as const, icon: "Pill", who: "DHS" },
            { t: "ICU occupancy 91% at Kozhikode MCH - divert electives", rag: "amber" as const, icon: "BedDouble", who: "Medical Education" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl border border-rose-100 bg-white p-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: `${RAG_HEX[m.rag]}1a`, color: RAG_HEX[m.rag] }}><Icon name={m.icon} size={16} /></span>
              <div className="min-w-0 flex-1 text-[12px] font-semibold text-slate-700">{m.t}</div>
              <button onClick={() => openTicket({ itemType: "Health Critical", itemName: m.t, rag: m.rag, secretary: "Health Secretary" })} className="shrink-0 rounded-lg bg-[color:var(--color-ribbon)] px-2.5 py-1.5 text-[11px] font-bold text-white">Assign</button>
            </div>
          ))}
        </div>
      </div>
    ),
    surveillance: (
      <SectionCard key="surveillance" title="Disease Surveillance" subtitle="confirmed cases · 8-month trend" icon="Activity" right={<Link href="/health" className="text-[11px] font-semibold text-[color:var(--color-navy)]">Radar →</Link>} expandable>
        <div className="grid gap-3 sm:grid-cols-3">
          {diseaseTrends.map((d) => { const cur = d.data[d.data.length - 1].value; const peak = Math.max(...d.data.map((x) => x.value)); return (
            <div key={d.name} className="rounded-xl border border-slate-100 p-3">
              <div className="mb-1 flex items-center justify-between"><span className="text-[13px] font-bold">{d.name}</span><RagBadge rag={d.rag} /></div>
              <div className="mb-1 flex items-end justify-between text-[10px] text-slate-400"><span>peak {peak}</span><span className="font-bold" style={{ color: d.color }}>now {cur}</span></div>
              <TrendLine data={d.data} color={d.color} height={120} />
            </div>
          ); })}
        </div>
      </SectionCard>
    ),
    shortfalls: (
      <SectionCard key="shortfalls" title="Capacity Shortfalls" subtitle="ICU · oxygen · medicine · specialist gaps" icon="TriangleAlert" expandable>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">Hospital capacity</div>
            <div className="space-y-2">{hospitalCapacity.map((h) => { const pct = Math.round((h.used / h.total) * 100); const low = h.label.includes("Medicine"); const c = low ? (pct < 25 ? RAG_HEX.red : RAG_HEX.amber) : pct > 85 ? RAG_HEX.red : pct > 70 ? RAG_HEX.amber : RAG_HEX.green; return (
              <div key={h.label} className="flex items-center gap-3"><span className="w-28 shrink-0 text-[12px] font-semibold text-slate-600">{h.label}</span><div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} /></div><span className="w-10 text-right text-[12px] font-bold" style={{ color: c }}>{pct}%</span></div>
            ); })}</div>
          </div>
          <div>
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">Specialist vacancy</div>
            <table className="w-full text-left text-[12px]"><thead><tr className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400"><th className="py-1">Specialty</th><th className="text-right">Sanctioned</th><th className="text-right">Vacant</th><th></th></tr></thead>
              <tbody>{specialistVacancy.map((v) => <tr key={v.dept} className="border-b border-slate-50"><td className="py-1.5 font-semibold">{v.dept}</td><td className="py-1.5 text-right">{v.sanctioned}</td><td className="py-1.5 text-right font-bold text-rose-600">{v.vacant}</td><td className="py-1.5 text-right"><RagBadge rag={v.rag} /></td></tr>)}</tbody></table>
          </div>
        </div>
      </SectionCard>
    ),
    healthPortfolio: (
      <SectionCard key="healthPortfolio" title="Portfolio Departments" subtitle="Health · Medical Education · AYUSH · Drugs Control · Food Safety · Devaswom" icon="LayoutGrid">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {[
            { label: "Govt Hospitals", value: "406", icon: "Hospital", rag: "green" as const },
            { label: "Medical Education", value: "Colleges", icon: "GraduationCap", rag: "blue" as const },
            { label: "AYUSH", value: "Monitored", icon: "Leaf", rag: "green" as const },
            { label: "Drugs Control", value: "Active", icon: "ShieldCheck", rag: "amber" as const },
            { label: "Food Safety", value: "Inspections", icon: "Utensils", rag: "amber" as const },
            { label: "Devaswom Boards", value: "Monitored", icon: "Landmark", rag: "blue" as const },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: `${RAG_HEX[d.rag]}1a`, color: RAG_HEX[d.rag] }}><Icon name={d.icon} size={17} /></span>
              <div className="min-w-0"><div className="text-[12.5px] font-bold leading-tight">{d.label}</div><div className="text-[10.5px] text-slate-400">{d.value}</div></div>
            </div>
          ))}
        </div>
      </SectionCard>
    ),
  };

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <LeaderHero leader={leader} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {leader.sections.map((k) => S[k]).filter(Boolean)}
      </div>
    </div>
  );
}

function MiniMetric({ label, value, rag }: { label: string; value: string; rag: "red" | "amber" | "green" | "blue" }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center">
      <div className="text-[15px] font-black" style={{ color: RAG_HEX[rag] }}>{value}</div>
      <div className="mt-0.5 text-[10.5px] font-semibold text-slate-500">{label}</div>
    </div>
  );
}
