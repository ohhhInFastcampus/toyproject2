import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/app/_slice/slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
