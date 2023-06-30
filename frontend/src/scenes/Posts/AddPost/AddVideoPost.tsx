import { useEffect, useState } from "react";
import { useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";
import TitleForm from "@components/tiptap/TitleForm";

import { Button } from "@components/ui/button";
import UploadVideo from "@components/UploadVideo";

import { useCreateVideoPostMutation } from "@api/posts/createVideoPost";
import PreviewVideoUrl from "../PostItem/PreviewVideoUrl";
import MosaicCheckBox from "@components/MosaicCheckBox.tsx";

export default function AddVideoPost() {
  // 동영상
  const [videoFileName, setVideoFileName] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File>();

  // 제목과 내용
  const { postTitle, postContent, isMosaic } = useAppSelector(
    (state) => state.post
  );

  // 동영상 미리보기 URL
  const videoPreview = videoFile ? URL.createObjectURL(videoFile) : undefined;

  // 이미지 메모리 누수 처리
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  const { mutateAsync } = useCreateVideoPostMutation();

  const onSubmit = async () => {
    // title, content, video 필수
    if (postTitle.length < 3 || postContent.length < 3 || !videoFile) return;

    const formData = new FormData();

    // 제목과 내용 넣기
    formData.append("title", postTitle);
    formData.append("content", postContent);

    // 비디오파일 넣기
    if (videoFile) formData.append("video", videoFile);

    // 얼굴 모자이크 유무 넣기
    console.log(`${isMosaic}`);
    formData.append("isMosaic", `${isMosaic}`); // "true" "false"

    // POST 요청
    mutateAsync(formData);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* 제목 텍스트 필드 */}
      <TitleForm isUpdate={false} />

      {/* 내용 작성 에디터 */}
      <Tiptap isUpdate={false} />

      {/* 동영상 드레그 앤 드롭 영역 */}
      <UploadVideo
        fileName={videoFileName}
        setFileName={setVideoFileName}
        setVideoFile={setVideoFile}
      />

      {/* 동영상 미리보기 */}
      {videoPreview && <PreviewVideoUrl url={videoPreview} />}

      {/* 얼굴 모자이크 유무 */}
      <MosaicCheckBox />

      <Button className="w-full" onClick={onSubmit}>
        작성 완료
      </Button>
    </div>
  );
}
