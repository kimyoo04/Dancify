import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import HistoryPostDetail from "@scenes/Histories/DancerDetail";

export default function DancerSectionPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <MainLayout>
        <HistoryPostDetail id={id} />
      </MainLayout>
    );
  }
}
