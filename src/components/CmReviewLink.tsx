import { ArrowUpRight, ClipboardList } from "lucide-react";
import Link from "next/link";

export function CmReviewLink() {
  return (
    <Link href="/cm-review" className="group flex flex-wrap items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50/70 px-4 py-3 text-[#163858] transition hover:border-teal-500 hover:bg-teal-50 sm:flex-nowrap">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#116d68] text-white"><ClipboardList size={19} aria-hidden="true" /></span>
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-extrabold">CM Review</h2>
        <p className="text-xs leading-relaxed text-slate-700">Open the briefing for department follow-up, jobs, power and district services.</p>
      </div>
      <ArrowUpRight size={18} className="shrink-0 text-[#116d68]" aria-hidden="true" />
    </Link>
  );
}
