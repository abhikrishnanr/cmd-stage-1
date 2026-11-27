import { SourcedBrief } from "@/components/SourcedBrief";
import { ProgrammeDeliveryTable } from "@/components/ProgrammeDeliveryTable";
import { programmeAchievements, programmeMonitor } from "@/data/deliveryActuals";
import { getProgrammeDelivery, programmeDashboardApiUrl, programmeDepartmentsApiUrl } from "@/lib/programmeDelivery";

export const dynamic = "force-dynamic";

const number = new Intl.NumberFormat("en-IN");
const checkedDate = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

export default async function DeliveryPage() {
  const { totals, totalsCheckedAt, departments } = await getProgrammeDelivery();
  const dashboardSource = {
    ...programmeMonitor,
    url: programmeDashboardApiUrl,
    dataset: "100 Days Programme totals API",
    sourceUpdatedAt: null,
    note: totalsCheckedAt ? undefined : "Stored snapshot checked 27 Nov 2026",
    fetchedAt: totalsCheckedAt ? `${checkedDate.format(new Date(totalsCheckedAt))} IST` : undefined,
  };
  const departmentsSource = {
    ...programmeMonitor,
    url: programmeDepartmentsApiUrl,
    dataset: "100 Days Programme departments API",
    basis: "Reported counts by department",
    sourceUpdatedAt: null,
    note: undefined,
    fetchedAt: departments ? `${checkedDate.format(new Date(departments.checkedAt))} IST` : undefined,
  };

  return (
    <SourcedBrief title="Programme Delivery" description="Published progress of Kerala’s 100 Days Programme."
      metrics={[
        { label: "Projects completed", value: number.format(totals.completed), note: `Of ${number.format(totals.projects)} projects in the monitor`, provenance: dashboardSource },
        { label: "Projects in progress", value: number.format(totals.inProgress), provenance: dashboardSource },
        { label: "Indicators verified", value: number.format(totals.verifiedIndicators), note: `Of ${number.format(totals.indicators)} indicators in the monitor`, provenance: dashboardSource },
      ]}
      references={[
        { title: "100 Days Programme monitor", description: "The government’s project and indicator status dashboard.", provenance: { ...programmeMonitor, note: undefined } },
        { title: "100 Days Programme totals API", description: "The official JSON feed used for programme-wide figures.", provenance: dashboardSource },
        { title: "100 Days Programme departments API", description: "The official JSON feed used for the department table.", provenance: departmentsSource },
        { title: "Programme achievements", description: "The government’s dated project records and outcomes.", provenance: programmeAchievements },
      ]}
    >
      {!totalsCheckedAt && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="status">
          The programme totals feed is unavailable. The figures above are from the stored snapshot checked on 27 November 2026.
        </p>
      )}
      <section id="department-follow-up" aria-labelledby="department-follow-up-heading" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h2 id="department-follow-up-heading" className="text-base font-extrabold text-[#172c55]">Department follow-up</h2>
        <p className="mt-1 text-sm text-slate-600">Projects remaining and indicators unverified are calculated from the department feed’s reported totals.</p>
        {departments ? (
          <>
            <p className="mt-1 text-xs text-slate-600">
              Checked <time dateTime={departments.checkedAt}>{departmentsSource.fetchedAt}</time>. <a href={departmentsSource.url} target="_blank" rel="noreferrer" className="font-semibold text-blue-800 underline underline-offset-2">Official department data (JSON)</a>
            </p>
            <ProgrammeDeliveryTable departments={departments.data} />
          </>
        ) : (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="status">
            The department feed is unavailable. <a href={programmeMonitor.url} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">Open the official programme monitor</a> for the department records.
          </p>
        )}
      </section>
    </SourcedBrief>
  );
}
