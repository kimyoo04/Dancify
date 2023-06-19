import { Separator } from "@components/ui/separator";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

import VideoPostLoader from "./Video/VideoItem/VideoPostLoader";
import PreviewVideoPosts from "./Video/VideoItem/PreviewVideoPosts";
import { useReadVideoLikesPerPage } from "@api/likes/readVideoLikesPerPage";

import FreePostLoader from "./Free/FreeItem/FreePostLoader";
import FreePostItem from "./Free/FreeItem/FreePostItem";
import { useReadFreeLikesPerPage } from "@api/likes/readFreeLikesPerPage";

import DancerPostLoader from "./Dancer/DancerItem/DancerPostLoader";
import PreviewDancerPosts from "./Dancer/DancerItem/PreviewDancerPosts";
import { useReadDancerLikesPerPage } from "@api/likes/readDancerLikesPerPage";

import ViewMore from "@scenes/Posts/PostItem/ViewMore";

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
        {/* //!댄서게시판 헤더 */}
        <div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                댄서게시판
              </h2>
            </div>

            <div>
              <ViewMore href="/likes/dancer" />
            </div>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!댄서게시판 미리보기 영역 */}
        <div className="relative">
          <ScrollArea>
            {dancerStatus === "loading" ? (
              <DancerPostLoader />
            ) : dancerStatus === "error" ? (
              <>{dancerError && <p>Error: {dancerError.message}</p>}</>
            ) : (
              dancerData && (
                <ul className="flex space-x-4 pb-4">
                  {dancerData?.pages[0].data.slice(0, 10).map((dancerData) => (
                    <PreviewDancerPosts
                      key={dancerData.postId}
                      data={dancerData}
                      width={250}
                      height={330}
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
        {/* //!자랑게시판 헤더 */}
        <div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                자랑게시판
              </h2>
            </div>

            <div>
              <ViewMore href="/likes/video" />
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
                <ul className="flex space-x-4 pb-4">
                  {videoData?.pages[0].data.slice(0, 10).map((videoData) => (
                    <PreviewVideoPosts
                      key={videoData.postId}
                      data={videoData}
                      width={250}
                      height={330}
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
            </div>

            <div>
              <ViewMore href="/likes/free" />
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
