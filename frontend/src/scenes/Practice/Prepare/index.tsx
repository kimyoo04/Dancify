import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import * as poseDetection from "@tensorflow-models/pose-detection";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import LoadingModal from "./LoadingModal";
import StandByModal from "./StandByModal";
import { Expand } from "lucide-react";
import { getFullScreen } from "@util/screenMode";
import Loading from "@components/Loading";
import Link from "next/link";
import Logo from "@components/Logo";
import { loadMoveNetDetector } from "@ai/movenet";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch } from "@toolkit/hook";

export default function Prepare({
  data,
  setDetector,
}: {
  data: IPractice;
  setDetector: Dispatch<SetStateAction<poseDetection.PoseDetector | null>>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [isDevice, setIsDevice] = useState(false);
  const [isDetactor, setIsDetactor] = useState(false);

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
      // 모델 유무 확인
      setIsDetactor(true);
      // 카메라 유무 확인
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
      // 로딩 완료
      setLoading(false);
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
    <div className="min-h-[93%] w-screen">
      <MainWrapper>
        {loading ? (
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
                  <div>
                    <div>
                      {isDevice ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✕</span>
                      )}
                      <span>웹캠 유무 확인</span>
                    </div>
                  </div>
                  <div>
                    {isDetactor ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span className="text-red-500">✕</span>
                    )}
                    <span>AI 모델 불러오기</span>
                  </div>
                </div>

                <div className="col-center">
                  {/* //? 연습과 실전 모드 변수 필요 */}
                  {isDevice && isDetactor ? (
                    <p className="text-mediu,">
                      연습 모드 준비가 완료되었습니다.
                    </p>
                  ) : (
                    <p className="text-medium">
                      연습 모드 조건에 부합하지 않습니다.
                    </p>
                  )}
                </div>

                <div className="col-center w-full gap-3">
                  <Button
                    onClick={() => {
                      getFullScreen();
                      dispatch(practiceActions.increaseStep());
                    }}
                    className="row-center w-full gap-2"
                    disabled={!isDevice || !isDetactor}
                    variant={isDevice && isDetactor ? "default" : "destructive"}
                  >
                    <span className="text-lg">연습 시작</span>
                    <Expand />
                  </Button>
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
        <p>
          연습을 완료하시면, AI와 댄서의 피드백 서비스를 이용할 수 있습니다.
        </p>
      </BottomWrapper>
    </div>
  );
}
