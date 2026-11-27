"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { NAV } from "./nav";
import { Icon } from "./primitives";
import { Overlays } from "./Overlays";
import { useUI } from "@/store/ui";

export function LiveClock({ light }: { light?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className={light ? "text-white/80" : "text-slate-500"}>-</span>;
  const date = now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
  return (
    <span className={`tabular-nums ${light ? "text-white/85" : "text-slate-600"}`}>
      {date} · <span className="font-bold">{time} IST</span>
    </span>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rail, setRail] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [groups, setGroups] = useState<Record<string, boolean>>(() => Object.fromEntries(NAV.map((g) => [g.group, true])));
  const { role, setRole } = useUI();
  const homeHref = role.startsWith("VD Satheeshan") ? "/dashboard-cm" : "/dashboard";

  const logout = () => {
    setRole("Public View, Citizen Transparency");
    router.push("/");
  };

  const sidebar = () => (
    <aside
      className={`flex h-screen shrink-0 flex-col text-white shadow-2xl transition-[width] duration-300 ${rail ? "w-[88px]" : "w-[276px]"}`}
      style={{ background: "linear-gradient(180deg,#071832 0%,#12335f 48%,#0b5f3a 100%)" }}
    >
      <div className={`flex items-center gap-2.5 border-b border-white/10 px-3 py-3 ${rail ? "justify-center" : ""}`}>
        <Link href={homeHref} className={`flex min-w-0 items-center gap-2.5 ${rail ? "justify-center" : ""}`} onClick={() => setMobileOpen(false)}>
          <img src="/img/kerala-govt-logo.svg" alt="Government of Kerala" className="h-10 w-10 shrink-0 rounded-xl bg-white p-1.5" />
          {!rail && (
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[13px] font-black">CM Governance</div>
              <div className="truncate text-[10px] text-white/58">Government of Kerala</div>
            </div>
          )}
        </Link>
        {!rail && <div className="flex-1" />}
        <button onClick={() => setRail((v) => !v)} className="hidden rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white lg:block" title={rail ? "Expand menu" : "Collapse menu"}>
          <Icon name={rail ? "PanelLeftOpen" : "PanelLeftClose"} size={18} />
        </button>
      </div>

      <nav className={`sidebar-scrollbar flex-1 overflow-y-auto ${rail ? "px-2 py-3" : "px-3 py-3"}`}>
        {NAV.map((g) => {
          const groupActive = g.items.some((it) => pathname === it.href || (it.href !== "/dashboard" && pathname.startsWith(`${it.href}/`)));
          const expanded = groups[g.group] ?? true;
          return (
            <div key={g.group} className={rail ? "mb-2" : "mb-3"}>
              {!rail && (
                <button onClick={() => setGroups((prev) => ({ ...prev, [g.group]: !expanded }))} className="mb-1 flex w-full items-center justify-between rounded-lg px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white/38 transition hover:bg-white/10 hover:text-white/70">
                  <span>{g.group}</span>
                  <Icon name={expanded ? "ChevronDown" : "ChevronRight"} size={12} />
                </button>
              )}
              {(rail || expanded) && (
                <div className={rail ? "space-y-1" : ""}>
                  {g.items.map((it) => {
                    const active = pathname === it.href || (it.href !== "/dashboard" && pathname.startsWith(`${it.href}/`));
                    return (
                      <Fragment key={it.href}>
                      <Link
                        href={it.href}
                        aria-current={active ? "page" : undefined}
                        title={rail ? it.label : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={`group relative mb-0.5 flex items-center rounded-xl font-semibold transition ${rail ? "min-h-[58px] flex-col justify-center gap-1 px-1.5 py-2 text-center text-[9.5px]" : "gap-2.5 px-2.5 py-2 text-[12.5px]"} ${active ? "bg-white text-[#12335f] shadow-lg shadow-black/10" : "text-white/72 hover:bg-white/10 hover:text-white"}`}
                      >
                        <Icon name={it.icon} size={rail ? 18 : 16} />
                        <span className={rail ? "line-clamp-2 max-w-[64px] leading-tight" : "min-w-0 flex-1 truncate"}>{rail ? shortLabel(it.label) : it.label}</span>
                        {!rail && active && <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-ribbon)]" />}
                        {!rail && !it.ready && <span className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white/40">soon</span>}
                        {rail && groupActive && active && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-ribbon)]" />}
                      </Link>
                      {!rail && active && it.children && (
                        <ul aria-label={`${it.label} sections`} className="mb-2 ml-5 space-y-0.5 border-l border-white/20 pl-2">
                          {it.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-2 py-1.5 text-[11px] font-medium text-white/75 hover:bg-white/10 hover:text-white">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className={`border-t border-white/10 p-3 ${rail ? "text-center" : ""}`}>
        <button onClick={logout} className={`mb-2 flex w-full items-center rounded-xl text-[12.5px] font-semibold text-white/78 transition hover:bg-white/10 hover:text-white ${rail ? "justify-center p-2" : "gap-2.5 px-2.5 py-2"}`} title="Log out">
          <Icon name="LogOut" size={16} /> {!rail && <span className="flex-1 text-left">Log out</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[color:var(--color-app)]">
      <AnimatePresence>
        {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] lg:hidden" />}
      </AnimatePresence>
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebar()}
      </div>
      <div className="sticky top-0 z-30 hidden h-screen lg:block">{sidebar()}</div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/88 px-3 py-2.5 backdrop-blur-md sm:px-4">
          <button onClick={() => setMobileOpen(true)} className="rounded-lg p-1.5 hover:bg-slate-100 lg:hidden"><Icon name="Menu" size={20} /></button>
          <Link href={homeHref} className="hidden items-center gap-2 lg:flex">
            <img src="/img/kerala-govt-logo.svg" alt="Government of Kerala" className="h-8 w-8 rounded-lg border border-slate-200 bg-white p-1" />
            <span className="text-[13px] font-black text-[color:var(--color-ink)]">CM Dashboard</span>
          </Link>
          <HeaderSearch />
          <div className="flex-1" />
          <div className="hidden text-[11px] lg:block"><LiveClock /></div>
          <div className="relative">
            <button onClick={() => setProfileMenu((m) => !m)} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 hover:bg-slate-50">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--color-navy)] text-[11px] font-black text-white">{initials(role)}</div>
              <div className="hidden leading-tight sm:block">
                <div className="max-w-[180px] truncate text-[12px] font-bold">{role.split(",")[0]}</div>
                <div className="max-w-[180px] truncate text-[10px] text-slate-400">{role.includes(",") ? role.split(",")[1].trim() : "Role"}</div>
              </div>
              <Icon name="ChevronDown" size={14} className="text-slate-400" />
            </button>
            {profileMenu && (
              <>
                <div onClick={() => setProfileMenu(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <div className="text-[12px] font-bold">{role.split(",")[0]}</div>
                    <div className="text-[10px] text-slate-400">{role.includes(",") ? role.split(",")[1].trim() : "Role"}</div>
                  </div>
                  <button onClick={() => { setProfileMenu(false); router.push("/inbox"); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12.5px] font-semibold text-slate-600 hover:bg-slate-50"><Icon name="Inbox" size={15} /> Inbox</button>
                  <button onClick={() => { setProfileMenu(false); router.push("/"); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12.5px] font-semibold text-slate-600 hover:bg-slate-50"><Icon name="UserCog" size={15} /> Switch role</button>
                  <button onClick={logout} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12.5px] font-bold text-rose-600 hover:bg-rose-50"><Icon name="LogOut" size={15} /> Log out</button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="scrollbar-thin min-w-0 flex-1 overflow-y-auto pb-12">{children}</main>
      </div>
      <Overlays />
    </div>
  );
}

function shortLabel(label: string) {
  return label
    .replace("Results-Based Management", "RBM")
    .replace("Market Intelligence", "Market")
    .replace("Indira Guarantees", "Indira")
    .replace("Governance and Public Services", "Governance")
    .replace("Social Security", "Security")
    .replace("Municipal / LSG", "LSG")
    .replace("Public Works", "PWD")
    .replace("eOffice File Activity", "Files")
    .replace("Data Sources", "Sources")
    .replace("Sector Command", "Sectors");
}

const SEARCH_ALIASES = [
  { label: "Mission Samudra Priority RBM", href: "/rbm-new/mission-samudra", icon: "Anchor", group: "RBM Projects (Priority)", keywords: "revised data form maritime ports indicators activities evidence priority projects" },
  { label: "Elder-Friendly Office Certification RBM", href: "/rbm-new/elder-friendly-office-certification", icon: "Accessibility", group: "RBM Projects (Priority)", keywords: "efoc senior citizens revised indicator activity certification priority projects" },
  { label: "Priyadashini Free Travel RBM", href: "/rbm/priyadashini-free-travel", icon: "Bus", group: "Results Management", keywords: "women ksrtc mobility outcomes scorecard" },
  { label: "Girl Student Support RBM", href: "/rbm/college-girl-student-support", icon: "GraduationCap", group: "Results Management", keywords: "college education dbt retention outcomes" },
  { label: "Welfare Pension RBM", href: "/rbm/welfare-pension-security", icon: "HandCoins", group: "Results Management", keywords: "pension social protection household security" },
  { label: "Family Health Insurance RBM", href: "/rbm/family-health-financial-protection", icon: "ShieldPlus", group: "Results Management", keywords: "health insurance cashless financial protection" },
  { label: "Youth Enterprise RBM", href: "/rbm/youth-enterprise-jobs", icon: "Rocket", group: "Results Management", keywords: "entrepreneur loan enterprise survival jobs" },
  { label: "Elderly Community Care RBM", href: "/rbm/elderly-community-care", icon: "HeartHandshake", group: "Results Management", keywords: "elder senior home care independent living" },
  { label: "Mission Samudra RBM", href: "/rbm/mission-samudra", icon: "Anchor", group: "Results Management", keywords: "ports maritime blue economy vizhinjam outcomes investment jobs" },
  { label: "Mission Samudra", href: "/dream-projects/mission-samudra", icon: "Anchor", group: "Dream Projects", keywords: "roadmap ports coastal shipping maritime gantt" },
  { label: "Mission Samudra Roadmap", href: "/dream-projects/mission-samudra?tab=roadmap", icon: "GanttChartSquare", group: "Dream Projects", keywords: "gantt timeline fy26 fy36 progress" },
  { label: "CM Attention queue", href: "/dashboard", icon: "ListChecks", group: "Command", keywords: "priority queue attention urgent decisions" },
  { label: "Ticket Inbox", href: "/inbox", icon: "Inbox", group: "Workflow", keywords: "cm ticket voice note attachments reply" },
  { label: "Ticket Register", href: "/tickets", icon: "TicketCheck", group: "Workflow", keywords: "tickets eoffice file escalation" },
  { label: "Kunhalikutty Dashboard", href: "/leader/kunhalikutty", icon: "UserRound", group: "Leaders", keywords: "leader industries eit minister" },
  { label: "Thiruvananthapuram District", href: "/districts/thiruvananthapuram", icon: "MapPin", group: "Districts", keywords: "trivandrum collector district" },
  { label: "Ernakulam District", href: "/districts/ernakulam", icon: "MapPin", group: "Districts", keywords: "kochi collector district" },
  { label: "Kozhikode District", href: "/districts/kozhikode", icon: "MapPin", group: "Districts", keywords: "calicut collector district" },
];

function HeaderSearch() {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  const searchIndex = useMemo(() => {
    const navItems = NAV.flatMap((g) => g.items.map((it) => ({
      label: it.label,
      href: it.href,
      icon: it.icon,
      group: g.group,
      keywords: `${g.group} ${it.label}`,
    })));
    return [...navItems, ...SEARCH_ALIASES];
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), 260);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, []);

  const results = useMemo(() => {
    if (debounced.length < 3) return [];
    const q = debounced.toLowerCase();
    return searchIndex
      .map((item) => {
        const hay = `${item.label} ${item.group} ${item.keywords}`.toLowerCase();
        const score = item.label.toLowerCase().startsWith(q) ? 3 : item.label.toLowerCase().includes(q) ? 2 : hay.includes(q) ? 1 : 0;
        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
      .slice(0, 8);
  }, [debounced, searchIndex]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    setDebounced("");
    router.push(href);
  };

  return (
    <div ref={wrapRef} className="relative hidden md:block md:w-80">
      <div className={`flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-1.5 text-sm transition ${open ? "border-[color:var(--color-navy)] bg-white shadow-[0_10px_28px_rgba(28,63,124,.14)]" : "border-slate-200"}`}>
        <Icon name="Search" size={15} className={open ? "text-[color:var(--color-navy)]" : "text-slate-400"} />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) go(results[0].href);
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search modules, districts, tickets..."
          className="w-full bg-transparent text-[13px] font-semibold text-slate-700 outline-none placeholder:font-medium placeholder:text-slate-400"
        />
      </div>
      {open && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,45,92,.2)]">
          {query.trim().length < 3 ? (
            <div className="px-4 py-3 text-[12px] font-semibold text-slate-400">Type at least 3 letters to search.</div>
          ) : results.length ? (
            <div className="max-h-[360px] overflow-y-auto scrollbar-thin p-1.5">
              {results.map((item) => (
                <button key={`${item.href}-${item.label}`} onClick={() => go(item.href)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--color-navy)] text-white"><Icon name={item.icon} size={17} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-black text-slate-800">{item.label}</span>
                    <span className="block truncate text-[11px] font-semibold text-slate-400">{item.group} · {item.href}</span>
                  </span>
                  <Icon name="ArrowUpRight" size={15} className="text-slate-300" />
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-[12px] font-semibold text-slate-400">No matching page found.</div>
          )}
        </div>
      )}
    </div>
  );
}

function initials(role: string) {
  return role
    .split(",")[0]
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase() || "CM";
}
