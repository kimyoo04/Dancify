import axios from "@api/axiosInstance";
import { useToast } from "@components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { IUpdatePost } from "@type/posts";
import { useRouter } from "next/router";

// 자유게시글 Update
export const updateFreePost = async ({ postId, formData }: IUpdatePost) => {
  try {
    await axios.patch(`/posts/free/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// useUpdateFreePost
export const useUpdateFreePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useMutation({
    mutationFn: updateFreePost,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [`/postDetail/${variables.postId}`],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          `/posts/free`,
          "searchKeyword",
          searchKeyword,
          "sort",
          sort,
          "genre",
          genre,
        ],
      });

      router.push(`/free/${variables.postId}}`);
      toast({ title: "Success", description: "게시글이 수정되었습니다." });
    },
    onError: (err) => {
      console.error(err);
      toast({ title: "Fail", description: "게시글을 수정하지 못했습니다." });
    },
  });
};
