import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/Authentication/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
