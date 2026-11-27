import {
  districtMetrics,
  marketRetailSources,
  marketSources,
  type MarketDataset,
  type MarketDistrictRecord,
  type MarketFeed,
  type MarketMonthlySeries,
  type MarketPriceRecord,
  type MarketSource,
} from "@/data/marketIntelligence";

type ApiRow = {
  date?: string;
  dim_1_name?: string;
  dim_2_name?: string;
  dim_3_name?: string;
  dim_4_name?: string;
  measure_1?: number | null;
  measure_2?: number | null;
  measure_3?: number | null;
  measure_4?: number | null;
  measure_1_unit?: string;
};

type FeedContent<Row> = { rows: Row[]; period: string | null };

export async function getMarketData(): Promise<MarketDataset> {
  const [wholesale, monthly, retail, farmWholesale, farmRetail, districts] = await Promise.all([
    loadFeed(marketSources.wholesale, (rows) => dailyPrices(rows, "dim_3_name")),
    loadFeed(marketSources.monthly, monthlyPrices),
    Promise.all(marketRetailSources.map((source) => loadFeed(source, (rows) => dailyPrices(rows, "dim_2_name")))),
    loadFeed(marketSources.farmWholesale, farmPrices),
    loadFeed(marketSources.farmRetail, farmPrices),
    loadFeed(marketSources.districts, districtOutput),
  ]);
  return { wholesale, monthly, retail, farmWholesale, farmRetail, districts };
}

async function loadFeed<Row>(source: MarketSource, normalize: (rows: ApiRow[]) => FeedContent<Row>): Promise<MarketFeed<Row>> {
  try {
    const response = await fetch(source.apiUrl, {
      cache: "no-store",
      headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0 CM Governance Dashboard" },
      signal: AbortSignal.timeout(8500),
    });
    if (!response.ok) throw new Error(`Ecostat returned ${response.status}`);

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("records" in payload) || !Array.isArray(payload.records)) {
      throw new Error("Ecostat returned an unexpected response");
    }

    const records = payload.records.filter((row): row is ApiRow => !!row && typeof row === "object");
    const { rows, period } = normalize(records);
    return {
      source, rows, period, checkedAt: new Date().toISOString(),
      status: rows.length ? "available" : "empty",
    };
  } catch {
    return { source, rows: [], period: null, checkedAt: new Date().toISOString(), status: "unavailable" };
  }
}

function dailyPrices(rows: ApiRow[], nameField: "dim_2_name" | "dim_3_name"): FeedContent<MarketPriceRecord> {
  const prices = rows.flatMap((row) => priceRecord(row, row[nameField], false));
  const latest = latestPeriod(prices.map((row) => row.date));
  return { rows: uniqueCurrentPrices(prices), period: latest };
}

function farmPrices(rows: ApiRow[]): FeedContent<MarketPriceRecord> {
  const prices = rows.flatMap((row) => priceRecord(row, row.dim_3_name, true));
  const latest = latestPeriod(prices.map((row) => row.date));
  return { rows: uniqueCurrentPrices(prices.filter((row) => row.date === latest)), period: latest };
}

function priceRecord(row: ApiRow, name: unknown, monthly: boolean): MarketPriceRecord[] {
  const commodity = textValue(name);
  const date = dateValue(row.date);
  const price = priceValue(row.measure_1);
  if (!commodity || !date || price === null) return [];

  return [{
    commodity, date, price,
    prevDay: monthly ? null : priceValue(row.measure_2),
    prevMonth: priceValue(monthly ? row.measure_2 : row.measure_3),
    prevYear: priceValue(monthly ? row.measure_3 : row.measure_4),
  }];
}

function uniqueCurrentPrices(prices: MarketPriceRecord[]): MarketPriceRecord[] {
  const distinct = new Map<string, MarketPriceRecord>();
  for (const row of prices) {
    const previous = distinct.get(row.commodity);
    if (!previous || row.date > previous.date) distinct.set(row.commodity, row);
  }
  return [...distinct.values()].sort((a, b) => a.commodity.localeCompare(b.commodity));
}

function monthlyPrices(rows: ApiRow[]): FeedContent<MarketMonthlySeries> {
  const groups = new Map<string, Map<string, number>>();
  let period: string | null = null;
  for (const row of rows) {
    const commodity = textValue(row.dim_4_name);
    const date = dateValue(row.date);
    const value = priceValue(row.measure_1);
    if (!commodity || !date || value === null) continue;

    const series = groups.get(commodity) ?? new Map();
    series.set(date, value);
    groups.set(commodity, series);
    if (!period || date > period) period = date;
  }

  return {
    period,
    rows: [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([commodity, series]) => ({
      commodity,
      points: [...series.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-24).map(([date, value]) => ({ date, value })),
    })),
  };
}

function districtOutput(rows: ApiRow[]): FeedContent<MarketDistrictRecord> {
  const years = new Map<string, Map<string, MarketDistrictRecord>>();
  for (const row of rows) {
    const period = textValue(row.dim_1_name);
    const district = textValue(row.dim_2_name);
    const metric = districtMetrics.find(({ key }) => key === row.dim_3_name);
    const value = priceValue(row.measure_1);
    if (!period || !district || !metric || value === null || row.measure_1_unit !== "Rs. in lakhs") continue;

    const districts = years.get(period) ?? new Map();
    const entry = districts.get(district) ?? { district, values: {} };
    entry.values[metric.key] = value / 100;
    districts.set(district, entry);
    years.set(period, districts);
  }

  const period = latestPeriod([...years.keys()]);
  const current = period ? years.get(period) : undefined;
  return {
    period,
    rows: [...(current?.values() ?? [])].sort((a, b) => districtValue(b) - districtValue(a)),
  };
}

function districtValue(row: MarketDistrictRecord) {
  return row.values["GDDP at Current Price"] ?? 0;
}

function latestPeriod(periods: string[]): string | null {
  return periods.reduce<string | null>((latest, period) => !latest || period > latest ? period : latest, null);
}

function dateValue(value: unknown): string | null {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) ? value : null;
}

function textValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function priceValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
