import { Rag } from "./types";

export type SectorMetric = { label: string; value: string; sub?: string; icon: string; rag: Rag };
export type SectorSource = { name: string; url: string; status: "accessible" | "limited" | "blocked"; note: string };
export type SectorTable = { title: string; columns: string[]; rows: (string | number)[][] };
export type SectorDashboard = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  owner: string;
  theme: string;
  score: number;
  rag: Rag;
  summary: string;
  metrics: SectorMetric[];
  priorities: { label: string; value: number; rag: Rag; note: string }[];
  sources: SectorSource[];
  tables?: SectorTable[];
  nextActions: string[];
};

export const agricultureCrops = [
  ["Arecanut", 93968, 103476, 1101],
  ["Banana", 49020, 461244, 9409],
  ["Betel leaves", 243, 8653, 35609],
  ["Cardamom", 39143, 21270, 543],
  ["Cashew", 32369, 15861, 490],
  ["Cocoa", 12527, 14486, 1156],
  ["Coconut", 765435, 5535, 7231],
  ["Coffee", 85880, 69900, 814],
  ["Ginger", 2924, 12886, 4407],
  ["Jack", 88873, 266, 2993],
  ["Mango", 75840, 470040, 6198],
  ["Nutmeg", 22152, 17435, 787],
  ["Paddy", 193950, 559336, 2872],
  ["Papaya", 14805, 88201, 5958],
  ["Pepper", 76351, 32516, 426],
  ["Pineapple", 11508, 106654, 9628],
  ["Plantain", 51901, 410011, 7900],
  ["Rubber", 551030, 533500, 968],
  ["Tapioca", 55664, 2506352, 45033],
  ["Tea", 35782, 60360, 1685],
  ["Turmeric", 2203, 7402, 3360],
];

export const sectorDashboards: SectorDashboard[] = [
  {
    slug: "home-internal-security",
    title: "Home & Internal Security",
    short: "Home Security",
    icon: "ShieldAlert",
    owner: "Home Department",
    theme: "#173f73",
    score: 78,
    rag: "amber",
    summary: "Command-centre view for law and order, public safety, emergency response, fire services, prisons, prosecution and forensic laboratories using realistic demo statistics.",
    metrics: [
      { label: "State Status", value: "Stable", sub: "demo command status", icon: "ShieldCheck", rag: "green" },
      { label: "Critical Alerts", value: "6", sub: "open escalation queue", icon: "TriangleAlert", rag: "red" },
      { label: "112 Response", value: "9.8 min", sub: "average arrival", icon: "Siren", rag: "green" },
      { label: "Forensic Backlog", value: "18,740", sub: "samples pending", icon: "Microscope", rag: "red" },
    ],
    priorities: [
      { label: "Cyber-financial fraud growth", value: 62, rag: "red", note: "Selected districts show repeated weekly increase; rapid bank-freeze coordination required." },
      { label: "Emergency response SLA breaches", value: 74, rag: "amber", note: "High-range and rural station limits need vehicle and personnel availability review." },
      { label: "Forensic and chemical backlog", value: 58, rag: "red", note: "Toxicology and priority samples may affect charge-sheet timelines." },
      { label: "Road fatality corridor risk", value: 68, rag: "amber", note: "Night-time accident concentration needs enforcement and road-safety coordination." },
    ],
    sources: [
      { name: "Kerala Police Crime Statistics", url: "https://keralapolice.gov.in/", status: "accessible", note: "Public crime-statistics category indicators can feed aggregate views." },
      { name: "Emergency Response Support System / 112", url: "https://112.gov.in/", status: "limited", note: "Operational feed requires secure integration." },
      { name: "Kerala Fire and Rescue Services", url: "https://fire.kerala.gov.in/", status: "accessible", note: "District contacts and public reference layers available." },
      { name: "Kerala Prisons and Correctional Services", url: "https://keralaprisons.gov.in/", status: "accessible", note: "Public population and capacity statistics available." },
      { name: "Forensic Science Laboratory / Chemical Examiner", url: "https://home.kerala.gov.in/", status: "limited", note: "Laboratory workload requires authenticated departmental feed." },
    ],
    nextActions: ["Connect secure aggregate CCTNS, THUNA and 112 feeds with role-based masking.", "Add prison institution capacity extracts and forensic LIMS backlog feed.", "Configure CM, Home Minister, Chief Secretary, Home Secretary and department-head access profiles."],
  },
  {
    slug: "social-security",
    title: "Social Security Pension",
    short: "Pensions",
    icon: "HandCoins",
    owner: "Social Justice / LSGD",
    theme: "#7c3aed",
    score: 82,
    rag: "amber",
    summary: "Tracks welfare pensions, beneficiary coverage, arrears, Suneethi services and K-SMART/LSGD-linked delivery signals.",
    metrics: [
      { label: "Source Systems", value: "2", sub: "Suneethi, K-SMART", icon: "Database", rag: "green" },
      { label: "e-Service Rows", value: "30", sub: "Suneethi welfare services", icon: "ListChecks", rag: "green" },
      { label: "Applications", value: "37,220", sub: "Suneethi public rows", icon: "Files", rag: "amber" },
      { label: "Pending", value: "3,839", sub: "service-row pending", icon: "Clock3", rag: "amber" },
    ],
    priorities: [
      { label: "Pension disbursement arrears", value: 76, rag: "amber", note: "Needs payment cycle and district arrears integration." },
      { label: "Suneethi service disposal", value: 85, rag: "amber", note: "Public service rows available; scheme-wise feed can be linked." },
      { label: "Beneficiary deduplication", value: 70, rag: "amber", note: "Requires K-SMART / LSGD authenticated feed." },
    ],
    sources: [
      { name: "Suneethi Portal", url: "https://suneethi.sjd.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
      { name: "K-SMART", url: "https://ksmart.lsgkerala.gov.in/", status: "accessible", note: "Public shell reachable; detailed APIs may require access." },
    ],
    nextActions: ["Connect district-wise pension payment feed.", "Add arrears ageing and monthly disbursement trend.", "Map welfare board and pension category split."],
  },
  {
    slug: "education",
    title: "Education Indicators",
    short: "Education",
    icon: "GraduationCap",
    owner: "General / Higher Education",
    theme: "#2563eb",
    score: 84,
    rag: "amber",
    summary: "Combines higher education, collegiate education, school performance, SAMAGRA, SAMANWAYA and SAMS coverage into one education sector command view.",
    metrics: [
      { label: "Higher Ed Source", value: "Live", sub: "KSHEC reachable", icon: "University", rag: "green" },
      { label: "School Sources", value: "3", sub: "SAMAGRA, SAMANWAYA, SAMS", icon: "School", rag: "green" },
      { label: "e-Service Apps", value: "11.32 L", sub: "collegiate scholarship row", icon: "Files", rag: "green" },
      { label: "Service Disposal", value: "100%", sub: "collegiate education", icon: "CheckCircle2", rag: "green" },
    ],
    priorities: [
      { label: "College enrolment vs pass rates", value: 78, rag: "amber", note: "Public sources reachable; structured monthly data feed to wire." },
      { label: "School vacancies and fitness certification", value: 72, rag: "amber", note: "SAMAGRA/SAMANWAYA shells accessible." },
      { label: "Dropout and transition tracking", value: 68, rag: "amber", note: "Needs district-wise education department extracts." },
    ],
    sources: [
      { name: "Kerala State Higher Education Council", url: "https://www.kshec.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
      { name: "Directorate of Collegiate Education", url: "https://collegiateedu.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
      { name: "SAMAGRA", url: "https://samagra.kite.kerala.gov.in/", status: "accessible", note: "Public shell reachable." },
      { name: "SAMANWAYA", url: "https://samanwaya.kite.kerala.gov.in/", status: "accessible", note: "Public shell reachable." },
    ],
    nextActions: ["Add institution-level enrolment and pass-rate drill-down.", "Add school fitness certificate and vacancy dashboards.", "Use district heatmap for schools needing urgent repair or staffing."],
  },
  {
    slug: "agriculture",
    title: "Agriculture Production",
    short: "Agriculture",
    icon: "Leaf",
    owner: "Agriculture Department",
    theme: "#16a34a",
    score: 81,
    rag: "amber",
    summary: "Uses DES crop statistics at-a-glance plus AIMS and DataHub agriculture sources for crop area, production, productivity, land utilisation and farmer-service signals.",
    metrics: [
      { label: "Major Crops", value: "21", sub: "DES 2021-22 table", icon: "Wheat", rag: "green" },
      { label: "Gross Cropped Area", value: "25.23 L Ha", sub: "land utilisation", icon: "Map", rag: "green" },
      { label: "Net Area Sown", value: "20.29 L Ha", sub: "land utilisation", icon: "Sprout", rag: "green" },
      { label: "Cropping Intensity", value: "124%", sub: "DES data portal", icon: "Activity", rag: "amber" },
    ],
    priorities: [
      { label: "Crop production monitoring", value: 82, rag: "amber", note: "DES table captured; district/crop drill-down available from portal." },
      { label: "AIMS farmer service integration", value: 74, rag: "amber", note: "AIMS public portal reachable; detailed scheme feeds likely need API/session." },
      { label: "Market price watch", value: 67, rag: "amber", note: "DataHub and Economics & Statistics can support price trend integration." },
    ],
    sources: [
      { name: "DES Data Portal - Crop Statistics", url: "http://117.241.78.141/dataportal/trs_data_ataglance.php", status: "accessible", note: "Crop and land utilisation tables scraped." },
      { name: "Kerala DataHub - Agriculture", url: "https://datahub.kerala.gov.in/sector/agriculture", status: "accessible", note: "Sector page reachable." },
      { name: "AIMS Agriculture", url: "https://www.aims.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
      { name: "Economics & Statistics", url: "https://www.ecostat.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
    ],
    tables: [
      { title: "Major crops - area, production and productivity, 2021-22", columns: ["Crop", "Area Ha", "Production", "Productivity"], rows: agricultureCrops },
      { title: "Land utilisation pattern, 2021-22", columns: ["Category", "Area"], rows: [["Total geographical area", 3886287], ["Forest area", 1081509], ["Non agricultural use", 465561], ["Cultivable waste", 88499], ["Fallow land", 103334], ["Still water", 100316], ["Net area sown", 2029368], ["Gross cropped area", 2523014], ["Cropping intensity", "124%"]] },
    ],
    nextActions: ["Add crop-wise district drill-down from DES advanced search.", "Add AIMS scheme/service performance and farmer application status.", "Add weekly commodity price and production risk alerts."],
  },
  {
    slug: "fisheries",
    title: "Fisheries Production",
    short: "Fisheries",
    icon: "ShipWheel",
    owner: "Fisheries Department",
    theme: "#0891b2",
    score: 78,
    rag: "amber",
    summary: "Tracks registered fishermen, vessels, production, welfare schemes, harbour/fleet data and Mission Samudra-linked blue economy indicators.",
    metrics: [
      { label: "e-Service Apps", value: "34.93 L", sub: "Fisheries public service rows", icon: "Files", rag: "green" },
      { label: "Service Disposal", value: "95.57%", sub: "department roll-up", icon: "CheckCircle2", rag: "green" },
      { label: "Pending", value: "1.55 L", sub: "service-row pending estimate", icon: "Clock3", rag: "amber" },
      { label: "Services", value: "8", sub: "e-services roll-up", icon: "ListChecks", rag: "green" },
    ],
    priorities: [
      { label: "Registered fisherfolk and vessel registry", value: 80, rag: "amber", note: "Public department portal reachable; detailed fleet feed to connect." },
      { label: "Monthly catch and production", value: 70, rag: "amber", note: "Likely CSV/public reports; needs structured scrape." },
      { label: "Blue economy welfare link", value: 76, rag: "amber", note: "Can connect with Mission Samudra activities." },
    ],
    sources: [{ name: "Fisheries Department", url: "https://fisheries.kerala.gov.in/", status: "accessible", note: "Public Drupal portal reachable." }],
    nextActions: ["Scrape scheme and e-service pages.", "Add fleet/vessel and harbour district heatmap.", "Add monthly marine/inland production trend."],
  },
  {
    slug: "forest-wildlife",
    title: "Forest & Wildlife",
    short: "Forest",
    icon: "Trees",
    owner: "Forest & Wildlife Department",
    theme: "#15803d",
    score: 74,
    rag: "amber",
    summary: "Tracks forest cover, endangered species, human-wildlife conflict, compensation and eco-sensitive risk signals.",
    metrics: [
      { label: "Portal Status", value: "Live", sub: "public site reachable", icon: "Globe", rag: "green" },
      { label: "Conflict Services", value: "6", sub: "compensation service category", icon: "ShieldAlert", rag: "amber" },
      { label: "Applications", value: "89,701", sub: "e-service conflict rows", icon: "Files", rag: "amber" },
      { label: "Disposal", value: "89.37%", sub: "department roll-up", icon: "Gauge", rag: "amber" },
    ],
    priorities: [
      { label: "Human-wildlife conflict compensation", value: 72, rag: "amber", note: "Compensation services visible in e-service data." },
      { label: "Forest cover and eco-restoration", value: 76, rag: "amber", note: "Needs GIS/statistical source wiring." },
      { label: "Incident frequency and hotspot map", value: 66, rag: "red", note: "Needs district-wise incident feed." },
    ],
    sources: [{ name: "Forest Department", url: "https://forest.kerala.gov.in/", status: "accessible", note: "Public portal reachable." }],
    nextActions: ["Add conflict hotspot district heatmap.", "Add compensation pending-ageing queue.", "Connect forest cover and fire-risk datasets."],
  },
  {
    slug: "cmdrf",
    title: "CMDRF Statistics",
    short: "CMDRF",
    icon: "HeartHandshake",
    owner: "CMDRF / Finance",
    theme: "#dc2626",
    score: 77,
    rag: "amber",
    summary: "Tracks contributions, disbursements and category-wise relief such as medical assistance, housing and special victim support.",
    metrics: [
      { label: "Donation Portal", value: "Live", sub: "public site reachable", icon: "HandCoins", rag: "green" },
      { label: "Categories", value: "4+", sub: "medical, housing, relief", icon: "Layers3", rag: "amber" },
      { label: "Public Feed", value: "Limited", sub: "detailed stats need endpoint", icon: "Database", rag: "amber" },
      { label: "Audit Need", value: "High", sub: "daily fund movement", icon: "ShieldCheck", rag: "amber" },
    ],
    priorities: [
      { label: "Contribution trend", value: 72, rag: "amber", note: "Donation portal reachable; structured public totals need extraction." },
      { label: "Disbursement by category", value: 68, rag: "amber", note: "Needs CMDRF back-office feed or public report scrape." },
      { label: "Beneficiary transparency", value: 74, rag: "amber", note: "Can add category and district drill-down once feed is available." },
    ],
    sources: [{ name: "CMDRF Donation Portal", url: "https://donation.cmdrf.kerala.gov.in/", status: "accessible", note: "Donation portal reachable; main domain was inconsistent." }],
    nextActions: ["Find public statistics endpoint or report archive.", "Add contribution and disbursement trend.", "Add relief category and district split."],
  },
  {
    slug: "environment-climate",
    title: "Environment & Climate",
    short: "Environment",
    icon: "CloudSun",
    owner: "Environment Dept / KSPCB / CWRDM",
    theme: "#0f766e",
    score: 73,
    rag: "amber",
    summary: "Monitors AQI, water quality, waste compliance, climate events, coastal erosion and pollution incidents.",
    metrics: [
      { label: "KSPCB", value: "Live", sub: "public site reachable", icon: "Factory", rag: "green" },
      { label: "CWRDM", value: "Live", sub: "public site reachable", icon: "Waves", rag: "green" },
      { label: "Indicators", value: "6", sub: "AQI, water, waste, coast", icon: "Activity", rag: "amber" },
      { label: "Data Mode", value: "CSV/API", sub: "mixed sources", icon: "DatabaseZap", rag: "amber" },
    ],
    priorities: [
      { label: "Air and water quality alerts", value: 78, rag: "amber", note: "KSPCB source reachable." },
      { label: "Waste compliance", value: 69, rag: "amber", note: "Can combine KSPCB and LSG sources." },
      { label: "Coastal erosion and climate events", value: 65, rag: "red", note: "CWRDM source reachable; structured event extraction needed." },
    ],
    sources: [
      { name: "KSPCB", url: "https://kspcb.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
      { name: "CWRDM", url: "https://cwrdm.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
    ],
    nextActions: ["Scrape AQI/water-quality tables where public.", "Add pollution incident ticket queue.", "Add coastal erosion watch map."],
  },
  {
    slug: "scholarships-grants",
    title: "Scholarships & Grants",
    short: "Scholarships",
    icon: "Award",
    owner: "SC/ST/BC Development and Education",
    theme: "#9333ea",
    score: 80,
    rag: "amber",
    summary: "Tracks e-Grantz scholarships, merit grants, minority welfare and scholarship pending/disposal signals.",
    metrics: [
      { label: "Scholarship Services", value: "25", sub: "eGrantz category", icon: "Award", rag: "green" },
      { label: "Applications", value: "74.69 L", sub: "e-service rows", icon: "Files", rag: "green" },
      { label: "Pending", value: "2.07 L", sub: "service-row pending", icon: "Clock3", rag: "amber" },
      { label: "Disposal", value: "95.79%", sub: "category estimate", icon: "Gauge", rag: "green" },
    ],
    priorities: [
      { label: "OBC(H) postmatric backlog", value: 55, rag: "red", note: "Low disposal service row identified from e-services." },
      { label: "OEC postmatric backlog", value: 60, rag: "red", note: "Pending-heavy service row identified." },
      { label: "Minority welfare grants", value: 74, rag: "amber", note: "Needs separate source mapping." },
    ],
    sources: [{ name: "e-Grantz", url: "http://www.egrantz.kerala.gov.in/", status: "accessible", note: "Accessible through HTTP redirect; HTTPS direct was picky." }],
    nextActions: ["Add scholarship category and community split.", "Add district-wise pending scholarship heatmap.", "Add beneficiary disbursement trend."],
  },
  {
    slug: "food-civil-supplies",
    title: "Food & Civil Supplies",
    short: "Food & PDS",
    icon: "ShoppingBasket",
    owner: "Civil Supplies Department",
    theme: "#ea580c",
    score: 86,
    rag: "green",
    summary: "Tracks ration distribution, e-PDS, fair price shops, ration card services, stock movement and grievance signals.",
    metrics: [
      { label: "e-RCMS Services", value: "17", sub: "ration card service rows", icon: "ListChecks", rag: "green" },
      { label: "Applications", value: "1.60 Cr", sub: "e-RCMS service rows", icon: "Files", rag: "green" },
      { label: "Pending", value: "0", sub: "public row pending", icon: "CheckCircle2", rag: "green" },
      { label: "PDS Portal", value: "Live", sub: "e-PDS reachable", icon: "Truck", rag: "green" },
    ],
    priorities: [
      { label: "Grain distribution tracking", value: 84, rag: "green", note: "e-PDS portal reachable." },
      { label: "Fair price shop compliance", value: 78, rag: "amber", note: "Needs FPS-level feed." },
      { label: "Ration card service performance", value: 93, rag: "green", note: "e-RCMS rows show strong disposal." },
    ],
    sources: [
      { name: "Civil Supplies", url: "https://civilsupplieskerala.gov.in/", status: "accessible", note: "Public portal reachable." },
      { name: "e-PDS", url: "https://epos.kerala.gov.in/", status: "accessible", note: "Public portal reachable." },
    ],
    nextActions: ["Add district stock and FPS compliance map.", "Add ration lifting and distribution trend.", "Add exception alerts for stock-outs."],
  },
  {
    slug: "municipal-panchayats",
    title: "Municipal Corporations & Panchayats",
    short: "Municipal/LSG",
    icon: "Landmark",
    owner: "LSGD",
    theme: "#0d9488",
    score: 78,
    rag: "amber",
    summary: "Tracks solid waste, sanitation, food safety touchpoints, self-help groups, local body services and K-SMART/ILGMS delivery.",
    metrics: [
      { label: "LSGD Services", value: "44", sub: "department e-service roll-up", icon: "ListChecks", rag: "green" },
      { label: "Applications", value: "1.82 Cr", sub: "LSGD service rows", icon: "Files", rag: "green" },
      { label: "Last Month", value: "18.14%", sub: "source last-month disposal", icon: "CalendarClock", rag: "red" },
      { label: "K-SMART", value: "Live", sub: "public shell reachable", icon: "MonitorCog", rag: "green" },
    ],
    priorities: [
      { label: "Solid waste movement", value: 72, rag: "amber", note: "Needs ILGMS/K-SMART feed." },
      { label: "Building permit backlog", value: 68, rag: "amber", note: "Large pending queue visible in e-services." },
      { label: "Sanitation and food-safety compliance", value: 66, rag: "amber", note: "Needs local-body inspection feed." },
    ],
    sources: [
      { name: "K-SMART", url: "https://ksmart.lsgkerala.gov.in/", status: "accessible", note: "Public shell reachable; detailed dashboard needs API/session." },
      { name: "LSGD Citizen Portal", url: "https://citizen.lsgkerala.gov.in/", status: "accessible", note: "Public service portal reachable via e-services source list." },
    ],
    nextActions: ["Add solid waste and sanitation district map.", "Add building-permit SLA queue.", "Add local-body service performance drill-down."],
  },
];

export const sectorBySlug = Object.fromEntries(sectorDashboards.map((s) => [s.slug, s])) as Record<string, SectorDashboard>;
