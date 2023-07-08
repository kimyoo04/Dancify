import verifyUser from "@api/auth/verifyUser";
import MainLayout from "@layouts/MainLayout";
import AddVideoPost from "@scenes/Posts/AddPost/AddVideoPost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreatePostPage() {
  const router = useRouter();
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.push("/signin");
    });
  }, []);

  return <MainLayout>{isJwtVerified && <AddVideoPost />}</MainLayout>;
}
