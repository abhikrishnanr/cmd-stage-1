import { CheckCircle2, CircleDashed, Network } from "lucide-react";
import { statusMeta, type ApiStatus } from "@/data/modules";

export function StatusPill({ status, compact = false }: { status: ApiStatus; compact?: boolean }) {
  const meta = statusMeta[status];
  const Icon = status === "available" ? CheckCircle2 : status === "nic" ? Network : CircleDashed;
  return (
    <span className={`status-pill status-${meta.tone}`}>
      <Icon size={13} />
      {compact ? meta.shortLabel : meta.label}
    </span>
  );
}
