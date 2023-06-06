import AuthLayout from "@layouts/AuthLayout";
import SignUp from "@scenes/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up forms built using the components.",
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
