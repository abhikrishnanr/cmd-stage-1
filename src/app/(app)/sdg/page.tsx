import { PageHero } from "@/components/PageHero";
import { SectionCard } from "@/components/primitives";
import { sdgEditions, sdgGoals, sdgIndexSource, sdgKeralaSource, sdgSummary } from "@/data/sdg";

function category(score: number) {
  if (score === 100) return "Achiever";
  if (score >= 65) return "Front Runner";
  return "Performer";
}

export default function SDGPage() {
  return (
    <div className="space-y-5 p-4 sm:p-5">
      <PageHero
        icon="BadgeCheck"
        title="SDG Tracker"
        subtitle="Kerala’s published Sustainable Development Goal scores from the SDG India Index."
        gradient="linear-gradient(115deg,#12304f 0%,#17606d 53%,#117355 100%)"
        statusLabel="Official index"
        provenance={[sdgIndexSource, sdgKeralaSource]}
        stats={[
          { label: "Kerala composite", value: `${sdgSummary.kerala}/100`, sub: "2023–24", icon: "Gauge", provenance: sdgIndexSource },
          { label: "Position among states", value: "Joint first", sub: `Tied with ${sdgSummary.jointTopState}`, icon: "Award", provenance: sdgIndexSource },
          { label: "India composite", value: `${sdgSummary.india}/100`, sub: "2023–24", icon: "Flag", provenance: sdgIndexSource },
          { label: "Goal scores published", value: `${sdgGoals.length}`, sub: "2023–24", icon: "Grid3x3", provenance: sdgKeralaSource },
        ]}
      />

      <SectionCard title="Kerala’s composite score by edition" icon="TrendingUp" provenance={sdgKeralaSource} expandable>
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {sdgEditions.map((edition) => (
            <li key={edition.label} className="rounded-xl bg-teal-50 px-3.5 py-3 text-teal-950">
              <p className="text-xs font-bold">{edition.label}</p>
              <p className="mt-1 text-xl font-extrabold tabular-nums">{edition.score}<span className="text-xs font-medium"> / 100</span></p>
              <div className="mt-2 h-2 rounded-full bg-teal-100" aria-hidden="true"><div className="h-full rounded-full bg-teal-700" style={{ width: `${edition.score}%` }} /></div>
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Kerala goal scores" subtitle="2023–24 compared with 2020–21" icon="Grid3x3" provenance={sdgKeralaSource} expandable>
        <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
          {sdgGoals.map((goal, index) => (
            <article key={goal.title} className="rounded-xl border border-slate-200 p-3.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold text-slate-900"><span className="text-slate-600">{index + 1}.</span> {goal.title}</h3>
                <strong className="text-lg font-extrabold leading-none tabular-nums text-slate-900">{goal.score}</strong>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100" aria-hidden="true">
                <div className="h-full rounded-full" style={{ width: `${goal.score}%`, backgroundColor: goal.color }} />
              </div>
              <p className="mt-2 flex flex-wrap justify-between gap-1 text-xs text-slate-700"><span>{category(goal.score)}</span><span>2020–21 score {goal.previous}</span></p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
