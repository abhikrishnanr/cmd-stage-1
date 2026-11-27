export const transformationTracks = [
  {
    track: "Strategy & Planning", icon: "Compass", color: "var(--color-c-violet)",
    items: [
      { name: "State Strategic Vision", desc: "Long-horizon anchor for delivery & investment" },
      { name: "Economic Intelligence", desc: "Policy research, absorbs Planning Board analysis" },
      { name: "District Planning", desc: "Annual compacts with all 14 Collectors" },
      { name: "Evidence Platform", desc: "Verified baselines into delivery governance" },
    ],
  },
  {
    track: "Delivery Governance", icon: "Gauge", color: "var(--color-c-blue)",
    items: [
      { name: "Named Outcome Commitments", desc: "Tier 1 & 2 POCs, named PS owner" },
      { name: "Weekly RAG Review", desc: "PS review weekly; 48-hr escalation" },
      { name: "Monthly Ministerial Review", desc: "Cross-ministry coordination" },
      { name: "Quarterly CM Stocktake", desc: "CM sees unfiltered data" },
      { name: "Annual Legislature Report", desc: "Published progress, negative results too" },
    ],
  },
  {
    track: "Transformation Portfolio", icon: "FlaskConical", color: "var(--color-c-green)",
    items: [
      { name: "Future Kerala Lab", desc: "Scans pain, leakages, bottlenecks; top-20 reforms/qtr" },
      { name: "Reform Pipeline", desc: "CM approves Tier A; 15-20 in design/pilot always" },
      { name: "Reform Control Tower", desc: "No pilot runs indefinitely" },
      { name: "Handover & Compounding", desc: "Reform that compounds, not fades" },
    ],
  },
];

export const cycle = ["Discover", "Design", "Approve", "Pilot", "Rollout", "Measure", "Institutionalise", "Review"];

export const fiscalLogic = [
  { title: "Revenue Mobilisation", desc: "Intelligence Cell finds compliance gaps weekly", icon: "Coins", color: "var(--color-c-green)" },
  { title: "Cost Reduction", desc: "Procurement reform, e-GeM mandate", icon: "TrendingDown", color: "var(--color-c-blue)" },
  { title: "Investment Credibility Unlock", desc: "IGR from <30% to >60%", icon: "TrendingUp", color: "var(--color-c-violet)" },
  { title: "External Advocacy", desc: "Central transfers, FDI facilitation", icon: "Globe", color: "var(--color-c-orange)" },
];

export const reformPortfolio = [
  { name: "Investment Grounding (IGR)", tier: "A", status: "Rollout", rag: "amber" as const },
  { name: "e-Office mandate (file disposal)", tier: "A", status: "Rollout", rag: "green" as const },
  { name: "Procurement analytics / e-GeM", tier: "A", status: "Pilot", rag: "amber" as const },
  { name: "PSU restructuring (top-10)", tier: "B", status: "Design", rag: "amber" as const },
  { name: "Revenue Intelligence Cell", tier: "B", status: "Pilot", rag: "green" as const },
  { name: "myKerala service automation", tier: "B", status: "Rollout", rag: "green" as const },
  { name: "Digital Governance Authority", tier: "C", status: "Design", rag: "amber" as const },
  { name: "District outcome compacts", tier: "C", status: "Pilot", rag: "green" as const },
];
