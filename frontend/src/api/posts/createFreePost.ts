import axios from "@api/axiosInstance";
import { postActions } from "@features/post/postSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { store } from "@toolkit/store";
import { useRouter } from "next/router";

// 자유게시글 Create
export const createFreePost = async (postData: FormData) => {
  try {
    await axios.post("/posts/free", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.log("🚀 createFreePost:", err);
    return false;
  }
};

// useMutation
export const useCreateFreePostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useMutation({
    mutationFn: createFreePost,
    onSuccess: async () => {
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
      store.dispatch(postActions.resetPostInfo());
      router.push("/free");
    },
    onError: (err) => {
      console.log("🚀 useCreateFreePostMutation:", err);
    },
  });
};
