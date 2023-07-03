import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { FeedbackJsonData } from "@type/feedbackJson";
import { Pose } from "@type/moveNet";

export default function readDancerJson(
  url: string,
  setJsonData: Dispatch<SetStateAction<Pose[][] | null | undefined>>
): Promise<FeedbackJsonData> {
  return new Promise(() => {
    axios
      .get(url)
      .then((response) => {
        if (!response) throw new Error("요청 실패");
        return response.data;
      })
      .then((data) => {
        setJsonData(data);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  });
}
