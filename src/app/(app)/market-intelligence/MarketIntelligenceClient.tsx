"use client";

import { useState } from "react";
import { TrendLine } from "@/components/charts";
import { ProvenanceTooltip } from "@/components/DataProvenance";
import { Icon, SectionCard } from "@/components/primitives";
import {
  cpiRelease,
  districtMetrics,
  ecostatCatalogue,
  ecostatDashboards,
  ecostatPublisher,
  type MarketDataset,
  type MarketFeed,
  type MarketPriceRecord,
} from "@/data/marketIntelligence";

const sections = [
  { id: "wholesale", name: "Wholesale", icon: "PackageOpen" },
  { id: "monthly", name: "Monthly trends", icon: "LineChart" },
  { id: "retail", name: "Essential retail", icon: "ShoppingBasket" },
  { id: "farm", name: "Farm prices", icon: "Wheat" },
  { id: "consumer-prices", name: "Consumer price index", icon: "ChartNoAxesColumn" },
  { id: "district-output", name: "District output", icon: "MapPin" },
] as const;

const priceFormat = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const dayFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const monthFormat = new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const timeFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
const preferredTrend = "Rice Matta (Quintal)";

export default function MarketIntelligenceClient({ data }: { data: MarketDataset }) {
  return (
    <div className="mx-auto max-w-[1560px] space-y-6 p-4 sm:p-6">
      <section className="relative isolate overflow-hidden rounded-[26px] bg-[#082b34] p-6 text-white shadow-[0_18px_50px_rgba(8,43,52,.18)] sm:p-9">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_95%_6%,#247765_0%,transparent_53%),radial-gradient(ellipse_at_70%_110%,#286776_0%,transparent_51%)]" />
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-20" />
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <a href={ecostatCatalogue} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-emerald-50 hover:bg-white/10">
              <Icon name="Database" size={14} /> {ecostatPublisher}
            </a>
            <h1 className="display mt-4 text-4xl font-black leading-none sm:text-6xl">Market Intelligence</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/90 sm:text-base">
              Compare Kerala’s wholesale, retail and farm prices, consumer prices and district economic output.
            </p>
            {data.wholesale.period && (
              <a href="#wholesale" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/12 px-3 py-1.5 text-xs font-semibold text-emerald-50 hover:bg-white/20">
                <Icon name="CalendarDays" size={14} /> Wholesale prices through <time dateTime={data.wholesale.period}>{formatDay(data.wholesale.period)}</time>
              </a>
            )}
          </div>
          <a href={ecostatDashboards} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#0b413f] hover:bg-emerald-50">
            DES dashboards <Icon name="ExternalLink" size={15} />
          </a>
        </div>
      </section>

      <nav aria-label="Market Intelligence sections" className="flex flex-wrap gap-2">
        {sections.map(({ id, name, icon }) => (
          <a key={id} href={`#${id}`} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-teal-100 bg-white px-3 text-xs font-bold text-teal-900 transition hover:border-teal-300 hover:bg-teal-50">
            <Icon name={icon} size={15} /> {name}
          </a>
        ))}
      </nav>

      <section id="wholesale" className="scroll-mt-24">
        <SectionCard title="Wholesale prices" subtitle="State averages from the Market Intelligence scheme" icon="PackageOpen">
          <FeedSource feed={data.wholesale} periodLabel={formatDay(data.wholesale.period)} />
          {data.wholesale.rows.length > 0 ? (
            <>
              <WholesaleMovers rows={data.wholesale.rows} />
              <PriceTable rows={data.wholesale.rows} kind="daily" searchable label="Wholesale commodity prices" />
            </>
          ) : <FeedEmpty status={data.wholesale.status} />}
        </SectionCard>
      </section>

      <section id="monthly" className="scroll-mt-24">
        <MonthlyTrends feed={data.monthly} />
      </section>

      <section id="retail" className="scroll-mt-24">
        <RetailPrices feeds={data.retail} />
      </section>

      <section id="farm" className="grid scroll-mt-24 gap-5 xl:grid-cols-2">
        <FarmPrices title="Farm wholesale prices" feed={data.farmWholesale} />
        <FarmPrices title="Farm retail prices" feed={data.farmRetail} />
      </section>

      <section id="consumer-prices" className="scroll-mt-24">
        <ConsumerPrices />
      </section>

      <section id="district-output" className="scroll-mt-24">
        <DistrictOutput feed={data.districts} />
      </section>
    </div>
  );
}

function FeedSource({ feed, periodLabel }: { feed: MarketFeed<unknown>; periodLabel: string | null }) {
  const checked = timeFormat.format(new Date(feed.checkedAt));
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
      <ProvenanceTooltip provenance={{ source: ecostatPublisher, dataset: feed.source.title, url: feed.source.url, period: periodLabel ?? undefined, fetchedAt: `${checked} IST` }} />
      <a href={feed.source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-bold text-teal-800 hover:underline">
        {feed.source.title} <Icon name="ExternalLink" size={13} />
      </a>
      <a href={feed.source.apiUrl} target="_blank" rel="noreferrer" className="font-bold text-teal-800 hover:underline" aria-label={`${feed.source.title} API`}>API</a>
      {periodLabel && <span>Data through <strong className="font-bold text-slate-800">{periodLabel}</strong></span>}
      <span>Checked <time dateTime={feed.checkedAt}>{checked} IST</time></span>
    </div>
  );
}

function FeedEmpty({ status }: { status: MarketFeed<unknown>["status"] }) {
  return (
    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
      {status === "unavailable" ? "Ecostat’s feed is temporarily unavailable." : "Ecostat returned no price or output records for this view."}
    </p>
  );
}

function WholesaleMovers({ rows }: { rows: MarketPriceRecord[] }) {
  const changes = rows.flatMap((row) => {
    const pct = relativeChange(row.price, row.prevDay);
    return pct === null ? [] : [{ row, pct }];
  });
  const rises = changes.filter(({ pct }) => pct > 0).sort((a, b) => b.pct - a.pct).slice(0, 3);
  const falls = changes.filter(({ pct }) => pct < 0).sort((a, b) => a.pct - b.pct).slice(0, 3);
  if (!(rises.length || falls.length)) return null;

  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-2">
      <MovementList title="Largest price increases" records={rises} />
      <MovementList title="Largest price decreases" records={falls} />
    </div>
  );
}

function MovementList({ title, records }: { title: string; records: { row: MarketPriceRecord; pct: number }[] }) {
  if (!records.length) return null;

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      <p className="mt-0.5 text-xs text-slate-600">Compared with the previous available day</p>
      <ul className="mt-2 divide-y divide-slate-100">
        {records.map(({ row, pct }) => (
          <li key={row.commodity} className="flex items-baseline justify-between gap-4 py-2 text-xs" title={`Ecostat wholesale price on ${formatDay(row.date)}`}>
            <span className="font-semibold text-slate-700">{row.commodity}</span>
            <strong className={`shrink-0 tabular-nums ${changeColor(pct)}`}>{formatChange(pct)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceTable({ rows, label, kind, searchable = false }: { rows: MarketPriceRecord[]; label: string; kind: "daily" | "monthly"; searchable?: boolean }) {
  const [search, setSearch] = useState("");
  const query = search.trim().toLocaleLowerCase("en-IN");
  const matchingRows = rows.filter((row) => !query || row.commodity.toLocaleLowerCase("en-IN").includes(query));
  const daily = kind === "daily";

  return (
    <>
      {searchable && (
        <label className="relative mb-3 block max-w-lg">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} aria-label={`Search ${label.toLowerCase()}`}
            placeholder="Search commodities" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm font-semibold text-slate-800 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100" />
        </label>
      )}
      {matchingRows.length ? (
        <div className="max-h-[500px] overflow-auto rounded-xl border border-slate-200" tabIndex={0} role="region" aria-label={label}>
          <table className="w-full min-w-[530px] border-collapse text-left text-xs" aria-label={label}>
            <thead className="sticky top-0 bg-slate-100 text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-3 py-3">Commodity and unit</th>
                <th scope="col" className="whitespace-nowrap px-3 py-3">{daily ? "Date" : "Month"}</th>
                <th scope="col" className="px-3 py-3 text-right">Average price</th>
                {daily && <th scope="col" className="whitespace-nowrap px-3 py-3 text-right">Previous day</th>}
                <th scope="col" className="px-3 py-3 text-right">{daily ? "Day change" : "Month change"}</th>
                <th scope="col" className="whitespace-nowrap px-3 py-3 text-right">Previous month</th>
                <th scope="col" className="whitespace-nowrap px-3 py-3 text-right">Previous year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matchingRows.map((row) => {
                const change = relativeChange(row.price, daily ? row.prevDay : row.prevMonth);
                return (
                  <tr key={row.commodity} className="hover:bg-teal-50/60">
                    <th scope="row" className="min-w-[160px] px-3 py-2.5 font-semibold text-slate-800">{row.commodity}</th>
                    <td className="whitespace-nowrap px-3 py-2.5 text-slate-600"><time dateTime={row.date}>{daily ? formatDay(row.date) : formatMonth(row.date)}</time></td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right font-bold tabular-nums text-slate-900">{formatPrice(row.price)}</td>
                    {daily && <td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums text-slate-600">{formatPrice(row.prevDay)}</td>}
                    <td className={`whitespace-nowrap px-3 py-2.5 text-right font-bold tabular-nums ${changeColor(change)}`}>{formatChange(change)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums text-slate-600">{formatPrice(row.prevMonth)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right tabular-nums text-slate-600">{formatPrice(row.prevYear)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : <p role="status" className="p-3 text-sm text-slate-600">No commodities match this search.</p>}
    </>
  );
}

function MonthlyTrends({ feed }: { feed: MarketDataset["monthly"] }) {
  const [commodity, setCommodity] = useState(feed.rows.find((row) => row.commodity === preferredTrend)?.commodity ?? feed.rows[0]?.commodity);
  const selected = feed.rows.find((row) => row.commodity === commodity);

  return (
    <SectionCard title="Monthly wholesale trends" subtitle="Compare monthly state averages by commodity" icon="LineChart">
      <FeedSource feed={feed} periodLabel={formatMonth(feed.period)} />
      {selected ? (
        <>
          <label className="mb-4 block max-w-lg text-xs font-bold text-slate-700">
            Commodity
            <select value={commodity} onChange={(event) => setCommodity(event.target.value)}
              className="mt-1 block h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 focus:outline-teal-500">
              {feed.rows.map((row) => <option key={row.commodity}>{row.commodity}</option>)}
            </select>
          </label>
          <div className="min-w-0" role="img" aria-label={`Monthly price trend for ${selected.commodity} in rupees`}>
            <TrendLine data={selected.points.map(({ date, value }) => ({ label: formatMonth(date), value: Math.round(value * 100) / 100 }))} color="#0f766e" height={205} />
          </div>
          <details className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700">
            <summary className="cursor-pointer py-1 font-bold">View monthly observations</summary>
            <dl className="mt-2 grid gap-1 pb-1 sm:grid-cols-2 lg:grid-cols-3">
              {selected.points.map(({ date, value }) => (
                <div key={date} className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5">
                  <dt><time dateTime={date}>{formatMonth(date)}</time></dt>
                  <dd className="font-bold tabular-nums">{formatPrice(value)}</dd>
                </div>
              ))}
            </dl>
          </details>
        </>
      ) : <FeedEmpty status={feed.status} />}
    </SectionCard>
  );
}

function RetailPrices({ feeds }: { feeds: MarketDataset["retail"] }) {
  const [category, setCategory] = useState(feeds.find((feed) => feed.rows.length)?.source.title ?? feeds[0].source.title);
  const feed = feeds.find((item) => item.source.title === category) ?? feeds[0];

  return (
    <SectionCard title="Essential commodity retail prices" subtitle="State averages from the DES daily price dashboard" icon="ShoppingBasket">
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Retail commodity category">
        {feeds.map(({ source }) => (
          <button type="button" key={source.title} onClick={() => setCategory(source.title)} aria-pressed={source.title === category}
            className="min-h-10 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:bg-teal-50 aria-pressed:border-teal-700 aria-pressed:bg-teal-700 aria-pressed:text-white">
            {source.title}
          </button>
        ))}
      </div>
      <FeedSource feed={feed} periodLabel={formatDay(feed.period)} />
      {feed.rows.length ? <PriceTable rows={feed.rows} kind="daily" label={`${feed.source.title} retail prices`} /> : <FeedEmpty status={feed.status} />}
    </SectionCard>
  );
}

function FarmPrices({ title, feed }: { title: string; feed: MarketDataset["farmWholesale"] }) {
  return (
    <SectionCard title={title} subtitle="Latest month published by DES" icon="Wheat" className="min-w-0">
      <FeedSource feed={feed} periodLabel={formatMonth(feed.period)} />
      {feed.rows.length ? <PriceTable rows={feed.rows} kind="monthly" searchable label={title} /> : <FeedEmpty status={feed.status} />}
    </SectionCard>
  );
}

function ConsumerPrices() {
  const tones = ["border-emerald-200 bg-emerald-50 text-emerald-950", "border-sky-200 bg-sky-50 text-sky-950", "border-violet-200 bg-violet-50 text-violet-950"];

  return (
    <SectionCard title="Consumer price index" subtitle="Kerala rural, urban and combined indices" icon="ChartNoAxesColumn"
      provenance={{ source: ecostatPublisher, dataset: "CPI (R/U/C)", url: cpiRelease.url, period: formatMonth(cpiRelease.period) ?? undefined, sourceUpdatedAt: formatDay(cpiRelease.publishedOn) }}>
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
        <a href={cpiRelease.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-bold text-teal-800 hover:underline">Official DES release <Icon name="ExternalLink" size={13} /></a>
        <span>Reference month <time dateTime={cpiRelease.period}>{formatMonth(cpiRelease.period)}</time></span>
        <span>Published <time dateTime={cpiRelease.publishedOn}>{formatDay(cpiRelease.publishedOn)}</time></span>
        <span>Base {cpiRelease.baseYear} = 100</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {cpiRelease.indicators.map(({ area, index }, position) => (
          <div key={area} className={`rounded-2xl border p-4 ${tones[position]}`} title={`DES CPI (R/U/C), ${formatMonth(cpiRelease.period)}, base ${cpiRelease.baseYear}`}>
            <h3 className="text-sm font-bold">{area}</h3>
            <p className="mt-2 text-3xl font-black tabular-nums">{index.toFixed(2)}</p>
            <p className="mt-1 text-xs">Index points</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function DistrictOutput({ feed }: { feed: MarketDataset["districts"] }) {
  return (
    <SectionCard title="District economic output" subtitle="Gross and net district domestic product, in ₹ crore" icon="MapPin">
      <FeedSource feed={feed} periodLabel={feed.period ? `FY ${feed.period.replace("-", "–")}` : null} />
      {feed.rows.length ? (
        <div className="overflow-auto rounded-xl border border-slate-200" tabIndex={0} role="region" aria-label="District output in crore rupees">
          <table className="w-full min-w-[590px] border-collapse text-left text-xs" aria-label="District output in crore rupees">
            <thead className="bg-slate-100 text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-3 py-3">District</th>
                {districtMetrics.map(({ key, label }) => <th key={key} scope="col" className="px-3 py-3 text-right">{label}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feed.rows.map(({ district, values }) => (
                <tr key={district} className="hover:bg-teal-50/60">
                  <th scope="row" className="px-3 py-2.5 font-semibold text-slate-800">{district}</th>
                  {districtMetrics.map(({ key }) => <td key={key} className="px-3 py-2.5 text-right tabular-nums text-slate-700">{values[key] !== undefined ? priceFormat.format(values[key]) : "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <FeedEmpty status={feed.status} />}
    </SectionCard>
  );
}

function formatDay(date: string | null) {
  return date ? dayFormat.format(new Date(date)) : null;
}

function formatMonth(date: string | null) {
  return date ? monthFormat.format(new Date(date)) : null;
}

function formatPrice(price: number | null) {
  return price === null ? "—" : `₹${priceFormat.format(price)}`;
}

function relativeChange(current: number, previous: number | null): number | null {
  return previous ? ((current - previous) / previous) * 100 : null;
}

function formatChange(change: number | null) {
  return change === null ? "—" : `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;
}

function changeColor(change: number | null) {
  if (change === null || change === 0) return "text-slate-500";
  return change > 0 ? "text-amber-800" : "text-teal-800";
}
