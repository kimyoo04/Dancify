import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IVideoPost } from "@type/videoPosts";

export const readPost = async (id: string) => {
  try {
    const response = await axios.get(`/posts/video/${id}`);
    return response.data;
  } catch (err) {
    console.log("🚀 readPost.tsx", err);
    return { data: [] };
  }
};

export const useReadPost = (id: string) => {
  return useQuery<IVideoPost>({
    queryKey: [`/posts/video/${id}`],
    queryFn: () => readPost(id),
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
  });
};
