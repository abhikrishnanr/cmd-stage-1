"use client";

import { useState } from "react";
import Link from "next/link";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import KeralaMap from "@/components/KeralaMap";
import { TransportTable } from "@/components/TransportReport";
import { slugify } from "@/data/districts";
import { educationDistricts, educationSources } from "@/data/educationActuals";
import styles from "./education.module.css";

const whole = new Intl.NumberFormat("en-IN");
const signed = new Intl.NumberFormat("en-IN", { signDisplay: "exceptZero" });
const shortPercent = new Intl.NumberFormat("en-IN", { signDisplay: "exceptZero", minimumFractionDigits: 1, maximumFractionDigits: 1 });
const districtStats = educationDistricts.map((district) => ({
  ...district,
  change: (district.current - district.previous) / district.previous * 100,
}));

export function DistrictEducationProfile() {
  const [metric, setMetric] = useState<"change" | "smartShare">("change");
  const [district, setDistrict] = useState<string | null>(null);
  const coverage = metric === "smartShare";
  const ranked = [...districtStats].sort((a, b) => a[metric] - b[metric]);
  const selected = districtStats.find(({ name }) => name === district) ?? ranked[0];
  const values = Object.fromEntries(districtStats.map((row) => [row.name, row[metric]]));
  const format = (value: number) => `${coverage ? value.toFixed(1) : shortPercent.format(value)}%`;
  const colour = (fraction: number) => coverage ? `hsl(186 60% ${86 - fraction * 52}%)` : `hsl(217 66% ${38 + fraction * 51}%)`;
  const source = coverage ? educationSources.facilities : educationSources.districts;

  return (
    <>
      <div className={styles.districtControls}>
        <label>Map measure
          <select value={metric} onChange={(event) => setMetric(event.target.value === "smartShare" ? "smartShare" : "change")}>
            <option value="change">Enrolment change</option>
            <option value="smartShare">Smart-classroom coverage</option>
          </select>
        </label>
        <label>District on map
          <select value={selected.name} onChange={(event) => setDistrict(event.target.value)}>
            {districtStats.map(({ name }) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <CmSourceDetails label="Selected map measure source" sources={[source]} />
      </div>
      <div className={styles.mapGrid}>
        <figure className={styles.map}>
          <figcaption>{coverage ? "Schools with smart classrooms · 2024–25" : "Enrolment change, Classes I–X · 2024–25 vs 2023–24"}</figcaption>
          <KeralaMap values={values} height={286} fitDistricts onSelect={setDistrict} selectedDistrict={selected.name} colorScale={colour} formatValue={format} />
          <div className={styles.mapLegend}>
            <i aria-hidden="true" style={{ background: `linear-gradient(to right, ${colour(0)}, ${colour(1)})` }} />
            <div><span>{format(ranked[0][metric])}</span><span>{format(ranked[ranked.length - 1][metric])}</span></div>
          </div>
        </figure>
        <div className={styles.mapSummary}>
          <h3>{coverage ? "Five lowest coverage rates" : "Five largest proportional declines"}</h3>
          <ol className={styles.districtRank}>
            {ranked.slice(0, 5).map((row) => (
              <li key={row.name}>
                <button type="button" aria-pressed={selected.name === row.name} onClick={() => setDistrict(row.name)}>
                  <span>{row.name}</span><strong>{format(row[metric])}</strong>
                </button>
              </li>
            ))}
          </ol>
          <div className={styles.selected} aria-live="polite">
            <strong>{selected.name}</strong>
            <p>{coverage
              ? `${whole.format(selected.smartSchools)} schools with smart classrooms · ${format(selected.smartShare)} coverage`
              : `${whole.format(selected.current)} pupils in 2024–25 · ${signed.format(selected.current - selected.previous)} vs 2023–24`}</p>
            <Link href={`/districts/${slugify(selected.name)}`}>Open district profile</Link>
          </div>
        </div>
      </div>
      <details className={styles.tableDisclosure}>
        <summary>View all 14 districts</summary>
        <TransportTable label="District enrolment and smart-classroom coverage" columns={["District", "2023–24 pupils", "2024–25 pupils", "Pupil change", "Smart classrooms (schools)", "Coverage"]}
          rows={ranked.map(({ name, previous, current, smartSchools, smartShare }) => [name, previous, current, signed.format(current - previous), smartSchools, `${smartShare.toFixed(1)}%`])} />
        <div className={styles.districtTableSource}><span>Original district tables</span><CmSourceDetails label="District table sources" sources={[educationSources.districts, educationSources.facilities]} /></div>
      </details>
      <p className={styles.note}>Thiruvananthapuram recorded the largest decline in pupil numbers. Malappuram was the only district with an increase, up 68 pupils.</p>
    </>
  );
}
