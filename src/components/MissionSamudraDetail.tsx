import Link from "next/link";
import { Anchor, ArrowLeft, ArrowRight, Container, FileCheck2, Ship, TrainFront, TrendingUp } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import type { DataProvenance } from "@/components/DataProvenance";
import {
  missionSamudraCheckedAt,
  missionSamudraMilestones,
  missionSamudraQuarterVolumes,
  missionSamudraShipment,
  missionSamudraSources,
  missionSamudraVolumeChange,
} from "@/data/missionSamudraActuals";

const formatNumber = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });
const [firstQuarter, secondQuarter] = missionSamudraQuarterVolumes;
const chartMaximum = 400;
const shipment = missionSamudraShipment;

const routeStops = [
  { title: "Vizhinjam Seaport", detail: "Import entry point agreed for the consignment.", icon: Ship },
  { title: "Kottayam inland depot", detail: "Customs inspection and clearance planned here.", icon: FileCheck2 },
  { title: "Kochi warehouse", detail: "Onward delivery after customs release.", icon: Anchor },
];

function SourceInfo({ label, sources }: { label: string; sources: readonly DataProvenance[] }) {
  return <CmSourceDetails label={label} sources={sources.map((source) => ({ ...source, fetchedAt: missionSamudraCheckedAt }))} />;
}

export function MissionSamudraDetail() {
  return (
    <div className="space-y-5 p-4 sm:p-5">
      <header className="relative isolate rounded-3xl bg-[linear-gradient(115deg,#102d4e,#0c5470_72%,#137b89)] px-5 py-6 text-white sm:px-8 sm:py-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-3/5 rounded-r-3xl bg-[url('/img/projects/mission-samudra.png')] bg-cover bg-center opacity-45 [mask-image:linear-gradient(to_right,transparent,black_60%)]" />
        <Link href="/dashboard-cm#mission-samudra" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-100 underline-offset-2 hover:underline"><ArrowLeft size={14} aria-hidden="true" /> CM Dashboard</Link>
        <h1 className="display mt-3 text-3xl font-black tracking-tight sm:text-5xl">Mission Samudra</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-cyan-50">Vizhinjam operations, coastal logistics and milestones for Kerala’s maritime programme.</p>
        <nav className="mt-5 flex flex-wrap gap-2 text-xs font-bold" aria-label="Mission Samudra topics">
          {[{ id: "port-operations", label: "Port operations" }, { id: "kottayam-route", label: "Kottayam route" }, { id: "mission-milestones", label: "Milestones" }, { id: "mission-follow-up", label: "Follow-up" }].map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="inline-flex rounded-lg border border-white/30 bg-white/10 px-3 py-2 hover:bg-white/25">{label}</a>
          ))}
        </nav>
      </header>

      <div className="grid gap-4 xl:grid-cols-2">
        <section id="port-operations" aria-labelledby="mission-throughput-title" className="scroll-mt-24 rounded-3xl border border-sky-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="mission-throughput-title" className="display text-lg font-extrabold text-slate-900">Vizhinjam container throughput</h2>
              <p className="mt-1 text-xs text-slate-600">Same-quarter comparisons · thousand TEU</p>
            </div>
            <SourceInfo label="Vizhinjam throughput sources" sources={[firstQuarter.source, secondQuarter.source]} />
          </div>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {missionSamudraQuarterVolumes.map((row) => (
              <figure key={row.quarter} className="rounded-2xl border border-sky-100 bg-sky-50/70 p-3">
                <figcaption className="flex flex-wrap items-center justify-between gap-1.5">
                  <strong className="text-sm text-slate-900">{row.quarter}</strong>
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-950"><TrendingUp size={13} aria-hidden="true" /> About {missionSamudraVolumeChange(row.previousThousands, row.latestThousands)}% higher</span>
                </figcaption>
                <dl className="mt-3 space-y-2">
                  {[{ year: 2025, value: row.previousThousands, color: "bg-sky-500" }, { year: 2026, value: row.latestThousands, color: "bg-teal-600" }].map((bar) => (
                    <div key={bar.year}>
                      <div className="flex justify-between gap-3 text-xs text-slate-700">
                        <dt>{bar.year}</dt><dd className="font-bold tabular-nums">{formatNumber.format(bar.value)}</dd>
                      </div>
                      <div aria-hidden="true" className="mt-1 h-3 rounded-full bg-sky-100"><div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value / chartMaximum * 100}%` }} /></div>
                    </div>
                  ))}
                </dl>
                <div aria-hidden="true" className="mt-1 flex justify-between text-[11px] text-slate-600"><span>0</span><span>200</span><span>{chartMaximum}</span></div>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">Growth was stronger in July–September. The figures include transshipment. Use a separate count of direct imports and exports to assess local trade.</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">TEU means twenty-foot equivalent unit. The operator publishes April–June to one decimal place and July–September to the nearest thousand TEU.</p>
        </section>

        <section id="kottayam-route" aria-labelledby="mission-route-title" className="scroll-mt-24 rounded-3xl border border-teal-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="mission-route-title" className="display text-lg font-extrabold text-slate-900">Vizhinjam–Kottayam cargo route</h2>
              <p className="mt-1 text-xs text-slate-600">Shipment announced <time dateTime={shipment.dateTime}>{shipment.date}</time></p>
            </div>
            <SourceInfo label="Kottayam shipment source" sources={[missionSamudraSources.route]} />
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2">
            {[{ value: formatNumber.format(shipment.containers), label: "Containers" }, { value: `~${formatNumber.format(shipment.approximateTonnes)} t`, label: "Natural rubber" }, { value: formatNumber.format(shipment.groups), label: "Bills of lading" }].map(({ value, label }) => (
              <div key={label} className="rounded-xl bg-teal-50 p-2 text-teal-950 sm:p-3"><dt className="text-xs font-semibold">{label}</dt><dd className="mt-0.5 text-lg font-black tabular-nums text-teal-800 sm:text-xl">{value}</dd></div>
            ))}
          </dl>
          <ol className="mt-4 grid gap-2 sm:grid-cols-3">
            {routeStops.map(({ title, detail, icon: Icon }, index) => (
              <li key={title} className="relative rounded-xl border border-teal-100 p-2.5 sm:p-3">
                <Icon size={16} aria-hidden="true" className="text-teal-800" />
                <h3 className="mt-1 text-xs font-extrabold text-slate-900">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>
                {index < routeStops.length - 1 && <ArrowRight size={13} className="absolute -right-3 top-3 z-10 hidden rounded-full bg-white text-teal-800 sm:block" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">I&amp;PRD identified a potential benefit for local exporters from reusing empty import containers at Kottayam. Compare actual reuse and turnaround before assessing the benefit.</p>
        </section>
      </div>

      <section id="mission-milestones" aria-labelledby="mission-milestones-title" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 id="mission-milestones-title" className="display text-lg font-extrabold text-slate-900">Reported milestones</h2>
        <ol className="mt-4 grid gap-2.5 lg:grid-cols-2">
          {[...missionSamudraMilestones].reverse().map((milestone) => (
            <li key={milestone.dateTime} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-3">
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <time dateTime={milestone.dateTime} className="font-bold text-slate-700">{milestone.date}</time>
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 font-semibold text-sky-950">{milestone.status}</span>
                </div>
                <h3 className="mt-2 text-sm font-extrabold text-slate-900">{milestone.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{milestone.detail}</p>
              </div>
              <SourceInfo label={`${milestone.title} source`} sources={[milestone.source]} />
            </li>
          ))}
        </ol>
      </section>

      <section id="mission-follow-up" aria-labelledby="mission-follow-up-title" className="scroll-mt-24 rounded-3xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5">
        <h2 id="mission-follow-up-title" className="display text-lg font-extrabold text-amber-950">Follow-up for review</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <article className="flex items-start justify-between gap-2 rounded-xl border border-amber-100 bg-white p-3">
            <div>
              <h3 className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900"><Container size={16} aria-hidden="true" className="text-amber-800" /> Measure the first shipment</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">Ask for containers cleared, port-to-warehouse elapsed time and empties reused after delivery.</p>
            </div>
            <SourceInfo label="First shipment review source" sources={[missionSamudraSources.route]} />
          </article>
          <article className="flex items-start justify-between gap-2 rounded-xl border border-amber-100 bg-white p-3">
            <div>
              <h3 className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900"><TrainFront size={16} aria-hidden="true" className="text-amber-800" /> Confirm the rail procurement schedule</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">Compare the latest tender and land-readiness milestones with the planned port expansion. The operator reported expansion works started and cited a December 2028 target.</p>
            </div>
            <SourceInfo label="Rail and expansion review sources" sources={[missionSamudraSources.railTender, missionSamudraSources.railSanction, missionSamudraSources.portExpansion]} />
          </article>
        </div>
      </section>
    </div>
  );
}
