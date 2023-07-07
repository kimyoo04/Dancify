import AuthLayout from "@layouts/AuthLayout";
import SignUp from "@scenes/SignUp";
import { GetServerSideProps } from "next";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUpPage({
  isJwtVerified,
}: {
  isJwtVerified: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (isJwtVerified) router.push("/");
  }, [isJwtVerified, router]);

  return <AuthLayout>{!isJwtVerified && <SignUp />}</AuthLayout>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { req } = ctx;
    const token = req.cookies["Access-Token"];
    const secret = process.env.NEXT_PUBLIC_ENV_JWT_SECRET_KEY;
    if (token && secret) {
      verify(token, secret);
    } else {
      // JWT 정상
      return {
        props: {
          isJwtVerified: true,
        },
      };
    }

    // Home 페이지로 리다이렉트
    return {
      props: {
        isJwtVerified: false,
      },
    };
  } catch (error) {
    // JWT 정상
    return {
      props: {
        isJwtVerified: true,
      },
    };
  }
};
