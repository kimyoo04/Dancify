import { Separator } from "@components/ui/separator";
import { IAverageScore } from "@type/feedbackJson";
import {TMessage } from "@type/feedbacks";

export default function Description({
  bestScores,
  message,
}: {
  bestScores: IAverageScore
  message: TMessage[];
  }) {

  const scores = Object.values(bestScores);
  const totalScore = scores.reduce((acc, cur) => acc + cur, 0);
  const avgScore = totalScore / scores.length;

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-bold">최종 점수</h2>
        <Separator className="mb-3" />

        <div className="col-center">
          <span className="text-3xl font-bold">{avgScore}</span>
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-xl font-bold">평가 메시지</h2>
        <Separator className="mb-3" />

        <ul className="col-start m-0 list-none gap-1 rounded-md border px-2 py-1">
          {message.map((msg, index) => (
            <li key={index}>
              <span>- {msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
