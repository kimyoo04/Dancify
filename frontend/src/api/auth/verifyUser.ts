import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "@api/axiosInstance";
import { store } from "@toolkit/store";
import { IDecodedToken } from "@type/auth";
import { authActions } from "@features/auth/authSlice";

export default async function verifyUser() {
  try {
    // jwt 검증
    const response = await axios.post("/auth/user");

    if (response) {
      // accessToken 접근
      const accessToken = Cookies.get("Access-Token");
      if (accessToken) {
        // jwt 디코딩
        const decodedToken: IDecodedToken = jwtDecode(accessToken);
        if (decodedToken) {
          // auth state에 저장
          const { userId, nickname, isDancer, profileImage } = decodedToken;
          store.dispatch(
            authActions.signIn({ userId, nickname, isDancer, profileImage })
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
    store.dispatch(authActions.stopIsLoading());
  }
}
