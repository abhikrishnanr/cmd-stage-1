"use client";

import Link from "next/link";
import { rbmNewSchemes } from "@/data/rbm-new";
import { Icon } from "./primitives";

export default function RbmNewPortfolio() {
  return (
    <div className="space-y-5 p-4 sm:p-6">
      <header className="relative overflow-hidden rounded-2xl bg-[linear-gradient(115deg,#082440_0%,#105766_55%,#087a70_100%)] p-6 text-white sm:p-8">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="relative">
          <h1 className="display text-3xl font-black sm:text-4xl">RBM Projects (Priority)</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85">Programme plans, monitoring indicators, source workbooks and evidence forms.</p>
        </div>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        {rbmNewSchemes.map((scheme) => {
          const recorded = scheme.indicators.some((indicator) => typeof indicator.current === "number");
          return (
            <article key={scheme.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5" style={{ background: scheme.color + "13" }}>
                <Icon name={scheme.icon} size={26} style={{ color: scheme.color }} />
                <h2 className="mt-3 text-lg font-extrabold text-slate-900">{scheme.shortTitle}</h2>
                <p className="mt-1 text-sm text-slate-700">{scheme.department} · {scheme.period}</p>
              </div>
              <div className="space-y-3 p-5">
                <p className="text-sm text-slate-700">{scheme.purpose}</p>
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div><dt className="text-xs text-slate-500">Planned activities</dt><dd className="font-bold">{scheme.activities.length}</dd></div>
                  <div><dt className="text-xs text-slate-500">Monitoring indicators</dt><dd className="font-bold">{scheme.indicators.length}</dd></div>
                </dl>
                <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
                  {recorded ? "Recorded score · " + scheme.score + "/100" : "Awaiting verified returns"}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-sm font-bold">
                  <a href={scheme.sourceHref} download className="inline-flex items-center gap-1.5 text-blue-900 hover:underline"><Icon name="FileSpreadsheet" size={16} /> Source workbook</a>
                  <Link href={"/rbm-new/" + scheme.slug} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-white hover:brightness-110" style={{ background: scheme.color }}>Open programme <Icon name="ArrowRight" size={16} /></Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
