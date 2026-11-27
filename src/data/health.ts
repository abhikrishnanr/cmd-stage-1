import { Rag, TrendPoint } from "./types";

export const healthSummary = {
  imr: "6.2",
  mmr: "19",
  phcLoad: "118%",
  icuOccupancy: "74%",
  kaspCoverage: "92.4 L",
  activeAlerts: 5,
  liveInstitutions: "1,114",
  totalRegistrations: "10.23 Cr",
  totalVisits: "24.66 Cr",
  labTests: "2.80 Cr",
};

export const healthInstitutionOverview = {
  kceaAsOn: "01-06-2026",
  activeClinicalEstablishments: "18,505",
  hospitalClassTotal: "1,556",
  publicHospitals: "406",
  privateHospitals: "1,150",
  publicModernMedicineInstitutions: "1,289",
  publicModernMedicineBeds: "38,525",
  eHealthImplementedInstitutions: "1,114",
  eHealthGapNote: "eHealth covers a large implementation footprint, but it is not the full public + private health inventory.",
};

export const hospitalOwnershipCards = [
  { label: "Hospital-class establishments", value: "1,556", sub: "KCEA permanent + provisional register", icon: "Hospital", rag: "blue" as Rag },
  { label: "Government / public", value: "406", sub: "hospital-class establishments", icon: "Landmark", rag: "green" as Rag },
  { label: "Private", value: "1,150", sub: "hospital-class establishments", icon: "Building2", rag: "amber" as Rag },
  { label: "All registered establishments", value: "18,505", sub: "hospitals, clinics, labs, dental and diagnostics", icon: "ClipboardList", rag: "blue" as Rag },
];

export const healthSystemTabs = [
  {
    id: "registered",
    label: "Registered",
    icon: "ClipboardList",
    title: "Clinical Establishments Register",
    subtitle: "Permanent + provisional active KCEA records as on 01.06.2026",
    rows: [
      { label: "Modern Medicine", establishments: 12768, hospitals: 863, publicHospitals: 216, privateHospitals: 647, icon: "Stethoscope", rag: "green" as Rag },
      { label: "Ayurveda", establishments: 3222, hospitals: 527, publicHospitals: 134, privateHospitals: 393, icon: "Leaf", rag: "green" as Rag },
      { label: "Homeopathy", establishments: 2297, hospitals: 123, publicHospitals: 53, privateHospitals: 70, icon: "HeartPulse", rag: "green" as Rag },
      { label: "Siddha", establishments: 105, hospitals: 22, publicHospitals: 1, privateHospitals: 21, icon: "Sprout", rag: "amber" as Rag },
      { label: "Yoga & Naturopathy", establishments: 65, hospitals: 13, publicHospitals: 2, privateHospitals: 11, icon: "Activity", rag: "amber" as Rag },
      { label: "Unani", establishments: 43, hospitals: 8, publicHospitals: 0, privateHospitals: 8, icon: "Flower2", rag: "amber" as Rag },
    ],
  },
  {
    id: "modern",
    label: "Modern Medicine",
    icon: "Hospital",
    title: "Government Modern Medicine Network",
    subtitle: "DHS List of Modern Medicine Institutions 2024-25",
    rows: [
      { label: "General Hospitals", count: 18, beds: 6942, icon: "Hospital", rag: "green" as Rag },
      { label: "District Hospitals", count: 18, beds: 5181, icon: "Building2", rag: "green" as Rag },
      { label: "Taluk HQ Hospitals", count: 48, beds: 0, icon: "Landmark", rag: "green" as Rag },
      { label: "Taluk Hospitals", count: 40, beds: 8741, icon: "Cross", rag: "green" as Rag },
      { label: "CHCs incl. converted FHCs", count: 226, beds: 6293, icon: "HeartPulse", rag: "green" as Rag },
      { label: "PHCs / FHCs / 24x7 PHCs", count: 849, beds: 4769, icon: "Home", rag: "green" as Rag },
      { label: "Women & Children Hospitals", count: 10, beds: 1921, icon: "Baby", rag: "blue" as Rag },
      { label: "Speciality Hospitals", count: 7, beds: 839, icon: "BadgePlus", rag: "blue" as Rag },
      { label: "Mental Health Centres", count: 3, beds: 0, icon: "Brain", rag: "amber" as Rag },
      { label: "TB Hospitals / Centres", count: 18, beds: 24, icon: "Lungs", rag: "amber" as Rag },
      { label: "Leprosy Hospitals", count: 3, beds: 0, icon: "ShieldPlus", rag: "amber" as Rag },
      { label: "Health Subcentres", count: 5416, beds: 0, icon: "MapPin", rag: "green" as Rag },
    ],
  },
  {
    id: "ayush",
    label: "AYUSH",
    icon: "Leaf",
    title: "AYUSH Government Network",
    subtitle: "ISM and Homoeopathy department public institution footprint",
    rows: [
      { label: "ISM Hospitals", count: 130, sub: "Ayurveda, Siddha, Unani, Naturopathy", icon: "Leaf", rag: "green" as Rag },
      { label: "ISM Dispensaries", count: 818, sub: "statewide OP network", icon: "Pill", rag: "green" as Rag },
      { label: "Homeopathy Hospitals", count: 34, sub: "985 beds", icon: "HeartPulse", rag: "green" as Rag },
      { label: "Homeopathy Regular Dispensaries", count: 709, sub: "regular dispensaries", icon: "Home", rag: "green" as Rag },
      { label: "Homeopathy NHM Dispensaries", count: 407, sub: "NHM dispensaries", icon: "Network", rag: "blue" as Rag },
      { label: "Homeopathy Mobile / Floating", count: 7, sub: "4 mobile + 3 floating", icon: "Truck", rag: "blue" as Rag },
    ],
  },
  {
    id: "speciality",
    label: "Speciality",
    icon: "BadgePlus",
    title: "Speciality Hospitals & Institutions",
    subtitle: "DHS speciality list and ISM speciality institutions",
    rows: [
      { label: "Govt. Ayurveda College Hospital for Women & Children", district: "Thiruvananthapuram", specialty: "Women & child Ayurveda", icon: "Baby", rag: "blue" as Rag },
      { label: "Coastal Speciality Hospital, Valiyathura", district: "Thiruvananthapuram", specialty: "Coastal speciality care", icon: "Waves", rag: "blue" as Rag },
      { label: "K. R. Narayanan Memorial Speciality Hospital", district: "Kottayam", specialty: "Speciality care", icon: "Hospital", rag: "blue" as Rag },
      { label: "Govt. Tribal Speciality Hospital, Nalloornad", district: "Wayanad", specialty: "Tribal speciality care", icon: "Mountain", rag: "green" as Rag },
      { label: "CHC Mattannur", district: "Kannur", specialty: "Speciality listed CHC", icon: "HeartPulse", rag: "green" as Rag },
      { label: "CHC Pinarayi", district: "Kannur", specialty: "Speciality listed CHC", icon: "HeartPulse", rag: "green" as Rag },
      { label: "Tata Trust Govt. Hospital, Chattanchal", district: "Kasaragod", specialty: "COVID / speciality hospital", icon: "ShieldPlus", rag: "amber" as Rag },
      { label: "ACACC, Purakkattiri", district: "Kozhikode", specialty: "Child & adolescent Ayurveda care", icon: "Baby", rag: "green" as Rag },
      { label: "GARIM, Kottakkal", district: "Malappuram", specialty: "Ayurveda mental health & hygiene", icon: "Brain", rag: "green" as Rag },
      { label: "KISAR", district: "Thrissur", specialty: "Sports Ayurveda & research", icon: "Dumbbell", rag: "green" as Rag },
      { label: "Govt. Ayurveda Marma Hospital", district: "Thiruvananthapuram", specialty: "Marma therapy", icon: "Activity", rag: "green" as Rag },
      { label: "Govt. Yoga Naturopathy Hospital, Varkala", district: "Thiruvananthapuram", specialty: "Yoga & naturopathy", icon: "Leaf", rag: "green" as Rag },
      { label: "Govt. Siddha Hospital, Vallakadavu", district: "Thiruvananthapuram", specialty: "Siddha medicine", icon: "Sprout", rag: "amber" as Rag },
      { label: "Visha Vaidya Hospitals", district: "Thrissur", specialty: "Ayurvedic toxicology", icon: "ShieldAlert", rag: "amber" as Rag },
    ],
  },
];

export const healthDataSourceNotes = [
  { source: "KCEA Register", detail: "18,505 active clinical establishments and 1,556 hospital-class establishments as on 01.06.2026.", icon: "ClipboardList" },
  { source: "DHS Modern Medicine List", detail: "1,289 government modern medicine institutions and 38,525 sanctioned beds in 2024-25.", icon: "Hospital" },
  { source: "eHealth Dashboard", detail: "1,114 implemented institutions and service workflow statistics; not the full state inventory.", icon: "DatabaseZap" },
  { source: "ISM / Homoeopathy", detail: "AYUSH public network spans ISM and Homoeopathy institutions outside allopathy-only views.", icon: "Leaf" },
];

export const eHealthSnapshot = {
  source: "eHealth Kerala Official Dashboard",
  url: "https://dashboard.ehealth.kerala.gov.in/index.php/Init",
  lastUpdated: "13-06-2026",
  dashboardVersion: "v2.7.8.178",
  institutions: [
    { label: "All Institutions", value: "1,114", icon: "Hospital", tone: "green" as const },
    { label: "Medical College Hospitals", value: "19", icon: "School", tone: "blue" as const },
    { label: "DHs / GHs", value: "33", icon: "Building2", tone: "green" as const },
    { label: "Taluk Hospitals", value: "85", icon: "Landmark", tone: "amber" as const },
    { label: "CHCs", value: "102", icon: "HeartPulse", tone: "green" as const },
    { label: "PHCs / FHCs", value: "578", icon: "Home", tone: "green" as const },
    { label: "Urban PHCs", value: "99", icon: "Building2", tone: "blue" as const },
    { label: "Specialty Hospitals", value: "16", icon: "Stethoscope", tone: "amber" as const },
    { label: "Public Health Labs", value: "4", icon: "FlaskConical", tone: "blue" as const },
    { label: "Others", value: "178", icon: "Circle", tone: "green" as const },
  ],
  serviceStats: [
    { label: "Total Registrations", value: "10,23,13,395", sub: "Permanent + temporary UHID", icon: "UserCheck" },
    { label: "Permanent UHID", value: "2,67,22,208", sub: "26.12% of registrations", icon: "Fingerprint" },
    { label: "Temporary UHID", value: "7,55,91,187", sub: "73.88% of registrations", icon: "Users" },
    { label: "Total Visits", value: "24,65,91,856", sub: "OP/IP visit footprint", icon: "Footprints" },
    { label: "IP Admissions", value: "19,78,359", sub: "Inpatient intake", icon: "BedDouble" },
    { label: "IP Discharges", value: "17,97,322", sub: "Inpatient completed", icon: "LogOut" },
    { label: "Online Appointment Visits", value: "21,95,782", sub: "Advance booking channel", icon: "CalendarCheck" },
    { label: "Online Consultations", value: "5,94,207", sub: "Booked consultations", icon: "MessagesSquare" },
    { label: "Prechecks", value: "5,12,09,378", sub: "21% of clinical workflow", icon: "ClipboardCheck" },
    { label: "Diagnoses", value: "11,72,98,517", sub: "48% of clinical workflow", icon: "Activity" },
    { label: "Prescriptions", value: "7,74,03,279", sub: "31% of clinical workflow", icon: "Pill" },
    { label: "Lab Tests", value: "2,79,76,611", sub: "11% workflow tag", icon: "TestTube2" },
    { label: "Survey Members", value: "2,59,55,998", sub: "Public health survey", icon: "UsersRound" },
    { label: "Survey Houses", value: "68,35,747", sub: "Public health survey", icon: "House" },
  ],
};

export const eHealthDistrictSurvey: Record<string, number> = {
  Thiruvananthapuram: 2406760,
  Kollam: 2168789,
  Pathanamthitta: 1026328,
  Alappuzha: 1521575,
  Kottayam: 1522289,
  Idukki: 867546,
  Ernakulam: 1870452,
  Thrissur: 2301629,
  Palakkad: 2344974,
  Malappuram: 3844650,
  Kozhikode: 2500494,
  Wayanad: 623272,
  Kannur: 1941501,
  Kasaragod: 1015739,
};

export const healthSourceRoadmap = [
  { source: "eHealth / HMIS", feed: "Health records, registrations, visits, IMR/MMR", method: "REST API", frequency: "Weekly", module: "M-05, M-14" },
  { source: "KASP / SDHM", feed: "Health insurance and digital health KPIs", method: "REST API", frequency: "15 min", module: "KASP guarantee, health KPIs" },
  { source: "RCH / HMIS", feed: "Maternal, child health and SDG indicators", method: "REST API", frequency: "Weekly", module: "Health, SDG tracker" },
  { source: "Kerala Data Portal", feed: "Authoritative public datasets and recent health releases", method: "CSV / XLSX", frequency: "Dataset specific", module: "Health, SDG, reports" },
];

export const diseaseTrends: { name: string; color: string; data: TrendPoint[]; rag: "red" | "amber" | "green" }[] = [
  { name: "Dengue", color: "var(--color-rag-red)", rag: "red", data: mk([120, 140, 165, 210, 260, 330, 410, 520]) },
  { name: "Leptospirosis", color: "var(--color-c-orange)", rag: "amber", data: mk([40, 55, 48, 62, 70, 88, 76, 94]) },
  { name: "Chikungunya", color: "var(--color-c-violet)", rag: "amber", data: mk([20, 18, 26, 32, 28, 40, 44, 52]) },
];

export const hospitalCapacity = [
  { label: "ICU Beds", total: 4200, used: 3108, icon: "BedDouble" },
  { label: "General Beds", total: 38600, used: 27400, icon: "Hospital" },
  { label: "Oxygen (KL)", total: 220, used: 96, icon: "Wind" },
  { label: "Medicine Stock", total: 100, used: 18, icon: "Pill" },
];

export const districtHealthRisk: Record<string, number> = {
  Palakkad: 88, Wayanad: 82, Malappuram: 71, Thrissur: 64, Alappuzha: 67,
  Idukki: 70, Kasaragod: 66, Kollam: 52, Thiruvananthapuram: 58, Ernakulam: 44,
  Kottayam: 48, Pathanamthitta: 40, Kannur: 55, Kozhikode: 50,
};

export const specialistVacancy = [
  { dept: "Anaesthesiology", sanctioned: 420, vacant: 138, rag: "red" as const },
  { dept: "Paediatrics", sanctioned: 560, vacant: 96, rag: "amber" as const },
  { dept: "Radiology", sanctioned: 310, vacant: 112, rag: "red" as const },
  { dept: "General Medicine", sanctioned: 780, vacant: 84, rag: "amber" as const },
  { dept: "Obstetrics & Gynae", sanctioned: 490, vacant: 70, rag: "amber" as const },
];

export const healthAlerts = [
  { text: "Dengue outbreak threshold breached in Palakkad - positivity +34% WoW", rag: "red" as const, district: "Palakkad" },
  { text: "Leptospirosis cluster post-monsoon - Alappuzha & Kottayam", rag: "amber" as const, district: "Alappuzha" },
  { text: "ICU occupancy 91% at Kozhikode MCH - divert electives", rag: "amber" as const, district: "Kozhikode" },
  { text: "Anti-snake venom stock < 2 weeks in 3 districts", rag: "red" as const, district: "Wayanad" },
];

function mk(vals: number[]) {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  return vals.map((v, i) => ({ label: months[i], value: v }));
}
