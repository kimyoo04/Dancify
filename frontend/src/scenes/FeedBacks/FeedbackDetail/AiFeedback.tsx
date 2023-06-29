import { TabsContent } from "@components/ui/tabs";
import { feedbackJsonData } from "../data/feedbackJsonData";
import Description from "./FeedbackDetailItem/Description";
import LineChart from "./FeedbackDetailItem/LineChart";
import RadarChart from "./FeedbackDetailItem/RadarChart";
import { IFeedbackDetail } from "@type/feedbacks";

export default function AiFeedback({data}: {data: IFeedbackDetail}) {

  return (
    <TabsContent value="aiFeedback" className="space-y-4">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 items-start justify-center rounded-md border bg-white text-black dark:bg-gray-200 p-4 md:p-8 lg:w-1/2">
          <Description
            errorData={feedbackJsonData.error}
            message={feedbackJsonData.message}
          />
        </div>
        <div className="flex flex-1 items-start justify-center rounded-md border bg-white text-black dark:bg-gray-200 p-4 md:p-8 lg:w-1/2">
          <RadarChart
            firstScores={feedbackJsonData.avg_score}
            bestScores={feedbackJsonData.avg_score}
          />
        </div>
      </div>

      <div className="w-full rounded-md border bg-white text-black dark:bg-gray-200 p-4 md:p-8">
        <LineChart evalPerFrameData={feedbackJsonData.data} />
      </div>
    </TabsContent>
  );
}