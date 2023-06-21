import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import DancerPostDetail from "@scenes/Posts/Dancer/DancerDetail";

export default function DancerSectionPage() {
  const router = useRouter();
  const { postId } = router.query;

  if (typeof postId === "string") {
    return (
      <MainLayout>
        <DancerPostDetail id={postId} />
      </MainLayout>
    );
  }
}
