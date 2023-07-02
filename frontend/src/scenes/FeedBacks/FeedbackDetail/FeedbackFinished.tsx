import { useRef } from "react";
import ReactPlayer from "react-player";

import { useAppSelector } from "@toolkit/hook";
import { IFeedbackDetail } from "@type/feedbacks";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { TabsContent } from "@components/ui/tabs";
import { Separator } from "@components/ui/separator";
import PostContent from "@scenes/Posts/PostItem/PostContent";

// 3. 댄서블의 요청과 댄서의 응답이 완료됐을 경우 보여지는 컴포넌트
export default function FeedbackFinished({ data }: { data: IFeedbackDetail }) {
  const playerRef = useRef<ReactPlayer>(null);
  const { sectionIndex } = useAppSelector((state) => state.feedback);

  return (
    <div>
      <TabsContent value="feedbackFinished">
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
                        <PostContent
                          content={section.danceablemessage}
                          textClassName="w-fit text-sm text-muted-foreground"
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">
                      · 댄서블 영상 및 피드백 내용
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden rounded-md">
                      <ReactPlayer
                        ref={playerRef}
                        url={section.danceablevideo}
                        controls
                        width={"100%"}
                        height={"100%"}
                      />

                      <Separator className="my-4" />

                      {/* //! 타임스탬프와 설명 */}
                      <ul className="my-2 list-none space-y-4 p-0">
                        {section.dancerMessage &&
                          section.dancerMessage.length > 0 &&
                          section.dancerMessage.map((msg) => (
                            <li key={msg.timeStamp} className="space-y-1">
                              <div className="flex items-center">
                                <span
                                  onClick={() => {
                                    if (playerRef.current)
                                      playerRef.current.seekTo(msg.timeStamp);
                                  }}
                                  className="cursor-pointer text-lg font-medium text-secondary hover:underline"
                                >
                                  · {msg.timeStamp} 초
                                </span>
                              </div>

                              <PostContent
                                content={msg.message}
                                textClassName="w-fit text-sm text-muted-foreground"
                              />
                            </li>
                          ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* //! 댄서의 피드백 영상 */}
                  {"dancerVideo" in section && (
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-xl">
                        · 댄서 피드백 영상
                      </AccordionTrigger>
                      <AccordionContent className="overflow-hidden rounded-md">
                        <ReactPlayer
                          url={section.dancerVideo}
                          controls
                          width={"100%"}
                          height={"100%"}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              )}
            </div>
          ))}
      </TabsContent>
    </div>
  );
}
