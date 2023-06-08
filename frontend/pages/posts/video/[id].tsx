import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import PostVideoDetail from "@scenes/Posts/Video/VideoDetail";

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <PostVideoDetail id={id} />
      </MainLayout>
    );
  }
}
