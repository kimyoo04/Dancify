import SideBar from "./SideBar";
import AllPosts from "./All";
import PostHeader from "./PostItem/PostHeader";
import { playlists } from "./data/playlists";

export default function Posts() {
  return (
    <div className="container bg-background">
      <div className="grid grid-cols-3 lg:grid-cols-5">
        {/* 사이드바 영역 */}
        <SideBar playlists={playlists} className="hidden lg:block" />

        {/* 콘텐츠 영역 */}
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full py-6 lg:px-8">
            <div className="h-full space-y-6">
              {/* 게시판 네비게이션 해더 */}
              <PostHeader />

              {/* 게시판 미리보기 영역 */}
              <AllPosts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
