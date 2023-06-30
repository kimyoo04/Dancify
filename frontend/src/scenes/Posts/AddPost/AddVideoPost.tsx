import { useRef, useState } from "react";
import { useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";
import TitleForm from "@components/tiptap/TitleForm";

import { Button } from "@components/ui/button";
import UploadVideo from "@components/UploadVideo";

import { useCreateVideoPostMutation } from "@api/posts/createVideoPost";

export default function AddVideoPost() {
  // 추출썸네일
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 동영상
  const [videoFileName, setVideoFileName] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File>();

  // 제목과 내용
  const { postTitle, postContent } = useAppSelector((state) => state.post);
  const { mutateAsync } = useCreateVideoPostMutation();

  const onSubmit = async () => {
    // title, content, video 필수
    if (postTitle.length < 3 || postContent.length < 3 || !videoFile) return;

    const formData = new FormData();

    // 비디오파일 넣기
    if (videoFile) formData.append("video", videoFile);

    // 제목과 내용 넣기
    formData.append("title", postTitle);
    formData.append("content", postContent);

    // POST 요청
    mutateAsync(formData);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <TitleForm isUpdate={false}/>
      <Tiptap isUpdate={false}/>
      <UploadVideo
        videoRef={videoRef}
        fileName={videoFileName}
        setFileName={setVideoFileName}
        setVideoFile={setVideoFile}
      />
      <Button className="w-full" onClick={onSubmit}>
        작성 완료
      </Button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
