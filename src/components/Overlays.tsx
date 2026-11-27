"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useUI } from "@/store/ui";
import { Icon, RagBadge } from "./primitives";
import { TrendLine } from "./charts";
import { RAG_HEX } from "@/lib/ui";
import { VoiceNote, Attachments } from "./VoiceNote";

const SECRETARIES = [
  "Chief Secretary", "Finance Secretary", "Health Secretary", "Industries Secretary",
  "Local Self Government Secretary", "Education Secretary", "Revenue Secretary", "Transport Secretary",
];

export function Overlays() {
  return (
    <>
      <DrillDownDrawer />
      <CreateTicketModal />
      <Toast />
    </>
  );
}

function DrillDownDrawer() {
  const { drawer, closeDrawer, openTicket } = useUI();
  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeDrawer} className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-[2px]" />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-[1101] flex h-full w-full max-w-[460px] flex-col bg-[color:var(--color-app)] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 p-5 text-white" style={{ background: "linear-gradient(120deg,var(--color-navy),var(--color-indigo))" }}>
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <RagBadge rag={drawer.rag} />
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">Drill-down</span>
                </div>
                <h2 className="text-lg font-black leading-tight">{drawer.title}</h2>
                <p className="mt-1 text-xs text-white/70">{drawer.source} · updated {drawer.updated} · confidence {drawer.confidence}%</p>
              </div>
              <button onClick={closeDrawer} className="rounded-lg p-1 hover:bg-white/10"><Icon name="X" size={20} /></button>
            </div>

            <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                {["State", "District", "Block", "Scheme"].map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 ${i === 0 ? "bg-[color:var(--color-indigo)] text-white" : "bg-white text-slate-500"}`}>{s}</span>
                    {i < 3 && <Icon name="ChevronRight" size={13} />}
                  </span>
                ))}
              </div>

              {(drawer.target || drawer.achieved) && (
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat label="Target" value={drawer.target || "—"} />
                  <MiniStat label="Achieved" value={drawer.achieved || "—"} />
                  <MiniStat label="Beneficiaries" value={drawer.beneficiaries || "—"} />
                  <MiniStat label="Fund Released" value={`${drawer.released || "—"} / ${drawer.allocated || "—"}`} />
                </div>
              )}

              {drawer.trend && (
                <div className="card p-3">
                  <div className="mb-1 text-xs font-bold text-slate-600">Monthly Trend {drawer.metricUnit ? `(${drawer.metricUnit})` : ""}</div>
                  <TrendLine data={drawer.trend} height={150} color={RAG_HEX[drawer.rag]} />
                </div>
              )}

              {drawer.districtTable && (
                <div className="card overflow-hidden">
                  <div className="border-b border-slate-100 px-3 py-2 text-xs font-bold text-slate-600">District Breakdown</div>
                  <div className="max-h-52 overflow-y-auto scrollbar-thin">
                    {drawer.districtTable.slice(0, 14).map((r) => (
                      <div key={r.district} className="flex items-center justify-between border-b border-slate-50 px-3 py-1.5 text-[12px]">
                        <span className="flex items-center gap-2"><span className="text-slate-400">{r.rank}</span>{r.district}</span>
                        <span className="font-bold">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {drawer.action && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-amber-700"><Icon name="Lightbulb" size={14} /> Recommended CM Action</div>
                  <p className="text-[12px] text-amber-900">{drawer.action}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <InfoList title="Related Alerts" icon="AlertTriangle" items={drawer.alerts || ["No active alerts"]} />
                <InfoList title="Related Tickets" icon="TicketCheck" items={drawer.tickets || ["No linked tickets"]} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-slate-200 bg-white p-3">
              <button onClick={() => openTicket({ itemType: "KPI / Guarantee", itemName: drawer.title, rag: drawer.rag })}
                className="col-span-1 rounded-xl bg-[color:var(--color-ribbon)] px-3 py-2.5 text-[12px] font-bold text-white hover:opacity-90">
                Create Ticket
              </button>
              {drawer.fullPage ? (
                <Link href={drawer.fullPage} onClick={closeDrawer} className="rounded-xl bg-[color:var(--color-indigo)] px-3 py-2.5 text-center text-[12px] font-bold text-white hover:opacity-90">View Full Page</Link>
              ) : (
                <button className="rounded-xl bg-[color:var(--color-indigo)] px-3 py-2.5 text-[12px] font-bold text-white hover:opacity-90">View Full Page</button>
              )}
              <button onClick={closeDrawer} className="rounded-xl border border-slate-200 px-3 py-2.5 text-[12px] font-bold text-slate-600 hover:bg-slate-50">Export</button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-0.5 text-[15px] font-black text-[color:var(--color-ink)]">{value}</div>
    </div>
  );
}
function InfoList({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <div className="card p-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-slate-600"><Icon name={icon} size={13} /> {title}</div>
      <ul className="space-y-1 text-[11px] text-slate-500">{items.map((t, i) => <li key={i}>• {t}</li>)}</ul>
    </div>
  );
}

function CreateTicketModal() {
  const { ticket, closeTicket, showToast } = useUI();
  const [priority, setPriority] = useState("High");
  const [resp, setResp] = useState("Brief Note");
  const priorities = ["Critical", "High", "Medium", "Watch"];
  const responses = ["Brief Note", "Action Taken Report", "Data Correction", "Field Verification", "Cabinet Note", "Department Review"];
  if (!ticket) return null;
  return (
    <AnimatePresence>
      {ticket && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeTicket} className="fixed inset-0 z-[1110] bg-black/50 backdrop-blur-[2px]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
            className="fixed left-1/2 top-1/2 z-[1111] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
              <h2 className="flex items-center gap-2 text-base font-black"><Icon name="TicketCheck" size={18} /> Create Review Ticket</h2>
              <button onClick={closeTicket} className="rounded-lg p-1 hover:bg-slate-100"><Icon name="X" size={18} /></button>
            </div>
            <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
              <div className="col-span-2 space-y-3 p-5">
                <Field label="Ticket Title"><input defaultValue={`Review: ${ticket.itemName}`} className="inp" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Related Item Type"><input defaultValue={ticket.itemType} className="inp" /></Field>
                  <Field label="Related Item Name"><input defaultValue={ticket.itemName} className="inp" /></Field>
                </div>
                <VoiceNote />
                <Field label="Note from CM"><textarea rows={3} placeholder="Type, or use the voice note above…" className="inp resize-none" /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Assign to Secretary">
                    <select defaultValue={ticket.secretary || "Health Secretary"} className="inp">{SECRETARIES.map((s) => <option key={s}>{s}</option>)}</select>
                  </Field>
                  <Field label="Department"><input defaultValue="—" className="inp" /></Field>
                </div>
                <Field label="Priority">
                  <div className="flex gap-2">
                    {priorities.map((p) => (
                      <button key={p} onClick={() => setPriority(p)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold ${priority === p ? "text-white" : "text-slate-500 bg-slate-100"}`}
                        style={priority === p ? { background: p === "Critical" ? RAG_HEX.red : p === "High" ? RAG_HEX.amber : p === "Medium" ? RAG_HEX.blue : "#64748b" } : {}}>
                        {p}
                      </button>
                    ))}
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Due Date"><input type="date" className="inp" /></Field>
                  <Field label="Expected Response">
                    <select value={resp} onChange={(e) => setResp(e.target.value)} className="inp">{responses.map((r) => <option key={r}>{r}</option>)}</select>
                  </Field>
                </div>
                <Attachments />
              </div>
              <div className="space-y-3 border-l border-slate-100 bg-slate-50 p-5">
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Context</div>
                {ticket.rag && <RagBadge rag={ticket.rag} />}
                <div className="card p-3 text-sm">
                  <div className="text-[11px] text-slate-400">Item</div>
                  <div className="font-bold">{ticket.itemName}</div>
                  <div className="mt-2 text-[11px] text-slate-400">Type</div>
                  <div className="font-semibold text-slate-600">{ticket.itemType}</div>
                  <div className="mt-2 text-[11px] text-slate-400">Priority</div>
                  <div className="font-semibold">{priority}</div>
                  <div className="mt-2 text-[11px] text-slate-400">Response</div>
                  <div className="font-semibold text-slate-600">{resp}</div>
                </div>
                <p className="text-[11px] text-slate-400">A notification will be sent to the assigned secretary's inbox with the CM note and SLA countdown.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3.5">
              <button onClick={closeTicket} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => { closeTicket(); showToast("Ticket created & secretary notified"); }}
                className="rounded-xl bg-[color:var(--color-ribbon)] px-4 py-2 text-sm font-bold text-white hover:opacity-90">Create Ticket & Notify</button>
            </div>
          </motion.div>
          <style>{`.inp{width:100%;border:1px solid #e2e8f0;border-radius:10px;padding:8px 11px;font-size:13px;outline:none;background:#fff}.inp:focus{border-color:var(--color-indigo)}`}</style>
        </>
      )}
    </AnimatePresence>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function Toast() {
  const { toast } = useUI();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-6 left-1/2 z-[1200] -translate-x-1/2 rounded-full bg-[color:var(--color-ink)] px-5 py-2.5 text-sm font-bold text-white shadow-2xl">
          <span className="mr-2 inline-block text-emerald-400">✓</span>{toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
