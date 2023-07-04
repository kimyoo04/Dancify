import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { useRouter } from "next/router";
import * as poseDetection from "@tensorflow-models/pose-detection";

import Link from "next/link";
import Webcam from "react-webcam";
import { loadMoveNetDetector, detect } from "@ai/movenet";

import { useAppDispatch } from "@toolkit/hook";
import { practiceActions } from "@features/practice/practiceSlice";
import { postPracticeStart } from "@api/dance/postPracticeStart";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { getFullScreen } from "@util/screenMode";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import LoadingModal from "./LoadingModal";
import StandByModal from "./StandByModal";
import { Expand } from "lucide-react";
import Loading from "@components/Loading";
import Logo from "@components/Logo";

export default function Prepare({
  data,
  setDetector,
}: {
  data: IPractice;
  setDetector: Dispatch<SetStateAction<poseDetection.PoseDetector | null>>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [installLoading, setInstallLoading] = useState(true); // 모델, 웹캠 로딩
  const [isDevice, setIsDevice] = useState(false); // 웹캠 유무 확인
  const [isLoading, setIsLoading] = useState(false); // 버튼 로딩 처리
  const [isDetector, setIsDetector] = useState(false); // movenet 유무 확인
  const webcamRef = useRef<Webcam>(null);

  // 카메라 유무 확인
  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) => {
      setIsDevice(mediaDevices.some(({ kind }) => kind === "videoinput"));
    },
    [setIsDevice]
  );

  // 모든 환경이 준비되었는지 확인
  useEffect(() => {
    async function initPractice() {
      // 모델 로드 확인
      const moveNetDetector = await loadMoveNetDetector();
      setDetector(moveNetDetector);

      // 카메라 유무 확인
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
      // 1초마다 체크해서 모델 준비됐는지 확인
      const webcamTag = webcamRef.current?.video as HTMLVideoElement;

      let elapsedTime = 0;
      const modelPlayCheck = setInterval(async () => {
        if ((await detect(webcamTag, moveNetDetector)) !== "error") {
          clearInterval(modelPlayCheck);
          // 모델 로드 성공
          setIsDetector(true);
          setInstallLoading(false);
        } else {
          // 30초가 지난 경우 로딩 실패 처리
          elapsedTime += 1;
          if (elapsedTime >= 30) {
            clearInterval(modelPlayCheck);
            //모델 로드 실패
            setIsDetector(false);
            setInstallLoading(false);
          }
        }
      }, 1000);
    }
    initPractice();
  }, [handleDevices, setDetector]);

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
    <div className="h-full w-screen">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          top: "50%",
          opacity: 0,
          width: "0%",
          height: "0%",
        }}
      />

      <MainWrapper>
        {installLoading ? (
          <LoadingModal>
            <div className="col-center h-full w-full">
              <div className="col-between h-[80%] w-full">
                <div>
                  <Loading />
                </div>

                <div className="col-center">
                  <p className="text-xl font-medium text-secondary">
                    잠시만 기다려주세요.
                  </p>
                  <p>연습을 위한 환경을 확인 중입니다.</p>
                  <p>웹캠에 얼굴이 나오도록 해주세요.</p>
                </div>

                <div>
                  <Logo />
                </div>
              </div>
            </div>
          </LoadingModal>
        ) : (
          <StandByModal>
            <div className="col-center h-full w-full">
              <div className="col-between h-[80%] w-full">
                <div>
                  <div className="space-x-2 text-xl font-medium">
                    {isDevice ? (
                      <span className="font-bold text-green-500">✓</span>
                    ) : (
                      <span className="font-bold text-red-500">✕</span>
                    )}
                    <span>웹캠 유무 확인</span>
                  </div>
                  <div className="space-x-2 text-xl font-medium">
                    {isDetector ? (
                      <span className="font-bold text-green-500">✓</span>
                    ) : (
                      <span className="font-bold text-red-500">✕</span>
                    )}
                    <span>AI 모델 불러오기</span>
                  </div>
                </div>

                <div className="col-center">
                  {/* //? 연습과 실전 모드 변수 필요 */}
                  {isDevice && isDetector ? (
                    <p className="text-lg font-medium">
                      연습 모드 준비가 완료되었습니다.
                    </p>
                  ) : (
                    <p className="text-lg font-medium">
                      연습 모드 조건에 부합하지 않습니다.
                    </p>
                  )}
                </div>

                <div className="col-center w-full gap-3">
                  {isLoading ? (
                    <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      로딩 중..
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        setIsLoading(true);
                        const response = await postPracticeStart(
                          data.dancerPost.postId
                        );
                        dispatch(
                          practiceActions.setFeedbackId(response.feedbackId)
                        ); // feedbackId 저장
                        getFullScreen();
                        dispatch(practiceActions.moveNextStep());
                        // POST 요청
                      }}
                      className="row-center w-full gap-2"
                      disabled={!isDevice || !isDetector}
                      variant={
                        isDevice && isDetector ? "default" : "destructive"
                      }
                    >
                      <span className="text-lg">연습 시작</span>
                      <Expand />
                    </Button>
                  )}

                  <Link
                    href={`/dancer/${data.dancerPost.postId}`}
                    replace={true}
                    className="w-full"
                  >
                    <Button className="row-center w-full" variant={"outline"}>
                      <span className="text-lg">취소</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </StandByModal>
        )}
      </MainWrapper>

      <BottomWrapper>
        <p className="md:text-lg md:font-medium">
          연습 완료 후, AI와 댄서의 피드백 서비스를 이용할 수 있습니다.
        </p>
      </BottomWrapper>
    </div>
  );
}
