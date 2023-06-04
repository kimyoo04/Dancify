import AuthLayout from "@layouts/AuthLayout";
import Signup from "@scenes/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up forms built using the components.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
}
