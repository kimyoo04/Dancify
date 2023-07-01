import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IFreePostDetail } from "@type/freePosts";
import { TPostId } from "@type/posts";

export const readFreePost = async (postId: TPostId) => {
  try {
    const response = await axios.get(`/posts/free/${postId}`);
    return response.data;
  } catch (err) {
    console.log("🚀 readFreePost.tsx", err);
    return { data: [] };
  }
};

export const useReadFreePost = (postId: TPostId) => {
  return useQuery<IFreePostDetail>({
    queryKey: [`/postDetail/${postId}`],
    queryFn: () => readFreePost(postId),
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
    onError: (err) => {
      console.error("🚀 useReadFreePost.ts", err);
    },
  });
};
