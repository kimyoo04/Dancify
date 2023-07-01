import axios from "@api/axiosInstance";
import { useToast } from "@components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { IUpdatePost } from "@type/posts";
import { useRouter } from "next/router";

// 댄서게시글 Update
export const updateDancerPost = async ({postId, formData}: IUpdatePost) => {
  try {await axios.patch(`/posts/dancer/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return true;  } catch(err) {
    console.error(err)
    return false
  }
};

// useUpdateDancerPost
export const useUpdateDancerPost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useMutation({
    mutationFn: updateDancerPost,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [`/postDetail/${variables.postId}`],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          `/posts/dancer`,
          "searchKeyword",
          searchKeyword,
          "sort",
          sort,
          "genre",
          genre,
        ],
      });

      router.push(`/dancer/${variables.postId}}`);
      toast({ title: "Success", description: "게시글이 수정되었습니다." });
    },
    onError: (err) => {
      console.error(err);
      toast({ title: "Fail", description: "게시글을 수정하지 못했습니다." });
    },
  });
};
