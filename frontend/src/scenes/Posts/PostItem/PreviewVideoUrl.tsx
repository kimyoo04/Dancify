import ReactPlayer from "react-player";

export default function PreviewVideoUrl({ url }: { url: string }) {
  return (
    <div className="overflow-hidden rounded-md">
      <ReactPlayer
        url={url}
        controls
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}
