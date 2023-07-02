import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactPlayer from "react-player";

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

// 2. 댄서블의 요청과 댄서의 응답이 필요한 컴포넌트
export default function FeedbackWaiting({
  data,
  videoFile,
  setVideoFile,
}: {
  data: IFeedbackDetail;
  videoFile: {
    [key: string]: { file: File; filename: string };
  };
  setVideoFile: Dispatch<
    SetStateAction<{
      [key: string]: { file: File; filename: string };
    }>
  >;
}) {
  const dispatch = useAppDispatch();
  const { sectionIndex } = useAppSelector((state) => state.feedback);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeStamp, setTimeStamp] = useState<number>(0);

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
                      {section.danceablemessage && (
                        <FeedbackContent
                          content={section.danceablemessage}
                          textClassName="w-fit text-sm text-muted-foreground"
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">
                      {data.isDancer ? "· 댄서블 영상" : "· 나의 영상"}
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden rounded-md">
                      <ReactPlayer
                        url={section.danceablevideo}
                        controls
                        width={"100%"}
                        height={"100%"}
                        onProgress={(state) => {
                          setTimeStamp(state.playedSeconds);
                        }}
                      />

                      <Separator className="mb-4 mt-8" />

                      {data.isDancer && (
                        <>
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
                  {data.isDancer && (
                    <>
                      <AccordionItem value="item-4">
                        <AccordionTrigger className="text-xl">
                          · 피드백 영상 업로드
                        </AccordionTrigger>
                        <AccordionContent className="p-2">
                          {/* 영상 드롭 영역 */}
                          <UploadVideo
                            videoRef={videoRef}
                            videoFile={videoFile}
                            setVideoFile={setVideoFile}
                          />

                          <div className="my-4"></div>

                          {/* 영상 미리보기 */}
                          <div className="overflow-hidden rounded-md">
                            {String(sectionIndex) in videoFile && (
                              <ReactPlayer
                                url={URL.createObjectURL(
                                  videoFile[String(sectionIndex)].file
                                )}
                                controls
                                width={"100%"}
                                height={"100%"}
                              />
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
