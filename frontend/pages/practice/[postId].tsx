import PracticeLayout from "@layouts/PracticeLayout";
import Practice from "@scenes/Practice";
import { TPostId } from "@type/posts";
import { verify } from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function CreatePostPage() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <PracticeLayout>
      <Practice postId={postId as TPostId} />
    </PracticeLayout>
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
