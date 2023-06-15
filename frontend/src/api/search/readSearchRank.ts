import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IFreePostDetail } from "@type/freePosts";

export const readSearchRank = async () => {
  try {
    const response = await axios.get(`/search-rank`);
    return response.data;
  } catch (err) {
    console.log("🚀 readSearchRank.tsx", err);
    return { FREE: [], VIDEO: [], DANCER: [] };
  }
};

export const useReadSearchRank = () => {
  return useQuery<IFreePostDetail>({
    queryKey: [`/search-rank`],
    queryFn: readSearchRank,
  });
};
