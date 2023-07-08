import AuthLayout from "@layouts/AuthLayout";
import SignIn from "@scenes/SignIn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import verifyUser from "@api/auth/verifyUser";

export default function SignInPage() {
  const router = useRouter();
  const [isJwtVerified, setJwtVerified] = useState(true);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) router.push("/");
      else setJwtVerified(res);
    });
  }, []);

  return <AuthLayout>{!isJwtVerified && <SignIn />}</AuthLayout>;
}
