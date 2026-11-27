export interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  priority: "Critical" | "High" | "Medium" | "Watch";
  time: string;
  unread: boolean;
  fromCM: boolean;
  relatedTicket?: string;
  related?: string;
  due?: string;
  voiceNote?: { title: string; duration: string; transcript: string };
  attachments?: { name: string; type: string; size: string; source: string }[];
}

export const messages: Message[] = [
  {
    id: "MSG-91",
    from: "VD Satheeshan (CM)",
    subject: "Dengue cluster - Palakkad, action by EOD",
    preview: "Need an action-taken report on the Palakkad dengue spike before this evening...",
    body: "Health Secretary - the Palakkad dengue positivity is up 34% week-on-week and has crossed the outbreak threshold. I need an action-taken report before 18:00 today: fogging coverage, ASV stock position, and rapid-response team deployment.",
    priority: "Critical",
    time: "22 min ago",
    unread: true,
    fromCM: true,
    relatedTicket: "TK-2041",
    related: "M-05 - Palakkad",
    due: "Today 18:00",
    voiceNote: {
      title: "CM voice instruction",
      duration: "0:42",
      transcript: "Send the Palakkad dengue action-taken report by evening. I want fogging, ASV stock and rapid-response deployment in one page.",
    },
    attachments: [
      { name: "palakkad-dengue-map.png", type: "Image", size: "1.8 MB", source: "Health dashboard" },
      { name: "idsp-cluster-line-list.xlsx", type: "Excel", size: "420 KB", source: "IDSP" },
    ],
  },
  {
    id: "MSG-90",
    from: "VD Satheeshan (CM)",
    subject: "KIIFB repayment cliff - sequencing note",
    preview: "Finance Secy, reconcile the ₹56,000 Cr estimated KIIFB obligation and prepare a one-page options note...",
    body: "Finance Secretary - first reconcile the status paper's ₹56,000 Cr estimated combined KIIFB obligation, then prepare a one-page borrowing-impact and refinancing sequence note. I want options that avoid borrowing for consumption.",
    priority: "Critical",
    time: "2 hr ago",
    unread: true,
    fromCM: true,
    relatedTicket: "TK-2039",
    related: "Finance - KIIFB",
    due: "Tomorrow",
    voiceNote: {
      title: "CM fiscal note",
      duration: "0:35",
      transcript: "Give me options and risks, not a long note. Put borrowing impact and repayment sequencing first.",
    },
    attachments: [{ name: "kiifb-repayment-schedule.pdf", type: "PDF", size: "760 KB", source: "Finance" }],
  },
  {
    id: "MSG-89",
    from: "Finance Secretary",
    subject: "Re: Arrears recovery plan",
    preview: "Sharing the draft amnesty-window proposal for the Rs 24,462 Cr arrears...",
    body: "CM - attached is the draft amnesty-window proposal to convert Rs 9,400 Cr under-recovery. Requesting approval to issue the GO this week.",
    priority: "High",
    time: "5 hr ago",
    unread: false,
    fromCM: false,
    relatedTicket: "TK-2034",
    related: "M-18 - State",
    attachments: [{ name: "arrears-amnesty-draft-note.pdf", type: "PDF", size: "540 KB", source: "Finance" }],
  },
  {
    id: "MSG-88",
    from: "Industries Secretary",
    subject: "Vizhinjam Phase-2 - contractor delay",
    preview: "Yard expansion is slipping 38 days; we are issuing a cure notice...",
    body: "Updating on Vizhinjam Phase-2: the yard expansion is slipping 38 days due to the contractor. We are issuing a cure notice and exploring parallel mobilisation.",
    priority: "High",
    time: "1 day ago",
    unread: false,
    fromCM: false,
    relatedTicket: "TK-2036",
    related: "Dream - Port",
    attachments: [{ name: "vizhinjam-phase2-progress.jpg", type: "Photo", size: "2.4 MB", source: "Site visit" }],
  },
  {
    id: "MSG-87",
    from: "LSGD Secretary",
    subject: "Re: Pension disbursement backlog",
    preview: "Suneethi feed restored; 2,340 records reprocessed overnight...",
    body: "The Suneethi feed delay is resolved - 2,340 pending records were reprocessed overnight and the next cycle is on track.",
    priority: "Medium",
    time: "1 day ago",
    unread: false,
    fromCM: false,
    relatedTicket: "TK-2038",
    related: "Indira - Pension",
    attachments: [{ name: "suneethi-reprocess-summary.xlsx", type: "Excel", size: "312 KB", source: "LSGD" }],
  },
  {
    id: "MSG-86",
    from: "Data Systems Cell",
    subject: "Fisheries portal feed failed",
    preview: "The Fisheries Dept CSV upload failed for 21 days - confidence dropped to 71%...",
    body: "Flagging that the Fisheries Dept portal feed has failed for 21 days; module confidence dropped to 71%. Requesting escalation to restore the feed.",
    priority: "Medium",
    time: "2 days ago",
    unread: true,
    fromCM: false,
    related: "Systems - Fisheries",
  },
];

export const inboxFilters = ["Unread", "From CM", "Assigned to me", "Related tickets", "Overdue", "Closed"];
