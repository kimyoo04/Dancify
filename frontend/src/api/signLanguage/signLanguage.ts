import axios from "@api/axiosInstance";

export const signLanguage = async (files: FormData) => {
  try {
    const response = await axios.post("/signLanguage", files, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
