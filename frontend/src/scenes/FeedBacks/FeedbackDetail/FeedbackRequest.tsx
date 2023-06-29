import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { TabsContent } from "@components/ui/tabs";
import { feedbackActions } from "@features/feedback/feedbackSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { IFeedbackDetail } from "@type/feedbacks";
import ReactPlayer from "react-player";
import Tiptap from "./FeedbackDetailItem/tiptap";
import { useFeedbackRequest } from "@api/feedbacks/useFeedbackRequest";

export default function FeedbackRequest({ data }: { data: IFeedbackDetail }) {
  const {sectionIndex, sections} = useAppSelector(state => state.feedback);
  const dispatch = useAppDispatch()

  const { mutateAsync } = useFeedbackRequest(data.feedbackId);

  return (
    <div>
      <TabsContent value="feedbackRequest">
        <div className="row-between w-full">
          <div className="space-x-3">
            {data.sections.length > 0 &&
              data.sections.map((section, index) => (
                <Button
                  key={section.sectionId}
                  onClick={() => dispatch(feedbackActions.selectSection(index))}
                  className={`${
                    sectionIndex === index
                      ? "bg-primary text-white"
                      : "bg-muted text-black"
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
          </div>
          <Button
            disabled={
              !sections.some((section) => section.danceablemessage !== "")
            }
            onClick={() => {
              const feedbackRequestData = sections.map((section) => {
                const { sectionId, danceablemessage } = section;
                return {
                  sectionId,
                  message: danceablemessage,
                };
              });
              mutateAsync({ sections: feedbackRequestData });
            }}
          >
            작성 완료
          </Button>
        </div>

        {data.sections.length > 0 &&
          data.sections.map((section, index) => (
            <div key={section.sectionId}>
              {sectionIndex === index && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">
                      - 댄서블 영상
                    </AccordionTrigger>
                    <AccordionContent>
                      <ReactPlayer url={section.danceablevideo} controls />
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