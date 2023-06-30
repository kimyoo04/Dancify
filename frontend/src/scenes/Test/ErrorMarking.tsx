import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

type ErrorData = { start: number; end?: number }[];


const ErrorMarking = () => {
  const errorData: ErrorData = [
    { start: 2 },
    { start: 3, end: 5 },
    { start: 6, end: 13 },
  ];

  const playerRef = useRef<ReactPlayer | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const progressBar = progressBarRef.current;

    if (progressBar) {
      const handleTimeUpdate = () => {
        const player = playerRef.current;
        if (player) {
          setDuration(player.getDuration())
        }
      };

      const interval = setInterval(handleTimeUpdate, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer2/32e1209ujqwi0dj01289jd12.m3u8" // 비디오 URL을 적절하게 변경해주세요
        controls
        width={"100%"}
        height={"100%"}
      />
      <div className="px-4">
        {/* 전체 길이 바 영역 */}
        <div ref={progressBarRef} className="relative -mt-4 h-4 w-full">
          {/* 에러 마커들 */}
          {errorData.map((error, index) => (
            <button
              key={index}
              style={{
                position: "absolute",
                left: `${(error.start / duration) * 100}%`,
                width: error.end
                  ? `${((error.end - error.start) / duration) * 100}%`
                  : "2px",
                top: 0,
                height: "100%",
                background: "red",
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ErrorMarking;
