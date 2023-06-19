import Webcam from "react-webcam";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

function ImageCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [img, setImg] = useState<string | null>(null);

  // 캡쳐한 이미지를 State에 저장하는 함수
  const handleImageCapture = useCallback(() => {
    if (webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      imageSrc !== null && setImg(imageSrc);
    }
  }, [webcamRef]);

  // 캡쳐할 영역 설정
  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
  };

  return (
    <div>
      {img === null ? (
        <>
          <Webcam
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            audio={false}
            height={500}
            width={500}
            ref={webcamRef}
            mirrored={true}
          />
          <button onClick={handleImageCapture}>Capture photo</button>
        </>
      ) : (
        <>
          <Image src={img} alt="screenshot" width={500} height={500} />
          <button onClick={() => setImg(null)}>Recapture</button>
        </>
      )}
    </div>
  );
}

export default ImageCapture;
