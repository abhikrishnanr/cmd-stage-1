"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { portalRoles, type PortalRole } from "@/data/roles";

interface PortalContextValue {
  activeRole: PortalRole;
  setActiveRoleId: (id: string) => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [roleId, setRoleId] = useState(portalRoles[0].id);

  useEffect(() => {
    const stored = window.localStorage.getItem("cmd-stage-1-role");
    if (stored && portalRoles.some((role) => role.id === stored)) setRoleId(stored);
  }, []);

  const setActiveRoleId = (id: string) => {
    if (!portalRoles.some((role) => role.id === id)) return;
    setRoleId(id);
    window.localStorage.setItem("cmd-stage-1-role", id);
  };

  const value = useMemo(
    () => ({ activeRole: portalRoles.find((role) => role.id === roleId) ?? portalRoles[0], setActiveRoleId }),
    [roleId],
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const value = useContext(PortalContext);
  if (!value) throw new Error("usePortal must be used within PortalProvider");
  return value;
}
