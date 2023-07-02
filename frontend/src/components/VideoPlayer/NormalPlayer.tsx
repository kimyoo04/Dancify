import { TVideo } from "@type/posts";
import ReactPlayer from "react-player";

export default function NormalPlayer({url}: { url : TVideo }) {
  return (
    <div className="relative pt-[56.25%]">
      <ReactPlayer url={url} playing={true} muted controls width='100%'
      height='100%' className="absolute top-0 left-0 w-full h-full" />
    </div>
  )
}