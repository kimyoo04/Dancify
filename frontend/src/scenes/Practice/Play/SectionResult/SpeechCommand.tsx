import { useEffect } from "react";
import {motion} from "framer-motion";
import { wordToCommand } from "@ai/speech";
import { useRouter } from "next/router";
import { useAppDispatch } from "@toolkit/hook";
import { practiceActions } from "@features/practice/practiceSlice";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Mic } from "lucide-react";
import { Button } from "@components/ui/button";
import ButtonWrapper from "@components/Animation/ButtonWrapper";

export default function SpeechCommand() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    async function textToCommand(text: string) {
      const command = await wordToCommand(text);
      console.log("text", text);
      console.log("command", command);

      if (command === "다음") dispatch(practiceActions.moveNextSection());
      if (command === "한번더") dispatch(practiceActions.moveNextSection());
      if (command === "종료") router.replace("/");
    }
    textToCommand(transcript);
  }, [transcript, dispatch, router, resetTranscript]);

  return (
    <section className="h-[500px] w-full flex-shrink-0 rounded-md bg-background p-6 shadow-md lg:w-[360px] xl:w-[440px]">
      {browserSupportsSpeechRecognition ? (
        <div className="col-between h-full w-full">
          {/* 녹음된 음성 */}
          <div className="col-center h-2/3 w-full rounded-md">
            {!listening && (
              <>
                <p className="text-2xl font-medium">녹음된 음성</p>
                <div>
                  <p>{transcript}</p>
                </div>
              </>
            )}
          </div>

          {/* 마이크 버튼 */}
          {listening ? (
            <motion.div className="rounded-full border border-primary p-2">
              <Button
                className="h-20 w-20 rounded-full text-white"
                onClick={SpeechRecognition.stopListening}
              >
                <ButtonWrapper>
                  <Mic size={40} />
                </ButtonWrapper>
              </Button>
            </motion.div>
          ) : (
            <Button
              className="h-20 w-20 rounded-full text-white"
              onClick={() => {
                SpeechRecognition.startListening({
                  continuous: true,
                  language: "ko",
                });
              }}
            >
              <ButtonWrapper>
                <Mic size={40} />
              </ButtonWrapper>
            </Button>
          )}
        </div>
      ) : (
        <span>브라우저가 음성인식을 지원하지 않습니다. ㅠㅅㅠ</span>
      )}
    </section>
  );
}
