"use client";

import { useCallback, useEffect, useState } from "react";
import {
  KERALA_BUDGET_FINANCIAL_YEAR_START,
  keralaBudgetLastGoodSnapshot,
  type KeralaBudgetPortalData,
} from "@/data/keralaBudgetSnapshot";

function isPortalData(value: unknown): value is KeralaBudgetPortalData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<KeralaBudgetPortalData>;
  return (
    data.financialYearStart === KERALA_BUDGET_FINANCIAL_YEAR_START &&
    Array.isArray(data.income?.heads) &&
    data.income.heads.length === 9 &&
    Array.isArray(data.expenditure?.heads) &&
    data.expenditure.heads.length === 15 &&
    Array.isArray(data.history) &&
    data.history.length === 7 &&
    data.history.every((point) => point.income.length === 9 && point.expenditure.length === 15) &&
    Array.isArray(data.budgetAtGlance?.rows) &&
    data.budgetAtGlance.rows.length === 14 &&
    Array.isArray(data.overallPosition?.history) &&
    data.overallPosition.history.length === 9 &&
    Array.isArray(data.revenueComposition?.history) &&
    data.revenueComposition.history.length === 9
  );
}

export function useKeralaBudgetPortal() {
  const [data, setData] = useState<KeralaBudgetPortalData>(keralaBudgetLastGoodSnapshot);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => setRequestVersion((version) => version + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/kerala-budget?financialYear=${KERALA_BUDGET_FINANCIAL_YEAR_START}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Budget data request returned HTTP ${response.status}`);
        const payload: unknown = await response.json();
        if (!isPortalData(payload)) throw new Error("Budget data response did not match the expected schema");
        setData(payload);
        setError(null);
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : "Unable to refresh Kerala Budget Portal data");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [requestVersion]);

  return { data, loading, error, refresh };
}
