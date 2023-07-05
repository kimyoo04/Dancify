import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFeedbackId } from "@type/feedbacks";

// 자유 게시판 댓글
export const feedbackResponse = async ({ feedbackId, formData }: {feedbackId: TFeedbackId, formData: FormData}) => {
  try {
    await axios.post(`/feedbacks/dancer/${feedbackId}`, formData);
    return true;
  } catch (err) {
    return false;
  }
};

// 자유 게시판 댓글 Mutation
export const useFeedbackResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedbackResponse,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [`/feedbacks/${variables.feedbackId}`],
      });
    },
    onError: (err) => {
      console.error("🚀 useFeedbackResponse err:", err);
    },
  });
};
