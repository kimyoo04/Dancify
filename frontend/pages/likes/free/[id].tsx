import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import FreePostDetail from "@scenes/FreePosts/FreeDetail";
import { useEffect, useState } from "react";
import verifyUser from "@api/auth/verifyUser";

export default function FreePostDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.push("/signin");
    });
  }, []);

  if (typeof id === "string") {
    return (
      <MainLayout>{isJwtVerified && <FreePostDetail id={id} />}</MainLayout>
    );
  }
}
