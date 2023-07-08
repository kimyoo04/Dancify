import verifyUser from "@api/auth/verifyUser";
import AuthLayout from "@layouts/AuthLayout";
import Profile from "@scenes/profile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.push("/signin");
    });
  }, []);

  return <AuthLayout>{isJwtVerified && <Profile />}</AuthLayout>;
}
