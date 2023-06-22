import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import VideoPostDetail from "@scenes/VideoPosts/VideoDetail";

export default function VideoPostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <VideoPostDetail id={id} />
      </MainLayout>
    );
  }
}
