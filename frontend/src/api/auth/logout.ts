import axios from "@api/axiosInstance";

export const logout = async () => {
  try {
    await axios.get("/account/signin/");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
