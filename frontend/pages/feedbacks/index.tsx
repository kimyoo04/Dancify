import verifyUser from "@api/auth/verifyUser";
import MainLayout from "@layouts/MainLayout";
import Feedbacks from "@scenes/FeedBacks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FeedbacksPage() {
  const router = useRouter();
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.push("/signin");
    });
  }, []);

  return <MainLayout>{isJwtVerified && <Feedbacks />}</MainLayout>;
}
