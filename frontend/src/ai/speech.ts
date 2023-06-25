const selector = (el: string): Element | null => document.querySelector(el);

const speechStore = {
  texts: "", // 인식된 텍스트 저장
  isRecognizing: true, // 현재 음성 인식 중인지를 나타내는 프로퍼티
};

// 익명 함수를 정의하고 바로 실행 -> 코드 모듈화하여 전역 스코프 오염을 방지
export function speechToText(speakButtonRef: any) {
  // 만약 지원하지 않는 브라우저라면 알림 출력
  if (!("webkitSpeechRecognition" in window)) {
    alert("지원하지 않는 브라우저 입니다!");
  } else {
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = false; // true: 연속적 음절 인식 / false: 연속적 음절 인식 x
    recognition.lang = "ko-KR"; // 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
    recognition.continuous = false; // true: 연속 결과 반환 / false: 단일 결과 반환
    recognition.maxAlternatives = 20000; // 숫자가 작을수록 발음대로 적고, 클수록 문장의 적합도에 따라 알맞은 단어로 대체

    // 음성 인식이 끝났을 때 수행되는 동작
    recognition.onspeechend = function () {
      recognition.stop();
      speakButtonRef.classList.remove("on"); // 버튼 동작(마이크 on/off 표시)
      speechStore.isRecognizing = true;
    };

    // 음성 인식 서비스 결과 반환
    recognition.onresult = function (e: {
      results: SpeechRecognitionResultList;
    }) {
      speechStore.texts = Array.from(e.results as SpeechRecognitionResultList)
        .map((results) => results[0].transcript)
        .join("");

      console.log(speechStore.texts);
      (selector("input") as HTMLInputElement).value = speechStore.texts;
    };
    /* Speech API END */

    // 음성인식 활성화
    const active = () => {
      speakButtonRef.classList.add("on");
      recognition.start();
      speechStore.isRecognizing = false;
    };

    // 음성인식 비활성화
    const unactive = () => {
      speakButtonRef.classList.remove("on");
      recognition.stop();
      speechStore.isRecognizing = true;
    };

    speakButtonRef.addEventListener("click", () => {
      if (speechStore.isRecognizing) {
        active();
      } else {
        unactive();
      }
    });
  }
}

// 텍스트 분류 함수
export async function wordToCommand(text:string) {
  const speechWord = text.replace(" ", "");
  const WD: Record<string, string[]> = {
    다음: ["다음", "다음으로", "다음순서로", "다음구간으로", "당", "담"],
    한번더: ["한번더", "함더", "한번더해", "함덕", "한번더할게"],
    종료: [
      "종료",
      "종료하다",
      "종료해",
      "종료해라",
      "종료할게",
      "종료할게요",
      "종료합니다",
    ],
  };

  for (const key of Object.keys(WD)) {
    if (WD[key].includes(speechWord)) {
      return key;
    }
  }

  return "기타";
}
