import type { DataProvenance } from "@/components/DataProvenance";
import { slugify } from "./districts";

const checked = "27 Nov 2026";

export const districtDirectorySource = {
  source: "Chief Electoral Officer, Kerala",
  dataset: "District Election Officers and District Collectors",
  url: "https://www.ceo.kerala.gov.in/telephone-numbers",
  basis: "Election directory used to cross-check the collectors named on the district portals.",
  sourceUpdatedAt: null,
  fetchedAt: checked,
} satisfies DataProvenance;

export const districtPopulationSource = {
  source: "Census of India",
  dataset: "A-02 Decadal Variation in Population, Kerala",
  period: "2011 Census",
  url: "https://censusindia.gov.in/nada/index.php/catalog/43365",
  basis: "Census count",
  fetchedAt: checked,
} satisfies DataProvenance;

export const districtLocalBodiesSource = {
  source: "Comptroller and Auditor General of India",
  dataset: "Kerala local self-government audit, Tables 2.1 and 4.1",
  period: "Year ended March 2024",
  url: "https://cag.gov.in/en/audit-report/details/125849",
  basis: "Published district counts of rural and urban local bodies",
  fetchedAt: checked,
} satisfies DataProvenance;

interface DistrictAdministration {
  name: string;
  collector: string;
  profile: string;
  collectorSource: DataProvenance;
  contact: string;
  office: string;
  phone: string;
  email: string;
  population: number;
  gramaPanchayats: number;
  blockPanchayats: number;
  municipalities: number;
  corporations: number;
}

const directory: ReadonlyArray<Omit<DistrictAdministration, "collectorSource"> & { profileUpdatedOn: string }> = [
  {
    name: "Thiruvananthapuram", collector: "Anju K. S. IAS",
    profile: "https://trivandrum.nic.in/en/district-collector-district-magistrate/",
    profileUpdatedOn: "3 Oct 2026",
    contact: "https://trivandrum.nic.in/en/about-district/whos-who/",
    office: "District Collectorate, Civil Station, Kudappanakkunnu, Thiruvananthapuram 695043",
    phone: "0471-2731177", email: "dctvm.ker@nic.in",
    population: 3301427, gramaPanchayats: 73, blockPanchayats: 11, municipalities: 4, corporations: 1,
  },
  {
    name: "Kollam", collector: "Anie Jula Thomas IAS",
    profile: "https://kollam.nic.in/en/district-collector/",
    profileUpdatedOn: "7 Oct 2026",
    contact: "https://kollam.nic.in/en/whoswho/aniejulathomas-ias/",
    office: "District Collectorate, Kollam 691013",
    phone: "0474-2794900", email: "dcklm.ker@nic.in",
    population: 2635375, gramaPanchayats: 68, blockPanchayats: 11, municipalities: 4, corporations: 1,
  },
  {
    name: "Pathanamthitta", collector: "Nizamudeen A. IAS",
    profile: "https://pathanamthitta.nic.in/en/district-collector/",
    profileUpdatedOn: "29 May 2026",
    contact: "https://pathanamthitta.nic.in/en/contact-us/",
    office: "Second floor, District Collectorate, Pathanamthitta",
    phone: "0468-2222505", email: "dcpta.ker@nic.in",
    population: 1197412, gramaPanchayats: 53, blockPanchayats: 8, municipalities: 4, corporations: 0,
  },
  {
    name: "Alappuzha", collector: "Shaji V. Nair IAS",
    profile: "https://alappuzha.nic.in/en/district-collector/",
    profileUpdatedOn: "28 Sep 2026",
    contact: "https://alappuzha.nic.in/en/district-collector/",
    office: "First floor, Collectorate, Alappuzha 688001",
    phone: "0477-2251720", email: "dc-alz@gov.in",
    population: 2127789, gramaPanchayats: 72, blockPanchayats: 12, municipalities: 6, corporations: 0,
  },
  {
    name: "Kottayam", collector: "Chetan Kumar Meena IAS",
    profile: "https://kottayam.nic.in/en/contact-details/",
    profileUpdatedOn: "16 Dec 2025",
    contact: "https://kottayam.nic.in/en/contact-details/",
    office: "District Collectorate, Kottayam 686002",
    phone: "0481-2562001", email: "dc-ktm@gov.in",
    population: 1974551, gramaPanchayats: 71, blockPanchayats: 11, municipalities: 6, corporations: 0,
  },
  {
    name: "Idukki", collector: "Dr. Dinesan Cheruvat IAS",
    profile: "https://idukki.nic.in/en/about-district/collectorsprofile/",
    profileUpdatedOn: "14 Aug 2025",
    contact: "https://idukki.nic.in/en/about-district/collectorsprofile/",
    office: "Collectorate, Kuyilimala, Painavu P.O., Idukki 685603",
    phone: "04862-233103", email: "dcidk.ker@nic.in",
    population: 1108974, gramaPanchayats: 52, blockPanchayats: 8, municipalities: 2, corporations: 0,
  },
  {
    name: "Ernakulam", collector: "Priyanka G. IAS",
    profile: "https://ernakulam.nic.in/en/divisions/collectorate/",
    profileUpdatedOn: "17 Nov 2026",
    contact: "https://ernakulam.nic.in/en/divisions/collectorate/",
    office: "Collectorate, Kakkanad, Ernakulam 682030",
    phone: "0484-2423001", email: "dcekm.ker@nic.in",
    population: 3282388, gramaPanchayats: 82, blockPanchayats: 14, municipalities: 13, corporations: 1,
  },
  {
    name: "Thrissur", collector: "Sikha Surendran IAS",
    profile: "https://thrissur.nic.in/en/whoswho/shri-sikha-surendran-ias-2/",
    profileUpdatedOn: "3 Mar 2026",
    contact: "https://thrissur.nic.in/en/divisions/revenue/",
    office: "Civil Station, Ayyanthole, Thrissur 680003",
    phone: "0487-2361020", email: "tsrcoll.ker@nic.in",
    population: 3121200, gramaPanchayats: 86, blockPanchayats: 16, municipalities: 7, corporations: 1,
  },
  {
    name: "Palakkad", collector: "Sudhir K. IAS",
    profile: "https://palakkad.nic.in/en/district-collector-profiles/",
    profileUpdatedOn: "26 May 2026",
    contact: "https://palakkad.nic.in/en/whoswho/district-collector-district-magistrate/",
    office: "Civil Station, Palakkad 678001",
    phone: "0491-2505309", email: "dcpkd.ker@nic.in",
    population: 2809934, gramaPanchayats: 88, blockPanchayats: 13, municipalities: 7, corporations: 0,
  },
  {
    name: "Malappuram", collector: "Dr. Vinay Goyal IAS",
    profile: "https://malappuram.nic.in/en/district-collector/",
    profileUpdatedOn: "15 Jun 2026",
    contact: "https://malappuram.nic.in/en/about-district/whos-who/",
    office: "Collectorate, Civil Station, Malappuram",
    phone: "0483-2734355", email: "dcmlp.ker@nic.in",
    population: 4112920, gramaPanchayats: 94, blockPanchayats: 15, municipalities: 12, corporations: 0,
  },
  {
    name: "Kozhikode", collector: "M. S. Madhavikutty IAS",
    profile: "https://kozhikode.nic.in/en/district-collector/",
    profileUpdatedOn: "13 Oct 2026",
    contact: "https://kozhikode.nic.in/en/about-district/whos-who/",
    office: "Kozhikode Collectorate, Civil Station P.O., Kozhikode 673020",
    phone: "0495-2371400", email: "dckzk.ker@nic.in",
    population: 3086293, gramaPanchayats: 70, blockPanchayats: 12, municipalities: 7, corporations: 1,
  },
  {
    name: "Wayanad", collector: "Chelsasini V. IAS",
    profile: "https://wayanad.gov.in/en/district-magistrate-district-collector-wayanad/",
    profileUpdatedOn: "16 Sep 2026",
    contact: "https://wayanad.gov.in/en/tribal-cell-helpline/",
    office: "District Collectorate, Civil Station, North Kalpetta P.O., Wayanad",
    phone: "04936-202230", email: "dcwayanad@kerala.gov.in",
    population: 817420, gramaPanchayats: 23, blockPanchayats: 4, municipalities: 3, corporations: 0,
  },
  {
    name: "Kannur", collector: "P. Vishnu Raj IAS",
    profile: "https://kannur.nic.in/en/list-of-collectors/",
    profileUpdatedOn: "30 Sep 2026",
    contact: "https://kannur.nic.in/en/whos-who/",
    office: "District Collectorate, Civil Station, Collectorate Road, Kannur 670002",
    phone: "0497-2700243", email: "dcknr.ker@nic.in",
    population: 2523003, gramaPanchayats: 71, blockPanchayats: 11, municipalities: 9, corporations: 1,
  },
  {
    name: "Kasaragod", collector: "Sreedhanya Suresh IAS",
    profile: "https://kasargod.nic.in/district-collector/",
    profileUpdatedOn: "23 Sep 2026",
    contact: "https://kasargod.nic.in/en/contact-collector/",
    office: "Civil Station, Vidyanagar, Kasaragod 671123",
    phone: "04994-256400", email: "dckas.kerala@gov.in",
    population: 1307375, gramaPanchayats: 38, blockPanchayats: 6, municipalities: 3, corporations: 0,
  },
];

export const districtAdministration: ReadonlyArray<DistrictAdministration> = directory.map(({ profileUpdatedOn, ...district }) => ({
  ...district,
  collectorSource: {
    source: `${district.name} District Administration`,
    dataset: "District Collector listing",
    url: district.profile,
    sourceUpdatedAt: `${profileUpdatedOn} (page update)`,
    fetchedAt: checked,
    basis: "Collector named by the district portal and cross-checked against the Chief Electoral Officer’s district directory.",
  },
}));

export function districtAdministrationBySlug(slug: string) {
  return districtAdministration.find((district) => slugify(district.name) === slug);
}
