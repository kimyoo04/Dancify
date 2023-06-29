import { Separator } from "@components/ui/separator";
import { IErrorData } from "@type/feedbackJson";
import { TErrorTime, TMessage } from "@type/feedbacks";

type TError =
  | "pelvis_error_time"
  | "shoulder_error_time"
  | "forearm_error_time"
  | "leg_error_time";

const convertKey = (
  key:
    | "pelvis_error_time"
    | "shoulder_error_time"
    | "forearm_error_time"
    | "leg_error_time"
) => {
  const convertedKeys = {
    pelvis_error_time: "골반",
    shoulder_error_time: "어깨",
    forearm_error_time: "팔",
    leg_error_time: "다리",
  };

  return convertedKeys[key];
};

export default function Description({
  errorData,
  message,
}: {
  errorData: IErrorData;
  message: TMessage[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-bold">
          신체부위 별 댄서와 차이가 큰 시점
        </h2>
        <Separator className="mb-3" />

        <section className="space-y-3">
          {Object.entries(errorData).map(([errorType, errorTimes]) => (
            <div key={errorType} className="rounded-md border px-2 py-1">
              <h3 className="text-lg font-medium">
                {convertKey(errorType as TError)}
              </h3>
              <ul className="m-0 flex list-none flex-wrap items-center justify-start gap-2 p-0">
                {errorTimes.map((errorTime: TErrorTime, index: number) => (
                  <li key={index} className="flex-shrink-0 text-sm">
                    {errorTime}초
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">평가 메시지</h2>
        <Separator className="mb-3" />

        <ul className="col-start m-0 list-none gap-1 rounded-md border py-1 px-2">
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
