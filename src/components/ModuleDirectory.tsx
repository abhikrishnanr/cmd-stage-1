import Link from "next/link";
import { NAV, type NavGroup } from "@/components/nav";
import { Icon } from "@/components/primitives";

export function ModuleDirectory({ title, description, group }: { title: string; description: string; group?: string }) {
  const groups = group ? NAV.filter((entry) => entry.group === group) : NAV.filter((entry) => entry.group !== "Platform");

  return (
    <div className="space-y-5 p-4 sm:p-5">
      <header className="rounded-3xl bg-[linear-gradient(112deg,#182953,#176c70)] p-5 text-white sm:p-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-white/80">{description}</p>
      </header>
      {groups.map((entry) => <DirectoryGroup key={entry.group} entry={entry} groupFiltered={Boolean(group)} />)}
    </div>
  );
}

function DirectoryGroup({ entry, groupFiltered }: { entry: NavGroup; groupFiltered: boolean }) {
  const items = entry.items.filter((item) => !groupFiltered || item.href !== "/sectors");
  return (
    <section aria-label={entry.group}>
      {!groupFiltered && <h2 className="mb-2 text-sm font-extrabold text-slate-800">{entry.group}</h2>}
      <div className="grid min-w-0 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-[#193761] transition hover:border-teal-300 hover:bg-teal-50/50">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-800"><Icon name={item.icon} size={16} /></span>
            <span className="min-w-0 flex-1">{item.label}</span>
            <Icon name="ArrowUpRight" size={14} className="shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
