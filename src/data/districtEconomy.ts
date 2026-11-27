export const districtEconomyPeriod = "FY 2024–25 quick estimates";
export const districtEconomyChecked = "27 Nov 2026";

export const districtOutputSource = {
  publisher: "Kerala Department of Economics and Statistics",
  title: "District-wise GDP and NDP, 2024–25",
  url: "https://www.ecostat.kerala.gov.in/data-subset/627?hl=en-IN",
};

export const districtPerCapitaSource = {
  publisher: "Kerala State Planning Board",
  title: "Economic Review 2025, Table 1.1.7",
  url: "https://spb.kerala.gov.in/economic-review/ER2025/11.php?pid=11",
};

// Each row contains current-price GDDP in ₹ lakh, constant-price GDDP per
// capita in ₹, and the report's year-on-year change in per capita GDDP.
export const districtEconomy = {
  Thiruvananthapuram: [12434230, 197210, 6.14],
  Kollam: [11921776, 240198, 6.49],
  Pathanamthitta: [3353691, 156064, 10.14],
  Alappuzha: [10034071, 259190, 7.17],
  Kottayam: [8172545, 231382, 7.69],
  Idukki: [4414115, 205416, 6.61],
  Ernakulam: [16766190, 261319, 6.50],
  Thrissur: [13010405, 211972, 5.37],
  Palakkad: [8636426, 153028, 4.58],
  Malappuram: [10849285, 118760, 1.72],
  Kozhikode: [10447959, 166835, 5.19],
  Wayanad: [2271957, 128359, 4.99],
  Kannur: [8553015, 176390, 5.36],
  Kasaragod: [3987634, 149880, 4.23],
} as const;
