import type { Metadata } from "next";
import RbmNewPortfolio from "@/components/RbmNewPortfolio";

export const metadata: Metadata = {
  title: "RBM Projects (Priority) | CM Governance Dashboard",
  description: "Priority results dashboards for Mission Samudra and Elder-Friendly Office Certification.",
};

export default function RbmNewPage() {
  return <RbmNewPortfolio />;
}
