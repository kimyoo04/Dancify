import { useEffect, useState } from "react";
import { useAppSelector } from "@toolkit/hook";
import { IFeedbackDetail } from "@type/feedbacks";

import readFeedbackJson from "@api/feedbacks/readFeedbackJson";
import { FeedbackJsonData } from "@type/feedbackJson";

import { TabsContent } from "@components/ui/tabs";
import LineChart from "./FeedbackDetailItem/LineChart";
import RadarChart from "./FeedbackDetailItem/RadarChart";
import Description from "./FeedbackDetailItem/Description";
import DanceablePlayer from "./FeedbackDetailItem/DanceablePlayer";

export default function AiFeedback({data}: {data: IFeedbackDetail}) {
  const {sectionIndex} = useAppSelector(state => state.feedback)
  const [firstJsonData, setFirstJsonData] = useState<FeedbackJsonData | null>()
  const [bestJsonData, setBestJsonData] = useState<FeedbackJsonData | null>()

  useEffect(() => {
    // 데이터를 가져올 URL 설정
    const firstJsonUrl = data.sections[sectionIndex].firstAiFeedback;
    const bestJsonUrl = data.sections[sectionIndex].bestAiFeedback;

    // 최초, 최고 JSON 데이터 받기
    readFeedbackJson(firstJsonUrl, setFirstJsonData);
    readFeedbackJson(bestJsonUrl, setBestJsonData);
  }, [sectionIndex, data.sections]);

  return (
    <TabsContent value="aiFeedback" className="space-y-4">
      {firstJsonData && bestJsonData && (
        <>
          <DanceablePlayer data={data} />

          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 items-start justify-center rounded-md border bg-white p-4 text-black lg:w-1/2">
              <Description
                bestScores={bestJsonData.avg_score}
                message={firstJsonData.message}
              />
            </div>
            <div className="flex flex-1 items-start justify-center rounded-md border bg-white p-4 text-black lg:w-1/2">
              <RadarChart
                firstScores={firstJsonData.avg_score}
                bestScores={bestJsonData.avg_score}
              />
            </div>
          </div>

          <div className="w-full rounded-md border bg-white p-4 text-black">
            <LineChart bestJsonData={bestJsonData.data} />
          </div>
        </>
      )}
    </TabsContent>
  );
}