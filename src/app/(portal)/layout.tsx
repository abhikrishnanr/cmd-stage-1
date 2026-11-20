import { PortalProvider } from "@/components/PortalContext";
import { PortalShell } from "@/components/PortalShell";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalProvider>
      <PortalShell>{children}</PortalShell>
    </PortalProvider>
  );
}
