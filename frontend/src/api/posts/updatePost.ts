import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdatePostForm } from "@type/posts";
import { useRouter } from "next/router";

// 게시글 Update

export const updatePost = async (updatedPost: IUpdatePostForm) => {
  const response = await axios.put(`/posts/${updatedPost.postId}`, updatedPost);
  return response;
};

// useUpdatePostMutation
export const useUpdatePostMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: async (_, variables) => {
      // 게시글 디테일 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: ["postDetail", variables.postId],
      });
      // 게시글 목록 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: ["read", "posts"],
      });
      // 게시글 디테일 페이지로 이동
      router.push(`/posts/${variables.postId}`);
    },
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      console.log("완료");
    },
  });
};
