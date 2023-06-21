import MainLayout from "@layouts/MainLayout";
import EditDancerPost from "@scenes/Posts/EditPost/EditDancerPost";
import { useRouter } from "next/router";

export default function UpdateDancerPostPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <EditDancerPost id={id} />
      </MainLayout>
    );
  }
}
