import MainLayout from "@layouts/MainLayout";
import EditVideoPost from "@scenes/Posts/EditPost/EditVideoPost";
import { useRouter } from "next/router";

export default function UpdateVideoPostPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <EditVideoPost id={id} />
      </MainLayout>
    );
  }
}
