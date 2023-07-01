import { useAppSelector } from "@toolkit/hook";
import StepFormWrapper from "./AddDancerPostItem/StepFormWrapper";
import MakeSections from "./AddDancerPostItem/MakeSections";
import Agreements from "./AddDancerPostItem/Agreements";
import DetailInfo from "./AddDancerPostItem/DetailInfo";
import { useRef, useState } from "react";

export default function AddDancerPost() {
  const step = useAppSelector((state) => state.post.step);
  const videoRef = useRef<HTMLVideoElement>(null); // 추출썸네일
  const [videoFile, setVideoFile] = useState<File>();
  const [videoFileName, setVideoFileName] = useState<string>("");

  return (
    <StepFormWrapper>
      {step === 1 && <Agreements />}
      {step === 2 && (
        <DetailInfo
          videoRef={videoRef}
          videoFile={videoFile}
          setVideoFile={setVideoFile}
          videoFileName={videoFileName}
          setVideoFileName={setVideoFileName}
        />
      )}
      {step === 3 && videoFile && (
        <MakeSections videoFileName={videoFileName} />
      )}
    </StepFormWrapper>
  );
}
