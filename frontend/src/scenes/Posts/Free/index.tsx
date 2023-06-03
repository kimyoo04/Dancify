import ScrollButton from "@components/ScrollButton";
import PostList from "@scenes/Posts/PostItem/PostList";
import CreateButton from "@scenes/Posts/PostItem/CreateButton";

export default function FreePosts() {
  return (
    <div className="w-full">
      {/* 자유게시판 fetch 결과 출력 */}
      <PostList />

      {/* 게시글 추가 버튼 */}
      <CreateButton />

      {/* 최상단 이동 버튼 */}
      <ScrollButton />
    </div>
  );
}
