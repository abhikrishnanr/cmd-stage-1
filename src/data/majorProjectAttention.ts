import type { TransportSource } from "@/data/transportActuals";

type MajorProjectAttention = {
  projectId: string;
  title: string;
  value: string;
  detail: string;
  points?: readonly { label: string; value: number }[];
  unit?: "%" | "km" | "homes";
  source: TransportSource;
};

const checked = "27 Nov 2026";

export const majorProjectAttention: readonly MajorProjectAttention[] = [
  {
    projectId: "pattikkad-railway-overbridge",
    title: "Pattikkad crossing closure affected bus services",
    value: "Diversions under review",
    detail: "The 17 November district review recorded travel and bus-service disruptions after the gate closed for overbridge construction. It brought railway and contractor representatives together with local bus operators to review the disruption.",
    source: {
      source: "Kerala Information and Public Relations Department · Malappuram",
      dataset: "District review of the Pattikkad railway overbridge works",
      url: "https://prd.kerala.gov.in/index.php/ml/node/366936/",
      period: "17 Nov 2026",
      sourceUpdatedAt: "18 Nov 2026 (publication)",
      fetchedAt: checked,
    },
  },
  {
    projectId: "koyilandy-water",
    title: "Koyilandy pipeline commissioning",
    value: "90 km activated",
    detail: "KWA reported that 330.8 km of the planned 360 km had been laid and that water supply had started along 90 km. Review the commissioning sequence for the remaining network.",
    unit: "km",
    points: [{ label: "Planned", value: 360 }, { label: "Laid", value: 330.8 }, { label: "Activated", value: 90 }],
    source: {
      source: "Kerala Water Authority · PASK",
      dataset: "Koyilandy municipal water supply scheme · status update",
      url: "https://pask.kwa.kerala.gov.in/project/mainstatus/reference/7fb0e93718cc2bbf2ad75d2dfb497c77h4OKfIo",
      period: "13 Nov 2026",
      sourceUpdatedAt: "13 Nov 2026 (project update)",
      fetchedAt: checked,
      basis: "Network length at planning, pipe-laying and activation milestones.",
    },
  },
  {
    projectId: "solid-waste",
    title: "Dumpsite closures held at two",
    value: "2 sites closed in the register",
    detail: "The World Bank recorded two closed dumpsites in both its August and October observations. It reported three remediation contracts under implementation in November.",
    points: [{ label: "Aug 2026", value: 2 }, { label: "Oct 2026", value: 2 }],
    source: {
      source: "World Bank",
      dataset: "Kerala Solid Waste Management Project · Implementation Status and Results Report, pages 2 and 4",
      url: "https://documents1.worldbank.org/curated/en/099111326124567514/pdf/P168633-fcd1c97c-66b8-4bbc-9ad3-34dc9f67edeb.pdf#page=4",
      period: "August and October 2026 observations",
      sourceUpdatedAt: "13 Nov 2026 (report date)",
      fetchedAt: checked,
      basis: "Actual dumpsite closure counts and reported contract status.",
    },
  },
  {
    projectId: "arimpur-water-distribution",
    title: "Arimpur gravity pipeline had yet to start",
    value: "500 mm line pending",
    detail: "KWA cited the road’s earlier defect-liability period and reported that the 500 mm pipe supply was still pending. The contractor submitted a request for more time on that component.",
    unit: "%",
    points: [{ label: "Overhead reservoir", value: 88 }, { label: "560 mm line", value: 80 }, { label: "500 mm line", value: 0 }],
    source: {
      source: "Kerala Water Authority · PASK",
      dataset: "Jal Jeevan Mission · Arimpur Phase I status log",
      url: "https://pask.kwa.kerala.gov.in/project/mainstatus/reference/67f3a8a7347963d3c9d0622417ad0885h3-LeIY",
      period: "15 Sep 2026",
      sourceUpdatedAt: "15 Sep 2026 (project update)",
      fetchedAt: checked,
      basis: "The officer reported 88% for the reservoir, 80% for the 560 mm line and that the 500 mm line had yet to start.",
    },
  },
  {
    projectId: "malankara-neeloor-water-treatment",
    title: "Neeloor work continued past its expected finish",
    value: "30% of package complete",
    detail: "KWA listed 31 March 2026 as the expected finish. On 16 July it reported 30% completion, with treatment-plant works and preparations for pressure testing still under way.",
    source: {
      source: "Kerala Water Authority · PASK",
      dataset: "Water supply scheme for 13 panchayats · KTMJJM102214992P2",
      url: "https://pask.kwa.kerala.gov.in/project/profile/reference/ef9c4dc534b21b3f9c62b1857f4a0e81h4KHeYY",
      period: "16 Jul 2026",
      sourceUpdatedAt: "16 Jul 2026 (project update)",
      fetchedAt: checked,
      basis: "The package profile gives its expected completion date and the officer’s subsequent progress update.",
    },
  },
];
