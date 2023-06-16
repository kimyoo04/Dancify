import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdatePostForm } from "@type/freePosts";
import { useRouter } from "next/router";

// 게시글 Update

export const updatePostDetail = async (updatedPost: IUpdatePostForm) => {
  const response = await axios.put(`/posts/${updatedPost.postId}`, updatedPost);
  return response;
};

// useUpdatePostMutation
export const useUpdatePostMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostDetail,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [`/posts/free/${variables.postId}`],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          {
            category: "posts",
            keyword: "",
            startDate: "",
            endDate: "",
          },
        ],
      });

      router.push(`/posts/free/${variables.postId}`);
    },
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      console.log("완료");
    },
  });
};
