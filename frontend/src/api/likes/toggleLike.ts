import axios from "@api/axiosInstance";
import { ILikeToggle } from "@type/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const toggleLike = async (data: ILikeToggle) => {
  try {
    await axios.post(`/likes/${data.postId}`, {
      postCategory: data.postCategory,
    });
    return true;
  } catch (err) {
    console.error("🚀 toggleLike.tsx", err);
    return false;
  }
};

// useMutation
export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLike,
    onSuccess: async (_, variable) => {
      await queryClient.invalidateQueries({
        queryKey: [
          `/likes/${variable.postCategory.toLowerCase()}`,
        ],
      });

      // 상세페이지 invalidateQueries를 안한 이유: 조회수가 같이 올라감.
      console.log("🚀 usetoggleLike: success");
    },
    onError: (err) => {
      console.error("🚀 usetoggleLike:", err);
    },
  });
};
