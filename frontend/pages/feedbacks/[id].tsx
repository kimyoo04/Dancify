import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import FeedbackDetail from "@scenes/FeedBacks/FeedbackDetail";

export default function FeedbackDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <FeedbackDetail id={id} />
      </DetailPageLayout>
    );
  }
}
