import axios from "@api/axiosInstance";
import { useToast } from "@components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFeedbackId } from "@type/feedbacks";
import { useRouter } from "next/router";

export const deleteFeedback = async (feedbackId: TFeedbackId) => {
  try {
    await axios.delete(`/feedbacks/${feedbackId}`);
    return true;
  } catch (err) {
    console.error("🚀 deleteFeedback.tsx", err);
    return false;
  }
};

// useDeleteFeedback
export const useDeleteFeedback = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: async (_, feedbackId) => {
      await queryClient.removeQueries({
        queryKey: [`/feedbacks/${feedbackId}`],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          `/feedbacks`,
        ],
      });

      router.push(`/feedbacks`);
      toast({ title: "Success", description: "피드백 게시글이 삭제되었습니다." });
    },
    onError: (err) => {
      console.error("🚀 useDeleteFeedback.ts", err);
      toast({ title: "Fail", description: "피드백 게시글을 삭제하지 못했습니다." });
    },
  });
};
