import AuthLayout from "@layouts/AuthLayout";
import Signin from "@scenes/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In forms built using the components.",
};

export default function SigninPage() {
  return (
    <AuthLayout>
      <Signin />
    </AuthLayout>
  );
}
