"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Banknote, Coins, Landmark, Scale, TrendingUp } from "lucide-react";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { budgetFiscalSource, cagFiscalSource, crore } from "@/components/FiscalWorkspace";
import { cagMetric } from "@/data/cagKeralaAccountsSnapshot";
import { keralaBudgetLastGoodSnapshot } from "@/data/keralaBudgetSnapshot";
import { useCagKeralaAccounts } from "@/hooks/useCagKeralaAccounts";
import styles from "./CmFiscalOverview.module.css";

const definitions = [
  { id: "revenue-receipts", label: "Revenue receipts", icon: Coins, tone: "teal" },
  { id: "total-expenditure", label: "Total expenditure", icon: Banknote, tone: "blue" },
  { id: "capital-expenditure", label: "Capital expenditure", icon: TrendingUp, tone: "violet" },
  { id: "fiscal-balance", label: "Fiscal balance", icon: Scale, tone: "rose" },
] as const;

const budgetHistory = keralaBudgetLastGoodSnapshot.overallPosition;
const annualAccounts = budgetHistory.history.filter((item) => item.financialYearStart >= 2020 && item.financialYearStart <= 2024);
const annualSource = {
  ...budgetFiscalSource(budgetHistory.source, "snapshot"),
  period: "FY 2020–21 to FY 2024–25",
  basis: "Published full-year accounts, ₹ crore rounded in the portal",
};
const annualScale = 200000;
const ticks = [200000, 150000, 100000, 50000, 0];
const percent = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

export function CmFiscalOverview() {
  const { data } = useCagKeralaAccounts();
  const source = { ...cagFiscalSource(data), url: data.source.workbookUrl };
  const items = definitions.flatMap((item) => {
    const metric = cagMetric(data, item.id);
    return metric ? [{ ...item, actual: metric.actual }] : [];
  });
  const receipts = cagMetric(data, "revenue-receipts")?.actual;
  const spending = cagMetric(data, "revenue-expenditure")?.actual;
  const balance = cagMetric(data, "revenue-balance")?.actual;
  const coverage = receipts !== undefined && spending !== undefined && spending > 0 ? receipts / spending * 100 : null;
  const hasComparison = receipts !== undefined && spending !== undefined && balance !== undefined;

  return (
    <section id="state-finances" aria-labelledby="cm-fiscal-title" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.icon}><Landmark size={21} aria-hidden="true" /></span>
        <div className={styles.title}>
          <h2 id="cm-fiscal-title">State finances</h2>
          <p>{source.period} · {source.basis}</p>
        </div>
        <CmSourceDetails sources={[source, annualSource]} label="State finance sources" inverted />
      </header>

      <div className={styles.content}>
        <dl className={styles.metrics}>
          {items.map(({ id, label, icon: Icon, actual, tone }) => (
            <div key={id} data-tone={tone} className={styles.metric}>
              <dt><Icon size={16} aria-hidden="true" />{label}</dt>
              <dd>{crore(actual)}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.figures}>
          {hasComparison && (
            <figure className={styles.current}>
              <figcaption className={styles.caption}>
                <div><h3>Revenue spending and receipts</h3><p>{source.period}</p></div>
                <CmSourceDetails sources={[source]} label="Provisional accounts source" />
              </figcaption>
              <div className={styles.currentBars}>
                {[{ label: "Revenue receipts", value: receipts, className: styles.teal }, { label: "Revenue expenditure", value: spending, className: styles.blue }].map((row) => (
                  <div key={row.label}>
                    <div className={styles.barLabel}><span>{row.label}</span><strong>{crore(row.value)}</strong></div>
                    <div className={styles.track} aria-hidden="true"><span className={row.className} style={{ width: `${row.value / Math.max(receipts, spending, 1) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
              {balance < 0 && coverage !== null && (
                <div className={styles.signal}>
                  <ArrowDownRight aria-hidden="true" size={17} />
                  <p><strong>{crore(-balance)} revenue shortfall.</strong> Receipts covered {percent.format(coverage)}% of revenue expenditure in the same period.</p>
                </div>
              )}
            </figure>
          )}

          <figure className={styles.history}>
            <figcaption className={styles.caption}>
              <div><h3>Five-year revenue trend</h3><p>Full-year accounts · ₹ lakh crore</p></div>
              <CmSourceDetails sources={[annualSource]} label="Full-year accounts source" />
            </figcaption>
            <div className={styles.legend} aria-hidden="true"><span><i className={styles.teal} />Receipts</span><span><i className={styles.blue} />Expenditure</span></div>
            <div className={styles.chart} aria-hidden="true">
              <div className={styles.chartTicks}>{ticks.map((tick) => <span key={tick}>{tick / 100000}</span>)}</div>
              <div className={styles.chartLines}>{ticks.map((tick) => <span key={tick} />)}</div>
              <div className={styles.columns}>
                {annualAccounts.map((row) => (
                  <div key={row.financialYear} title={`${row.financialYear} · Receipts ${crore(row.revenueReceipts)} · Expenditure ${crore(row.revenueExpenditure)}`}>
                    <span className={styles.teal} style={{ height: `${row.revenueReceipts / annualScale * 100}%` }} />
                    <span className={styles.blue} style={{ height: `${row.revenueExpenditure / annualScale * 100}%` }} />
                    <small>{row.financialYear.slice(2)}</small>
                  </div>
                ))}
              </div>
            </div>
            <details className={styles.annualDetail}>
              <summary>View annual figures <ArrowRight size={13} aria-hidden="true" /></summary>
              <table>
                <thead><tr><th scope="col">FY</th><th scope="col">Receipts</th><th scope="col">Expenditure</th></tr></thead>
                <tbody>{annualAccounts.map((row) => <tr key={row.financialYear}><th scope="row">{row.financialYear}</th><td>{crore(row.revenueReceipts)}</td><td>{crore(row.revenueExpenditure)}</td></tr>)}</tbody>
              </table>
            </details>
          </figure>
        </div>

        <footer className={styles.footer}>
          <p>CAG Kerala · {data.mode === "live" ? "Last synced" : "Snapshot checked"} {source.fetchedAt}</p>
          <Link href="/finance">Finance breakdown <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </footer>
      </div>
    </section>
  );
}
