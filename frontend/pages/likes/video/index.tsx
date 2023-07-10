import verifyUser from "@api/auth/verifyUser";
import MainLayout from "@layouts/MainLayout";
import LikeVideoPosts from "@scenes/Likes/Video";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LikeVideoPostsPage() {
  const router = useRouter();
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.replace("/signin");
    });
  }, []);

  return <MainLayout>{isJwtVerified && <LikeVideoPosts />}</MainLayout>;
}
