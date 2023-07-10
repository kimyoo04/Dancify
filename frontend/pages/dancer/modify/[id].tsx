import verifyUser from "@api/auth/verifyUser";
import MainLayout from "@layouts/MainLayout";
import EditDancerPost from "@scenes/Posts/EditPost/EditDancerPost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateDancerPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.replace("/signin");
    });
  }, []);

  if (typeof id === "string") {
    return (
      <MainLayout>{isJwtVerified && <EditDancerPost id={id} />}</MainLayout>
    );
  }
}
