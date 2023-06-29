import { IFeedbackDetail } from "@type/feedbacks";
import { feedbackJsonData } from "../data/feedbackJsonData";

import { TabsContent } from "@components/ui/tabs";
import Description from "./FeedbackDetailItem/Description";
import LineChart from "./FeedbackDetailItem/LineChart";
import RadarChart from "./FeedbackDetailItem/RadarChart";
import DanceablePlayer from "./FeedbackDetailItem/DanceablePlayer";



export default function AiFeedback({data}: {data: IFeedbackDetail}) {

  return (
    <TabsContent value="aiFeedback" className="space-y-4">
      <DanceablePlayer data={data} />

      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 items-start justify-center rounded-md border bg-white p-4 text-black lg:w-1/2">
          <Description message={feedbackJsonData.message} />
        </div>
        <div className="flex flex-1 items-start justify-center rounded-md border bg-white p-4 text-black lg:w-1/2">
          <RadarChart
            firstScores={feedbackJsonData.avg_score}
            bestScores={feedbackJsonData.avg_score}
          />
        </div>
      </div>

      <div className="w-full rounded-md border bg-white p-4 text-black">
        <LineChart evalPerFrameData={feedbackJsonData.data} />
      </div>
    </TabsContent>
  );
}