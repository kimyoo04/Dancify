import { useFeedbackRequest } from "@api/feedbacks/useFeedbackRequest";
import { useFeedbackResponse } from "@api/feedbacks/useFeedbackResponse";
import { Button } from "@components/ui/button";
import { TabsContent } from "@components/ui/tabs";
import { feedbackActions } from "@features/feedback/feedbackSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { IFeedbackDetail } from "@type/feedbacks";
import convertISectionToFormData from "@util/convertISectionToFormData";

export default function Sectiontab({ data }: { data: IFeedbackDetail }) {
  const dispatch = useAppDispatch();
  const { sectionIndex, sections } = useAppSelector((state) => state.feedback);

  const { mutateAsync: feedbackRequest } = useFeedbackRequest(data.feedbackId);
  const { mutateAsync: feedbackResponse } = useFeedbackResponse(
    data.feedbackId
  );

  return (
    <div className="flex w-full items-center justify-between gap-5">
      {/* 구간 선택 버튼들 */}
      <div className="space-x-3">
        {sections.length > 0 &&
          sections.map((section, index) => (
            <Button
              key={section.feedbackSectionId}
              onClick={() => dispatch(feedbackActions.selectSection(index))}
              className={`${
                sectionIndex === index
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </Button>
          ))}
      </div>

      {/* 댄서블인 경우 피드백 요청 완료 버튼 활성화 */}
      {!data.isDancer && (
        <TabsContent value="feedbackRequest" className="m-0">
          <Button
            disabled={
              !sections.some((section) => section.danceablemessage !== "")
            }
            onClick={() => {
              const feedbackRequestArr = sections.map((section) => {
                const { feedbackSectionId, danceablemessage } = section;
                return {
                  feedbackSectionId,
                  message: danceablemessage,
                };
              });
              feedbackRequest({ sections: feedbackRequestArr });
            }}
          >
            피드백 요청 완료
          </Button>
        </TabsContent>
      )}

      {/* 댄서인 경우 피드백 완료 버튼 활성화 */}
      <TabsContent value="feedbackWaiting">
        {data.isDancer && (
          <Button
            disabled={
              !sections.some((section) => section.danceablemessage !== "")
            }
            onClick={() => {
              const formData = convertISectionToFormData(sections)
              feedbackResponse(formData);
            }}
          >
            피드백 완료
          </Button>
        )}
      </TabsContent>
    </div>
  );
}
