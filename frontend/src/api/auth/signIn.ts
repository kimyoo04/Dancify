import axios from "@api/axiosInstance";
import { ISignInForm } from "@type/signIn";

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { store } from "@toolkit/store";
import { authActions } from "@features/auth/authSlice";
import { IDecodedToken } from "@type/auth";

export const signIn = async (data: ISignInForm) => {
  try {
    await axios.post("/auth/signin", {
      userId: data.userId,
      password: data.password,
    });

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

    return true;
  } catch (err: any) {
    console.log("🚀 signIn.tsx", err);
    return err;
  }
};
