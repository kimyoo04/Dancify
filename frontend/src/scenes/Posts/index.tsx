import PostHeader from "./PostItem/PostHeader";

import { Separator } from "@components/ui/separator";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import ViewMore from "@scenes/Posts/PostItem/ViewMore";

import VideoPostLoader from "@scenes/Posts/PostItem/VideoPostLoader";
import PreviewVideoPosts from "@scenes/Posts/PostItem/PreviewVideoPosts";
import { useReadVideoPostsPerPage } from "@api/posts/readVideoPostsPerPage";

import FreePostLoader from "@scenes/Posts/PostItem/FreePostLoader";
import FreePostItem from "@scenes/FreePosts/FreeItem/FreePostItem";
import { useReadFreePostsPerPage } from "@api/posts/readFreePostsPerPage";

export default function Posts() {
  const {
    data: videoData,
    error: videoError,
    status: videoStatus,
  } = useReadVideoPostsPerPage();

  const {
    data: freeData,
    error: freeError,
    status: freeStatus,
  } = useReadFreePostsPerPage();

  return (
    <div className="container bg-background">
      <div className="h-full py-6 lg:px-8">
        <div className="h-full space-y-6">
          {/* 게시판 네비게이션 해더 */}
          <PostHeader />

          {/* 게시판 미리보기 영역 */}
          <div className="space-y-10 border-none p-0 outline-none">
            <div>
              {/* //!자랑게시판 헤더 */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">
                      자랑게시판
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      동영상을 업로드하여 자랑하는 곳입니다.
                    </p>
                  </div>

                  <div>
                    <ViewMore href="/video" />
                  </div>
                </div>
                <Separator className="my-4" />
              </div>

              {/* //!자랑게시판 미리보기 영역 */}
              <div className="relative">
                <ScrollArea>
                  {videoStatus === "loading" ? (
                    <VideoPostLoader />
                  ) : videoStatus === "error" ? (
                    <>{videoError && <p>Error: {videoError.message}</p>}</>
                  ) : (
                    videoData && (
                      <ul className="flex space-x-4 px-0 pb-4">
                        {videoData?.pages[0].data
                          .slice(0, 10)
                          .map((videoData) => (
                            <PreviewVideoPosts
                              key={videoData.postId}
                              data={videoData}
                              href={`/posts/video/${videoData.postId}`}
                            />
                          ))}
                      </ul>
                    )
                  )}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>

            <div>
              {/* //!자유게시판 헤더 */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">
                      자유게시판
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      자유롭게 글을 올리고, 댓글을 달아주세요.
                    </p>
                  </div>

                  <div>
                    <ViewMore href="/free" />
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
                      <ul className="col-center w-full gap-4 px-0 pb-4">
                        {freeData?.pages[0].data
                          .slice(0, 10)
                          .map((freeData) => (
                            <FreePostItem
                              key={freeData.postId}
                              data={freeData}
                              href={`/free/${freeData.postId}`}
                            />
                          ))}
                      </ul>
                    )
                  )}
                  <ScrollBar />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
