import {  useRef, useState } from "react";
import {useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";
import TitleForm from "@components/tiptap/TitleForm";

import { Button } from "@components/ui/button";
import UploadImage from "@components/UploadImage";

import UploadVideo from "@components/UploadVideo";
import { useUpdateVideoPost } from "@api/posts/updateVideoPost";

export default function EditFreePost({ id }: { id: string }) {
  // 추출썸네일
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // 이미지
  const [imageFileName, setImageFileName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();

  // 동영상
  const [videoFileName, setVideoFileName] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File>();

  // 제목과 내용
  const { postTitle, postContent } = useAppSelector((state) => state.post);
  const { mutateAsync } = useUpdateVideoPost();

  // 동영상에서 썸네일 이미지 추출
  const extractThumbnail = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      // 비디오의 0초로 이동
      video.currentTime = 0;

      // 비디오가 준비될 때까지 기다린 후 캡쳐
      video.onloadeddata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailDataUrl = canvas.toDataURL(); // 이미지를 데이터 URL로 변환
          setThumbnail(thumbnailDataUrl);
        }
      };
    }
  };

  const onSubmit = async () => {
    // title, content, video 필수
    if (postTitle.length < 3 || postContent.length < 3 || !videoFile) return;

    const formData = new FormData();

    // 비디오파일 넣기
    if (videoFile) formData.append("video", videoFile);

    // 이미지파일 넣기 혹은 썸네일이미지 생성
    if (imageFile) formData.append("thumbnail", imageFile);
    else await extractThumbnail();

    // 썸네일이미지 넣기
    if (thumbnail) {
      const thumbnailBlob = await fetch(thumbnail).then((res) => res.blob());
      formData.append("thumbnail", thumbnailBlob);
    }

    // 제목과 내용 넣기
    formData.append("title", postTitle);
    formData.append("content", postContent);

    // POST 요청
    mutateAsync({postId:id, formData});
    await new Promise((resolve) => setTimeout(resolve, 500));

    return;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <TitleForm isUpdate={true}/>
      <Tiptap isUpdate={true} />
      <UploadVideo
        videoRef={videoRef}
        fileName={videoFileName}
        setFileName={setVideoFileName}
        setVideoFile={setVideoFile}
      />
      <UploadImage
        fileName={imageFileName}
        setFileName={setImageFileName}
        setImageFile={setImageFile}
      />
      <Button className="w-full" onClick={onSubmit}>
        수정 완료
      </Button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
