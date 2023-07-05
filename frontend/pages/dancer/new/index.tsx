import MainLayout from "@layouts/MainLayout";
import AddDancerPost from "@scenes/Posts/AddPost/AddDancerPost";
import { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";

export default function CreatePostPage() {
  return (
    <MainLayout>
      <AddDancerPost />
    </MainLayout>
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
