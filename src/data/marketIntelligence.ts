import { districtOutputSource } from "./districtEconomy";

const ecostat = "https://www.ecostat.kerala.gov.in";
const wholesaleDashboard = `${ecostat}/mi-prices-dashboard?lang=en`;
const retailDashboard = `${ecostat}/state-dashboard-prices-of-essential-commodities`;

export const ecostatPublisher = "Kerala Department of Economics and Statistics";
export const ecostatCatalogue = `${ecostat}/data-catalogue`;
export const ecostatDashboards = "https://ecostat.kerala.gov.in/dashboard-home";

export type MarketSource = { title: string; url: string; apiUrl: string };

export const marketSources = {
  wholesale: {
    title: "State average wholesale prices",
    url: wholesaleDashboard,
    apiUrl: `${ecostat}/api/data-subset/481`,
  },
  monthly: {
    title: "Monthly state average wholesale prices",
    url: `${ecostat}/data-subset/562`,
    apiUrl: `${ecostat}/api/data-subset/562`,
  },
  farmWholesale: {
    title: "State average farm wholesale prices",
    url: `${ecostat}/farm-wholesale-prices-dashboard`,
    apiUrl: `${ecostat}/api/data-subset/446`,
  },
  farmRetail: {
    title: "State average farm retail prices",
    url: `${ecostat}/farm-retail-prices-dashboard`,
    apiUrl: `${ecostat}/api/data-subset/452`,
  },
  districts: {
    title: districtOutputSource.title,
    url: districtOutputSource.url,
    apiUrl: `${ecostat}/api/data-subset/627`,
  },
} satisfies Record<string, MarketSource>;

export const marketRetailSources = ([
  ["Cereals", 263],
  ["Vegetables", 264],
  ["Tubers", 268],
  ["Pulses", 267],
  ["Spices and condiments", 266],
  ["Oils and oil seeds", 265],
  ["Other essentials", 269],
] as const).map(([title, id]): MarketSource => ({
  title,
  url: retailDashboard,
  apiUrl: `${ecostat}/api/chart-data/${id}`,
}));

export const cpiRelease = {
  period: "2026-09-01",
  publishedOn: "2026-11-21",
  baseYear: 2018,
  url: `${ecostat}/publication-detail/consumer-price-index-ruc-september-2026`,
  indicators: [
    { area: "Rural", index: 162.54 },
    { area: "Urban", index: 151.95 },
    { area: "Combined", index: 158.95 },
  ],
} as const;

export type MarketFeed<Row> = {
  source: MarketSource;
  rows: Row[];
  period: string | null;
  checkedAt: string;
  status: "available" | "empty" | "unavailable";
};

export type MarketPriceRecord = {
  commodity: string;
  date: string;
  price: number;
  prevDay: number | null;
  prevMonth: number | null;
  prevYear: number | null;
};

export type MarketMonthlySeries = {
  commodity: string;
  points: { date: string; value: number }[];
};

export const districtMetrics = [
  { key: "GDDP at Current Price", label: "Gross, current" },
  { key: "GDDP at Constant Price", label: "Gross, constant" },
  { key: "NDDP at Current Price", label: "Net, current" },
  { key: "NDDP at Constant Price", label: "Net, constant" },
] as const;

export type DistrictMetric = (typeof districtMetrics)[number]["key"];

export type MarketDistrictRecord = {
  district: string;
  values: Partial<Record<DistrictMetric, number>>;
};

export type MarketDataset = {
  wholesale: MarketFeed<MarketPriceRecord>;
  monthly: MarketFeed<MarketMonthlySeries>;
  retail: MarketFeed<MarketPriceRecord>[];
  farmWholesale: MarketFeed<MarketPriceRecord>;
  farmRetail: MarketFeed<MarketPriceRecord>;
  districts: MarketFeed<MarketDistrictRecord>;
};
