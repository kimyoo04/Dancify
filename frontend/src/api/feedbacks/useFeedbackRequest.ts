import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IFeedbackRequest, TFeedbackId } from "@type/feedbacks";

// 자유 게시판 댓글
export const feedbackRequest = async (data: IFeedbackRequest) => {
  try {
    await axios.patch(`/feedbacks/danceable`, data);
    return true;
  } catch (err) {
    return err;
  }
};

// 자유 게시판 댓글 Mutation
export const useFeedbackRequest = (feedbackId: TFeedbackId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedbackRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/feedbacks/${feedbackId}`],
      });
    },
    onError: (err) => {
      console.error("🚀 useFeedbackRequest err:", err);
    },
  });
};
