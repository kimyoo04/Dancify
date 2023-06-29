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

export default function FeedbackRequest({ data }: { data: IFeedbackDetail }) {
  const { sectionIndex } = useAppSelector((state) => state.feedback);

  return (
    <div>
      <TabsContent value="feedbackRequest">
        {data.sections.length > 0 &&
          data.sections.map((section, index) => (
            <div key={section.sectionId}>
              {sectionIndex === index && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">
                      - 댄서블 영상
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden rounded-md">
                      <ReactPlayer
                        url={section.danceablevideo}
                        controls
                        width={"100%"}
                        height={"100%"}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">
                      - 하고 싶은 말/피드백 받고 싶은 부분 작성
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
