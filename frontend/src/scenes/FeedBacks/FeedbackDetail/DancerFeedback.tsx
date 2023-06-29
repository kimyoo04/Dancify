import { TabsContent } from "@components/ui/tabs";
import { IFeedbackDetail } from "@type/feedbacks";

export default function DancerFeedback({data}: {data: IFeedbackDetail}) {
  return <TabsContent value="dancerFeedback">DancerFeedback</TabsContent>;
}