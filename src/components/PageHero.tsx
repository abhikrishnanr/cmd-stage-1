"use client";
import { motion } from "framer-motion";
import { Icon } from "./primitives";
import { ProvenanceStrip, ProvenanceTooltip, type DataProvenance } from "./DataProvenance";

export interface HeroStat { label: string; value: string; sub?: string; icon?: string; provenance?: DataProvenance }

export function PageHero({
  title, subtitle, icon, gradient = "linear-gradient(120deg,#0b1437 0%,#14225c 50%,#2b3a8c 100%)",
  badge, stats = [], children, provenance = [], statusLabel = "Live",
}: {
  title: string; subtitle?: string; icon?: string; gradient?: string;
  badge?: string; stats?: HeroStat[]; children?: React.ReactNode;
  provenance?: DataProvenance[]; statusLabel?: string;
}) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl text-white" style={{ background: gradient }}>
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.18),transparent 60%)" }} />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/12"><Icon name={icon} size={24} /></span>}
            <div>
              {badge && <span className="mb-1 inline-block rounded-full bg-white/15 px-3 py-0.5 text-[11px] font-semibold">{badge}</span>}
              <h1 className="display text-2xl font-extrabold sm:text-3xl">{title}</h1>
              {subtitle && <p className="mt-0.5 max-w-2xl text-sm text-white/70">{subtitle}</p>}
            </div>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold text-emerald-300 sm:flex">
            <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" /> {statusLabel}
          </span>
        </div>
        {provenance.length > 0 && <ProvenanceStrip items={provenance} inverted className="mt-4" />}
        {stats.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="relative rounded-xl bg-white/10 p-3 backdrop-blur">
                <div className="mb-1 flex items-center justify-between gap-1 text-[10px] text-white/60"><span className="flex min-w-0 items-center gap-1">{s.icon && <Icon name={s.icon} size={12} />} <span className="truncate">{s.label}</span></span>{s.provenance && <ProvenanceTooltip provenance={s.provenance} inverted />}</div>
                <div className="display text-lg font-extrabold leading-none">{s.value}</div>
                {s.sub && <div className="mt-0.5 text-[10px] text-white/50">{s.sub}</div>}
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
