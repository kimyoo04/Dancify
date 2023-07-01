import { useEffect } from "react";
import { useAppDispatch } from "@toolkit/hook";
import { likeActions } from "@features/like/likeSlice";
import { postActions } from "@features/post/postSlice";
import { useReadVideoPost } from "@api/posts/readVideoPost";

import Loading from "@components/Loading";
import Comments from "@components/Comments";
import VideoHeader from "./VideoDetailItem/Header";
import ScrollButton from "@components/ScrollButton";
import { Separator } from "@components/ui/separator";
import PostContent from "@scenes/Posts/PostItem/PostContent";
import NormalPlayer from "@components/VideoPlayer/NormalPlayer";

export default function VideoPostDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  // 게시글 불어오기
  const { data, isLoading, error } = useReadVideoPost(id);

  // 좋아요와 게시글 정보 상태 업데이트
  useEffect(() => {
    if (data) {
      dispatch(likeActions.getUserLike(data.userLike));
      dispatch(
        postActions.getVideoPostInfo({
          postId: data.postId,
          postTitle: data.title,
          postContent: data.content,
          postVideo: data.video,
        })
      );
    }
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
          {/* 동영상 플레이어 */}
          <NormalPlayer url={data.video} />
          <Separator className="my-4" />

          {/* 게시글 해더 */}
          <VideoHeader data={data} />
          <Separator className="my-2" />

          {/* 게시글 내용 */}
          <PostContent content={data.content} className="pb-12 pt-2" />

          <Separator className="my-2" />
          <Comments data={data.comments} />
        </div>
      )}

      {/* 최상단 이동 버튼 */}
      <ScrollButton />
    </>
  );
}
