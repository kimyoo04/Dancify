import { Separator } from "@components/ui/separator";
import Loading from "@components/Loading";

import PostImage from "./FreeDetailItem/PostImage";
import Header from "./FreeDetailItem/Header";
import PostContent from "@scenes/Posts/PostItem/PostContent";
import Comments from "@components/Comments";

import { useReadFreePost } from "@api/posts/readFreePost";
import { useEffect } from "react";
import { likeActions } from "@features/like/likeSlice";
import { useAppDispatch } from "@toolkit/hook";
import { postActions } from "@features/post/postSlice";

export default function FreePostDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  // 게시글 불어오기
  const { data, isLoading, error } = useReadFreePost(id);

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
        <div className="mx-auto w-full max-w-screen-lg rounded-2xl">
          {/* 게시글 이미지 */}
          <PostImage src={data.postImage} />
          <Separator className="my-4" />

          {/* 게시글 해더 */}
          <Header data={data} />
          <Separator className="my-2" />

          {/* 게시글 내용 */}
          <PostContent content={data.content} className="pb-12 pt-2" />

          <Separator className="my-2" />
          <Comments data={data.comments} />
        </div>
      )}
    </>
  );
}
