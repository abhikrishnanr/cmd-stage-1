import { SourcedBrief } from "@/components/SourcedBrief";

export default function InboxPage() {
  return (
    <SourcedBrief title="Inbox" description="Sign in to the originating workspace to see items assigned to your account."
      references={[
        { title: "Keralam on Track Action Hub", description: "Open the protected workspace for assigned government follow-ups.", provenance: { source: "Keralam on Track", dataset: "Action Hub", url: "https://keralamontrack.webtestingonline.com/portal/action" } },
      ]}
    />
  );
}
