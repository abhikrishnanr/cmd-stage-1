import { Rag } from "@/data/types";

export const RAG_HEX: Record<Rag, string> = {
  red: "#e11d48",
  amber: "#f59e0b",
  green: "#16a34a",
  blue: "#2563eb",
};

export const RAG_BG: Record<Rag, string> = {
  red: "rgba(225,29,72,0.12)",
  amber: "rgba(245,158,11,0.14)",
  green: "rgba(22,163,74,0.12)",
  blue: "rgba(37,99,235,0.12)",
};

export const RAG_LABEL: Record<Rag, string> = {
  red: "Red",
  amber: "Amber",
  green: "Green",
  blue: "Info",
};

export function ragFor(score: number): Rag {
  if (score >= 75) return "green";
  if (score >= 60) return "amber";
  return "red";
}

// Choropleth fill ramp by 0..1 intensity using a guarantee theme is complex; use orange-red heat ramp like mockups.
export function heatColor(t: number): string {
  // t in [0,1]; light yellow -> orange -> deep red (matches mockup heatmaps)
  const stops = [
    [255, 247, 214],
    [254, 217, 118],
    [253, 141, 60],
    [240, 59, 32],
    [165, 0, 38],
  ];
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = stops[i];
  const b = stops[Math.min(i + 1, stops.length - 1)];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
