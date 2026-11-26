import { CircleAlert, CircleCheck, Gauge, Info, TriangleAlert } from "lucide-react";

export type DataSignalTone = "risk" | "watch" | "good" | "info";

type SignalBadgeProps = {
  value: string;
  context?: string;
  tone?: DataSignalTone;
  force?: boolean;
};

export function SignalBadge({ value, context = "", tone, force = false }: SignalBadgeProps) {
  const resolvedTone = tone || inferSignalTone(value, context);
  if (!force && !isSignalValue(value, context)) return <>{value}</>;

  const Icon = resolvedTone === "risk"
    ? CircleAlert
    : resolvedTone === "watch"
      ? TriangleAlert
      : resolvedTone === "good"
        ? CircleCheck
        : /%/.test(value)
          ? Gauge
          : Info;

  return (
    <span className={`signal-badge tone-${resolvedTone}`}>
      <Icon size={13} aria-hidden="true" />
      <span>{value}</span>
    </span>
  );
}

export function inferSignalTone(value: string, context = ""): DataSignalTone {
  const text = `${value} ${context}`.toLowerCase();
  const normalizedValue = value.toLowerCase();

  if (/critical|severe|red alert|high risk|overdue/.test(normalizedValue)) return "risk";
  if (/watch|warning|medium|pending|awaiting|awaited|delayed|attention|feed required|data list awaited|after department exchange/.test(normalizedValue)) return "watch";
  if (/good|ready|complete|completed|active|on track|no alerts|available from|published by|public source|disposed/.test(normalizedValue)) return "good";
  if (/information|info|available|reference/.test(normalizedValue)) return "info";

  const numeric = Number(value.replace(/[^0-9.-]/g, ""));
  if (Number.isFinite(numeric) && /%/.test(value)) {
    if (numeric > 100) return "risk";
    if (/arrears|risk|delay|burden|pending|shortage|alert|occupancy|variance|gap/.test(text)) {
      if (numeric <= 10) return "good";
      if (numeric <= 25) return "info";
      if (numeric <= 50) return "watch";
      return "risk";
    }
    if (/achievement|utilisation|utilization|progress|physical|financial|disposal|completion|satisfaction|coverage|resolved|grounding|rate/.test(text)) {
      if (numeric >= 75) return "good";
      if (numeric >= 50) return "watch";
      return "risk";
    }
  }

  if (/delay/.test(context.toLowerCase()) && /day/.test(value.toLowerCase()) && Number.isFinite(numeric)) {
    if (numeric <= 14) return "good";
    if (numeric <= 30) return "watch";
    return "risk";
  }

  if (/high/.test(normalizedValue)) return "risk";
  return "info";
}

function isSignalValue(value: string, context: string) {
  const text = `${value} ${context}`.toLowerCase();
  return /%|critical|severe|high|watch|warning|medium|pending|awaiting|awaited|delayed|overdue|good|ready|complete|active|on track|no alerts|available|published|disposed/.test(text)
    || (/delay/.test(context.toLowerCase()) && /day/.test(value.toLowerCase()));
}
