import axios from "@api/axiosInstance";
import { useToast } from "@components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { TPostId } from "@type/posts";
import { useRouter } from "next/router";

export const deleteDancerPost = async (postId: TPostId) => {
  try {
    await axios.delete(`/posts/dancer/${postId}`);
    return true;
  } catch (err) {
    console.log("🚀 deleteDancerPost.tsx", err);
    return false;
  }
};

// useDeleteDancerPost
export const useDeleteDancerPost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);


  return useMutation({
    mutationFn: deleteDancerPost,
    onSuccess: async (_, postId) => {
      await queryClient.removeQueries({
        queryKey: [`/postDetail/${postId}`],
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

      router.push(`/`);
      toast({ title: "Success", description: "게시글이 삭제되었습니다." });
    },
    onError: (err) => {
      console.error("🚀 useDeleteDancerPost.ts", err);
      toast({ title: "Fail", description: "게시글을 삭제하지 못했습니다." });
    },
  });
};
