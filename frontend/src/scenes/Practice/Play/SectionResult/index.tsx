import { useAppSelector } from "@toolkit/hook";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";
import SpeechCommand from "./SpeechCommand";
import convertToOrdinal from "@util/convertToOrdinal";

interface SectionResultProps {
  handleMoveNextStep: () => void;
  handleMoveNextSection: () => void;
}

export default function SectionResult({
  handleMoveNextStep,
  handleMoveNextSection,
}: SectionResultProps) {
  const { playIndex } = useAppSelector((state) => state.practice);

  return (
    <div className="h-full w-full space-y-10 dark:text-black">
      <h1 className="text-xl font-medium">
        {convertToOrdinal(playIndex)} 구간 연습 결과
      </h1>

      <ProgressBar />

      <div className="col-center w-full gap-6 sm:gap-10 lg:flex-row">
        <ScoreBoard />
        <SpeechCommand
          handleMoveNextStep={handleMoveNextStep}
          handleMoveNextSection={handleMoveNextSection}
        />
      </div>
    </div>
  );
}
