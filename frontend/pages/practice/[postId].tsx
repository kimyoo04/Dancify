import PracticeLayout from "@layouts/PracticeLayout";
import Practice from "@scenes/Practice";
import { TPostId } from "@type/posts";
import { useRouter } from "next/router";

export default function CreatePostPage() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <PracticeLayout>
      <Practice postId={postId as TPostId} />
    </PracticeLayout>
  );
}
