export const layers = [
  { layer: "Layer 1 — Three Principals (Apex)", color: "var(--color-navy)", icon: "Crown",
    members: ["Chief Minister (Chair)", "Chief Governance Advisor", "Principal Secretary (Administrative Anchor)"] },
  { layer: "Layer 2 — Strategic Advisory Council", color: "var(--color-c-violet)", icon: "Users",
    members: ["Public Finance", "Industrial Investment", "Digital Governance", "Public Health", "Education", "PSU Restructuring"], note: "~6 domain experts · meets quarterly" },
  { layer: "Layer 3 — Parliamentary Advisory Council", color: "var(--color-c-blue)", icon: "Landmark",
    members: ["Political Sounding Board", "Field Intelligence", "Constituency Grounding", "Legislature Bridge"], note: "~7 select MLAs · meets bimonthly" },
  { layer: "Layer 4 — 20-Person Delivery Team", color: "var(--color-c-green)", icon: "Gauge",
    members: ["Chief Data Officer", "7 Sector Leads", "Lab Lead", "4 Analysts", "2 Intelligence Analysts", "4 Finance Cell", "2 Admin"] },
  { layer: "Layer 5 - Department Delivery Officers", color: "var(--color-c-orange)", icon: "Network",
    members: ["One delivery officer per reform domain", "Data Officers in key departments", "Interface command centre with line departments", "Accountable for POC data"] },
];

export const rationalisation = [
  { before: "Planning Board: 3 confused functions (advisory + allocation + monitoring)", after: "Governance advisor holds advisory mandate · Finance holds allocation · Intelligence Centre holds measurement" },
  { before: "CM Monitoring Cell: informal, no cadence, no public reporting", after: "Weekly PS review · monthly ministerial · quarterly CM stocktake · annual report" },
  { before: "K-DISC + IT Mission: both in digital governance, no clear owner", after: "Kerala Digital Governance Authority: single mandate" },
  { before: "Invest Kerala + KSIDC: both claim investment, IGR < 30%", after: "Single investment mandate · IGR tracked weekly" },
  { before: "DPI + KITE: both claim education outcomes", after: "Single authority · T1-5 & T1-6 POC accountability" },
];

export const cadence = [
  { name: "Weekly PS Review", desc: "Red/Amber/Green; escalation within 48 hours", icon: "CalendarClock", color: "var(--color-c-blue)" },
  { name: "Monthly Ministerial Review", desc: "Cross-ministry coordination", icon: "Users", color: "var(--color-c-violet)" },
  { name: "Quarterly CM Stocktake", desc: "CM sees unfiltered data", icon: "Gauge", color: "var(--color-c-green)" },
  { name: "Annual Legislature Report", desc: "Published progress, negative results too", icon: "Landmark", color: "var(--color-c-orange)" },
];
