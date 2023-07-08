import verifyUser from "@api/auth/verifyUser";
import MainLayout from "@layouts/MainLayout";
import EditFreePost from "@scenes/Posts/EditPost/EditFreePost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateFreePostPage() {
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
    return <MainLayout>{isJwtVerified && <EditFreePost id={id} />}</MainLayout>;
  }
}
