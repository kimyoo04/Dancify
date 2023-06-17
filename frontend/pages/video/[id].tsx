import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import VideoPostDetail from "@scenes/Posts/Video/VideoDetail";

export default function VideoPostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <VideoPostDetail id={id} />
      </DetailPageLayout>
    );
  }
}
