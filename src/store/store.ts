import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/slice/slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
