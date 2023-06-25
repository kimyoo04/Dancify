import { useAppSelector } from "@toolkit/hook";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";
import SpeechCommand from "./SpeechCommand";
import { IPractice } from "@type/practice";
import convertToOrdinal from "@util/convertToOrdinal";

export default function SectionResult({ data }: { data: IPractice }) {
  const { playIndex } = useAppSelector((state) => state.practice);

  return (
    <div className="h-full w-full space-y-10">
      <h1 className="text-xl font-medium">{convertToOrdinal(playIndex)} 구간 연습 결과</h1>

      <ProgressBar />

      <div className="col-center w-full gap-6 sm:gap-10 lg:flex-row">
        <ScoreBoard />
        <SpeechCommand />
      </div>
    </div>
  );
}
