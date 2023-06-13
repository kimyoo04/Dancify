import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import PostDancerDetail from "@scenes/Posts/Dancer/DancerDetail";

export default function DancerPostDetailPage() {
  const router = useRouter();
  const { sectionId } = router.query;

  if (typeof sectionId === "string") {
    return (
      <DetailPageLayout>
        <PostDancerDetail id={sectionId} />
      </DetailPageLayout>
    );
  }
}
