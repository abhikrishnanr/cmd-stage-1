"use client";

import { useState } from "react";
import { Sparkline, TrendLine } from "@/components/charts";
import { CmSourceDetails } from "@/components/CmSourceDetails";
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
  type DistrictMetric,
} from "@/data/marketIntelligence";

const sections = [
  { id: "price-watch", name: "Price watch", icon: "Activity" },
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
const trendCommodities = ["Rice Matta (Quintal)", "Coconut Oil (Pandy) (Quintal)", "Rubber RSS 4 (Quintal)", "Onion Small Ist Quality (Quintal)"];
const trendColors = ["#087f6a", "#4962b8", "#9d5377", "#b16a16"];
const comparisons = [
  { key: "prevDay", label: "Previous day" },
  { key: "prevMonth", label: "Previous month" },
  { key: "prevYear", label: "Previous year" },
] as const;
const movementTones = [
  { color: "#cc643c", label: "Rose", icon: "ArrowUpRight" },
  { color: "#127a66", label: "Fell", icon: "ArrowDownRight" },
  { color: "#8298ae", label: "Unchanged", icon: "Minus" },
] as const;

export default function MarketIntelligenceClient({ data }: { data: MarketDataset }) {
  return (
    <div className="mx-auto max-w-[1560px] space-y-6 p-4 sm:p-6">
      <section className="relative isolate rounded-[26px] bg-[#082b34] p-6 text-white shadow-[0_18px_50px_rgba(8,43,52,.18)] sm:p-9">
        <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(ellipse_at_95%_6%,#247765_0%,transparent_53%),radial-gradient(ellipse_at_70%_110%,#286776_0%,transparent_51%)]" />
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 rounded-[inherit] opacity-20" />
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-100">
              <Icon name="Database" size={14} /> {ecostatPublisher}
            </p>
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
          <div className="ml-auto">
            <CmSourceDetails inverted label="Market Intelligence sources" sources={[
              ...feedProvenance(data.wholesale, formatDay(data.wholesale.period)),
              { source: ecostatPublisher, dataset: "Official data catalogue", url: ecostatCatalogue },
              { source: ecostatPublisher, dataset: "DES dashboards", url: ecostatDashboards },
            ]} />
          </div>
        </div>
      </section>

      <nav aria-label="Market Intelligence sections" className="flex flex-wrap gap-2">
        {sections.map(({ id, name, icon }) => (
          <a key={id} href={`#${id}`} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-teal-100 bg-white px-3 text-xs font-bold text-teal-900 transition hover:border-teal-300 hover:bg-teal-50">
            <Icon name={icon} size={15} /> {name}
          </a>
        ))}
      </nav>

      <PriceWatch feed={data.wholesale} />

      <section id="wholesale" className="scroll-mt-24">
        <SectionCard title="Wholesale prices" subtitle="State averages from the Market Intelligence scheme" icon="PackageOpen">
          <FeedSource feed={data.wholesale} periodLabel={formatDay(data.wholesale.period)} />
          {data.wholesale.rows.length > 0 ? <PriceTable rows={data.wholesale.rows} kind="daily" searchable label="Wholesale commodity prices" /> : <FeedEmpty status={data.wholesale.status} />}
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

function feedProvenance(feed: MarketFeed<unknown>, periodLabel: string | null) {
  const reference = {
    source: ecostatPublisher,
    period: periodLabel ?? undefined,
    fetchedAt: `${timeFormat.format(new Date(feed.checkedAt))} IST`,
  };
  return [
    { ...reference, dataset: feed.source.title, url: feed.source.url },
    { ...reference, dataset: `${feed.source.title} (public API)`, url: feed.source.apiUrl },
  ];
}

function FeedSource({ feed, periodLabel }: { feed: MarketFeed<unknown>; periodLabel: string | null }) {
  return (
    <div className="mb-4 flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <strong className="font-bold text-teal-800">Ecostat · {feed.source.title}</strong>
        {periodLabel && <span>Through <strong className="font-bold text-slate-800">{periodLabel}</strong></span>}
        <span>Checked <time dateTime={feed.checkedAt}>{timeFormat.format(new Date(feed.checkedAt))} IST</time></span>
      </div>
      <CmSourceDetails sources={feedProvenance(feed, periodLabel)} label={`${feed.source.title} sources`} />
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

function PriceWatch({ feed }: { feed: MarketDataset["wholesale"] }) {
  const [reference, setReference] = useState<(typeof comparisons)[number]["key"]>("prevDay");
  const [selection, setSelection] = useState<string | null>(null);
  const referenceLabel = comparisons.find(({ key }) => key === reference)!.label;
  const latest = feed.rows.filter((row) => row.date === feed.period);
  const movements = latest.flatMap((row) => {
    const baseline = row[reference];
    return baseline !== null && baseline > 0 && row.price > 0
      ? [{ row, baseline, change: (row.price / baseline - 1) * 100 }]
      : [];
  });
  const rises = movements.filter(({ change }) => change > 0).sort((a, b) => b.change - a.change);
  const falls = movements.filter(({ change }) => change < 0).sort((a, b) => a.change - b.change);
  const active = [...rises.slice(0, 3), ...falls.slice(0, 3)];
  const selected = active.find(({ row }) => row.commodity === selection) ?? active[0];
  const counts = [rises.length, falls.length, movements.length - rises.length - falls.length];
  const shareRising = movements.length ? counts[0] / movements.length * 100 : 0;
  const shareMoved = movements.length ? (counts[0] + counts[1]) / movements.length * 100 : 0;
  const movementScale = Math.max(...active.map(({ change }) => Math.abs(change)), 1);
  const periodLabel = formatDay(feed.period);

  return (
    <section id="price-watch" className="scroll-mt-24" aria-labelledby="price-watch-heading">
      <div className="flex items-start justify-between gap-4 border-b border-emerald-900/15 pb-3">
        <div>
          <h2 id="price-watch-heading" className="display text-2xl font-black text-[#123841]">Wholesale price watch</h2>
          {periodLabel && <p className="text-xs font-semibold text-slate-600">Ecostat state averages · {periodLabel}</p>}
        </div>
        <CmSourceDetails sources={feedProvenance(feed, periodLabel)} label="Wholesale price watch sources" />
      </div>
      {latest.length ? (
        <>
          <div aria-label="Price comparison period" role="group" className="my-3 flex flex-wrap gap-2">
            {comparisons.map(({ label, key }) => (
              <button key={key} type="button" onClick={() => { setReference(key); setSelection(null); }} aria-pressed={reference === key}
                className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-teal-50 aria-pressed:border-teal-800 aria-pressed:bg-teal-800 aria-pressed:text-white">
                {label}
              </button>
            ))}
          </div>
          {movements.length ? (
            <div className="grid items-stretch gap-3 xl:grid-cols-[minmax(290px,0.9fr)_minmax(0,1.35fr)]">
              <article className="min-w-0 rounded-2xl border border-teal-200 bg-[radial-gradient(ellipse_at_top_right,#e2f7e9,white_72%)] p-4 sm:p-5">
                <h3 className="text-sm font-black text-teal-950">How widely prices moved</h3>
                <p className="mt-0.5 text-xs text-slate-600">{movements.length} of {latest.length} prices have a {referenceLabel.toLowerCase()} comparison</p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:justify-start xl:justify-center 2xl:justify-start">
                  <div className="grid size-32 shrink-0 place-items-center rounded-full shadow-sm" style={{ background: `conic-gradient(${movementTones[0].color} ${shareRising}%, ${movementTones[1].color} ${shareRising}% ${shareMoved}%, ${movementTones[2].color} ${shareMoved}%)` }}>
                    <div className="grid size-25 place-content-center rounded-full bg-white text-center">
                      <strong className="text-2xl font-black tabular-nums text-teal-950">{shareMoved.toFixed(1)}%</strong>
                      <span className="text-xs font-bold text-slate-600">of prices moved</span>
                    </div>
                  </div>
                  <dl className="grid flex-1 min-w-28 gap-2">
                    {movementTones.map(({ label, icon, color }, index) => (
                      <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-white bg-white/85 px-2.5 py-1.5 text-xs shadow-sm">
                        <dt className="inline-flex items-center gap-1.5 font-bold text-slate-700"><Icon name={icon} size={14} style={{ color }} />{label}</dt>
                        <dd className="font-black tabular-nums text-slate-900">{counts[index]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                {selected && (
                  <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50 p-3 text-xs leading-relaxed text-[#783617]">
                    <p className="font-black">For review</p>
                    <p className="mt-0.5">Check reporting markets and price returns behind large moves before deciding whether to intervene.</p>
                  </div>
                )}
              </article>

              <article className="grid min-w-0 content-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div><h3 className="text-sm font-black text-slate-900">Largest price moves</h3><p className="mt-0.5 text-xs text-slate-600">Compared with {referenceLabel.toLowerCase()} · select a commodity to inspect both prices</p></div>
                {selected ? (
                  <>
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {active.map(({ row, change }) => (
                        <li key={row.commodity} className="min-w-0">
                          <button type="button" onClick={() => setSelection(row.commodity)} aria-pressed={row.commodity === selected.row.commodity}
                            className="grid h-full w-full gap-1 rounded-lg border border-transparent px-2 py-1.5 text-left text-xs hover:bg-slate-50 aria-pressed:border-teal-200 aria-pressed:bg-teal-50">
                            <span className="flex items-baseline justify-between gap-2"><span className="min-w-0 font-bold text-slate-700">{row.commodity}</span><strong className={`shrink-0 tabular-nums ${changeColor(change)}`}>{formatChange(change)}</strong></span>
                            <span aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full" style={{ width: `${Math.abs(change) / movementScale * 100}%`, backgroundColor: change > 0 ? movementTones[0].color : movementTones[1].color }} /></span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 rounded-xl bg-[#102f44] px-3 py-2.5 text-slate-100" aria-live="polite">
                      <div className="col-span-2"><dt className="sr-only">Selected commodity</dt><dd className="text-xs font-bold text-sky-100">{selected.row.commodity}</dd></div>
                      <div><dt className="text-[11px] text-sky-100">{periodLabel}</dt><dd className="text-base font-black tabular-nums">{formatPrice(selected.row.price)}</dd></div>
                      <div><dt className="text-[11px] text-sky-100">{referenceLabel}</dt><dd className="text-base font-black tabular-nums">{formatPrice(selected.baseline)}</dd></div>
                    </dl>
                  </>
                ) : <p className="text-sm text-slate-600">Every comparable price was unchanged.</p>}
              </article>
            </div>
          ) : <p role="status" className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Ecostat has no comparable prices for this period.</p>}
        </>
      ) : <FeedEmpty status={feed.status} />}
    </section>
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
  const featured = trendCommodities.flatMap((name) => {
    const series = feed.rows.find((row) => row.commodity === name && row.points.at(-1)?.date === feed.period);
    return series ? [series] : [];
  });
  const [commodity, setCommodity] = useState(featured[0]?.commodity ?? feed.rows[0]?.commodity);
  const selected = feed.rows.find((row) => row.commodity === commodity);

  return (
    <SectionCard title="Comparable monthly trends" subtitle="Monthly state average wholesale price for each commodity" icon="LineChart">
      <FeedSource feed={feed} periodLabel={formatMonth(feed.period)} />
      {selected ? (
        <>
          <div className="mb-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map(({ commodity: name, points }, index) => {
              const latest = points.at(-1)!;
              const previous = points.at(-2);
              const change = relativeChange(latest.value, previous?.value ?? null);
              return (
                <button type="button" key={name} aria-pressed={name === commodity} onClick={() => setCommodity(name)}
                  className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-left hover:bg-teal-50 aria-pressed:border-teal-600 aria-pressed:bg-teal-50/70">
                  <span className="block text-xs font-bold leading-tight text-slate-700">{name}</span>
                  <span className="mt-1 block text-lg font-black text-slate-900">{formatPrice(latest.value)}</span>
                  <span aria-hidden="true" className="block h-9 min-w-0"><Sparkline data={points.slice(-12).map(({ value }) => value)} height={36} color={trendColors[index]} /></span>
                  <span className="block text-[11px] text-slate-600">{formatMonth(latest.date)}{previous && change !== null && <> · <strong className={changeColor(change)}>{formatChange(change)}</strong> vs {formatMonth(previous.date)}</>}</span>
                </button>
              );
            })}
          </div>
          <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-3 sm:p-4">
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
          </div>
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
      {feed.rows.length ? <><MonthlyPriceMovers feed={feed} /><PriceTable rows={feed.rows} kind="daily" label={`${feed.source.title} retail prices`} /></> : <FeedEmpty status={feed.status} />}
    </SectionCard>
  );
}

function FarmPrices({ title, feed }: { title: string; feed: MarketDataset["farmWholesale"] }) {
  return (
    <SectionCard title={title} subtitle="Latest month published by DES" icon="Wheat" className="min-w-0">
      <FeedSource feed={feed} periodLabel={formatMonth(feed.period)} />
      {feed.rows.length ? <><MonthlyPriceMovers feed={feed} /><PriceTable rows={feed.rows} kind="monthly" searchable label={title} /></> : <FeedEmpty status={feed.status} />}
    </SectionCard>
  );
}

function MonthlyPriceMovers({ feed }: { feed: MarketFeed<MarketPriceRecord> }) {
  const movers = feed.rows.flatMap((row) => {
    const change = relativeChange(row.price, row.prevMonth);
    return row.date === feed.period && change !== null && change !== 0 ? [{ ...row, change }] : [];
  }).sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 3);
  if (!movers.length) return null;

  return (
    <div className="mb-3 rounded-xl border border-teal-100 bg-teal-50/60 p-3">
      <h3 className="text-xs font-black text-teal-950">Largest moves versus previous month</h3>
      <ul className="mt-2 grid gap-2">
        {movers.map(({ commodity, price, change }) => (
          <li key={commodity} className="grid gap-1 rounded-lg bg-white p-2 text-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5"><span className="font-bold text-slate-700">{commodity}</span><strong className={changeColor(change)}>{formatChange(change)}</strong></div>
            <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full" style={{ width: `${Math.abs(change / movers[0].change) * 100}%`, background: change > 0 ? movementTones[0].color : movementTones[1].color }} /></div>
            <p className="text-[11px] text-slate-600">{formatPrice(price)} latest</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConsumerPrices() {
  const tones = ["border-emerald-200 bg-emerald-50 text-emerald-950", "border-sky-200 bg-sky-50 text-sky-950", "border-violet-200 bg-violet-50 text-violet-950"];
  const sources = [{ source: ecostatPublisher, dataset: "CPI (R/U/C)", url: cpiRelease.url, period: formatMonth(cpiRelease.period) ?? undefined, sourceUpdatedAt: formatDay(cpiRelease.publishedOn) }];

  return (
    <SectionCard title="Consumer price index" subtitle="Kerala rural, urban and combined indices" icon="ChartNoAxesColumn"
      right={<CmSourceDetails sources={sources} label="Consumer price index source" />}>
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
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
  const [metric, setMetric] = useState<DistrictMetric>("GDDP at Current Price");
  const sorted = [...feed.rows].sort((a, b) => (b.values[metric] ?? 0) - (a.values[metric] ?? 0));
  const leaders = sorted.flatMap(({ district, values }) => values[metric] !== undefined ? [{ district, value: values[metric] }] : []).slice(0, 5);

  return (
    <SectionCard title="District economic output" subtitle="DES quick estimates · gross and net district domestic product, in ₹ crore" icon="MapPin">
      <FeedSource feed={feed} periodLabel={feed.period ? `FY ${feed.period.replace("-", "–")}` : null} />
      {feed.rows.length ? <>
        <figure className="mb-4 rounded-xl border border-sky-100 bg-sky-50/60 p-3">
          <figcaption className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-black text-sky-950">Five largest district economies</h3>
            <select aria-label="District output measure" value={metric} onChange={(event) => setMetric(event.target.value as DistrictMetric)} className="rounded-lg border border-sky-200 bg-white px-2 py-1.5 text-xs font-bold text-sky-950">
              {districtMetrics.map(({ key, label }) => <option key={key} value={key}>{label} prices</option>)}
            </select>
          </figcaption>
          <ul className="mt-2 grid gap-2">
            {leaders.map(({ district, value }, index) => (
              <li key={district} className="grid gap-1 text-xs">
                <div className="flex justify-between gap-3"><span className="font-bold text-slate-700">{district}</span><strong className="tabular-nums text-sky-950">{formatPrice(value)} cr</strong></div>
                <div className="h-2 overflow-hidden rounded-full bg-sky-100" aria-hidden="true"><div className="h-full rounded-full" style={{ width: `${leaders[0].value > 0 ? value / leaders[0].value * 100 : 0}%`, backgroundColor: index === 0 ? "#11687e" : "#337bad" }} /></div>
              </li>
            ))}
          </ul>
        </figure>
        <div className="overflow-auto rounded-xl border border-slate-200" tabIndex={0} role="region" aria-label="District output in crore rupees">
          <table className="w-full min-w-[590px] border-collapse text-left text-xs" aria-label="District output in crore rupees">
            <thead className="bg-slate-100 text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-3 py-3">District</th>
                {districtMetrics.map(({ key, label }) => <th key={key} scope="col" className="px-3 py-3 text-right">{label}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map(({ district, values }) => (
                <tr key={district} className="hover:bg-teal-50/60">
                  <th scope="row" className="px-3 py-2.5 font-semibold text-slate-800">{district}</th>
                  {districtMetrics.map(({ key }) => <td key={key} className="px-3 py-2.5 text-right tabular-nums text-slate-700">{values[key] !== undefined ? priceFormat.format(values[key]) : "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </> : <FeedEmpty status={feed.status} />}
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
