import type { DepartmentDashboardData, DepartmentSource } from "@/components/DepartmentDashboard";

const checkedAt = "27 Nov 2026";
const civilSupplies = "Kerala Department of Food, Civil Supplies and Consumer Affairs";

const monthlySource = {
  source: civilSupplies,
  dataset: "AePDS · Statewide PDS transactions",
  url: "https://epos.kerala.gov.in/",
  sourceUpdatedAt: "27 Nov 2026, 09:20:01 IST",
  fetchedAt: checkedAt,
  period: "November 2026, month in progress",
  basis: "AePDS counts ration cards, availed cards and transaction events separately. A card can generate multiple transactions.",
} satisfies DepartmentSource;

const dailySource = {
  source: civilSupplies,
  dataset: "AePDS · Date-wise ration distribution, district report",
  url: "https://epos.kerala.gov.in/Day_Wise_Sale_Int.jsp",
  fetchedAt: checkedAt,
  period: "26 Nov 2026",
  basis: "Select 26 November 2026 in the source report. Counts are cards marked availed on that date, across the four schemes listed.",
} satisfies DepartmentSource;

const ekycSource = {
  source: civilSupplies,
  dataset: "AePDS · District eKYC details",
  url: "https://epos.kerala.gov.in/eKYC_Dist.jsp",
  sourceUpdatedAt: "27 Nov 2026, 08:06:34 IST",
  fetchedAt: checkedAt,
  period: "November 2026 registers for AAY and PHH beneficiaries",
  basis: "Counts individuals listed in Antyodaya Anna Yojana (AAY) and Priority Household (PHH) records. Pending equals total beneficiaries minus those with an eKYC update.",
} satisfies DepartmentSource;

const annualGrainsSource = {
  source: "Kerala State Planning Board · Civil Supplies and Consumer Affairs Department",
  dataset: "Economic Review 2025 · Appendix 3.8.2",
  url: "https://spb.kerala.gov.in/sites/default/files/2026-01/ER%202025%20Volume%202%20Eng%20final.pdf#page=156",
  sourceUpdatedAt: "4 Feb 2026 (release notice)",
  fetchedAt: checkedAt,
  period: "FY 2020–21 to FY 2024–25",
  basis: "Rice and wheat distributed through PDS across all schemes listed. The chart adds the two published quantities for each complete financial year.",
} satisfies DepartmentSource;

const month = { totalCards: 9603758, availedCards: 6115017, fairPriceShops: 13928, transactions: 7242663, coverage: 63.67 };

const dailyDistricts = [
  { label: "Alappuzha", aay: 1995, phh: 15072, npns: 6012, nps: 4573, value: 27652 },
  { label: "Ernakulam", aay: 1920, phh: 14345, npns: 9635, nps: 9896, value: 35796 },
  { label: "Idukki", aay: 1717, phh: 6755, npns: 2316, nps: 2624, value: 13412 },
  { label: "Kannur", aay: 1449, phh: 7302, npns: 9916, nps: 7904, value: 26571 },
  { label: "Kasaragod", aay: 1067, phh: 4297, npns: 3550, nps: 3636, value: 12550 },
  { label: "Kollam", aay: 3096, phh: 20985, npns: 8073, nps: 7339, value: 39493 },
  { label: "Kottayam", aay: 1731, phh: 8264, npns: 6467, nps: 4708, value: 21170 },
  { label: "Kozhikode", aay: 1687, phh: 12369, npns: 10455, nps: 9483, value: 33994 },
  { label: "Malappuram", aay: 2228, phh: 17554, npns: 13546, nps: 14074, value: 47402 },
  { label: "Palakkad", aay: 2127, phh: 18753, npns: 10314, nps: 6936, value: 38130 },
  { label: "Pathanamthitta", aay: 896, phh: 4087, npns: 3460, nps: 2653, value: 11096 },
  { label: "Thiruvananthapuram", aay: 2879, phh: 22508, npns: 9893, nps: 5926, value: 41206 },
  { label: "Thrissur", aay: 2459, phh: 14262, npns: 9798, nps: 10367, value: 36886 },
  { label: "Wayanad", aay: 1606, phh: 2866, npns: 2223, nps: 2159, value: 8854 },
].sort((a, b) => b.value - a.value);

const ekycDistricts = [
  { label: "Alappuzha", total: 1119688, updated: 1087733, coverage: 97.14 },
  { label: "Ernakulam", total: 1112065, updated: 1073607, coverage: 96.54 },
  { label: "Idukki", total: 537978, updated: 527956, coverage: 98.13 },
  { label: "Kannur", total: 877191, updated: 851020, coverage: 97.01 },
  { label: "Kasaragod", total: 630688, updated: 610389, coverage: 96.78 },
  { label: "Kollam", total: 1307191, updated: 1272285, coverage: 97.32 },
  { label: "Kottayam", total: 775173, updated: 751950, coverage: 97.00 },
  { label: "Kozhikode", total: 1350778, updated: 1308568, coverage: 96.87 },
  { label: "Malappuram", total: 2052945, updated: 1984464, coverage: 96.66 },
  { label: "Palakkad", total: 1543590, updated: 1496959, coverage: 96.97 },
  { label: "Pathanamthitta", total: 467300, updated: 453255, coverage: 96.99 },
  { label: "Thiruvananthapuram", total: 1723950, updated: 1670991, coverage: 96.92 },
  { label: "Thrissur", total: 1333305, updated: 1298474, coverage: 97.38 },
  { label: "Wayanad", total: 449493, updated: 438421, coverage: 97.53 },
].map((row) => ({ ...row, value: row.total - row.updated })).sort((a, b) => b.value - a.value);

const grainHistory = [
  { label: "2020–21", rice: 1209840, wheat: 199317 },
  { label: "2021–22", rice: 1105835, wheat: 144079 },
  { label: "2022–23", rice: 1167429, wheat: 188337 },
  { label: "2023–24", rice: 1192357.10, wheat: 174845.65 },
  { label: "2024–25", rice: 1195727.32, wheat: 174851.52 },
] as const;

const number = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const remainingCards = month.totalCards - month.availedCards;
const statewideEkyc = { total: 15281335, updated: 14826072, coverage: 97.02 };
const pendingEkyc = statewideEkyc.total - statewideEkyc.updated;

export const foodSuppliesDashboard = {
  title: "Food & Supplies",
  description: "Kerala’s ration use, district distribution and beneficiary eKYC updates, with annual grain volumes.",
  icon: "ShoppingBasket",
  accent: "#316345",
  measures: [
    { label: "Ration cards in AePDS", value: number.format(month.totalCards), note: "Statewide · November 2026 snapshot", source: monthlySource },
    { label: "Cards that availed ration", value: number.format(month.availedCards), note: `${month.coverage}% of cards · through 27 Nov`, source: monthlySource },
    { label: "Fair Price Shops", value: number.format(month.fairPriceShops), note: "Statewide · November 2026 snapshot", source: monthlySource },
    { label: "Ration transactions", value: number.format(month.transactions), note: "Transaction events · through 27 Nov", source: monthlySource },
  ],
  attention: [
    {
      title: "November ration distribution is still in progress",
      value: `${month.coverage}% of cards had availed ration`,
      detail: `At the 27 November refresh, ${number.format(remainingCards)} cards had yet to show ration use in AePDS for November. Check the month-end figure before assessing uptake.`,
      sources: [monthlySource], section: "ration-card-use",
    },
    {
      title: "Malappuram has the most pending eKYC updates",
      value: `${number.format(ekycDistricts[0].value)} beneficiaries`,
      detail: `Statewide, ${statewideEkyc.coverage}% of AAY and PHH beneficiaries show updated eKYC. The district table gives both the remaining counts and coverage rates.`,
      sources: [ekycSource], section: "district-ration-ekyc",
    },
  ],
  charts: [
    {
      id: "ration-card-use", title: "November ration card use", period: "Statewide · 27 Nov 2026, 09:20 IST · month in progress",
      kind: "composition", sources: [monthlySource], unit: "cards",
      rows: [
        { label: "Ration use recorded", value: month.availedCards, color: "#316345" },
        { label: "Ration use yet to be recorded", value: remainingCards, color: "#a26825" },
      ],
      note: "The source records each card that availed ration and reports transaction events separately.",
    },
    {
      id: "district-ration-use", title: "Ration cards served by district", period: "Six highest counts · 26 Nov 2026",
      sources: [dailySource], unit: "cards", color: "#276b8b", rows: dailyDistricts.slice(0, 6),
      details: {
        columns: ["District", "AAY", "PHH", "Non-priority without subsidy", "Non-priority with subsidy", "All four schemes"],
        rows: [
          ...dailyDistricts.map(({ label, aay, phh, npns, nps, value }) => [label, aay, phh, npns, nps, value]),
          ["Kerala total", 26857, 169419, 105658, 92278, 394212],
        ],
      },
      note: "Counts are cards marked availed on 26 November. AAY is Antyodaya Anna Yojana and PHH is Priority Households.",
    },
    {
      id: "district-ration-ekyc", title: "Pending ration beneficiary eKYC by district", period: "Six highest counts · AAY and PHH · 27 Nov 2026",
      sources: [ekycSource], unit: "people", color: "#a26825", rows: ekycDistricts.slice(0, 6),
      details: {
        columns: ["District", "Beneficiaries", "eKYC updated", "Still to update", "eKYC coverage"],
        rows: [
          ...ekycDistricts.map(({ label, total, updated, value, coverage }) => [label, total, updated, value, `${coverage.toFixed(2)}%`]),
          ["Kerala total", statewideEkyc.total, statewideEkyc.updated, pendingEkyc, `${statewideEkyc.coverage}%`],
        ],
      },
      note: "Pending is the difference between the total AAY and PHH beneficiary count and the updated count.",
    },
    {
      id: "pds-grain-trend", title: "Rice and wheat distributed through PDS", period: "Complete financial years · all schemes",
      kind: "trend", sources: [annualGrainsSource], unit: "lakh tonnes", color: "#536d2e",
      rows: grainHistory.map(({ label, rice, wheat }) => ({ label, value: (rice + wheat) / 100000 })),
      details: {
        columns: ["Financial year", "Rice (tonnes)", "Wheat (tonnes)", "Rice and wheat (tonnes)"],
        rows: grainHistory.map(({ label, rice, wheat }) => [label, rice, wheat, number.format(rice + wheat)]),
      },
    },
  ],
} satisfies DepartmentDashboardData;
