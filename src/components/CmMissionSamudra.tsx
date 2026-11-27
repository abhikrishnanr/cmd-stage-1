import Link from "next/link";
import { Anchor, ArrowRight, ArrowUpRight, ClipboardCheck, Ship, TrendingUp } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { missionSamudraCheckedAt, missionSamudraMilestones, missionSamudraQuarterVolumes, missionSamudraShipment, missionSamudraVolumeChange } from "@/data/missionSamudraActuals";

const [, latestQuarter] = missionSamudraQuarterVolumes;
const volume = [
  { period: `${latestQuarter.quarter} 2025`, thousands: latestQuarter.previousThousands },
  { period: `${latestQuarter.quarter} 2026`, thousands: latestQuarter.latestThousands },
];
const chartMaximum = 400;
const change = missionSamudraVolumeChange(latestQuarter.previousThousands, latestQuarter.latestThousands);
const number = new Intl.NumberFormat("en-IN");
const shipment = missionSamudraShipment;
const milestones = missionSamudraMilestones.slice(-3);
const sources = [latestQuarter.source, ...milestones.map(({ source }) => source)].map((source) => ({ ...source, fetchedAt: missionSamudraCheckedAt }));

export function CmMissionSamudra() {
  return (
    <section aria-labelledby="cm-samudra-title" className="rounded-3xl border border-teal-200 bg-white shadow-sm">
      <header className="relative isolate rounded-t-3xl bg-[linear-gradient(115deg,#102d4e,#0c5470_72%,#137b89)] p-4 text-white sm:px-6 sm:py-5">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 rounded-tr-3xl bg-[url('/img/projects/mission-samudra.png')] bg-cover bg-center opacity-40 [mask-image:linear-gradient(to_right,transparent,black_55%)]" />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/25 bg-white/15" aria-hidden="true"><Anchor size={21} /></span>
            <div>
              <h2 id="cm-samudra-title" className="display text-xl font-extrabold sm:text-2xl">Mission Samudra</h2>
              <p className="text-xs font-medium text-cyan-50">Ports and coastal logistics</p>
            </div>
          </div>
          <CmSourceDetails sources={sources} inverted label="Mission Samudra sources" />
        </div>
      </header>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <figure aria-labelledby="cm-samudra-volume" className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <figcaption id="cm-samudra-volume" className="font-extrabold text-slate-900">Vizhinjam container throughput</figcaption>
              <p className="mt-0.5 text-xs text-slate-600">Same quarter, year over year · thousand TEU</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-900"><TrendingUp size={14} aria-hidden="true" /> About {change}% higher</span>
          </div>
          <ul className="mt-4 grid gap-3">
            {volume.map((row, index) => (
              <li key={row.period}>
                <div className="mb-1 flex items-center justify-between gap-2 text-xs text-slate-700">
                  <span>{row.period}</span>
                  <strong className="tabular-nums">{number.format(row.thousands)}</strong>
                </div>
                <div aria-hidden="true" className="h-3 rounded-full bg-sky-100">
                  <div className={`h-full rounded-full ${index === 0 ? "bg-sky-500" : "bg-gradient-to-r from-teal-600 to-cyan-600"}`} style={{ width: `${row.thousands / chartMaximum * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mt-1 flex justify-between text-[0.65rem] tabular-nums text-slate-600"><span>0</span><span>200</span><span>{chartMaximum}</span></div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">TEU measures twenty-foot container equivalents. Figures cover all containers handled at the port.</p>
        </figure>

        <div className="rounded-2xl border border-teal-100 bg-white p-4">
          <h3 className="flex items-center gap-2 font-extrabold text-slate-900"><Ship size={17} aria-hidden="true" className="text-teal-700" /> Vizhinjam to Kottayam</h3>
          <p className="mt-1 text-xs font-semibold text-teal-800">Import shipment announced · <time dateTime={shipment.dateTime}>{shipment.date}</time></p>
          <dl className="mt-3 flex flex-wrap gap-2">
            <div className="flex-1 rounded-xl border border-teal-100 bg-teal-50 p-2.5"><dt className="text-xs text-teal-950">Containers</dt><dd className="text-xl font-extrabold tabular-nums text-teal-800">{number.format(shipment.containers)}</dd></div>
            <div className="flex-1 rounded-xl border border-teal-100 bg-teal-50 p-2.5"><dt className="text-xs text-teal-950">Natural rubber</dt><dd className="text-xl font-extrabold tabular-nums text-teal-800">~{number.format(shipment.approximateTonnes)} t</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">The shipment is split across {shipment.groups} bills of lading for customs clearance at Kottayam Inland Container Depot before onward delivery to Kochi.</p>
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-950">
            <ClipboardCheck size={16} className="mt-0.5 shrink-0 text-amber-800" aria-hidden="true" />
            <p><strong>For review</strong> · Confirm the number cleared at Kottayam and measure port-to-warehouse time to assess the route.</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-extrabold text-slate-900">Reported milestones</h3>
          <ol className="mt-2 grid gap-2 sm:grid-cols-3">
            {milestones.map((milestone) => (
              <li key={milestone.dateTime} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-600" aria-hidden="true" />
                <div>
                  <time dateTime={milestone.dateTime} className="block text-xs font-bold text-teal-800">{milestone.date}</time>
                  <p className="text-xs leading-relaxed text-slate-700">{milestone.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs sm:px-5">
        <Link href="/dream-projects/mission-samudra" className="inline-flex items-center gap-1.5 font-extrabold text-teal-800 underline-offset-2 hover:underline">Mission details <ArrowRight size={14} aria-hidden="true" /></Link>
        <Link href="/projects#project-vizhinjam-exim" className="inline-flex items-center gap-1.5 font-semibold text-slate-600 underline-offset-2 hover:underline">Vizhinjam project record <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </footer>
    </section>
  );
}
