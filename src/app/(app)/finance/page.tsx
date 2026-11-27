"use client";

import { ArrowDownRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { formatProvenance, ProvenanceTooltip } from "@/components/DataProvenance";
import {
  budgetFiscalSource,
  cagFiscalSource,
  crore,
  FiscalComparison,
  FiscalHistory,
  FiscalMetrics,
  FiscalSection,
  FiscalWorkspace,
  statusPaperFiscalSource,
  type FiscalMetric,
  type FiscalSource,
} from "@/components/FiscalWorkspace";
import { cagMetric } from "@/data/cagKeralaAccountsSnapshot";
import type { KeralaBudgetOverallPositionPoint } from "@/data/keralaBudgetSnapshot";
import {
  statusPaperArrears,
  statusPaperBorrowing,
  statusPaperKiifb,
  statusPaperPse,
  statusPaperTreasury,
  type StatusPaperMetric,
} from "@/data/keralaStatusPaperFinance";
import { useCagKeralaAccounts } from "@/hooks/useCagKeralaAccounts";
import { useKeralaBudgetPortal } from "@/hooks/useKeralaBudgetPortal";

const RECEIPTS_COLOR = "#0f897c";
const SPENDING_COLOR = "#6948cb";
const DEFICIT_COLOR = "#be395d";

const headlineMetrics: ReadonlyArray<{ id: string; label: string; tone: FiscalMetric["tone"]; icon: string }> = [
  { id: "revenue-receipts", label: "Revenue receipts", tone: "teal", icon: "Coins" },
  { id: "total-expenditure", label: "Total expenditure", tone: "violet", icon: "Wallet" },
  { id: "capital-expenditure", label: "Capital expenditure", tone: "blue", icon: "Building2" },
  { id: "fiscal-balance", label: "Fiscal balance", tone: "rose", icon: "Activity" },
];

const summaryIds = new Set([
  "revenue-receipts",
  "revenue-expenditure",
  "total-expenditure",
  "capital-expenditure",
  "revenue-deficit",
  "fiscal-deficit",
  "primary-deficit",
]);

const statusPaperGroups = [
  {
    title: "Treasury cash balances",
    detail: "Recorded balances · FY 2025-26 close to 16 May 2026",
    className: "border-teal-200 bg-teal-50/65 text-teal-900",
    metrics: statusPaperTreasury.filter((metric) => metric.unit === "₹ Cr"),
  },
  {
    title: "Arrears and borrowing",
    detail: "Dated obligations and FY 2025-26 borrowing flows",
    className: "border-rose-200 bg-rose-50/65 text-rose-900",
    metrics: [
      ...statusPaperArrears.filter((metric) => metric.id === "arrears-total"),
      ...statusPaperBorrowing.filter((metric) => ["open-market-borrowing", "committed-liability-outflow"].includes(metric.id)),
    ],
  },
  {
    title: "KIIFB accounts",
    detail: "Cumulative figures through 31 March 2026",
    className: "border-indigo-200 bg-indigo-50/65 text-indigo-900",
    metrics: statusPaperKiifb.filter((metric) => ["kiifb-borrowings", "kiifb-project-payments", "kiifb-fund-balance"].includes(metric.id)),
  },
  {
    title: "Public sector enterprises",
    detail: "FY 2024-25 results reported in the status paper",
    className: "border-amber-200 bg-amber-50/65 text-amber-950",
    metrics: statusPaperPse.filter((metric) => ["pse-net-loss", "pse-budget-support", "pse-dividends"].includes(metric.id)),
  },
];

function percentage(part: number, whole: number) {
  return `${((part / whole) * 100).toLocaleString("en-IN", { maximumFractionDigits: 1 })}%`;
}

export default function FinancePage() {
  const { data: accounts } = useCagKeralaAccounts();
  const { data: budget } = useKeralaBudgetPortal();
  const cagSource = cagFiscalSource(accounts);
  const glanceSource = budgetFiscalSource(budget.budgetAtGlance.source, budget.mode);
  const accountsHistory = budget.overallPosition.history.filter((point) =>
    point.financialYearStart <= 2024 && point.financialYearStart !== 2022,
  );
  const historySource: FiscalSource = {
    ...budgetFiscalSource(budget.overallPosition.source, budget.mode),
    period: `FY ${accountsHistory[0]?.financialYear} to FY ${accountsHistory.at(-1)?.financialYear}`,
    basis: "Annual Accounts",
  };
  const paperSource = statusPaperFiscalSource();
  const headlineItems = headlineMetrics.flatMap<FiscalMetric>(({ id, label, tone, icon }) => {
    const metric = cagMetric(accounts, id);
    if (!metric) return [];

    return [{
      label,
      value: metric.actual,
      source: cagSource,
      detail: accounts.source.period,
      tone,
      icon,
    }];
  });

  const receipts = cagMetric(accounts, "revenue-receipts");
  const expenditure = cagMetric(accounts, "revenue-expenditure");
  const balance = cagMetric(accounts, "revenue-balance");
  const recurringCosts = [
    { id: "salary", color: "#6948cb" },
    { id: "pension", color: "#2579c4" },
    { id: "interest-payments", color: "#b8790a" },
  ].flatMap(({ id, color }) => {
    const metric = cagMetric(accounts, id);
    return metric ? [{ label: metric.label, value: metric.actual, color }] : [];
  });
  const recurringTotal = recurringCosts.reduce((sum, item) => sum + item.value, 0);

  return (
    <FiscalWorkspace
      section="finance"
      title="Kerala’s fiscal position"
      description="Review provisional accounts, annual fiscal trends and dated treasury balances."
      sources={[cagSource, historySource, glanceSource, paperSource]}
    >
      <FiscalMetrics items={headlineItems} />

      <div className="grid min-w-0 gap-5 lg:grid-cols-2">
        {receipts && expenditure && balance && expenditure.actual > 0 && (
          <FiscalSection
            id="revenue-balance"
            title="Revenue receipts and spending"
            description={`${accounts.source.period} · ₹ crore`}
            source={{ ...cagSource, note: "Spending covered is calculated as revenue receipts divided by revenue expenditure for the same period. Revenue balance is the workbook value." }}
          >
            <FiscalComparison items={[
              { label: receipts.label, value: receipts.actual, color: RECEIPTS_COLOR },
              { label: expenditure.label, value: expenditure.actual, color: SPENDING_COLOR },
            ]} />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-rose-900"><ArrowDownRight size={15} aria-hidden="true" /> Revenue balance</p>
                <p className="mt-1 text-xl font-extrabold tabular-nums text-rose-950">{crore(balance.actual)}</p>
              </div>
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-900"><ArrowUpRight size={15} aria-hidden="true" /> Spending covered by receipts</p>
                <p className="mt-1 text-xl font-extrabold tabular-nums text-teal-950">{percentage(receipts.actual, expenditure.actual)}</p>
              </div>
            </div>
          </FiscalSection>
        )}

        {expenditure && expenditure.actual > 0 && recurringCosts.length === 3 && (
          <FiscalSection
            id="recurring-costs"
            title="Salaries, pensions and interest"
            description={`${accounts.source.period} · ₹ crore`}
            source={{ ...cagSource, note: "Combined share calculated from CAG salary, pension and interest actuals divided by CAG revenue expenditure for the same period." }}
          >
            <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3">
              <strong className="text-2xl font-extrabold tracking-tight text-violet-950">{percentage(recurringTotal, expenditure.actual)}</strong>
              <span className="text-xs font-semibold text-violet-900">of revenue expenditure across these three heads</span>
            </div>
            <FiscalComparison items={recurringCosts} total={expenditure.actual} />
          </FiscalSection>
        )}
      </div>

      {accountsHistory.length > 0 && (
        <FiscalSection
          id="annual-accounts"
          title="Revenue account over time"
          description="Annual Accounts · revenue receipts and revenue expenditure in ₹ crore"
          source={historySource}
        >
          <FinanceHistoryChart points={accountsHistory} />
          <p className="mt-3 text-xs leading-relaxed text-slate-600">
            FY 2022–23 is omitted because the Kerala Budget Portal and the Kerala Status Paper report different revenue expenditure figures for that year.
          </p>
        </FiscalSection>
      )}

      <FiscalSection
        id="status-paper"
        title="Treasury, arrears and public enterprises"
        description="Dated figures from the Kerala fiscal status paper"
        source={paperSource}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {statusPaperGroups.map(({ title, detail, className, metrics }) => (
            <section key={title} className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${className}`}>
              <h3 className="text-base font-extrabold tracking-tight">{title}</h3>
              <p className="mt-1 text-xs opacity-85">{detail}</p>
              <dl className="mt-3 divide-y divide-slate-900/10">
                {metrics.map((metric) => <StatusPaperRow key={metric.id} metric={metric} />)}
              </dl>
            </section>
          ))}
        </div>
      </FiscalSection>

      <FiscalSection
        id="budget-at-a-glance"
        title="Budget at a glance"
        description="Annual accounts and estimate references from the Kerala Budget Portal"
      >
        <FiscalHistory rows={budget.budgetAtGlance.rows.filter((row) => summaryIds.has(row.id))} source={glanceSource} />
      </FiscalSection>
    </FiscalWorkspace>
  );
}

function StatusPaperRow({ metric }: { metric: StatusPaperMetric }) {
  const source = statusPaperFiscalSource(metric);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-2.5 py-3" title={formatProvenance(source)}>
      <dt className="min-w-0 text-sm font-semibold leading-snug">
        {metric.label}
        <span className="mt-1 block text-[11px] font-normal opacity-85">
          {metric.period} · {source.url ? (
            <a className="font-semibold underline underline-offset-2" href={source.url} target="_blank" rel="noreferrer" aria-label={`Open Kerala Status Paper page ${metric.page}`}>p. {metric.page}</a>
          ) : `p. ${metric.page}`}
        </span>
      </dt>
      <dd className="text-right text-sm font-extrabold tabular-nums leading-snug">{crore(metric.value)}</dd>
      <dd><ProvenanceTooltip provenance={source} /></dd>
    </div>
  );
}

const HISTORY_SERIES = [
  { label: "Revenue receipts", key: "revenueReceipts", color: RECEIPTS_COLOR },
  { label: "Revenue expenditure", key: "revenueExpenditure", color: SPENDING_COLOR },
] as const;

function FinanceHistoryChart({ points }: { points: KeralaBudgetOverallPositionPoint[] }) {
  const topValue = Math.max(...points.flatMap((point) => [point.revenueReceipts, point.revenueExpenditure]));
  const tickSize = Math.max(1, Math.ceil(topValue / 200_000)) * 50_000;
  const max = 4 * tickSize;
  const ticks = [max, 3 * tickSize, 2 * tickSize, tickSize, 0];

  return (
    <>
      <figure>
        <figcaption className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-700">
          {HISTORY_SERIES.map(({ label, key, color }) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm" style={{ backgroundColor: color }} aria-hidden="true" />
              {label}
            </span>
          ))}
        </figcaption>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/80 px-3 pb-2 pt-4 sm:px-5">
          <div className="grid min-w-[340px] grid-cols-[auto_minmax(0,1fr)] gap-x-2 sm:gap-x-4">
            <div className="relative h-40 w-[4.5rem] sm:h-52" aria-hidden="true">
              {ticks.map((tick) => (
                <span key={tick} className="absolute right-0 translate-y-1/2 text-[10px] font-medium tabular-nums text-slate-600" style={{ bottom: `${(tick / max) * 100}%` }}>
                  {tick.toLocaleString("en-IN")}
                </span>
              ))}
            </div>
            <div className="relative flex h-40 min-w-0 items-end sm:h-52" aria-hidden="true">
              {ticks.map((tick) => (
                <div key={tick} className={`pointer-events-none absolute inset-x-0 border-t ${tick === 0 ? "border-slate-300" : "border-dashed border-slate-200"}`} style={{ bottom: `${(tick / max) * 100}%` }} />
              ))}
              {points.map((point) => (
                <div key={point.financialYear} className="relative flex h-full min-w-0 flex-1 items-end justify-center gap-1 px-1.5 sm:gap-2">
                  {HISTORY_SERIES.map(({ label, key, color }) => (
                    <div
                      key={key}
                      className="w-3/8 max-w-9 rounded-t-[5px]"
                      style={{ backgroundColor: color, height: `${(point[key] / max) * 100}%` }}
                      title={`FY ${point.financialYear} Accounts · ${label} · ${crore(point[key])}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div aria-hidden="true" />
            <div className="flex py-2 text-center text-[9px] font-semibold tabular-nums text-slate-600 sm:text-[11px]" aria-hidden="true">
              {points.map((point) => <span key={point.financialYear} className="min-w-0 flex-1">{point.financialYear}</span>)}
            </div>
          </div>
        </div>
      </figure>

      <details className="group mt-3 rounded-xl border border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 [&::-webkit-details-marker]:hidden">
          View annual figures
          <ChevronDown size={16} className="transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="overflow-x-auto border-t border-slate-200 px-4 pb-2">
          <table className="w-full min-w-[470px] text-sm tabular-nums">
            <caption className="sr-only">Annual revenue account figures in ₹ crore</caption>
            <thead className="border-b border-slate-200 text-xs text-slate-600">
              <tr>
                <th scope="col" className="py-3 text-left">Financial year</th>
                <th scope="col" className="py-3 pl-4 text-right">Receipts</th>
                <th scope="col" className="py-3 pl-4 text-right">Expenditure</th>
                <th scope="col" className="py-3 pl-4 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {points.map((point) => (
                <tr key={point.financialYear}>
                  <th scope="row" className="whitespace-nowrap py-2.5 text-left font-semibold text-slate-800">{point.financialYear}</th>
                  <td className="whitespace-nowrap py-2.5 pl-4 text-right" style={{ color: RECEIPTS_COLOR }}>{crore(point.revenueReceipts)}</td>
                  <td className="whitespace-nowrap py-2.5 pl-4 text-right" style={{ color: SPENDING_COLOR }}>{crore(point.revenueExpenditure)}</td>
                  <td className="whitespace-nowrap py-2.5 pl-4 text-right" style={{ color: point.revenueDeficit < 0 ? DEFICIT_COLOR : RECEIPTS_COLOR }}>{crore(point.revenueDeficit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="my-2 text-[11px] text-slate-500">Balances are receipts less expenditure using the displayed report series.</p>
        </div>
      </details>
    </>
  );
}
