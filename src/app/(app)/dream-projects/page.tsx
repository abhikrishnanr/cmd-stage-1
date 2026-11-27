import { dreamProgrammePage, ProgrammeIndex } from "@/components/ProgrammeEvidence";
import { dreamProgrammeRecords, dreamProjectsWorkshop } from "@/data/programmeEvidence";

export default function DreamProjectsPage() {
  return <ProgrammeIndex config={dreamProgrammePage} programs={dreamProgrammeRecords} featuredSource={dreamProjectsWorkshop} />;
}
