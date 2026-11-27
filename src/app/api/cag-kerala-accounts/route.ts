import { NextResponse } from "next/server";
import {
  cagKeralaAccountsLastGoodSnapshot,
  type CagKeralaAccountsData,
} from "@/data/cagKeralaAccountsSnapshot";
import { fetchCagKeralaAccounts } from "@/lib/cagKeralaAccounts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fallbackSnapshot(): CagKeralaAccountsData {
  return {
    ...cagKeralaAccountsLastGoodSnapshot,
    warning: `Live CAG workbook sync failed; showing the last-good official snapshot checked ${cagKeralaAccountsLastGoodSnapshot.fetchedAt}. Source updated is file last-modified metadata, not a stated publication date.`,
  };
}

export async function GET() {
  try {
    const data = await fetchCagKeralaAccounts();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("CAG Kerala workbook sync failed", error);
    return NextResponse.json(fallbackSnapshot(), {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
        "X-Content-Type-Options": "nosniff",
        "X-CAG-Kerala-Fallback": "1",
      },
    });
  }
}
