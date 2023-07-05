import { TVideo } from "@type/posts";
import ReactPlayer from "react-player";

export default function TogglePlayer({ videoUrl }: { videoUrl: TVideo }) {
  return (
    <div className="space-y-4">
      {/* 원본 비율로 세로로 길게 영상 노출 */}
      <div className="overflow-hidden rounded-md sm:hidden">
        <ReactPlayer
          url={videoUrl}
          controls
          width={"100%"}
          height={"100%"}
        />
      </div>

      {/* 세로로 길어지는 것을 줄여서 영상 노출 */}
      <div className="hidden overflow-hidden rounded-md sm:block">
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
            className="absolute left-0 top-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}