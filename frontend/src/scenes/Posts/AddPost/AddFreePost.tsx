import { useCreateFreePostMutation } from "@api/posts/createFreePost";
import Tiptap from "@components/tiptap";
import { useAppSelector } from "@toolkit/hook";
import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import UploadImage from "@components/UploadImage";
import PreviewImageUrl from "../PostItem/PreviewImageUrl";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import TitleForm from "@scenes/Posts/PostItem/TitleForm";

export default function AddFreePost() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
  const { postTitle, postContent } = useAppSelector((state) => state.post);
  const [isWait, setIsWait] = useState(false);

  const imagePreview = imageFile ? URL.createObjectURL(imageFile) : undefined;

  // 이미지 메모리 누수 처리
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const { mutateAsync, isLoading } = useCreateFreePostMutation();

  const onSubmit = async () => {
    // title, content 필수
    if (postTitle.length < 3 || postContent.length < 3) return;

    const formData = new FormData();

    // 이미지파일 넣기
    if (imageFile) formData.append("postImage", imageFile);

    // 제목과 내용 넣기
    formData.append("title", postTitle);
    formData.append("content", postContent);

    // POST 요청
    setIsWait(true);
    await mutateAsync(formData);
    return;
  };

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
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* 제목 텍스트 필드 */}
      <TitleForm />

      {/* 내용 작성 에디터 */}
      <Tiptap isUpdate={false} />

      {/* 이미지 드레그 앤 드롭 영역 */}
      <UploadImage
        fileName={fileName}
        setFileName={setFileName}
        setImageFile={setImageFile}
      />

      {/* 이미지 미리보기 */}
      {imagePreview && <PreviewImageUrl imageUrl={imagePreview} />}

      {/* 왼료 버튼 */}
      {isLoading || isWait ? (
        <Button disabled className="w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          잠시만 기다려주세요.
        </Button>
      ) : (
        <Button className="w-full" onClick={onSubmit}>
          작성 완료
        </Button>
      )}
    </div>
  );
}
