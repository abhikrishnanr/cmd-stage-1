import { getMarketData } from "@/lib/ecostatMarket";
import MarketIntelligenceClient from "./MarketIntelligenceClient";

export const dynamic = "force-dynamic";

export default async function MarketIntelligencePage() {
  return <MarketIntelligenceClient data={await getMarketData()} />;
}
