import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdateComment } from "@type/comments";
import { TPostId } from "@type/posts";

export const updateComment = async (data: IUpdateComment) => {
  try {
    const { commentId, content } = data;
    await axios.patch(`/comments/${commentId}`, { content });

    return true;
  } catch (err) {
    console.log("🚀 updateComment:", err);
    return false;
  }
};

export const useUpdateComment = (postId: TPostId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/postDetail/${postId}`],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
