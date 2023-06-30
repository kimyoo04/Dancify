import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IFeedback } from "@type/feedbacks";

export const readFeedbacks = async () => {
  try {
    const response = await axios.get(`/feedbacks`);
    return response.data;
  } catch (err) {
    console.log("🚀 readFeedbacks.tsx", err);
    return { data: [] };
  }
};

export const useReadFeedbacks = () => {
  return useQuery<IFeedback[]>({
    queryKey: [`/feedbacks`],
    queryFn: readFeedbacks,
    staleTime: 1000 * 60 * 15, // 15분
    onError: (err) => {
      console.error("🚀 useReadFeedbacks.ts", err);
    },
  });
};
