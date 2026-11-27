"use client";

import { ProvenanceTooltip } from "@/components/DataProvenance";
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
} from "@/components/FiscalWorkspace";
import { cagMetric, type CagKeralaAccountsData } from "@/data/cagKeralaAccountsSnapshot";
import { statusPaperDevelopment, type StatusPaperMetric } from "@/data/keralaStatusPaperFinance";
import { useCagKeralaAccounts } from "@/hooks/useCagKeralaAccounts";
import { useKeralaBudgetPortal } from "@/hooks/useKeralaBudgetPortal";

const expenditureActualIds = new Set(["salary", "pension", "interest-payments", "subsidy"]);
const annualExpenditureIds = new Set(["total-expenditure", "revenue-expenditure", "capital-expenditure", "interest"]);
const statePlanExpenditure = {
  id: "state-plan-expenditure",
  label: "State plan expenditure",
  value: 33105.74,
  unit: "₹ Cr",
  period: "FY 2024–25",
  basis: "Accounts · Table 6.2",
  page: 130,
  sourceOwner: "Finance Department data",
  referenceValue: 33779.46,
  referenceLabel: "FY 2025–26 RE",
  note: "Includes centrally sponsored schemes and excludes spending by local self-governments.",
} satisfies StatusPaperMetric;
const metrics = [
  { id: "total-expenditure", tone: "violet", icon: "WalletCards" },
  { id: "revenue-expenditure", tone: "teal", icon: "Banknote" },
  { id: "capital-expenditure", tone: "blue", icon: "Construction" },
] as const;

const spendingCategories = [
  { id: "salary", color: "#6d4cdb" },
  { id: "pension", color: "#bb4486" },
  { id: "interest-payments", color: "#c17427" },
  { id: "subsidy", color: "#4e8660" },
  { id: "other-revenue-expenditure", color: "#007f85" },
  { id: "capital-expenditure", color: "#2862bb" },
];

const spendingSectors = [
  { id: "general-sector", color: "#6d4cdb" },
  { id: "social-sector", color: "#bb4486" },
  { id: "economic-sector", color: "#247f85" },
];

function comparisonItems(data: CagKeralaAccountsData, categories: typeof spendingCategories) {
  return categories.flatMap(({ id, color }) => {
    const metric = cagMetric(data, id);
    return metric ? [{ label: metric.label, value: metric.actual, color }] : [];
  });
}

export default function BudgetPage() {
  const { data: accounts } = useCagKeralaAccounts();
  const { data: portal } = useKeralaBudgetPortal();
  const actualSource = cagFiscalSource(accounts);
  const expenditureSource = budgetFiscalSource(portal.expenditure.source, portal.mode);
  const annualSource = budgetFiscalSource(portal.budgetAtGlance.source, portal.mode);
  const reportSource = statusPaperFiscalSource();

  const overview: FiscalMetric[] = metrics.flatMap(({ id, tone, icon }) => {
    const metric = cagMetric(accounts, id);
    return metric ? [{
      label: metric.label,
      value: metric.actual,
      source: actualSource,
      detail: "Provisional actual · 30 Jun 2026",
      reference: `CAG workbook BE ${crore(metric.budgetReference)}`,
      tone,
      icon,
    }] : [];
  });

  const heads = portal.expenditure.heads.map((head) => ({
    id: head.id,
    label: head.label,
    actual: expenditureActualIds.has(head.id) ? (cagMetric(accounts, head.id)?.actual ?? null) : null,
    estimate: head.value,
  }));

  const totalExpenditure = cagMetric(accounts, "total-expenditure");
  const sectorExpenditure = cagMetric(accounts, "sector-expenditure");
  const annualRows = portal.budgetAtGlance.rows.filter((row) => annualExpenditureIds.has(row.id));
  const inclusionMetrics = statusPaperDevelopment.filter((metric) => ["scsp-utilisation", "tsp-utilisation"].includes(metric.id));

  return (
    <FiscalWorkspace
      section="budget"
      title="Budget & Expenditure"
      description="Spending recorded through June 2026, annual accounts and budget estimates by head."
      sources={[actualSource, expenditureSource, annualSource, reportSource]}
    >
      <FiscalMetrics items={overview} />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <FiscalSection
          id="spending-composition"
          title="Where spending went"
          description="Revenue outlays by type, with capital expenditure"
          source={actualSource}
        >
          <FiscalComparison items={comparisonItems(accounts, spendingCategories)} total={totalExpenditure?.actual} />
        </FiscalSection>
        <FiscalSection
          id="sector-expenditure"
          title="Spending by sector"
          description={sectorExpenditure ? `CAG sector series · ${crore(sectorExpenditure.actual)}` : "CAG sector series"}
          source={actualSource}
        >
          <FiscalComparison items={comparisonItems(accounts, spendingSectors)} total={sectorExpenditure?.actual} />
        </FiscalSection>
      </div>

      <FiscalSection
        id="expenditure-heads"
        title="Expenditure heads"
        description="CAG provisional actuals where classifications match. FY 2026–27 estimates from the Kerala Budget Portal."
        source={expenditureSource}
      >
        <FiscalHeadTable rows={heads} type="expenditure" source={expenditureSource} actualSource={actualSource} />
        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          The Budget Portal lists overlapping heads. Interest Charges and Interest Payments are distinct entries in that report. Use the CAG total above for overall spending.
        </p>
      </FiscalSection>

      <FiscalSection
        id="annual-expenditure"
        title="Annual expenditure"
        description="Compare published full-year accounts. Switch to the estimate view for BE and RE."
        source={annualSource}
      >
        <FiscalHistory rows={annualRows} source={annualSource} />
      </FiscalSection>

      <FiscalSection
        id="inclusion-spending"
        title="Plan and inclusion spending"
        description="FY 2024–25 state plan expenditure and share of SCSP and TSP outlays spent."
        source={reportSource}
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <StatePlanMetric />
          {inclusionMetrics.map((metric) => <InclusionMetric key={metric.id} metric={metric} />)}
        </div>
      </FiscalSection>
    </FiscalWorkspace>
  );
}

function StatePlanMetric() {
  const metric = statePlanExpenditure;
  const source = statusPaperFiscalSource(metric);

  return (
    <article className="min-w-0 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 text-violet-900">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-800">{metric.label}</h3>
        <ProvenanceTooltip provenance={source} />
      </div>
      <p className="mt-2 text-2xl font-extrabold tracking-tight">{crore(metric.value)}</p>
      <p className="mt-1 text-xs text-slate-700">{metric.period} accounts</p>
      <p className="mt-1 text-xs text-slate-600">{metric.referenceLabel} · {crore(metric.referenceValue)}</p>
      {source.url && <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold hover:underline">Finance Department data · p. {metric.page} ↗</a>}
    </article>
  );
}

function InclusionMetric({ metric }: { metric: StatusPaperMetric }) {
  const source = statusPaperFiscalSource(metric);
  const tone = metric.id === "tsp-utilisation"
    ? "border-blue-100 bg-blue-50/70 text-blue-900"
    : "border-teal-100 bg-teal-50/70 text-teal-900";

  return (
    <article className={`min-w-0 rounded-2xl border p-4 ${tone}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-800">{metric.label}</h3>
        <ProvenanceTooltip provenance={source} />
      </div>
      <p className="mt-2 text-2xl font-extrabold tracking-tight">{metric.value.toFixed(2)}%</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-current/10" aria-hidden="true">
        <span className="block h-full rounded-full bg-current" style={{ width: `${metric.value}%` }} />
      </div>
      {source.url && <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold hover:underline">Finance Department data · p. {metric.page} ↗</a>}
    </article>
  );
}
