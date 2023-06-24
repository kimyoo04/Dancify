import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

export default function Prepare({
  onNext,
  data,
}: {
  onNext: () => void;
  data: IPractice;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window) {
      // 뒤로가기 방지
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      // 새로고침 방지
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <MainWrapper>
        <h1>Prepare</h1>

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
                  <Logo/>
                </div>
              </div>
            </div>
          </LoadingModal>
        ) : (
          <StandByModal>
            <div className="col-center h-full w-full">
              <div className="col-between h-[80%] w-full">
                <div>
                  {/* //? 체크리스트에 대한 데이터 넣어줘야함 */}
                  <span>웹캠 유무 확인</span>
                  <span>AI 모델 불러오기</span>
                  <span>영상 스트리밍 준비</span>
                </div>

                <div className="col-center">
                  {/* //? 연습과 실전 모드 변수 필요 */}
                  <p>연습 모드 준비가 완료되었습니다.</p>
                </div>

                <div className="col-center w-full gap-3">
                  <Button
                    onClick={() => {
                      getFullScreen();
                      onNext();
                    }}
                    className="row-center w-full gap-2"
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
