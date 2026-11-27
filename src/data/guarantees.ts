import { Guarantee } from "./types";

const D = (
  rows: [string, number][]
): { rank: number; district: string; metricLabel: string; value: number }[] =>
  rows
    .map(([district, value]) => ({ district, value }))
    .sort((a, b) => b.value - a.value)
    .map((r, i) => ({ rank: i + 1, district: r.district, metricLabel: "", value: r.value }));

export const guarantees: Guarantee[] = [
  /* ───────────────────────── 1. FREE KSRTC TRAVEL ───────────────────────── */
  {
    id: "IG-1", slug: "free-ksrtc-travel", short: "Free KSRTC Travel",
    title: "Free KSRTC Travel for Women", subtitle: "2-Year Impact Dashboard",
    ribbon: "Indira Guarantee", updated: "14 May 2028",
    theme: "var(--color-c-violet)",
    hero: "linear-gradient(120deg,#5b3df0 0%,#7c5cff 45%,#9d7bff 100%)",
    owner: "Transport Secretary", source: "KSRTC · Smart City", rag: "green", score: 92,
    target: "Universal free travel — all women residents",
    achieved: "78.4 Cr free trips · 6,120 buses",
    beneficiaries: "10.7 Lakh / day", allocated: "₹2,360 Cr", released: "₹2,140 Cr",
    pending: "Not applicable", grievances: 312, districtsOnTrack: 12, districtsAtRisk: 2,
    metricUnit: "Trips (Lakh)",
    kpis: [
      { label: "Total Free Trips", value: "78.4 Cr", delta: "↑ 64% vs Year 1", icon: "Bus", color: "var(--color-c-violet)" },
      { label: "Average Free Trips / Day", value: "10.7 Lakh", delta: "↑ 5.9% vs last month", spark: [9.0, 9.2, 9.4, 9.6, 9.8, 10.0, 10.1, 10.7], sparkColor: "#16a34a", icon: "Users", color: "var(--color-c-blue)" },
      { label: "Average Distance Travelled", value: "24.8 km", sub: "per free trip", icon: "Route", color: "var(--color-c-green)" },
      { label: "Average Ticket Price", value: "₹27.30", sub: "fare waived per trip", icon: "Ticket", color: "var(--color-c-orange)" },
      { label: "Shortest Distance Travelled", value: "1.2 km", sub: "recorded free trip", icon: "MapPin", color: "var(--color-c-teal)" },
      { label: "Longest Distance Travelled", value: "612 km", sub: "recorded through-service", icon: "Bus", color: "var(--color-c-violet)" },
      { label: "Buses Covered", value: "6,120", sub: "across all districts", icon: "Bus", color: "var(--color-c-teal)" },
      { label: "Citizen Satisfaction", value: "93%", sub: "★ 4.7 / 5", icon: "Smile", color: "var(--color-c-pink)" },
    ],
    travelAnalytics: {
      totalTrips: "78.4 Cr",
      averageDistance: "24.8 km",
      distanceSlabs: [
        { label: "Up to 5 km", count: "10.98 Cr", percent: 14, color: "#2f7df6" },
        { label: "6–15 km", count: "21.95 Cr", percent: 28, color: "#1aa6c9" },
        { label: "16–30 km", count: "24.30 Cr", percent: 31, color: "#7c5cff" },
        { label: "31–60 km", count: "14.90 Cr", percent: 19, color: "#f5821f" },
        { label: "Above 60 km", count: "6.27 Cr", percent: 8, color: "#ec4899" },
      ],
      genderOccupancy: [
        { district: "Thiruvananthapuram", region: "South", women: 64, men: 36 },
        { district: "Kollam", region: "South", women: 61, men: 39 },
        { district: "Pathanamthitta", region: "South", women: 57, men: 43 },
        { district: "Alappuzha", region: "South", women: 60, men: 40 },
        { district: "Kottayam", region: "Central", women: 58, men: 42 },
        { district: "Idukki", region: "Central", women: 55, men: 45 },
        { district: "Ernakulam", region: "Central", women: 63, men: 37 },
        { district: "Thrissur", region: "Central", women: 62, men: 38 },
        { district: "Palakkad", region: "Central", women: 59, men: 41 },
        { district: "Malappuram", region: "North", women: 66, men: 34 },
        { district: "Kozhikode", region: "North", women: 63, men: 37 },
        { district: "Wayanad", region: "North", women: 54, men: 46 },
        { district: "Kannur", region: "North", women: 60, men: 40 },
        { district: "Kasaragod", region: "North", women: 56, men: 44 },
      ],
      financials: {
        revenuePeriods: [
          {
            id: "day", label: "Day", currentLabel: "Today", previousLabel: "Yesterday",
            totalRevenueCr: 8.42, previousRevenueCr: 8.03, paidRevenueCr: 5.50,
            freeTickets: "10.7 Lakh", freeTicketAmountCr: 2.92,
            trend: [
              { label: "8 May", value: 7.94 }, { label: "9 May", value: 8.02 }, { label: "10 May", value: 7.88 },
              { label: "11 May", value: 8.11 }, { label: "12 May", value: 8.18 }, { label: "13 May", value: 8.03 },
              { label: "14 May", value: 8.42 },
            ],
          },
          {
            id: "week", label: "Week", currentLabel: "This week", previousLabel: "Previous week",
            totalRevenueCr: 58.94, previousRevenueCr: 56.20, paidRevenueCr: 38.49,
            freeTickets: "74.9 Lakh", freeTicketAmountCr: 20.45,
            trend: [
              { label: "W1", value: 52.20 }, { label: "W2", value: 53.80 }, { label: "W3", value: 54.70 },
              { label: "W4", value: 55.60 }, { label: "W5", value: 54.90 }, { label: "W6", value: 56.20 },
              { label: "W7", value: 57.10 }, { label: "W8", value: 58.94 },
            ],
          },
          {
            id: "month", label: "Month", currentLabel: "This month", previousLabel: "Previous month",
            totalRevenueCr: 252.40, previousRevenueCr: 241.10, paidRevenueCr: 164.77,
            freeTickets: "3.21 Cr", freeTicketAmountCr: 87.63,
            trend: [
              { label: "Jun", value: 218.3 }, { label: "Jul", value: 221.6 }, { label: "Aug", value: 224.9 },
              { label: "Sep", value: 226.1 }, { label: "Oct", value: 229.8 }, { label: "Nov", value: 231.4 },
              { label: "Dec", value: 235.7 }, { label: "Jan", value: 237.2 }, { label: "Feb", value: 238.6 },
              { label: "Mar", value: 240.2 }, { label: "Apr", value: 241.1 }, { label: "May", value: 252.4 },
            ],
          },
          {
            id: "year", label: "Year", currentLabel: "FY 2027–28", previousLabel: "FY 2026–27",
            totalRevenueCr: 3082, previousRevenueCr: 2910, paidRevenueCr: 2012,
            freeTickets: "39.2 Cr", freeTicketAmountCr: 1070,
            trend: [
              { label: "FY24", value: 2320 }, { label: "FY25", value: 2515 }, { label: "FY26", value: 2720 },
              { label: "FY27", value: 2910 }, { label: "FY28", value: 3082 },
            ],
          },
        ],
        governmentSettlement: {
          liabilityCr: 2360,
          disbursedCr: 2140,
          pendingCr: 220,
          underVerificationCr: 42,
          latestDisbursement: "₹185 Cr · 8 May 2028",
          nextSettlementDue: "31 May 2028",
        },
      },
    },
    glance: [
      { step: "Eligibility", desc: "All women residents of Kerala", icon: "UserCheck" },
      { step: "Board KSRTC Bus", desc: "City, town, rural & long routes", icon: "Bus" },
      { step: "Digital Pass / Validation", desc: "e-Ticket / digital validation", icon: "Smartphone" },
      { step: "Free Travel", desc: "100% fare waived for women", icon: "Ticket" },
      { step: "Economic & Social Impact", desc: "Empowered women, stronger Kerala", icon: "TrendingUp" },
    ],
    pillars: [
      { title: "Mobility", desc: "Seamless travel across Kerala", icon: "Bus", color: "var(--color-c-violet)" },
      { title: "Safety", desc: "Secure & reliable public transport", icon: "ShieldCheck", color: "var(--color-c-blue)" },
      { title: "Savings", desc: "More money saved, better livelihoods", icon: "PiggyBank", color: "var(--color-c-green)" },
      { title: "Access to Education & Work", desc: "New opportunities, better future", icon: "GraduationCap", color: "var(--color-c-orange)" },
    ],
    districtTable: D([
      ["Thiruvananthapuram", 959], ["Kollam", 764], ["Pathanamthitta", 272], ["Alappuzha", 466],
      ["Kottayam", 382], ["Idukki", 233], ["Ernakulam", 932], ["Thrissur", 790], ["Palakkad", 557],
      ["Malappuram", 880], ["Kozhikode", 699], ["Wayanad", 155], ["Kannur", 453], ["Kasaragod", 298],
    ]),
    trendBeneficiaries: mkTrend(8.1, 10.7),
    fundTrend: mkTrend(40, 95),
    pendingTrend: mkTrendDown(0, 0),
    grievanceTrend: mkTrendDown(820, 312),
    purposeSplit: [
      { label: "Work", value: 35, color: "var(--color-c-blue)" },
      { label: "Education", value: 25, color: "var(--color-c-green)" },
      { label: "Healthcare", value: 15, color: "var(--color-c-orange)" },
      { label: "Shopping", value: 15, color: "var(--color-c-violet)" },
      { label: "Other", value: 10, color: "#9bb0d6" },
    ],
    topDistricts: [
      { label: "Thiruvananthapuram", value: 959 }, { label: "Ernakulam", value: 932 },
      { label: "Malappuram", value: 880 }, { label: "Thrissur", value: 790 }, { label: "Kollam", value: 764 },
    ],
    categorySplit: [
      { label: "City", value: 34, color: "var(--color-c-blue)" },
      { label: "Town", value: 29, color: "var(--color-c-green)" },
      { label: "Rural", value: 24, color: "var(--color-c-orange)" },
      { label: "Long Route", value: 13, color: "var(--color-c-violet)" },
    ],
    segments: [
      { label: "Students", value: 28, color: "var(--color-c-violet)" },
      { label: "Workers", value: 34, color: "var(--color-c-blue)" },
      { label: "Homemakers", value: 19, color: "var(--color-c-green)" },
      { label: "Senior Citizens", value: 11, color: "var(--color-c-orange)" },
      { label: "Others", value: 8, color: "#9bb0d6" },
    ],
    avgSupport: { value: "₹1,480", label: "Saving per Beneficiary", sub: "Annual ₹17,760" },
    cumulative: {
      value: "₹2,140 Cr", label: "Estimated fare support delivered to women across Kerala",
      points: [
        { label: "More disposable income", desc: "", icon: "Wallet" },
        { label: "Better household well-being", desc: "", icon: "Home" },
        { label: "Increased spending on education & health", desc: "", icon: "BookOpen" },
        { label: "Boost to local economy", desc: "", icon: "Store" },
      ],
    },
    outcomes: [
      { label: "Improved access to education and jobs", icon: "GraduationCap", color: "var(--color-c-violet)" },
      { label: "Reduced transport burden on low-income households", icon: "PiggyBank", color: "var(--color-c-blue)" },
      { label: "Higher female workforce mobility", icon: "Users", color: "var(--color-c-green)" },
      { label: "Better access to healthcare and public services", icon: "HeartPulse", color: "var(--color-c-orange)" },
      { label: "Stronger public transport adoption", icon: "Bus", color: "var(--color-c-pink)" },
    ],
    operational: [
      { label: "Daily Services Under Scheme", value: "24,800", icon: "Bus" },
      { label: "Digital Pass / Validation Success", value: "98.2%", icon: "Smartphone" },
      { label: "Complaints Resolved", value: "96%", icon: "Headphones" },
      { label: "Peak Usage Time", value: "8–10 AM", icon: "Clock" },
    ],
    nextFocus: [
      { title: "Improve last-mile connectivity", desc: "Expand feeder & last-mile linkages for seamless travel", icon: "Route" },
      { title: "Expand women safety features", desc: "CCTV, panic buttons, better lighting & vigilant staff", icon: "ShieldCheck" },
      { title: "Increase rural service frequency", desc: "More trips, better connectivity to remote areas", icon: "Bus" },
    ],
    journey: [
      { stage: "Application", value: 100 }, { stage: "Verification", value: 97 }, { stage: "Approval", value: 95 },
      { stage: "Disbursement", value: 93 }, { stage: "Grievance", value: 4 }, { stage: "Closure", value: 96 },
    ],
  },

  /* ──────────────── 2. ₹1,000 MONTHLY SUPPORT — COLLEGE GIRLS ──────────────── */
  {
    id: "IG-2", slug: "girl-student-support", short: "₹1,000 Girl Students",
    title: "₹1,000 Monthly Support for College Girl Students", subtitle: "2-Year Impact Dashboard",
    ribbon: "Indira Guarantee", updated: "14 May 2028",
    theme: "var(--color-c-blue)",
    hero: "linear-gradient(120deg,#1f3aa8 0%,#2f7df6 50%,#5aa0ff 100%)",
    owner: "Education Secretary", source: "Higher Education Portal · e-Grantz", rag: "green", score: 88,
    target: "₹1,000/month to every eligible college girl",
    achieved: "8.6 Lakh beneficiaries · 1,482 colleges",
    beneficiaries: "7.2 Lakh active", allocated: "₹2,040 Cr", released: "₹1,860 Cr",
    pending: "9,400 applications", grievances: 410, districtsOnTrack: 13, districtsAtRisk: 1,
    metricUnit: "Beneficiaries ('000)",
    kpis: [
      { label: "Total Beneficiaries", value: "8.6 Lakh", delta: "↑ 31% vs Year 1", icon: "Users", color: "var(--color-c-violet)" },
      { label: "Monthly Active Students", value: "7.2 Lakh", delta: "↑ 18% vs Year 1", icon: "UserCheck", color: "var(--color-c-blue)" },
      { label: "Total Amount Disbursed", value: "₹1,860 Cr", sub: "across 24 months", icon: "IndianRupee", color: "var(--color-c-green)" },
      { label: "District Coverage", value: "14 / 14", sub: "100% of Kerala", icon: "MapPin", color: "var(--color-c-orange)" },
      { label: "Colleges Covered", value: "1,482", sub: "Govt, Aided & Private", icon: "School", color: "var(--color-c-teal)" },
      { label: "Continuation Rate", value: "94%", sub: "students continuing studies", icon: "Smile", color: "var(--color-c-pink)" },
    ],
    glance: [
      { step: "Eligibility", desc: "Girl students in colleges across Kerala", icon: "UserCheck" },
      { step: "Registration", desc: "College + digital portal, verified enrolment", icon: "ClipboardCheck" },
      { step: "Direct Benefit Transfer", desc: "₹1,000 every month to bank account", icon: "Landmark" },
      { step: "Academic Support", desc: "Attendance & continuity, education costs", icon: "BookOpen" },
      { step: "Outcome", desc: "Retention, access & empowerment", icon: "Trophy" },
    ],
    pillars: [
      { title: "Access", desc: "Supports higher education", icon: "BookOpen", color: "var(--color-c-violet)" },
      { title: "Affordability", desc: "Reduces family burden", icon: "Users", color: "var(--color-c-blue)" },
      { title: "Continuity", desc: "Lowers dropout risk", icon: "TrendingUp", color: "var(--color-c-green)" },
      { title: "Empowerment", desc: "Builds confidence & careers", icon: "Sparkles", color: "var(--color-c-pink)" },
    ],
    districtTable: D([
      ["Thiruvananthapuram", 82], ["Kollam", 64], ["Pathanamthitta", 26], ["Alappuzha", 39],
      ["Kottayam", 34], ["Idukki", 19], ["Ernakulam", 88], ["Thrissur", 73], ["Palakkad", 49],
      ["Malappuram", 96], ["Kozhikode", 71], ["Wayanad", 15], ["Kannur", 45], ["Kasaragod", 29],
    ]),
    trendBeneficiaries: mkTrend(2.0, 7.5),
    fundTrend: mkTrend(15, 90),
    pendingTrend: mkTrendDown(28000, 9400),
    grievanceTrend: mkTrendDown(980, 410),
    purposeSplit: [
      { label: "Arts & Humanities", value: 24, color: "var(--color-c-violet)" },
      { label: "Science", value: 21, color: "var(--color-c-green)" },
      { label: "Commerce", value: 18, color: "var(--color-c-pink)" },
      { label: "Engineering/Tech", value: 16, color: "var(--color-c-orange)" },
      { label: "Nursing & Allied Health", value: 13, color: "var(--color-c-teal)" },
      { label: "Other", value: 8, color: "#9bb0d6" },
    ],
    topDistricts: [
      { label: "Malappuram", value: 96 }, { label: "Ernakulam", value: 88 }, { label: "Thiruvananthapuram", value: 82 },
      { label: "Thrissur", value: 73 }, { label: "Kozhikode", value: 71 },
    ],
    categorySplit: [
      { label: "Government", value: 29, color: "var(--color-c-green)" },
      { label: "Aided", value: 41, color: "var(--color-c-blue)" },
      { label: "Private", value: 30, color: "var(--color-c-orange)" },
    ],
    segments: [
      { label: "UG Students", value: 61, color: "var(--color-c-blue)" },
      { label: "PG Students", value: 18, color: "var(--color-c-green)" },
      { label: "Professional Courses", value: 13, color: "var(--color-c-orange)" },
      { label: "Diploma", value: 5, color: "var(--color-c-violet)" },
      { label: "Research/Other", value: 3, color: "#9bb0d6" },
    ],
    avgSupport: { value: "₹24,000", label: "Over 24 Months", sub: "Average Annual ₹12,000" },
    cumulative: {
      value: "₹1,860 Cr", label: "Direct educational support to households",
      points: [
        { label: "Reduced education expenses", desc: "", icon: "Wallet" },
        { label: "Better continuity in college", desc: "", icon: "BookOpen" },
        { label: "Improved access to books, travel & digital tools", desc: "", icon: "Laptop" },
        { label: "Greater confidence for first-generation learners", desc: "", icon: "Sparkles" },
      ],
    },
    outcomes: [
      { label: "Reduced dropout rates", icon: "TrendingDown", color: "var(--color-c-violet)" },
      { label: "Higher college attendance", icon: "ClipboardCheck", color: "var(--color-c-blue)" },
      { label: "Improved transition to higher studies", icon: "GraduationCap", color: "var(--color-c-green)" },
      { label: "Support for low-income families", icon: "Users", color: "var(--color-c-orange)" },
      { label: "Greater female participation in higher education", icon: "Sparkles", color: "var(--color-c-pink)" },
    ],
    operational: [
      { label: "Colleges Onboarded", value: "1,482", icon: "School" },
      { label: "DBT Success Rate", value: "98.7%", icon: "Landmark" },
      { label: "Grievances Resolved", value: "95%", icon: "Headphones" },
      { label: "Average Approval Time", value: "5 Days", icon: "Clock" },
    ],
    nextFocus: [
      { title: "Support hostel & travel-linked needs", desc: "Improve access for rural and remote students", icon: "Bus" },
      { title: "Link scholarship with mentoring", desc: "Career guidance, internships & employability", icon: "Users" },
      { title: "Boost digital inclusion", desc: "Devices, connectivity and learning resources", icon: "Laptop" },
    ],
    journey: [
      { stage: "Application", value: 100 }, { stage: "Verification", value: 95 }, { stage: "Approval", value: 92 },
      { stage: "Disbursement", value: 88 }, { stage: "Grievance", value: 5 }, { stage: "Closure", value: 94 },
    ],
  },

  /* ──────────────────────── 3. ₹3,000 WELFARE PENSION ──────────────────────── */
  {
    id: "IG-3", slug: "welfare-pension", short: "₹3,000 Pension",
    title: "Welfare Pension Increased to ₹3,000", subtitle: "2-Year Impact Dashboard",
    ribbon: "Indira Guarantee", updated: "14 May 2028",
    theme: "var(--color-c-orange)",
    hero: "linear-gradient(120deg,#1b2a78 0%,#3b4ec0 50%,#6b7be0 100%)",
    owner: "LSG Secretary", source: "K-SMART · Suneethi Portal", rag: "green", score: 90,
    target: "₹3,000/month to every eligible beneficiary",
    achieved: "46.8 Lakh active · ₹33,420 Cr disbursed",
    beneficiaries: "46.8 Lakh", allocated: "₹34,800 Cr", released: "₹33,420 Cr",
    pending: "2,340 records", grievances: 520, districtsOnTrack: 13, districtsAtRisk: 1,
    metricUnit: "Beneficiaries (Lakh)",
    kpis: [
      { label: "Active Beneficiaries", value: "46.8 Lakh", delta: "↑ 3.8% vs Year 1", icon: "Users", color: "var(--color-c-violet)" },
      { label: "Monthly Pension", value: "₹3,000", sub: "per eligible beneficiary", icon: "IndianRupee", color: "var(--color-c-blue)" },
      { label: "Total Disbursed", value: "₹33,420 Cr", sub: "across 24 months", icon: "Coins", color: "var(--color-c-green)" },
      { label: "District Coverage", value: "14 / 14", sub: "100% of Kerala", icon: "MapPin", color: "var(--color-c-orange)" },
      { label: "DBT Success Rate", value: "98.9%", sub: "direct credit to accounts", icon: "Landmark", color: "var(--color-c-teal)" },
      { label: "On-time Payment", value: "96%", sub: "monthly cycle completed", icon: "Clock", color: "var(--color-c-pink)" },
    ],
    glance: [
      { step: "Eligibility", desc: "Old age, widow, disability, agri labour, unmarried women 50+", icon: "UserCheck" },
      { step: "Verification", desc: "Local body + digital records, Aadhaar & bank validation", icon: "ClipboardCheck" },
      { step: "Monthly Pension", desc: "₹3,000 credited via Direct Benefit Transfer", icon: "Landmark" },
      { step: "Household Relief", desc: "Food, medicine & daily needs", icon: "Home" },
      { step: "Outcome", desc: "Dignity, inclusion & social security", icon: "HeartHandshake" },
    ],
    pillars: [
      { title: "Dignity", desc: "Stable support for vulnerable citizens", icon: "HeartHandshake", color: "var(--color-c-violet)" },
      { title: "Health", desc: "Better access to medicines and care", icon: "HeartPulse", color: "var(--color-c-green)" },
      { title: "Food Security", desc: "Supports household essentials", icon: "Wheat", color: "var(--color-c-orange)" },
      { title: "Independence", desc: "More financial autonomy", icon: "Sparkles", color: "var(--color-c-blue)" },
    ],
    districtTable: D([
      ["Thiruvananthapuram", 4.3], ["Kollam", 3.9], ["Pathanamthitta", 1.8], ["Alappuzha", 3.1],
      ["Kottayam", 2.5], ["Idukki", 1.4], ["Ernakulam", 4.5], ["Thrissur", 4.2], ["Palakkad", 3.6],
      ["Malappuram", 5.1], ["Kozhikode", 3.8], ["Wayanad", 1.1], ["Kannur", 3.0], ["Kasaragod", 2.5],
    ]),
    trendBeneficiaries: mkTrend(44, 46.8),
    fundTrend: mkTrend(900, 1450),
    pendingTrend: mkTrendDown(8800, 2340),
    grievanceTrend: mkTrendDown(1400, 520),
    purposeSplit: [
      { label: "Old Age", value: 57, color: "var(--color-c-blue)" },
      { label: "Widow", value: 26, color: "var(--color-c-green)" },
      { label: "Disability", value: 8, color: "var(--color-c-orange)" },
      { label: "Agricultural Labour", value: 7, color: "var(--color-c-violet)" },
      { label: "Unmarried Women 50+", value: 2, color: "var(--color-c-pink)" },
    ],
    topDistricts: [
      { label: "Malappuram", value: 5.1 }, { label: "Ernakulam", value: 4.5 }, { label: "Thiruvananthapuram", value: 4.3 },
      { label: "Thrissur", value: 4.2 }, { label: "Kollam", value: 3.9 },
    ],
    categorySplit: [
      { label: "Bank DBT", value: 82, color: "var(--color-c-blue)" },
      { label: "Co-operative Bank", value: 11, color: "var(--color-c-green)" },
      { label: "Doorstep / Assisted", value: 5, color: "var(--color-c-orange)" },
      { label: "Other", value: 2, color: "var(--color-c-violet)" },
    ],
    segments: [
      { label: "60–69 years", value: 31, color: "var(--color-c-violet)" },
      { label: "70–79 years", value: 39, color: "var(--color-c-green)" },
      { label: "80+ years", value: 18, color: "var(--color-c-blue)" },
      { label: "Other eligible groups", value: 12, color: "var(--color-c-orange)" },
    ],
    avgSupport: { value: "₹36,000", label: "Average Annual Support", sub: "₹3,000 × 12 months" },
    cumulative: {
      value: "₹33,420 Cr", label: "Direct social security support to vulnerable households",
      points: [
        { label: "Reduced dependency on informal debt", desc: "", icon: "Wallet" },
        { label: "Improved medicine and food security", desc: "", icon: "HeartPulse" },
        { label: "Support for lonely and elderly citizens", desc: "", icon: "Users" },
        { label: "Strengthened local economy", desc: "", icon: "TrendingUp" },
      ],
    },
    outcomes: [
      { label: "Improved dignity for elderly citizens", icon: "HeartHandshake", color: "var(--color-c-violet)" },
      { label: "Reduced distress among widows and single women", icon: "Users", color: "var(--color-c-pink)" },
      { label: "Better support for persons with disabilities", icon: "Accessibility", color: "var(--color-c-blue)" },
      { label: "Relief for agricultural labour households", icon: "Wheat", color: "var(--color-c-green)" },
      { label: "Stronger social protection coverage", icon: "ShieldCheck", color: "var(--color-c-orange)" },
    ],
    operational: [
      { label: "Applications Verified", value: "2.4 Lakh", icon: "ClipboardCheck" },
      { label: "Bank Accounts Validated", value: "99.1%", icon: "Landmark" },
      { label: "Grievances Resolved", value: "94%", icon: "Headphones" },
      { label: "Average Release Time", value: "3 Days", icon: "Clock" },
    ],
    nextFocus: [
      { title: "Clean beneficiary registry", desc: "Remove duplicates and speed up approvals", icon: "ClipboardCheck" },
      { title: "Expand doorstep support", desc: "Help bed-ridden and 80+ beneficiaries", icon: "Home" },
      { title: "Predictive arrear alerts", desc: "Flag pending payments before delay", icon: "BellRing" },
    ],
    journey: [
      { stage: "Application", value: 100 }, { stage: "Verification", value: 99 }, { stage: "Approval", value: 98 },
      { stage: "Disbursement", value: 96 }, { stage: "Grievance", value: 3 }, { stage: "Closure", value: 97 },
    ],
  },

  /* ─────────────── 4. ₹25 LAKH FAMILY HEALTH INSURANCE ─────────────── */
  {
    id: "IG-4", slug: "family-health-insurance", short: "₹25L Health Insurance",
    title: "₹25 Lakh Family Health Insurance", subtitle: "Oommen Chandy Aarogya Insurance Scheme · 2-Year Impact Dashboard",
    ribbon: "Indira Guarantee", updated: "14 May 2028",
    theme: "var(--color-c-teal)",
    hero: "linear-gradient(120deg,#0e5a86 0%,#149aa6 50%,#34c0c8 100%)",
    owner: "Health Secretary", source: "KASP / SDHM", rag: "green", score: 94,
    target: "₹25 Lakh cashless cover per family per year",
    achieved: "92.4 Lakh families · ₹8,740 Cr treatment value",
    beneficiaries: "92.4 Lakh families", allocated: "₹9,200 Cr", released: "₹8,740 Cr",
    pending: "6,800 cards", grievances: 380, districtsOnTrack: 13, districtsAtRisk: 1,
    metricUnit: "Insured Families (Lakh)",
    kpis: [
      { label: "Families Enrolled", value: "92.4 Lakh", delta: "↑ 12% vs Year 1", icon: "Users", color: "var(--color-c-violet)" },
      { label: "Annual Coverage", value: "₹25 Lakh", sub: "per family per year", icon: "ShieldPlus", color: "var(--color-c-blue)" },
      { label: "Total Treatment Value", value: "₹8,740 Cr", sub: "across 24 months", icon: "Building2", color: "var(--color-c-green)" },
      { label: "District Coverage", value: "14 / 14", sub: "100% of Kerala", icon: "MapPin", color: "var(--color-c-orange)" },
      { label: "Empanelled Hospitals", value: "1,286", sub: "Govt & Private network", icon: "Hospital", color: "var(--color-c-teal)" },
      { label: "Cashless Success Rate", value: "97.6%", sub: "approved eligible treatments", icon: "Smile", color: "var(--color-c-pink)" },
    ],
    glance: [
      { step: "Eligibility", desc: "All Kerala families — universal protection", icon: "UserCheck" },
      { step: "Registration", desc: "Digital enrolment & health ID verified", icon: "ClipboardCheck" },
      { step: "Cashless Treatment", desc: "Use at empanelled hospitals, no upfront burden", icon: "Hospital" },
      { step: "Claim Settlement", desc: "Hospital claim processed, seamless digital approval", icon: "FileCheck" },
      { step: "Outcome", desc: "Health security & financial protection", icon: "HeartHandshake" },
    ],
    pillars: [
      { title: "Access", desc: "Affordable hospitalization", icon: "Hospital", color: "var(--color-c-violet)" },
      { title: "Protection", desc: "Reduces out-of-pocket spending", icon: "ShieldCheck", color: "var(--color-c-green)" },
      { title: "Emergency Care", desc: "Life-saving treatment support", icon: "HeartPulse", color: "var(--color-c-orange)" },
      { title: "Equity", desc: "Better care for vulnerable families", icon: "Users", color: "var(--color-c-blue)" },
    ],
    districtTable: D([
      ["Thiruvananthapuram", 7.1], ["Kollam", 6.0], ["Pathanamthitta", 2.2], ["Alappuzha", 3.8],
      ["Kottayam", 3.1], ["Idukki", 1.7], ["Ernakulam", 8.0], ["Thrissur", 7.3], ["Palakkad", 5.2],
      ["Malappuram", 9.1], ["Kozhikode", 6.4], ["Wayanad", 1.5], ["Kannur", 4.3], ["Kasaragod", 3.7],
    ]),
    trendBeneficiaries: mkTrend(70, 92.4),
    fundTrend: mkTrend(50, 250),
    pendingTrend: mkTrendDown(22000, 6800),
    grievanceTrend: mkTrendDown(900, 380),
    purposeSplit: [
      { label: "General Surgery", value: 20, color: "var(--color-c-orange)" },
      { label: "Cardiac", value: 18, color: "var(--color-c-blue)" },
      { label: "Emergency Trauma", value: 16, color: "var(--color-rag-red)" },
      { label: "Oncology", value: 14, color: "var(--color-c-violet)" },
      { label: "Maternal & Child", value: 12, color: "var(--color-c-green)" },
      { label: "Dialysis & Chronic Care", value: 10, color: "var(--color-c-teal)" },
      { label: "Other", value: 10, color: "#9bb0d6" },
    ],
    topDistricts: [
      { label: "Malappuram", value: 2.8 }, { label: "Ernakulam", value: 2.5 }, { label: "Thrissur", value: 2.3 },
      { label: "Thiruvananthapuram", value: 2.2 }, { label: "Kozhikode", value: 2.0 },
    ],
    categorySplit: [
      { label: "Government", value: 44, color: "var(--color-c-green)" },
      { label: "Private", value: 46, color: "var(--color-c-blue)" },
      { label: "Mission / Charitable", value: 10, color: "var(--color-c-orange)" },
    ],
    segments: [
      { label: "Women", value: 36, color: "var(--color-c-violet)" },
      { label: "Men", value: 31, color: "var(--color-c-blue)" },
      { label: "Children", value: 21, color: "var(--color-c-green)" },
      { label: "Senior Citizens", value: 12, color: "var(--color-c-orange)" },
    ],
    avgSupport: { value: "₹94,600", label: "Average per approved high-value case", sub: "24.8 Lakh claims processed" },
    cumulative: {
      value: "₹8,740 Cr", label: "Cashless treatment support to Kerala families",
      points: [
        { label: "Reduced catastrophic medical debt", desc: "", icon: "ShieldCheck" },
        { label: "Faster access to quality hospitals", desc: "", icon: "Hospital" },
        { label: "Improved maternal and emergency care", desc: "", icon: "HeartPulse" },
        { label: "Greater trust in public welfare", desc: "", icon: "Users" },
      ],
    },
    outcomes: [
      { label: "Reduced out-of-pocket health expenditure", icon: "Wallet", color: "var(--color-c-violet)" },
      { label: "Higher access to quality hospitalization", icon: "Hospital", color: "var(--color-c-blue)" },
      { label: "Stronger protection for low-income families", icon: "ShieldCheck", color: "var(--color-c-green)" },
      { label: "Better continuity of treatment for chronic illness", icon: "HeartPulse", color: "var(--color-c-orange)" },
      { label: "Improved health equity across districts", icon: "Scale", color: "var(--color-c-pink)" },
    ],
    operational: [
      { label: "Pre-authorisations Approved", value: "91%", icon: "FileCheck" },
      { label: "Hospitals Audited", value: "1,286", icon: "Hospital" },
      { label: "Grievances Resolved", value: "95%", icon: "Headphones" },
      { label: "Average Claim Clearance", value: "6 Days", icon: "Clock" },
    ],
    nextFocus: [
      { title: "Strengthen fraud analytics", desc: "Detect abnormal claims and improve transparency", icon: "Search" },
      { title: "Expand tertiary care access", desc: "Wider specialist hospital network", icon: "Hospital" },
      { title: "Improve family awareness", desc: "Health card usage, claim support & helplines", icon: "Megaphone" },
    ],
    journey: [
      { stage: "Application", value: 100 }, { stage: "Verification", value: 97 }, { stage: "Approval", value: 95 },
      { stage: "Disbursement", value: 92 }, { stage: "Grievance", value: 4 }, { stage: "Closure", value: 96 },
    ],
  },

  /* ───────────── 5. ₹5 LAKH INTEREST-FREE YOUTH ENTREPRENEUR LOAN ───────────── */
  {
    id: "IG-5", slug: "youth-entrepreneur-loan", short: "₹5L Youth Loan",
    title: "₹5 Lakh Interest-Free Youth Entrepreneur Loan", subtitle: "2-Year Impact Dashboard",
    ribbon: "Indira Guarantee", updated: "14 May 2028",
    theme: "var(--color-c-green)",
    hero: "linear-gradient(120deg,#15324a 0%,#1f5fb0 50%,#2f8fe0 100%)",
    owner: "Industries Secretary", source: "KSIDC Portal", rag: "amber", score: 76,
    target: "₹5 Lakh interest-free loan to youth ventures",
    achieved: "1.89 Lakh approved · 1.56 Lakh enterprises",
    beneficiaries: "1.89 Lakh", allocated: "₹7,600 Cr", released: "₹6,920 Cr",
    pending: "21,400 applications", grievances: 640, districtsOnTrack: 10, districtsAtRisk: 4,
    metricUnit: "Approved Beneficiaries ('000)",
    kpis: [
      { label: "Approved Beneficiaries", value: "1.89 Lakh", delta: "↑ 22% vs Year 1", icon: "Users", color: "var(--color-c-violet)" },
      { label: "Interest-Free Support", value: "₹5 Lakh", sub: "max support per beneficiary", icon: "ShieldCheck", color: "var(--color-c-blue)" },
      { label: "Total Loan Sanctioned", value: "₹6,920 Cr", sub: "across 24 months", icon: "Landmark", color: "var(--color-c-green)" },
      { label: "District Coverage", value: "14 / 14", sub: "100% of Kerala", icon: "MapPin", color: "var(--color-c-orange)" },
      { label: "Enterprises Launched", value: "1.56 Lakh", sub: "new ventures operational", icon: "Store", color: "var(--color-c-teal)" },
      { label: "Jobs Generated", value: "4.8 Lakh", sub: "direct & indirect", icon: "Briefcase", color: "var(--color-c-pink)" },
    ],
    glance: [
      { step: "Eligibility", desc: "Kerala youth with business ideas — self-employment & startup aspirants", icon: "Lightbulb" },
      { step: "Application", desc: "Digital registration + proposal, documents & business plan", icon: "ClipboardCheck" },
      { step: "Verification", desc: "Bank & department review, viability & eligibility checked", icon: "Search" },
      { step: "Sanction", desc: "Interest-free loan up to ₹5 lakh, fast approval and release", icon: "Landmark" },
      { step: "Outcome", desc: "New enterprise, jobs and income — stronger local economy", icon: "Rocket" },
    ],
    pillars: [
      { title: "Innovation", desc: "Encourages new ideas and enterprise", icon: "Lightbulb", color: "var(--color-c-violet)" },
      { title: "Jobs", desc: "Creates employment close to home", icon: "Users", color: "var(--color-c-blue)" },
      { title: "Inclusion", desc: "Supports women and first-generation entrepreneurs", icon: "HeartHandshake", color: "var(--color-c-pink)" },
      { title: "Growth", desc: "Builds resilient local businesses", icon: "TrendingUp", color: "var(--color-c-orange)" },
    ],
    districtTable: D([
      ["Thiruvananthapuram", 17.8], ["Kollam", 15.4], ["Pathanamthitta", 6.9], ["Alappuzha", 9.5],
      ["Kottayam", 8.8], ["Idukki", 5.2], ["Ernakulam", 23.2], ["Thrissur", 18.7], ["Palakkad", 13.4],
      ["Malappuram", 27.8], ["Kozhikode", 16.6], ["Wayanad", 4.4], ["Kannur", 12.8], ["Kasaragod", 8.5],
    ]),
    trendBeneficiaries: mkTrend(0.4, 1.89),
    fundTrend: mkTrend(60, 480),
    pendingTrend: mkTrendDown(46000, 21400),
    grievanceTrend: mkTrendDown(1100, 640),
    purposeSplit: [
      { label: "Retail & Trade", value: 28, color: "var(--color-c-blue)" },
      { label: "Food & Hospitality", value: 19, color: "var(--color-c-green)" },
      { label: "Services", value: 18, color: "var(--color-c-orange)" },
      { label: "Manufacturing", value: 14, color: "var(--color-c-violet)" },
      { label: "Tech & Digital", value: 11, color: "var(--color-c-teal)" },
      { label: "Agriculture & Allied", value: 10, color: "var(--color-c-pink)" },
    ],
    topDistricts: [
      { label: "Malappuram", value: 27.8 }, { label: "Ernakulam", value: 23.6 }, { label: "Thrissur", value: 18.7 },
      { label: "Thiruvananthapuram", value: 17.8 }, { label: "Kozhikode", value: 16.6 },
    ],
    categorySplit: [
      { label: "Micro Enterprise", value: 46, color: "var(--color-c-violet)" },
      { label: "Self-employment", value: 24, color: "var(--color-c-blue)" },
      { label: "Startup / Innovation", value: 14, color: "var(--color-c-green)" },
      { label: "Home-based Enterprise", value: 10, color: "var(--color-c-orange)" },
      { label: "Other", value: 6, color: "#9bb0d6" },
    ],
    segments: [
      { label: "Men", value: 52, color: "var(--color-c-violet)" },
      { label: "Women", value: 41, color: "var(--color-c-blue)" },
      { label: "Collective / Other", value: 7, color: "var(--color-c-green)" },
    ],
    avgSupport: { value: "₹3.66 Lakh", label: "Average approved assistance", sub: "Many first-time entrepreneurs" },
    cumulative: {
      value: "₹6,920 Cr", label: "Capital support for youth-led businesses across Kerala",
      points: [
        { label: "Reduced entry barriers for first-time businesses", desc: "", icon: "DoorOpen" },
        { label: "Higher youth self-employment", desc: "", icon: "Users" },
        { label: "More jobs in local communities", desc: "", icon: "Store" },
        { label: "Boost to Kerala's micro-enterprise economy", desc: "", icon: "TrendingUp" },
      ],
    },
    outcomes: [
      { label: "Higher youth self-employment", icon: "TrendingUp", color: "var(--color-c-violet)" },
      { label: "Stronger women-led enterprise participation", icon: "Users", color: "var(--color-c-blue)" },
      { label: "Growth of district-level small businesses", icon: "Store", color: "var(--color-c-green)" },
      { label: "Reduced migration pressure through local opportunities", icon: "MapPin", color: "var(--color-c-orange)" },
      { label: "More innovation and startup culture", icon: "Lightbulb", color: "var(--color-c-pink)" },
    ],
    operational: [
      { label: "Applications Processed", value: "2.8 Lakh", icon: "ClipboardCheck" },
      { label: "Approval Rate", value: "72%", icon: "CheckCircle" },
      { label: "Repayment / Active Accounts", value: "93%", icon: "Wallet" },
      { label: "Average Approval Time", value: "8 Days", icon: "Clock" },
    ],
    nextFocus: [
      { title: "Mentorship & market linkages", desc: "Support business growth beyond loan sanction", icon: "HeartHandshake" },
      { title: "Strengthen incubation and skilling", desc: "Improve survival of early-stage ventures", icon: "GraduationCap" },
      { title: "Digital commerce & export support", desc: "Help youth businesses reach larger markets", icon: "Globe" },
    ],
    journey: [
      { stage: "Application", value: 100 }, { stage: "Verification", value: 84 }, { stage: "Approval", value: 72 },
      { stage: "Disbursement", value: 67 }, { stage: "Grievance", value: 7 }, { stage: "Closure", value: 88 },
    ],
  },

  /* ──────────────────── 6. DEPARTMENT FOR ELDERLY WELFARE ──────────────────── */
  {
    id: "IG-6", slug: "elderly-welfare", short: "Elderly Welfare Dept",
    title: "Department for Elderly Welfare", subtitle: "2-Year Impact Dashboard",
    ribbon: "Indira Guarantee", updated: "14 May 2028",
    theme: "var(--color-c-pink)",
    hero: "linear-gradient(120deg,#2a1d54 0%,#6a4db0 50%,#9b7bd4 100%)",
    owner: "LSG Secretary", source: "K-SMART · Suneethi Portal", rag: "amber", score: 84,
    target: "Statewide elderly care department & services",
    achieved: "38.6 Lakh seniors · 1,124 care centres",
    beneficiaries: "38.6 Lakh", allocated: "₹5,200 Cr", released: "₹4,860 Cr",
    pending: "4,100 registrations", grievances: 290, districtsOnTrack: 12, districtsAtRisk: 2,
    metricUnit: "Senior Citizens Served (Lakh)",
    kpis: [
      { label: "Registered Senior Citizens", value: "38.6 Lakh", delta: "↑ 9% vs Year 1", icon: "Users", color: "var(--color-c-violet)" },
      { label: "District Coverage", value: "14 / 14", sub: "100% of Kerala", icon: "MapPin", color: "var(--color-c-blue)" },
      { label: "Home Care Visits", value: "82.5 Lakh", sub: "across 24 months", icon: "Home", color: "var(--color-c-green)" },
      { label: "Care Centres Supported", value: "1,124", sub: "day care, activity & support", icon: "Building2", color: "var(--color-c-orange)" },
      { label: "Total Welfare Support", value: "₹4,860 Cr", sub: "across 24 months", icon: "IndianRupee", color: "var(--color-c-teal)" },
      { label: "Citizen Satisfaction", value: "92%", sub: "based on feedback score", icon: "Smile", color: "var(--color-c-pink)" },
    ],
    glance: [
      { step: "Identification", desc: "Senior citizens mapped, priority & vulnerability profiling", icon: "Search" },
      { step: "Registration", desc: "Digital + local body enrolment, care needs recorded", icon: "ClipboardCheck" },
      { step: "Service Delivery", desc: "Home care, helpline, day care — access to welfare services", icon: "HeartHandshake" },
      { step: "Health & Support", desc: "Screening, medicines, counselling, emergency care", icon: "HeartPulse" },
      { step: "Outcome", desc: "Dignity, safety & active ageing — better quality of life", icon: "Sparkles" },
    ],
    pillars: [
      { title: "Dignity", desc: "Respectful support for elderly citizens", icon: "HeartHandshake", color: "var(--color-c-violet)" },
      { title: "Health", desc: "Regular care and preventive support", icon: "HeartPulse", color: "var(--color-c-green)" },
      { title: "Safety", desc: "Emergency response and assisted services", icon: "ShieldCheck", color: "var(--color-c-orange)" },
      { title: "Inclusion", desc: "Reduced loneliness and social isolation", icon: "Users", color: "var(--color-c-blue)" },
    ],
    districtTable: D([
      ["Thiruvananthapuram", 3.8], ["Kollam", 3.2], ["Pathanamthitta", 3.7], ["Alappuzha", 2.6],
      ["Kottayam", 2.4], ["Idukki", 2.2], ["Ernakulam", 4.0], ["Thrissur", 3.8], ["Palakkad", 2.8],
      ["Malappuram", 4.1], ["Kozhikode", 3.1], ["Wayanad", 0.9], ["Kannur", 2.4], ["Kasaragod", 1.9],
    ]),
    trendBeneficiaries: mkTrend(35, 38.6),
    fundTrend: mkTrend(120, 230),
    pendingTrend: mkTrendDown(12000, 4100),
    grievanceTrend: mkTrendDown(720, 290),
    purposeSplit: [
      { label: "Home Care", value: 24, color: "var(--color-c-violet)" },
      { label: "Health Screening", value: 22, color: "var(--color-c-blue)" },
      { label: "Day Care & Activity", value: 16, color: "var(--color-c-green)" },
      { label: "Assistive Support", value: 12, color: "var(--color-c-orange)" },
      { label: "Emergency Response", value: 10, color: "var(--color-rag-red)" },
      { label: "Counselling & Helpline", value: 8, color: "var(--color-c-teal)" },
      { label: "Other", value: 8, color: "#9bb0d6" },
    ],
    topDistricts: [
      { label: "Malappuram", value: 4.1 }, { label: "Ernakulam", value: 4.0 }, { label: "Thiruvananthapuram", value: 3.8 },
      { label: "Thrissur", value: 3.8 }, { label: "Kollam", value: 3.2 },
    ],
    categorySplit: [
      { label: "Home-based Services", value: 38, color: "var(--color-c-violet)" },
      { label: "Welfare Centres", value: 24, color: "var(--color-c-blue)" },
      { label: "Health Camps", value: 18, color: "var(--color-c-green)" },
      { label: "Helpline & Outreach", value: 12, color: "var(--color-c-orange)" },
      { label: "Other", value: 8, color: "#9bb0d6" },
    ],
    segments: [
      { label: "Women", value: 56, color: "var(--color-c-violet)" },
      { label: "Men", value: 42, color: "var(--color-c-blue)" },
      { label: "Others", value: 2, color: "var(--color-c-green)" },
    ],
    avgSupport: { value: "₹12,600", label: "Care, service, and direct support value", sub: "Many elderly women living alone" },
    cumulative: {
      value: "₹4,860 Cr", label: "Integrated care and welfare support to Kerala's senior citizens",
      points: [
        { label: "Reduced loneliness and neglect", desc: "", icon: "Users" },
        { label: "Improved access to health and medicines", desc: "", icon: "HeartPulse" },
        { label: "Better social security for vulnerable elders", desc: "", icon: "ShieldCheck" },
        { label: "Stronger local care ecosystem", desc: "", icon: "Home" },
      ],
    },
    outcomes: [
      { label: "Improved dignity and active ageing", icon: "Sparkles", color: "var(--color-c-violet)" },
      { label: "Better home-based care access", icon: "Home", color: "var(--color-c-blue)" },
      { label: "Stronger support for elders living alone", icon: "Users", color: "var(--color-c-green)" },
      { label: "More community participation and care", icon: "HeartHandshake", color: "var(--color-c-orange)" },
      { label: "Better health monitoring and preventive support", icon: "HeartPulse", color: "var(--color-c-pink)" },
    ],
    operational: [
      { label: "Helpline Calls Assisted", value: "18.4 Lakh", icon: "Phone" },
      { label: "Health Camps Conducted", value: "9,860", icon: "Stethoscope" },
      { label: "Grievances Resolved", value: "95%", icon: "ShieldCheck" },
      { label: "Average Response Time", value: "36 Min", icon: "Clock" },
    ],
    nextFocus: [
      { title: "Expand dementia & palliative support", desc: "Stronger community care for high-need elders", icon: "HeartPulse" },
      { title: "Scale doorstep digital assistance", desc: "Help elders access pensions, records, and services", icon: "Smartphone" },
      { title: "Strengthen neighbourhood senior clubs", desc: "Promote active ageing, socialisation and care", icon: "Users" },
    ],
    journey: [
      { stage: "Application", value: 100 }, { stage: "Verification", value: 94 }, { stage: "Approval", value: 90 },
      { stage: "Disbursement", value: 86 }, { stage: "Grievance", value: 4 }, { stage: "Closure", value: 93 },
    ],
  },
];

function mkTrend(start: number, end: number) {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  return months.map((m, i) => {
    const t = i / (months.length - 1);
    const wobble = Math.sin(i * 1.3) * (end - start) * 0.015;
    return { label: m, value: +(start + (end - start) * Math.pow(t, 0.92) + wobble).toFixed(2) };
  });
}
function mkTrendDown(start: number, end: number) {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  return months.map((m, i) => {
    const t = i / (months.length - 1);
    return { label: m, value: Math.round(start + (end - start) * Math.pow(t, 0.8)) };
  });
}

export const guaranteeBySlug = (slug: string) => guarantees.find((g) => g.slug === slug);

export const indiraSummary = {
  score: 81,
  commitment: "₹16,996 Cr/yr",
  beneficiaries: "2.6 Cr",
  released: "₹58,940 Cr",
  pending: "44,040",
  onTrack: 12,
  atRisk: 2,
  criticalGaps: 5,
};
