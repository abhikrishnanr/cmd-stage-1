export const serviceDashboard = {
  source: "Kerala State IT Mission and C-DIT",
  dataset: "Kerala e-Services Dashboard",
  url: "https://dashboard.kerala.gov.in/e-services/index.php",
  basis: "Coverage listed on the dashboard",
  note: "Checked 27 Nov 2026",
};

export const serviceDirectory = {
  source: "Kerala State IT Mission and C-DIT",
  dataset: "Service-level data",
  url: "https://dashboard.kerala.gov.in/e-services/services.php",
  basis: "Each service has its own reporting period and update date",
};

export const sevanamReport = {
  source: "Department of Administrative Reforms and Public Grievances",
  dataset: "NeSDA Way Forward monthly report",
  url: "https://darpg.gov.in/sites/default/files/NeSDA_WF_Apr2026_Report.pdf",
  period: "April 2026",
  basis: "Services listed in e-Sevanam, as reported to NeSDA",
};

export const grievancesSnapshot = {
  source: "Chief Minister’s Public Grievance Redressal System",
  dataset: "Public grievance dashboard",
  url: "https://pop.cmo.kerala.gov.in/dashboard-en.php",
  period: "18 May to 26 Nov 2026",
  sourceUpdatedAt: "26 Nov 2026, 2:00 pm IST",
};

export const grievanceHelp = {
  source: "Chief Minister’s Office, Government of Kerala",
  dataset: "Help and grievance channels",
  url: "https://cmo.kerala.gov.in/help-en.php",
};

const eOffice = {
  source: "Kerala eOffice Citizen Portal",
  period: "2026 through 12 Oct",
  basis: "Sum of the current-year Files Created column",
  sourceUpdatedAt: "12 Oct 2026, 12:08 pm IST",
};

export const eOfficeCollectorates = {
  ...eOffice,
  dataset: "Collectorate eFile statistics",
  url: "https://eoffice.kerala.gov.in/EofficePortal/eFileTotalCol",
};

export const eOfficeSecretariat = {
  ...eOffice,
  dataset: "Secretariat eFile statistics",
  url: "https://eoffice.kerala.gov.in/EofficePortal/eFileTotalSec",
};

export const eOfficeCitizen = {
  source: "Kerala eOffice Citizen Portal",
  dataset: "File and tapal lookup",
  url: "https://eoffice.kerala.gov.in/EofficePortal/letterSearchRedirect",
};

export const collectorateFiles = [
  ["Alappuzha", 40971], ["Ernakulam", 61390], ["Idukki", 42787], ["Kannur", 64753],
  ["Kasaragod", 48725], ["Kollam", 54472], ["Kottayam", 34780], ["Kozhikode", 55316],
  ["Malappuram", 74738], ["Palakkad", 58550], ["Pathanamthitta", 45776],
  ["Thiruvananthapuram", 73624], ["Thrissur", 60647], ["Wayanad", 28074],
] as const;
