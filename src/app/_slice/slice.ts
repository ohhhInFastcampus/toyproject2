import { createSlice } from "@reduxjs/toolkit";

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
const decodeJWT = (token: string): { email?: string; uid?: string } => {
  try {
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

    const { email, user_id: uid } = JSON.parse(payload);
    return { email, uid };
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return {};
  }
};
const EXPIRES_IN = 3600; // 1시간
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    uid: null,
    token: typeof window !== "undefined" ? getCookie("token") : null,
    isLoggedIn: typeof window !== "undefined" ? !!getCookie("token") : false,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      const expireDate = new Date(new Date().getTime() + EXPIRES_IN * 1000);
      document.cookie = `token=${
        action.payload.token
      };expires=${expireDate.toUTCString()};path=/;`;
      document.cookie = `expirationTime=${
        action.payload.expirationTime
      };expires=${expireDate.toUTCString()};path=/;`;
    },
    logout: (state, action) => {
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
      document.cookie =
        "expirationTime=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
    },
  },
});

export const { login, logout } = authSlice.actions;
// export const selectUser = (state: any) => state.user.user;

export default authSlice.reducer;
