export const ecoStatCoverage = [
  { dataset: "Agricultural statistics", frequency: "Yearly", geography: "State and district", access: "Department file", coverage: "Area and production of major crops" },
  { dataset: "Daily price — 50 items", frequency: "Daily", geography: "14 district headquarters", access: "Online", coverage: "Essential commodities" },
  { dataset: "Daily price — 20 items", frequency: "Daily; weekly comparison", geography: "14 district headquarters", access: "Online", coverage: "Other important retail items" },
  { dataset: "Fruit prices", frequency: "Daily", geography: "14 district headquarters", access: "Online", coverage: "Separate wholesale and retail series" },
  { dataset: "Market Intelligence prices", frequency: "Daily", geography: "Major market centres", access: "Department file", coverage: "Centre-level wholesale quotations" },
  { dataset: "Consumer Price Index", frequency: "Monthly", geography: "17 centres", access: "Online", coverage: "Base 2011–12 = 100" },
  { dataset: "State income", frequency: "Yearly", geography: "State", access: "Department file", coverage: "GSDP and NSDP at current and constant prices" },
];

export const dailyEssentialMovers = [
  { commodity: "Tomato", unit: "kg", previous: 47.43, current: 48.77, change: 2.83 },
  { commodity: "Cucumber", unit: "kg", previous: 36.79, current: 37.69, change: 2.45 },
  { commodity: "Palmgur", unit: "kg", previous: 223.45, current: 228.8, change: 2.39 },
  { commodity: "Pumpkin", unit: "kg", previous: 29.43, current: 30, change: 1.94 },
  { commodity: "Plantain green", unit: "kg", previous: 51.79, current: 52.69, change: 1.74 },
  { commodity: "Onion small", unit: "kg", previous: 163.57, current: 166.15, change: 1.58 },
  { commodity: "Beans Nadan / Achingapayar", unit: "kg", previous: 58.33, current: 52.5, change: -9.99 },
  { commodity: "Beans Nadan / Vallippayar", unit: "kg", previous: 68.71, current: 66.54, change: -3.16 },
  { commodity: "Bittergourd", unit: "kg", previous: 76.79, current: 74.62, change: -2.83 },
  { commodity: "Ash gourd", unit: "kg", previous: 36.64, current: 35.69, change: -2.59 },
  { commodity: "Beans Nadan / Amarakka", unit: "kg", previous: 54.08, current: 52.75, change: -2.46 },
];

export const staplePrices = [
  { commodity: "Rice Matta", price: 56.85, unit: "kg" },
  { commodity: "Coconut oil loose", price: 292.08, unit: "litre" },
  { commodity: "Coconut oil Kera", price: 288.85, unit: "litre" },
  { commodity: "Potato", price: 40, unit: "kg" },
];

export const monthlyAnnualMovers = [
  { commodity: "Onion small", price: 166.15, unit: "kg", monthly: 33.53, annual: 119.66 },
  { commodity: "Onion big", price: 62.31, unit: "kg", monthly: 5.61, annual: 126.58 },
  { commodity: "Brinjal", price: 62.31, unit: "kg", monthly: 32.38, annual: 15.24 },
  { commodity: "Ladies finger", price: 57, unit: "kg", monthly: 26.47, annual: -3.62 },
  { commodity: "Tomato", price: 48.77, unit: "kg", monthly: 25.73, annual: -22.67 },
  { commodity: "Rice Massoori", price: null, unit: "kg", monthly: 12.82, annual: 33.33 },
  { commodity: "Garlic", price: 27.15, unit: "100 g", monthly: 6.18, annual: 92.01 },
  { commodity: "Coriander", price: 221.92, unit: "kg", monthly: 3.53, annual: 84.27 },
  { commodity: "Cucumber", price: 37.69, unit: "kg", monthly: -17.94, annual: 16.72 },
  { commodity: "Banana green", price: 52.69, unit: "kg", monthly: -11.96, annual: 45.32 },
  { commodity: "Coconut oil loose", price: 292.08, unit: "litre", monthly: null, annual: -30.35 },
  { commodity: "Coconut oil Kera", price: 288.85, unit: "litre", monthly: null, annual: -35.36 },
];

export const fruitRetailMovers = [
  { commodity: "Apple Washington", previous: 225, current: 250, change: 11.11 },
  { commodity: "Guava Nadan", previous: 105, current: 115, change: 9.52 },
  { commodity: "Orange Australian", previous: 260, current: 240, change: -7.69 },
  { commodity: "Grapes juice", previous: 88.75, current: 81.25, change: -8.45 },
  { commodity: "Pineapple Muvattupuzha", previous: 59, current: 53.33, change: -9.61 },
  { commodity: "Banana Pandy", previous: 76.58, current: 72.75, change: -5 },
];

export const fruitWholesaleMovers = [
  { commodity: "Guava Madhura", previous: 7500, current: 8333.33, change: 11.11 },
  { commodity: "Orange Amaravathy", previous: 6000, current: 6500, change: 8.33 },
  { commodity: "Apple Washington", previous: 18500, current: 20000, change: 8.11 },
  { commodity: "Grapes juice", previous: 6737.5, current: 5675, change: -15.77 },
  { commodity: "Apple Fuji", previous: 27500, current: 23300, change: -15.27 },
  { commodity: "Pineapple Muvattupuzha", previous: 4576.92, current: 4115.38, change: -10.08 },
];

export const additionalRetailItems = [
  { commodity: "Chicken broiler live", unit: "kg", previous: 147.57, current: 141.64, change: -4.02 },
  { commodity: "Chicken broiler dressed", unit: "kg", previous: 230.54, current: 222, change: -3.7 },
  { commodity: "Pepper Nadan", unit: "kg", previous: 814.17, current: 810, change: -0.51 },
  { commodity: "Arecanut", unit: "100 nos.", previous: 428.93, current: 432.5, change: 0.83 },
  { commodity: "Betel leaves", unit: "100 nos.", previous: 104.86, current: 105.71, change: 0.81 },
];

export const marketIntelligenceMovers = [
  { commodity: "Rubber Lot", centre: "Idukki", unit: "quintal", previous: 25500, current: 24000, change: -1500 },
  { commodity: "Rubber RSS 4", centre: "Idukki", unit: "quintal", previous: 27500, current: 26200, change: -1300 },
  { commodity: "Rubber RSS 5", centre: "Idukki", unit: "quintal", previous: 26700, current: 25400, change: -1300 },
  { commodity: "Pepper Ungarbled", centre: "Kattappana", unit: "quintal", previous: 75400, current: 74300, change: -1100 },
  { commodity: "Rubber RSS 5", centre: "Nedumangad", unit: "quintal", previous: 26500, current: 25500, change: -1000 },
  { commodity: "Rubber Lot", centre: "Nedumangad", unit: "quintal", previous: 24000, current: 23000, change: -1000 },
  { commodity: "Coconut without husk", centre: "Kollam", unit: "thousand", previous: 5500, current: 5700, change: 200 },
  { commodity: "Copra sundried", centre: "Ernakulam", unit: "quintal", previous: 16000, current: 16100, change: 100 },
  { commodity: "Coconut oil cake", centre: "Thrissur", unit: "quintal", previous: 3400, current: 3500, change: 100 },
  { commodity: "Coconut without husk", centre: "Mananthavady", unit: "thousand", previous: 4600, current: 4700, change: 100 },
  { commodity: "Copra sundried", centre: "Irinjalakuda", unit: "quintal", previous: 16815, current: 16850, change: 35 },
];

export const marketIntelligenceReferences = [
  { commodity: "Coconut Oil (Kochi Ready)", centre: "Kochi", unit: "quintal", price: 25000 },
  { commodity: "Pepper Garbled", centre: "Kochi", unit: "quintal", price: 77500 },
  { commodity: "Pepper Nadan", centre: "Kozhikode", unit: "quintal", price: 69500 },
  { commodity: "Cardamom Green", centre: "Kozhikode / Mananthavady", unit: "kg", price: 3500 },
  { commodity: "Cardamom AGL", centre: "Kochi", unit: "kg", price: 4100 },
];

export const cpiCentres = [
  { centre: "Thiruvananthapuram", september: 226, october: 225 },
  { centre: "Kollam", september: 224, october: 225 },
  { centre: "Punalur", september: 219, october: 220 },
  { centre: "Pathanamthitta", september: 237, october: 238 },
  { centre: "Alappuzha", september: 227, october: 226 },
  { centre: "Kottayam", september: 237, october: 238 },
  { centre: "Mundakayam", september: 238, october: 239 },
  { centre: "Idukki", september: 232, october: 234 },
  { centre: "Ernakulam", september: 219, october: 220 },
  { centre: "Chalakudy", september: 231, october: 232 },
  { centre: "Thrissur", september: 235, october: 235 },
  { centre: "Palakkad", september: 213, october: 213 },
  { centre: "Malappuram", september: 230, october: 229 },
  { centre: "Kozhikode", september: 232, october: 232 },
  { centre: "Wayanad", september: 225, october: 227 },
  { centre: "Kannur", september: 231, october: 233 },
  { centre: "Kasaragod", september: 246, october: 246 },
];

export const cpiSummary = {
  period: "October 2026",
  published: "24 Nov 2026",
  septemberAverage: 229.53,
  octoberAverage: 230.12,
  pointChange: 0.59,
  increased: 10,
  decreased: 3,
  unchanged: 4,
};
