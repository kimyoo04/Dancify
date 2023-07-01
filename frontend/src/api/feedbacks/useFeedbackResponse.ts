import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFeedbackId } from "@type/feedbacks";

// 자유 게시판 댓글
export const feedbackResponse = async (formData: FormData) => {
  try {
    await axios.post(`/feedbacks/danceable`, formData);
    return true;
  } catch (err) {
    return false;
  }
};

// 자유 게시판 댓글 Mutation
export const useFeedbackResponse = (feedbackId: TFeedbackId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedbackResponse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/feedbacks/${feedbackId}`],
      });
    },
    onError: (err) => {
      console.error("🚀 useFeedbackResponse err:", err);
    },
  });
};
