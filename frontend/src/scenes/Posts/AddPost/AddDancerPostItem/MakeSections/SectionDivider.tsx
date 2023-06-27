import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import ReactPlayer from "react-player";

export default function SectionDivider({
  playerRef,
  progress,
  setProgress,
}: {
  playerRef: MutableRefObject<ReactPlayer | null>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  const dispatch = useAppDispatch();
  const timeStamps = useAppSelector((state) => state.post.timeStamps);

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current) {
      const progressBar = event.currentTarget;
      const clickPosition =
        event.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const clickRatio = clickPosition / progressBarWidth;
      const duration = playerRef.current.getDuration();
      const seekTime = duration * clickRatio;

      playerRef.current.seekTo(seekTime);
      setProgress(clickRatio);
      dispatch(
        postActions.createTimeStamp({
          time: Math.round(seekTime),
          ratio: clickRatio,
        })
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-md border p-3">
      <div className="pb-2">
        <h3 className="text-xl font-medium">구간 선택</h3>
      </div>

      {/* 진행 바 영역 */}
      <div
        className="relative h-10 w-full cursor-pointer bg-muted-foreground"
        onClick={handleProgressBarClick}
      >
        <div
          style={{
            width: `${progress * 100}%`,
          }}
          className="h-full bg-primary"
        />
      </div>

      {/* 타임 스탬프 위치 마커들 */}
      <div className="relative h-8 w-full cursor-pointer">
        {timeStamps.map((timeStamp, index) => (
          <div
            key={timeStamp.time}
            style={{
              left: `${timeStamp.ratio * 100}%`,
            }}
            className={`absolute z-10 h-6 w-2 -translate-x-1/2 rounded-t ${
              index % 2 === 0 ? "bg-secondary" : "bg-red-500"
            }`}
            onClick={() =>
              dispatch(postActions.removeTimeStamp(timeStamp.time))
            }
          />
        ))}
      </div>
    </div>
  );
}
