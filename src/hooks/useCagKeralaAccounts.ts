"use client";

import { useCallback, useEffect, useState } from "react";
import {
  cagKeralaAccountsLastGoodSnapshot,
  type CagKeralaAccountsData,
} from "@/data/cagKeralaAccountsSnapshot";

function isCagKeralaAccountsData(value: unknown): value is CagKeralaAccountsData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<CagKeralaAccountsData>;
  if (data.financialYear !== "2026-27" || data.actualThrough !== "2026-06-30" || !Array.isArray(data.metrics)) return false;
  if (data.metrics.length !== cagKeralaAccountsLastGoodSnapshot.metrics.length) return false;

  const ids = new Set<string>();
  for (const metric of data.metrics) {
    if (
      !metric ||
      typeof metric.id !== "string" ||
      typeof metric.label !== "string" ||
      typeof metric.budgetReference !== "number" ||
      typeof metric.actual !== "number" ||
      typeof metric.currentProgressPct !== "number" ||
      typeof metric.previousProgressPct !== "number" ||
      !Number.isFinite(metric.budgetReference) ||
      !Number.isFinite(metric.actual) ||
      !Number.isFinite(metric.currentProgressPct) ||
      !Number.isFinite(metric.previousProgressPct)
    ) return false;
    ids.add(metric.id);
  }

  return ids.size === data.metrics.length && ["revenue-receipts", "total-expenditure", "fiscal-balance"].every((id) => ids.has(id));
}

export function useCagKeralaAccounts() {
  const [data, setData] = useState<CagKeralaAccountsData>(cagKeralaAccountsLastGoodSnapshot);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => setRequestVersion((version) => version + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch("/api/cag-kerala-accounts", {
      signal: controller.signal,
      headers: { accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`CAG accounts request returned HTTP ${response.status}`);
        const payload: unknown = await response.json();
        if (!isCagKeralaAccountsData(payload)) throw new Error("CAG accounts response did not match the expected schema");
        setData(payload);
        setError(null);
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : "Unable to refresh CAG Kerala accounts data");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [requestVersion]);

  return { data, loading, error, refresh };
}
