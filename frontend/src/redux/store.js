import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import loaderReducer from "./loader/loaderSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
  },
});

export default store;
