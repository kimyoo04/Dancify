import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { Button } from "@components/ui/button";
import { postActions } from "@features/post/postSlice";
import { useCreateDancerPostMutation } from "@api/posts/createDancerPost";
import SectionsBoard from "@scenes/Posts/AddPost/AddDancerPostItem/MakeSections/SectionsBoard";
import SectionDivider from "@scenes/Posts/AddPost/AddDancerPostItem/MakeSections/SectionDivider";

export default function Test({ videoFile }: { videoFile: File }) {
  const dispatch = useAppDispatch();
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") setHasWindow(true);
  }, []);

  const playerRef = useRef<ReactPlayer | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // 제목과 내용
  const { postTitle, postContent, timeStamps } = useAppSelector(
    (state) => state.post
  );
  const { mutateAsync } = useCreateDancerPostMutation();

  const handleSubmit = async () => {
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
    <div className="w-full space-y-5">
      <div className="w-full sm:flex sm:h-[520px] sm:gap-5 lg:h-[610px] ">
        {/* 영상 영역 영역 */}
        <div className="relative mx-auto w-3/4 overflow-hidden rounded-md border sm:w-1/2 sm:flex-grow">
          {hasWindow && (
            <ReactPlayer
              ref={playerRef}
              controls
              url={
                "http://dyago72jbsqcn.cloudfront.net/vod/danceable/danceable1/dasd22141sdd12e21a1280x720.m3u8"
              }
              onProgress={(state) => {
                setProgress(state.played);
              }}
              width={"100%"}
              height={"100%"}
            />
          )}
        </div>
        {/* 구간 영역 */}
        <div className="sm:w-1/2 sm:flex-grow">
          <SectionsBoard />
        </div>
      </div>

      {/* 진행 바 영역 */}
      <SectionDivider
        playerRef={playerRef}
        progress={progress}
        setProgress={setProgress}
      />

      <div className="row-between w-full">
        <Button onClick={() => dispatch(postActions.movePrevStep())}>
          이전
        </Button>

        <Button
          disabled={!(timeStamps.length > 1 && timeStamps.length % 2 === 0)}
          onClick={handleSubmit}
        >
          작성 완료
        </Button>
      </div>
    </div>
  );
}
