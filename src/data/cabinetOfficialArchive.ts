export type CabinetDecisionCategory =
  | 'Welfare'
  | 'Health'
  | 'Infrastructure'
  | 'Finance'
  | 'Education'
  | 'Administration'
  | 'Other'

export interface CabinetOfficialDecision {
  title: string
  summary: string
  category: CabinetDecisionCategory
}

export interface CabinetOfficialMeeting {
  id: string
  date: string
  sourceUrl: string
  decisions: CabinetOfficialDecision[]
}

export const cabinetArchiveCheckedOn = '2026-11-27'

const briefingDirectory = 'https://keralacm.gov.in/storage/2026/06/'

function meeting(date: string, filename: string, decisions: CabinetOfficialDecision[] = []): CabinetOfficialMeeting {
  return { id: date, date, sourceUrl: briefingDirectory + filename, decisions }
}

// Dates follow the Chief Minister's published archive. Highlights are English summaries of the briefings.
export const cabinetOfficialMeetings = [
  meeting('2026-11-25', 'cabinet-briefing-25.11.2026.pdf', [
    {
      title: 'Legislative agenda announced',
      summary: 'The Chief Minister said the government would introduce bills on sports, Public Service Commission changes, anti-ragging and private universities during the Assembly session starting 30 November.',
      category: 'Administration',
    },
  ]),
  meeting('2026-11-11', 'cm-briefing-11-11-2026.pdf', [
    {
      title: 'Kasaragod–Wayanad power line package',
      summary: 'The Cabinet approved a new package to facilitate the Kasaragod–Wayanad 400 kV transmission line.',
      category: 'Infrastructure',
    },
    {
      title: 'Assembly session recommended',
      summary: 'The Cabinet decided to recommend that the Governor convene the Legislative Assembly from 30 November to 10 December.',
      category: 'Administration',
    },
    {
      title: 'Forward communities commission report',
      summary: 'The Cabinet approved the report on action taken on the commission’s recommendations for economically backward sections of forward communities, for submission to the Assembly.',
      category: 'Welfare',
    },
  ]),
  meeting('2026-11-04', 'cabinet-briefing-04.11.2026.pdf', [
    {
      title: 'Maritime Museum and Oceanarium',
      summary: 'The Cabinet approved the draft founding documents for a special purpose vehicle to advance the International Maritime Museum and Oceanarium.',
      category: 'Infrastructure',
    },
    {
      title: '28 Health Department posts approved',
      summary: 'The Cabinet approved 12 Grade II dental hygienist posts and 16 Grade II cardiac catheterisation lab technician posts.',
      category: 'Health',
    },
  ]),
  meeting('2026-10-28', 'oct-28.pdf', [
    {
      title: 'Housing assistance increased',
      summary: 'The Cabinet granted administrative approval for housing assistance of ₹6 lakh for Scheduled Caste and fisher families and ₹8 lakh for Scheduled Tribe families.',
      category: 'Welfare',
    },
    {
      title: 'Police constable recruitment ratio revised',
      summary: 'The Cabinet changed the men-to-women recruitment ratio for police constables from 9:1 to 7:3.',
      category: 'Administration',
    },
    {
      title: 'Kannur land acquisition inquiry',
      summary: 'The Cabinet decided to order a Vigilance inquiry into land acquisition procedures for KIIFB projects in Kannur.',
      category: 'Administration',
    },
  ]),
  meeting('2026-10-15', '15.10.2026-pdf.pdf', [
    {
      title: 'KIIFB committee report tabled',
      summary: 'The Cabinet approved the Sudha Pillai Committee report for tabling in the Assembly. The Chief Minister said the government would act on its recommendations on KIIFB’s finances, governance and project delivery.',
      category: 'Finance',
    },
  ]),
  meeting('2026-10-09', '09-10-2026.pdf', [
    {
      title: 'Senior citizens department bill approved',
      summary: 'The Cabinet approved the bill for a Department for Senior Citizens. The briefing said it would be introduced in the Assembly session beginning 12 October.',
      category: 'Welfare',
    },
    {
      title: 'Janasparsham file review announced',
      summary: 'The Chief Minister announced a department-wide review from 15 October to 31 December to resolve long-pending files and identify the causes of delays.',
      category: 'Administration',
    },
  ]),
  meeting('2026-09-23', '23.09.2026.pdf', [
    {
      title: 'Festival Keralam across major cities',
      summary: 'The Chief Minister announced a festival for Kerala’s 70th anniversary, starting in New Delhi, Mumbai, Bengaluru, Chennai and Kolkata. A Cabinet subcommittee was formed to oversee it.',
      category: 'Other',
    },
    {
      title: 'Loka Kerala Sabha dissolved',
      summary: 'The Cabinet decided to dissolve Loka Kerala Sabha. The government said an alternative mechanism would address the needs of overseas Keralites and encourage investment.',
      category: 'Administration',
    },
  ]),
  meeting('2026-09-16', 'cabinet-briefing-16.09.2026.pdf', [
    {
      title: 'SARAL Kerala investment approvals',
      summary: 'The government announced a streamlined approval process for investment projects, with district and state review and coordination by Kerala State Industrial Development Corporation.',
      category: 'Administration',
    },
  ]),
  meeting('2026-09-09', 'cabinet-briefing-09-09-2026.pdf', [
    {
      title: 'Roundtable for revised budget projects',
      summary: 'The Chief Minister announced a 16–18 September roundtable in Thiruvananthapuram to coordinate departments and plan implementation of projects announced in the revised budget.',
      category: 'Finance',
    },
  ]),
  meeting('2026-09-02', 'cabinet-briefing-02.09.2026.pdf', [
    {
      title: 'Teacher recruitment rank lists extended',
      summary: 'The Chief Minister announced a six-month extension for 18 Public Service Commission teacher recruitment rank lists due to expire from September to November 2026.',
      category: 'Education',
    },
  ]),
  meeting('2026-08-18', 'cb-18-08-2026.pdf', [
    {
      title: 'Land lease for Cochin Shipyard',
      summary: 'The Cabinet decided to lease 18.16 acres at Kochiramanthuruthu to Cochin Shipyard for a shipbuilding project.',
      category: 'Infrastructure',
    },
    {
      title: 'Onam welfare pensions',
      summary: 'The Chief Minister said arrangements were complete for welfare payments beginning 19 August, with ₹1,105 crore allocated.',
      category: 'Welfare',
    },
  ]),
  meeting('2026-08-13', 'cd-13-08-2026.pdf', [
    {
      title: 'Mundakkai–Chooralmala relief approved',
      summary: 'The Cabinet approved ₹2 lakh each for people on the rehabilitation list for the Mundakkai–Chooralmala landslides in Wayanad.',
      category: 'Welfare',
    },
    {
      title: 'Vizhinjam import and export cargo',
      summary: 'The Chief Minister announced that import and export cargo handling at Vizhinjam International Seaport would begin on 18 August.',
      category: 'Infrastructure',
    },
  ]),
  meeting('2026-08-05', 'cabinet-brefing-05.08.2026.pdf', [
    {
      title: 'Flood relief expanded',
      summary: 'The Cabinet approved expanded flood relief, including raising aid to build a new home from ₹10 lakh to ₹12 lakh for people who lost both their home and land.',
      category: 'Welfare',
    },
    {
      title: 'Flood mapping and dam management',
      summary: 'The briefing announced plans for AI-assisted flood mapping and dam management as part of a broader disaster response programme.',
      category: 'Infrastructure',
    },
  ]),
  meeting('2026-07-29', 'cabinet-decision-19-07.pdf', [
    {
      title: 'Digital governance reforms approved',
      summary: 'The Cabinet approved a set of governance reforms including an asset management platform, geographic tracking of capital projects and a register of government institutions.',
      category: 'Administration',
    },
  ]),
  meeting('2026-07-22', 'cabinet-decision-22-07-2026.pdf', [
    {
      title: 'Anti-ragging legislation planned',
      summary: 'The Chief Minister announced plans for anti-ragging legislation covering colleges and professional institutions, and a dedicated app for students to report incidents.',
      category: 'Education',
    },
    {
      title: 'Onam campaign for coir producers',
      summary: 'The briefing announced a statewide Onam campaign to help the coir sector sell accumulated stock.',
      category: 'Other',
    },
  ]),
  meeting('2026-07-15', 'cabinet-decision-15-07.pdf', [
    {
      title: 'Shared system for project and file tracking',
      summary: 'The Cabinet decided to introduce a shared system to help departments track projects and files in real time and speed up disposal of pending files.',
      category: 'Administration',
    },
  ]),
  meeting('2026-06-24', '24-06-2026-cabinet-decisions.pdf', [
    {
      title: 'State Election Commissioner recommendation',
      summary: 'The Cabinet decided to recommend retired district judge N. Seshadrinathan to the Governor for appointment as State Election Commissioner.',
      category: 'Administration',
    },
    {
      title: 'Disaster relief for bereaved families',
      summary: 'The Cabinet approved ₹5 lakh per family for three Kudumbashree workers killed in a wall collapse in Bengaluru. It also approved ₹5 lakh per family for three people killed in a road crash near Kottarakkara and said treatment costs for injured people would be covered.',
      category: 'Welfare',
    },
  ]),
  meeting('2026-06-17', 'cabinet-briefings-17.06.2026.pdf', [
    {
      title: 'PM SHRI schools policy subcommittee',
      summary: 'The Cabinet formed a subcommittee led by the education minister to develop Kerala’s policy position on curriculum and school selection under PM SHRI.',
      category: 'Education',
    },
  ]),
  meeting('2026-06-10', 'cabinet-briefings-10.06.2026.pdf', [
    {
      title: 'Priyadarshini free bus travel approved',
      summary: 'The Cabinet approved free travel on ordinary KSRTC buses for women and transgender people from 15 June, with no age or income criteria.',
      category: 'Welfare',
    },
  ]),
  meeting('2026-06-04', 'cabinet-briefings-04.06.2026.pdf', [
    {
      title: 'State finances white paper presented',
      summary: 'The briefing presented the white paper prepared ahead of the new government’s budget, covering state income, expenditure, liabilities and financial challenges.',
      category: 'Finance',
    },
  ]),
  meeting('2026-05-20', 'cabinet-briefings-20.05.2026.pdf', [
    {
      title: 'SilverLine project cancelled',
      summary: 'The Chief Minister announced that the Thiruvananthapuram–Kasaragod SilverLine project had been cancelled and its land acquisition notifications suspended.',
      category: 'Infrastructure',
    },
    {
      title: 'PSC rank list extension recommended',
      summary: 'The government said it would recommend that the Public Service Commission extend rank lists due to expire by 31 August until 30 November 2026.',
      category: 'Administration',
    },
  ]),
  meeting('2026-05-18', 'cabinet-briefings-18.05.2026.pdf', [
    {
      title: 'Women’s free KSRTC bus travel announced',
      summary: 'The first Cabinet briefing announced free travel for women on KSRTC buses from 15 June, with implementation details to follow.',
      category: 'Welfare',
    },
    {
      title: 'Department for senior citizens announced',
      summary: 'The first Cabinet briefing announced a dedicated department for senior citizens.',
      category: 'Administration',
    },
    {
      title: 'ASHA workers’ honorarium increased',
      summary: 'The Cabinet announced a ₹3,000 increase in the monthly honorarium for ASHA workers, bringing it from ₹9,000 to ₹12,000.',
      category: 'Health',
    },
  ]),
]
