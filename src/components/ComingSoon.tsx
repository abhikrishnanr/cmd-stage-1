"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "./primitives";

export default function ComingSoon({ title, icon = "Sparkles", sections = [] }: { title: string; icon?: string; sections?: string[] }) {
  return (
    <div className="p-4 sm:p-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-8 text-white" style={{ background: "linear-gradient(120deg,#14225c,#2b3a8c)" }}>
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="relative">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10"><Icon name={icon} size={26} /></span>
          <h1 className="mt-4 text-3xl font-black">{title}</h1>
          <p className="mt-2 max-w-xl text-sm text-white/70">This page is part of the CM Governance Dashboard and is scheduled in the next build wave. The data model, RAG system, drill-down drawer and review-ticket workflow are already wired and will power it.</p>
          <Link href="/dashboard" className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2 text-sm font-bold hover:bg-white/25"><Icon name="ArrowLeft" size={15} /> Back to Kerala Today</Link>
        </div>
      </motion.div>
      {sections.length > 0 && (
        <div className="mt-5">
          <div className="mb-2 text-[13px] font-bold text-slate-500">Planned sections</div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <div key={s} className="card flex items-center gap-2.5 p-3 text-[13px] font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-indigo)]" /> {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
