import verifyUser from "@api/auth/verifyUser";
import MainLayout from "@layouts/MainLayout";
import AddFreePost from "@scenes/Posts/AddPost/AddFreePost";
import { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CreatePostPage({
  isJwtVerified,
}: {
  isJwtVerified: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isJwtVerified) router.push("/signin");
  }, [isJwtVerified, router]);

  return <MainLayout>{isJwtVerified && <AddFreePost />}</MainLayout>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { req } = ctx;
    const token = req.cookies["Access-Token"];
    const secret = process.env.NEXT_PUBLIC_ENV_JWT_SECRET_KEY;

    if (token && secret) {
      verify(token, secret);
    } else {
      return {
        props: {
          isJwtVerified: false,
        },
      };
    }

    // JWT 정상
    return {
      props: {
        isJwtVerified: true,
      },
    };
  } catch (error) {
    const isVerified = await verifyUser();
    if (isVerified) {
    } else {
      return {
        props: {
          isJwtVerified: true,
        },
      };
    }
    // JWT 비정상
    return {
      props: {
        isJwtVerified: false,
      },
    };
  }
};
