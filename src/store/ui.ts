"use client";
import { create } from "zustand";

export interface DrawerPayload {
  title: string;
  rag: "red" | "amber" | "green" | "blue";
  source: string;
  updated: string;
  confidence: number;
  target?: string;
  achieved?: string;
  beneficiaries?: string;
  allocated?: string;
  released?: string;
  fullPage?: string;
  districtTable?: { rank: number; district: string; value: number }[];
  trend?: { label: string; value: number }[];
  metricUnit?: string;
  alerts?: string[];
  tickets?: string[];
  action?: string;
}

export interface TicketContext {
  itemType: string;
  itemName: string;
  rag?: "red" | "amber" | "green" | "blue";
  secretary?: string;
}

interface UIState {
  role: string;
  setRole: (r: string) => void;

  drawer: DrawerPayload | null;
  openDrawer: (p: DrawerPayload) => void;
  closeDrawer: () => void;

  ticket: TicketContext | null;
  openTicket: (c: TicketContext) => void;
  closeTicket: () => void;

  toast: string | null;
  showToast: (t: string) => void;
}

export const useUI = create<UIState>((set) => ({
  role: "VD Satheeshan, Chief Minister",
  setRole: (role) => set({ role }),

  drawer: null,
  openDrawer: (drawer) => set({ drawer }),
  closeDrawer: () => set({ drawer: null }),

  ticket: null,
  openTicket: (ticket) => set({ ticket }),
  closeTicket: () => set({ ticket: null }),

  toast: null,
  showToast: (toast) => {
    set({ toast });
    setTimeout(() => set({ toast: null }), 2600);
  },
}));
