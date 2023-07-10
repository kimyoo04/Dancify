import { useRouter } from "next/router";
import MainLayout from "@layouts/MainLayout";
import MyPosts from "@scenes/MyPosts";
import { useEffect, useState } from "react";
import verifyUser from "@api/auth/verifyUser";

export default function MyPostsPage() {
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
    return <MainLayout>{isJwtVerified && <MyPosts id={id} />}</MainLayout>;
  }
}
