import { DistrictDatum, Rag } from "./types";

const SECTORS = ["Finance", "Health", "Projects", "Welfare", "Grievances", "Revenue"];

function ragFromScore(s: number): Rag {
  if (s >= 75) return "green";
  if (s >= 60) return "amber";
  return "red";
}

const tourismImage = (name: string) => `https://www.keralatourism.org/ktadmin/img/districts/${name}.svg`;

const raw: Omit<DistrictDatum, "rag" | "sectors">[] = [
  { geoName: "Thiruvananthapuram", name: "Thiruvananthapuram", collector: "Anu Kumari IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s313fe9d84310e77f13a6d184dbf1232f3/uploads/2019/06/2024090969.jpg", collectorSource: "https://trivandrum.nic.in/en/", heroImage: tourismImage("Thiruvananthapuram"), heroCredit: "Kerala Tourism district visual", population: "33.0 L", governance: 78, indira: 81, fundUtil: 74, grievances: 1840, healthRisk: "amber", projectDelay: 96, openTickets: 12, risk: 34 },
  { geoName: "Kollam", name: "Kollam", collector: "Anie Jula Thomas IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s39fc3d7152ba9336a670e36d0ed79bc43/uploads/2026/05/17797873381507-e1779787379661.jpg", collectorSource: "https://kollam.nic.in/en/district-collector/", heroImage: tourismImage("Kollam"), heroCredit: "Kerala Tourism district visual", population: "26.4 L", governance: 72, indira: 76, fundUtil: 69, grievances: 1320, healthRisk: "green", projectDelay: 110, openTickets: 9, risk: 41 },
  { geoName: "Pathanamthitta", name: "Pathanamthitta", collector: "Nizamudeen A IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3e2ef524fbf3d9fe611d5a8e90fefdc9c/uploads/2026/05/17797048215379-200x300.jpeg", collectorSource: "https://pathanamthitta.nic.in/en/district-collector/", heroImage: tourismImage("Pathanamthitta"), heroCredit: "Kerala Tourism district visual", population: "11.9 L", governance: 80, indira: 79, fundUtil: 77, grievances: 540, healthRisk: "green", projectDelay: 72, openTickets: 5, risk: 28 },
  { geoName: "Alappuzha", name: "Alappuzha", collector: "Shaji V Nair IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3fe9fc289c3ff0af142b6d3bead98a923/uploads/2026/05/17796941342217-e1779694412682.jpeg", collectorSource: "https://alappuzha.nic.in/en/district-collector/", heroImage: tourismImage("Alappuzha"), heroCredit: "Kerala Tourism district visual", population: "21.3 L", governance: 69, indira: 71, fundUtil: 64, grievances: 1190, healthRisk: "amber", projectDelay: 128, openTickets: 11, risk: 47 },
  { geoName: "Kottayam", name: "Kottayam", collector: "Chetan Kumar Meena IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3577ef1154f3240ad5b9b413aa7346a1e/uploads/2025/08/17658836217627.jpeg", collectorSource: "https://kottayam.nic.in/en/", heroImage: tourismImage("Kottayam"), heroCredit: "Kerala Tourism district visual", population: "19.7 L", governance: 76, indira: 78, fundUtil: 72, grievances: 880, healthRisk: "green", projectDelay: 84, openTickets: 7, risk: 33 },
  { geoName: "Idukki", name: "Idukki", collector: "Dr. Dinesan Cheruvat IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3757b505cfd34c64c85ca5b5690ee5293/uploads/2018/03/17551735287418.jpeg", collectorSource: "https://idukki.nic.in/en/", heroImage: tourismImage("Idukki"), heroCredit: "Kerala Tourism district visual", population: "11.1 L", governance: 64, indira: 67, fundUtil: 58, grievances: 610, healthRisk: "amber", projectDelay: 152, openTickets: 10, risk: 58 },
  { geoName: "Ernakulam", name: "Ernakulam", collector: "Priyanka G IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3621bf66ddb7c962aa0d22ac97d69b793/uploads/2025/08/17548965407028.jpeg", collectorSource: "https://ernakulam.nic.in/en/", heroImage: tourismImage("Ernakulam"), heroCredit: "Kerala Tourism district visual", population: "32.8 L", governance: 83, indira: 84, fundUtil: 80, grievances: 1610, healthRisk: "green", projectDelay: 78, openTickets: 8, risk: 26 },
  { geoName: "Thrissur", name: "Thrissur", collector: "Sikha Surendran IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3149e9677a5989fd342ae44213df68868/uploads/2026/03/17725289161124.jpeg", collectorSource: "https://thrissur.nic.in/en/", heroImage: tourismImage("Thrissur"), heroCredit: "Kerala Tourism district visual", population: "31.2 L", governance: 75, indira: 77, fundUtil: 71, grievances: 1420, healthRisk: "amber", projectDelay: 102, openTickets: 10, risk: 38 },
  { geoName: "Palakkad", name: "Palakkad", collector: "Sudhir K IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s384d9ee44e457ddef7f2c4f25dc8fa865/uploads/2026/05/17797084902536.jpeg", collectorSource: "https://palakkad.nic.in/en/", heroImage: tourismImage("Palakkad"), heroCredit: "Kerala Tourism district visual", population: "28.1 L", governance: 66, indira: 69, fundUtil: 61, grievances: 1280, healthRisk: "red", projectDelay: 140, openTickets: 13, risk: 55 },
  { geoName: "Malappuram", name: "Malappuram", collector: "Dr. Vinay Goyal IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s382aa4b0af34c2313a562076992e50aa3/uploads/2026/02/17721734428075.jpg", collectorSource: "https://malappuram.nic.in/en/", heroImage: tourismImage("Malappuram"), heroCredit: "Kerala Tourism district visual", population: "41.1 L", governance: 70, indira: 74, fundUtil: 66, grievances: 1980, healthRisk: "amber", projectDelay: 118, openTickets: 14, risk: 44 },
  { geoName: "Kozhikkode", name: "Kozhikode", collector: "M. S. Madhavikutty IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3bd4c9ab730f5513206b999ec0d90d1fb/uploads/2026/06/17805698802388.jpeg", collectorSource: "https://kozhikode.nic.in/en/", heroImage: tourismImage("Kozhikode"), heroCredit: "Kerala Tourism district visual", population: "30.9 L", governance: 77, indira: 79, fundUtil: 73, grievances: 1510, healthRisk: "green", projectDelay: 90, openTickets: 9, risk: 32 },
  { geoName: "Wayanad", name: "Wayanad", collector: "Meghashree D. R. IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3b73ce398c39f506af761d2277d853a92/uploads/2024/09/2024091048.jpg", collectorSource: "https://wayanad.nic.in/en/", heroImage: tourismImage("Wayanad"), heroCredit: "Kerala Tourism district visual", population: "8.2 L", governance: 58, indira: 62, fundUtil: 53, grievances: 470, healthRisk: "red", projectDelay: 168, openTickets: 15, risk: 71 },
  { geoName: "Kannur", name: "Kannur", collector: "Vishnuraj P IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s3060ad92489947d410d897474079c1477/uploads/2026/05/17797017677885.jpg", collectorSource: "https://kannur.nic.in/en/", heroImage: tourismImage("Kannur"), heroCredit: "Kerala Tourism district visual", population: "25.2 L", governance: 73, indira: 75, fundUtil: 68, grievances: 1080, healthRisk: "amber", projectDelay: 106, openTickets: 8, risk: 39 },
  { geoName: "Kasargod", name: "Kasaragod", collector: "Arjun Pandian IAS", collectorPhoto: "https://cdn.s3waas.gov.in/s38dd48d6a2e2cad213179a3992c0be53c/uploads/2026/03/17732045755940.jpeg", collectorSource: "https://kasargod.nic.in/en/", heroImage: tourismImage("Kasaragod"), heroCredit: "Kerala Tourism district visual", population: "13.0 L", governance: 61, indira: 65, fundUtil: 56, grievances: 690, healthRisk: "amber", projectDelay: 134, openTickets: 11, risk: 52 },
];

export const districts: DistrictDatum[] = raw.map((d) => {
  const sectors: Record<string, number> = {};
  SECTORS.forEach((s, i) => {
    const jitter = ((d.governance * (i + 3)) % 17) - 8;
    sectors[s] = Math.max(40, Math.min(95, Math.round(d.governance + jitter)));
  });
  return { ...d, sectors, rag: ragFromScore(d.governance) };
});

export const districtByName = (name: string) =>
  districts.find((d) => d.name === name || d.geoName === name);

export const sectorsList = SECTORS;

export const slugify = (n: string) => n.toLowerCase().replace(/[^a-z]+/g, "-");
export const districtBySlug = (slug: string) => districts.find((d) => slugify(d.name) === slug);
