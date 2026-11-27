import { districts } from "./districts";
import { Rag } from "./types";

export const educationUpdatedAt = "15 Jun 2026, 11:40 AM";

export const educationKpis = [
  { label: "Total Students", value: "59.8 L", sub: "+1.8% YoY | +6.4% 5Y", icon: "Users", rag: "green" as Rag },
  { label: "Educational Institutions", value: "18,742", sub: "+312 YoY", icon: "School", rag: "green" as Rag },
  { label: "Government Institutions", value: "5,912", sub: "state owned", icon: "Landmark", rag: "green" as Rag },
  { label: "Govt + Aided Schools", value: "11,418", sub: "school network", icon: "Building2", rag: "green" as Rag },
  { label: "Colleges", value: "1,426", sub: "arts, science, professional", icon: "GraduationCap", rag: "blue" as Rag },
  { label: "Universities", value: "16", sub: "state, deemed and specialised", icon: "University", rag: "green" as Rag },
  { label: "Technical Institutions", value: "412", sub: "engineering, polytechnic, ITI", icon: "Cpu", rag: "amber" as Rag },
  { label: "Medical and Allied", value: "286", sub: "medical, nursing, pharmacy", icon: "Stethoscope", rag: "amber" as Rag },
  { label: "Skill Centres", value: "612", sub: "ASAP, KASE, CSP", icon: "Wrench", rag: "blue" as Rag },
  { label: "Sanctioned Capacity", value: "68.4 L", sub: "+4.1% 5Y", icon: "PanelTop", rag: "green" as Rag },
  { label: "Current Enrolment", value: "59.8 L", sub: "87.4% filled", icon: "UserCheck", rag: "green" as Rag },
  { label: "Capacity Utilisation", value: "87.4%", sub: "-1.2 pp YoY", icon: "Gauge", rag: "amber" as Rag },
  { label: "Academic Staff", value: "2.74 L", sub: "teachers and faculty", icon: "UserRoundCheck", rag: "green" as Rag },
  { label: "Student-Teacher Ratio", value: "22:1", sub: "state average", icon: "Ratio", rag: "green" as Rag },
  { label: "Infra Upgrade Needed", value: "1,284", sub: "safety or digital gaps", icon: "HardHat", rag: "amber" as Rag },
  { label: "Scholarship Support", value: "18.6 L", sub: "students assisted", icon: "BadgeIndianRupee", rag: "green" as Rag },
];

export const educationPipeline = [
  ["Pre-primary", 5260, 428000, 510000, 84, 96, 1.8, 98],
  ["Primary", 6810, 1420000, 1590000, 89, 98, 0.8, 97],
  ["Upper Primary", 4725, 1030000, 1175000, 88, 97, 1.1, 96],
  ["High School", 3184, 970000, 1080000, 90, 99, 0.9, 94],
  ["Higher Secondary", 2310, 746000, 812000, 92, 86, 2.4, 82],
  ["Vocational HSS", 389, 69500, 88000, 79, 81, 4.8, 74],
  ["ITI / Polytechnic", 342, 118000, 151000, 78, 76, 5.3, 68],
  ["Arts and Science", 812, 684000, 780000, 88, 82, 6.1, 71],
  ["Engineering", 168, 128000, 198000, 65, 72, 8.6, 64],
  ["Medical and Allied", 286, 106000, 121000, 88, 91, 2.9, 86],
  ["Universities", 16, 188000, 225000, 84, 88, 3.8, 76],
  ["Skill Development", 612, 214000, 340000, 63, 73, 9.4, 58],
  ["Employment / Entrepreneurship", 0, 162000, 0, 0, 0, 0, 0],
].map(([stage, institutions, enrolment, capacity, utilisation, pass, dropout, transition]) => ({ stage, institutions, enrolment, capacity, utilisation, pass, dropout, transition }));

export const educationInventoryTabs = [
  {
    id: "school",
    label: "School Education",
    icon: "School",
    rows: [
      ["Government LP schools", 2488, 2488, 565000, 512000, 53000, 24500, 8200, "21:1", 26800, 86, 92, 89, 74, 81],
      ["Government UP schools", 1840, 1840, 402000, 361000, 41000, 18800, 6100, "19:1", 19400, 82, 90, 87, 70, 78],
      ["Government high schools", 1126, 1126, 368000, 342000, 26000, 16200, 5200, "21:1", 17400, 91, 94, 86, 73, 80],
      ["Government higher secondary", 931, 931, 284000, 271000, 13000, 12900, 4200, "21:1", 15200, 88, 93, 83, 68, 76],
      ["Vocational higher secondary", 389, 389, 88000, 69500, 18500, 4200, 1600, "17:1", 6100, 78, 84, 71, 62, 69],
      ["Aided schools", 5506, 0, 2100000, 1930000, 170000, 96500, 29800, "20:1", 72100, 84, 90, 79, 66, 74],
      ["Special schools", 312, 82, 29000, 23600, 5400, 2900, 1500, "8:1", 3800, 71, 78, 69, 82, 65],
      ["Model residential schools", 37, 37, 13200, 12100, 1100, 720, 360, "17:1", 11800, 82, 89, 74, 79, 72],
      ["Tribal schools", 128, 96, 38400, 31800, 6600, 2100, 780, "15:1", 14200, 68, 74, 63, 69, 58],
      ["Fisheries schools", 52, 41, 15600, 13900, 1700, 820, 310, "17:1", 3600, 73, 81, 66, 71, 64],
    ],
  },
  {
    id: "higher",
    label: "Higher Education",
    icon: "University",
    rows: [
      ["Government colleges", 196, 196, 132000, 121000, 11000, 7200, 3100, "17:1", 18500, 94, 96, 91, 82, 84],
      ["Aided colleges", 185, 0, 156000, 148000, 8000, 8100, 3400, "18:1", 22100, 92, 95, 89, 78, 82],
      ["Private colleges", 554, 0, 278000, 231000, 47000, 11400, 5200, "20:1", 31500, 86, 91, 84, 73, 76],
      ["Arts and science colleges", 812, 192, 780000, 684000, 96000, 31500, 13200, "22:1", 82200, 88, 93, 86, 75, 79],
      ["Autonomous colleges", 36, 7, 68000, 64100, 3900, 3100, 820, "21:1", 9400, 96, 98, 93, 84, 88],
      ["Universities", 16, 12, 225000, 188000, 37000, 8200, 3600, "23:1", 26600, 91, 94, 88, 76, 81],
      ["University study centres", 72, 64, 51000, 38800, 12200, 1600, 820, "24:1", 3100, 79, 86, 82, 67, 71],
      ["Distance education centres", 18, 14, 84000, 64200, 19800, 980, 420, "65:1", 900, 76, 92, 71, 58, 68],
    ],
  },
  {
    id: "technical",
    label: "Technical and Professional",
    icon: "Cpu",
    rows: [
      ["Engineering colleges", 168, 12, 198000, 128000, 70000, 8900, 4200, "14:1", 26800, 96, 97, 91, 78, 74],
      ["Polytechnic colleges", 76, 51, 62000, 50400, 11600, 4100, 1900, "12:1", 11800, 93, 95, 87, 76, 78],
      ["ITIs", 98, 82, 89000, 67600, 21400, 3600, 1800, "19:1", 9500, 86, 90, 76, 68, 70],
      ["Architecture colleges", 24, 2, 9800, 6100, 3700, 680, 260, "9:1", 2200, 94, 96, 90, 80, 77],
      ["Management institutes", 112, 6, 43000, 27600, 15400, 2100, 950, "13:1", 7800, 88, 92, 86, 72, 73],
      ["Law colleges", 31, 5, 16200, 13900, 2300, 740, 290, "19:1", 3300, 91, 94, 88, 78, 82],
      ["Teacher education colleges", 87, 12, 24200, 19800, 4400, 1300, 610, "15:1", 5100, 84, 88, 81, 72, 76],
      ["Nursing colleges", 151, 17, 48400, 43100, 5300, 3200, 1300, "13:1", 21400, 92, 96, 91, 82, 84],
      ["Pharmacy colleges", 62, 5, 22800, 18100, 4700, 1400, 620, "13:1", 6100, 90, 93, 88, 76, 79],
      ["Medical colleges", 37, 12, 21100, 19700, 1400, 6400, 4100, "3:1", 14400, 98, 99, 96, 86, 88],
      ["Dental colleges", 24, 4, 6400, 5400, 1000, 1200, 620, "5:1", 3600, 96, 98, 94, 84, 86],
      ["Ayurveda colleges", 19, 5, 5200, 4700, 500, 940, 410, "5:1", 2700, 94, 96, 90, 81, 83],
      ["Homoeopathy colleges", 7, 3, 2100, 1900, 200, 360, 160, "5:1", 1200, 92, 96, 88, 79, 81],
      ["Veterinary colleges", 2, 2, 980, 920, 60, 240, 120, "4:1", 800, 98, 99, 96, 84, 86],
      ["Agriculture and fisheries", 12, 9, 6200, 5100, 1100, 680, 310, "8:1", 2900, 91, 94, 86, 75, 80],
    ],
  },
  {
    id: "skill",
    label: "Skill Development",
    icon: "Wrench",
    rows: [
      ["ASAP centres", 164, 164, 92000, 68400, 23600, 2200, 810, "31:1", 8200, 86, 94, 92, 70, 78],
      ["KASE centres", 84, 84, 47000, 31600, 15400, 1200, 460, "26:1", 3200, 78, 89, 86, 64, 70],
      ["Community skill parks", 18, 18, 26000, 19200, 6800, 760, 320, "25:1", 4100, 92, 96, 94, 80, 84],
      ["Industrial training centres", 98, 82, 89000, 67600, 21400, 3600, 1800, "19:1", 9500, 86, 90, 76, 68, 70],
      ["Apprenticeship centres", 74, 42, 38000, 24100, 13900, 820, 310, "29:1", 1200, 71, 84, 79, 58, 64],
      ["Sector skill centres", 68, 44, 42000, 28200, 13800, 980, 420, "28:1", 2100, 78, 88, 82, 62, 69],
      ["Digital skill centres", 86, 63, 56000, 41800, 14200, 1100, 390, "38:1", 1800, 84, 97, 96, 66, 76],
      ["Startup training centres", 20, 12, 12000, 8100, 3900, 240, 110, "34:1", 700, 76, 92, 91, 61, 70],
    ],
  },
];

export const educationDistrictMetrics = Object.fromEntries(
  districts.map((d, i) => {
    const base = [72, 66, 61, 69, 74, 58, 82, 78, 64, 92, 80, 55, 73, 62][i] || 70;
    return [d.name, {
      students: Math.round(base * 8500),
      schoolCapacity: base + 8,
      plusTwoCapacity: base - (d.name === "Malappuram" ? 18 : d.name === "Wayanad" ? 14 : 3),
      higherEdCapacity: base - (d.name === "Wayanad" ? 22 : 6),
      engineeringCapacity: base - 10,
      medicalCapacity: base - 15,
      skillCapacity: base - 8,
      hostelCapacity: base - 12,
      teacherVacancies: 100 - base,
      infraGap: Math.max(12, 98 - base),
      utilisation: Math.min(96, base + 12),
      passPct: Math.min(99, base + 16),
    }];
  })
);

export const learningOutcomes = [
  ["SSLC / Class 10", 422000, 418200, 99.1, 38, 0.6, 94],
  ["Higher Secondary", 386000, 331800, 86.0, 24, 2.1, 78],
  ["Vocational Higher Secondary", 52400, 42440, 81.0, 16, 4.5, 66],
  ["Arts degree programmes", 164000, 136120, 83.0, 21, 5.4, 69],
  ["Science degree programmes", 98200, 84158, 85.7, 28, 4.6, 74],
  ["Commerce degree programmes", 142000, 120700, 85.0, 25, 4.9, 71],
  ["Engineering", 52000, 37440, 72.0, 18, 8.2, 64],
  ["Polytechnic", 38600, 29722, 77.0, 20, 6.4, 68],
  ["ITI", 44200, 34476, 78.0, 17, 6.9, 72],
  ["Medical", 6900, 6279, 91.0, 48, 1.4, 86],
  ["Dental", 2100, 1806, 86.0, 32, 2.2, 78],
  ["Nursing", 16200, 14742, 91.0, 41, 1.8, 84],
  ["Pharmacy", 8200, 7216, 88.0, 35, 2.4, 80],
  ["Ayurveda", 1900, 1672, 88.0, 31, 2.6, 78],
  ["Homoeopathy", 840, 722, 86.0, 29, 2.8, 77],
  ["Law", 4600, 3910, 85.0, 24, 3.3, 73],
  ["Teacher education", 7600, 6688, 88.0, 36, 2.1, 82],
  ["University PG", 41200, 35844, 87.0, 33, 3.7, 76],
  ["Skill certification", 124000, 90520, 73.0, 14, 8.8, 58],
].map(([label, appeared, passed, passPct, distinction, dropout, progression]) => ({ label, appeared, passed, passPct, distinction, dropout, progression }));

export const demandMatrix = [
  ["Plus One Science", "Malappuram, Palakkad", 112000, 91300, 87600, -20700, 42, "red"],
  ["Plus One Commerce", "Ernakulam, Thrissur", 88000, 96200, 82100, 8200, 0, "green"],
  ["Vocational streams", "Kasaragod, Wayanad", 42000, 28600, 21800, -13400, 22, "red"],
  ["UG Arts", "Statewide", 178000, 184000, 162000, 6000, 0, "green"],
  ["UG Science", "Malappuram, Kollam", 98000, 84200, 80100, -13800, 28, "amber"],
  ["AI / Data Science", "Kochi, Kozhikode, Trivandrum", 38000, 17400, 16300, -20600, 36, "red"],
  ["Nursing", "Idukki, Wayanad, Kasaragod", 32000, 24400, 23100, -7600, 18, "amber"],
  ["ITI trades", "Industrial belts", 52000, 61200, 44700, 9200, 0, "amber"],
].map(([course, districts, demand, seats, filled, gap, batches, rag]) => ({ course, districts, demand, seats, filled, gap, batches, rag: rag as Rag }));

export const teacherWorkforce = [
  { label: "Sanctioned teaching posts", value: 286400, filled: 263800, rag: "amber" as Rag },
  { label: "Permanent staff", value: 221500, filled: 221500, rag: "green" as Rag },
  { label: "Contract staff", value: 27600, filled: 27600, rag: "blue" as Rag },
  { label: "Guest faculty", value: 14700, filled: 14700, rag: "amber" as Rag },
  { label: "Daily-wage staff", value: 4200, filled: 4200, rag: "amber" as Rag },
  { label: "Vacancies", value: 22600, filled: 0, rag: "red" as Rag },
  { label: "Upcoming retirements", value: 11840, filled: 0, rag: "amber" as Rag },
  { label: "No permanent head", value: 642, filled: 0, rag: "red" as Rag },
];

export const infraProjects = [
  { project: "New school buildings", district: "Malappuram", cost: "Rs 184 Cr", source: "KIIFB", physical: 72, financial: 61, due: "Oct 2026", delay: "Amber", agency: "General Education", bottleneck: "Land handover" },
  { project: "Laboratory upgrades", district: "Wayanad", cost: "Rs 42 Cr", source: "Plan", physical: 48, financial: 39, due: "Dec 2026", delay: "Red", agency: "KITE / Education", bottleneck: "Procurement" },
  { project: "Smart classrooms", district: "Statewide", cost: "Rs 210 Cr", source: "KIIFB", physical: 84, financial: 78, due: "Sep 2026", delay: "Green", agency: "KITE", bottleneck: "Final installation" },
  { project: "Girls hostel capacity", district: "Idukki", cost: "Rs 36 Cr", source: "SC/ST + Plan", physical: 57, financial: 52, due: "Jan 2027", delay: "Amber", agency: "Higher Education", bottleneck: "Contractor mobilisation" },
  { project: "College library modernisation", district: "Kozhikode", cost: "Rs 18 Cr", source: "RUSA", physical: 69, financial: 66, due: "Aug 2026", delay: "Green", agency: "Collegiate Education", bottleneck: "Furniture supply" },
];

export const supportStats = [
  ["Scholarship beneficiaries", "18.6 L", "Rs 1,248 Cr sanctioned", "green"],
  ["Amount disbursed", "Rs 1,104 Cr", "88.5% released", "amber"],
  ["Pending applications", "1.42 L", "verification queue", "amber"],
  ["Free uniforms", "22.4 L", "school students", "green"],
  ["Textbooks", "31.8 L", "99% distributed", "green"],
  ["Mid-day meal coverage", "26.2 L", "daily coverage", "green"],
  ["Transport support", "3.8 L", "rural and special routes", "blue"],
  ["Hostel support", "1.14 L", "girls, tribal and remote students", "amber"],
  ["Digital device support", "2.1 L", "bridge learning gap", "blue"],
  ["At-risk students", "41,800", "dropout prevention", "red"],
].map(([label, value, sub, rag]) => ({ label, value, sub, rag: rag as Rag }));

export const skillStats = [
  { label: "Skill enrolment", value: "2.14 L", icon: "Users", rag: "blue" as Rag },
  { label: "Training completed", value: "1.62 L", icon: "CheckCircle2", rag: "green" as Rag },
  { label: "Certified candidates", value: "1.31 L", icon: "BadgeCheck", rag: "green" as Rag },
  { label: "Apprenticeships", value: "48,200", icon: "Handshake", rag: "amber" as Rag },
  { label: "Placement", value: "58%", icon: "BriefcaseBusiness", rag: "amber" as Rag },
  { label: "Avg salary", value: "Rs 18,400", icon: "IndianRupee", rag: "blue" as Rag },
  { label: "Entrepreneurs", value: "8,600", icon: "Rocket", rag: "green" as Rag },
  { label: "Industry-linked courses", value: "214", icon: "Factory", rag: "blue" as Rag },
];

export const aiEducationInsights = [
  { title: "Plus Two science seats below projected demand", evidence: "Malappuram SSLC transition demand exceeds sanctioned science seats by 20,700.", districts: "Malappuram, Palakkad", students: "20,700", action: "Add 42 science batches and redistribute labs.", investment: "Rs 31 Cr", priority: "Critical", dept: "General Education", outcome: "Reduce out-district migration and admission pressure." },
  { title: "Engineering branch mismatch", evidence: "Legacy branches show low enrolment while AI, data science and cyber security demand is rising.", districts: "Ernakulam, Kozhikode, Thiruvananthapuram", students: "18,400", action: "Convert low-demand batches into emerging-tech seats.", investment: "Rs 46 Cr", priority: "High", dept: "Higher Education / Technical Education", outcome: "Improve utilisation and employability." },
  { title: "Remote higher-education capacity gap", evidence: "Wayanad has low college capacity relative to school-leaver population and travel distance.", districts: "Wayanad, Idukki", students: "9,600", action: "Satellite college centres and girls hostel expansion.", investment: "Rs 58 Cr", priority: "High", dept: "Higher Education", outcome: "Higher participation among remote and girls students." },
  { title: "Maths and physics faculty risk", evidence: "Retirements next year overlap with current vacancy clusters.", districts: "Kollam, Palakkad, Kasaragod", students: "74,000", action: "Advance recruitment panel and guest faculty bridge pool.", investment: "Rs 24 Cr", priority: "High", dept: "General Education", outcome: "Protect science pass rates." },
  { title: "Skill training not aligned to local demand", evidence: "Some centres train for low-demand sectors while healthcare, logistics and electronics jobs remain open.", districts: "Kannur, Thrissur, Alappuzha", students: "12,800", action: "Realign 36 courses with district employment signals.", investment: "Rs 18 Cr", priority: "Medium", dept: "Labour and Skill", outcome: "Raise placement rate from 58% to 68%." },
];

export const educationAlerts = [
  { text: "Critical mathematics teacher vacancies", district: "Kasaragod", rag: "red" as Rag, owner: "General Education" },
  { text: "Plus Two science seat shortage", district: "Malappuram", rag: "red" as Rag, owner: "General Education" },
  { text: "Low engineering utilisation in selected branches", district: "Statewide", rag: "amber" as Rag, owner: "Technical Education" },
  { text: "Scholarship payment verification delay", district: "Kollam", rag: "amber" as Rag, owner: "Higher Education" },
  { text: "Accreditation renewal due in 90 days", district: "Ernakulam", rag: "amber" as Rag, owner: "University" },
  { text: "Hostel safety repair required", district: "Idukki", rag: "red" as Rag, owner: "Higher Education" },
];

export const bottomEducationWatch = {
  topDistricts: ["Kozhikode", "Ernakulam", "Thrissur", "Kottayam", "Pathanamthitta"],
  interventionDistricts: ["Wayanad", "Kasaragod", "Palakkad", "Malappuram"],
  topInstitutions: ["University College TVM", "Maharaja's College", "Govt Medical College Kozhikode", "College of Engineering TVM"],
  criticalInstitutions: ["Remote tribal schools", "Low-utilisation engineering branches", "Hostels awaiting safety repair"],
  calendar: ["SSLC model exam - Jan 2027", "Plus One admission window - Jun 2026", "University accreditation renewals - Sep 2026", "KIIFB classroom deadline - Oct 2026"],
};
