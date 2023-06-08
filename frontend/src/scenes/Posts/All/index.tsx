import { Separator } from "@components/ui/separator";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

import { listenNowAlbums, madeForYouAlbums } from "../data/albums";

import PreviewFreePosts from "../Free/PreviewFreePosts";
import PreviewVideoPosts from "../Video/PreviewVideoPosts";

export default function AllPosts() {
  return (
    <TabsContent
      value="all"
      className="space-y-10 border-none p-0 outline-none"
    >
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

            <TabsList>
              <TabsTrigger value="video">더보기</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!자랑게시판 미리보기 영역 */}
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {listenNowAlbums.map((data, indx) => (
                <PreviewVideoPosts
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

            <TabsList>
              <TabsTrigger value="free">더보기</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="my-4" />
        </div>

        {/* //!자유게시판 미리보기 영역 */}
        <div className="w-full">
          <ScrollArea>
            <ul className="col-center w-full gap-4 pb-4">
              {madeForYouAlbums.slice(0, 10).map((data) => (
                <PreviewFreePosts key={data.name} data={data} />
              ))}
            </ul>
            <ScrollBar />
          </ScrollArea>
        </div>
      </div>
    </TabsContent>
  );
}
