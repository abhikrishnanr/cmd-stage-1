import { PageHero } from "@/components/PageHero";
import { SectionCard } from "@/components/primitives";
import {
  powerConsumerCategories, powerConsumersSource, powerDaily, powerGenerationSource,
  powerPeakSource, powerStorageSource, powerSupplyMonths,
} from "@/data/power";

const currentMonth = powerSupplyMonths[powerSupplyMonths.length - 1];
const peakScale = Math.max(...powerSupplyMonths.map((month) => month.peakDemandMw));
const count = new Intl.NumberFormat("en-IN");
const energy = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const consumerGroups = { LT: "Low tension", HT: "High tension", EHT: "Extra high tension" } as const;

const dailySupply = [
  { label: "Net imports", value: powerDaily.netImportMu, color: "#285bab" },
  { label: "Internal generation", value: powerDaily.internalGenerationMu, color: "#0f766e" },
];

export default function PowerPage() {
  const consumers = Object.values(powerConsumerCategories).flat().reduce((sum, row) => sum + row.count, 0);

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <PageHero
        title="Power"
        subtitle="Kerala’s reported electricity demand, supply, local generation and consumer connections. MW measures power and MU measures a million units of electricity."
        icon="Zap"
        gradient="linear-gradient(115deg,#102546 0%,#1c4978 52%,#137b76 100%)"
        statusLabel="Published actuals"
        provenance={[powerPeakSource, powerGenerationSource, powerStorageSource, currentMonth.peakSource, currentMonth.energySource, powerConsumersSource]}
        stats={[
          { label: "Evening peak", value: `${count.format(powerDaily.eveningPeakMw)} MW`, sub: `25 Nov · ${powerDaily.eveningPeakTime}`, icon: "Activity", provenance: powerPeakSource },
          { label: "Daily consumption", value: `${energy.format(powerDaily.consumptionMu)} MU`, sub: "25 Nov 2026", icon: "Zap", provenance: powerGenerationSource },
          { label: "Net imports", value: `${energy.format(powerDaily.netImportMu)} MU`, sub: "25 Nov 2026", icon: "ArrowDownToLine", provenance: powerGenerationSource },
          { label: "Peak demand met", value: `${count.format(currentMonth.peakMetMw)} MW`, sub: "Oct 2026 · CEA", icon: "Gauge", provenance: currentMonth.peakSource },
          { label: "Energy supplied", value: `${count.format(currentMonth.energySuppliedMu)} MU`, sub: "Oct 2026 · CEA", icon: "BatteryCharging", provenance: currentMonth.energySource },
          { label: "KSEB consumers", value: count.format(consumers), sub: "Aug 2026", icon: "Users", provenance: powerConsumersSource },
        ]}
      />

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <SectionCard title="Peak demand and supply" subtitle="CEA · August to October 2026" icon="Activity" provenance={currentMonth.peakSource} expandable>
          <div className="mb-4 rounded-xl bg-amber-50 px-3.5 py-3 text-sm text-amber-950">
            <strong>{count.format(currentMonth.peakUnmetMw)} MW of peak demand was unmet in October</strong>
            <span className="block text-xs text-amber-900">{currentMonth.peakUnmetPct}% of the {count.format(currentMonth.peakDemandMw)} MW peak demand reported by CEA.</span>
          </div>
          <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-teal-700" /> Demand met</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> Demand unmet</span>
          </div>
          <ul className="space-y-3">
            {powerSupplyMonths.map((month) => (
              <li key={month.label}>
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-xs">
                  <a href={month.peakSource.url} target="_blank" rel="noreferrer" className="font-bold text-blue-800 underline decoration-blue-300 underline-offset-2">
                    {month.label}<span className="sr-only"> peak report PDF</span>
                  </a>
                  <span className="tabular-nums text-slate-700"><strong>{count.format(month.peakMetMw)} MW met</strong> · {count.format(month.peakUnmetMw)} MW unmet</span>
                </div>
                <div className="flex h-3 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                  <span className="bg-teal-700" style={{ width: `${100 * month.peakMetMw / peakScale}%` }} />
                  <span className="bg-amber-500" style={{ width: `${100 * month.peakUnmetMw / peakScale}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Where the day’s electricity came from" subtitle="SLDC · 25 November 2026" icon="PlugZap" provenance={powerGenerationSource} expandable>
          <p className="mb-2 text-sm text-slate-600">{energy.format(powerDaily.consumptionMu)} MU consumed</p>
          <div className="flex h-5 overflow-hidden rounded-full" aria-hidden="true">
            {dailySupply.map((item) => (
              <span key={item.label} style={{ flexGrow: item.value, backgroundColor: item.color }} />
            ))}
          </div>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {dailySupply.map((item) => (
              <li key={item.label} className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.color }} />{item.label}</span>
                <strong className="text-base tabular-nums" style={{ color: item.color }}>{energy.format(item.value)} MU</strong>
              </li>
            ))}
          </ul>
          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-xs text-slate-600">
            <div><dt>Hydel generation, SLDC subtotal</dt><dd className="font-bold tabular-nums text-slate-900">{energy.format(powerDaily.hydelGenerationMu)} MU</dd></div>
            <div><dt>November daily average through 25 Nov</dt><dd className="font-bold tabular-nums text-slate-900">{energy.format(powerDaily.monthlyAverageConsumptionMu)} MU</dd></div>
            <div><dt>November consumption through 25 Nov</dt><dd className="font-bold tabular-nums text-slate-900">{energy.format(powerDaily.monthlyConsumptionMu)} MU</dd></div>
            <div><dt>Morning peak at {powerDaily.morningPeakTime}</dt><dd className="font-bold tabular-nums text-slate-900"><a href={powerPeakSource.url} target="_blank" rel="noreferrer" className="underline decoration-blue-300 underline-offset-2">{count.format(powerDaily.morningPeakMw)} MW</a></dd></div>
          </dl>
        </SectionCard>

        <SectionCard title="Monthly energy supply" subtitle="CEA · Actual power supply position in MU" icon="BatteryCharging" provenance={currentMonth.energySource} expandable>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] text-right text-xs tabular-nums">
              <thead className="text-slate-500"><tr><th scope="col" className="pb-2 text-left">Report</th><th scope="col">Required</th><th scope="col">Supplied</th><th scope="col">Unserved</th></tr></thead>
              <tbody>
                {powerSupplyMonths.map((month) => (
                  <tr key={month.label} className="border-t border-slate-100">
                    <th scope="row" className="py-2.5 text-left">
                      <a href={month.energySource.url} target="_blank" rel="noreferrer" className="text-blue-800 underline decoration-blue-300 underline-offset-2">
                        {month.label}<span className="sr-only"> energy report PDF</span>
                      </a>
                    </th>
                    <td>{count.format(month.energyRequirementMu)}</td>
                    <td className="font-semibold text-teal-800">{count.format(month.energySuppliedMu)}</td>
                    <td className="text-amber-900">{count.format(month.energyUnservedMu)} ({month.energyUnservedPct.toFixed(1)}%)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Hydroelectric reservoir storage" subtitle="SLDC · 25 November 2026" icon="Waves" provenance={powerStorageSource} expandable>
          <div className="rounded-xl bg-sky-50 p-3.5">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-sky-950">
              <strong className="text-2xl tabular-nums">{powerDaily.reservoirStoragePct}%</strong>
              <span className="text-xs">{energy.format(powerDaily.reservoirStorageMu)} / {energy.format(powerDaily.reservoirCapacityMu)} MU</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-sky-100" aria-hidden="true"><div className="h-full rounded-full bg-sky-700" style={{ width: `${powerDaily.reservoirStoragePct}%` }} /></div>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div><dt>Storage on 25 Nov 2025</dt><dd className="font-bold tabular-nums text-slate-900">{energy.format(powerDaily.priorYearStorageMu)} MU</dd></div>
            <div><dt>November inflow through 25 Nov</dt><dd className="font-bold tabular-nums text-slate-900">{energy.format(powerDaily.inflowMonthToDateMu)} MU</dd></div>
          </dl>
        </SectionCard>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-3">
        {Object.entries(powerConsumerCategories).map(([group, rows]) => (
          <SectionCard key={group} title={`${group} consumers`} subtitle={consumerGroups[group as keyof typeof consumerGroups]} icon="Users" provenance={powerConsumersSource} expandable>
            <table className="w-full text-left text-xs tabular-nums">
              <caption className="sr-only">{group} KSEB consumer categories in August 2026</caption>
              <thead className="text-slate-500"><tr><th scope="col" className="pb-2">Category</th><th scope="col" className="pb-2 text-right">Consumers</th></tr></thead>
              <tbody>{rows.map((row) => (
                <tr key={row.label} className="border-t border-slate-100">
                  <th scope="row" className="py-1.5 font-medium text-slate-700">{row.label}</th>
                  <td className="text-right font-semibold text-slate-900">{count.format(row.count)}</td>
                </tr>
              ))}</tbody>
              <tfoot><tr className="border-t border-slate-200"><th className="pt-2" scope="row">Total</th><td className="pt-2 text-right font-bold">{count.format(rows.reduce((sum, row) => sum + row.count, 0))}</td></tr></tfoot>
            </table>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
