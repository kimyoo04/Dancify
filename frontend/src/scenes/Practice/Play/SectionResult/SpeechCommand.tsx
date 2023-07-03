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
    <section className="h-[500px] w-full flex-shrink-0 rounded-md bg-background p-6 shadow-md dark:bg-white lg:w-[360px] xl:w-[440px]">
      <div className="col-between h-full w-full">
        <h1 className="text-xl font-medium">음성 인식 명령</h1>

        {/* 녹음된 음성 */}
        <div className="col-center w-full rounded-md">
          {transcript !== "" ? (
            <p className="text-2xl font-medium">{transcript}</p>
          ) : (
            isListening && <SpeechLoading />
          )}
        </div>

        {/* 마이크 버튼 */}
        <Button
          variant={isMicrophone ? "default" : "destructive"}
          className="h-16 w-16 rounded-full text-white"
          onClick={() => {
            setIsListening(true)
            speechRecogFn(updateCallback)
          }}
          disabled={!isMicrophone}
        >
          <ButtonWrapper>
            <Mic size={40} />
          </ButtonWrapper>
        </Button>
      </div>
    </section>
  );
}
