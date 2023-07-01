import ReactPlayer from "react-player";

export default function PreviewVideoUrl({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="overflow-hidden rounded-md">
      <ReactPlayer url={videoUrl} controls width={"100%"} height={"100%"} />
    </div>
  );
}
