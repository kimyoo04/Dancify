import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDeleteComment } from "@type/comments";
import { TPostId } from "@type/posts";

export const deleteComment = async (data: IDeleteComment) => {
  try {
    await axios.delete(`/comments/${data.commentId}`);

    return true;
  } catch (err) {
    console.log("🚀 deleteComment:", err);
    return false;
  }
};

export const useDeleteComment = (postId: TPostId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
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
