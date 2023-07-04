import {  useEffect, useMemo, useState } from "react";
import {useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";

import { Button } from "@components/ui/button";

import UploadVideo from "@components/UploadVideo";
import { useUpdateVideoPost } from "@api/posts/updateVideoPost";
import MosaicCheckBox from "@components/MosaicCheckBox";
import { ReloadIcon } from "@radix-ui/react-icons";
import PreviewVideoUrl from "../PostItem/PreviewVideoUrl";
import { useRouter } from "next/router";
import TitleForm from "../PostItem/TitleForm";

export default function EditVideoPost({ id }: { id: string }) {
  const router = useRouter();
  const [isWait, setIsWait] = useState(false);

  // 동영상
  const [videoFileName, setVideoFileName] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File>();

  // 제목, 내용, 모자이크 유무
  const { postTitle, postContent, isMosaic, postVideo } = useAppSelector(
    (state) => state.post
  );

  // 동영상 미리보기 URL
  const videoPreview = useMemo(() => {
    return videoFile ? URL.createObjectURL(videoFile) : undefined;
  }, [videoFile]);

  // 동영상 메모리 누수 처리
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  // 새로고침 및 뒤로가기 방지
  useEffect(() => {
    if (window) {
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, [router.asPath]);

  // 요청 함수
  const { mutateAsync, isLoading } = useUpdateVideoPost();

  const onSubmit = async () => {
    // title, content, video 필수
    if (postTitle.length < 3 || postContent.length < 3) return;

    const formData = new FormData();

    // 제목과 내용 넣기
    formData.append("title", postTitle);
    formData.append("content", postContent);

    // 비디오파일 넣기
    if (videoFile) formData.append("video", videoFile);

    // 얼굴 모자이크 유무 넣기
    formData.append("mosaic", `${isMosaic}`); // "true" "false"

    //! PATCH 요청 및 모자이크 처리와 썸네일 생성을 위한 5초 대기
    setIsWait(true);
    mutateAsync({ postId: id, formData });
    await new Promise((resolve) => setTimeout(resolve, 500));

    return;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* 제목 텍스트 필드 */}
      <TitleForm />

      {/* 내용 작성 에디터 */}
      <Tiptap isUpdate={true} />

      {/* 동영상 드레그 앤 드롭 영역 */}
      <UploadVideo
        fileName={videoFileName}
        setFileName={setVideoFileName}
        setVideoFile={setVideoFile}
      />

      {/* 기존 동영상 or 새로운 동영상 미리보기 */}
      {videoPreview && <PreviewVideoUrl videoUrl={videoPreview} />}
      {!videoPreview && postVideo !== "" && (
        <PreviewVideoUrl videoUrl={postVideo} />
      )}

      {/* 얼굴 모자이크 유무 */}
      {videoPreview && <MosaicCheckBox />}

      {/* 작성 완료 버튼 */}
      {isLoading || isWait ? (
        <Button disabled className="w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          잠시만 기다려주세요.
        </Button>
      ) : (
        <Button className="w-full" onClick={onSubmit}>
          수정 완료
        </Button>
      )}
    </div>
  );
}
