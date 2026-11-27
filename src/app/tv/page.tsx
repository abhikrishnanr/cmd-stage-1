"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/primitives";
import { LiveClock } from "@/components/AppShell";
import { Sparkline, TrendLine } from "@/components/charts";
import KeralaMap from "@/components/KeralaMap";
import { districts, sectorsList } from "@/data/districts";
import { guarantees, indiraSummary } from "@/data/guarantees";
import { cmPriorityQueue, delayedProjects } from "@/data/misc";
import { RAG_HEX } from "@/lib/ui";
import { archiveAlerts, archiveFiscalPulse, archiveTicker } from "./archiveData";

const PANELS = [
  "Command Overview",
  "Executive KPI Strip",
  "Sector Performance",
  "Delayed Projects",
  "Social Media Issues",
  "District Performance",
  "Alerts & Escalations",
  "Executive Brief",
  "RAG Heat Grid by Sector",
  "Indira Guarantees",
  "Fiscal & Delivery",
];

const KPI_CARDS = [
  { label: "Overall Governance", value: "78.6", sub: "/100", delta: "+4.2 vs last month", icon: "UsersRound", color: "#21c7e6", series: [24, 30, 27, 36, 32, 44, 41, 55, 48, 62] },
  { label: "Budget Utilisation", value: "87.3%", sub: "", delta: "+6.1% vs last month", icon: "IndianRupee", color: "#a78bfa", series: [30, 28, 38, 32, 44, 40, 52, 47, 62, 55] },
  { label: "Schemes Beneficiaries", value: "7.24 Cr", sub: "", delta: "+8.7% vs last month", icon: "Users", color: "#22c55e", series: [35, 39, 36, 46, 38, 44, 57, 51, 72, 64] },
  { label: "Grievances Redressed", value: "1,24,851", sub: "", delta: "+12.5% vs last month", icon: "Headphones", color: "#06b6d4", series: [42, 55, 44, 58, 47, 68, 60, 73, 66, 82] },
  { label: "Delayed Projects", value: "186", sub: "", delta: "+32 this month", icon: "HardHat", color: "#f59e0b", series: [30, 48, 37, 42, 34, 49, 41, 46, 39, 52] },
  { label: "Critical Alerts", value: "23", sub: "", delta: "Needs immediate attention", icon: "TriangleAlert", color: "#ef4444", series: [32, 45, 38, 36, 42, 51, 46, 55, 43, 61] },
];

const MOCK_DELAYED = [
  { project: "Kollam Bypass NH-66", dept: "PWD / NHAI", delay: "214 Days", status: 58, icon: "Construction" },
  { project: "Wayanad Medical College", dept: "Health Department", delay: "182 Days", status: 64, icon: "Hospital" },
  { project: "Kochi Water Metro Phase-2", dept: "Water Transport Dept.", delay: "156 Days", status: 40, icon: "ShipWheel" },
  { project: "Malabar Elevated Corridor", dept: "PWD", delay: "143 Days", status: 72, icon: "Landmark" },
  { project: "Kuttanad Package-2", dept: "Irrigation Department", delay: "122 Days", status: 68, icon: "Droplets" },
  { project: "Vizhinjam Connectivity Rd", dept: "PWD", delay: "118 Days", status: 60, icon: "Route" },
];

const MOCK_SOCIAL = [
  { issue: "Potholes & Road Condition", mentions: "12.4K", sentiment: -78, color: "#ef4444" },
  { issue: "Hospital Waiting Time", mentions: "9.8K", sentiment: -62, color: "#ef4444" },
  { issue: "Flood Relief Delay (Wayanad)", mentions: "7.6K", sentiment: -71, color: "#ef4444" },
  { issue: "Waste Management", mentions: "6.2K", sentiment: -48, color: "#f59e0b" },
  { issue: "Water Supply Irregularity", mentions: "4.9K", sentiment: -43, color: "#f59e0b" },
  { issue: "School Infrastructure", mentions: "3.7K", sentiment: -35, color: "#eab308" },
];

const SYSTEMS = ["K-SMART", "KASP", "Planspace", "USDP", "AIMS", "e-Health", "KIIFB PMS", "BIMS/BAMS", "CMDRF", "SDHM", "RCH/HMIS", "+14 More"];

export default function TVWall() {
  const [panel, setPanel] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(11);
  const [fullScreen, setFullScreen] = useState(false);
  const [displayError, setDisplayError] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPanel((p) => (p + 1) % PANELS.length), speed * 1000);
    return () => clearInterval(t);
  }, [playing, speed]);

  useEffect(() => {
    const onFullscreen = () => setFullScreen(document.fullscreenElement === ref.current);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  async function toggleFullScreen() {
    setDisplayError("");
    const wall = ref.current;
    if (!wall) return;
    try {
      if (document.fullscreenElement === wall) await document.exitFullscreen();
      else await wall.requestFullscreen();
    } catch {
      setDisplayError("Full screen is unavailable in this browser.");
    }
  }

  return (
    <main
      ref={ref}
      className="flex h-screen flex-col overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(900px 420px at 16% 0%, rgba(24,199,232,0.24), transparent 65%), radial-gradient(850px 520px at 82% 10%, rgba(224,36,94,0.18), transparent 60%), linear-gradient(180deg,#061024 0%,#08162f 48%,#040916 100%)",
      }}
    >
      <header className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10 text-lg font-black shadow-[0_0_24px_rgba(34,211,238,0.18)]">K</div>
          <div>
            <div className="text-lg font-black leading-none">CM Governance Dashboard</div>
            <div className="text-[11px] text-white/60">Government of Kerala · TV Briefing Wall</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 lg:flex">
            <Icon name="Gauge" size={15} className="text-cyan-200" />
            <span className="text-[12px] font-bold text-white/62">Speed</span>
            <input
              type="range"
              min="4"
              max="20"
              step="1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="h-1.5 w-28 accent-cyan-300"
              aria-label="Slide speed seconds"
            />
            <span className="w-8 text-right text-[12px] font-black text-cyan-200">{speed}s</span>
          </div>
          <span className="rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-[12px] font-semibold text-amber-200" title="Original demonstration figures on every panel">
            Archived demo data
          </span>
          <span className="text-[13px] font-semibold"><LiveClock light /></span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setPlaying((p) => !p)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-cyan-200" aria-label={playing ? "Pause rotation" : "Start rotation"} title={playing ? "Pause rotation" : "Start rotation"}><Icon name={playing ? "Pause" : "Play"} size={16} /></button>
            <button type="button" onClick={toggleFullScreen} className="rounded-lg bg-white/10 p-2 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-cyan-200" aria-label={fullScreen ? "Exit full screen" : "Full screen"} title={fullScreen ? "Exit full screen" : "Full screen"}><Icon name={fullScreen ? "Minimize" : "Maximize"} size={16} /></button>
            <Link href="/dashboard-cm" className="rounded-lg bg-white/10 p-2 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-cyan-200" aria-label="Exit to CM Dashboard" title="Exit to CM Dashboard"><Icon name="X" size={16} /></Link>
          </div>
        </div>
      </header>

      {displayError && <p role="status" className="px-6 text-xs text-amber-200">{displayError}</p>}
      <nav aria-label="TV briefing panels" className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 pb-1 sm:px-6">
        {PANELS.map((p, i) => (
          <button key={p} type="button" aria-label={p} aria-pressed={i === panel} onClick={() => setPanel(i)} className="flex min-h-6 items-center rounded focus-visible:outline-2 focus-visible:outline-cyan-200" title={p}>
            <span className={`h-2 rounded-full transition-all ${i === panel ? "w-9 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.65)]" : "w-2 bg-white/25"}`} />
          </button>
        ))}
        <span className="ml-3 rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold text-white/70">{PANELS[panel]}</span>
      </nav>

      <div className="relative min-h-0 flex-1 overflow-auto px-3 py-2 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={panel}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.45 }}
            className="h-full min-h-[620px] min-w-[1100px]"
          >
            {panel === 0 && <CommandOverview />}
            {panel === 1 && <KpiFocus />}
            {panel === 2 && <SectorFocus />}
            {panel === 3 && <DelayedFocus />}
            {panel === 4 && <SocialFocus />}
            {panel === 5 && <DistrictFocus />}
            {panel === 6 && <AlertsFocus />}
            {panel === 7 && <BriefFocus />}
            {panel === 8 && <RagHeatGridFocus />}
            {panel === 9 && <IndiraPanel />}
            {panel === 10 && <FiscalPanel />}
          </motion.div>
        </AnimatePresence>
      </div>

      <ArchiveRagTicker />
    </main>
  );
}

function ArchiveRagTicker() {
  return (
    <div className="ticker-wrap relative flex h-14 shrink-0 items-center overflow-hidden border-t border-white/10 bg-[color:var(--color-ink)]" aria-label="Archived status ticker">
      <div className="z-10 flex h-full shrink-0 items-center bg-[color:var(--color-ribbon)] px-4 text-[15px] font-extrabold uppercase tracking-wider text-white">
        Archive RAG
      </div>
      <div className="flex animate-ticker whitespace-nowrap motion-reduce:animate-none">
        {[...archiveTicker, ...archiveTicker].map((item, index) => (
          <span key={index} aria-hidden={index >= archiveTicker.length} className="mx-6 inline-flex items-center gap-2 text-base font-semibold text-white/90">
            <span aria-hidden="true" className="inline-block h-[11px] w-[11px] rounded-full" style={{ background: RAG_HEX[item.rag] }} />
            {item.text}
            <span aria-hidden="true" className="ml-6 text-white/20">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SlideFrame({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[12px] font-black uppercase tracking-[0.28em] text-cyan-200/70">CM TV Wall</div>
          <h1 className="display text-4xl font-black leading-none text-white">{title}</h1>
        </div>
        {subtitle && <div className="max-w-xl rounded-full border border-white/10 bg-white/8 px-4 py-2 text-right text-sm font-semibold text-white/65">{subtitle}</div>}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  );
}

function Box({ title, children, className = "", right, compactTitle = false }: { title: string; children: React.ReactNode; className?: string; right?: React.ReactNode; compactTitle?: boolean }) {
  return (
    <div className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.075] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-md ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className={`${compactTitle ? "text-[13px]" : "text-[22px]"} font-black uppercase tracking-wide text-white/82`}>{title}</div>
        {right}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function CommandOverview() {
  return (
    <SlideFrame title="Command Overview" subtitle="Mockup-inspired start slide - full body dashboard without sidebar/header">
      <div className="grid h-full grid-cols-12 grid-rows-[1fr_2.25fr_2.15fr] gap-3">
        <div className="col-span-12 grid grid-cols-6 gap-3">
          {KPI_CARDS.map((kpi) => <MiniKpi key={kpi.label} {...kpi} />)}
        </div>

        <Box title="Sector Performance" className="col-span-4" compactTitle>
          <div className="grid h-full grid-cols-[170px_1fr] items-center gap-4">
            <ScoreDonut value={78.6} />
            <div className="space-y-2">
              {mockSectors().map((s) => <ProgressRow key={s.label} label={s.label} value={s.value} color={s.color} compact />)}
            </div>
          </div>
        </Box>

        <Box title="Delayed Projects (Top 6)" className="col-span-4" compactTitle right={<span className="text-xs font-bold text-cyan-200">View All</span>}>
          <div className="space-y-2">
            {MOCK_DELAYED.map((p) => <DelayRow key={p.project} {...p} compact />)}
          </div>
        </Box>

        <Box title="Top Social Media Burning Issues" className="col-span-4" compactTitle right={<span className="text-xs font-bold text-rose-300">Negative (-52%)</span>}>
          <div className="grid h-full grid-cols-[1fr_150px] gap-3">
            <div className="space-y-2">
              {MOCK_SOCIAL.map((s) => <SocialRow key={s.issue} {...s} compact />)}
            </div>
            <SentimentDonut />
          </div>
        </Box>

        <Box title="District Performance Map" className="col-span-3" compactTitle>
          <div className="grid h-full grid-cols-[140px_1fr] items-center gap-3">
            <TVDistrictMap height={255} />
            <DistrictRankList />
          </div>
        </Box>

        <Box title="Key Alerts & Escalations" className="col-span-3" compactTitle>
          <div className="space-y-2">
            {archiveAlerts.slice(0, 5).map((a) => <AlertLine key={a.text} text={a.text} rag={a.rag} />)}
          </div>
        </Box>

        <Box title="CM Executive Brief" className="col-span-3" compactTitle>
          <div className="grid h-full grid-cols-2 gap-2">
            {briefItems().map((b) => <BriefTile key={b.label} {...b} />)}
          </div>
        </Box>

        <Box title="Integrated Systems (25+)" className="col-span-3" compactTitle right={<span className="text-xs font-bold text-cyan-200">View All</span>}>
          <div className="grid h-full grid-cols-3 gap-2">
            {SYSTEMS.map((s, i) => <SystemTile key={s} label={s} index={i} />)}
          </div>
        </Box>
      </div>
    </SlideFrame>
  );
}

function KpiFocus() {
  return (
    <SlideFrame title="Executive KPI Strip" subtitle="Large-format version of the top score cards from the mockup">
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-4">
        {KPI_CARDS.map((kpi) => (
          <Box key={kpi.label} title={kpi.label}>
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="grid h-16 w-16 place-items-center rounded-2xl" style={{ background: `${kpi.color}22`, color: kpi.color }}>
                  <Icon name={kpi.icon} size={34} />
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-emerald-300">{kpi.delta}</span>
              </div>
              <div>
                <div className="text-6xl font-black" style={{ color: kpi.color }}>{kpi.value}<span className="text-2xl text-white/50">{kpi.sub}</span></div>
                <Sparkline data={kpi.series} color={kpi.color} height={82} />
              </div>
            </div>
          </Box>
        ))}
      </div>
    </SlideFrame>
  );
}

function SectorFocus() {
  return (
    <SlideFrame title="Sector Performance" subtitle="Overall score, sector bars, and movement direction">
      <div className="grid h-full grid-cols-[0.85fr_1.2fr] gap-4">
        <Box title="Overall Governance Score">
          <div className="grid h-full place-items-center">
            <ScoreDonut value={78.6} size="large" />
          </div>
        </Box>
        <Box title="Sector Scoreboard">
          <div className="grid h-full content-center gap-4">
            {mockSectors().map((s) => <ProgressRow key={s.label} label={s.label} value={s.value} color={s.color} />)}
          </div>
        </Box>
      </div>
    </SlideFrame>
  );
}

function DelayedFocus() {
  return (
    <SlideFrame title="Delayed Projects" subtitle="Top 6 delayed projects with days delayed and completion status">
      <div className="grid h-full grid-cols-2 gap-4">
        {MOCK_DELAYED.map((p) => (
          <Box key={p.project} title={p.project} right={<span className="rounded-full bg-rose-500/18 px-3 py-1 text-xl font-black text-rose-300">{p.delay}</span>}>
            <div className="flex h-full items-center gap-5">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-cyan-300/12 text-cyan-200">
                <Icon name={p.icon} size={42} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xl font-bold text-white/75">{p.dept}</div>
                <div className="mt-5">
                  <ProgressRow label="Completion status" value={p.status} color={p.status > 65 ? "#22c55e" : p.status > 50 ? "#f59e0b" : "#ef4444"} />
                </div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </SlideFrame>
  );
}

function SocialFocus() {
  return (
    <SlideFrame title="Top Social Media Burning Issues" subtitle="Last 24 hours - overall sentiment negative at 52%">
      <div className="grid h-full grid-cols-[1.25fr_0.75fr] gap-4">
        <Box title="Issues by mentions and sentiment">
          <div className="grid h-full content-center gap-4">
            {MOCK_SOCIAL.map((s) => <SocialRow key={s.issue} {...s} />)}
          </div>
        </Box>
        <Box title="Sentiment Split">
          <div className="grid h-full place-items-center">
            <SentimentDonut large />
          </div>
        </Box>
      </div>
    </SlideFrame>
  );
}

function DistrictFocus() {
  const top = [...districts].sort((a, b) => b.governance - a.governance).slice(0, 5);
  const bottom = [...districts].sort((a, b) => a.governance - b.governance).slice(0, 5);
  return (
    <SlideFrame title="District Performance Map" subtitle="Top and bottom districts with map-style status view">
      <div className="grid h-full grid-cols-[0.85fr_1fr_1fr] gap-4">
        <Box title="Kerala district heat map">
          <div className="grid h-full place-items-center">
            <TVDistrictMap height={515} />
          </div>
        </Box>
        <Box title="Top 5 Districts">
          <div className="grid h-full content-center gap-4">
            {top.map((d, i) => <RankRow key={d.name} rank={i + 1} label={d.name} value={d.governance} color="#22c55e" />)}
          </div>
        </Box>
        <Box title="Bottom 5 Districts">
          <div className="grid h-full content-center gap-4">
            {bottom.map((d, i) => <RankRow key={d.name} rank={i + 1} label={d.name} value={d.governance} color="#ef4444" />)}
          </div>
        </Box>
      </div>
    </SlideFrame>
  );
}

function AlertsFocus() {
  return (
    <SlideFrame title="Key Alerts & Escalations" subtitle="Critical, warning, and watch items that need command attention">
      <div className="grid h-full grid-cols-2 gap-4">
        {[...archiveAlerts.slice(0, 5), ...cmPriorityQueue.slice(0, 1).map((q) => ({ rag: q.severity, text: q.title, owner: q.owner, time: q.due }))].map((a, i) => (
          <Box key={`${a.text}-${i}`} title={i < 2 ? "Critical Escalation" : i < 5 ? "Warning" : "CM Priority"}>
            <div className="flex h-full items-center gap-5">
              <div className="grid h-20 w-20 place-items-center rounded-2xl" style={{ background: `${RAG_HEX[a.rag]}22`, color: RAG_HEX[a.rag] }}>
                <Icon name={a.rag === "red" ? "TriangleAlert" : a.rag === "amber" ? "CircleAlert" : "Info"} size={44} />
              </div>
              <div>
                <div className="text-2xl font-black leading-tight">{a.text}</div>
                <div className="mt-3 text-lg font-semibold text-white/55">{a.owner || "Control room"} · {a.time || "Archived"}</div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </SlideFrame>
  );
}

function BriefFocus() {
  return (
    <SlideFrame title="CM Executive Brief" subtitle="High-level brief cards for cabinet and command reviews">
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-4">
        {briefItems().map((b) => (
          <Box key={b.label} title={b.label}>
            <div className="flex h-full flex-col justify-between">
              <div className="grid h-16 w-16 place-items-center rounded-2xl" style={{ background: `${b.color}22`, color: b.color }}>
                <Icon name={b.icon} size={36} />
              </div>
              <div>
                <div className="text-6xl font-black" style={{ color: b.color }}>{b.value}</div>
                <div className="text-xl font-semibold text-white/60">{b.sub}</div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </SlideFrame>
  );
}

function RagHeatGridFocus() {
  return (
    <SlideFrame title="RAG Heat Grid by Sector" subtitle="District x sector score matrix with full sector names and TV-readable cells">
      <div className="grid h-full grid-cols-[1fr_290px] gap-4">
        <Box title="Sector Heat Matrix">
          <div className="grid h-full grid-rows-[86px_1fr] gap-3">
            <div className="grid grid-cols-[165px_repeat(6,1fr)] gap-2">
              <div className="flex items-end rounded-2xl bg-white/[0.055] p-3 text-lg font-black text-white/60">District</div>
              {sectorMeta().map((s) => (
                <div key={s.key} title={s.full} aria-label={s.full} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.07] p-3">
                  <Icon name={s.icon} size={25} style={{ color: s.color }} />
                  <div className="text-[13px] font-black leading-tight text-white/88">{s.full}</div>
                </div>
              ))}
            </div>
            <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${districts.length}, minmax(0, 1fr))` }}>
              {districts.map((district) => (
                <div key={district.name} className="grid grid-cols-[165px_repeat(6,1fr)] gap-2">
                  <div className="flex items-center rounded-xl bg-white/[0.06] px-3 text-[18px] font-black text-white/86">{district.name}</div>
                  {sectorMeta().map((sector) => {
                    const value = district.sectors[sector.key];
                    const rag = value >= 75 ? "green" : value >= 60 ? "amber" : "red";
                    const color = RAG_HEX[rag];
                    return (
                      <div
                        key={`${district.name}-${sector.key}`}
                        className="grid place-items-center rounded-xl border text-[20px] font-black text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.05)]"
                        style={{ background: `${color}cc`, borderColor: `${color}` }}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Box>
        <Box title="RAG Legend">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-4">
              <LegendCard icon="CircleCheck" label="Good Performance" range="75-100" color={RAG_HEX.green} />
              <LegendCard icon="CircleAlert" label="Moderate Watch" range="60-74" color={RAG_HEX.amber} />
              <LegendCard icon="CircleX" label="Needs Intervention" range="< 60" color={RAG_HEX.red} />
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <div className="flex items-center gap-3 text-2xl font-black text-cyan-200">
                <Icon name="Grid3x3" size={34} />
                {districts.length * sectorsList.length}
              </div>
              <div className="mt-2 text-lg font-semibold text-white/62">district-sector checkpoints shown</div>
            </div>
          </div>
        </Box>
      </div>
    </SlideFrame>
  );
}

function IndiraPanel() {
  return (
    <SlideFrame title="Indira Guarantees" subtitle="Clear TV view of beneficiary reach and district progress">
      <div className="grid h-full grid-cols-12 grid-rows-6 gap-4">
        <Box title="Indira Guarantees Progress" className="col-span-4 row-span-3">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="text-7xl font-black" style={{ color: RAG_HEX.green }}>{indiraSummary.score}%</div>
            <div className="text-xl text-white/65">overall - {indiraSummary.commitment}</div>
            <div className="mt-3 text-lg text-white/75">{indiraSummary.beneficiaries} beneficiaries - {indiraSummary.released}</div>
          </div>
        </Box>
        <Box title="Six Guarantees" className="col-span-8 row-span-3">
          <div className="grid h-full grid-cols-3 gap-3">
            {guarantees.map((g) => (
              <div key={g.id} className="flex flex-col justify-between rounded-2xl p-4" style={{ background: `${g.theme}22`, border: `1px solid ${g.theme}55` }}>
                <div className="text-lg font-black leading-tight">{g.short}</div>
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-black" style={{ color: g.theme }}>{g.score}%</span>
                  <span className="h-4 w-4 rounded-full" style={{ background: RAG_HEX[g.rag] }} />
                </div>
              </div>
            ))}
          </div>
        </Box>
        <Box title="Beneficiaries Trend (all guarantees)" className="col-span-8 row-span-3">
          <TrendLine data={guarantees[2].trendBeneficiaries} color="#67e8f9" height={245} />
        </Box>
        <Box title="Districts On Track" className="col-span-4 row-span-3">
          <div className="flex h-full items-center justify-center gap-10">
            <div className="text-center"><div className="text-7xl font-black text-emerald-400">{indiraSummary.onTrack}</div><div className="text-lg text-white/55">on track</div></div>
            <div className="text-center"><div className="text-7xl font-black text-rose-400">{indiraSummary.atRisk}</div><div className="text-lg text-white/55">at risk</div></div>
          </div>
        </Box>
      </div>
    </SlideFrame>
  );
}

function FiscalPanel() {
  return (
    <SlideFrame title="Fiscal & Delivery" subtitle="Refreshed fiscal pressure and delivery watch for large screens">
      <div className="grid h-full grid-cols-12 grid-rows-6 gap-4">
        <Box title="Fiscal Pressure" className="col-span-7 row-span-3">
          <div className="grid h-full grid-cols-3 gap-3">
            {archiveFiscalPulse.map((f) => (
              <div key={f.label} className="flex flex-col justify-center rounded-2xl p-4" style={{ background: `${RAG_HEX[f.rag]}1f`, border: `1px solid ${RAG_HEX[f.rag]}44` }}>
                <div className="text-4xl font-black" style={{ color: RAG_HEX[f.rag] }}>{f.value}</div>
                <div className="mt-2 text-lg leading-tight text-white/72">{f.label}</div>
              </div>
            ))}
          </div>
        </Box>
        <Box title="Investment Grounding Ratio" className="col-span-5 row-span-3">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="text-8xl font-black text-amber-400">31%</div>
            <div className="text-xl text-white/55">MoUs that ground - target 60%</div>
          </div>
        </Box>
        <Box title="Project Delay Watch" className="col-span-7 row-span-3">
          <div className="grid h-full content-center gap-4">
            {delayedProjects.map((p) => <ProgressRow key={p.project} label={p.project} value={Math.min(100, p.delay)} color={RAG_HEX[p.rag]} suffix={`${p.delay} days`} />)}
          </div>
        </Box>
        <Box title="Citizen Grievance Sentiment" className="col-span-5 row-span-3">
          <div className="grid h-full place-items-center">
            <SentimentDonut large />
          </div>
        </Box>
      </div>
    </SlideFrame>
  );
}

function MiniKpi({ label, value, sub, delta, icon, color, series }: (typeof KPI_CARDS)[number]) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.085] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${color}22`, color }}>
          <Icon name={icon} size={27} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-black text-white/78">{label}</div>
          <div className="mt-1 text-3xl font-black" style={{ color }}>{value}<span className="text-sm text-white/45">{sub}</span></div>
          <div className="text-[11px] font-bold text-emerald-300">{delta}</div>
        </div>
      </div>
      <Sparkline data={series} color={color} height={42} />
    </div>
  );
}

function ScoreDonut({ value, size }: { value: number; size?: "large" }) {
  const r = size === "large" ? 145 : 76;
  const stroke = size === "large" ? 28 : 18;
  const c = 2 * Math.PI * r;
  const pct = value / 100;
  const wh = size === "large" ? 360 : 190;
  return (
    <div className="relative" style={{ width: wh, height: wh }}>
      <svg viewBox={`0 0 ${wh} ${wh}`} className="-rotate-90">
        <circle cx={wh / 2} cy={wh / 2} r={r} fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth={stroke} />
        <circle cx={wh / 2} cy={wh / 2} r={r} fill="none" stroke="#22d3ee" strokeWidth={stroke} strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round" />
        <circle cx={wh / 2} cy={wh / 2} r={r} fill="none" stroke="#1f7cff" strokeWidth={stroke} strokeDasharray={`${c * 0.18} ${c}`} strokeDashoffset={-c * 0.6} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className={size === "large" ? "text-7xl font-black" : "text-4xl font-black"}>{value}</div>
          <div className={size === "large" ? "text-xl font-bold text-white/60" : "text-xs font-bold text-white/55"}>Overall Score</div>
        </div>
      </div>
    </div>
  );
}

function SentimentDonut({ large }: { large?: boolean }) {
  const wh = large ? 360 : 150;
  const r = large ? 128 : 54;
  const stroke = large ? 36 : 18;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: wh, height: wh }}>
      <svg viewBox={`0 0 ${wh} ${wh}`} className="-rotate-90">
        <circle cx={wh / 2} cy={wh / 2} r={r} fill="none" stroke="#ef4444" strokeWidth={stroke} strokeDasharray={`${c * 0.52} ${c}`} />
        <circle cx={wh / 2} cy={wh / 2} r={r} fill="none" stroke="#eab308" strokeWidth={stroke} strokeDasharray={`${c * 0.28} ${c}`} strokeDashoffset={-c * 0.52} />
        <circle cx={wh / 2} cy={wh / 2} r={r} fill="none" stroke="#22c55e" strokeWidth={stroke} strokeDasharray={`${c * 0.2} ${c}`} strokeDashoffset={-c * 0.8} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className={large ? "text-6xl font-black" : "text-2xl font-black"}>58.7K</div>
          <div className={large ? "text-lg font-semibold text-white/55" : "text-[10px] font-semibold text-white/55"}>Total Mentions</div>
        </div>
      </div>
      {large && (
        <div className="mt-3 grid grid-cols-3 gap-3 text-center text-lg font-bold">
          <span className="text-rose-300">Negative 52%</span>
          <span className="text-yellow-300">Neutral 28%</span>
          <span className="text-emerald-300">Positive 20%</span>
        </div>
      )}
    </div>
  );
}

function ProgressRow({ label, value, color, compact, suffix }: { label: string; value: number; color: string; compact?: boolean; suffix?: string }) {
  return (
    <div>
      <div className={`mb-1 flex items-center justify-between gap-3 ${compact ? "text-[11px]" : "text-lg"}`}>
        <span className="truncate font-bold text-white/76">{label}</span>
        <span className="font-black" style={{ color }}>{suffix || value}</span>
      </div>
      <div className={`${compact ? "h-2" : "h-4"} overflow-hidden rounded-full bg-white/10`}>
        <div className="h-full rounded-full shadow-[0_0_16px_currentColor]" style={{ width: `${Math.min(100, value)}%`, background: color, color }} />
      </div>
    </div>
  );
}

function DelayRow({ project, dept, delay, status, icon, compact }: (typeof MOCK_DELAYED)[number] & { compact?: boolean }) {
  return (
    <div className="grid grid-cols-[24px_1fr_72px_48px] items-center gap-2 rounded-xl bg-white/[0.055] px-2 py-1.5">
      <Icon name={icon} size={compact ? 16 : 22} className="text-cyan-200" />
      <div className="min-w-0">
        <div className={`${compact ? "text-[11px]" : "text-base"} truncate font-black`}>{project}</div>
        <div className={`${compact ? "text-[9px]" : "text-sm"} truncate text-white/45`}>{dept}</div>
      </div>
      <div className={`${compact ? "text-[11px]" : "text-lg"} font-black text-rose-300`}>{delay}</div>
      <div className={`${compact ? "text-[11px]" : "text-lg"} text-right font-black text-yellow-300`}>{status}%</div>
    </div>
  );
}

function SocialRow({ issue, mentions, sentiment, color, compact }: (typeof MOCK_SOCIAL)[number] & { compact?: boolean }) {
  return (
    <div className={`grid items-center gap-3 rounded-xl bg-white/[0.055] ${compact ? "grid-cols-[1fr_45px_45px] px-2 py-1.5 text-[11px]" : "grid-cols-[1fr_100px_120px] px-4 py-3 text-xl"}`}>
      <div className="truncate font-black text-white/82">{issue}</div>
      <div className="font-black text-cyan-200">{mentions}</div>
      <div className="font-black" style={{ color }}>{sentiment}%</div>
    </div>
  );
}

function TVDistrictMap({ height }: { height: number }) {
  const values = Object.fromEntries(districts.map((district) => [district.name, district.governance]));
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-2 shadow-[inset_0_0_26px_rgba(103,232,249,0.08)]">
      <KeralaMap values={values} height={height} unit="score" />
    </div>
  );
}

function DistrictRankList() {
  const top = [...districts].sort((a, b) => b.governance - a.governance).slice(0, 5);
  const bottom = [...districts].sort((a, b) => a.governance - b.governance).slice(0, 5);
  return (
    <div className="space-y-2 text-[11px]">
      <div className="font-black text-emerald-300">Top 5 Districts</div>
      {top.map((d, i) => <div key={d.name} className="flex justify-between gap-2"><span>{i + 1}. {d.name}</span><b>{d.governance}</b></div>)}
      <div className="pt-1 font-black text-rose-300">Bottom 5 Districts</div>
      {bottom.map((d, i) => <div key={d.name} className="flex justify-between gap-2"><span>{i + 1}. {d.name}</span><b>{d.governance}</b></div>)}
    </div>
  );
}

function RankRow({ rank, label, value, color }: { rank: number; label: string; value: number; color: string }) {
  return (
    <div className="grid grid-cols-[52px_1fr_72px] items-center gap-4 rounded-2xl bg-white/[0.06] p-4">
      <div className="grid h-12 w-12 place-items-center rounded-xl text-2xl font-black" style={{ background: `${color}22`, color }}>{rank}</div>
      <div className="text-3xl font-black">{label}</div>
      <div className="text-right text-4xl font-black" style={{ color }}>{value}</div>
    </div>
  );
}

function AlertLine({ text, rag }: { text: string; rag: "red" | "amber" | "green" | "blue" }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-white/[0.055] p-2 text-[11px] leading-snug">
      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: RAG_HEX[rag] }} />
      <span className="line-clamp-2 text-white/82">{text}</span>
    </div>
  );
}

function BriefTile({ label, value, sub, icon, color }: ReturnType<typeof briefItems>[number]) {
  return (
    <div className="rounded-xl bg-white/[0.055] p-3">
      <div className="mb-2 flex items-center gap-2">
        <Icon name={icon} size={18} style={{ color }} />
        <span className="truncate text-[11px] font-bold text-white/55">{label}</span>
      </div>
      <div className="text-2xl font-black" style={{ color }}>{value}</div>
      <div className="truncate text-[10px] text-white/45">{sub}</div>
    </div>
  );
}

function SystemTile({ label, index }: { label: string; index: number }) {
  return (
    <div className="grid place-items-center rounded-xl border border-white/8 bg-white/[0.055] p-2 text-center">
      <Icon name={systemIcon(index)} size={20} style={{ color: systemColor(index) }} />
      <div className="mt-1 text-[11px] font-black text-white/75">{label}</div>
    </div>
  );
}

function LegendCard({ icon, label, range, color }: { icon: string; label: string; range: string; color: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <div className="grid h-16 w-16 place-items-center rounded-2xl" style={{ background: `${color}22`, color }}>
        <Icon name={icon} size={36} />
      </div>
      <div>
        <div className="text-2xl font-black">{label}</div>
        <div className="text-lg font-semibold text-white/55">Score {range}</div>
      </div>
    </div>
  );
}

function sectorMeta() {
  const meta: Record<string, { full: string; icon: string; color: string }> = {
    Finance: { full: "Finance & Revenue", icon: "IndianRupee", color: "#38bdf8" },
    Health: { full: "Health & Family Welfare", icon: "HeartPulse", color: "#22c55e" },
    Projects: { full: "Infrastructure Projects", icon: "Construction", color: "#f59e0b" },
    Welfare: { full: "Social Welfare", icon: "UsersRound", color: "#a78bfa" },
    Grievances: { full: "Grievance Redressal", icon: "MessagesSquare", color: "#06b6d4" },
    Revenue: { full: "Revenue Services", icon: "Landmark", color: "#fb7185" },
  };
  return sectorsList.map((key) => ({ key, ...meta[key] }));
}

function mockSectors() {
  return [
    { label: "Finance & Revenue", value: 88, color: "#22d3ee" },
    { label: "Health & Family Welfare", value: 82, color: "#06b6d4" },
    { label: "Social Welfare", value: 81, color: "#14b8a6" },
    { label: "Infrastructure (PWD)", value: 78, color: "#22c55e" },
    { label: "Public Services Delivery", value: 79, color: "#22c55e" },
    { label: "Education", value: 76, color: "#84cc16" },
    { label: "Agriculture & Fisheries", value: 73, color: "#eab308" },
    { label: "Environment & Climate", value: 71, color: "#f59e0b" },
    { label: "Industries & MSME", value: 74, color: "#f97316" },
  ];
}

function briefItems() {
  return [
    { label: "Manifesto Commitments", value: "84%", sub: "On track", icon: "Landmark", color: "#22d3ee" },
    { label: "Welfare Beneficiaries", value: "7.24 Cr", sub: "+8.7% vs last month", icon: "Users", color: "#38bdf8" },
    { label: "Infrastructure Progress", value: "64%", sub: "Avg. project completion", icon: "ClipboardCheck", color: "#3b82f6" },
    { label: "Healthcare Coverage", value: "42.6 Lakh", sub: "Active beneficiaries", icon: "HeartPulse", color: "#a78bfa" },
    { label: "Education Enrolment", value: "25.8 Lakh", sub: "Students all levels", icon: "GraduationCap", color: "#f43f5e" },
    { label: "Agriculture Production", value: "+9.3%", sub: "vs last year", icon: "Leaf", color: "#22c55e" },
  ];
}

function systemColor(i: number) {
  return ["#22c55e", "#a78bfa", "#38bdf8", "#3b82f6", "#22c55e", "#ef4444", "#06b6d4", "#a78bfa", "#f43f5e", "#fb7185", "#38bdf8", "#60a5fa"][i % 12];
}

function systemIcon(i: number) {
  return ["Users", "Shield", "BarChart3", "Box", "Leaf", "HeartPulse", "Landmark", "IndianRupee", "BadgeIndianRupee", "Cross", "UserRound", "Plus"][i % 12];
}
