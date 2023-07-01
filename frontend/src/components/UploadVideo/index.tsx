import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@components/ui/button";

interface IUploadVideoProps {
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setVideoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function UploadVideo({
  fileName,
  setFileName,
  setVideoFile,
}: IUploadVideoProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 넣은 파일과 파일명을 state에 저장
    const videoName = acceptedFiles.map((file: File) => {
      return file.name;
    });
    setVideoFile(acceptedFiles[0]);
    setFileName(videoName[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "video/*": [] },
    noKeyboard: true,
    multiple: false,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 * 2, // 200mb
    onDrop,
  });

  // 이미지 초기화 버튼
  const onReset = () => {
    setFileName("");
    setVideoFile(undefined);
  };

  return (
    <div className="space-y-2">
      {/* 이미지 드레그엔드롭 영역 */}
      <div
        className="col-center flex min-h-[120px] w-full rounded-md border border-dashed border-gray_3 border-input bg-transparent px-3 py-10 text-sm ring-offset-background placeholder:text-muted-foreground hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="row-center gap-2">
          <i className="ri-video-upload-line text-xl text-muted-foreground"></i>
          <span className="w-full text-muted-foreground">동영상 선택</span>
        </div>
        <p className="text-xs text-muted-foreground">
          또는 여기로 파일을 끌어오세요. (200MB 이하)
        </p>
      </div>

      {/* 이미지 미리보기 영역 */}
      <div className="row-center w-full gap-2 rounded-xl">
        <div className="col-end h-10 w-full overflow-hidden rounded-md border border-muted-foreground bg-muted">
          <span className="mr-3">{fileName}</span>
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
