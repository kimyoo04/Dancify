import { useEffect, useState } from "react";
import speechRecogFn from "@ai/speech";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { practiceActions } from "@features/practice/practiceSlice";

import { Mic } from "lucide-react";
import { Button } from "@components/ui/button";
import ButtonWrapper from "@components/Animation/ButtonWrapper";
import SpeechLoading from "./SpeechLoading";

interface SpeechCommandProps {
  handleMoveNextStep: () => void;
  handleMoveNextSection: () => void;
}

export default function SpeechCommand({
  handleMoveNextStep,
  handleMoveNextSection,
}: SpeechCommandProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { playIndex, selectedSections } = useAppSelector(
    (state) => state.practice
  );
  const [isListening, setIsListening] = useState(true); // 음성 인식 유무
  const [transcript, setTranscript] = useState(""); // 음성 인식 결과 텍스트
  const [isMicrophone, setIsMicrophone] = useState(true); // 마이크 유무 확인

  function updateCallback(text: string | null) {
    if (text === null) {
      setIsMicrophone(false);
      return;
    }
    // 음성 인식 결과 출력
    setTranscript(text);
    setIsListening(false);

    // 명령어 처리
    if (text === "완료" && playIndex === selectedSections.length - 1)
      handleMoveNextStep();
    if (text === "다음" && playIndex < selectedSections.length - 1)
      handleMoveNextSection();
    if (text === "한번더") dispatch(practiceActions.showSectionPlay());
    if (text === "종료") router.replace("/");
    return;
  }

  useEffect(() => {
    speechRecogFn(updateCallback);
  }, []);

  return (
    <section className="h-[500px] w-full flex-shrink-0 rounded-md bg-background p-6 shadow-md dark:bg-white lg:h-[550px] lg:w-[360px] xl:w-[440px]">
      <div className="col-between h-full w-full">
        <div className="w-full space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            음성 인식 명령
          </h2>
          <p className="text-sm text-muted-foreground">
            음성을 통해 동작을 명령할 수 있습니다.
          </p>
        </div>

        {/* 녹음된 음성 */}
        <div>
          {!isListening && transcript !== "" ? (
            <p className="text-2xl font-medium">{transcript}</p>
          ) : isListening ? (
            <SpeechLoading />
          ) : null}
        </div>

        <div className="col-center gap-5">
          <div className="col-start gap-2">
            <div className="row-center gap-2">
              <Button className="h-8 w-16 p-0">
                <span className="text-sm">한 번 더</span>
              </Button>
              <p className="text-sm">현재 구간 한 번 더 연습</p>
            </div>

            {playIndex < selectedSections.length - 1 ? (
              <div className="row-center gap-2">
                <Button className="h-8 w-16 p-0">
                  <span className="text-sm">다음</span>
                </Button>
                <p className="text-sm">다음 구간 연습</p>
              </div>
            ) : (
              <div className="row-center gap-2">
                <Button className="h-8 w-16 p-0">
                  <span className="text-sm">완료</span>
                </Button>
                <p className="text-sm">최종 결과 보기</p>
              </div>
            )}
            <div className="row-center gap-2">
              <Button className="h-8 w-16 p-0">
                <span className="text-sm">종료</span>
              </Button>
              <p className="text-sm">연습 종료</p>
            </div>
          </div>

          {/* 마이크 버튼 */}
          <Button
            variant={isMicrophone ? "default" : "destructive"}
            className="h-16 w-16 rounded-full text-white"
            onClick={() => {
              setIsListening(true);
              speechRecogFn(updateCallback);
            }}
            disabled={!isMicrophone}
          >
            <ButtonWrapper>
              <Mic size={40} />
            </ButtonWrapper>
          </Button>
        </div>
      </div>
    </section>
  );
}
