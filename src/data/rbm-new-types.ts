export type SourceValue = string | number | null;

export interface RevisedIndicator {
  no: number;
  code: string;
  name: string;
  definition: string;
  level: string;
  unit: string;
  baseline: SourceValue;
  target: SourceValue;
  current: SourceValue;
  weight: number;
  cadence: string;
  source: string;
  activityCodes: readonly string[];
}

export interface RevisedActivity {
  code: string;
  name: string;
  phase: string;
  phaseTheme: string;
  category: string;
  type: string;
  plannedStart: string;
  plannedFinish: string;
  total: number | null;
  privateFunding: number | null;
  stateFunding: number | null;
  centralFunding: number | null;
  responsibleOffice: string;
  governmentPartner: string | null;
  otherPartner: string | null;
  dependencies: string;
}

export interface FormField {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "textarea" | "select";
  options?: readonly string[];
  min?: number;
  max?: number;
}

export interface RevisedScheme {
  slug: string;
  shortTitle: string;
  title: string;
  purpose: string;
  icon: string;
  color: string;
  period: string;
  department: string;
  status: string;
  sourceFile: string;
  sourceHref: string;
  publicSource: { label: string; url: string };
  fundingUnit: string;
  sourceInstructions: readonly string[];
  activityInstruction: string;
  evidenceInstruction: string;
  referenceInstruction: string;
  score: number;
  rating: string;
  statusNote: string;
  facts: readonly { label: string; value: SourceValue; unit?: string | null; note?: string | null; source?: string | null }[];
  indicators: readonly RevisedIndicator[];
  activities: readonly RevisedActivity[];
  resultChain: {
    inputs: readonly (string | null)[];
    activities: readonly (string | null)[];
    outputs: readonly (string | null)[];
    outcomes: readonly (string | null)[];
    impact: readonly (string | null)[];
  };
  outcomeSummary: readonly {
    indicator: string;
    target: SourceValue;
    current: SourceValue;
    unit: string;
    support: string;
    cadence: string;
    status: string;
  }[];
  evidenceSources: readonly {
    source: string;
    cadence: string;
    status: string;
    coverage: string;
  }[];
  references: readonly {
    title: string;
    columns: readonly string[];
    rows: readonly (readonly SourceValue[])[];
  }[];
  caveats: readonly string[];
  activityUpdateFields: readonly FormField[];
  evidenceFields: readonly FormField[];
}
