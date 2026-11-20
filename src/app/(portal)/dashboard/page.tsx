import type { Metadata } from "next";
import { DashboardClient } from "@/components/DashboardClient";

export const metadata: Metadata = { title: "Overview" };

export default function DashboardPage() {
  return <DashboardClient />;
}
