import { useAppSelector } from "@toolkit/hook";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import {
  convertKey,
  preprocessErrorTimeData,
} from "@util/preprocessErrorTimeData";
import { IFeedbackDetail, TError } from "@type/feedbacks";
import { feedbackJsonData } from "@scenes/FeedBacks/data/feedbackJsonData";
import { Separator } from "@components/ui/separator";

export default function DanceablePlayer({ data }: { data: IFeedbackDetail }) {
  // 동영상 및 진행 바 관련
  const playerRef = useRef<ReactPlayer>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // 현재 section 동영상의 전체 길이
  const [duration, setDuration] = useState(0);

  // 현재 section index
  const sectionIndex = useAppSelector((state) => state.feedback.sectionIndex);

  // 동영상이 바뀔 때마다 진행 바 초기화
  useEffect(() => {
    const progressBar = progressBarRef.current;
    const player = playerRef.current;
    if (progressBar && player) setDuration(player.getDuration());
  }, []);

  const borderColors = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
  ];
  const bgColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md">
        <ReactPlayer
          ref={playerRef}
          url={data.sections[sectionIndex].danceablevideo}
          controls
          width={"100%"}
          height={"100%"}
        />
      </div>

      <div className="w-full space-y-1 rounded-md bg-white p-4 text-black">
        <div>
          <h2 className="mb-4 text-xl font-bold">
            신체부위 별 댄서와 다른 구간
          </h2>
          <Separator className="mb-3" />
        </div>

        {/* 전체 길이 바 영역 */}
        {Object.entries(feedbackJsonData.error).map(
          ([errorType, errorTimes], index) => (
            <div
              key={errorType}
              ref={progressBarRef}
              className="relative h-4 w-full"
            >
              {/* 전체 길이 */}
              <div className="absolute top-0 h-full w-full bg-gray-300"></div>

              {/* 에러 마크들 */}
              {preprocessErrorTimeData(errorTimes).map((error, count) => (
                <button
                  key={errorType + index + "errorBar" + count}
                  style={{
                    left: `${(error.start / duration) * 100}%`,
                    width: error.end
                      ? `${((error.end - error.start) / duration) * 100}%`
                      : "16px",
                    border: `2px solid ${borderColors[index]}`,
                    backgroundColor: bgColors[index],
                  }}
                  className="absolute top-0 h-full"
                />
              ))}
            </div>
          )
        )}

        {/* 범례 */}
        <ul className="m-0 flex flex-wrap items-center gap-4 p-0">
          {Object.keys(feedbackJsonData.error).map((errorType, index) => (
            <div key={index + "errorType"} className="row-center gap-2">
              <div
                style={{
                  border: `2px solid ${borderColors[index]}`,
                  backgroundColor: bgColors[index],
                }}
                className="mt-0.5 h-4 w-8"
              ></div>

              <div className="row-center space-x-1">
                <span className="text-xs font-thin text-gray-800">
                  {convertKey(errorType as TError)}
                </span>
                <span className="text-xs font-thin text-gray-800">
                  {feedbackJsonData.error[errorType as TError].length}회
                </span>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
