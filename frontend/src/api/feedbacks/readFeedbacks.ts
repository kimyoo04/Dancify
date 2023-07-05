import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IFeedback } from "@type/feedbacks";
import { AxiosError } from "axios";

export const readFeedbacks = async () => {
  try {
    const response = await axios.get(`/feedbacks`);
    return response.data;
  } catch (err) {
    console.log("🚀 readFeedbacks.tsx", err);
    return err;
  }
};

export const useReadFeedbacks = () => {
  return useQuery<IFeedback[], AxiosError>({
    queryKey: [`/feedbacks`],
    queryFn: readFeedbacks,
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: "always",
    onError: (err) => {
      console.error("🚀 useReadFeedbacks.ts", err);
    },
  });
};
