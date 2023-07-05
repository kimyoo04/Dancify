import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { feedbackActions } from "@features/feedback/feedbackSlice";
import { IFeedbackDetail } from "@type/feedbacks";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { TabsContent } from "@components/ui/tabs";
import { Separator } from "@components/ui/separator";
import UploadVideo from "./FeedbackDetailItem/UploadVideo";
import TimeStampForm from "./FeedbackDetailItem/TimeStampForm";
import FeedbackContent from "./FeedbackDetailItem/FeedbackContent";
import TogglePlayer from "@components/VideoPlayer/TogglePlayer";
import ReactPlayer from "react-player";

// 2. 댄서블의 요청과 댄서의 응답이 필요한 컴포넌트
export default function FeedbackWaiting({
  data,
  videoFileArr,
  setVideoFileArr,
}: {
  data: IFeedbackDetail;
  videoFileArr: {
    [key: string]: { file: File ; filename: string };
  };
  setVideoFileArr: Dispatch<
    SetStateAction<{
      [key: string]: { file: File ; filename: string };
    }>
  >;
}) {
  const dispatch = useAppDispatch();
  const isDancer = useAppSelector((state) => state.auth.isDancer);
  const { sectionIndex } = useAppSelector((state) => state.feedback);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeStamp, setTimeStamp] = useState<number>(0);

  const videoPreview = videoFileArr[String(sectionIndex)]
    ? URL.createObjectURL(videoFileArr[String(sectionIndex)].file)
    : undefined;

  // 동영상 메모리 누수 처리
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  return (
    <div>
      <TabsContent value="feedbackWaiting">
        {data.sections.length > 0 &&
          data.sections.map((section, index) => (
            <div key={section.feedbackSectionId}>
              {sectionIndex === index && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">
                      · 피드백 요청 사항
                    </AccordionTrigger>
                    <AccordionContent>
                      {section.danceableMessage && (
                        <FeedbackContent
                          content={section.danceableMessage}
                          textClassName="w-fit text-sm text-muted-foreground"
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">
                      {isDancer
                        ? "· 댄서블 영상에 타임스탬프 입력"
                        : "· 나의 영상"}
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden rounded-md">
                      {section.danceableVideo && (
                        <div className="space-y-4">
                          {/* 원본 비율로 세로로 길게 영상 노출 */}
                          <div className="overflow-hidden rounded-md sm:hidden">
                            <ReactPlayer
                              url={section.danceableVideo}
                              controls
                              width={"100%"}
                              height={"100%"}
                              onProgress={(state) => {
                                setTimeStamp(state.playedSeconds);
                              }}
                            />
                          </div>

                          {/* 세로로 길어지는 것을 줄여서 영상 노출 */}
                          <div className="hidden overflow-hidden rounded-md sm:block">
                            <div className="relative pt-[56.25%]">
                              <ReactPlayer
                                url={section.danceableVideo}
                                controls
                                width="100%"
                                height="100%"
                                className="absolute left-0 top-0 h-full w-full"
                                onProgress={(state) => {
                                  setTimeStamp(state.playedSeconds);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {isDancer && (
                        <>
                          <Separator className="mb-4 mt-8" />

                          {/* 입력필드 추가 버튼 */}
                          <Button
                            className="w-full"
                            onClick={() => {
                              dispatch(
                                feedbackActions.addDancerMessage(
                                  Math.round(timeStamp)
                                )
                              );
                            }}
                          >
                            타임스탬프 추가
                          </Button>

                          <TimeStampForm />
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  {/* //! 댄서인 경우에만 노출 */}
                  {isDancer && (
                    <>
                      <AccordionItem value="item-4">
                        <AccordionTrigger className="text-xl">
                          · 피드백 영상 업로드
                        </AccordionTrigger>
                        <AccordionContent className="p-2">
                          {/* 영상 드롭 영역 */}
                          <UploadVideo
                            videoRef={videoRef}
                            videoFileArr={videoFileArr}
                            setVideoFileArr={setVideoFileArr}
                          />

                          <div className="my-4"></div>

                          {/* 동영상 미리보기 */}
                          <div className="overflow-hidden rounded-md">
                            {String(sectionIndex) in videoFileArr &&
                              videoPreview && (
                                <TogglePlayer videoUrl={videoPreview} />
                              )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </>
                  )}
                </Accordion>
              )}
            </div>
          ))}
      </TabsContent>
    </div>
  );
}
