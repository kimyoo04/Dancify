import AuthLayout from "@layouts/AuthLayout";
import SignUp from "@scenes/SignUp";
import { GetServerSideProps } from "next";
import { verify } from "jsonwebtoken";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { req } = ctx;
    const token = req.cookies["Access-Token"];
    const secret = process.env.NEXT_PUBLIC_ENV_JWT_SECRET_KEY;
    if (token && secret) {
      verify(token, secret);
    } else {
      // 정상
      return {
        props: {},
      };
    }

    // Home 페이지로 리다이렉트
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } catch (error) {
    // 정상
    return {
      props: {},
    };
  }
};
