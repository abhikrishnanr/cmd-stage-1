import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, Droplets, Gauge, Landmark } from "lucide-react";
import { LiveClock } from "@/components/AppShell";
import { CmSourceDetails } from "@/components/CmSourceDetails";
import { cabinetArchiveUrl } from "@/data/cabinetFeed";
import { cabinetArchiveCheckedOn, cabinetOfficialMeetings } from "@/data/cabinetOfficialArchive";
import { programmeMonitor, programmeProgress } from "@/data/deliveryActuals";
import { districtWaterAccessSource, districtWaterAccessTotal } from "@/data/districtWaterAccess";
import { leaderBySlug } from "@/data/leaders";
import styles from "./CmDashboardHero.module.css";

const number = new Intl.NumberFormat("en-IN");
const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" });
const cabinetChecked = date.format(new Date(cabinetArchiveCheckedOn));
const highlights = [
  { label: "Projects completed", value: number.format(programmeProgress.completed), detail: `Of ${number.format(programmeProgress.projects)} · 100 Days Programme`, href: "/delivery-rag", icon: ClipboardCheck, tone: "teal", fraction: programmeProgress.completed / programmeProgress.projects },
  { label: "Cabinet briefings published", value: number.format(cabinetOfficialMeetings.length), detail: `Ministry archive · Checked ${cabinetChecked}`, href: "/dashboard-cm#cabinet", icon: Landmark, tone: "blue", fraction: undefined },
  { label: "Rural homes with taps", value: number.format(districtWaterAccessTotal.with), detail: `${districtWaterAccessTotal.percent}% coverage · ${districtWaterAccessSource.period}`, href: "/water#rural-water", icon: Droplets, tone: "violet", fraction: districtWaterAccessTotal.with / districtWaterAccessTotal.denom },
] as const;

export function CmDashboardHero({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  const leader = leaderBySlug("vd-satheeshan");
  if (!leader) return null;

  return (
    <section aria-label="Chief Minister dashboard highlights" className={styles.hero}>
      <div className={styles.portrait}>
        <img src={leader.banner} alt={leader.name} width={2172} height={724} fetchPriority="high" />
      </div>
      <div className={styles.body}>
        <div className={styles.heading}>
          <div>
            <div className={styles.meta}>
              <span><img src="/img/kerala-govt-logo.svg" alt="" width={15} height={15} /> CM Dashboard</span>
              <span>{leader.title}</span>
              <span><LiveClock /></span>
            </div>
            <Heading className="display">{leader.name}</Heading>
            <p>{leader.dept}</p>
          </div>
          <CmSourceDetails label="Dashboard highlights sources" sources={[
            programmeMonitor,
            { source: "Chief Minister’s Office", dataset: "Official Cabinet briefing archive", url: cabinetArchiveUrl, period: "Since 18 May 2026", fetchedAt: cabinetChecked },
            districtWaterAccessSource,
          ]} />
        </div>

        <div className={styles.highlights}>
          {highlights.map(({ label, value, detail, href, icon: Icon, tone, fraction }) => (
            <Link key={href} href={href} className={styles.tile} data-tone={tone}>
              <span className={styles.tileHeader}><Icon size={16} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={13} aria-hidden="true" /></span>
              <strong>{value}</strong>
              <span className={styles.detail}>{detail}</span>
              {fraction !== undefined && <span className={styles.track} aria-hidden="true"><span style={{ width: `${fraction * 100}%` }} /></span>}
            </Link>
          ))}
        </div>
        <div className={styles.governance}>
          <Gauge size={15} aria-hidden="true" /> <span>Governance score</span>
          <span className={styles.blank} aria-hidden="true" />
          <span className="sr-only">Score field is blank</span>
        </div>
      </div>
    </section>
  );
}
