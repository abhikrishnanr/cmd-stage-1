import type { DataProvenance } from "@/components/DataProvenance";

const checkedOn = "27 Nov 2026, 12:29 am IST";
const ceaReport = "https://cea.nic.in/api/dashboardReports/view-pdf/en/";
const sldcPage = "https://sldckerala.com/index.php?id=";

const sldcReport = {
  source: "Kerala State Load Despatch Centre",
  period: "25 Nov 2026",
  basis: "Reported daily operations",
  sourceUpdatedAt: null,
  fetchedAt: checkedOn,
  note: "Select 25 November 2026 and choose Show in the source report.",
} satisfies DataProvenance;

export const powerGenerationSource = { ...sldcReport, dataset: "Generation and imports", url: `${sldcPage}1` };
export const powerPeakSource = { ...sldcReport, dataset: "Daily maximum demand", url: `${sldcPage}9` };
export const powerStorageSource = { ...sldcReport, dataset: "Reservoir storage", url: `${sldcPage}7` };

export const powerDaily = {
  eveningPeakMw: 4852,
  eveningPeakTime: "18:32 IST",
  morningPeakMw: 4166,
  morningPeakTime: "06:41 IST",
  consumptionMu: 97.2873,
  netImportMu: 83.923,
  internalGenerationMu: 13.3643,
  hydelGenerationMu: 11.588,
  monthlyConsumptionMu: 2303.119,
  monthlyAverageConsumptionMu: 92.1248,
  reservoirStorageMu: 2689.396,
  reservoirCapacityMu: 4140.252,
  reservoirStoragePct: 65,
  priorYearStorageMu: 3372.103,
  inflowMonthToDateMu: 166.766,
};

function ceaSource(dataset: string, period: string, reportId: string): DataProvenance {
  return {
    source: "Central Electricity Authority",
    dataset,
    url: `${ceaReport}${reportId}`,
    period,
    basis: "Actuals reported by electricity utilities, revised CEA report",
    sourceUpdatedAt: null,
    fetchedAt: checkedOn,
  };
}

export const powerSupplyMonths = [
  {
    label: "Aug 2026",
    peakDemandMw: 4913, peakMetMw: 4861, peakUnmetMw: 52, peakUnmetPct: 1.1,
    energyRequirementMu: 2623, energySuppliedMu: 2621, energyUnservedMu: 2, energyUnservedPct: 0.1,
    peakSource: ceaSource("Peak power supply position", "Aug 2026", "cac7be2f-7f6a-407d-ad32-da778093464c"),
    energySource: ceaSource("Energy supply position", "Aug 2026", "32790e09-be76-423d-adcb-bbdafe303fd5"),
  },
  {
    label: "Sept 2026",
    peakDemandMw: 5631, peakMetMw: 5440, peakUnmetMw: 191, peakUnmetPct: 3.4,
    energyRequirementMu: 2873, energySuppliedMu: 2819, energyUnservedMu: 54, energyUnservedPct: 1.9,
    peakSource: ceaSource("Peak power supply position", "Sept 2026", "b55637ab-2dd5-4dde-a440-f4daaab726a8"),
    energySource: ceaSource("Energy supply position", "Sept 2026", "c7e247c1-4f36-47f8-8812-35f7ce13adc7"),
  },
  {
    label: "Oct 2026",
    peakDemandMw: 5697, peakMetMw: 5402, peakUnmetMw: 295, peakUnmetPct: 5.2,
    energyRequirementMu: 2888, energySuppliedMu: 2884, energyUnservedMu: 4, energyUnservedPct: 0.1,
    peakSource: ceaSource("Peak power supply position", "Oct 2026", "6d3c7070-7bfc-48db-a431-10af23df2843"),
    energySource: ceaSource("Energy supply position", "Oct 2026", "b717600b-4b7a-4879-afda-363e8fe1fca9"),
  },
];

export const powerConsumersSource = {
  source: "Kerala State Electricity Board Ltd.",
  dataset: "Monthly consumer counts",
  url: "https://kseb.in/dashboard/view/consumers",
  period: "Aug 2026",
  basis: "Published KSEB consumer counts",
  sourceUpdatedAt: null,
  fetchedAt: checkedOn,
  note: "Choose August 2026 in KSEB’s monthly dashboard.",
} satisfies DataProvenance;

export const powerConsumerCategories = {
  LT: [
    { label: "Domestic", count: 10787391 },
    { label: "Commercial", count: 2762212 },
    { label: "Agriculture", count: 547182 },
    { label: "Industrial", count: 148249 },
    { label: "Public lighting", count: 98336 },
    { label: "Industrial (PWW)", count: 1806 },
  ],
  HT: [
    { label: "Industrial", count: 3311 },
    { label: "Commercial", count: 2929 },
    { label: "General", count: 1923 },
    { label: "Domestic", count: 165 },
    { label: "Agriculture", count: 56 },
    { label: "Licensee", count: 33 },
    { label: "EV charging stations", count: 22 },
    { label: "Metro rail", count: 1 },
  ],
  EHT: [
    { label: "Industrial", count: 32 },
    { label: "Railway traction", count: 15 },
    { label: "Licensee", count: 12 },
    { label: "General", count: 7 },
    { label: "Metro rail", count: 2 },
    { label: "Commercial", count: 1 },
  ],
};
