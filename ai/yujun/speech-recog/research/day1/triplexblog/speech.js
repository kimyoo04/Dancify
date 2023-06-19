var selector = function (el) { return document.querySelector(el); };
var speechStore = {
    texts: '',
    isRecognizing: true // 현재 음성 인식 중인지를 나타내는 프로퍼티
};
// 익명 함수를 정의하고 바로 실행 -> 코드 모듈화하여 전역 스코프 오염을 방지
(function () {
    /* Speech API start */
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // 만약 지원하지 않는 브라우저라면 알림 출력
    if (!("webkitSpeechRecognition" in window)) {
        alert("지원하지 않는 브라우저 입니다!");
    }
    else {
        var recognition_1 = new SpeechRecognition();
        recognition_1.interimResults = false; // true: 연속적 음절 인식 / false: 연속적 음절 인식 x
        recognition_1.lang = 'ko-KR'; // 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
        recognition_1.continuous = false; // true: 연속 결과 반환 / false: 단일 결과 반환
        recognition_1.maxAlternatives = 20000; // 숫자가 작을수록 발음대로 적고, 클수록 문장의 적합도에 따라 알맞은 단어로 대체
        // 음성 인식이 끝났을 때 수행되는 동작
        recognition_1.onspeechend = function () {
            recognition_1.stop();
            selector('.dictate').classList.remove("on"); // 버튼 동작(마이크 on/off 표시)
            speechStore.isRecognizing = true;
        };
        // 음성 인식 서비스 결과 반환
        recognition_1.onresult = function (e) {
            speechStore.texts = Array.from(e.results)
                .map(function (results) { return results[0].transcript; }).join("");
            console.log(speechStore.texts);
            selector('input').value = speechStore.texts;
        };
        /* Speech API END */
        // 음성인식 활성화
        var active_1 = function () {
            selector('.dictate').classList.add('on');
            recognition_1.start();
            speechStore.isRecognizing = false;
        };
        // 음성인식 비활성화 1: console에 찍기
        var unactive_1 = function () {
            selector('.dictate').classList.remove('on');
            recognition_1.stop();
            speechStore.isRecognizing = true;
            setTimeout(downloadCapturedText, 1000); // 1초 지연 후 자동 다운로드
        };
        // 캡처한 텍스트를 다운로드하는 함수
        function downloadCapturedText() {
            var element = document.createElement('a');
            var file = new Blob([speechStore.texts], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = 'captured_text.txt';
            document.body.appendChild(element);
            element.click();
        }
        // // 음성인식 비활성화 2: JSON 다운로드
        // const unactive = () => {
        //     (selector('.dictate') as HTMLElement).classList.remove('on')
        //     recognition.stop();
        //     speechStore.isRecognizing = true;
        //     // 로그 다운로드
        //     fetch('http://127.0.0.1:3300/download_logs', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ log: speechStore.texts }),
        //     })
        //     .then(response => response.blob())
        //     .then(blob => {
        //         const url = window.URL.createObjectURL(blob);
        //         const a = document.createElement('a');
        //         a.href = url;
        //         a.download = 'logs.txt';
        //         a.click();
        //     });
        // };
        selector('.dictate').addEventListener('click', function () {
            if (speechStore.isRecognizing) {
                active_1();
            }
            else {
                unactive_1();
            }
        });
    }
})();
