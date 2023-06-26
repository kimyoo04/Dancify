export default async function speechRecogFn(
  updateCallback: (text: string | null) => void
) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!("webkitSpeechRecognition" in window)) {
    alert("음성인식을 지원하지 않는 브라우저 입니다!");
    updateCallback(null);
  } else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false; // true: 연속적 음절 인식 / false: 연속적 음절 인식 x
    recognition.lang = "ko-KR"; // 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
    recognition.continuous = false; // true: 연속 결과 반환 / false: 단일 결과 반환
    recognition.maxAlternatives = 20000; // maxAlternatives가 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.

    // 음성 인식이 끝났을 때 수행되는 동작
    recognition.onspeechend = () => {
      recognition.stop();
    };

    // 음성 인식 서비스 결과 반환
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const text = Array.from(e.results)
        .map((result) => result[0].transcript)
        .join("")
        .replaceAll(" ", "");
      updateCallback(wordToCommand(text));
    };

    recognition.start();
  }
}

export function wordToCommand(text: string) {
  const speechWord = text.replace(" ", "");
  // 다음, 한번더, 종료가 포함되어 있으면 해당 키워드를 반환
  if (speechWord.includes("다음")) {
    return "다음";
  } else if (speechWord.includes("한번더")) {
    return "한번더";
  } else if (speechWord.includes("종료")) {
    return "종료";
  } else if (speechWord.includes("완료")) {
    return "완료";
  } else {
    return speechWord;
  }
}
