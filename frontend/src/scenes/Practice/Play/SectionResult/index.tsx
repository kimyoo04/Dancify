import { useAppSelector } from "@toolkit/hook";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";
import SpeechCommand from "./SpeechCommand";
import { IPractice } from "@type/practice";
import convertToOrdinal from "@util/convertToOrdinal";

export default function SectionResult({ data }: { data: IPractice }) {
  const { playIndex } = useAppSelector((state) => state.practice);

  return (
    <div className="space-y-20">
      <h1>{convertToOrdinal(playIndex)} 구간 연습 결과</h1>

      <ProgressBar />

      <div className="row-center gap-10">
        <ScoreBoard />
        <SpeechCommand />
      </div>
    </div>
  );
}
