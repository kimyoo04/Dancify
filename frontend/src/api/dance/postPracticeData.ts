import axios from "@api/axiosInstance";
import { IPracticeResult } from "@type/practice";

// 자유게시글 Create
export const postPracticeResult = async (data: IPracticeResult) => {
  try {
    await axios.post(`/dance/${data.sectionId}`, data.practicedata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (err) {
    console.error("🚀 postPracticeResult:", err);
    return false;
  }
};
