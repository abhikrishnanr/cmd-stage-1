"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./primitives";

/** Card panel with a fullscreen-expand toggle for data-heavy content. */
export function ExpandablePanel({
  title, children, center = true, className = "",
}: { title: string; children: React.ReactNode; center?: boolean; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }}
        className={`card relative flex flex-col p-4 ${className}`}>
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className={`display text-[15px] font-bold ${center ? "flex-1 text-center" : ""}`} style={{ color: "var(--color-navy)" }}>{title}</h3>
          <button onClick={() => setOpen(true)} title="Expand to full screen"
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-[color:var(--color-navy)]">
            <Icon name="Maximize2" size={15} />
          </button>
        </div>
        <div className="flex-1">{children}</div>
      </motion.section>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="fixed inset-0 z-[1100] bg-black/55 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              className="fixed inset-3 z-[1101] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:inset-6">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <h3 className="display text-lg font-bold" style={{ color: "var(--color-navy)" }}>{title}</h3>
                <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100"><Icon name="X" size={20} /></button>
              </div>
              <div className="scrollbar-thin flex-1 overflow-auto p-6">
                <div className="mx-auto max-w-5xl text-[15px] [&_*]:!leading-relaxed">{children}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
