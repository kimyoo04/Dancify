import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import MyPosts from "@scenes/MyPosts";

export default function MyPostsPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <MyPosts id={id} />
      </MainLayout>
    );
  }
}
