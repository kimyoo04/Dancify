import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import FreePostDetail from "@scenes/Posts/Free/FreeDetail";

export default function FreePostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <FreePostDetail id={id} />
      </DetailPageLayout>
    );
  }
}
