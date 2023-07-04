import { useAppDispatch, useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";
import { Button } from "@components/ui/button";

import { postActions } from "@features/post/postSlice";
import UploadVideo from "./UploadVideo";
import { createDancerPost } from "@api/posts/createDancerPost";
import SelectGenres from "./SelectGenre";
import PreviewVideoUrl from "@scenes/Posts/PostItem/PreviewVideoUrl";
import { useEffect, useMemo, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import FeedbackPrice from "./FeedbackPrice";
import TitleForm from "@scenes/Posts/PostItem/TitleForm";
import checkS3Url from "@util/checkS3Url";
import { useToast } from "@components/ui/use-toast";

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
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false);
  const [feedbackPriceText, setFeedbackPriceText] = useState("");
  const { postTitle, postContent, genre, feedbackPrice } = useAppSelector(
    (state) => state.post
  );

  // 동영상 미리보기 URL
  const videoPreview = useMemo(() => {
    return videoFile ? URL.createObjectURL(videoFile) : undefined
  }, [videoFile]);

  // 동영상 메모리 누수 처리
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  const handleUpload = async () => {
    if (videoFile && genre !== "") {
      setIsLoading(true);

      // FormData 생성
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("title", postTitle);
      formData.append("content", postContent);
      formData.append("genre", genre);
      formData.append("feedbackPrice", `${feedbackPrice}`);

      // 동영상 업로드
      const data = await createDancerPost(formData);
      if (data) {
        checkS3Url(data.video)
          .then((result) => {
            if (result) {
              setIsLoading(false);
              dispatch(postActions.uploadDancerPost(data));
              dispatch(postActions.moveNextStep());
            }
          })
          .catch((error) => {
            console.error("GET 요청 중 오류가 발생하였습니다.", error);
            toast({title: "업로드 실패", description: "서버에서 영상 업로드가 실패했습니다."});
          });
      } else {
        toast({title: "업로드 실패", description: "서버에서 영상 업로드가 실패했습니다."});
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 장르 선택과  피드백 가격 책정 */}
      <div className="flex items-center justify-between gap-4">
        <SelectGenres />

        {/* 피드백 가격 책정 */}
        <FeedbackPrice
          feedbackPriceText={feedbackPriceText}
          setFeedbackPriceText={setFeedbackPriceText}
        />
      </div>

      {/* 제목 입력 */}
      <TitleForm />

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

        {/* 왼료 버튼 */}
        {isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            잠시만 기다려주세요.
          </Button>
        ) : (
          <Button
            disabled={
              genre !== "" &&
              videoFile &&
              postTitle.length > 3 &&
              postContent.length > 5
                ? false
                : true
            }
            onClick={handleUpload}
          >
            영상 업로드 및 구간 자르기
          </Button>
        )}
      </div>
    </div>
  );
}
