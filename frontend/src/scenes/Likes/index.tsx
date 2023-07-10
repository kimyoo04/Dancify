import { Separator } from "@components/ui/separator";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

// useInfiniteQuery
import { useReadDancerLikesPerPage } from "@api/likes/readDancerLikesPerPage";
import { useReadVideoLikesPerPage } from "@api/likes/readVideoLikesPerPage";
import { useReadFreeLikesPerPage } from "@api/likes/readFreeLikesPerPage";

// 콘텐츠 로더
import PreviewPostLoader from "@scenes/Posts/PostItem/PreviewPostLoader";
import FreePostLoader from "@scenes/Posts/PostItem/FreePostLoader";

// 미리보기 목록
import PreviewDancerPosts from "@scenes/Posts/PostItem/PreviewDancerPosts";
import PreviewVideoPosts from "@scenes/Posts/PostItem/PreviewVideoPosts";
import FreePostItem from "@scenes/FreePosts/FreeItem/FreePostItem";

import PreviewListWrapper from "@scenes/Posts/PostItem/PreviewListWrapper";

export default function Likes() {
  const {
    data: dancerData,
    error: dancerError,
    status: dancerStatus,
  } = useReadDancerLikesPerPage();

  const {
    data: videoData,
    error: videoError,
    status: videoStatus,
  } = useReadVideoLikesPerPage();

  const {
    data: freeData,
    error: freeError,
    status: freeStatus,
  } = useReadFreeLikesPerPage();

  return (
    <div className="space-y-10 border-none p-0 outline-none">
      <h1 className="text-2xl font-semibold tracking-tight">
        좋아요 표시한 글
      </h1>

      <div>
        {/* //!댄서 게시판 헤더 */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">댄서 게시판</h2>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!댄서 게시판 미리보기 영역 */}
        <div className="relative">
          <ScrollArea>
            {dancerStatus === "loading" ? (
              <PreviewPostLoader />
            ) : dancerStatus === "error" ? (
              <>{dancerError && <p>Error: {dancerError.message}</p>}</>
            ) : (
              dancerData && (
                <PreviewListWrapper>
                  {dancerData?.pages[0].data.slice(0, 10).map((dancerData) => (
                    <PreviewDancerPosts
                      key={dancerData.postId}
                      data={dancerData}
                      href={`/likes/dancer/${dancerData.postId}`}
                    />
                  ))}
                </PreviewListWrapper>
              )
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div>
        {/* //!자랑 게시판 헤더 */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">자랑 게시판</h2>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!자랑 게시판 미리보기 영역 */}
        <div className="relative">
          <ScrollArea>
            {videoStatus === "loading" ? (
              <PreviewPostLoader />
            ) : videoStatus === "error" ? (
              <>{videoError && <p>Error: {videoError.message}</p>}</>
            ) : (
              videoData && (
                <PreviewListWrapper>
                  {videoData?.pages[0].data.slice(0, 10).map((videoData) => (
                    <PreviewVideoPosts
                      key={videoData.postId}
                      data={videoData}
                      href={`/likes/video/${videoData.postId}`}
                    />
                  ))}
                </PreviewListWrapper>
              )
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <div>
        {/* //!자유 게시판 헤더 */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">자유 게시판</h2>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!자유 게시판 미리보기 영역 */}
        <div className="w-full">
          <ScrollArea>
            {freeStatus === "loading" ? (
              <FreePostLoader />
            ) : freeStatus === "error" ? (
              <>{freeError && <p>Error: {freeError.message}</p>}</>
            ) : (
              freeData && (
                <ul className="col-center w-full gap-4 px-0 pb-4">
                  {freeData?.pages[0].data.slice(0, 10).map((freeData) => (
                    <FreePostItem
                      key={freeData.postId}
                      data={freeData}
                      href={`/likes/free/${freeData.postId}`}
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
  );
}
