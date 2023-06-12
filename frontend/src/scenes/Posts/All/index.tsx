import { Separator } from "@components/ui/separator";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

import { listenNowAlbums } from "../data/albums";

import FreePostItem from "../Free/FreeItem/FreePostItem";
import VideoPostItem from "../Video/VideoPostItem";
import ViewMore from "../PostItem/ViewMore";
import { useReadFreePostsPerPage } from "@api/posts/readFreePostsPerPage";
import FreePostLoader from "../Free/FreeItem/FreePostLoader";

export default function AllPosts() {
  const {
    data: freeData,
    error: freeError,
    status: freeStatus,
  } = useReadFreePostsPerPage();

  return (
    <div className="space-y-10 border-none p-0 outline-none">
      <div>
        {/* //!자랑게시판 헤더 */}
        <div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                자랑게시판
              </h2>
              <p className="text-sm text-muted-foreground">
                동영상을 업로드하여 자랑하는 곳입니다.
              </p>
            </div>

            <div>
              <ViewMore href="/posts/video" />
            </div>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!자랑게시판 미리보기 영역 */}
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {listenNowAlbums.map((data, indx) => (
                <VideoPostItem
                  key={indx + data.name}
                  data={data}
                  className="w-[250px]"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <div>
        {/* //!자유게시판 헤더 */}
        <div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                자유게시판
              </h2>
              <p className="text-sm text-muted-foreground">
                자유롭게 글을 올리고, 댓글을 달아주세요.
              </p>
            </div>

            <div>
              <ViewMore href="/posts/free" />
            </div>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!자유게시판 미리보기 영역 */}
        <div className="w-full">
          <ScrollArea>
            {freeStatus === "loading" ? (
              <FreePostLoader />
            ) : freeStatus === "error" ? (
              <>{freeError && <p>Error: {freeError.message}</p>}</>
            ) : (
              freeData && (
                <ul className="col-center w-full gap-4 pb-4">
                  {freeData?.pages[0].data.slice(0, 10).map((freeData) => (
                    <FreePostItem key={freeData.postId} data={freeData} />
                  ))}
                </ul>
              )
            )}
            <ScrollBar />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
