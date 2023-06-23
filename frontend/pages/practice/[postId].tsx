import MainLayout from "@layouts/MainLayout";
import Practice from "@scenes/Practice";
import { TPostId } from "@type/posts";
import { useRouter } from "next/router";

export default function CreatePostPage() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <MainLayout>
      <Practice postId={postId as TPostId} />
    </MainLayout>
  );
}
