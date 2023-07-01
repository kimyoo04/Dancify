import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IDancerPostDetail } from "@type/dancerPosts";

export const readDancerPost = async (id: string) => {
  try {
    const response = await axios.get(`/posts/dancer/${id}`);
    return response.data;
  } catch (err) {
    console.log("🚀 readDancerPost.tsx", err);
    return { data: [] };
  }
};

export const useReadDancerPost = (id: string) => {
  return useQuery<IDancerPostDetail>({
    queryKey: [`/postDetail/${id}`],
    queryFn: () => readDancerPost(id),
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
    onError: (err) => {
      console.error("🚀 useReadDancerPost.ts", err);
    },
  });
};
