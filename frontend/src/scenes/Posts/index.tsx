import AllPosts from "./All";
import PostHeader from "./PostItem/PostHeader";

export default function Posts() {
  return (
    <div className="container bg-background">
      <div className="h-full py-6 lg:px-8">
        <div className="h-full space-y-6">
          {/* 게시판 네비게이션 해더 */}
          <PostHeader />

          {/* 게시판 미리보기 영역 */}
          <AllPosts />
        </div>
      </div>
    </div>
  );
}
