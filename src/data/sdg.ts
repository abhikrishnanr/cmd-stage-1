import type { DataProvenance } from "@/components/DataProvenance";

export const sdgIndexSource = {
  source: "NITI Aayog",
  dataset: "SDG India Index 2023–24",
  url: "https://www.niti.gov.in/sites/default/files/2024-07/SDG_India_Index_2023-24.pdf",
  period: "2023–24 edition",
  basis: "Published index scores on a scale of 0 to 100",
  sourceUpdatedAt: "12 Jul 2024 (release)",
  fetchedAt: "27 Nov 2026",
} satisfies DataProvenance;

export const sdgKeralaSource = {
  source: "Government of Kerala SDG portal",
  dataset: "Kerala in the SDG India Index",
  url: "https://sdg.kerala.gov.in/",
  period: "2023–24 and previous index editions",
  basis: "Published NITI Aayog index scores",
  sourceUpdatedAt: null,
  fetchedAt: "27 Nov 2026",
} satisfies DataProvenance;

export const sdgSummary = { kerala: 79, india: 71, jointTopState: "Uttarakhand" };

export const sdgEditions = [
  { label: "2018", score: 69 },
  { label: "2019–20", score: 70 },
  { label: "2020–21", score: 75 },
  { label: "2023–24", score: 79 },
];

export const sdgGoals = [
  { title: "No Poverty", score: 81, previous: 83, color: "#e5243b" },
  { title: "Zero Hunger", score: 84, previous: 80, color: "#b57e13" },
  { title: "Good Health and Well-being", score: 80, previous: 72, color: "#4c9f38" },
  { title: "Quality Education", score: 82, previous: 80, color: "#c5192d" },
  { title: "Gender Equality", score: 66, previous: 63, color: "#ff3a21" },
  { title: "Clean Water and Sanitation", score: 87, previous: 89, color: "#0e7f9e" },
  { title: "Affordable and Clean Energy", score: 100, previous: 100, color: "#a36d00" },
  { title: "Decent Work and Economic Growth", score: 74, previous: 62, color: "#a21942" },
  { title: "Industry, Innovation and Infrastructure", score: 69, previous: 60, color: "#b85214" },
  { title: "Reduced Inequalities", score: 71, previous: 69, color: "#be1764" },
  { title: "Sustainable Cities and Communities", score: 84, previous: 75, color: "#aa690c" },
  { title: "Responsible Consumption and Production", score: 53, previous: 65, color: "#9c7729" },
  { title: "Climate Action", score: 80, previous: 69, color: "#3f7e44" },
  { title: "Life Below Water", score: 51, previous: 53, color: "#0a76a7" },
  { title: "Life on Land", score: 88, previous: 77, color: "#45872d" },
  { title: "Peace, Justice and Strong Institutions", score: 82, previous: 80, color: "#00689d" },
];
