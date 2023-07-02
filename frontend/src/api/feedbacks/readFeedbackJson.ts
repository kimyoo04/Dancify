import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { FeedbackJsonData } from "@type/feedbackJson";

export default function readFeedbackJson(
  url: string,
  setJsonData: Dispatch<SetStateAction<FeedbackJsonData | null | undefined>>
): Promise<FeedbackJsonData> {
  return new Promise(() => {
    axios.get(url)
      .then((response) => {
        if (!response) throw new Error("요청 실패");
        return response.data[0];
      })
      .then((data) => {
        setJsonData(data);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  });
}
