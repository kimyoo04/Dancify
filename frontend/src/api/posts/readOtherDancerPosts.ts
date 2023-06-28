import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IDancerPost } from "@type/practice";

export const readOtherDancerPosts = async () => {
  try {
    const response = await axios.get(`/dance/other`);
    return response.data;
  } catch (err) {
    console.log("🚀 readOtherDancerPosts.tsx", err);
    return { data: [] };
  }
};

export const useReadOtherDancerPosts = () => {
  return useQuery<IDancerPost[]>({
    queryKey: [`/dance/other`],
    queryFn: readOtherDancerPosts,
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
  });
};
