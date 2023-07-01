import { useAppDispatch, useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";
import TitleForm from "@components/tiptap/TitleForm";
import { Button } from "@components/ui/button";

import { postActions } from "@features/post/postSlice";
import UploadVideo from "./UploadVideo";
import { createDancerPost } from "@api/posts/createDancerPost";
import SelectGenres from "./SelectGenre";
import PreviewVideoUrl from "@scenes/Posts/PostItem/PreviewVideoUrl";
import { useEffect } from "react";

export default function DetailInfo({
  videoRef,
  videoFile,
  setVideoFile,
  videoFileName,
  setVideoFileName,
}: {
  videoFile: File | undefined;
  videoRef: React.RefObject<HTMLVideoElement>;
  setVideoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  videoFileName: string;
  setVideoFileName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useAppDispatch();
  const { postTitle, postContent, genre, feedbackPrice } = useAppSelector(
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

  return (
    <div className="space-y-4">
      {/* 장르 선택과  피드백 가격 책정 */}
      <div className="flex items-center justify-between">
        <SelectGenres />
      </div>

      {/* 제목 입력 */}
      <TitleForm isUpdate={true} />

      {/* 내용 입력 */}
      <Tiptap isUpdate={true} />

      {/* 동영상 업로드 */}
      <UploadVideo
        videoRef={videoRef}
        setVideoFile={setVideoFile}
        videoFileName={videoFileName}
        setVideoFileName={setVideoFileName}
      />

      {/* 동영상 미리보기 */}
      {videoPreview && <PreviewVideoUrl videoUrl={videoPreview} />}

      <div className="row-between w-full">
        <Button onClick={() => dispatch(postActions.movePrevStep())}>
          이전
        </Button>
        <Button
          disabled={
            genre !== "" &&
            videoFile &&
            postTitle.length > 3 &&
            postContent.length > 5
              ? false
              : true
          }
          onClick={async () => {
            if (videoFile && genre !== "") {
              const formData = new FormData();
              formData.append("video", videoFile);
              formData.append("title", postTitle);
              formData.append("content", postContent);
              formData.append("genre", genre);
              formData.append("feedbackPrice", `${feedbackPrice}`);
              const response = await createDancerPost(formData);
              if (response) {
                dispatch(postActions.uploadDancerPost(response));
                dispatch(postActions.moveNextStep());
              }
            }
          }}
        >
          영상 업로드 및 구간 자르기
        </Button>
      </div>
    </div>
  );
}
