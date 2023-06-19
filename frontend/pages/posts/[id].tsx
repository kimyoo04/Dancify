import { useRouter } from "next/router";
import MyPosts from "@scenes/Posts/MyPosts";
import MainLayout from "@layouts/MainLayout";

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
