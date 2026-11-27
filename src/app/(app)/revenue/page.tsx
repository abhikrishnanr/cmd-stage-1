"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  FiscalComparison,
  FiscalHeadTable,
  FiscalHistory,
  FiscalMetrics,
  FiscalSection,
  FiscalWorkspace,
  budgetFiscalSource,
  cagFiscalSource,
  crore,
  statusPaperFiscalSource,
  type FiscalMetric,
  type FiscalSource,
} from "@/components/FiscalWorkspace";
import { cagMetric, type CagKeralaAccountsData } from "@/data/cagKeralaAccountsSnapshot";
import { statusPaperRevenueBudget } from "@/data/keralaStatusPaperFinance";
import { useCagKeralaAccounts } from "@/hooks/useCagKeralaAccounts";
import { useKeralaBudgetPortal } from "@/hooks/useKeralaBudgetPortal";

const receiptMetrics = [
  { id: "revenue-receipts", tone: "teal", icon: "Landmark" },
  { id: "capital-receipts", tone: "violet", icon: "Layers3" },
  { id: "total-receipts", tone: "blue", icon: "WalletCards" },
] as const;

const receiptComponents = [
  { id: "tax-revenue", label: "Tax revenue", color: "#007f77" },
  { id: "non-tax-revenue", label: "Non-tax revenue", color: "#6354bc" },
  { id: "grants", label: "Grants and contributions", color: "#c7791c" },
] as const;

const matchingCagHeads = new Set(["gst", "land-revenue", "sales-tax", "stamps-registration", "state-excise"]);
const historyRows = new Set([
  "revenue-receipts", "state-tax", "non-tax", "central-transfers", "capital-receipts", "total-receipts",
]);

// Kerala Status Paper p. 84, Table 3.2, Accounts in crore rounded as published.
// The FY 2025–26 entry agrees with the Budget Portal RE and is omitted from this accounts series.
const ownTaxAccounts = [
  { year: "2016–17", value: 42176 },
  { year: "2017–18", value: 46460 },
  { year: "2018–19", value: 50644 },
  { year: "2019–20", value: 50323 },
  { year: "2020–21", value: 47661 },
  { year: "2021–22", value: 58340 },
  { year: "2022–23", value: 71968 },
  { year: "2023–24", value: 74329 },
  { year: "2024–25", value: 76642 },
] as const;

function receiptOverview(data: CagKeralaAccountsData, source: FiscalSource): FiscalMetric[] {
  return receiptMetrics.flatMap(({ id, tone, icon }) => {
    const metric = cagMetric(data, id);
    if (!metric) return [];
    return [{
      label: metric.label,
      value: metric.actual,
      detail: data.source.period,
      reference: `FY ${data.financialYear} workbook BE · ${crore(metric.budgetReference)}`,
      tone,
      icon,
      source,
    }];
  });
}

function OwnTaxHistory() {
  const [selectedYear, setSelectedYear] = useState<string>(ownTaxAccounts[ownTaxAccounts.length - 1].year);
  const selected = ownTaxAccounts.find(({ year }) => year === selectedYear) ?? ownTaxAccounts[0];
  const largestValue = Math.max(...ownTaxAccounts.map(({ value }) => value));

  return (
    <>
      <div aria-live="polite" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <strong className="text-[clamp(1.65rem,2.8vw,2.4rem)] font-bold tracking-tight text-teal-900 tabular-nums">
          {crore(selected.value)}
        </strong>
        <span className="text-xs font-semibold text-slate-600">FY {selected.year} Accounts</span>
      </div>
      <div role="group" aria-label="Choose an account year" className="mt-3 grid grid-cols-9 gap-0.5 sm:gap-1">
        {ownTaxAccounts.map(({ year, value }) => (
          <button
            key={year}
            type="button"
            aria-label={`FY ${year} Accounts, ${crore(value)}`}
            aria-pressed={year === selectedYear}
            title={`FY ${year} Accounts · ${crore(value)}`}
            onClick={() => setSelectedYear(year)}
            className="group grid min-w-0 gap-1 rounded-md px-0.5 pb-1 pt-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            <span className="flex h-21 items-end rounded-t-md border-b border-teal-200/70 bg-teal-50/70 px-0.5 group-hover:bg-teal-100/75">
              <span
                className={`w-full rounded-t-sm ${year === selectedYear ? "bg-teal-700" : "bg-teal-300"}`}
                style={{ height: `${(value / largestValue) * 100}%` }}
              />
            </span>
            <span className="whitespace-nowrap text-center text-[0.6rem] font-semibold tabular-nums text-teal-950 sm:text-[0.65rem]">
              {year.slice(2)}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

export default function RevenuePage() {
  const { data: cag } = useCagKeralaAccounts();
  const { data: portal } = useKeralaBudgetPortal();
  const actualSource = cagFiscalSource(cag);
  const incomeSource = budgetFiscalSource(portal.income.source, portal.mode);
  const accountsSource = budgetFiscalSource(portal.budgetAtGlance.source, portal.mode);
  const stateTax = statusPaperRevenueBudget.find((metric) => metric.id === "state-own-tax-revenue");
  const stateTaxSource = stateTax ? {
    ...statusPaperFiscalSource(stateTax),
    period: "FY 2016–17 to FY 2024–25",
    basis: "Full-year Accounts, rounded to ₹ crore",
    note: "Table 3.2. The FY 2025–26 value is listed under revised estimates on Budget at a Glance.",
  } : null;
  const revenueReceipts = cagMetric(cag, "revenue-receipts")?.actual;
  const receiptMix = receiptComponents.flatMap(({ id, label, color }) => {
    const metric = cagMetric(cag, id);
    return metric ? [{ label, value: metric.actual, color }] : [];
  });
  const incomeHeads = portal.income.heads.map((head) => ({
    id: head.id,
    label: head.label,
    actual: matchingCagHeads.has(head.id) ? (cagMetric(cag, head.id)?.actual ?? null) : null,
    estimate: head.value,
  }));

  return (
    <FiscalWorkspace
      section="revenue"
      title="Kerala revenue"
      description="Track receipts, see what makes up revenue, and look up individual income heads."
      sources={[actualSource, incomeSource, accountsSource, ...(stateTaxSource ? [stateTaxSource] : [])]}
    >
      <FiscalMetrics items={receiptOverview(cag, actualSource)} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <FiscalSection
          id="receipt-mix"
          title="Where revenue comes from"
          description={`${cag.source.period} · unaudited provisional`}
          source={actualSource}
          action={
            <a
              href={cag.source.workbookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-800 hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              CAG workbook <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          }
        >
          <FiscalComparison items={receiptMix} total={revenueReceipts} />
          <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600">
            Tax revenue includes Kerala’s share of Union taxes.
          </p>
        </FiscalSection>

        {stateTaxSource && (
          <FiscalSection
            id="state-own-tax"
            title="State own tax over time"
            description="Annual accounts · Kerala Status Paper, p. 84"
            source={stateTaxSource}
            className="bg-linear-to-br from-white via-white to-teal-50"
          >
            <OwnTaxHistory />
          </FiscalSection>
        )}
      </div>

      <FiscalSection
        id="income-heads"
        title="Income by head"
        description={`CAG provisional actuals through June 2026 · Kerala Budget Portal FY ${portal.financialYear} references`}
        source={incomeSource}
      >
        <FiscalHeadTable rows={incomeHeads} type="income" source={incomeSource} actualSource={actualSource} />
        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          Heads may overlap across classifications. Read each line separately.
        </p>
      </FiscalSection>

      <FiscalSection
        id="revenue-history"
        title="Annual revenue accounts"
        description="Full-year accounts alongside revised and budget estimates"
        source={accountsSource}
      >
        <FiscalHistory rows={portal.budgetAtGlance.rows.filter((row) => historyRows.has(row.id))} source={accountsSource} />
      </FiscalSection>
    </FiscalWorkspace>
  );
}
