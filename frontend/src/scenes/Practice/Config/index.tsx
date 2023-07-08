import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import PreviewSection from "./PreviewSection";
import { Separator } from "@components/ui/separator";
import PostContent from "@scenes/Posts/PostItem/PostContent";
import ConfigHeader from "./Header";
import NormalPlayer from "@components/VideoPlayer/NormalPlayer";
import SkeletonCheckBox from "./SkeletonCheckBox";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import MosaicCheckbox from "./MosaicCheckbox";

export default function Config({ data }: { data: IPractice }) {
  const dispatch = useAppDispatch();
  const { isRealMode, selectedSections } = useAppSelector(
    (state) => state.practice
  );

  return (
    <div className="h-full w-screen">
      <MainWrapper>
        <div className="col-center h-full w-full p-2">
          <div className="bg-whtie w-full space-y-4 overflow-hidden rounded-md p-6 shadow-md dark:bg-white dark:text-black md:w-[600px]">
            {/* 댄서게시글 정보 영역 */}
            <div className="w-full dark:text-black">
              {/* 게시글 해더 */}
              <ConfigHeader data={data.dancerPost} />
              <Separator className="my-2" />

              {/* 게시글 내용 */}
              <PostContent
                content={data.dancerPost.content}
                className="pb-4 pt-2"
              />
            </div>

            <div>
              {/* 연습 모드 실전 모드 토글 영역 */}
              <div className="w-full">
                <div className="row-center w-full overflow-hidden rounded-lg border-2 border-primary">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={!isRealMode ? "default" : "ghost"}
                          onClick={() =>
                            isRealMode && dispatch(practiceActions.toggleReal())
                          }
                          className={`${
                            !isRealMode ? "" : "bg-white"
                          } w-full rounded-none`}
                        >
                          연습 모드
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="text-sm">
                        <p>구간 별 복수 선택해서 연습할 수 있습니다.</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isRealMode ? "default" : "ghost"}
                          onClick={() =>
                            !isRealMode &&
                            dispatch(practiceActions.toggleReal())
                          }
                          className={`${
                            isRealMode ? "" : "bg-white"
                          } w-full rounded-none`}
                        >
                          실전 모드
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="text-sm">
                        <p>안무 전체를 한 번에 연습할 수 있습니다.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {!isRealMode ? (
                <div className="w-full">
                  {/* 연습 모드 설정 영역 */}
                  <ScrollArea>
                    <ul className="m-0 mb-2 flex space-x-4 px-0 py-3">
                      {data.sections.map((data, index) => {
                        if (index === 0) return null;
                        return (
                          <PreviewSection
                            key={data.sectionId}
                            data={data}
                            index={index}
                          />
                        );
                      })}
                    </ul>

                    <ScrollBar orientation="horizontal" className="bg-white" />
                  </ScrollArea>
                </div>
              ) : (
                <div className="max-w-2xl py-6">
                  {/* 실전 모드 설정 영역 */}
                  <NormalPlayer url={data.sections[0].video} />
                </div>
              )}
            </div>

            <div className="row-between">
              {/* 스켈레톤 유무 */}
              <SkeletonCheckBox />

              {/* 모자이크 유무 */}
              <MosaicCheckbox />
            </div>
          </div>
        </div>
      </MainWrapper>

      <BottomWrapper>
        <Button
          disabled={selectedSections.length === 0 && !isRealMode}
          onClick={() => dispatch(practiceActions.moveNextStep())}
        >
          다음
        </Button>
      </BottomWrapper>
    </div>
  );
}
