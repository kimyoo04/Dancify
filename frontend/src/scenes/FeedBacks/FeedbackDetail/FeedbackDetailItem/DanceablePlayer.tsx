import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@toolkit/hook";

import ReactPlayer from "react-player";
import { Separator } from "@components/ui/separator";

import {
  convertKey,
  preprocessErrorTimeData,
} from "@util/preprocessErrorTimeData";

import { IFeedbackDetail, TError } from "@type/feedbacks";
import { FeedbackJsonData } from "@type/feedbackJson";

export default function DanceablePlayer({
  data,
  bestJsonData,
}: {
  data: IFeedbackDetail;
  bestJsonData: FeedbackJsonData;
}) {
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

    if (progressBar) {
      const handleTimeUpdate = () => {
        const player = playerRef.current;
        if (player) {
          setDuration(player.getDuration());
        }
      };

      const interval = setInterval(handleTimeUpdate, 1000);
      return () => clearInterval(interval);
    }
  }, [sectionIndex]);

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
      <div className="space-y-4">
        {/* 원본 비율로 세로로 길게 영상 노출 */}
        <div className="overflow-hidden rounded-md sm:hidden">
          <ReactPlayer
            ref={playerRef}
            url={data.sections[sectionIndex].danceableVideo}
            controls
            width={"100%"}
            height={"100%"}
          />
        </div>

        {/* 세로로 길어지는 것을 줄여서 영상 노출 */}
        <div className="hidden overflow-hidden rounded-md sm:block">
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              ref={playerRef}
              url={data.sections[sectionIndex].danceableVideo}
              controls
              width="100%"
              height="100%"
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="w-full space-y-1 rounded-md border bg-white p-4 text-black">
        <div>
          <h2 className="mb-4 text-xl font-bold">
            신체 부위별 댄서와 다른 구간
          </h2>
          <Separator className="mb-3" />
        </div>

        {/* 전체 길이 바 영역 */}
        {Object.entries(bestJsonData.error).map(
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
          {Object.keys(bestJsonData.error).map((errorType, index) => (
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
                  {bestJsonData.error[errorType as TError].length}회
                </span>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
