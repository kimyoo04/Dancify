import axios from "@api/axiosInstance";
import { IDeletePost } from "@type/freePosts";

export const deleteFreePost = async (data: IDeletePost) => {
  try {
    await axios.delete(`/posts/${data.postId}`);
    return true;
  } catch (err) {
    return false;
  }
};
