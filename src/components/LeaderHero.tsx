"use client";
import { motion } from "framer-motion";
import { Icon } from "./primitives";
import { LiveClock } from "./AppShell";
import { Leader } from "@/data/leaders";
import { RAG_HEX } from "@/lib/ui";

/* Hero banner: leader photo occupies the left ~1/3 of the banner image;
   name + KPIs render in the right ~2/3 (content starts after 1/3). */
export function LeaderHero({ leader }: { leader: Leader }) {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl shadow-lg">
      <img src={leader.banner} alt={leader.name} className="absolute inset-0 h-full w-full object-cover" />
      {/* legibility scrim on the content (right) side only */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 44%, rgba(255,255,255,0.82) 100%)" }} />
      <div className="relative grid md:grid-cols-[34%_1fr]">
        <div className="hidden md:block" /> {/* spacer for the photo zone */}
        <div className="p-5 sm:p-6 md:py-7">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 font-black text-[color:var(--color-ink)]"><img src="/img/kerala-govt-logo.svg" alt="Government of Kerala" className="h-4 w-4" /> CM Dashboard</span>
            <span className="rounded-full px-2.5 py-1 font-bold text-white" style={{ background: leader.accent }}>{leader.title}</span>
            <span className="rounded-full bg-white/80 px-2.5 py-1 font-semibold text-slate-500"><LiveClock /></span>
          </div>
          <h1 className="display text-2xl font-extrabold leading-tight sm:text-4xl" style={{ color: "var(--color-ink)" }}>{leader.name}</h1>
          <p className="text-[13px] font-semibold text-slate-500">{leader.dept} · {leader.greeting}</p>

          {leader.kpis.length > 0 && <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {leader.kpis.map((k) => {
              const c = k.rag ? RAG_HEX[k.rag] : leader.accent;
              return (
                <div key={k.label} className="rounded-xl border border-white/60 bg-white/80 p-2.5 backdrop-blur">
                  <div className="flex items-center gap-1.5">
                    <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: `${c}1a`, color: c }}><Icon name={k.icon} size={14} /></span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{k.label}</span>
                  </div>
                  <div className="mt-1 display text-[18px] font-extrabold leading-none" style={{ color: c }}>{k.value}</div>
                  {k.sub && <div className="text-[10px] text-slate-500">{k.sub}</div>}
                </div>
              );
            })}
          </div>}
        </div>
      </div>
    </motion.section>
  );
}
