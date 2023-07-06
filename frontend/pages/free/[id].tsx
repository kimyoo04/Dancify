import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import FreePostDetail from "@scenes/FreePosts/FreeDetail";

export default function FreePostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <FreePostDetail id={id} />
      </MainLayout>
    );
  }
}
