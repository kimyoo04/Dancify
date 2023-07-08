import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { ICreateComment } from "@type/comments";
import { TPostCategoryLower } from "@type/like";

// 자유 게시판 댓글
export const createComment = async (data: ICreateComment) => {
  try {
    await axios.post(`/comments`, data);
    return true;
  } catch (err) {
    return false;
  }
};

// 자유 게시판 댓글 Mutation
export const useCreateComment = (postCategory: TPostCategoryLower) => {
  const queryClient = useQueryClient();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useMutation({
    mutationFn: createComment,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          `/posts/${postCategory}`,
          "searchKeyword",
          searchKeyword,
          "sort",
          sort,
          "genre",
          genre,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: [`/postDetail/${variables.postId}`],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
