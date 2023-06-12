import Webcam from "react-webcam";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Test() {
  return (
    <>
      <Webcam />
      asdasdasds
      <ReactPlayer
        className="react-player fixed-bottom"
        url="/video/airport.mp4"
        width="100%"
        height="100%"
        controls={true}
      />
    </>
  );
}
