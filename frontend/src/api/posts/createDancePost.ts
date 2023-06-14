import axios from "@api/axiosInstance";
import { postActions } from "@features/post/postSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store } from "@toolkit/store";
import { useRouter } from "next/router";

// 자유게시글 Create
export const createDancerPost = async (postData: FormData) => {
  try {
    await axios.post("/posts/dance", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.log("🚀 createDancePost:", err);
    return false;
  }
};

// useMutation
export const useCreateDancerPostMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDancerPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/posts/dancer`],
      });
      store.dispatch(postActions.finishWriting());
      router.push("/posts/dancer");
    },
    onError: (err) => {
      console.log("🚀 useCreateDancerPostMutation:", err);
    },
  });
};
