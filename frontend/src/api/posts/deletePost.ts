import axios from "@api/axiosInstance";
import { IDeletePost } from "@type/videoPosts";

export const deletePost = async (data: IDeletePost) => {
  try {
    await axios.delete(`/posts/${data.postId}/`);
    return true;
  } catch (err) {
    console.log("🚀 deletePost.tsx", err);
    return false;
  }
};
