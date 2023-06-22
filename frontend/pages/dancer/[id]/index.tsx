import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import DancerPostDetail from "@scenes/DancerPosts/DancerDetail";

export default function DancerSectionPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <DancerPostDetail id={id} />
      </MainLayout>
    );
  }
}
