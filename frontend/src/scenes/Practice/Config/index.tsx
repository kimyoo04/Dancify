import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import PreviewSection from "./PreviewSection";
import { Separator } from "@components/ui/separator";
import PostContent from "@scenes/Posts/PostItem/PostContent";
import ConfigHeader from "./Header";
import NormalPlayer from "@components/VideoPlayer/NormalPlayer";
import SkeletonCheckBox from "./SkeletonCheckBox";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

export default function Config({
  onNext,
  data,
}: {
  onNext: () => void;
  data: IPractice;
}) {
  const router = useRouter();
  const [mode, setMode] = useState("연습 모드");

  useEffect(() => {
    if (window) {
      // 뒤로가기 방지
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      // 새로고침 방지
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <MainWrapper>
        <div className="w-full">
          {/* 댄서게시글 정보 영역 */}
          <div className="w-full px-2">
            {/* 게시글 해더 */}
            <ConfigHeader data={data.dancerPost} />
            <Separator className="my-2" />

            {/* 게시글 내용 */}
            <PostContent
              content={data.dancerPost.content}
              className="pb-12 pt-2"
            />
          </div>

          {/* 연습 모드 실전 모드 토글 영역 */}
          <div className="w-full px-2">
            <div className="row-center w-full overflow-hidden rounded-lg border-2 border-primary">
              <Button
                variant={mode === "연습 모드" ? "default" : "ghost"}
                onClick={() => setMode("연습 모드")}
                className={`${
                  mode === "연습 모드" ? "" : "bg-muted"
                } w-full rounded-none`}
              >
                연습 모드
              </Button>
              <Button
                variant={mode === "실전 모드" ? "default" : "ghost"}
                onClick={() => setMode("실전 모드")}
                className={`${
                  mode === "실전 모드" ? "" : "bg-muted"
                } w-full rounded-none`}
              >
                실전 모드
              </Button>
            </div>
          </div>

          {/* 연습 모드 설정 영역 */}
          {mode === "연습 모드" && (
            <div className="w-full px-2">
              <ScrollArea>
                <ul className="flex space-x-4 pb-4">
                  {data.sections.map((data, index) => (
                    <PreviewSection
                      key={data.sectionId}
                      data={data}
                      index={index}
                    />
                  ))}
                </ul>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )}

          {/* 실전 모드 설정 영역 */}
          {mode === "실전 모드" && (
            <div className="max-w-2xl px-2">
              <NormalPlayer url={data.dancerPost.video} />
            </div>
          )}

          {/* 스켈레톤 유무 */}
          <SkeletonCheckBox />
        </div>
      </MainWrapper>

      <BottomWrapper>
        <Button onClick={onNext}>다음</Button>
      </BottomWrapper>
    </div>
  );
}
