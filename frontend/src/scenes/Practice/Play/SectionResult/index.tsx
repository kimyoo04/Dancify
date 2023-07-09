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
  const { playIndex, isRealMode } = useAppSelector((state) => state.practice);

  return (
    <div className="h-full w-full space-y-5 dark:text-black">
      <h1 className="text-2xl font-black">
        {isRealMode ? "실전 모드 결과" : `${convertToOrdinal(playIndex)} 구간 연습 결과`}
      </h1>

      <ProgressBar />

      <div className="col-center w-full gap-6 lg:flex-row">
        <ScoreBoard />
        <SpeechCommand
          handleMoveNextStep={handleMoveNextStep}
          handleMoveNextSection={handleMoveNextSection}
        />
      </div>
    </div>
  );
}
