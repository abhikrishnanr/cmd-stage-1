import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionCard } from "@/components/primitives";
import {
  employmentRegisterSource,
  employmentRegistrations,
  labourForceSource,
  labourRates,
  labourSectors,
  unemploymentComparisons,
  unemploymentComparisonSource,
  youngWomenUnemployment,
  youthUnemployment,
} from "@/data/employmentCommand";

const count = new Intl.NumberFormat("en-IN");
const pct = (value: number) => `${value.toFixed(1)}%`;
const points = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)} pp`;
const [, indiaUnemployment] = unemploymentComparisons;
const registeredCount = employmentRegistrations.reduce((sum, row) => sum + row.men + row.women, 0);
const recruitmentPortals = [
  { name: "Kerala Public Service Commission advice status", url: "https://www.keralapsc.gov.in/status_of_advice" },
  { name: "Kerala employment exchange services", url: "https://employment.kerala.gov.in/en/registration-renewal/" },
];

export default function EmploymentPage() {
  return (
    <div className="space-y-5 p-4 sm:p-5">
      <PageHero
        icon="BriefcaseBusiness"
        title="Employment and workforce"
        subtitle="Kerala labour force survey estimates and district employment exchange registrations."
        gradient="linear-gradient(115deg,#18234a 0%,#234389 52%,#167270 100%)"
        statusLabel="Published statistics"
        provenance={[labourForceSource, employmentRegisterSource]}
        stats={[
          { label: "Labour force participation", value: pct(labourRates[0].kerala), sub: "Ages 15+ · Jul–Sep 2026", icon: "Users", provenance: labourForceSource },
          { label: "Women’s participation", value: pct(labourRates[0].female), sub: "Ages 15+ · Jul–Sep 2026", icon: "UserRound", provenance: labourForceSource },
          { label: "Worker population ratio", value: pct(labourRates[1].kerala), sub: "Ages 15+ · Jul–Sep 2026", icon: "BriefcaseBusiness", provenance: labourForceSource },
          { label: "Unemployment rate", value: pct(labourRates[2].kerala), sub: "Ages 15+ · Jul–Sep 2026", icon: "ChartNoAxesColumn", provenance: labourForceSource },
          { label: "Youth unemployment", value: pct(youthUnemployment.kerala), sub: "Ages 15–29 · Jul–Sep 2026", icon: "GraduationCap", provenance: labourForceSource },
          { label: "Registered job seekers", value: count.format(registeredCount), sub: "31 Aug 2025", icon: "ClipboardList", provenance: employmentRegisterSource },
        ]}
      />

      <SectionCard
        title="How Kerala compares on unemployment"
        subtitle="July to September 2026 · Rural and urban combined"
        icon="BarChart3"
        provenance={unemploymentComparisonSource}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px] text-right text-sm tabular-nums" aria-describedby="unemployment-comparison-method">
            <thead className="text-xs text-slate-600">
              <tr>
                <th scope="col" className="px-2 pb-2 text-left sm:px-3">Geography</th>
                <th scope="col" className="px-2 pb-2 sm:px-3">Ages 15+</th>
                <th scope="col" className="px-2 pb-2 sm:px-3">Ages 15–29</th>
              </tr>
            </thead>
            <tbody>
              {unemploymentComparisons.map((row) => (
                <tr key={row.region} className={`border-t border-slate-100 ${row.region === "Kerala" ? "bg-teal-50 text-teal-950" : "text-slate-800"}`}>
                  <th scope="row" className="px-2 py-2.5 text-left font-semibold sm:px-3">{row.region}</th>
                  <td className="px-2 py-2.5 sm:px-3">
                    <strong>{pct(row.age15Plus)}</strong>
                    {row.region !== "India" && <span className="block text-xs text-slate-600">{points(row.age15Plus - indiaUnemployment.age15Plus)}</span>}
                  </td>
                  <td className="px-2 py-2.5 sm:px-3">
                    <strong>{pct(row.age15To29)}</strong>
                    {row.region !== "India" && <span className="block text-xs text-slate-600">{points(row.age15To29 - indiaUnemployment.age15To29)}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 rounded-xl bg-indigo-50 px-3 py-2.5 text-sm leading-relaxed text-indigo-950">
          <p>Kerala’s gap with India was wider for ages 15–29 than for ages 15 and above.</p>
          <p className="mt-1">
            Among young women, the rate was <strong>{pct(youngWomenUnemployment.kerala)} in Kerala</strong> and {pct(youngWomenUnemployment.india)} across India ({points(youngWomenUnemployment.kerala - youngWomenUnemployment.india)}).
            Kerala’s rate among young men was {pct(youthUnemployment.male)}.
          </p>
        </div>
        <p id="unemployment-comparison-method" className="mt-3 text-xs leading-relaxed text-slate-600">
          Gaps are percentage points (pp) from India’s rate for the same age group. The unemployment rate is the unemployed share of the labour force.
          Current Weekly Status uses the seven days before the survey.
        </p>
        <a href={unemploymentComparisonSource.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:underline">
          MoSPI quarterly bulletin, Table 5 <ExternalLink size={12} aria-hidden="true" />
        </a>
      </SectionCard>

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <SectionCard title="Labour market indicators" subtitle="Ages 15 and above · July to September 2026" icon="BarChart3" provenance={labourForceSource} expandable>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] text-right text-xs tabular-nums">
              <thead className="text-slate-500"><tr><th scope="col" className="pb-2 text-left">Indicator</th><th scope="col">Kerala</th><th scope="col">India</th><th scope="col">Men in Kerala</th><th scope="col">Women in Kerala</th></tr></thead>
              <tbody>{labourRates.map((row) => (
                <tr key={row.label} className="border-t border-slate-100">
                  <th scope="row" className="py-2.5 pr-2 text-left font-semibold text-slate-800">{row.label}</th>
                  <td className="font-bold text-teal-800">{pct(row.kerala)}</td><td>{pct(row.india)}</td><td>{pct(row.male)}</td><td>{pct(row.female)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Where people work" subtitle="Share of workers aged 15+ · July to September 2026" icon="Factory" provenance={labourForceSource} expandable>
          <ul className="space-y-3">
            {labourSectors.map((row) => (
              <li key={row.label}>
                <div className="mb-1 flex flex-wrap justify-between gap-x-2 text-xs">
                  <strong className="text-slate-900">{row.label}</strong>
                  <span className="tabular-nums text-slate-600"><strong className="text-teal-800">{pct(row.kerala)} Kerala</strong> · {pct(row.india)} India</span>
                </div>
                <div className="relative h-2 rounded-full bg-slate-100" aria-hidden="true">
                  <div className="h-full rounded-full bg-teal-700" style={{ width: `${row.kerala}%` }} />
                  <span className="absolute -top-0.5 h-3 w-0.5 bg-slate-800" style={{ left: `${row.india}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Registered job seekers by district" subtitle="Employment exchange live registers · 31 August 2025 snapshot" icon="MapPin" provenance={employmentRegisterSource} expandable>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[350px] text-right text-sm tabular-nums">
            <thead className="text-xs text-slate-500"><tr><th scope="col" className="pb-2 text-left">District</th><th scope="col">Men</th><th scope="col">Women</th><th scope="col">Total</th></tr></thead>
            <tbody>{employmentRegistrations.map((row) => (
              <tr key={row.district} className="border-t border-slate-100">
                <th scope="row" className="py-2 text-left font-semibold text-slate-800">{row.district}</th>
                <td>{count.format(row.men)}</td><td>{count.format(row.women)}</td>
                <td className="font-bold text-teal-900">{count.format(row.men + row.women)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Official recruitment services" icon="Landmark">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {recruitmentPortals.map((portal) => (
            <li key={portal.url}>
              <a href={portal.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:underline">
                {portal.name} <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
