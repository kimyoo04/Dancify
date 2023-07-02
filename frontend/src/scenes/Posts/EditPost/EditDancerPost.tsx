import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@toolkit/hook";

import Tiptap from "@components/tiptap";
import { Button } from "@components/ui/button";
import { useUpdateDancerPost } from "@api/posts/updateDancerPost";
import { ReloadIcon } from "@radix-ui/react-icons";
import PreviewVideoUrl from "@scenes/Posts/PostItem/PreviewVideoUrl";
import { useRouter } from "next/router";

import SelectGenres from "../AddPost/AddDancerPostItem/DetailInfo/SelectGenre";
import FeedbackPrice from "../AddPost/AddDancerPostItem/DetailInfo/FeedbackPrice";
import Title from "../AddPost/AddDancerPostItem/DetailInfo/Title";

export default function EditDancerPost({ id }: { id: string }) {
  const router = useRouter();
  const [isWait, setIsWait] = useState(false);

  const { postTitle, postContent, genre, postVideo, feedbackPrice } =
    useAppSelector((state) => state.post);

  // 피드백 기존 가격 설정
  const defaultPrice = String(feedbackPrice).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  const [feedbackPriceText, setFeedbackPriceText] = useState(defaultPrice);

  // 새로고침 및 뒤로가기 방지
  useEffect(() => {
    if (window) {
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, [router.asPath]);

  // 요청 함수
  const { mutateAsync, isLoading } = useUpdateDancerPost();

  const onSubmit = async () => {
    // title, content, dancer 필수
    if (postTitle.length < 3 || postContent.length < 3) return;
    setIsWait(true);

    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("content", postContent);
    formData.append("genre", genre);
    formData.append("feedbackPrice", `${feedbackPrice}`);

    mutateAsync({ postId: id, formData });
    return;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* 장르 선택과  피드백 가격 책정 */}
      <div className="flex items-center justify-between gap-4">
        <SelectGenres />

        {/* 피드백 가격 책정 */}
        <FeedbackPrice
          feedbackPriceText={feedbackPriceText}
          setFeedbackPriceText={setFeedbackPriceText}
        />
      </div>

      {/* 제목 텍스트 필드 */}
      <Title />

      {/* 내용 작성 에디터 */}
      <Tiptap isUpdate={true} />

      {/* 기존 동영상 or 새로운 동영상 미리보기 */}
      <PreviewVideoUrl videoUrl={postVideo} />

      {/* 작성 완료 버튼 */}
      {isLoading || isWait ? (
        <Button disabled className="w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          잠시만 기다려주세요.
        </Button>
      ) : (
        <Button className="w-full" onClick={onSubmit}>
          수정 완료
        </Button>
      )}
    </div>
  );
}
