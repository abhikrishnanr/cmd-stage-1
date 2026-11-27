import { SourcedBrief } from "@/components/SourcedBrief";

export default function TicketsPage() {
  return (
    <SourcedBrief title="Tickets and Follow-ups" description="Use the originating workspaces to review assignments and track eOffice records."
      references={[
        { title: "Keralam on Track Action Hub", description: "Sign in to the protected workspace for assigned actions and follow-ups.", provenance: { source: "Keralam on Track", dataset: "Action Hub", url: "https://keralamontrack.webtestingonline.com/portal/action" } },
        { title: "Track a file or tapal", description: "Look up the status of a specific file in Kerala eOffice.", provenance: { source: "Kerala eOffice Citizen Portal", dataset: "File and tapal lookup", url: "https://eoffice.kerala.gov.in/EofficePortal/letterSearchRedirect" } },
      ]}
    />
  );
}
