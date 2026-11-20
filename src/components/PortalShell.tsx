"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { stageModules } from "@/data/modules";
import { portalRoles } from "@/data/roles";
import { usePortal } from "./PortalContext";
import { ModuleIcon } from "./ModuleIcon";

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rail, setRail] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);
  const { activeRole, setActiveRoleId } = usePortal();

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!roleRef.current?.contains(event.target as Node)) setRoleOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, []);

  const sidebar = (mobile = false) => (
    <aside className={`sidebar ${rail && !mobile ? "sidebar-rail" : ""}`}>
      <div className="sidebar-brand">
        <Image src="/img/kerala-govt-logo.svg" alt="Government of Kerala" width={48} height={48} priority />
        {(!rail || mobile) && (
          <div>
            <strong>CM Dashboard</strong>
            <span>Stage 1</span>
          </div>
        )}
        {mobile && (
          <button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
            <X size={19} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {(!rail || mobile) && <div className="nav-caption">Portfolio</div>}
        <Link href="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`} title="Stage 1 Overview">
          <span className="nav-icon"><LayoutDashboard size={18} /></span>
          {(!rail || mobile) && <span>Stage 1 Overview</span>}
          {(!rail || mobile) && <ChevronRight className="nav-arrow" size={14} />}
        </Link>

        {(!rail || mobile) && <div className="nav-caption module-caption">Confirmed modules</div>}
        <div className="module-nav">
          {stageModules.map((module) => {
            const href = `/modules/${module.slug}`;
            const active = pathname === href;
            return (
              <Link key={module.slug} href={href} className={`nav-link module-link ${active ? "active" : ""}`} title={module.name}>
                <span className="nav-index">{String(module.order).padStart(2, "0")}</span>
                <span className="nav-icon" style={{ color: active ? "currentColor" : module.accent }}>
                  <ModuleIcon name={module.icon} size={17} />
                </span>
                {(!rail || mobile) && <span className="nav-label">{module.shortName}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="sidebar-footer">
        {(!rail || mobile) ? (
          <div className="scope-note">
            <ShieldCheck size={17} />
            <div><strong>Stage 1 scope</strong><span>10 confirmed modules</span></div>
          </div>
        ) : (
          <ShieldCheck size={18} />
        )}
        {!mobile && (
          <button className="rail-toggle" onClick={() => setRail((value) => !value)} aria-label={rail ? "Expand navigation" : "Collapse navigation"}>
            {rail ? <PanelLeftOpen size={17} /> : <><PanelLeftClose size={17} /><span>Collapse</span></>}
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <div className="portal-frame">
      <div className="desktop-sidebar">{sidebar()}</div>
      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
      <div className={`mobile-sidebar ${mobileOpen ? "open" : ""}`}>{sidebar(true)}</div>

      <div className="portal-main">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu size={21} />
          </button>
          <Link href="/dashboard" className="topbar-title">
            <span>Government of Kerala</span>
            <strong>CM Dashboard <b>Stage 1</b></strong>
          </Link>
          <Link href="/dashboard#modules" className="topbar-search" aria-label="Search Stage 1 modules">
            <Search size={16} />
            <span>Find a Stage 1 module</span>
            <kbd>/</kbd>
          </Link>
          <div className="topbar-spacer" />
          <div className="scope-chip"><span /> Stage 1</div>
          <button className="icon-button notification-button" aria-label="Notifications unavailable in demo" title="Notifications unavailable in demo" disabled>
            <Bell size={18} />
          </button>
          <div className="role-switcher" ref={roleRef}>
            <button className="role-trigger" onClick={() => setRoleOpen((value) => !value)} aria-expanded={roleOpen}>
              <span className="role-avatar">{activeRole.initials}</span>
              <span className="role-trigger-copy"><strong>{activeRole.name}</strong><small>{activeRole.title}</small></span>
              <ChevronDown size={15} />
            </button>
            {roleOpen && (
              <div className="role-menu">
                <div className="role-menu-head"><strong>Switch role view</strong><span>One minister · secretary views retained</span></div>
                {portalRoles.map((role) => (
                  <button key={role.id} className={role.id === activeRole.id ? "selected" : ""} onClick={() => { setActiveRoleId(role.id); setRoleOpen(false); }}>
                    <span className="role-avatar small">{role.initials}</span>
                    <span><strong>{role.name}</strong><small>{role.title}</small></span>
                    {role.id === activeRole.id && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>
        <main className="content-area">{children}</main>
        <footer className="portal-footer">
          <span>Government of Kerala · CM Dashboard</span>
          <span>Stage 1 · Confirmed scope only</span>
        </footer>
      </div>
    </div>
  );
}
