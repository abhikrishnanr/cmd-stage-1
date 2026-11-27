"use client";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar,
} from "recharts";

const AXIS = { fontSize: 10, fill: "#64748b" };

export function TrendLine({ data, color = "#7c5cff", height = 200, area = true, dataKey = "value", k2 }: any) {
  const id = `g-${Math.random().toString(36).slice(2)}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef1f8" vertical={false} />
        <XAxis dataKey="label" tick={AXIS} interval={3} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={38} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ebf7", fontSize: 12 }} />
        {area && <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#${id})`} />}
        {!area && <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={false} />}
        {k2 && <Line type="monotone" dataKey={k2} stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" dot={false} />}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function Donut({ data, height = 200, inner = 55, label }: any) {
  const total = data.reduce((s: number, d: any) => s + d.value, 0);
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="label" innerRadius={inner} outerRadius={inner + 28} paddingAngle={2} stroke="none">
            {data.map((d: any, i: number) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ebf7", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      {label && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-lg font-black text-[color:var(--color-ink)]">{label}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Legend({ data }: { data: { label: string; value: number; color: string }[] }) {
  return (
    <ul className="space-y-1.5">
      {data.map((d) => (
        <li key={d.label} className="flex items-center justify-between gap-2 text-[12px]">
          <span className="flex items-center gap-2 text-slate-600">
            <span style={{ width: 9, height: 9, borderRadius: 3, background: d.color }} />
            {d.label}
          </span>
          <span className="font-bold text-[color:var(--color-ink)]">{d.value}%</span>
        </li>
      ))}
    </ul>
  );
}

export function Bars({ data, color = "#2f7df6", height = 200, horizontal = false, unit = "" }: any) {
  if (horizontal) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef1f8" horizontal={false} />
          <XAxis type="number" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="label" tick={AXIS} width={110} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ebf7", fontSize: 12 }} />
          <Bar dataKey="value" fill={color} radius={[0, 6, 6, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 14, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef1f8" vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} interval={0} angle={-12} dy={8} height={40} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={38} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ebf7", fontSize: 12 }} />
        <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({ data, color = "#16a34a", height = 38 }: { data: number[]; color?: string; height?: number }) {
  const d = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={d} margin={{ top: 4, right: 2, left: 2, bottom: 2 }}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function Gauge({ value, color = "#e11d48", height = 170, label }: { value: number; color?: string; height?: number; label?: string }) {
  const data = [{ name: "v", value, fill: color }];
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart innerRadius="68%" outerRadius="100%" data={data} startAngle={210} endAngle={-30}>
          <RadialBar background={{ fill: "#eef1f8" } as any} dataKey="value" cornerRadius={20} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-3xl font-black" style={{ color }}>{value}%</div>
          {label && <div className="text-[11px] font-semibold text-slate-500">{label}</div>}
        </div>
      </div>
    </div>
  );
}

export function StackedBars({ data, keys, colors, height = 200 }: any) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef1f8" vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={38} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6ebf7", fontSize: 12 }} />
        {keys.map((k: string, i: number) => (
          <Bar key={k} dataKey={k} stackId="a" fill={colors[i]} radius={i === keys.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]} barSize={26} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
