import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { rbmProjects } from "@/data/rbm";

export default function RbmPortfolio() {
  return (
    <div className="space-y-5 p-4 sm:p-6">
      <header className="rounded-2xl bg-[linear-gradient(112deg,#17274b,#215675,#147668)] p-6 text-white sm:p-8">
        <h1 className="display text-3xl font-extrabold sm:text-4xl">Results-Based Management</h1>
        <p className="mt-2 text-sm text-white/80">Programme references and original publications.</p>
        <Link href="/rbm-new" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-bold text-blue-900">Priority programme workbooks <ArrowUpRight size={14} /></Link>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rbmProjects.map((project) => (
          <li key={project.slug} className="rounded-2xl border border-slate-200 bg-white p-4">
            <FileText size={20} className="text-teal-800" aria-hidden="true" />
            <h2 className="mt-2 text-base font-extrabold text-slate-900">
              <Link href={"/rbm/" + project.slug} className="inline-flex items-center gap-1.5 hover:underline">{project.shortTitle} <ArrowUpRight size={14} aria-hidden="true" /></Link>
            </h2>
            <p className="mt-1 text-xs font-bold text-slate-600">{project.department}</p>
            <p className="mt-2 text-sm text-slate-700">{project.outcomeStatement}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
