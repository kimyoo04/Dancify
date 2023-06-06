import AuthLayout from "@layouts/AuthLayout";
import SignIn from "@scenes/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In forms built using the components.",
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}
