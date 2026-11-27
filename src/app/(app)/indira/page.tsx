import { indiraProgrammePage, ProgrammeIndex } from "@/components/ProgrammeEvidence";
import { indiraApproachSource, indiraProgrammeRecords } from "@/data/programmeEvidence";

export default function IndiraPage() {
  return <ProgrammeIndex config={indiraProgrammePage} programs={indiraProgrammeRecords} featuredSource={indiraApproachSource} />;
}
