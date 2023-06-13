import { useCreateFreePostMutation } from "@api/posts/createFreePost";
import Tiptap from "@components/tiptap";
import TitleForm from "@components/tiptap/TitleForm";
import { useAppSelector } from "@toolkit/hook";
import UploadImage from "./UploadImage";
import { useState } from "react";
import { Button } from "@components/ui/button";

export default function AddFreePost() {
  const [fileName, setFileName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();

  const { postTitle, postContent } = useAppSelector((state) => state.post);
  const { mutateAsync } = useCreateFreePostMutation();

  const onSubmit = async () => {
    if (postTitle.length < 3 || postContent.length < 3) return;

    const formData = new FormData();
    if (imageFile) formData.append("files", imageFile);
    formData.append("title", postTitle);
    formData.append("content", postContent);

    mutateAsync(formData);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return;
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <TitleForm />
      <Tiptap />
      <UploadImage
        fileName={fileName}
        setFileName={setFileName}
        setImageFile={setImageFile}
      />
      <Button className="w-full" onClick={onSubmit}>
        작성 완료
      </Button>
    </div>
  );
}
