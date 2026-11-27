import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { RbmProject } from "@/data/rbm";

export default function RbmProjectDashboard({ project }: { project: RbmProject }) {
  return (
    <div className="space-y-5 p-4 sm:p-6">
      <Link href="/rbm" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:underline"><ArrowLeft size={15} /> RBM programme list</Link>
      <header className="rounded-2xl bg-[linear-gradient(112deg,#17274b,#215675,#147668)] p-6 text-white sm:p-8">
        <p className="text-xs font-bold text-white/80">{project.department}</p>
        <h1 className="display mt-2 text-2xl font-extrabold sm:text-4xl">{project.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85">{project.outcomeStatement}</p>
      </header>
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-base font-extrabold text-slate-900">Programme source</h2>
        {project.source ? (
          <>
            <p className="mt-1 text-sm text-slate-600">{project.source.note}</p>
            <p className="mt-1 text-xs text-slate-600">Source checked 27 Nov 2026</p>
            <a href={project.source.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:underline">
              {project.source.label} <ExternalLink size={15} aria-hidden="true" />
            </a>
          </>
        ) : <p className="mt-1 text-sm text-slate-600">Awaiting a programme-specific source.</p>}
        <Link href={project.deliveryRoute} className="mt-4 block text-sm font-bold text-blue-900 hover:underline">Programme publications and reported milestones</Link>
        {project.priorityRoute && <Link href={project.priorityRoute} className="mt-4 block text-sm font-bold text-blue-900 hover:underline">Open the priority programme workbook and reporting forms</Link>}
      </section>
    </div>
  );
}
