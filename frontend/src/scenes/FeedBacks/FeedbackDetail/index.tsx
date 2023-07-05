import Header from "./FeedbackDetailItem/Header";
import NavTab from "./FeedbackDetailItem/NavTab";
import { Tabs } from "@components/ui/tabs";

import AiFeedback from "./AiFeedback";
import FeedbackRequest from "./FeedbackRequest";
import { useEffect, useState } from "react";
import { feedbackActions } from "@features/feedback/feedbackSlice";
import { useAppDispatch } from "@toolkit/hook";
import FeedbackFinished from "./FeedbackFinished";
import FeedbackWaiting from "./FeedbackWaiting";
import Sectiontab from "./FeedbackDetailItem/SectionTab";
import { useReadFeedback } from "@api/feedbacks/readFeedback";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";

export default function FeedbackDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const [videoFileArr, setVideoFileArr] = useState<{
    [key: string]: { file: File; filename: string };
  }>({});

  // api 요청
  const { data, status, error } = useReadFeedback(id);

  // data가 변경될 때마다 dispatch
  useEffect(() => {
    if (data) {
      const sections = data.sections.map((section) => {
        const {
          feedbackSectionId,
          danceableVideo,
          danceableMessage,
          dancerVideo,
          dancerMessage,
        } = section;

        return {
          feedbackSectionId,
          danceableVideo,
          danceableMessage: danceableMessage || "",
          dancerVideo: dancerVideo || "",
          dancerMessage: dancerMessage || [],
        };
      });

      dispatch(feedbackActions.getSections(sections));
    }
  }, [data, dispatch]);

  return (
    <Tabs defaultValue="aiFeedback" className="h-full w-full space-y-6">
      {status === "loading" ? (
        <div />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data ? (
        <>
          {/* 상단 영역 */}
          <Header data={data} />
          <NavTab status={data.status} />
          <Sectiontab data={data} feedbackId={id} videoFileArr={videoFileArr} />

          {/* 내용 영역 */}
          <AiFeedback data={data} />
          {data.status === "신청 전" && <FeedbackRequest data={data} />}
          {data.status === "대기 중" && (
            <FeedbackWaiting
              data={data}
              videoFileArr={videoFileArr}
              setVideoFileArr={setVideoFileArr}
            />
          )}
          {data.status === "완료" && <FeedbackFinished data={data} />}
        </>
      ) : (
        <PostNotFound />
      )}
    </Tabs>
  );
}
