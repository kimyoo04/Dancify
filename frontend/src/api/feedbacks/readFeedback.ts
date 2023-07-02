import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IFeedbackDetail, TFeedbackId } from "@type/feedbacks";
import { AxiosError } from "axios";

export const readFeedback = async (feedbackId: TFeedbackId) => {
  try {
    const response = await axios.get(`/feedbacks/${feedbackId}}`);
    return response.data;
  } catch (err) {
    console.log("🚀 readFeedback.tsx", err);
    return err;
  }
};

export const useReadFeedback = (feedbackId: TFeedbackId) => {
  return useQuery<IFeedbackDetail, AxiosError>({
    queryKey: [`/feedbacks/${feedbackId}`],
    queryFn: () => readFeedback(feedbackId),
    refetchOnMount: "always",
    onError: (err) => {
      console.error("🚀 useReadFeedback.ts", err);
    },
  });
};
