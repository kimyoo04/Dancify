import axios from "@api/axiosInstance";

export const logout = async () => {
  try {
    await axios.get("/account/logout");
    return true;
  } catch (err) {
    console.log("🚀 logout.tsx", err);
    return false;
  }
};
