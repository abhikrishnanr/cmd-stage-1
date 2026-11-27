"use client";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { Rag } from "@/data/types";
import { RAG_HEX, RAG_BG, RAG_LABEL } from "@/lib/ui";
import { ProvenanceTooltip, formatProvenance, type DataProvenance } from "./DataProvenance";

export function Icon({ name, size = 18, className = "", style }: { name: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const C = (Icons as any)[name] || Icons.Circle;
  return <C size={size} className={className} style={style} strokeWidth={2} />;
}

export function RagDot({ rag, pulse }: { rag: Rag; pulse?: boolean }) {
  return (
    <span className={pulse ? "live-dot" : ""}
      style={{ width: 10, height: 10, borderRadius: 99, background: RAG_HEX[rag], display: "inline-block", flexShrink: 0 }} />
  );
}

export function RagBadge({ rag, label }: { rag: Rag; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{ background: RAG_BG[rag], color: RAG_HEX[rag] }}>
      <span style={{ width: 7, height: 7, borderRadius: 99, background: RAG_HEX[rag], display: "inline-block" }} />
      {label || RAG_LABEL[rag]}
    </span>
  );
}

export function SectionCard({
  title, subtitle, icon, right, children, className = "", onClick, expandable = false, provenance,
}: {
  title?: string; subtitle?: string; icon?: string; right?: ReactNode; children: ReactNode; className?: string; onClick?: () => void; expandable?: boolean; provenance?: DataProvenance;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35 }}
        onClick={onClick}
        className={`card p-4 sm:p-5 ${onClick ? "card-hover" : ""} ${className}`}
      >
        {(title || right || expandable) && (
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {icon && (
                <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "rgba(28,63,124,0.08)", color: "var(--color-navy)" }}>
                  <Icon name={icon} size={17} />
                </span>
              )}
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-extrabold text-[color:var(--color-ink)]">{title}</h3>
                {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {right}
              {provenance && <ProvenanceTooltip provenance={provenance} />}
              {expandable && (
                <button onClick={(e) => { e.stopPropagation(); setOpen(true); }} title="Expand to full screen"
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-[color:var(--color-navy)]">
                  <Icons.Maximize2 size={15} />
                </button>
              )}
            </div>
          </div>
        )}
        {children}
      </motion.section>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="fixed inset-0 z-[1100] bg-black/55 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              className="fixed inset-3 z-[1101] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:inset-6">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <h3 className="text-lg font-extrabold text-[color:var(--color-ink)]">{title}</h3>
                <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100"><Icons.X size={20} /></button>
              </div>
              <div className="scrollbar-thin flex-1 overflow-auto p-6"><div className="mx-auto max-w-5xl">{children}</div></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function DrillChip({ label = "Drill-down" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(28,63,124,0.07)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--color-navy)]">
      <Icons.MousePointerClick size={11} /> {label}
    </span>
  );
}

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  return (
    <motion.span initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }} className={className}>
      {value}
    </motion.span>
  );
}

export function StatTile({
  label, value, sub, delta, icon, color, rag, onClick, provenance,
}: {
  label: string; value: string; sub?: string; delta?: string; icon?: string; color?: string; rag?: Rag; onClick?: () => void; provenance?: DataProvenance;
}) {
  const accent = rag ? RAG_HEX[rag] : color || "var(--color-navy)";
  const provenanceText = provenance ? formatProvenance(provenance) : undefined;
  return (
    <motion.button whileHover={{ y: -3 }} onClick={onClick}
      title={provenanceText}
      aria-label={provenanceText ? `${label}: ${value}. ${provenanceText}` : undefined}
      className="card card-hover group relative w-full overflow-hidden p-4 text-left">
      <span className="absolute left-0 top-0 h-full w-1.5" style={{ background: accent }} />
      <div className="mb-2 flex items-start justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: accent }}>
          <Icon name={icon || "Circle"} size={18} />
        </span>
        <span className="flex items-center gap-1.5">
          {delta && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: `${accent}15`, color: accent }}>{delta}</span>}
          {provenance && <ProvenanceTooltip provenance={provenance} compact />}
        </span>
      </div>
      <div className="text-[22px] font-black leading-none tracking-tight" style={{ color: accent }}><CountUp value={value} /></div>
      <div className="mt-1.5 text-[12px] font-semibold text-[color:var(--color-ink)]">{label}</div>
      {sub && <div className="text-[11px] text-slate-500">{sub}</div>}
      <Icons.ArrowUpRight className="absolute bottom-3 right-3 text-slate-300 opacity-0 transition group-hover:opacity-100" size={15} />
    </motion.button>
  );
}
