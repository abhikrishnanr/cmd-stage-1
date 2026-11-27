import { SourcedBrief } from "@/components/SourcedBrief";

export default function RiskPage() {
  return (
    <SourcedBrief title="Risk and Audit" description="Published audit evidence and official follow-up resources for Kerala."
      references={[
        {
          title: "State Finances Audit Report",
          description: "CAG assessment of Kerala’s finances for FY 2024–25.",
          provenance: { source: "Comptroller and Auditor General of India", dataset: "Report No. 1 of 2026", period: "FY 2024–25", url: "https://www.cag.gov.in/en/audit-report/details/125399" },
        },
        {
          title: "Local Self-Government Institutions Audit",
          description: "CAG audit of Kerala’s local bodies through March 2024.",
          provenance: { source: "Comptroller and Auditor General of India", dataset: "Report No. 4 of 2026", period: "Through March 2024", url: "https://cag.gov.in/en/audit-report/details/125849" },
        },
        {
          title: "Audit observations and follow-up",
          description: "Accountant General guidance and notices on remedial measures for audit observations.",
          provenance: { source: "Accountant General (Audit I), Kerala", dataset: "Compliance to Audit Observations", url: "https://cag.gov.in/ag1/kerala/en/page-ag1-kerala-page-gssa-kerala-compliance-to-audit-observations" },
        },
      ]}
    />
  );
}
