import { NextRequest, NextResponse } from "next/server";
import {
  KERALA_BUDGET_FINANCIAL_YEAR_START,
  keralaBudgetLastGoodSnapshot,
  type KeralaBudgetPortalData,
} from "@/data/keralaBudgetSnapshot";
import { fetchKeralaBudgetPortal } from "@/lib/keralaBudgetPortal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fallbackSnapshot(): KeralaBudgetPortalData {
  return {
    ...keralaBudgetLastGoodSnapshot,
    warning: `Live portal sync failed; showing the last-good snapshot checked ${keralaBudgetLastGoodSnapshot.fetchedAt}. The source does not publish a data-level update timestamp.`,
  };
}

export async function GET(request: NextRequest) {
  const rawYear = request.nextUrl.searchParams.get("financialYear") ?? String(KERALA_BUDGET_FINANCIAL_YEAR_START);
  const financialYearStart = Number(rawYear);

  if (!Number.isInteger(financialYearStart) || financialYearStart !== KERALA_BUDGET_FINANCIAL_YEAR_START) {
    return NextResponse.json(
      { error: `financialYear must be ${KERALA_BUDGET_FINANCIAL_YEAR_START}` },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const data = await fetchKeralaBudgetPortal(financialYearStart);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Kerala Budget Portal sync failed", error);
    return NextResponse.json(fallbackSnapshot(), {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
        "X-Content-Type-Options": "nosniff",
        "X-Kerala-Budget-Fallback": "1",
      },
    });
  }
}
