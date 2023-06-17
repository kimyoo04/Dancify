import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import DancerPostDetail from "@scenes/Posts/Dancer/DancerDetail";

export default function DancerSectionPage() {
  const router = useRouter();
  const { postId } = router.query;

  if (typeof postId === "string") {
    return (
      <DetailPageLayout>
        <DancerPostDetail id={postId} />
      </DetailPageLayout>
    );
  }
}
