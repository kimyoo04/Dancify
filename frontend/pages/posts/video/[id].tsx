import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import PostVideoDetail from "@scenes/Posts/Video/VideoDetail";

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <PostVideoDetail id={id} />
      </DetailPageLayout>
    );
  }
}
