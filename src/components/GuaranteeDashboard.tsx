"use client";
import Link from "next/link";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Guarantee } from "@/data/types";
import { Icon, RagBadge } from "./primitives";
import { FilledIcon, splitIconName } from "./FilledIcon";
import { ExpandablePanel } from "./ExpandablePanel";
import { TrendLine, Donut, Legend, Bars, Sparkline } from "./charts";
import KeralaMap from "./KeralaMap";
import { useUI } from "@/store/ui";
import { RAG_HEX, heatColor } from "@/lib/ui";

const NAVY = "var(--color-navy)";
const STEP_COLORS = ["#7c3aed", "#1c3f7c", "#1aa6c9", "#f5821f", "#ec4899"];
const FOCUS_IMG = ["/img/focus/1.jpg", "/img/focus/2.jpg", "/img/focus/3.jpg"];
const FOCUS_COLOR = ["#f5821f", "#1c3f7c", "#16a34a"];

export default function GuaranteeDashboard({ g }: { g: Guarantee }) {
  const { openDrawer, openTicket } = useUI();
  const mapValues = Object.fromEntries(g.districtTable.map((d) => [d.district, d.value]));
  const maxD = Math.max(...g.districtTable.map((d) => d.value));
  const isTravel = g.slug === "free-ksrtc-travel";
  const showJourney = !isTravel;
  const source = isTravel ? "Original dashboard demo" : g.source;

  return (
    <div className="w-full max-w-none space-y-4 p-4 sm:p-5">
      {/* CM GOVERNANCE BAR */}
      <div className="card flex flex-wrap items-center gap-2.5 p-3">
        <Link href="/indira" className="flex items-center gap-1 text-[12px] font-bold" style={{ color: NAVY }}><Icon name="ArrowLeft" size={15} /> Indira Command</Link>
        <span className="h-4 w-px bg-slate-200" />
        <h1 className="display text-[14px] font-bold" style={{ color: NAVY }}>{isTravel ? "Priyadarshini" : g.short}</h1>
        <RagBadge rag={g.rag} />
        <Chip icon="UserCog" text={`Owner: ${g.owner}`} />
        {isTravel ? (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-900">
            Illustrative snapshot · {g.updated}
          </span>
        ) : <Chip icon="Database" text={source} />}
        <Chip icon="IndianRupee" text={`${g.released} / ${g.allocated}`} />
        <Chip icon={isTravel ? "Bus" : "Hourglass"} text={isTravel ? "78.4 Cr free trips" : `${g.pending} pending`} />
        <div className="ml-auto flex gap-2">
          {isTravel && <Link href="/indira#priyadarshini-usage" className="self-center text-[12px] font-bold text-blue-800 underline underline-offset-2">Published ridership</Link>}
          <button onClick={() => openDrawer({ title: g.title, rag: g.rag, source, updated: g.updated, confidence: 92, target: g.target, achieved: g.achieved, beneficiaries: g.beneficiaries, allocated: g.allocated, released: g.released, districtTable: g.districtTable, trend: g.trendBeneficiaries, metricUnit: g.metricUnit, fullPage: `/indira/${g.slug}`, action: isTravel ? `Review district-wise ridership and occupancy with ${g.owner}.` : `Assign ${g.owner} to clear ${g.pending} and review at-risk districts.`, alerts: [`${g.districtsAtRisk} districts at risk`, `${g.grievances} open grievances`], tickets: ["No open tickets"] })}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-bold text-slate-600 hover:bg-slate-50">Drill-down</button>
          <button onClick={() => openTicket({ itemType: "Indira Guarantee", itemName: isTravel ? `${g.title} · Illustrative snapshot` : g.title, rag: g.rag, secretary: g.owner })}
            className="rounded-lg px-3 py-1.5 text-[12px] font-bold text-white hover:opacity-90" style={{ background: "var(--color-ribbon)" }}>Send for Review</button>
        </div>
      </div>

      {/* HERO BANNER — image only (drop your designed banner at /public/img/heroes/<slug>.jpg) */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl shadow-lg">
        <img src={`/img/heroes/${g.slug}.jpg`} alt={g.title} className={isTravel ? "h-auto w-full" : "h-52 w-full object-cover sm:h-72 lg:h-[22rem]"} />
      </motion.div>

      {/* KPI STRIP */}
      <div className={`grid grid-cols-2 gap-3 ${isTravel ? "sm:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8" : "sm:grid-cols-3 xl:grid-cols-6"}`}>
        {g.kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="card flex flex-col items-center gap-2 p-4 text-center">
            <IconCircle color={k.color} icon={k.icon} />
            <p className="text-[11px] font-medium text-slate-500">{k.label}</p>
            <p className="display text-2xl font-extrabold" style={{ color: k.label.includes("Satisfaction") ? "var(--color-ribbon)" : NAVY }}>{k.value}</p>
            {k.delta && <p className="text-[11px] font-semibold text-green-600">{k.delta}</p>}
            {!k.delta && k.sub && <p className="text-[11px] font-semibold text-slate-500">{k.sub}</p>}
            {k.spark && (
              <div className="mt-auto w-full pt-1" aria-label={`${k.label} recent trend`}>
                <Sparkline data={k.spark} color={k.sparkColor || "#16a34a"} height={36} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {isTravel && g.travelAnalytics && (
        <div className="grid items-stretch gap-4 xl:grid-cols-[0.8fr_1.45fr]">
          <ExpandablePanel title="Free Trips by Distance Slab" center={false} className="h-full">
            <DistanceSlabChart analytics={g.travelAnalytics} />
          </ExpandablePanel>
          <ExpandablePanel title="Bus Occupancy by Gender · District-wise" center={false} className="h-full">
            <GenderOccupancyChart data={g.travelAnalytics.genderOccupancy} />
          </ExpandablePanel>
        </div>
      )}

      {isTravel && g.travelAnalytics && <TravelFinancials data={g.travelAnalytics.financials} snapshotDate={g.updated} />}

      {/* SCHEME AT A GLANCE — two clearly separated, animated parts */}
      <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }}
        className="card overflow-hidden p-0">
        <h3 className="display border-b border-slate-100 px-5 py-3 text-center text-[15px] font-bold" style={{ color: NAVY }}>Scheme at a Glance</h3>

        {/* PART 1 · PROCESS */}
        <div className="px-5 pt-4">
          <SubHeading icon="GitBranch" text="How it works" color={NAVY} />
          <div className="relative mt-4 pb-2">
            {/* connecting line behind the steps */}
            <div className="absolute left-[9%] right-[9%] top-7 hidden h-[3px] rounded-full sm:block"
              style={{ background: "linear-gradient(90deg,#e9eef7,#cfd8ea,#e9eef7)" }} />
            <motion.div className="absolute left-[9%] top-7 hidden h-[3px] rounded-full sm:block"
              style={{ background: "linear-gradient(90deg,var(--color-ribbon),#f5821f)" }}
              initial={{ width: 0 }} whileInView={{ width: "82%" }} viewport={{ once: true }} transition={{ duration: 1.1, ease: "easeInOut" }} />
            <div className="grid grid-cols-2 gap-y-5 sm:flex sm:items-start sm:justify-between sm:gap-0">
              {g.glance.map((s, i) => {
                const c = STEP_COLORS[i % STEP_COLORS.length];
                return (
                  <Fragment key={s.step}>
                    <motion.div initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 220, damping: 16 }}
                      className="relative z-10 flex flex-1 flex-col items-center gap-1.5 px-1 text-center">
                      <div className="relative">
                        <div className="grid h-14 w-14 place-items-center rounded-full bg-white" style={{ color: c, boxShadow: `0 0 0 4px ${c}22, 0 6px 16px -6px ${c}80`, border: `2px solid ${c}` }}>
                          <FilledIcon name={s.icon} size={24} />
                        </div>
                        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[10px] font-black text-white" style={{ background: c }}>{i + 1}</span>
                      </div>
                      <p className="text-[11.5px] font-bold leading-tight" style={{ color: c }}>{s.step}</p>
                      <p className="text-[9.5px] leading-tight text-slate-500">{s.desc}</p>
                    </motion.div>
                    {i < g.glance.length - 1 && (
                      <motion.div className="hidden shrink-0 items-start pt-4 sm:flex"
                        animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
                        <Icon name="ChevronRight" size={20} className="text-slate-300" />
                      </motion.div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="my-4 flex items-center gap-3 px-5">
          <span className="h-px flex-1 bg-slate-100" />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Benefits</span>
          <span className="h-px flex-1 bg-slate-100" />
        </div>

        {/* PART 2 · BENEFITS */}
        <div className="px-5 pb-5">
          <SubHeading icon="Sparkles" text="Why it matters" color="var(--color-ribbon)" />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {g.pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center">
                <IconCircle color={p.color} icon={p.icon} />
                <p className="text-[12px] font-bold" style={{ color: p.color }}>{p.title}</p>
                <p className="text-[9.5px] leading-tight text-slate-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* HEATMAP — full width, larger map */}
      <ExpandablePanel title={`District-wise ${g.metricUnit.match(/Insured|Beneficiaries|Senior/) ? "Beneficiary" : "Utilisation"} Heatmap`} center={false}>
        <div className="grid gap-4 md:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col">
            <KeralaMap values={mapValues} height={420} unit={g.metricUnit} onSelect={(d) => {
              const v = mapValues[d];
              openDrawer({ title: `${g.short} · ${d}`, rag: g.rag, source, updated: g.updated, confidence: 91, achieved: `${v} ${g.metricUnit}`, districtTable: g.districtTable, action: "Compare against state average and flag if lagging." });
            }} />
            <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
              <span>Low</span>
              <span className="h-2.5 flex-1 rounded-full" style={{ background: "linear-gradient(90deg,#ffffcc,#fee090,#fc8d59,#d73027,#7f0000)" }} />
              <span>High</span>
            </div>
          </div>
          <div>
            <table className="w-full text-left text-[12.5px]">
              <thead><tr className="border-b text-[10px] uppercase tracking-wide text-slate-400"><th className="py-1.5">#</th><th>District</th><th className="text-right">{g.metricUnit}</th></tr></thead>
              <tbody>
                {g.districtTable.map((d) => (
                  <tr key={d.district} className="border-b border-slate-50 hover:bg-blue-50/40">
                    <td className="py-1.5 text-slate-400">{d.rank}</td>
                    <td className="flex items-center gap-2 py-1.5"><span className="h-3 w-3 rounded-full" style={{ background: heatColor(d.value / maxD) }} />{d.district}</td>
                    <td className="py-1.5 text-right font-bold">{d.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 flex justify-between border-t pt-2 text-[14px] font-bold" style={{ color: NAVY }}>
              <span>Total ({g.metricUnit})</span><span>{g.achieved.split("·")[0].trim()}</span>
            </div>
          </div>
        </div>
      </ExpandablePanel>

      {/* CHART ROW 1 */}
      <div id={isTravel ? "priyadarshini-usage" : undefined} className={`grid scroll-mt-20 gap-4 md:grid-cols-2 ${isTravel ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}>
        <ExpandablePanel title={isTravel ? "Average Daily Free Trips · 24-Month Trend" : "Monthly Trend"}><TrendLine data={g.trendBeneficiaries} color={g.theme} height={190} /></ExpandablePanel>
        <ExpandablePanel title={isTravel ? "Travel Purpose" : "Category Split"}>
          <Donut data={g.purposeSplit} height={150} />
          <div className="mt-2"><Legend data={g.purposeSplit} /></div>
        </ExpandablePanel>
        {!isTravel && <ExpandablePanel title="Top Performing Districts"><Bars data={g.topDistricts} color={g.theme} height={220} /></ExpandablePanel>}
        <ExpandablePanel title={isTravel ? "Service Type Split" : "Split"}>
          <div className="space-y-3 pt-1">
            {g.categorySplit.map((c) => (
              <div key={c.label} className="flex items-center gap-2.5">
                <span className="icon-circle shadow-sm" style={{ background: c.color, width: 34, height: 34 }}><FilledIcon name={splitIconName(c.label)} size={17} /></span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[12px]"><span className="font-semibold text-slate-600">{c.label}</span><span className="font-extrabold" style={{ color: c.color }}>{c.value}%</span></div>
                  <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${c.value}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="h-full rounded-full" style={{ background: c.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ExpandablePanel>
      </div>

      {/* CHART ROW 2 */}
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr_1.1fr]">
        <ExpandablePanel title="Beneficiary Segments">
          <Donut data={g.segments} height={160} />
          <div className="mt-2"><Legend data={g.segments} /></div>
        </ExpandablePanel>

        {/* Average Support — background image */}
        <div className="card relative flex flex-col overflow-hidden p-4">
          <img src="/img/cards/savings.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.53]" />
          <div className="relative flex flex-1 flex-col">
            <h3 className="display mb-2 text-center text-[15px] font-bold" style={{ color: NAVY }}>Average Support per Beneficiary</h3>
            <p className="display text-4xl font-extrabold" style={{ color: NAVY }}>{g.avgSupport.value}</p>
            <p className="mb-3 text-[12px] text-slate-500">{g.avgSupport.label}</p>
            <div className="mt-auto flex items-center gap-3">
              <span className="icon-circle" style={{ background: "#16a34a", width: 56, height: 56 }}><FilledIcon name="PiggyBank" size={26} /></span>
              <div className="flex-1 rounded-lg border border-green-200 bg-green-50/90 px-3 py-2 text-center">
                <p className="text-[11px] text-slate-500">Annual support</p>
                <p className="text-lg font-bold text-green-600">{(g.avgSupport.sub.match(/₹[\d,]+/) || [g.avgSupport.sub])[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cumulative — background image */}
        <div className="card relative flex flex-col overflow-hidden p-4">
          <img src="/img/cards/cumulative.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.53]" />
          <div className="relative">
            <h3 className="display mb-2 text-center text-[15px] font-bold" style={{ color: NAVY }}>{isTravel ? "Cumulative Support for Women in Kerala · 2 Years" : "Cumulative Support Over 2 Years"}</h3>
            <p className="display text-3xl font-extrabold text-green-600">{g.cumulative.value}</p>
            <p className="mb-3 text-[12px] text-slate-500">{g.cumulative.label}</p>
            <ul className="space-y-2 text-[12px]">
              {g.cumulative.points.map((p) => (
                <li key={p.label} className="flex items-center gap-2 text-slate-600">
                  <span className="icon-circle" style={{ background: g.theme, width: 26, height: 26 }}><FilledIcon name={p.icon} size={13} /></span>{p.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BENEFICIARY JOURNEY — not shown for travel-type schemes (KSRTC) */}
      {showJourney && (
        <ExpandablePanel title="Beneficiary Journey · Application → Verification → Approval → Disbursement → Grievance → Closure" center={false}>
          <div className="flex items-end justify-between gap-1.5">
            {g.journey.map((j) => (
              <div key={j.stage} className="flex flex-1 flex-col items-center">
                <div className="display text-[13px] font-extrabold" style={{ color: j.stage === "Grievance" ? RAG_HEX.amber : g.theme }}>{j.value}%</div>
                <div className="mt-1 flex w-full items-end justify-center" style={{ height: 90 }}>
                  <motion.div initial={{ height: 0 }} whileInView={{ height: `${j.value}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                    className="w-full max-w-[44px] rounded-t-md" style={{ background: j.stage === "Grievance" ? RAG_HEX.amber : g.theme, opacity: 0.85 }} />
                </div>
                <div className="mt-1 text-center text-[10px] font-semibold text-slate-500">{j.stage}</div>
              </div>
            ))}
          </div>
        </ExpandablePanel>
      )}

      {/* OUTCOMES + OPERATIONAL */}
      <div className="card p-5">
        <div className={isTravel ? "" : "grid gap-6 lg:grid-cols-2"}>
          <div>
            <h3 className="display mb-4 text-xl font-bold" style={{ color: NAVY }}>Key Outcomes After 2 Years</h3>
            <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${isTravel ? "lg:grid-cols-5" : ""}`}>
              {g.outcomes.map((o) => (
                <div key={o.label} className="flex flex-col items-center gap-2 rounded-xl bg-blue-50 p-3 text-center">
                  <span className="icon-circle" style={{ background: o.color, width: 40, height: 40 }}><FilledIcon name={o.icon} size={20} /></span>
                  <p className="text-[11px] font-semibold text-slate-600">{o.label}</p>
                </div>
              ))}
            </div>
          </div>
          {!isTravel && <div>
            <h3 className="display mb-4 text-xl font-bold text-amber-600">Operational Snapshot</h3>
            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
              {g.operational.map((o) => (
                <div key={o.label} className="rounded-xl bg-amber-50 p-3">
                  <span className="icon-circle mx-auto mb-1.5" style={{ background: g.theme, width: 36, height: 36 }}><FilledIcon name={o.icon} size={18} /></span>
                  <p className="display text-xl font-extrabold" style={{ color: g.theme }}>{o.value}</p>
                  <p className="text-[10px] leading-tight text-slate-500">{o.label}</p>
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>

      {/* FOOTER / NEXT FOCUS */}
      {!isTravel && <div className="relative overflow-hidden rounded-2xl">
        <img src="/img/footer.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(8,20,45,0.62),rgba(8,20,45,0.74))" }} />
        <div className="relative p-5 sm:p-8">
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/95 p-4 text-center">
              <span className="icon-circle" style={{ background: NAVY, width: 48, height: 48 }}><FilledIcon name="TrendingUp" size={24} /></span>
              <p className="font-bold" style={{ color: NAVY }}>Next Focus / Action Points</p>
            </div>
            {g.nextFocus.map((n, i) => (
              <div key={n.title} className="flex flex-col gap-2 rounded-xl bg-white/95 p-4">
                <img src={FOCUS_IMG[i % 3]} alt="" className="h-24 w-full rounded-lg object-cover" />
                <p className="flex items-center gap-1.5 text-sm font-bold" style={{ color: FOCUS_COLOR[i % 3] }}><FilledIcon name={n.icon} size={16} /> {n.title}</p>
                <p className="text-[11px] text-slate-500">{n.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <p className="text-sm text-white/80">Together for</p>
            <p className="display text-2xl font-extrabold text-amber-400">a Progressive Kerala</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Indira Guarantee · ഇന്ദിര ഗ്യാരണ്ടി</div>
          </div>
        </div>
      </div>}
    </div>
  );
}

function IconCircle({ color, icon, size = 48 }: { color: string; icon: string; size?: number }) {
  return <span className="icon-circle shadow-sm" style={{ background: color, width: size, height: size }}><FilledIcon name={icon} size={Math.round(size * 0.46)} /></span>;
}
function SubHeading({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-md" style={{ background: `${color === NAVY ? "rgba(28,63,124,0.1)" : "rgba(224,36,94,0.1)"}`, color }}><Icon name={icon} size={14} /></span>
      <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color }}>{text}</span>
    </div>
  );
}
function Chip({ icon, text }: { icon: string; text: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"><Icon name={icon} size={12} /> {text}</span>;
}

function DistanceSlabChart({ analytics }: { analytics: NonNullable<Guarantee["travelAnalytics"]> }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between rounded-xl bg-violet-50 px-3 py-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-violet-500">All recorded free trips</p>
          <p className="display text-xl font-extrabold" style={{ color: NAVY }}>{analytics.totalTrips}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500">Weighted average</p>
          <p className="display text-lg font-extrabold text-violet-600">{analytics.averageDistance}</p>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        {analytics.distanceSlabs.map((slab) => (
          <div key={slab.label}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-[12px]">
              <span className="font-semibold text-slate-600">{slab.label}</span>
              <span className="flex items-center gap-2">
                <span className="text-slate-500">{slab.count}</span>
                <span className="min-w-9 text-right font-extrabold" style={{ color: slab.color }}>{slab.percent}%</span>
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100" aria-label={`${slab.label}: ${slab.count}, ${slab.percent}%`}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${slab.percent}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="h-full rounded-full" style={{ background: slab.color }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-slate-100 pt-3 text-[10px] leading-relaxed text-slate-500">Count and share of validated passenger trips. Distance is measured from boarding to alighting stop.</p>
    </div>
  );
}

function GenderOccupancyChart({ data }: { data: NonNullable<Guarantee["travelAnalytics"]>["genderOccupancy"] }) {
  const [region, setRegion] = useState<"All" | "South" | "Central" | "North">("All");
  const [view, setView] = useState<"both" | "women" | "men">("both");
  const [sortBy, setSortBy] = useState<"district" | "women" | "men">("district");
  const visibleRows = data
    .filter((row) => region === "All" || row.region === region)
    .sort((a, b) => sortBy === "district" ? a.district.localeCompare(b.district) : b[sortBy] - a[sortBy]);
  const womenAverage = Math.round(visibleRows.reduce((sum, row) => sum + row.women, 0) / visibleRows.length);
  const menAverage = 100 - womenAverage;

  return (
    <div>
      <div className="mb-4 grid gap-3 lg:grid-cols-[auto_1fr]">
        <div className="flex items-stretch gap-2">
          <div className="min-w-24 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-violet-500">Women avg.</p>
            <p className="display text-xl font-extrabold text-violet-600">{womenAverage}%</p>
          </div>
          <div className="min-w-24 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-blue-500">Men avg.</p>
            <p className="display text-xl font-extrabold text-blue-600">{menAverage}%</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FilterSelect label="Region" value={region} onChange={(value) => setRegion(value as typeof region)} options={["All", "South", "Central", "North"]} />
          <FilterSelect label="View" value={view} onChange={(value) => setView(value as typeof view)} options={["both", "women", "men"]} optionLabels={{ both: "Women + Men", women: "Women only", men: "Men only" }} />
          <FilterSelect label="Sort" value={sortBy} onChange={(value) => setSortBy(value as typeof sortBy)} options={["district", "women", "men"]} optionLabels={{ district: "District A–Z", women: "Women highest", men: "Men highest" }} />
        </div>
      </div>

      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
        <span>{visibleRows.length} districts · passenger mix from recorded boardings</span>
        <span className="flex items-center gap-3 font-semibold">
          {(view === "both" || view === "women") && <span className="flex items-center gap-1.5 text-violet-600"><span className="h-2.5 w-2.5 rounded-sm bg-violet-500" />Women</span>}
          {(view === "both" || view === "men") && <span className="flex items-center gap-1.5 text-blue-600"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />Men</span>}
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        {view === "both" ? (
          <div className="min-w-[690px] space-y-1.5">
            <div className="grid grid-cols-[1fr_168px_1fr] gap-3 px-1 text-[9px] font-semibold text-slate-400">
              <OccupancyScale reverse />
              <span className="self-end text-center font-bold uppercase tracking-wider">District</span>
              <OccupancyScale />
            </div>
            <div className="grid grid-cols-[1fr_168px_1fr] gap-3 px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span className="text-right text-violet-500">Women occupancy</span>
              <span />
              <span className="text-blue-500">Men occupancy</span>
            </div>
            {visibleRows.map((row, i) => (
              <div key={row.district} className="grid grid-cols-[1fr_168px_1fr] items-center gap-3 rounded-lg px-1 py-1.5 hover:bg-slate-50">
                <div className="flex items-center justify-end gap-2">
                  <span className="w-9 text-right text-[11px] font-extrabold text-violet-600">{row.women}%</span>
                  <div className="flex h-4 flex-1 justify-end overflow-hidden rounded-l-full bg-slate-100">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.women}%` }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.025 }}
                      className="h-full rounded-l-full bg-violet-500" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-slate-700">{row.district}</p>
                  <p className="text-[9px] uppercase tracking-wide text-slate-400">{row.region}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 flex-1 overflow-hidden rounded-r-full bg-slate-100">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.men}%` }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.025 }}
                      className="h-full rounded-r-full bg-blue-500" />
                  </div>
                  <span className="w-9 text-[11px] font-extrabold text-blue-600">{row.men}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-w-[560px] space-y-2">
            <div className="grid grid-cols-[168px_1fr_44px] items-end gap-3 px-1 text-[9px] font-semibold text-slate-400">
              <span className="font-bold uppercase tracking-wider">District</span>
              <OccupancyScale />
              <span />
            </div>
            {visibleRows.map((row, i) => {
              const value = row[view];
              const colorClass = view === "women" ? "bg-violet-500" : "bg-blue-500";
              const textClass = view === "women" ? "text-violet-600" : "text-blue-600";
              return (
                <div key={row.district} className="grid grid-cols-[168px_1fr_44px] items-center gap-3 rounded-lg px-1 py-1.5 hover:bg-slate-50">
                  <div><p className="text-[11px] font-bold text-slate-700">{row.district}</p><p className="text-[9px] uppercase tracking-wide text-slate-400">{row.region}</p></div>
                  <div className="h-5 overflow-hidden rounded-full bg-slate-100" aria-label={`${row.district}: ${value}% ${view} occupancy`}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.025 }} className={`h-full rounded-full ${colorClass}`} />
                  </div>
                  <span className={`text-right text-[12px] font-extrabold ${textClass}`}>{value}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, optionLabels = {} }: { label: string; value: string; onChange: (value: string) => void; options: string[]; optionLabels?: Record<string, string> }) {
  return (
    <label className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-1.5">
      <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full bg-transparent text-[10px] font-bold text-slate-600 outline-none" aria-label={`Filter occupancy by ${label.toLowerCase()}`}>
        {options.map((option) => <option key={option} value={option}>{optionLabels[option] || option}</option>)}
      </select>
    </label>
  );
}

function OccupancyScale({ reverse = false }: { reverse?: boolean }) {
  const values = reverse ? [100, 75, 50, 25, 0] : [0, 25, 50, 75, 100];
  return <span className="flex justify-between">{values.map((value) => <span key={value}>{value}</span>)}</span>;
}

function TravelFinancials({ data, snapshotDate }: { data: NonNullable<Guarantee["travelAnalytics"]>["financials"]; snapshotDate: string }) {
  const [periodId, setPeriodId] = useState<"day" | "week" | "month" | "year">("month");
  const period = data.revenuePeriods.find((item) => item.id === periodId) || data.revenuePeriods[0];
  const freeShare = period.freeTicketAmountCr / period.totalRevenueCr * 100;
  const paidShare = 100 - freeShare;
  const change = (period.totalRevenueCr - period.previousRevenueCr) / period.previousRevenueCr * 100;
  const settlement = data.governmentSettlement;
  const disbursedShare = settlement.disbursedCr / settlement.liabilityCr * 100;
  const comparisonMax = Math.max(period.totalRevenueCr, period.previousRevenueCr);

  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} className="card overflow-hidden p-0">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-violet-50 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="icon-circle" style={{ background: "#168a5b", width: 42, height: 42 }}><FilledIcon name="IndianRupee" size={21} /></span>
            <div>
              <h3 className="display text-lg font-extrabold" style={{ color: NAVY }}>Financials · Revenue & Government Settlement</h3>
              <p className="mt-0.5 text-[11px] text-slate-500">Paid-ticket receipts plus the certified value of free tickets issued to women</p>
            </div>
          </div>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-900">Illustrative snapshot · {snapshotDate}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Revenue reporting period">
          {data.revenuePeriods.map((item) => {
            const active = item.id === period.id;
            return (
              <button key={item.id} type="button" onClick={() => setPeriodId(item.id)} aria-pressed={active}
                className={`rounded-xl border px-3 py-2 text-left transition ${active ? "border-emerald-500 bg-emerald-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"}`}>
                <span className={`block text-[9px] font-bold uppercase tracking-wider ${active ? "text-white/70" : "text-slate-400"}`}>{item.label}</span>
                <span className="display mt-0.5 block text-[15px] font-extrabold">{formatCr(item.totalRevenueCr)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <FinancialMetric icon="Coins" label="Total Revenue" value={formatCr(period.totalRevenueCr)} sub={`${period.currentLabel} · ${formatSignedPercent(change)} vs ${period.previousLabel.toLowerCase()}`} color="#168a5b" />
          <FinancialMetric icon="Wallet" label="Paid-ticket Revenue" value={formatCr(period.paidRevenueCr)} sub={`${paidShare.toFixed(1)}% of total revenue`} color="#2f7df6" />
          <FinancialMetric icon="Ticket" label="Free Tickets Issued" value={period.freeTickets} sub={`${period.currentLabel} validated tickets`} color="#7c5cff" />
          <FinancialMetric icon="IndianRupee" label="Free-ticket Value" value={formatCr(period.freeTicketAmountCr)} sub={`${freeShare.toFixed(1)}% of total revenue`} color="#f5821f" />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div><h4 className="display text-[14px] font-bold" style={{ color: NAVY }}>Revenue Trend & Comparison</h4><p className="text-[10px] text-slate-500">All values in ₹ crore</p></div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">{formatSignedPercent(change)}</span>
            </div>
            <TrendLine data={period.trend} color="#168a5b" height={175} />
            <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
              <ComparisonBar label={period.currentLabel} value={period.totalRevenueCr} max={comparisonMax} color="#168a5b" />
              <ComparisonBar label={period.previousLabel} value={period.previousRevenueCr} max={comparisonMax} color="#94a3b8" />
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold text-slate-500"><span>Revenue composition</span><span>{paidShare.toFixed(1)}% paid · {freeShare.toFixed(1)}% free-ticket value</span></div>
              <div className="flex h-3 overflow-hidden rounded-full bg-slate-100"><span className="bg-blue-500" style={{ width: `${paidShare}%` }} /><span className="bg-orange-400" style={{ width: `${freeShare}%` }} /></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2"><div><h4 className="display text-[14px] font-bold" style={{ color: NAVY }}>Government Liability to KSRTC</h4><p className="text-[10px] text-slate-500">Certified free-ticket claims · cumulative 2 years</p></div><span className="rounded-full bg-amber-100 px-2 py-1 text-[9px] font-bold text-amber-700">Settlement ledger</span></div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <SettlementMetric label="Total Liability" value={formatCr(settlement.liabilityCr)} color="#1c3f7c" />
              <SettlementMetric label="Disbursed" value={formatCr(settlement.disbursedCr)} color="#16a34a" />
              <SettlementMetric label="Pending" value={formatCr(settlement.pendingCr)} color="#f5821f" />
              <SettlementMetric label="Under Verification" value={formatCr(settlement.underVerificationCr)} color="#7c5cff" />
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between text-[11px]"><span className="font-semibold text-slate-600">Liability disbursed</span><span className="font-extrabold text-green-600">{disbursedShare.toFixed(1)}%</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-orange-100"><motion.div initial={{ width: 0 }} whileInView={{ width: `${disbursedShare}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-green-500" /></div>
              <div className="mt-1.5 flex justify-between text-[9px] text-slate-400"><span>{formatCr(settlement.disbursedCr)} settled</span><span>{formatCr(settlement.pendingCr)} pending</span></div>
            </div>
            <dl className="mt-3 divide-y divide-slate-100 text-[10.5px]">
              <div className="flex items-center justify-between gap-3 py-2"><dt className="text-slate-500">Latest disbursement</dt><dd className="text-right font-bold text-slate-700">{settlement.latestDisbursement}</dd></div>
              <div className="flex items-center justify-between gap-3 py-2"><dt className="text-slate-500">Next settlement due</dt><dd className="text-right font-bold text-slate-700">{settlement.nextSettlementDue}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FinancialMetric({ icon, label, value, sub, color }: { icon: string; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2"><span className="icon-circle" style={{ background: color, width: 32, height: 32 }}><FilledIcon name={icon} size={16} /></span><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p></div>
      <p className="display mt-2 text-2xl font-extrabold" style={{ color: NAVY }}>{value}</p>
      <p className="mt-1 text-[10px] leading-tight text-slate-500">{sub}</p>
    </div>
  );
}

function SettlementMetric({ label, value, color }: { label: string; value: string; color: string }) {
  return <div className="rounded-xl border border-slate-100 p-3"><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="display mt-1 text-lg font-extrabold" style={{ color }}>{value}</p></div>;
}

function ComparisonBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr_auto] items-center gap-2 text-[10px]">
      <span className="truncate font-semibold text-slate-500">{label}</span>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${value / max * 100}%`, background: color }} /></div>
      <span className="min-w-20 text-right font-extrabold text-slate-700">{formatCr(value)}</span>
    </div>
  );
}

function formatCr(value: number) {
  return `₹${value >= 1000 ? value.toLocaleString("en-IN", { maximumFractionDigits: 0 }) : value.toLocaleString("en-IN", { minimumFractionDigits: value < 10 ? 2 : 0, maximumFractionDigits: 2 })} Cr`;
}

function formatSignedPercent(value: number) {
  return `${value >= 0 ? "↑" : "↓"} ${Math.abs(value).toFixed(1)}%`;
}
