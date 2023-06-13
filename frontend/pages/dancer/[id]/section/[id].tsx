import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import PostDancerDetail from "@scenes/Posts/Dancer/DancerDetail";

export default function DancerPostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <PostDancerDetail id={id} />
      </DetailPageLayout>
    );
  }
}
