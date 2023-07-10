import verifyUser from "@api/auth/verifyUser";
import PracticeLayout from "@layouts/PracticeLayout";
import Practice from "@scenes/Practice";
import { TPostId } from "@type/posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreatePostPage() {
  const router = useRouter();
  const { postId } = router.query;
  const [isJwtVerified, setJwtVerified] = useState(false);

  useEffect(() => {
    verifyUser().then((res) => {
      if (res) setJwtVerified(res);
      else router.replace("/signin");
    });
  }, []);


  return (
    <PracticeLayout>
      {isJwtVerified && <Practice postId={postId as TPostId} />}
    </PracticeLayout>
  );
}
