import Header from "./FeedbackDetailItem/Header";
import NavTab from "./FeedbackDetailItem/NavTab";
import { Tabs } from "@components/ui/tabs";

import AiFeedback from "./AiFeedback";
import DancerFeedback from "./DancerFeedback";
import FeedbackRequest from "./FeedbackRequest";
import { useEffect } from "react";
import { feedbackActions } from "@features/feedback/feedbackSlice";
import { feedbackDetailData } from "../data/feedbackDetailData";
import { useAppDispatch } from "@toolkit/hook";

export default function FeedbackDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  // api 요청
  const data = feedbackDetailData;

  useEffect(() => {
    if (data) {
      const sections = data.sections.map((section) => {
        const {
          sectionId,
          danceablevideo,
          danceablemessage,
          dancerVideo,
          dancerMessage,
        } = section;

        return {
          sectionId,
          danceablevideo,
          danceablemessage: danceablemessage || "",
          dancerVideo: dancerVideo || "",
          dancerMessage: dancerMessage || [],
        };
      });

      dispatch(feedbackActions.getSections(sections));
    }
  }, [data]);

  return (
    <Tabs defaultValue="aiFeedback" className="h-full space-y-6">
      <Header data={data} />
      <NavTab status={data.status} />

      <AiFeedback data={data}/>
      <DancerFeedback data={data} />
      <FeedbackRequest data={data} />
    </Tabs>
  );
}