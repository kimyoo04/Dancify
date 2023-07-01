import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import StepFormWrapper from "./AddDancerPostItem/StepFormWrapper";
import MakeSections from "./AddDancerPostItem/MakeSections";
import Agreements from "./AddDancerPostItem/Agreements";
import DetailInfo from "./AddDancerPostItem/DetailInfo";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { postActions } from "@features/post/postSlice";

export default function AddDancerPost() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const step = useAppSelector((state) => state.post.step);
  const videoRef = useRef<HTMLVideoElement>(null); // 추출썸네일
  const [videoFile, setVideoFile] = useState<File>();
  const [videoFileName, setVideoFileName] = useState<string>("");

  // 연습 초기화
  useEffect(() => {
    dispatch(postActions.resetPostInfo());
  }, []);

  // 새로고침 및 뒤로가기 방지
  useEffect(() => {
    if (window) {
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, []);

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
