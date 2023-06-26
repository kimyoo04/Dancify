// $라는 이름의 함수 정의하고, 해당 함수는 주어진 selector에 해당하는 첫번째 요소 리턴
const $ = (el) => document.querySelector(el);

const store = {
  texts: '',                 // 인식된 텍스트 저장
  isRecognizing: true        // 현재 음성 인식 중인지를 나타내는 프로퍼티
};

// 익명 함수를 정의하고 바로 실행 -> 코드 모듈화하여 전역 스코프 오염을 방지
(() => {
  /* Speech API start */
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // 만약 지원하지 않는 브라우저라면 알림 출력
  if (!("webkitSpeechRecognition" in window)) {
    alert("지원 안되는 브라우저 입니다!")
  } else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;     // true: 연속적 음절 인식 / false: 연속적 음절 인식 x
    recognition.lang = 'ko-KR';             // 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
    recognition.continuous = false;         // true: 연속 결과 반환 / false: 단일 결과 반환
    recognition.maxAlternatives = 20000;    // maxAlternatives가 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.

    // 음성 인식이 끝났을 때 수행되는 동작
    recognition.onspeechend = function () {
      recognition.stop();
      $('.dictate').classList.remove("on");   // 버튼 동작(마이크 on/off 표시)
      store.isRecognizing = true;
    };

    // 음성 인식 서비스 결과 반환
    recognition.onresult = function (e) {
      store.texts = Array.from(e.results)
        .map(results => results[0].transcript).join("");

      console.log(store.texts)
      $('input').value = store.texts;
    };
    /* Speech API END */

    const active = () => {
      $('.dictate').classList.add('on')
      recognition.start();
      store.isRecognizing = false;
    };

    const unactive = () => {
      $('.dictate').classList.remove('on')
      recognition.stop();
      store.isRecognizing = true;
    };

    $('.dictate').addEventListener('click', () => {
      if (store.isRecognizing) {
        active();
      } else {
        unactive();
      }
    });
  }
})();