import axios from "@api/axiosInstance";
import { postActions } from "@features/post/postSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { store } from "@toolkit/store";
import { useRouter } from "next/router";

// 자유게시글 Create
export const createVideoPost = async (postData: FormData) => {
  try {
    await axios.post("/posts/video", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.error("🚀 createVideoPost:", err);
    return false;
  }
};

// useMutation
export const useCreateVideoPostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useMutation({
    mutationFn: createVideoPost,
    onSuccess: async () => {
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
      store.dispatch(postActions.resetPostInfo())
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // 목록 페이지로 이동
      router.push("/video");
    },
    onError: (err) => {
      console.error("🚀 useCreateVideoPostMutation:", err);
    },
  });
};
