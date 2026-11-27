"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@/components/primitives";
import { LiveClock } from "@/components/AppShell";
import { useUI } from "@/store/ui";
import { leaders } from "@/data/leaders";

const PUBLIC = { slug: "public", name: "Public View", title: "Citizen Transparency", initials: "PV", accent: "#64748b" };

export default function Login() {
  const router = useRouter();
  const setRole = useUI((s) => s.setRole);
  const [sel, setSel] = useState(0);
  const options = [...leaders, PUBLIC as any];

  const login = () => {
    const r = options[sel];
    setRole(`${r.name}, ${r.title}`);
    router.push(r.slug === "public" ? "/public" : r.slug === "vd-satheeshan" ? "/dashboard-cm" : `/leader/${r.slug}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <img src="/img/login/kerala-secretariat.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[.42]" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,.96)_0%,rgba(8,27,61,.84)_47%,rgba(6,78,59,.50)_100%)]" />
      <div className="hero-grid absolute inset-0 opacity-28" />
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/25 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-7">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/img/kerala-govt-logo.svg" alt="Government of Kerala" className="h-[52px] w-[52px] rounded-2xl bg-white p-2 shadow-xl" />
            <div>
              <div className="text-base font-black tracking-wide">Government of Kerala</div>
              <div className="text-[11px] font-semibold text-white/60">CM Governance Dashboard</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] sm:flex">
            <LiveClock light />
          </div>
        </header>

        <div className="grid flex-1 items-center gap-8 py-8 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <h1 className="display text-5xl font-black leading-[0.98] sm:text-6xl xl:text-7xl">CM Governance Dashboard</h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/74">Published Cabinet decisions, state accounts, programme progress and district statistics.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[1.35rem] border border-white/20 bg-white/[.96] p-5 text-slate-800 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="display text-2xl font-black text-[color:var(--color-ink)]">Choose a dashboard view</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">Open the Chief Minister’s Dashboard or Public View. Other profiles demonstrate the layout.</p>
              </div>
            </div>
            <div className="scrollbar-thin mb-4 grid max-h-[430px] grid-cols-1 gap-2 overflow-y-auto pr-1">
              {options.map((r, i) => (
                <button key={r.slug} onClick={() => setSel(i)}
                  className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${sel === i ? "border-transparent text-white shadow-lg" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                  style={sel === i ? { background: `linear-gradient(120deg,${r.accent},#14224d)` } : {}}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-[12px] font-black" style={sel === i ? { background: "rgba(255,255,255,0.22)" } : { background: `${r.accent}18`, color: r.accent }}>{r.initials}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-black leading-tight">{r.name}</span>
                    <span className={`block truncate text-[11.5px] font-semibold ${sel === i ? "text-white/82" : "text-slate-400"}`}>{r.title}</span>
                  </span>
                  <Icon name={sel === i ? "CircleCheck" : "ChevronRight"} size={18} className={sel === i ? "text-white" : "text-slate-300"} />
                </button>
              ))}
            </div>
            <button onClick={login} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-ink)] py-3.5 text-sm font-black text-white transition hover:opacity-90">
              <Icon name="ArrowRight" size={17} /> Open {options[sel].name}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
