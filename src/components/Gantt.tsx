"use client";
import { motion } from "framer-motion";
import { activities as ALL, FY, CAT, Activity } from "@/data/dreamSamudra";
import { RAG_HEX } from "@/lib/ui";

const N = FY.length;

export function Gantt({ activities = ALL }: { activities?: Activity[] }) {
  const stages = [1, 2, 3] as const;
  const stageTheme: Record<number, string> = { 1: "FY 26–27 · Lock in the Wins", 2: "FY 28–29 · Build the Pull", 3: "FY 30–35 · Scale & Decarbonise" };
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <div className="min-w-[860px]">
        {/* header */}
        <div className="flex border-b border-slate-200 pb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
          <div className="w-[230px] shrink-0 px-2">Activity</div>
          <div className="relative flex-1">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${N},1fr)` }}>
              {FY.map((f) => <div key={f} className="border-l border-slate-100 px-1 text-center">{f}</div>)}
            </div>
          </div>
          <div className="w-[78px] shrink-0 px-2 text-right">₹ Cr</div>
        </div>

        {stages.map((st) => {
          const rows = activities.filter((a) => a.stage === st);
          if (!rows.length) return null;
          return (
            <div key={st}>
              <div className="flex items-center gap-2 bg-slate-50 px-2 py-1.5 text-[11px] font-extrabold text-[color:var(--color-navy)]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-navy)] text-[10px] text-white">{st}</span>
                Stage {st} · <span className="font-semibold text-slate-500">{stageTheme[st]}</span>
              </div>
              {rows.map((a, i) => {
                const left = (a.s / N) * 100;
                const width = ((a.e - a.s + 1) / N) * 100;
                const c = CAT[a.cat].color;
                return (
                  <div key={a.id} className="flex items-center border-b border-slate-50 py-1 hover:bg-blue-50/40">
                    <div className="flex w-[230px] shrink-0 items-center gap-1.5 px-2">
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded text-[8px] font-black text-white" style={{ background: c }}>{a.id}</span>
                      <span className="truncate text-[11px] font-semibold text-slate-700" title={a.name}>{a.name}</span>
                    </div>
                    <div className="relative h-5 flex-1">
                      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${N},1fr)` }}>
                        {FY.map((f) => <div key={f} className="border-l border-slate-50" />)}
                      </div>
                      <motion.div initial={{ width: 0, opacity: 0 }} whileInView={{ width: `${width}%`, opacity: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.03 }}
                        className="absolute top-1/2 flex -translate-y-1/2 items-center rounded-full"
                        style={{ left: `${left}%`, height: 11, background: c, boxShadow: `0 1px 4px ${c}66` }}>
                        {a.status === "active" && <span className="ml-1 h-2 w-2 animate-pulse rounded-full bg-white/90" />}
                      </motion.div>
                    </div>
                    <div className="w-[78px] shrink-0 px-2 text-right text-[11px] font-bold text-slate-600">{a.total.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* legend */}
        <div className="mt-3 flex flex-wrap items-center gap-4 px-2 text-[11px]">
          {Object.entries(CAT).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5 text-slate-600"><span className="h-2.5 w-4 rounded-full" style={{ background: v.color }} />{v.label}</span>
          ))}
          <span className="flex items-center gap-1.5 text-slate-600"><span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" /> active now</span>
        </div>
      </div>
    </div>
  );
}
