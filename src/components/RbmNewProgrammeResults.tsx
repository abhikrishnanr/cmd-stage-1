"use client";

import { useMemo, useState } from "react";
import type { RevisedIndicator, RevisedScheme, SourceValue } from "@/data/rbm-new-types";
import { Icon } from "./primitives";

type ResultsView = "simple" | "matrix";
type ResultLevel = "Input" | "Output" | "Outcome" | "Impact" | "Other";
type LevelFilter = "All" | ResultLevel;

type Props = {
  scheme: RevisedScheme;
  displayedScore: number | null;
  displayedRating: string;
};

type ResultTone = {
  label: string;
  color: string;
  cellClass: string;
  paleClass: string;
  strongClass: string;
  borderClass: string;
};

type ResultRow = {
  indicator: RevisedIndicator;
  level: ResultLevel;
  current: SourceValue;
  hasCurrent: boolean;
  currentNumber: number | null;
  baselineForCalculation: number | null;
  targetNumber: number | null;
  scorable: boolean;
  achievement: number | null;
  weightedScore: number | null;
  gap: number | null;
  comparison: "up" | "down" | "steady" | "none";
  tone: ResultTone;
};

const SCORE_BANDS = [
  { label: "Excellent", score: 100 as const, headerClass: "bg-emerald-800 text-white", cellClass: "bg-emerald-100 text-emerald-950" },
  { label: "Very Good", score: 90 as const, headerClass: "bg-emerald-700 text-white", cellClass: "bg-emerald-50 text-emerald-900" },
  { label: "Good", score: 80 as const, headerClass: "bg-amber-300 text-amber-950", cellClass: "bg-amber-50 text-amber-950" },
  { label: "Fair", score: 70 as const, headerClass: "bg-amber-500 text-amber-950", cellClass: "bg-amber-50 text-amber-950" },
  { label: "Poor", score: 60 as const, headerClass: "bg-rose-700 text-white", cellClass: "bg-rose-50 text-rose-950" },
];

const RESULT_LEVELS: { value: ResultLevel; label: string; description: string; className: string }[] = [
  { value: "Input", label: "Resources used", description: "What is committed to the programme", className: "bg-sky-100 text-sky-900" },
  { value: "Output", label: "Services delivered", description: "What government directly produces", className: "bg-indigo-100 text-indigo-900" },
  { value: "Outcome", label: "Change for people", description: "What improves for people and institutions", className: "bg-emerald-100 text-emerald-900" },
  { value: "Impact", label: "Long-term change", description: "The wider and lasting public benefit", className: "bg-rose-100 text-rose-900" },
  { value: "Other", label: "Other results", description: "Measures outside the standard result levels", className: "bg-slate-100 text-slate-800" },
];

const NEUTRAL_TONE: ResultTone = {
  label: "Awaiting data",
  color: "#64748b",
  cellClass: "bg-slate-100 text-slate-800",
  paleClass: "bg-slate-50 text-slate-800",
  strongClass: "bg-slate-700 text-white",
  borderClass: "border-slate-300",
};

export default function RbmNewProgrammeResults({ scheme, displayedScore, displayedRating }: Props) {
  const [view, setView] = useState<ResultsView>("simple");
  const [level, setLevel] = useState<LevelFilter>("All");

  const rows = useMemo(
    () => scheme.indicators.map((indicator) => buildResultRow(indicator, indicator.current)),
    [scheme.indicators],
  );
  const filteredRows = useMemo(() => level === "All" ? rows : rows.filter((row) => row.level === level), [level, rows]);
  const scoredWeight = rows.reduce((sum, row) => sum + (row.scorable ? row.indicator.weight : 0), 0) * 100;

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby="programme-results-heading">
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-4 py-4 text-white sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/12 text-cyan-200 ring-1 ring-white/15">
              <Icon name="TableProperties" size={21} />
            </span>
            <div>
              <h2 id="programme-results-heading" className="text-lg font-black sm:text-xl">Programme Results</h2>
              <p className="mt-0.5 text-[13px] font-medium leading-relaxed text-slate-300">Review the headline results or open the complete weighted score matrix</p>
            </div>
          </div>
          <ResultsViewToggle value={view} onChange={setView} />
        </div>
      </div>

      <div className="border-b border-slate-100 bg-slate-50/80 px-3 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[12px] font-bold text-slate-600">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-200 text-slate-700">
              <Icon name="FileSpreadsheet" size={15} />
            </span>
            Current values
          </div>
          <RagLegend />
        </div>
      </div>

      {view === "simple" ? (
        <SimpleResults rows={filteredRows} allRows={rows} level={level} onLevelChange={setLevel} />
      ) : (
        <ScoreMatrix rows={rows} displayedScore={displayedScore} displayedRating={displayedRating} scoredWeight={scoredWeight} />
      )}
    </section>
  );
}

function ResultsViewToggle({ value, onChange }: { value: ResultsView; onChange: (value: ResultsView) => void }) {
  const options = [
    { value: "simple" as const, label: "Simple Results", icon: "ListChecks" },
    { value: "matrix" as const, label: "Score Matrix", icon: "TableProperties" },
  ];

  return (
    <div className="inline-grid min-h-12 w-full grid-cols-2 rounded-lg border border-white/20 bg-black/25 p-1 shadow-inner sm:w-auto" aria-label="Choose programme results view">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`relative inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-[13px] font-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${value === option.value ? "scale-[1.02] bg-white text-slate-950 shadow-md" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}
        >
          <Icon name={option.icon} size={17} />
          {option.label}
        </button>
      ))}
    </div>
  );
}

function RagLegend() {
  return (
    <div className="flex flex-wrap gap-1.5 text-[10px] font-extrabold">
      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-900">On track 85-100</span>
      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-950">Needs attention 65-84.9</span>
      <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-900">Critical below 65</span>
    </div>
  );
}

function SimpleResults({ rows, allRows, level, onLevelChange }: { rows: ResultRow[]; allRows: ResultRow[]; level: LevelFilter; onLevelChange: (level: LevelFilter) => void }) {
  const availableLevels = RESULT_LEVELS.filter((item) => allRows.some((row) => row.level === item.value));

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
        <p className="px-1 text-[13px] font-bold text-slate-600">Current result compared with the starting point and target</p>
        <div className="flex max-w-full gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1" aria-label="Filter results by level">
          <FilterButton active={level === "All"} onClick={() => onLevelChange("All")}>All</FilterButton>
          {availableLevels.map((item) => <FilterButton key={item.value} active={level === item.value} onClick={() => onLevelChange(item.value)}>{item.value}</FilterButton>)}
        </div>
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 md:block" role="region" aria-label="Programme results and current achievement" tabIndex={0}>
        <table className="w-full min-w-[1060px] border-separate border-spacing-0 text-left">
          <caption className="sr-only">Programme results showing starting point, target, current value, change, gap and status.</caption>
          <thead>
            <tr className="bg-slate-900 text-[11px] uppercase text-white">
              <Th className="rounded-tl-lg">Result / success indicator</Th>
              <Th centered>Starting point</Th>
              <Th centered>Target</Th>
              <Th centered className="min-w-[170px]">Current value</Th>
              <Th centered>Direction</Th>
              <Th centered className="min-w-[145px]">Gap to target</Th>
              <Th centered className="rounded-tr-lg">Status</Th>
            </tr>
          </thead>
          {RESULT_LEVELS.map((group) => {
            const groupRows = rows.filter((row) => row.level === group.value);
            if (!groupRows.length) return null;
            return (
              <tbody key={group.value}>
                <tr className="bg-slate-100">
                  <th colSpan={7} className="px-4 py-2 text-left">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${group.className}`}>{group.label}</span>
                    <span className="ml-2 text-[11px] font-medium text-slate-500">{group.description}</span>
                  </th>
                </tr>
                {groupRows.map((row, index) => <SimpleResultRow key={row.indicator.code} row={row} index={index} />)}
              </tbody>
            );
          })}
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {RESULT_LEVELS.map((group) => {
          const groupRows = rows.filter((row) => row.level === group.value);
          if (!groupRows.length) return null;
          return (
            <div key={group.value}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${group.className}`}>{group.label}</span>
                <span className="text-[11px] text-slate-500">{group.description}</span>
              </div>
              <div className="space-y-3">{groupRows.map((row) => <SimpleResultCard key={row.indicator.code} row={row} />)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={active} onClick={onClick} className={`min-h-9 shrink-0 rounded-md px-3 text-[11px] font-black transition ${active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-white"}`}>{children}</button>;
}

function SimpleResultRow({ row, index }: { row: ResultRow; index: number }) {
  const gap = gapDisplay(row);
  return (
    <tr className={index % 2 ? "bg-slate-50/70" : "bg-white"}>
      <th scope="row" className="border-b border-r border-slate-100 px-4 py-4 text-left" style={{ borderLeftWidth: 4, borderLeftColor: row.tone.color }}>
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 rounded bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-600">{row.indicator.code}</span>
          <div><p className="text-[13px] font-black leading-snug text-slate-900">{row.indicator.name}</p><p className="mt-1 max-w-[390px] text-[11px] font-normal leading-relaxed text-slate-500">{row.indicator.definition}</p></div>
        </div>
      </th>
      <MetricCell value={formatValue(row.indicator.baseline, row.indicator.unit)} />
      <MetricCell value={formatValue(row.indicator.target, row.indicator.unit)} strong />
      <td className={`border-b border-r border-white px-3 py-3 text-center ${row.tone.cellClass}`}>
        <div className="flex min-h-14 items-center justify-center gap-2">
          <span className="text-2xl font-black leading-none">{displayOrSpace(formatValue(row.current, row.indicator.unit))}</span>
          <TrendIndicator comparison={row.comparison} />
        </div>
        <p className="mt-1 text-[9px] font-black uppercase opacity-70">{row.hasCurrent ? "Current" : "No value recorded"}</p>
      </td>
      <td className="border-b border-r border-slate-100 px-3 py-3 text-center"><TrendIndicator comparison={row.comparison} showLabel /></td>
      <td className={`border-b border-r border-white px-3 py-3 text-center ${row.hasCurrent && row.scorable ? row.tone.cellClass : NEUTRAL_TONE.cellClass}`}><p className="text-lg font-black">{displayOrSpace(gap.value)}</p><p className="mt-1 text-[9px] font-black uppercase opacity-70">{gap.label}</p></td>
      <td className={`border-b border-white px-3 py-3 text-center ${row.tone.paleClass}`}><StatusBadge row={row} /></td>
    </tr>
  );
}

function SimpleResultCard({ row }: { row: ResultRow }) {
  const gap = gapDisplay(row);
  return (
    <article className={`overflow-hidden rounded-lg border border-l-4 ${row.tone.paleClass}`} style={{ borderLeftColor: row.tone.color }}>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0"><span className="text-[10px] font-black uppercase opacity-60">{row.indicator.code} · {row.level}</span><h3 className="mt-1 text-[14px] font-black leading-snug">{row.indicator.name}</h3></div>
        <StatusBadge row={row} />
      </div>
      <div className={`mx-3 mb-3 flex min-h-24 items-center justify-between gap-3 rounded-lg px-4 py-3 ${row.tone.cellClass}`}>
        <div><p className="text-[10px] font-black uppercase opacity-65">Current result</p><p className="mt-1 break-words text-3xl font-black leading-none">{displayOrSpace(formatValue(row.current, row.indicator.unit))}</p></div>
        <TrendIndicator comparison={row.comparison} size="large" />
      </div>
      <div className="grid grid-cols-2 gap-px border-y border-black/5 bg-black/5 text-center">
        <CardMetric label="Starting point" value={formatValue(row.indicator.baseline, row.indicator.unit)} />
        <CardMetric label="Target" value={formatValue(row.indicator.target, row.indicator.unit)} strong />
        <CardMetric label="Gap to target" value={gap.value} note={gap.label} />
        <CardMetric label="Weighted score" value={row.weightedScore === null ? "" : row.weightedScore.toFixed(1)} note={`${formatWeight(row.indicator.weight)} weight`} />
      </div>
      <p className="p-4 text-[12px] leading-relaxed opacity-75">{row.indicator.definition}</p>
    </article>
  );
}

function ScoreMatrix({ rows, displayedScore, displayedRating, scoredWeight }: { rows: ResultRow[]; displayedScore: number | null; displayedRating: string; scoredWeight: number }) {
  const compositeTone = displayedScore === null ? NEUTRAL_TONE : toneForScore(displayedScore);
  const scoreDisplay = displayedScore === null ? "Awaiting verified returns" : formatNumber(displayedScore) + " / 100";
  return (
    <div className="p-3 sm:p-5">
      <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        <FrameworkStep number="1" label="Indicators" value={`${rows.length} shown`} icon="ListChecks" />
        <FrameworkStep number="2" label="Scored weight" value={`${formatNumber(scoredWeight)}%`} icon="Scale" />
        <FrameworkStep number="3" label="Criteria bands" value="60 · 70 · 80 · 90 · 100" icon="Gauge" />
        <FrameworkStep number="4" label="Overall score" value={scoreDisplay} icon="ChartNoAxesCombined" tone={compositeTone} />
      </div>

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-3.5 py-3 text-[12px] leading-relaxed text-indigo-950">
        <Icon name="Info" size={17} className="mt-0.5 shrink-0 text-indigo-700" />
        <p><strong>Weighted score matrix.</strong> Current values are measured from the starting point toward the target, capped at 100%. Indicators without a measurable target remain visible but are not scored.</p>
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 md:block" role="region" aria-label="Weighted programme score matrix" tabIndex={0}>
        <table className="w-full min-w-[1440px] border-separate border-spacing-0 text-left text-[11px]">
          <caption className="sr-only">Weighted score matrix showing criteria bands, current achievement, gap, raw score and weighted score.</caption>
          <thead>
            <tr className="bg-slate-900 text-white">
              <Th rowSpan={2} className="rounded-tl-lg">Result / success indicator</Th>
              <Th rowSpan={2} centered>Weight</Th>
              <Th rowSpan={2} centered>Starting point</Th>
              <th scope="colgroup" colSpan={5} className="border-r border-white/15 px-2 py-2.5 text-center text-[10px] font-black uppercase">Target / criteria values</th>
              <Th rowSpan={2} centered className="min-w-[150px]">Current value</Th>
              <Th rowSpan={2} centered className="min-w-[130px]">Gap</Th>
              <Th rowSpan={2} centered>Raw score</Th>
              <Th rowSpan={2} centered className="rounded-tr-lg">Weighted score</Th>
            </tr>
            <tr>{SCORE_BANDS.map((band) => <th scope="col" key={band.score} className={`border-r border-white/15 px-2 py-2 text-center text-[9px] font-black uppercase ${band.headerClass}`}><span className="block">{band.label}</span><span className="mt-0.5 block opacity-75">{band.score}%</span></th>)}</tr>
          </thead>
          <tbody>{rows.map((row, index) => <MatrixRow key={row.indicator.code} row={row} index={index} />)}</tbody>
          <tfoot>
            <tr className={`font-black ${compositeTone.strongClass}`}>
              <td colSpan={11} className="rounded-bl-lg px-4 py-4 text-right text-[13px]">Composite score · {displayedRating}</td>
              <td className="rounded-br-lg px-4 py-4 text-center text-xl">{scoreDisplay}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="space-y-3 md:hidden">{rows.map((row) => <MatrixCard key={row.indicator.code} row={row} />)}</div>
      <div className={`mt-3 flex items-center justify-between rounded-lg px-4 py-4 md:hidden ${compositeTone.strongClass}`}><span className="text-[13px] font-black">Composite score · {displayedRating}</span><span className="text-xl font-black">{scoreDisplay}</span></div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Criteria values show 60%, 70%, 80%, 90% and 100% progress from the starting point to the target. Weighted score equals achievement multiplied by the indicator weight. Blank values remain blank.</p>
    </div>
  );
}

function MatrixRow({ row, index }: { row: ResultRow; index: number }) {
  const gap = gapDisplay(row);
  return (
    <tr className={index % 2 ? "bg-slate-50/70" : "bg-white"}>
      <th scope="row" className="border-b border-r border-slate-100 px-3 py-3 text-left">
        <div className="flex items-start gap-2"><span className="rounded bg-slate-100 px-1.5 py-1 text-[9px] font-black text-slate-600">{row.indicator.code}</span><div><p className="max-w-[270px] font-black leading-snug text-slate-800">{row.indicator.name}</p><span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-600">{row.indicator.level}</span></div></div>
      </th>
      <Td centered strong>{formatWeight(row.indicator.weight)}</Td>
      <Td centered>{formatValue(row.indicator.baseline, row.indicator.unit)}</Td>
      {SCORE_BANDS.map((band) => <td key={band.score} className={`border-b border-r border-white px-2 py-3 text-center font-bold ${row.scorable ? band.cellClass : "bg-slate-50 text-slate-400"}`}>{row.scorable ? formatValue(criteriaValue(row, band.score), row.indicator.unit) : ""}</td>)}
      <td className={`border-b border-r border-white px-3 py-3 text-center ${row.tone.cellClass}`}>
        <div className="flex min-h-12 items-center justify-center gap-2"><span className="text-xl font-black leading-none">{displayOrSpace(formatValue(row.current, row.indicator.unit))}</span><TrendIndicator comparison={row.comparison} /></div>
        <p className="mt-1 text-[8px] font-black uppercase opacity-70">{row.hasCurrent ? "Current" : "No value recorded"}</p>
      </td>
      <td className={`border-b border-r border-white px-2 py-3 text-center ${row.hasCurrent && row.scorable ? row.tone.cellClass : NEUTRAL_TONE.cellClass}`}><p className="text-[15px] font-black">{displayOrSpace(gap.value)}</p><p className="mt-1 text-[8px] font-black uppercase opacity-70">{gap.label}</p></td>
      <td className={`border-b border-r border-white px-2 py-3 text-center ${row.achievement !== null ? toneForScore(row.achievement * 100).cellClass : NEUTRAL_TONE.cellClass}`}><p className="text-[15px] font-black">{row.achievement === null ? "" : `${(row.achievement * 100).toFixed(1)}%`}</p><p className="mt-1 text-[8px] font-black uppercase opacity-70">{row.achievement !== null ? "Achievement" : row.scorable ? "Awaiting data" : "Not scored"}</p></td>
      <td className={`border-b border-white px-2 py-3 text-center ${row.achievement !== null ? toneForScore(row.achievement * 100).cellClass : NEUTRAL_TONE.cellClass}`}><p className="text-[15px] font-black">{row.weightedScore === null ? "" : row.weightedScore.toFixed(1)}</p><p className="mt-1 text-[8px] font-black uppercase opacity-70">{row.achievement !== null ? "Points" : row.scorable ? "Awaiting data" : "Not scored"}</p></td>
    </tr>
  );
}

function MatrixCard({ row }: { row: ResultRow }) {
  const gap = gapDisplay(row);
  const rawTone = row.achievement !== null ? toneForScore(row.achievement * 100) : NEUTRAL_TONE;
  return (
    <details className={`overflow-hidden rounded-lg border border-l-4 ${row.tone.paleClass}`} style={{ borderLeftColor: row.tone.color }}>
      <summary className="cursor-pointer list-none p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><span className="text-[9px] font-black uppercase opacity-60">{row.indicator.code} · {row.level}</span><p className="mt-1 text-[13px] font-black leading-snug">{row.indicator.name}</p></div>
          <div className={`shrink-0 rounded-lg px-2.5 py-2 text-right ${rawTone.cellClass}`}><p className="text-lg font-black leading-none">{row.achievement === null ? "" : `${(row.achievement * 100).toFixed(1)}%`}</p><p className="mt-1 text-[8px] font-black uppercase">{row.achievement !== null ? "Raw score" : row.scorable ? "Awaiting data" : "Not scored"}</p></div>
        </div>
      </summary>
      <div className="border-t border-black/5 p-3.5">
        <div className={`mb-3 flex min-h-20 items-center justify-between rounded-lg px-3.5 py-3 ${row.tone.cellClass}`}><div><p className="text-[9px] font-black uppercase opacity-65">Current result</p><p className="mt-1 text-2xl font-black">{displayOrSpace(formatValue(row.current, row.indicator.unit))}</p></div><TrendIndicator comparison={row.comparison} size="large" /></div>
        <div className="grid grid-cols-2 gap-2 text-center"><CardMetric label="Starting point" value={formatValue(row.indicator.baseline, row.indicator.unit)} /><CardMetric label="Target" value={formatValue(row.indicator.target, row.indicator.unit)} strong /><CardMetric label="Gap" value={gap.value} note={gap.label} /><CardMetric label="Weighted score" value={row.weightedScore === null ? "" : row.weightedScore.toFixed(1)} note={`${formatWeight(row.indicator.weight)} weight`} /></div>
        <div className="mt-3 grid grid-cols-5 gap-1">{SCORE_BANDS.slice().reverse().map((band) => <div key={band.score} className={`rounded-md p-1.5 text-center ${row.scorable ? band.cellClass : "bg-slate-100 text-slate-400"}`}><p className="text-[8px] font-black opacity-65">{band.score}%</p><p className="mt-0.5 break-words text-[9px] font-black">{row.scorable ? formatValue(criteriaValue(row, band.score), row.indicator.unit) : ""}</p></div>)}</div>
      </div>
    </details>
  );
}

function FrameworkStep({ number, label, value, icon, tone = NEUTRAL_TONE }: { number: string; label: string; value: string; icon: string; tone?: ResultTone }) {
  return <div className={`flex min-h-20 items-center gap-3 rounded-lg border p-3 ${tone.paleClass} ${tone.borderClass}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tone.strongClass}`}><Icon name={icon} size={18} /></span><span className="min-w-0"><span className="block text-[9px] font-black uppercase text-slate-500">{number}. {label}</span><span className="mt-1 block break-words text-[14px] font-black text-slate-900">{value}</span></span></div>;
}

function MetricCell({ value, strong = false }: { value: string; strong?: boolean }) {
  return <td className="border-b border-r border-slate-100 px-3 py-4 text-center"><span className={`text-[14px] ${strong ? "font-black text-indigo-800" : "font-bold text-slate-700"}`}>{displayOrSpace(value)}</span></td>;
}

function CardMetric({ label, value, note, strong = false }: { label: string; value: string; note?: string; strong?: boolean }) {
  return <div className="min-h-20 bg-white/80 px-2 py-3"><p className={`break-words text-[16px] font-black ${strong ? "text-indigo-800" : "text-slate-800"}`}>{displayOrSpace(value)}</p><p className="mt-1 text-[9px] font-black uppercase text-slate-500">{label}</p>{note && <p className="mt-0.5 text-[9px] font-semibold text-slate-400">{note}</p>}</div>;
}

function StatusBadge({ row }: { row: ResultRow }) {
  const label = row.scorable ? row.tone.label : "Not scored";
  const className = row.scorable ? row.tone.strongClass : NEUTRAL_TONE.strongClass;
  return <span className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${className}`}>{label}</span>;
}

function TrendIndicator({ comparison, showLabel = false, size = "normal" }: { comparison: ResultRow["comparison"]; showLabel?: boolean; size?: "normal" | "large" }) {
  const config = comparison === "up"
    ? { icon: "TrendingUp", label: "Up from start", className: "bg-emerald-700 text-white" }
    : comparison === "down"
      ? { icon: "TrendingDown", label: "Down from start", className: "bg-rose-700 text-white" }
      : comparison === "steady"
        ? { icon: "Minus", label: "No change", className: "bg-slate-600 text-white" }
        : { icon: "Minus", label: "No comparison", className: "bg-slate-200 text-slate-600" };
  const dimensions = size === "large" ? "h-12 w-12" : "h-8 w-8";
  return <span className={`inline-flex items-center gap-1.5 ${showLabel ? "flex-col" : ""}`}><span className={`grid shrink-0 place-items-center rounded-full ${dimensions} ${config.className}`} title={config.label}><Icon name={config.icon} size={size === "large" ? 23 : 16} /></span>{showLabel && <span className="text-[9px] font-black uppercase text-slate-500">{config.label}</span>}</span>;
}

function Th({ children, centered = false, rowSpan, className = "" }: { children: React.ReactNode; centered?: boolean; rowSpan?: number; className?: string }) {
  return <th scope="col" rowSpan={rowSpan} className={`border-r border-white/15 px-3 py-3 text-[10px] font-black uppercase ${centered ? "text-center" : "text-left"} ${className}`}>{children}</th>;
}

function Td({ children, centered = false, strong = false }: { children: React.ReactNode; centered?: boolean; strong?: boolean }) {
  return <td className={`border-b border-r border-slate-100 px-2 py-3 ${centered ? "text-center" : "text-left"} ${strong ? "font-black text-slate-800" : "font-semibold text-slate-600"}`}>{children}</td>;
}

function buildResultRow(indicator: RevisedIndicator, current: SourceValue): ResultRow {
  const currentNumber = numericValue(current);
  const baselineNumber = numericValue(indicator.baseline);
  const targetNumber = numericValue(indicator.target);
  const hasCurrent = hasValue(current);
  const baselineForCalculation = baselineNumber;
  const scorable = indicator.weight > 0 && targetNumber !== null && baselineForCalculation !== null;
  const currentForCalculation = currentNumber;
  const achievement = scorable && currentForCalculation !== null
    ? calculateAchievement(baselineForCalculation, targetNumber, currentForCalculation)
    : null;
  const weightedScore = achievement === null ? null : achievement * indicator.weight * 100;
  const gap = scorable && currentNumber !== null ? targetNumber - currentNumber : null;
  const comparison = currentNumber === null || baselineForCalculation === null
    ? "none"
    : currentNumber > baselineForCalculation
      ? "up"
      : currentNumber < baselineForCalculation
        ? "down"
        : "steady";
  const tone = hasCurrent && achievement !== null ? toneForScore(achievement * 100) : NEUTRAL_TONE;

  return { indicator, level: normalizeLevel(indicator.level), current, hasCurrent, currentNumber, baselineForCalculation, targetNumber, scorable, achievement, weightedScore, gap, comparison, tone };
}

function calculateAchievement(baseline: number, target: number, current: number) {
  const span = target - baseline;
  if (span === 0) return current === target ? 1 : 0;
  return Math.max(0, Math.min(1, (current - baseline) / span));
}

function criteriaValue(row: ResultRow, band: 60 | 70 | 80 | 90 | 100) {
  if (!row.scorable || row.baselineForCalculation === null || row.targetNumber === null) return null;
  return row.baselineForCalculation + (row.targetNumber - row.baselineForCalculation) * band / 100;
}

function normalizeLevel(level: string): ResultLevel {
  const value = level.toLowerCase();
  if (value.includes("input")) return "Input";
  if (value.includes("output")) return "Output";
  if (value.includes("outcome")) return "Outcome";
  if (value.includes("impact")) return "Impact";
  return "Other";
}

function toneForScore(score: number): ResultTone {
  if (score >= 85) return { label: "On track", color: "#15803d", cellClass: "bg-emerald-100 text-emerald-950", paleClass: "bg-emerald-50 text-emerald-950", strongClass: "bg-emerald-700 text-white", borderClass: "border-emerald-200" };
  if (score >= 65) return { label: "Needs attention", color: "#b45309", cellClass: "bg-amber-100 text-amber-950", paleClass: "bg-amber-50 text-amber-950", strongClass: "bg-amber-500 text-amber-950", borderClass: "border-amber-200" };
  return { label: "Critical", color: "#be123c", cellClass: "bg-rose-100 text-rose-950", paleClass: "bg-rose-50 text-rose-950", strongClass: "bg-rose-700 text-white", borderClass: "border-rose-200" };
}

function gapDisplay(row: ResultRow) {
  if (row.gap === null) return { value: "", label: row.scorable ? "No current value" : "Not scored" };
  const magnitude = Math.abs(row.gap);
  if (magnitude < 0.0001) return { value: formatGap(magnitude, row.indicator.unit), label: "Target met" };
  if (row.gap < 0) return { value: formatGap(magnitude, row.indicator.unit), label: "Above target" };
  return { value: formatGap(magnitude, row.indicator.unit), label: "Still needed" };
}

function formatValue(value: SourceValue, unit: string) {
  if (!hasValue(value)) return "";
  if (typeof value !== "number") return String(value);
  const formatted = formatNumber(value);
  const normalized = unit.trim().toLowerCase();
  if (normalized === "%" || normalized === "percent" || normalized === "percentage") return `${formatted}%`;
  if (normalized === "₹ crore") return `₹${formatted} Cr`;
  if (normalized === "₹ lakh") return `₹${formatted} lakh`;
  if (["milestones", "components", "ports", "leads", "jobs", "clusters", "offices"].includes(normalized)) return `${formatted} ${pluralUnit(normalized, value)}`;
  return unit ? `${formatted} ${unit}` : formatted;
}

function formatGap(value: number, unit: string) {
  const normalized = unit.trim().toLowerCase();
  if (normalized === "%" || normalized === "percent" || normalized === "percentage") return `${formatNumber(value)} points`;
  return formatValue(value, unit);
}

function pluralUnit(unit: string, value: number) {
  if (Math.abs(value) !== 1) return unit;
  return unit.endsWith("ies") ? `${unit.slice(0, -3)}y` : unit.endsWith("s") ? unit.slice(0, -1) : unit;
}

function formatWeight(weight: number) {
  return `${formatNumber(weight * 100)}%`;
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "";
  const decimals = Math.abs(value) < 10 && !Number.isInteger(value) ? 2 : Number.isInteger(value) ? 0 : 1;
  return Number(value.toFixed(decimals)).toLocaleString("en-IN");
}

function numericValue(value: SourceValue): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function hasValue(value: SourceValue | undefined): value is string | number {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function displayOrSpace(value: string) {
  return value || "\u00a0";
}
