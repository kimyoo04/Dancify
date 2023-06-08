import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import PostFreeDetail from "@scenes/Posts/Free/FreeDetail";

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <PostFreeDetail id={id} />
      </MainLayout>
    );
  }
}
