import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    console.log("🚀 createVideoPost:", err);
    return false;
  }
};

// useMutation
export const useCreateVideoPostMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVideoPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/posts/video`],
      });
      router.push("/posts/video");
    },
    onError: (err) => {
      console.log("🚀 useCreateVideoPostMutation:", err);
    },
  });
};