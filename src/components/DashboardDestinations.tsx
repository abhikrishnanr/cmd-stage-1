import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const sections = [
  { href: "/delivery-rag", title: "Programme Delivery", description: "Kerala’s published 100 Days Programme progress" },
  { href: "/projects", title: "Major Infra Projects", description: "Dated project status from implementing agencies" },
  { href: "/plan-budget-utilization", title: "Plan Budget Utilisation", description: "PlanSpace spending by department and sector" },
  { href: "/market-intelligence", title: "Market Intelligence", description: "Prices, consumer inflation and district output from Ecostat" },
];

export function DashboardDestinations() {
  return (
    <section aria-label="Dashboard modules" className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {sections.map(({ href, title, description }) => (
        <Link key={href} href={href} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-[#173e70] transition hover:border-teal-300 hover:bg-teal-50/50">
          <div className="flex items-center justify-between gap-2 text-sm font-extrabold">{title}<ArrowUpRight size={15} aria-hidden="true" className="shrink-0" /></div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{description}</p>
        </Link>
      ))}
    </section>
  );
}
