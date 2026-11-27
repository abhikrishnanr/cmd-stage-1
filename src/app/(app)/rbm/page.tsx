import type { Metadata } from "next";
import RbmPortfolio from "@/components/RbmPortfolio";

export const metadata: Metadata = {
  title: "Results-Based Management | CM Governance Dashboard",
  description: "Programme references and original publications for Kerala’s results-based management portfolio.",
  openGraph: {
    title: "Kerala Results-Based Management Portfolio",
    description: "Programme references and original publications for Kerala’s results-based management portfolio.",
    images: [],
  },
  twitter: {
    title: "Kerala Results-Based Management Portfolio",
    description: "Programme references and original publications for Kerala’s results-based management portfolio.",
    images: [],
  },
};

export default function ResultsBasedManagementPage() {
  return <RbmPortfolio />;
}
