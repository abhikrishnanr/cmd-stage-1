import { SourcedBrief } from "@/components/SourcedBrief";
import { collectorateFiles, eOfficeCitizen, eOfficeCollectorates, eOfficeSecretariat } from "@/data/publicServiceActuals";

const count = new Intl.NumberFormat("en-IN");
const total = collectorateFiles.reduce((sum, [, value]) => sum + value, 0);

export default function FilePendencyPage() {
  return (
    <SourcedBrief title="eOffice File Activity" description="Official file creation figures for collectorates and the Secretariat. Use the citizen portal to track a specific file or tapal."
      metrics={[
        { label: "Collectorate files created", value: count.format(total), note: "14 district collectorates", provenance: eOfficeCollectorates },
        { label: "Secretariat files created", value: "3,10,458", note: "53 published department rows", provenance: eOfficeSecretariat },
      ]}
      references={[
        { title: "Collectorate eFile statistics", description: "Files and tapals by district, including current and previous-year views.", provenance: eOfficeCollectorates },
        { title: "Secretariat eFile statistics", description: "Published creation and movement counts by department.", provenance: eOfficeSecretariat },
        { title: "Track an eOffice file", description: "Official lookup for a specific file or tapal reference.", provenance: eOfficeCitizen },
      ]}
    >
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <h2 className="text-sm font-extrabold text-slate-800">Files created by district</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {collectorateFiles.map(([district, value]) => (
            <li key={district} className="flex flex-wrap justify-between gap-x-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
              <span>{district}</span><strong className="tabular-nums">{count.format(value)}</strong>
            </li>
          ))}
        </ul>
      </section>
    </SourcedBrief>
  );
}
