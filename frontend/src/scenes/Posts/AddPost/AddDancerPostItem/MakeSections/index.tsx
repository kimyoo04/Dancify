import { useState, useRef, useEffect } from "react";
import SectionDivider from "./SectionDivider";
import SectionsBoard from "./SectionsBoard";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { Button } from "@components/ui/button";
import { postActions } from "@features/post/postSlice";
import { useCreateDancerVideoSectionsMutation } from "@api/posts/createDancerPost";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function MakeSections({
  videoFileName,
}: {
  videoFileName: string;
}) {
  const dispatch = useAppDispatch();
  const [hasWindow, setHasWindow] = useState(false);
  const [isWait, setIsWait] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") setHasWindow(true);
  }, []);

  const playerRef = useRef<ReactPlayer | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const videoExtension = videoFileName.split(".").pop();

  // 제목과 내용
  const { postId, postVideo, timeStamps } = useAppSelector(
    (state) => state.post
  );
  const { mutateAsync, isLoading } = useCreateDancerVideoSectionsMutation();

  const onSubmit = async () => {
    // postId, videoExtension timeStamps 필수
    if (
      postId === "" ||
      !videoExtension ||
      !timeStamps ||
      timeStamps.length % 2 !== 0
    )
      return;
    // 로딩 버튼 활성화
    setIsWait(true);
    const timeStampsArr = timeStamps.map((item) => item.time).join(" ");
    const data = { postId, videoExtension, timeStamps: timeStampsArr };
    await mutateAsync(data);

    return;
  };

  return (
    <div className="w-full space-y-5">
      <div className="w-full sm:flex sm:h-[520px] sm:gap-5 lg:h-[610px] ">
        {/* 영상 영역 */}
        <div className="relative mx-auto w-3/4 overflow-hidden rounded-md border sm:w-1/2 sm:flex-grow">
          {hasWindow && (
            <ReactPlayer
              ref={playerRef}
              controls
              url={postVideo}
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

        {isLoading || isWait ? (
          <Button disabled >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            잠시만 기다려주세요.
          </Button>
        ) : (
          <Button onClick={onSubmit}>
            영상 구간 설정 완료
          </Button>
        )}
      </div>
    </div>
  );
}
