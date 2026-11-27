export const reportTemplates = [
  { name: "Weekly CM Brief", icon: "FileText", desc: "Source-backed weekly summary for the CM", color: "var(--color-c-violet)" },
  { name: "Weekly Media Note", icon: "Megaphone", desc: "Press-ready talking points", color: "var(--color-c-blue)" },
  { name: "Monthly District Scorecard", icon: "Map", desc: "14-district performance scorecard", color: "var(--color-c-green)" },
  { name: "Quarterly Public Progress", icon: "Globe", desc: "Citizen-facing progress summary", color: "var(--color-c-orange)" },
  { name: "Annual Legislature Report", icon: "Landmark", desc: "Published outcome report", color: "var(--color-c-teal)" },
  { name: "Fiscal Recovery Note", icon: "Coins", desc: "Liabilities, arrears & recovery levers", color: "var(--color-c-pink)" },
  { name: "Health Alert Note", icon: "HeartPulse", desc: "Disease surveillance briefing", color: "var(--color-rag-red)" },
  { name: "Calamity Preparedness Note", icon: "CloudRainWind", desc: "Disaster readiness briefing", color: "var(--color-c-blue)" },
  { name: "Investment Review Note", icon: "TrendingUp", desc: "IGR & grounded investment", color: "var(--color-c-violet)" },
  { name: "File Pendency Review", icon: "FileStack", desc: "Where files are stuck", color: "var(--color-c-orange)" },
  { name: "Indira Guarantees Report", icon: "ShieldCheck", desc: "Six-guarantee progress", color: "var(--color-ribbon)" },
  { name: "Department Secretary Review", icon: "Users", desc: "Per-secretary accountability note", color: "var(--color-c-green)" },
];

export const morningNote = {
  improved: [
    "₹25L health insurance crossed 92.4 lakh families (+12% YoY)",
    "Welfare pension on-time payment at 96% — Suneethi backlog cleared",
    "KSRTC women ridership at all-time high 10.7 lakh/day",
  ],
  delayed: [
    "Dengue positivity up 34% WoW in Palakkad — outbreak threshold breached",
    "GST arrears recovery 18% below target this quarter",
    "Outer Ring Road KIIFB package-3 slipping (land acquisition)",
  ],
  mediaQuestions: [
    { q: "Why has dengue spiked in Palakkad?", a: "Post-monsoon vector surge; fogging + rapid-response teams deployed, daily case dashboard live. ASV stock being replenished." },
    { q: "Is KIIFB funding under strain?", a: "We have a sequencing plan for the repayment cliff and are tightening accountability with a weekly dashboard — no borrowing for consumption." },
    { q: "Are welfare pensions delayed?", a: "The brief Suneethi feed delay is resolved; 96% paid on time this cycle." },
  ],
  avoid: [
    "Do not claim dengue is 'fully controlled' — say contained & monitored.",
    "Do not give a firm KIIFB completion date for delayed packages.",
    "Avoid absolute arrears-recovery promises before the amnesty GO.",
  ],
};

export const reportHistory = [
  { name: "Weekly CM Brief — Wk 24", date: "Today 06:00", by: "PMU Admin", format: "PDF" },
  { name: "Monthly District Scorecard — May", date: "01 Jun", by: "PMU Admin", format: "Excel" },
  { name: "Fiscal Recovery Note", date: "28 May", by: "Finance Cell", format: "PDF" },
  { name: "Indira Guarantees Report — Q1", date: "20 May", by: "PMU Admin", format: "PDF" },
];
