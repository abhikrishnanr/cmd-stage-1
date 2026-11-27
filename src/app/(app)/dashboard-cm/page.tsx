import type { Metadata } from "next";
import { ChiefMinisterOverview } from "@/components/ChiefMinisterOverview";

export const metadata: Metadata = { title: "Chief Minister Dashboard | Government of Kerala" };
export const revalidate = 900;

export default function ChiefMinisterDashboardPage() {
  return <ChiefMinisterOverview />;
}
