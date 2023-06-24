import { TVideo } from "@type/posts";
import ReactPlayer from "react-player";

export default function ShortPlayer({ url }: { url: TVideo}) {
  return (
    <div className="relative pt-[100%]">
      <ReactPlayer
        url={url}
        playing={false}
        width="100%"
        height="100%"
        className="absolute left-0 top-0"
      />
    </div>
  );
}
