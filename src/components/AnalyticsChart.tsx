"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DemoChart } from "@/data/demoDashboards";

const fallbackColors = ["#2f6fd0", "#15927e", "#7556c8", "#d98b19", "#c64555", "#1596b0"];

export function AnalyticsChart({ chart }: { chart: DemoChart }) {
  return (
    <div className="analytics-chart" role="img" aria-label={`${chart.title}. ${chart.subtitle}`}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart(chart)}
      </ResponsiveContainer>
    </div>
  );
}

function renderChart(chart: DemoChart) {
  const commonTooltip = <Tooltip content={<ChartTooltip unit={chart.unit} />} cursor={{ fill: "rgba(34, 72, 113, .06)" }} />;
  const commonLegend = <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 10 }} />;

  if (chart.type === "donut") {
    const series = chart.series[0];
    return (
      <PieChart>
        {commonTooltip}
        <Pie
          data={chart.data}
          dataKey={series.key}
          nameKey={chart.xKey}
          cx="50%"
          cy="46%"
          innerRadius="52%"
          outerRadius="78%"
          paddingAngle={2}
          stroke="#fff"
          strokeWidth={2}
          isAnimationActive={false}
        >
          {chart.data.map((entry, index) => (
            <Cell key={`${chart.id}-${index}`} fill={String(entry.color ?? fallbackColors[index % fallbackColors.length])} />
          ))}
        </Pie>
        {commonLegend}
      </PieChart>
    );
  }

  if (chart.type === "line") {
    return (
      <LineChart data={chart.data} margin={{ top: 12, right: 18, bottom: 10, left: 2 }}>
        <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
        <XAxis dataKey={chart.xKey} tick={axisTick} tickLine={false} axisLine={false} interval={0} />
        <YAxis tickFormatter={compactNumber} tick={axisTick} tickLine={false} axisLine={false} width={52} />
        {commonTooltip}
        {commonLegend}
        {chart.series.map((series) => (
          <Line key={series.key} type="monotone" dataKey={series.key} name={series.label} stroke={series.color} strokeWidth={3} dot={{ r: 3, fill: series.color, strokeWidth: 0 }} activeDot={{ r: 5 }} isAnimationActive={false} />
        ))}
      </LineChart>
    );
  }

  if (chart.type === "area") {
    return (
      <AreaChart data={chart.data} margin={{ top: 12, right: 18, bottom: 10, left: 2 }}>
        <defs>
          {chart.series.map((series) => (
            <linearGradient key={series.key} id={`gradient-${chart.id}-${series.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={series.color} stopOpacity={0.34} />
              <stop offset="100%" stopColor={series.color} stopOpacity={0.03} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
        <XAxis dataKey={chart.xKey} tick={axisTick} tickLine={false} axisLine={false} />
        <YAxis tickFormatter={compactNumber} tick={axisTick} tickLine={false} axisLine={false} width={52} />
        {commonTooltip}
        {commonLegend}
        {chart.series.map((series) => (
          <Area key={series.key} type="monotone" dataKey={series.key} name={series.label} stroke={series.color} strokeWidth={2.5} fill={`url(#gradient-${chart.id}-${series.key})`} isAnimationActive={false} />
        ))}
      </AreaChart>
    );
  }

  if (chart.horizontal) {
    return (
      <BarChart data={chart.data} layout="vertical" margin={{ top: 8, right: 22, bottom: 8, left: 16 }}>
        <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" horizontal={false} />
        <XAxis type="number" tickFormatter={compactNumber} tick={axisTick} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey={chart.xKey} tick={axisTick} tickLine={false} axisLine={false} width={118} />
        {commonTooltip}
        {commonLegend}
        {chart.series.map((series) => (
          <Bar key={series.key} dataKey={series.key} name={series.label} fill={series.color} stackId={series.stackId} radius={[0, 7, 7, 0]} maxBarSize={22} isAnimationActive={false} />
        ))}
      </BarChart>
    );
  }

  return (
    <BarChart data={chart.data} margin={{ top: 10, right: 16, bottom: 28, left: 0 }}>
      <CartesianGrid stroke="#e7edf4" strokeDasharray="3 5" vertical={false} />
      <XAxis dataKey={chart.xKey} tick={axisTick} tickLine={false} axisLine={false} interval={0} angle={chart.data.length > 7 ? -18 : 0} textAnchor={chart.data.length > 7 ? "end" : "middle"} height={chart.data.length > 7 ? 54 : 34} />
      <YAxis tickFormatter={compactNumber} tick={axisTick} tickLine={false} axisLine={false} width={52} />
      {commonTooltip}
      {commonLegend}
      {chart.series.map((series) => (
        <Bar key={series.key} dataKey={series.key} name={series.label} fill={series.color} stackId={series.stackId} radius={series.stackId ? undefined : [7, 7, 2, 2]} maxBarSize={34} isAnimationActive={false} />
      ))}
    </BarChart>
  );
}

function ChartTooltip({ active, payload, label, unit }: { active?: boolean; payload?: Array<{ name?: string; value?: number; color?: string }>; label?: string; unit?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label && <strong>{label}</strong>}
      {payload.map((entry, index) => (
        <span key={`${entry.name}-${index}`}>
          <i style={{ background: entry.color }} />
          {entry.name}: <b>{formatTooltipValue(entry.value, unit)}</b>
        </span>
      ))}
    </div>
  );
}

function formatTooltipValue(value: number | undefined, unit?: string) {
  if (value == null) return "-";
  const number = Number.isInteger(value) ? value.toLocaleString("en-IN") : value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  if (!unit) return number;
  if (unit === "₹ Cr") return `₹${number} Cr`;
  return `${number}${unit === "%" ? "%" : ` ${unit}`}`;
}

function compactNumber(value: number) {
  if (Math.abs(value) < 1000) return String(value);
  return Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

const axisTick = { fill: "#718096", fontSize: 10, fontWeight: 650 };
