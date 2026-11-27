import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionCard } from "@/components/primitives";
import {
  clinicalRegisterUrl, diseaseSurveillanceRows, diseaseSurveillanceSource, healthAssurance,
  healthAssuranceSource, healthOutcomes, infantMortalitySource, maternalMortalitySource,
} from "@/data/healthActuals";

const count = new Intl.NumberFormat("en-IN");

export default function HealthPage() {
  return (
    <div className="space-y-5 p-4 sm:p-5">
      <PageHero
        icon="HeartPulse"
        title="Health"
        subtitle="Kerala’s published communicable disease reports, health outcomes and KASP programme figures."
        gradient="linear-gradient(112deg,#11354a 0%,#125c64 55%,#177450 100%)"
        statusLabel="Published reports"
        provenance={[diseaseSurveillanceSource, infantMortalitySource, maternalMortalitySource, healthAssuranceSource]}
        stats={[
          ...diseaseSurveillanceRows.slice(0, 3).map((row) => ({
            label: row.label,
            value: count.format(row.daily),
            sub: "Confirmed on 25 Nov 2026",
            icon: "Activity",
            provenance: diseaseSurveillanceSource,
          })),
          { label: "Infant mortality rate", value: `${healthOutcomes.infantMortality.kerala}`, sub: "Per 1,000 live births · 2024", icon: "Baby", provenance: infantMortalitySource },
          { label: "Maternal mortality ratio", value: `${healthOutcomes.maternalMortality.kerala}`, sub: "Per 1 lakh live births · 2022–24", icon: "HeartPulse", provenance: maternalMortalitySource },
          { label: "Families with a KASP card", value: count.format(healthAssurance.familiesWithCard), sub: "March 2026", icon: "ShieldPlus", provenance: healthAssuranceSource },
        ]}
      />

      <SectionCard title="Communicable disease surveillance" subtitle="Kerala IDSP · Preliminary report through 25 November 2026" icon="Activity" provenance={diseaseSurveillanceSource} expandable>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[670px] text-sm tabular-nums">
            <thead className="text-xs text-slate-600">
              <tr>
                <th scope="col" className="pb-2 pr-3 text-left">Selected conditions</th>
                <th scope="col" className="pb-2 text-right">Cases on 25 Nov</th>
                <th scope="col" className="pb-2 text-right">November cases</th>
                <th scope="col" className="pb-2 text-right">November deaths</th>
                <th scope="col" className="pb-2 text-right">2026 cases</th>
                <th scope="col" className="pb-2 text-right">2026 deaths</th>
              </tr>
            </thead>
            <tbody>{diseaseSurveillanceRows.map((row) => (
              <tr key={row.label} className="border-t border-slate-100 text-right text-slate-700">
                <th scope="row" className="py-2.5 pr-3 text-left font-semibold text-slate-900">{row.label}</th>
                <td>{count.format(row.daily)}</td><td className="font-bold text-teal-900">{count.format(row.monthCases)}</td>
                <td>{count.format(row.monthDeaths)}</td><td>{count.format(row.yearCases)}</td><td>{count.format(row.yearDeaths)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-600">Confirmed cases and deaths are subject to change after laboratory testing and death audits. November and 2026 totals are through 25 November.</p>
      </SectionCard>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <SectionCard title="Infant mortality rate" subtitle="SRS 2024 · Deaths per 1,000 live births" icon="Baby" provenance={infantMortalitySource}>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Outcome label="Kerala" value={healthOutcomes.infantMortality.kerala} />
            <Outcome label="India" value={healthOutcomes.infantMortality.india} />
            <Outcome label="Rural Kerala" value={healthOutcomes.infantMortality.rural} />
            <Outcome label="Urban Kerala" value={healthOutcomes.infantMortality.urban} />
          </dl>
        </SectionCard>

        <SectionCard title="Maternal mortality ratio" subtitle="SRS 2022–24 · Deaths per 1 lakh live births" icon="HeartPulse" provenance={maternalMortalitySource}>
          <dl className="grid grid-cols-2 gap-2">
            <Outcome label="Kerala" value={healthOutcomes.maternalMortality.kerala} />
            <Outcome label="India" value={healthOutcomes.maternalMortality.india} />
          </dl>
        </SectionCard>

        <SectionCard title="Karunya Arogya Suraksha Padhathi" subtitle="State Health Agency · March 2026" icon="ShieldPlus" provenance={healthAssuranceSource}>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Outcome label="Public hospitals empanelled" value={healthAssurance.publicHospitals} />
            <Outcome label="Private hospitals empanelled" value={healthAssurance.privateHospitals} />
            <Outcome label="KASP claims converted" value={healthAssurance.kaspClaimsConverted} />
            <Outcome label="Beneficiaries in claims analysis" value={healthAssurance.beneficiariesForClaims} />
          </dl>
        </SectionCard>

        <SectionCard title="Clinical establishments register" subtitle="Kerala State Council for Clinical Establishments" icon="Hospital">
          <a href={clinicalRegisterUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:underline">
            Open the official register <ExternalLink size={13} aria-hidden="true" />
          </a>
        </SectionCard>
      </div>
    </div>
  );
}

function Outcome({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-teal-50 p-2.5 text-teal-950">
      <dt className="text-xs text-teal-900">{label}</dt>
      <dd className="text-xl font-extrabold tabular-nums">{count.format(value)}</dd>
    </div>
  );
}
