import { Dispatch, RefObject, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@components/ui/button";
import { useAppSelector } from "@toolkit/hook";

interface IUploadVideoProps {
  videoRef: RefObject<HTMLVideoElement>;
  videoFile: {
    [key: string]: { file: File; filename: string };
  };
  setVideoFile: Dispatch<
    SetStateAction<{
      [key: string]: { file: File; filename: string };
    }>
  >;
}

export default function UploadVideo({
  videoRef,
  videoFile,
  setVideoFile,
}: IUploadVideoProps) {
  const sectionIndex = useAppSelector(state => state.feedback.sectionIndex)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 넣은 파일과 파일명을 state에 저장
    const videoName = acceptedFiles.map((file: File) => {
      return file.name;
    });
    //
    setVideoFile({
      ...videoFile,
      [sectionIndex]: { file: acceptedFiles[0], filename: videoName },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    noKeyboard: true,
    multiple: false,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100mb
    onDrop,
  });

  const onReset = () => {
    setVideoFile(
      Object.keys(videoFile).reduce((acc, cur) => {
        if (Number(cur) !== sectionIndex) {
          acc[cur] = videoFile[cur];
        }
        return acc;
      }, {} as { [key: string]: { file: File; filename: string} })
    );
  };

  return (
    <div className="space-y-2">
      {/* 이미지 드레그엔드롭 영역 */}
      <div
        className="col-center flex min-h-[120px] w-full rounded-md border border-dashed border-gray_3 border-input bg-transparent px-3 py-10 text-sm ring-offset-background placeholder:text-muted-foreground hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <video ref={videoRef} controls style={{ display: "none" }} />
        <div className="row-center gap-2">
          <i className="ri-video-upload-line text-xl text-muted-foreground"></i>
          <span className="w-full text-muted-foreground">동영상 선택</span>
        </div>
        <p className="text-xs text-muted-foreground">
          또는 여기로 파일을 끌어오세요.
        </p>
      </div>

      {/* 이미지 미리보기 영역 */}
      <div className="row-center w-full gap-2 rounded-xl">
        <div className="col-end h-10 w-full overflow-hidden rounded-md border border-muted-foreground bg-muted">
          <span className="mr-3">
            {String(sectionIndex) in videoFile
              ? videoFile[String(sectionIndex)].filename
              : "동영상 파일을 선택해주세요."}
          </span>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          className="w-16 flex-shrink-0"
        >
          취소
        </Button>
      </div>
    </div>
  );
}
