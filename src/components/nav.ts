import { cabinetRegisterUrl } from "@/data/cabinetFeed";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  ready?: boolean;
  children?: { label: string; href: string }[];
}
export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    group: "Command",
    items: [
      { label: "Chief Minister Dashboard", href: "/dashboard-cm", icon: "Crown", ready: true },
      { label: "CM Review", href: "/cm-review", icon: "ClipboardList", ready: true },
      { label: "Cabinet Decisions", href: cabinetRegisterUrl, icon: "Landmark", ready: true },
      { label: "Kerala Today", href: "/dashboard", icon: "LayoutDashboard", ready: true },
      { label: "TV Briefing Wall", href: "/tv", icon: "MonitorPlay", ready: true },
      { label: "Indira Guarantees", href: "/indira", icon: "ShieldCheck", ready: true },
      { label: "Dream Projects", href: "/dream-projects", icon: "Rocket", ready: true },
    ],
  },
  {
    group: "Fiscal",
    items: [
      { label: "Finance", href: "/finance", icon: "Landmark", ready: true },
      { label: "Revenue", href: "/revenue", icon: "Coins", ready: true },
      { label: "Budget", href: "/budget", icon: "PieChart", ready: true },
      { label: "Plan Budget Utilisation", href: "/plan-budget-utilization", icon: "ChartNoAxesCombined", ready: true },
    ],
  },
  {
    group: "Delivery & Geography",
    items: [
      { label: "Programme Delivery", href: "/delivery-rag", icon: "Gauge", ready: true },
      { label: "e-Services", href: "/e-services", icon: "MonitorCog", ready: true },
      { label: "Districts", href: "/districts", icon: "Map", ready: true },
      { label: "Major Infra Projects", href: "/projects", icon: "HardHat", ready: true },
      { label: "Grievances", href: "/grievances", icon: "MessageSquareWarning", ready: true },
      { label: "eOffice File Activity", href: "/files", icon: "FileStack", ready: true },
    ],
  },
  {
    group: "Sectors",
    items: [
      { label: "Sector Command", href: "/sectors", icon: "Layers3", ready: true },
      {
        label: "Market Intelligence", href: "/market-intelligence", icon: "ChartCandlestick", ready: true,
        children: [
          { label: "Wholesale prices", href: "/market-intelligence#wholesale" },
          { label: "Monthly history", href: "/market-intelligence#monthly" },
          { label: "Essential retail prices", href: "/market-intelligence#retail" },
          { label: "Farm prices", href: "/market-intelligence#farm" },
          { label: "Consumer Price Index", href: "/market-intelligence#consumer-prices" },
          { label: "District output", href: "/market-intelligence#district-output" },
        ],
      },
      { label: "Health", href: "/health", icon: "HeartPulse", ready: true },
      { label: "Home & Internal Security", href: "/sectors/home-internal-security", icon: "ShieldAlert", ready: true },
      { label: "Public Works", href: "/public-works", icon: "Construction", ready: true },
      { label: "Power", href: "/power", icon: "Zap", ready: true },
      { label: "Water", href: "/water", icon: "Droplets", ready: true },
      { label: "Industries", href: "/industries", icon: "Factory", ready: true },
      { label: "E & IT", href: "/e-it", icon: "Cpu", ready: true },
      { label: "Agriculture", href: "/sectors/agriculture", icon: "Leaf", ready: true },
      { label: "Education", href: "/sectors/education", icon: "GraduationCap", ready: true },
      { label: "Social Security", href: "/sectors/social-security", icon: "HandCoins", ready: true },
      { label: "Fisheries", href: "/sectors/fisheries", icon: "ShipWheel", ready: true },
      { label: "Forest & Wildlife", href: "/sectors/forest-wildlife", icon: "Trees", ready: true },
      { label: "Environment", href: "/sectors/environment-climate", icon: "CloudSun", ready: true },
      { label: "Scholarships", href: "/sectors/scholarships-grants", icon: "Award", ready: true },
      { label: "Food & Supplies", href: "/sectors/food-civil-supplies", icon: "ShoppingBasket", ready: true },
      { label: "Transport", href: "/sectors/transportation", icon: "Bus", ready: true },
      { label: "Municipal / LSG", href: "/sectors/municipal-panchayats", icon: "Landmark", ready: true },
    ],
  },
  {
    group: "Human Development",
    items: [
      { label: "Employment", href: "/employment", icon: "BriefcaseBusiness", ready: true },
      { label: "SDG Tracker", href: "/sdg", icon: "BadgeCheck", ready: true },
      { label: "Calamity & Climate", href: "/calamity", icon: "CloudRainWind", ready: true },
      { label: "Public Feedback", href: "/social", icon: "Megaphone", ready: true },
    ],
  },
  {
    group: "Platform",
    items: [
      { label: "Dashboard Modules", href: "/modules", icon: "Grid3x3", ready: true },
      { label: "Data Sources", href: "/systems", icon: "Server", ready: true },
    ],
  },
  {
    group: "Workflow",
    items: [
      { label: "Inbox", href: "/inbox", icon: "Inbox", ready: true },
      { label: "Tickets", href: "/tickets", icon: "TicketCheck", ready: true },
      { label: "Reports", href: "/reports", icon: "FileText", ready: true },
    ],
  },
  {
    group: "Strategy",
    items: [
      { label: "Transformation", href: "/transformation", icon: "Workflow", ready: true },
      { label: "Governance and Public Services", href: "/governance", icon: "Network", ready: true },
      { label: "Risk & Audit", href: "/risk", icon: "ShieldAlert", ready: true },
      { label: "Land Bank", href: "/land-bank", icon: "MapPinned", ready: true },
    ],
  },
  {
    group: "Public",
    items: [{ label: "Public View", href: "/public", icon: "Globe", ready: true }],
  },
  {
    group: "Results Management",
    items: [
      { label: "RBM Projects (Priority)", href: "/rbm-new", icon: "ClipboardPenLine", ready: true },
      { label: "Results-Based Management", href: "/rbm", icon: "Target", ready: true },
    ],
  },
];
