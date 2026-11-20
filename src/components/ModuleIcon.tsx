import {
  Anchor,
  BarChart3,
  Building2,
  BusFront,
  HeartPulse,
  Landmark,
  ReceiptIndianRupee,
  ShieldAlert,
  WalletCards,
  Workflow,
  type LucideProps,
} from "lucide-react";
import type { ModuleIcon as ModuleIconName } from "@/data/modules";

const iconMap = {
  landmark: Landmark,
  receipt: ReceiptIndianRupee,
  wallet: WalletCards,
  workflow: Workflow,
  heart: HeartPulse,
  bus: BusFront,
  chart: BarChart3,
  shield: ShieldAlert,
  building: Building2,
  anchor: Anchor,
};

export function ModuleIcon({ name, ...props }: LucideProps & { name: ModuleIconName }) {
  const Icon = iconMap[name];
  return <Icon {...props} />;
}
