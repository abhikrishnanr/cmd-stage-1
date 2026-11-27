import type { DataProvenance } from "@/components/DataProvenance";

const educationReport = "https://education.kerala.gov.in/wp-content/uploads/2026/11/Educational-Statistics-2024-25_25112026.pdf";
const dge = {
  source: "Kerala Directorate of General Education",
  sourceUpdatedAt: "25 November 2026 (published)",
  fetchedAt: "27 November 2026",
};

export const educationSources = {
  enrolment: {
    ...dge,
    dataset: "Educational Statistics 2024–25 · Table 3.9.1",
    url: `${educationReport}#page=63`,
    period: "Academic years 2023–24 and 2024–25",
    basis: "Sixth Working Day census of Classes I–X in government, aided and recognised unaided schools in the General Education sector. Year-on-year changes compare the same class in two censuses.",
  },
  districts: {
    ...dge,
    dataset: "Educational Statistics 2024–25 · Table 3.9.2",
    url: `${educationReport}#page=64`,
    period: "Academic years 2023–24 and 2024–25",
    basis: "District enrolment totals for Classes I–X in the same Kerala General Education sector census.",
  },
  facilities: {
    ...dge,
    dataset: "Educational Statistics 2024–25 · Table 4.11.1",
    url: `${educationReport}#page=98`,
    period: "Academic year 2024–25",
    basis: "Schools with smart classrooms as a share of those covered by the chapter’s infrastructure tables. Coverage records availability at a school.",
  },
  dropout: {
    source: "Union Ministry of Education · UDISE+",
    dataset: "Lok Sabha question 2465 · Annexure I, dropout tables",
    url: "https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU2465_RLFCeh.pdf?source=lsapps#page=3",
    sourceUpdatedAt: "3 August 2026 (published reply)",
    fetchedAt: "27 November 2026",
    period: "Academic years 2022–23 to 2025–26",
    basis: "Same NEP grade bands throughout: Classes III–V, VI–VIII and IX–XII. Rates are the published rounded figures.",
  },
  schools: {
    source: "Union Ministry of Education · UDISE+",
    dataset: "Rajya Sabha question 1170 · Number of schools, all managements",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2291272&lang=2&reg=48",
    sourceUpdatedAt: "29 July 2026 (published reply)",
    fetchedAt: "27 November 2026",
    period: "Academic years 2023–24 to 2025–26",
    basis: "Kerala’s all-management school counts as reported in UDISE+.",
  },
} satisfies Record<string, DataProvenance>;

export const enrolmentByManagement = [
  { label: "Government", previous: 1223554, current: 1160609, colour: "#1865ae" },
  { label: "Aided", previous: 2181170, current: 2127066, colour: "#067767" },
  { label: "Recognised unaided", previous: 341923, current: 355967, colour: "#7954a2" },
] as const;

export const classEnrolment = [
  { label: "I", previous: 298067, current: 298848 },
  { label: "II", previous: 305641, current: 298881 },
  { label: "III", previous: 351070, current: 302836 },
  { label: "IV", previous: 353637, current: 349619 },
  { label: "V", previous: 370612, current: 358511 },
  { label: "VI", previous: 396085, current: 373886 },
  { label: "VII", previous: 402860, current: 398456 },
  { label: "VIII", previous: 410665, current: 417704 },
  { label: "IX", previous: 428569, current: 415948 },
  { label: "X", previous: 429441, current: 428953 },
] as const;

export const enrolmentTotals = enrolmentByManagement.reduce((totals, row) => ({
  current: totals.current + row.current,
  previous: totals.previous + row.previous,
}), { current: 0, previous: 0 });

// Table 3.9.2 enrolment figures and Table 4.11.1 smart-classroom figures.
export const educationDistricts = [
  { name: "Thiruvananthapuram", previous: 290659, current: 277647, smartSchools: 556, smartShare: 55.8 },
  { name: "Kollam", previous: 240281, current: 227400, smartSchools: 620, smartShare: 65.8 },
  { name: "Pathanamthitta", previous: 82932, current: 79190, smartSchools: 381, smartShare: 52.6 },
  { name: "Alappuzha", previous: 170601, current: 162309, smartSchools: 389, smartShare: 51.5 },
  { name: "Kottayam", previous: 150947, current: 143186, smartSchools: 520, smartShare: 57.1 },
  { name: "Idukki", previous: 99616, current: 94797, smartSchools: 374, smartShare: 76.0 },
  { name: "Ernakulam", previous: 260781, current: 252128, smartSchools: 672, smartShare: 68.4 },
  { name: "Thrissur", previous: 314899, current: 307498, smartSchools: 766, smartShare: 75.8 },
  { name: "Palakkad", previous: 351895, current: 343382, smartSchools: 667, smartShare: 67.0 },
  { name: "Malappuram", previous: 776683, current: 776751, smartSchools: 1159, smartShare: 73.8 },
  { name: "Kozhikode", previous: 389978, current: 379259, smartSchools: 800, smartShare: 63.0 },
  { name: "Wayanad", previous: 110367, current: 107456, smartSchools: 172, smartShare: 56.2 },
  { name: "Kannur", previous: 313273, current: 304082, smartSchools: 997, smartShare: 77.0 },
  { name: "Kasaragod", previous: 193735, current: 188557, smartSchools: 366, smartShare: 61.8 },
] as const;

export const smartClassrooms = { schools: 8439, coverage: 65.7, government: 64.6, aided: 63.0, unaided: 87.7 } as const;

export const dropoutByStage = [
  { label: "Preparatory (III–V)", kerala: 0.3, india: 1.8, boys: 0.5, girls: 0.1 },
  { label: "Middle (VI–VIII)", kerala: 0.1, india: 3.6, boys: 0.1, girls: 0.0 },
  { label: "Secondary (IX–XII)", kerala: 2.9, india: 7.0, boys: 3.8, girls: 1.9 },
] as const;

export const secondaryDropoutHistory = [
  { label: "2022–23", value: 4.7, india: 13.8 },
  { label: "2023–24", value: 2.2, india: 10.9 },
  { label: "2024–25", value: 3.5, india: 8.2 },
  { label: "2025–26", value: 2.9, india: 7.0 },
] as const;

export const schoolHistory = [
  { label: "2023–24", value: 15864 },
  { label: "2024–25", value: 15757 },
  { label: "2025–26", value: 15750 },
] as const;
