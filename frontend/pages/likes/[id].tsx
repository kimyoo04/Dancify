import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import PostFreeDetail from "@scenes/Posts/Free/FreeDetail";

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <PostFreeDetail id={id} />
      </DetailPageLayout>
    );
  }
}
