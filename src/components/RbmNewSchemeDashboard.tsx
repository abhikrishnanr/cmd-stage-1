"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormField, RevisedScheme, SourceValue } from "@/data/rbm-new-types";
import { Icon } from "./primitives";
import RbmNewProgrammeResults from "./RbmNewProgrammeResults";

type Tab = "overview" | "indicators" | "activities" | "evidence" | "reference";
type FieldValues = Record<string, string>;
type DraftStore = {
  indicators: Record<string, FieldValues>;
  activities: Record<string, FieldValues>;
  evidence: FieldValues;
};

const TABS: { id: Tab; label: string; icon: string; activeClass: string; iconClass: string }[] = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", activeClass: "bg-sky-700 text-white shadow-sm", iconClass: "text-sky-700" },
  { id: "activities", label: "Activities", icon: "Workflow", activeClass: "bg-amber-600 text-white shadow-sm", iconClass: "text-amber-700" },
  { id: "indicators", label: "Indicators", icon: "ListChecks", activeClass: "bg-indigo-700 text-white shadow-sm", iconClass: "text-indigo-700" },
  { id: "evidence", label: "Outcome evidence", icon: "FileCheck2", activeClass: "bg-emerald-700 text-white shadow-sm", iconClass: "text-emerald-700" },
  { id: "reference", label: "Reference", icon: "BookOpenCheck", activeClass: "bg-rose-700 text-white shadow-sm", iconClass: "text-rose-700" },
];

const CHAIN_STAGES = [
  { key: "inputs", label: "Inputs", icon: "WalletCards", number: "01", panelClass: "border-sky-200 bg-sky-50", headingClass: "bg-sky-700 text-white", itemClass: "border-sky-200 text-sky-950" },
  { key: "activities", label: "Activities", icon: "ListChecks", number: "02", panelClass: "border-amber-200 bg-amber-50", headingClass: "bg-amber-500 text-amber-950", itemClass: "border-amber-200 text-amber-950" },
  { key: "outputs", label: "Outputs", icon: "PackageCheck", number: "03", panelClass: "border-indigo-200 bg-indigo-50", headingClass: "bg-indigo-700 text-white", itemClass: "border-indigo-200 text-indigo-950" },
  { key: "outcomes", label: "Outcomes", icon: "TrendingUp", number: "04", panelClass: "border-emerald-200 bg-emerald-50", headingClass: "bg-emerald-700 text-white", itemClass: "border-emerald-200 text-emerald-950" },
  { key: "impact", label: "Impact", icon: "Sparkles", number: "05", panelClass: "border-rose-200 bg-rose-50", headingClass: "bg-rose-700 text-white", itemClass: "border-rose-200 text-rose-950" },
] as const;

const INDICATOR_FIELDS: FormField[] = [
  { key: "latestValue", label: "Enter latest value", type: "text" },
  { key: "changeExplanation", label: "Explain any change", type: "textarea" },
  { key: "evidenceReference", label: "Evidence reference", type: "text" },
  { key: "reportingOfficer", label: "Reporting officer", type: "text" },
  { key: "verifiedBy", label: "Verified by", type: "text" },
];

export default function RbmNewSchemeDashboard({ scheme }: { scheme: RevisedScheme }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedIndicator, setSelectedIndicator] = useState(scheme.indicators[0]?.code || "");
  const [selectedActivity, setSelectedActivity] = useState(scheme.activities[0]?.code || "");
  const [drafts, setDrafts] = useState<DraftStore>({ indicators: {}, activities: {}, evidence: {} });
  const [savedAt, setSavedAt] = useState("");
  const storageKey = `rbm-new-drafts:${scheme.slug}`;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<DraftStore>;
        setDrafts({ indicators: parsed.indicators || {}, activities: parsed.activities || {}, evidence: parsed.evidence || {} });
      }
    } catch {
      // A malformed local draft must never alter the workbook-backed view.
    }
  }, [storageKey]);

  const savedFieldCount = useMemo(
    () => countValues(drafts.indicators) + countValues(drafts.activities) + countValues(drafts.evidence),
    [drafts],
  );

  const persist = (next = drafts) => {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSavedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
  };

  const updateIndicator = (key: string, value: string) => {
    setDrafts((current) => ({
      ...current,
      indicators: {
        ...current.indicators,
        [selectedIndicator]: { ...(current.indicators[selectedIndicator] || {}), [key]: value },
      },
    }));
  };

  const updateActivity = (key: string, value: string) => {
    setDrafts((current) => ({
      ...current,
      activities: {
        ...current.activities,
        [selectedActivity]: { ...(current.activities[selectedActivity] || {}), [key]: value },
      },
    }));
  };

  const updateEvidence = (key: string, value: string) => {
    setDrafts((current) => ({ ...current, evidence: { ...current.evidence, [key]: value } }));
  };

  const clearSection = (section: "indicator" | "activity" | "evidence") => {
    let next: DraftStore;
    if (section === "indicator") {
      const indicators = { ...drafts.indicators };
      delete indicators[selectedIndicator];
      next = { ...drafts, indicators };
    } else if (section === "activity") {
      const activities = { ...drafts.activities };
      delete activities[selectedActivity];
      next = { ...drafts, activities };
    } else {
      next = { ...drafts, evidence: {} };
    }
    setDrafts(next);
    persist(next);
  };

  const exportDrafts = () => {
    const payload = JSON.stringify({ programme: scheme.title, ...drafts }, null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${scheme.slug}-rbm-update-draft.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const hasRecordedResults = scheme.indicators.some((indicator) => typeof indicator.current === "number");

  return (
    <div className="space-y-5 p-3 sm:p-5">
      <Link href="/rbm-new" className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-[13px] font-extrabold text-slate-600 transition hover:text-slate-950">
        <Icon name="ArrowLeft" size={17} /> Back to RBM Projects (Priority)
      </Link>

      <header className="relative overflow-hidden rounded-2xl text-white shadow-lg" style={{ backgroundColor: scheme.color }}>
        <div className="hero-grid absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_290px] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase">
              <span className="rounded-full bg-white/15 px-3 py-1.5">{scheme.department}</span>
              <span className="rounded-full bg-black/15 px-3 py-1.5">Plan period · {scheme.period}</span>
            </div>
            <div className="mt-4 flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/15 shadow-sm">
                <Icon name={scheme.icon} size={28} />
              </span>
              <div className="min-w-0">
                <h1 className="text-2xl font-black leading-tight sm:text-3xl">{scheme.title}</h1>
                <div className="mt-3 max-w-4xl rounded-xl border border-white/20 bg-black/10 px-4 py-3">
                  <p className="text-[10px] font-black uppercase text-white/65">Programme objective</p>
                  <p className="mt-1 text-[17px] font-bold leading-relaxed text-white sm:text-lg">{scheme.purpose}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={scheme.sourceHref} download className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3.5 py-2.5 text-[13px] font-extrabold text-white hover:bg-white/25"><Icon name="FileSpreadsheet" size={17} /> Download source workbook</a>
              <button type="button" onClick={exportDrafts} title="Export browser-saved update fields" className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[13px] font-extrabold shadow-sm transition hover:bg-slate-50" style={{ color: scheme.color }}>
                <Icon name="FileDown" size={17} /> Export updates
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-black/15 p-5 backdrop-blur-sm">
            <p className="text-[12px] font-bold uppercase text-white/75">Recorded programme results</p>
            <p className="mt-2 text-lg font-extrabold">{hasRecordedResults ? `${scheme.score}/100` : "Awaiting verified returns"}</p>
            <div className="mt-5 grid grid-cols-2 divide-x divide-white/20 border-t border-white/15 pt-4 text-center">
              <div><p className="text-2xl font-black">{scheme.indicators.length}</p><p className="text-[11px] font-bold uppercase text-white/65">Indicators</p></div>
              <div><p className="text-2xl font-black">{scheme.activities.length}</p><p className="text-[11px] font-bold uppercase text-white/65">Activities</p></div>
            </div>
          </div>
        </div>
      </header>

      <section aria-label="Reporting source" className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <p><strong>Source workbook</strong> · <a href={scheme.sourceHref} download className="font-semibold text-blue-800 underline">{scheme.sourceFile}</a></p>
        <p className="mt-1"><a href={scheme.publicSource.url} target="_blank" rel="noreferrer" className="font-semibold text-blue-800 underline">{scheme.publicSource.label}</a> <span className="text-xs text-slate-600">· Checked 27 Nov 2026</span></p>
        <p className="mt-1 text-xs">Planning dates, funding and targets follow the workbook and its cited documents. Updates entered below are browser drafts for review and export.</p>
      </section>

      <div className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm" role="tablist" aria-label="Programme dashboard sections">
        <div className="flex overflow-x-auto">
          {TABS.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} onClick={() => setTab(item.id)} className={`flex min-w-max flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-[13px] font-extrabold transition ${tab === item.id ? item.activeClass : `text-slate-600 hover:bg-slate-50 ${item.iconClass}`}`}>
              <Icon name={item.icon} size={17} /> <span className={tab === item.id ? "text-white" : "text-slate-700"}>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-end border-t border-slate-100 px-3 py-2">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-500"><Icon name="HardDrive" size={14} /> {savedFieldCount} fields saved in this browser</span>
        </div>
      </div>

      {tab === "overview" && <Overview scheme={scheme} hasRecordedResults={hasRecordedResults} />}

      {tab === "indicators" && (
        <div className="space-y-4">
          <IndicatorsTable scheme={scheme} drafts={drafts.indicators} />
          <UpdatePanel title="Update an indicator" note="Record the latest verified result and supporting evidence." icon="PencilLine" tone="indigo" savedAt={savedAt} onSave={() => persist()} onClear={() => clearSection("indicator")}>
            <label className="block">
              <FieldLabel>Indicator</FieldLabel>
              <select value={selectedIndicator} onChange={(event) => setSelectedIndicator(event.target.value)} className={controlClass}>
                {scheme.indicators.map((indicator) => <option key={indicator.code} value={indicator.code}>{indicator.code} · {indicator.name}</option>)}
              </select>
            </label>
            <FormGrid fields={INDICATOR_FIELDS} values={drafts.indicators[selectedIndicator] || {}} onChange={updateIndicator} />
          </UpdatePanel>
        </div>
      )}

      {tab === "activities" && (
        <div className="space-y-4">
          <ActivitiesTable scheme={scheme} drafts={drafts.activities} />
          <UpdatePanel title="Update activity progress" note="Record current progress, achievements and supporting evidence." icon="ClipboardEdit" tone="amber" savedAt={savedAt} onSave={() => persist()} onClear={() => clearSection("activity")}>
            <label className="block">
              <FieldLabel>Activity</FieldLabel>
              <select value={selectedActivity} onChange={(event) => setSelectedActivity(event.target.value)} className={controlClass}>
                {scheme.activities.map((activity) => <option key={activity.code} value={activity.code}>{activity.code} · {activity.name}</option>)}
              </select>
            </label>
            <FormGrid fields={scheme.activityUpdateFields} values={drafts.activities[selectedActivity] || {}} onChange={updateActivity} />
          </UpdatePanel>
        </div>
      )}

      {tab === "evidence" && (
        <div className="space-y-4">
          <OutcomeSummary scheme={scheme} />
          <UpdatePanel title="Add outcome evidence" note="Record each verified result with its supporting evidence." icon="FilePlus2" tone="emerald" savedAt={savedAt} onSave={() => persist()} onClear={() => clearSection("evidence")}>
            <FormGrid fields={scheme.evidenceFields} values={drafts.evidence} onChange={updateEvidence} />
          </UpdatePanel>
        </div>
      )}

      {tab === "reference" && <Reference scheme={scheme} />}
    </div>
  );
}

function Overview({ scheme, hasRecordedResults }: { scheme: RevisedScheme; hasRecordedResults: boolean }) {
  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 shadow-sm sm:px-5">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500 text-amber-950"><Icon name="Info" size={19} /></span>
          <div><h2 className="text-[14px] font-black text-amber-950">Programme status</h2><p className="mt-1 text-[13px] leading-relaxed text-amber-950/80">{scheme.statusNote}</p></div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <SectionHeading icon="Waypoints" title="Planned results chain" subtitle="Programme design and intended outcomes" tone="sky" />
        <div className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-5">
          {CHAIN_STAGES.map((stage, stageIndex) => (
            <div key={stage.key} className={`relative overflow-hidden rounded-xl border ${stage.panelClass}`}>
              <div className={`flex items-center justify-between gap-2 px-3.5 py-3 ${stage.headingClass}`}>
                <h3 className="flex items-center gap-2 text-[13px] font-black uppercase"><Icon name={stage.icon} size={18} /> {stage.label}</h3>
                <span className="text-[11px] font-black opacity-60">{stage.number}</span>
              </div>
              <ul className="divide-y divide-black/5 px-3.5 py-1">
                {scheme.resultChain[stage.key].filter((item): item is string => item !== null).map((item, index) => <li key={index} className={`border-l-2 py-3 pl-3 text-[12px] font-medium leading-relaxed ${stage.itemClass}`}>{item}</li>)}
              </ul>
              {stageIndex < CHAIN_STAGES.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-400 shadow md:grid xl:grid"><Icon name="ChevronRight" size={15} /></span>}
            </div>
          ))}
        </div>
      </section>

      <RbmNewProgrammeResults scheme={scheme} displayedScore={hasRecordedResults ? scheme.score : null} displayedRating={hasRecordedResults ? scheme.rating : "Awaiting verified returns"} />

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <SectionHeading icon="Landmark" title="Programme facts" subtitle="Key programme information" tone="indigo" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead><tr className="border-y border-indigo-100 bg-indigo-50 text-[11px] uppercase text-indigo-900"><Th>Fact</Th><Th>Value</Th><Th>Unit / note</Th><Th>Source / status</Th></tr></thead>
            <tbody>{scheme.facts.filter((fact) => fact.value !== null && fact.value !== "Not specified in the source documents").map((fact, index) => <tr key={fact.label} className={`border-b border-slate-100 align-top ${index % 2 ? "bg-slate-50/60" : "bg-white"}`}><Td strong>{fact.label}</Td><Td><span className="font-extrabold text-indigo-800">{display(fact.value)}</span></Td><Td>{display(fact.unit)}</Td><Td>{display(fact.source)}</Td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <OutcomeSummary scheme={scheme} />
    </div>
  );
}

function IndicatorsTable({ scheme, drafts }: { scheme: RevisedScheme; drafts: Record<string, FieldValues> }) {
  return (
    <section className="overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm">
      <SectionHeading icon="ListChecks" title="Indicator form" subtitle={`${scheme.indicators.length} programme indicators`} tone="indigo" />
      <div className="space-y-3 p-3 lg:hidden">
        {scheme.indicators.map((indicator) => <IndicatorMobileCard key={indicator.code} indicator={indicator} current={indicator.current} latestDraft={drafts[indicator.code]?.latestValue || ""} />)}
      </div>
      <div className="hidden max-h-[720px] overflow-auto lg:block">
        <table className="w-full min-w-[1280px] text-left text-[12.5px]">
          <thead className="sticky top-0 z-10"><tr className="border-y border-indigo-200 bg-indigo-700 text-[11px] uppercase text-white"><Th>Code</Th><Th>Key indicator</Th><Th>Definition</Th><Th>Level</Th><Th>Unit</Th><Th>Starting point</Th><Th>Target</Th><Th>Current value</Th><Th>Weight</Th><Th>Cadence</Th><Th>Source</Th></tr></thead>
          <tbody>{scheme.indicators.map((indicator, index) => {
            const tone = getIndicatorTone(indicator.level);
            const current = indicator.current;
            return <tr key={indicator.code} className={`border-b border-slate-100 align-top ${index % 2 ? "bg-slate-50/70" : "bg-white"}`}>
              <Td><span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-black ${tone.badgeClass}`}>{indicator.code}</span></Td>
              <Td strong>{indicator.name}</Td>
              <Td className="max-w-[350px]">{indicator.definition}</Td>
              <Td><LevelBadge level={indicator.level} /></Td>
              <Td>{indicator.unit}</Td>
              <Td>{display(indicator.baseline)}</Td>
              <Td><span className="font-black text-indigo-800">{display(indicator.target)}</span></Td>
              <Td><ResultValueSurface value={current} baseline={indicator.baseline} target={indicator.target} unit={indicator.unit} /></Td>
              <Td>{`${Number((indicator.weight * 100).toFixed(2))}%`}</Td>
              <Td>{indicator.cadence}</Td>
              <Td className="max-w-[280px]">{indicator.source}</Td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </section>
  );
}

function IndicatorMobileCard({ indicator, current, latestDraft }: { indicator: RevisedScheme["indicators"][number]; current: SourceValue; latestDraft: string }) {
  const tone = getIndicatorTone(indicator.level);
  return (
    <details className={`overflow-hidden rounded-xl border ${tone.panelClass}`}>
      <summary className="cursor-pointer list-none p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-black ${tone.badgeClass}`}>{indicator.code}</span><h3 className="mt-2 text-[14px] font-black leading-snug text-slate-900">{indicator.name}</h3></div>
          <LevelBadge level={indicator.level} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-white/70 p-2 text-center">
          <div className="rounded-lg bg-white py-3"><MobileMetric label="Starting point" value={display(indicator.baseline)} /></div>
          <div className="rounded-lg border border-indigo-100 bg-indigo-50 py-3"><MobileMetric label="Target" value={display(indicator.target)} strong /></div>
          <div className="col-span-2"><ResultValueSurface value={current} baseline={indicator.baseline} target={indicator.target} unit={indicator.unit} compact /></div>
        </div>
      </summary>
      <div className="border-t border-slate-200 bg-white p-4">
        <p className="text-[13px] leading-relaxed text-slate-700">{indicator.definition}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2"><Detail label="Unit" value={indicator.unit} /><Detail label="Weight" value={`${Number((indicator.weight * 100).toFixed(2))}%`} /><Detail label="Reporting cycle" value={indicator.cadence} /><Detail label="Latest draft" value={latestDraft} /><div className="sm:col-span-2"><Detail label="Evidence source" value={indicator.source} /></div></dl>
      </div>
    </details>
  );
}

function ActivitiesTable({ scheme, drafts }: { scheme: RevisedScheme; drafts: Record<string, FieldValues> }) {
  return (
    <section className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
      <SectionHeading icon="Workflow" title="Activity plan" subtitle={`${scheme.activities.length} activities; open an activity for full details`} tone="amber" />
      <div className="m-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] font-extrabold text-slate-700"><Icon name="Inbox" size={18} className="text-slate-500" /> No activity updates recorded yet</div>
      <div className="space-y-3 p-3 lg:hidden">
        {scheme.activities.map((activity) => <ActivityMobileCard key={activity.code} activity={activity} localDraftStatus={drafts[activity.code]?.currentStatus || ""} fundingUnit={scheme.fundingUnit} />)}
      </div>
      <div className="hidden max-h-[720px] overflow-auto lg:block">
        <table className="w-full min-w-[1140px] text-left text-[12.5px]">
          <thead className="sticky top-0 z-10"><tr className="border-y border-amber-200 bg-amber-500 text-[11px] uppercase text-amber-950"><Th>Code</Th><Th>Activity</Th><Th>Phase</Th><Th>Category</Th><Th>Period</Th><Th>{`Planned total (${scheme.fundingUnit})`}</Th><Th>{`State (${scheme.fundingUnit})`}</Th><Th>Local draft status</Th></tr></thead>
          <tbody>{scheme.activities.map((activity, index) => {
            const phaseTone = getPhaseTone(activity.phase);            return (
            <tr key={activity.code} className={`border-b border-slate-100 align-top ${index % 2 ? "bg-amber-50/35" : "bg-white"}`}>
              <Td><span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-black ${phaseTone.badgeClass}`}>{activity.code}</span></Td>
              <Td className="max-w-[500px]"><details><summary className="cursor-pointer text-[13px] font-extrabold text-slate-900 hover:text-amber-800">{activity.name}</summary><div className="mt-3 grid gap-x-5 gap-y-3 rounded-lg border border-amber-100 bg-amber-50/60 p-3 sm:grid-cols-2"><Detail label="Phase theme" value={activity.phaseTheme} /><Detail label="Type" value={activity.type} /><Detail label="Private" value={display(activity.privateFunding)} /><Detail label="Central" value={display(activity.centralFunding)} /><Detail label="Responsible office" value={activity.responsibleOffice} /><Detail label="Partner department / office" value={display(activity.governmentPartner)} /><Detail label="Other partner" value={display(activity.otherPartner)} /><Detail label="Dependencies" value={activity.dependencies} /></div></details></Td>
              <Td><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold ${phaseTone.badgeClass}`}>{activity.phase}</span></Td><Td>{activity.category}</Td><Td>{activity.plannedStart}<br /><span className="text-slate-400">to</span> {activity.plannedFinish}</Td><Td><span className="font-black text-amber-800">{display(activity.total)}</span></Td><Td>{display(activity.stateFunding)}</Td><Td>{drafts[activity.code]?.currentStatus || "—"}</Td>
            </tr>
          );})}</tbody>
        </table>
      </div>
    </section>
  );
}

function ActivityMobileCard({ activity, localDraftStatus, fundingUnit }: { activity: RevisedScheme["activities"][number]; localDraftStatus: string; fundingUnit: string }) {
  const tone = getPhaseTone(activity.phase);
  return (
    <details className="overflow-hidden rounded-xl border border-amber-200 bg-white">
      <summary className="cursor-pointer list-none p-4">
        <div className="flex items-start justify-between gap-3"><div><span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-black ${tone.badgeClass}`}>{activity.code}</span><h3 className="mt-2 text-[14px] font-black leading-snug text-slate-900">{activity.name}</h3></div><Icon name="ChevronDown" size={18} className="mt-1 shrink-0 text-amber-700" /></div>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold"><span className={`rounded-full px-2.5 py-1 ${tone.badgeClass}`}>{activity.phase}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{activity.category}</span>{localDraftStatus && <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-cyan-800">Local draft · {localDraftStatus}</span>}</div>
      </summary>
      <div className="border-t border-amber-100 bg-amber-50/40 p-4">
        <dl className="grid gap-3 sm:grid-cols-2"><Detail label="Phase theme" value={activity.phaseTheme} /><Detail label="Type" value={activity.type} /><Detail label="Period" value={`${activity.plannedStart} to ${activity.plannedFinish}`} /><Detail label={`Planned total (${fundingUnit})`} value={display(activity.total)} /><Detail label={`State (${fundingUnit})`} value={display(activity.stateFunding)} /><Detail label="Private" value={display(activity.privateFunding)} /><Detail label="Central" value={display(activity.centralFunding)} /><Detail label="Responsible office" value={activity.responsibleOffice} /><Detail label="Partner department / office" value={display(activity.governmentPartner)} /><Detail label="Other partner" value={display(activity.otherPartner)} /><div className="sm:col-span-2"><Detail label="Dependencies" value={activity.dependencies} /></div></dl>
      </div>
    </details>
  );
}

function OutcomeSummary({ scheme }: { scheme: RevisedScheme }) {
  return (
    <section className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm">
      <SectionHeading icon="FileCheck2" title="Outcome and evidence summary" subtitle="Results, targets and supporting evidence" tone="emerald" />
      <div className="grid gap-3 p-3 md:hidden">
        {scheme.outcomeSummary.map((row) => {
          const tone = getStatusTone(row.status);
          const current = row.current;
          const baseline = outcomeBaseline(scheme, row.indicator);
          return <article key={row.indicator} className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4"><div className="flex items-start justify-between gap-3"><h3 className="text-[14px] font-black text-slate-900">{row.indicator}</h3><span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${tone}`}>{row.status}</span></div><div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-white/75 p-2 text-center"><div className="rounded-lg border border-indigo-100 bg-indigo-50 py-3"><MobileMetric label="Target" value={display(row.target)} strong /></div><ResultValueSurface value={current} baseline={baseline} target={row.target} unit={row.unit} compact /></div><p className="mt-4 text-[12px] leading-relaxed text-slate-700"><strong>Evidence:</strong> {row.support}</p><p className="mt-2 text-[11px] font-bold text-slate-500">{row.unit} · {row.cadence}</p></article>;
        })}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[960px] text-left text-[12.5px]">
          <thead><tr className="border-y border-emerald-200 bg-emerald-700 text-[11px] uppercase text-white"><Th>Indicator</Th><Th>Target</Th><Th>Current value</Th><Th>Unit</Th><Th>Evidence required</Th><Th>Cycle</Th><Th>Status</Th></tr></thead>
          <tbody>{scheme.outcomeSummary.map((row, index) => {
            const current = row.current;
            return <tr key={row.indicator} className={`border-b border-slate-100 align-top ${index % 2 ? "bg-emerald-50/35" : "bg-white"}`}><Td strong>{row.indicator}</Td><Td><span className="font-black text-emerald-800">{display(row.target)}</span></Td><Td><ResultValueSurface value={current} baseline={outcomeBaseline(scheme, row.indicator)} target={row.target} unit={row.unit} /></Td><Td>{row.unit}</Td><Td className="max-w-[500px]">{row.support}</Td><Td>{row.cadence}</Td><Td><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${getStatusTone(row.status)}`}>{row.status}</span></Td></tr>;
          })}</tbody>
        </table>
      </div>
    </section>
  );
}

function Reference({ scheme }: { scheme: RevisedScheme }) {
  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-xl border border-rose-200 bg-white shadow-sm">
        <SectionHeading icon="Database" title="Evidence sources" subtitle="Source, cadence, status and coverage" tone="rose" />
        <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-[12.5px]"><thead><tr className="border-y border-rose-200 bg-rose-700 text-[11px] uppercase text-white"><Th>Source</Th><Th>Cadence</Th><Th>Status</Th><Th>Coverage</Th></tr></thead><tbody>{scheme.evidenceSources.map((row, index) => <tr key={row.source} className={`border-b border-slate-100 align-top ${index % 2 ? "bg-rose-50/35" : "bg-white"}`}><Td strong>{row.source}</Td><Td>{row.cadence}</Td><Td><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${getStatusTone(row.status)}`}>{row.status}</span></Td><Td>{row.coverage}</Td></tr>)}</tbody></table></div>
      </section>

      {scheme.references.map((section) => (
        <section key={section.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <SectionHeading icon="Table2" title={section.title} tone="slate" />
          <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-[12.5px]"><thead><tr className="border-y border-slate-200 bg-slate-800 text-[11px] uppercase text-white">{section.columns.map((column) => <Th key={column}>{column}</Th>)}</tr></thead><tbody>{section.rows.map((row, rowIndex) => <tr key={rowIndex} className={`border-b border-slate-100 align-top ${rowIndex % 2 ? "bg-slate-50/70" : "bg-white"}`}>{row.map((value, columnIndex) => <Td key={columnIndex} strong={columnIndex === 0}>{display(value)}</Td>)}</tr>)}</tbody></table></div>
        </section>
      ))}

    </div>
  );
}

type ToneName = "sky" | "indigo" | "amber" | "emerald" | "rose" | "slate";

const SECTION_TONES: Record<ToneName, { headerClass: string; iconClass: string; borderClass: string }> = {
  sky: { headerClass: "border-sky-100 bg-sky-50/80", iconClass: "bg-sky-700 text-white", borderClass: "border-sky-200" },
  indigo: { headerClass: "border-indigo-100 bg-indigo-50/80", iconClass: "bg-indigo-700 text-white", borderClass: "border-indigo-200" },
  amber: { headerClass: "border-amber-200 bg-amber-50", iconClass: "bg-amber-500 text-amber-950", borderClass: "border-amber-200" },
  emerald: { headerClass: "border-emerald-100 bg-emerald-50/80", iconClass: "bg-emerald-700 text-white", borderClass: "border-emerald-200" },
  rose: { headerClass: "border-rose-100 bg-rose-50/80", iconClass: "bg-rose-700 text-white", borderClass: "border-rose-200" },
  slate: { headerClass: "border-slate-200 bg-slate-50", iconClass: "bg-slate-800 text-white", borderClass: "border-slate-200" },
};

function UpdatePanel({ title, note, icon, tone, savedAt, onSave, onClear, children }: { title: string; note: string; icon: string; tone: ToneName; savedAt: string; onSave: () => void; onClear: () => void; children: React.ReactNode }) {
  const styles = SECTION_TONES[tone];
  return (
    <section className={`overflow-hidden rounded-xl border bg-white shadow-sm ${styles.borderClass}`}>
      <SectionHeading icon={icon} title={title} subtitle={note} tone={tone} />
      <div className="space-y-5 bg-amber-50/35 p-4 sm:p-5">{children}<div className="flex flex-wrap items-center gap-2 border-t border-amber-200 pt-4"><button type="button" onClick={onSave} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-[13px] font-extrabold text-white transition hover:bg-emerald-800"><Icon name="Save" size={17} /> Save in this browser</button><button type="button" onClick={onClear} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[13px] font-extrabold text-slate-700 transition hover:bg-slate-50"><Icon name="Eraser" size={17} /> Clear selected draft</button>{savedAt && <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald-700"><Icon name="CircleCheck" size={15} /> Saved at {savedAt}</span>}</div></div>
    </section>
  );
}

function FormGrid({ fields, values, onChange }: { fields: readonly FormField[]; values: FieldValues; onChange: (key: string, value: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {fields.map((field) => <FormControl key={field.key} field={field} value={values[field.key] || ""} onChange={(value) => onChange(field.key, value)} />)}
    </div>
  );
}

function FormControl({ field, value, onChange }: { field: FormField; value: string; onChange: (value: string) => void }) {
  const wide = field.type === "textarea";
  return (
    <label className={wide ? "block md:col-span-2 xl:col-span-3" : "block"}>
      <FieldLabel>{field.label}</FieldLabel>
      {field.type === "select" ? (
        <select value={value} onChange={(event) => onChange(event.target.value)} className={controlClass}><option value=""></option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select>
      ) : field.type === "textarea" ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className={controlClass} />
      ) : (
        <input type={field.type || "text"} min={field.min} max={field.max} value={value} onChange={(event) => onChange(event.target.value)} className={controlClass} />
      )}
    </label>
  );
}

function SectionHeading({ icon, title, subtitle, tone = "slate" }: { icon: string; title: string; subtitle?: string; tone?: ToneName }) {
  const styles = SECTION_TONES[tone];
  return <div className={`flex items-center gap-3 border-b px-4 py-4 sm:px-5 ${styles.headerClass}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg shadow-sm ${styles.iconClass}`}><Icon name={icon} size={19} /></span><div><h2 className="text-[17px] font-black leading-tight text-slate-900">{title}</h2>{subtitle && <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{subtitle}</p>}</div></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-[11px] font-extrabold uppercase text-slate-500">{label}</dt><dd className="mt-1 text-[13px] font-medium leading-relaxed text-slate-700">{value}</dd></div>;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-[11px] font-extrabold uppercase text-slate-600">{children}</span>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="whitespace-nowrap px-4 py-3 font-extrabold">{children}</th>;
}

function Td({ children, strong, className = "" }: { children: React.ReactNode; strong?: boolean; className?: string }) {
  return <td className={`px-4 py-3.5 text-[13px] leading-relaxed text-slate-700 ${strong ? "font-extrabold text-slate-900" : ""} ${className}`}>{children}</td>;
}

function MobileMetric({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className="min-w-0 px-2"><dt className="text-[11px] font-extrabold uppercase text-slate-500">{label}</dt><dd className={`mt-1 break-words text-[15px] ${strong ? "font-black text-indigo-800" : "font-extrabold text-slate-800"}`}>{value}</dd></div>;
}

type ClassifiedValue =
  | { kind: "blank" }
  | { kind: "number"; value: number }
  | { kind: "text"; value: string };

type ResultPresentation = {
  surfaceClass: string;
  trendClass: string;
  trendIcon: string;
  trendLabel: string;
  score: number | null;
};

function ResultValueSurface({ value, baseline, target, unit, compact = false }: { value: SourceValue; baseline: SourceValue; target: SourceValue; unit: string; compact?: boolean }) {
  const classified = classifyValue(value);
  const presentation = getResultPresentation(classified, classifyValue(baseline), classifyValue(target));
  const figure = formatResultFigure(classified, unit);
  const label = "Current value";
  const isText = classified.kind === "text";
  const scoreLabel = presentation.score === null ? "" : `${Number(presentation.score.toFixed(1))}% of target`;
  const spokenValue = classified.kind === "blank" ? "blank" : figure;

  return (
    <div
      className={`w-full rounded-lg border text-left shadow-sm ${compact ? "min-w-0 p-2.5" : "min-w-[132px] px-3 py-2.5"} ${presentation.surfaceClass}`}
      aria-label={`${label}: ${spokenValue}. ${presentation.trendLabel}${scoreLabel ? `. ${scoreLabel}` : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-black uppercase text-current opacity-65">{label}</span>
      </div>
      <p className={`mt-1 break-words font-black tabular-nums ${isText ? "text-[13px] leading-snug" : compact ? "text-xl leading-none" : "text-[26px] leading-none"}`} aria-hidden="true">{figure || "\u00a0"}</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-black ${presentation.trendClass}`}>
          <Icon name={presentation.trendIcon} size={12} /> {presentation.trendLabel}
        </span>
        {scoreLabel && <span className="text-[9px] font-extrabold opacity-70">{scoreLabel}</span>}
      </div>
    </div>
  );
}

function classifyValue(value: SourceValue): ClassifiedValue {
  if (value === null || value === undefined) return { kind: "blank" };
  if (typeof value === "number") return Number.isFinite(value) ? { kind: "number", value } : { kind: "blank" };

  const text = value.trim();
  if (!text) return { kind: "blank" };
  const numericText = text
    .replace(/,/g, "")
    .replace(/^₹\s*/, "")
    .replace(/\s*(?:%|crores?|cr|lakhs?|lakh)\s*$/i, "")
    .trim();
  if (/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(numericText)) {
    const numericValue = Number(numericText);
    if (Number.isFinite(numericValue)) return { kind: "number", value: numericValue };
  }
  return { kind: "text", value };
}

function getResultPresentation(current: ClassifiedValue, baseline: ClassifiedValue, target: ClassifiedValue): ResultPresentation {
  const blankPresentation: ResultPresentation = {
    surfaceClass: "border-slate-200 bg-slate-100 text-slate-700",
    trendClass: "bg-white/80 text-slate-600",
    trendIcon: "CircleHelp",
    trendLabel: "No comparison",
    score: null,
  };
  if (current.kind === "blank") return blankPresentation;

  if (current.kind === "text") {
    const targetMatched = target.kind === "text" && current.value.trim().toLocaleLowerCase() === target.value.trim().toLocaleLowerCase();
    return {
      surfaceClass: targetMatched ? "border-emerald-300 bg-emerald-100 text-emerald-950" : "border-sky-300 bg-sky-100 text-sky-950",
      trendClass: targetMatched ? "bg-emerald-700 text-white" : "bg-sky-700 text-white",
      trendIcon: targetMatched ? "Minus" : "CircleHelp",
      trendLabel: targetMatched ? "Target matched" : "Text update",
      score: targetMatched ? 100 : null,
    };
  }

  const scoreBaseline = baseline.kind === "number" ? baseline.value : null;
  const score = target.kind === "number" && scoreBaseline !== null
    ? scoreBaseline === target.value
      ? nearlyEqual(current.value, target.value) ? 100 : 0
      : clamp(((current.value - scoreBaseline) / (target.value - scoreBaseline)) * 100, 0, 100)
    : null;

  const surfaceClass = score === null
    ? "border-sky-300 bg-sky-100 text-sky-950"
    : score >= 85
      ? "border-emerald-300 bg-emerald-100 text-emerald-950"
      : score >= 65
        ? "border-amber-300 bg-amber-100 text-amber-950"
        : "border-rose-300 bg-rose-100 text-rose-950";

  if (baseline.kind !== "number") {
    return {
      surfaceClass,
      trendClass: "bg-white/80 text-slate-700",
      trendIcon: "CircleHelp",
      trendLabel: "No starting point",
      score,
    };
  }

  const delta = current.value - baseline.value;
  const epsilon = Math.max(1, Math.abs(current.value), Math.abs(baseline.value)) * 1e-9;
  if (Math.abs(delta) <= epsilon) {
    return {
      surfaceClass,
      trendClass: "bg-white/80 text-slate-700",
      trendIcon: "Minus",
      trendLabel: "Stable vs starting point",
      score,
    };
  }

  const trendIcon = delta > 0 ? "ArrowUpRight" : "ArrowDownRight";
  const targetDelta = target.kind === "number" ? target.value - baseline.value : null;
  const movesTowardTarget = targetDelta === null || Math.abs(targetDelta) <= epsilon
    ? null
    : Math.sign(delta) === Math.sign(targetDelta);
  const trendClass = movesTowardTarget === null
    ? "bg-white/80 text-slate-700"
    : movesTowardTarget
      ? "bg-emerald-700 text-white"
      : "bg-rose-700 text-white";

  return {
    surfaceClass,
    trendClass,
    trendIcon,
    trendLabel: `${delta > 0 ? "Up" : "Down"} vs starting point`,
    score,
  };
}

function formatResultFigure(value: ClassifiedValue, unit: string) {
  if (value.kind === "blank") return "";
  if (value.kind === "text") return value.value;

  const formatted = value.value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  const normalizedUnit = unit.trim().toLocaleLowerCase();
  if (normalizedUnit === "%" || normalizedUnit.includes("percent")) return `${formatted}%`;
  if (unit.includes("₹")) {
    if (normalizedUnit.includes("crore") || /\bcr\b/i.test(unit)) return `₹${formatted} Cr`;
    if (normalizedUnit.includes("lakh")) return `₹${formatted} lakh`;
    return `₹${formatted}`;
  }
  return formatted;
}

function nearlyEqual(left: number, right: number) {
  return Math.abs(left - right) <= Math.max(1, Math.abs(left), Math.abs(right)) * 1e-9;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.max(minimum, Math.min(maximum, value));
}

function outcomeBaseline(scheme: RevisedScheme, outcomeIndicator: string): SourceValue {
  const code = outcomeIndicator.match(/(?:MS|EF)-\d+/)?.[0];
  return scheme.indicators.find((indicator) => indicator.code === code)?.baseline ?? null;
}

function LevelBadge({ level }: { level: string }) {
  const tone = getIndicatorTone(level);
  return <span className={`inline-flex max-w-[150px] rounded-full px-2.5 py-1 text-[11px] font-black ${tone.badgeClass}`}>{level}</span>;
}

function getIndicatorTone(level: string) {
  const value = level.toLowerCase();
  if (value.includes("impact")) return { badgeClass: "bg-rose-100 text-rose-900", panelClass: "border-rose-200 bg-rose-50" };
  if (value.includes("outcome")) return { badgeClass: "bg-emerald-100 text-emerald-900", panelClass: "border-emerald-200 bg-emerald-50" };
  if (value.includes("output")) return { badgeClass: "bg-indigo-100 text-indigo-900", panelClass: "border-indigo-200 bg-indigo-50" };
  if (value.includes("input")) return { badgeClass: "bg-amber-100 text-amber-950", panelClass: "border-amber-200 bg-amber-50" };
  return { badgeClass: "bg-sky-100 text-sky-900", panelClass: "border-sky-200 bg-sky-50" };
}

function getPhaseTone(phase: string) {
  const value = phase.toLowerCase();
  if (value.includes("phase 0") || value.includes("stage 1")) return { badgeClass: "bg-sky-100 text-sky-900" };
  if (value.includes("phase 1") || value.includes("stage 2")) return { badgeClass: "bg-amber-100 text-amber-950" };
  if (value.includes("phase 2") || value.includes("stage 3")) return { badgeClass: "bg-emerald-100 text-emerald-900" };
  if (value.includes("phase 3")) return { badgeClass: "bg-rose-100 text-rose-900" };
  return { badgeClass: "bg-slate-100 text-slate-700" };
}

function getStatusTone(status: string) {
  const value = status.toLowerCase();
  if (value.includes("complete") || value.includes("verified") || value.includes("operational") || value.includes("on track")) return "bg-emerald-100 text-emerald-900";
  if (value.includes("progress") || value.includes("mobilisation") || value.includes("submitted") || value.includes("draft")) return "bg-sky-100 text-sky-900";
  if (value.includes("not operational") || value.includes("pending") || value.includes("await") || value.includes("hold") || value.includes("returned")) return "bg-amber-100 text-amber-950";
  return "bg-slate-100 text-slate-700";
}

function display(value: SourceValue | undefined) {
  if (value === null || value === undefined) return "";
  return typeof value === "number" ? value.toLocaleString("en-IN") : value;
}

function countValues(value: unknown): number {
  if (!value || typeof value !== "object") return 0;
  return Object.values(value).reduce<number>((total, item) => {
    if (item && typeof item === "object") return total + countValues(item);
    return total + (String(item || "").trim() ? 1 : 0);
  }, 0);
}

const controlClass = "min-h-11 w-full rounded-lg border border-amber-200 bg-white px-3.5 py-2.5 text-[14px] font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
