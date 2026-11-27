import type { TransportSource } from "./transportActuals";

export const districtWaterAccessSource = {
  source: "Jal Jeevan Mission · Ministry of Jal Shakti",
  dataset: "Format J1 · Kerala district PWS and FHTC coverage",
  url: "https://ejalshakti.gov.in/JJM/JJMReports/Physical/rpt_JJM_VillageWisePWSReport_D.aspx?st=cjfByIE3tXc%3d&type=3SF6adRVTpM%3d",
  period: "26 Nov 2026",
  basis: "Reported rural households and households with a tap connection. Households without a connection are the difference between these counts.",
  sourceUpdatedAt: "26 Nov 2026 (report date)",
  fetchedAt: "27 Nov 2026, 1:10 am IST",
} satisfies TransportSource;

const reportedHouseholds = [
  { district: "Alappuzha", denom: 550840, with: 365783 },
  { district: "Ernakulam", denom: 616973, with: 409867 },
  { district: "Idukki", denom: 279519, with: 103450 },
  { district: "Kannur", denom: 448003, with: 256614 },
  { district: "Kasaragod", denom: 254051, with: 89548 },
  { district: "Kollam", denom: 609093, with: 450551 },
  { district: "Kottayam", denom: 482790, with: 230656 },
  { district: "Kozhikode", denom: 517076, with: 211819 },
  { district: "Malappuram", denom: 802710, with: 383416 },
  { district: "Palakkad", denom: 665293, with: 396664 },
  { district: "Pathanamthitta", denom: 358607, with: 177344 },
  { district: "Thiruvananthapuram", denom: 684304, with: 453128 },
  { district: "Thrissur", denom: 614994, with: 308413 },
  { district: "Wayanad", denom: 191308, with: 73436 },
] as const;

function coverage({ denom, with: connected }: { denom: number; with: number }) {
  return {
    denom,
    with: connected,
    count: denom - connected,
    percent: Math.round((connected / denom) * 10000) / 100,
  };
}

export const districtWaterAccess = reportedHouseholds.map((row) => ({
  district: row.district,
  ...coverage(row),
}));

export const districtWaterAccessTotal = coverage(reportedHouseholds.reduce((total, row) => ({
  denom: total.denom + row.denom,
  with: total.with + row.with,
}), { denom: 0, with: 0 }));
