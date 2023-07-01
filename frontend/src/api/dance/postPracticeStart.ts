import axios from "@api/axiosInstance";
import { TPostId } from "@type/posts";

// 자유게시글 Create
export const postPracticeStart = async (postId: TPostId ) => {
  try {
    const response = await axios.post(`/dance/start`, {postId});
    return response.data;
  } catch (err) {
    console.log("🚀 postPracticeStart:", err);
    return false;
  }
};
