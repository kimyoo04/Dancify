import verifyUser from "@api/auth/verifyUser";
import MainLayout from "@layouts/MainLayout";
import EditFreePost from "@scenes/Posts/EditPost/EditFreePost";
import { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UpdateFreePostPage({
  isJwtVerified,
}: {
  isJwtVerified: boolean;
}) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!isJwtVerified) router.push("/signin");
  }, [isJwtVerified, router]);

  if (typeof id === "string") {
    return <MainLayout>{isJwtVerified && <EditFreePost id={id} />}</MainLayout>;
  }
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
