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
import Tiptap from "./FeedbackDetailItem/DanceableTipTap";

// 1. 댄서블의 요청이 필요한 컴포넌트
export default function FeedbackRequest({ data }: { data: IFeedbackDetail }) {
  const { sectionIndex } = useAppSelector((state) => state.feedback);

  return (
    <div>
      <TabsContent value="feedbackRequest">
        {data.sections.length > 0 &&
          data.sections.map((section, index) => (
            <div key={section.feedbackSectionId}>
              {sectionIndex === index && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">
                      · 나의 영상
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden rounded-md">
                      <ReactPlayer
                        url={section.danceableVideo}
                        controls
                        width={"100%"}
                        height={"100%"}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">
                      · 하고 싶은 말 / 피드백 건의사항 작성
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                      <Tiptap isUpdate={true} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
      </TabsContent>
    </div>
  );
}
