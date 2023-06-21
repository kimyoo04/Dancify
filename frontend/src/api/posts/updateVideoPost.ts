import axios from "@api/axiosInstance";
import { useToast } from "@components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { IUpdatePostForm } from "@type/videoPosts";
import { useRouter } from "next/router";

// 자랑게시글 Update
export const updateVideoPost = async (updatedPost: IUpdatePostForm) => {
  const response = await axios.put(`/posts/video/${updatedPost.postId}`, updatedPost);
  return response;
};

// useUpdateVideoPost
export const useUpdateVideoPost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useMutation({
    mutationFn: updateVideoPost,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          `/posts/video`,
          "searchKeyword",
          searchKeyword,
          "sort",
          sort,
          "genre",
          genre,
        ],
      });

      router.push(`/video/${variables.postId}}`);
      toast({ title: "Success", description: "게시글이 수정되었습니다." });
    },
    onError: (err) => {
      console.error(err);
      toast({ title: "Fail", description: "게시글을 수정하지 못했습니다." });
    },
  });
};
