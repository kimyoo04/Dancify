import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import PostDancerDetail from "@scenes/Posts/Dancer/DancerDetail";
import { GetServerSideProps } from "next";
import { verify } from "jsonwebtoken";

export default function DancerPostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <PostDancerDetail id={id} />
      </DetailPageLayout>
    );
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
      // Sign In 페이지로 리다이렉트
      return {
        redirect: {
          permanent: false,
          destination: "/signin",
        },
      };
    }

    // 정상
    return {
      props: {},
    };
  } catch (error) {
    return {
      // Sign In 페이지로 리다이렉트
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
};
