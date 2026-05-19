import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // localStorage token için
    }),
});

export default store;
