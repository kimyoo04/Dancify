import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { IDeleteComment } from "@type/comments";
import { TPostCategoryLower } from "@type/like";
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

export const useDeleteComment = (postId: TPostId, postCategory: TPostCategoryLower) => {
  const queryClient = useQueryClient();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
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
        queryKey: [`/postDetail/${postId}`],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
