import Loading from "@components/Loading";
import Header from "./DancerDetailItem/Header";
import ScrollButton from "@components/ScrollButton";

import { useReadDancerPost } from "@api/posts/readDancerPost";
import PostContent from "@scenes/Posts/PostItem/PostContent";
import { useEffect } from "react";
import { likeActions } from "@features/like/likeSlice";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch } from "@toolkit/hook";

export default function DancerPostDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  // 게시글 불어오기
  const { data, isLoading, error } = useReadDancerPost(id);

  // 좋아요와 게시글 정보 상태 업데이트
  useEffect(() => {
    if (data) {
      dispatch(likeActions.getUserLike(data.userLike))
      dispatch(postActions.getPostInfo({postId:id, postTitle:data.title, postContent:data.content}))
    };
  }, [data, id, dispatch]);

  return (
    <>
      {/* 로딩 시 로딩 화면 표시 */}
      {isLoading && <Loading />}

      {/* 에러 발생 시 에러 메시지 표시 */}
      {error && <p className="text-alert_danger">문제가 발생했습니다.</p>}

      {/* 데이터가 있을 경우 화면 표시 */}
      {data && (
        <div className="mx-auto w-full max-w-screen-lg rounded-2xl bg-white p-6 shadow-lg">
          {/* 게시글 해더 */}
          <Header data={data} />

          {/* 게시글 내용 */}
          <PostContent content={data.content} />
        </div>
      )}

      {/* 최상단 이동 버튼 */}
      <ScrollButton />
    </>
  );
}
