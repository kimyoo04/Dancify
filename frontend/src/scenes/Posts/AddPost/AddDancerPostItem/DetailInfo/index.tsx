import { useAppDispatch, useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";
import TitleForm from "@components/tiptap/TitleForm";
import { Button } from "@components/ui/button";

import { postActions } from "@features/post/postSlice";
import UploadVideo from "./UploadVideo";

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
  const { postTitle, postContent } = useAppSelector((state) => state.post);

  return (
    <div className="space-y-4">
      <TitleForm isUpdate={true} />
      <Tiptap isUpdate={true} />
      <UploadVideo
        videoRef={videoRef}
        setVideoFile={setVideoFile}
        videoFileName={videoFileName}
        setVideoFileName={setVideoFileName}
      />

      <div className="row-between w-full">
        <Button onClick={() => dispatch(postActions.movePrevStep())}>
          이전
        </Button>

        <Button
          disabled={
            videoFile && postTitle.length > 3 && postContent.length > 5
              ? false
              : true
          }
          onClick={() => dispatch(postActions.moveNextStep())}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
