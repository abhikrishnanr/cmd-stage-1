"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize2, Minimize2, Pause, Play } from "lucide-react";
import { CabinetDecisionsCard } from "@/components/CabinetDecisionsCard";
import { FiscalSummary } from "@/components/FiscalWorkspace";
import { DistrictEconomyMap } from "@/components/DistrictEconomyMap";
import { LiveClock } from "@/components/AppShell";

const panels = [
  { name: "Cabinet Decisions", Content: CabinetDecisionsCard },
  { name: "Kerala’s finances", Content: FiscalSummary },
  { name: "District economy", Content: DistrictEconomyMap },
];

export default function BriefingWallPage() {
  const [panel, setPanel] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [displayError, setDisplayError] = useState("");
  const { Content } = panels[panel];

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => setPanel((current) => (current + 1) % panels.length), 12_000);
    return () => clearInterval(timer);
  }, [autoplay]);

  useEffect(() => {
    const onFullscreen = () => setFullScreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  async function toggleFullScreen() {
    setDisplayError("");
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setDisplayError("Full screen is unavailable in this browser.");
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,#155c69,transparent_50%),#101d3b] p-4 text-white sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/dashboard-cm" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-100 hover:underline"><ArrowLeft size={14} aria-hidden="true" /> CM Dashboard</Link>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">TV Briefing Wall</h1>
            <p className="mt-2 text-xs"><LiveClock light /></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setAutoplay((current) => !current)} aria-pressed={autoplay} className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-3 py-2 text-xs font-semibold hover:bg-white/10">
              {autoplay ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{autoplay ? "Pause rotation" : "Start rotation"}
            </button>
            <button type="button" onClick={toggleFullScreen} className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-3 py-2 text-xs font-semibold hover:bg-white/10">
              {fullScreen ? <Minimize2 size={14} aria-hidden="true" /> : <Maximize2 size={14} aria-hidden="true" />}{fullScreen ? "Exit full screen" : "Full screen"}
            </button>
          </div>
        </header>
        {displayError && <p role="status" className="text-xs text-amber-100">{displayError}</p>}
        <nav aria-label="Briefing panels" className="flex flex-wrap gap-2">
          {panels.map(({ name }, index) => (
            <button type="button" key={name} aria-pressed={panel === index} onClick={() => setPanel(index)} className={`rounded-lg px-3 py-2 text-xs font-bold ${panel === index ? "bg-white text-[#152e59]" : "bg-white/10 text-white hover:bg-white/20"}`}>{name}</button>
          ))}
        </nav>
        <div className="min-w-0 text-slate-800"><Content /></div>
      </div>
    </main>
  );
}
