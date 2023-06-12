import axios from "@api/axiosInstance";
import { ILikeToggle } from "@type/like";

export const toggleLike = async (data: ILikeToggle) => {
  try {
    await axios.post(`/likes/${data.postId}`, {
      postCategory: data.postCategory,
    });
    return true;
  } catch (err) {
    console.log("🚀 toggleLike.tsx", err);
    return false;
  }
};
