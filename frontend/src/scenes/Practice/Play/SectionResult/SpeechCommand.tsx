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
  const [transcript, setTranscript] = useState("");
  const [isMicrophone, setIsMicrophone] = useState(true);

  function updateCallback(text: string | null) {
    if (text === null) {
      setIsMicrophone(false);
      return;
    }
    // 음성 인식 결과 출력
    setTranscript(text);

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
        {/* 녹음된 음성 */}
        <div className="col-center h-2/3 w-full rounded-md">
          {transcript !== "" ? (
            <p className="text-2xl font-medium">{transcript}</p>
          ) : (
            <SpeechLoading />
          )}
        </div>

        {/* 마이크 버튼 */}
        <Button
          variant={isMicrophone ? "default" : "destructive"}
          className="h-20 w-20 rounded-full text-white"
          onClick={() => speechRecogFn(updateCallback)}
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
