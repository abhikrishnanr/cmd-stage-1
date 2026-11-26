import { CalendarClock, Database, ExternalLink } from "lucide-react";

type ModuleHeaderMetaProps = {
  lastUpdated?: string;
  source?: string;
  sourceUrl?: string;
};

export function ModuleHeaderMeta({ lastUpdated = "", source = "", sourceUrl }: ModuleHeaderMetaProps) {
  return (
    <div className="module-hero-side analytics-hero-side module-header-meta">
      <div className="module-meta-row">
        <span className="module-meta-label"><CalendarClock size={14} /> Data last updated</span>
        <span className={`module-meta-value ${lastUpdated ? "" : "is-empty"}`} aria-label={lastUpdated || "Not supplied"}>
          {lastUpdated}
        </span>
      </div>
      <div className="module-meta-row">
        <span className="module-meta-label"><Database size={14} /> Source</span>
        {source && sourceUrl ? (
          <a className="module-meta-value module-meta-link" href={sourceUrl} target="_blank" rel="noreferrer">
            {source}<ExternalLink size={13} />
          </a>
        ) : (
          <span className={`module-meta-value ${source ? "" : "is-empty"}`} aria-label={source || "Not supplied"}>
            {source}
          </span>
        )}
      </div>
    </div>
  );
}
