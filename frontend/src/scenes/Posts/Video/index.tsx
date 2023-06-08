import ScrollButton from "@components/ScrollButton";
import PostList from "@scenes/Posts/PostItem/PostList";
import CreateButton from "@scenes/Posts/Free/FreeItem/CreateButton";
import { useReadVideoPostsPerPage } from "@api/posts/readVideoPostsPerPage";
import { TabsContent } from "@components/ui/tabs";

export default function VideoPosts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadVideoPostsPerPage();

  return (
    <TabsContent
      value="free"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      {/* 자유게시판 fetch 결과 출력 */}
      <PostList
        post={{
          data,
          error,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
          status,
        }}
      />

      {/* 게시글 추가 버튼 */}
      <CreateButton />

      {/* 최상단 이동 버튼 */}
      <ScrollButton />
    </TabsContent>
  );
}
