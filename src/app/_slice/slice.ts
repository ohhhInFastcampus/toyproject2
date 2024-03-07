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

const EXPIRES_IN = 3600;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    uid: null,
    token: typeof window !== "undefined" ? getCookie("token") : null,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      const expireDate = new Date(new Date().getTime() + EXPIRES_IN * 1000);
      document.cookie = `token=${
        action.payload.token
      };expires=${expireDate.toUTCString()};path=/;`;
    },
    logout: (state) => {
      console.log("로그아웃로직 redusx");
      state.email = null;
      state.uid = null;
      state.token = null;
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
