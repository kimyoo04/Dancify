import StepBar from "./stepBar";
import ScoreBoard from "./ScoreBoard";
import SpeechCommand from "./SpeechCommand";
import { IPractice } from "@type/practice";

export default function SectionResult({ data }: { data: IPractice }) {
  return (
    <div className="space-y-20">
      <h1>{" "} 구간 연습 결과</h1>

      <StepBar />

      <div className="row-center gap-10">
        <ScoreBoard />
        <SpeechCommand />
      </div>
    </div>
  );
}