import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const StreamCapture = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // 녹화된 데이터를 State에 저장하는 함수
  const handleDataAvailable = useCallback(
    ({ data }: { data: Blob }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat([data]));
      }
    },
    [setRecordedChunks]
  );

  // 녹화 시작 함수
  const handleStartRecordClick = useCallback(() => {
    setRecording(true);
    if (webcamRef.current !== null && webcamRef.current.stream !== null) {
      // 1. MediaStream을 매개변수로 MediaRecorder 생성자 호출
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });

      if (mediaRecorderRef.current !== null) {
        // 2. 녹화된 데이터를 저장할 이벤트 리스너 등록
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable // 녹화된 데이터를 State에 저장
        );
        mediaRecorderRef.current.start();
      }
    }
  }, [webcamRef, setRecording, mediaRecorderRef, handleDataAvailable]);

  // 3. 녹화 중지 이벤트 핸들러 등록
  const handleStopRecordClick = useCallback(() => {
    if (mediaRecorderRef.current !== null) {
      mediaRecorderRef.current.stop(); // 녹화 중지
    }
    setRecording(false);
  }, [mediaRecorderRef, setRecording]);

  // 4. recordedChunks에 녹화된 영상 다운로드
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      // 파일 형식 지정
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      // 임시 a 태그를 만들어서 다운로드
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = url;
      a.download = "react-webcam-stream-record.webm";
      a.click();
      window.URL.revokeObjectURL(url);

      // 녹화된 영상 초기화
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopRecordClick}>Stop Record</button>
      ) : (
        <button onClick={handleStartRecordClick}>Start Record</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </>
  );
};

export default StreamCapture;
