import axios from "@api/axiosInstance";
import { authActions } from "@features/auth/authSlice";
import { store } from "@toolkit/store";

export const logOut = async () => {
  try {
    await axios.post("/auth/logout");
    store.dispatch(authActions.logOut());
    return true;
  } catch (err) {
    console.log("🚀 logOut.tsx", err);
    return false;
  }
};
