import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/type/Auth";
const getCookie = (name: string): string | null => {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
};
const decodeJWT = (token: string | null): { email?: string; uid?: string } => {
  try {
    if (!token) {
      return {};
    }
    const base64Url = token.split(".")[1]; // JWT의 payload 부분을 추출
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Base64 URL to Base64
    const payload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // const { email, user_id: uid } = JSON.parse(payload);
    return JSON.parse(payload);
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return {};
  }
};
const EXPIRES_IN = 3600;
const userToken = typeof window !== "undefined" ? getCookie("token") : null;
const userPhotoURL =
  typeof window !== "undefined" ? getCookie("photoURL") : null;
const decodedUserToken = decodeJWT(userToken);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: decodedUserToken?.email ?? null,
    uid: decodedUserToken?.uid ?? null,
    photoURL: userPhotoURL ?? null,
    token: userToken,
    isLoading: false,
  } as AuthState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.photoURL = action.payload.photoURL;
      const expireDate = new Date(new Date().getTime() + EXPIRES_IN * 1000);
      document.cookie = `token=${
        action.payload.token
      };expires=${expireDate.toUTCString()};path=/;`;
      document.cookie = `photoURL=${
        action.payload.photoURL
      };expires=${expireDate.toUTCString()};path=/;`;
    },
    logout: (state) => {
      state.email = null;
      state.uid = null;
      state.token = null;
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      document.cookie =
        "photoURL=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    },
    setLoadingState: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { login, logout, setLoadingState } = authSlice.actions;

export default authSlice.reducer;
