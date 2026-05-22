import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import loaderReducer from "./loader/loaderSlice";
import calculatorReducer from "./calculator/calculatorSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    calculator: calculatorReducer,
  },
});

export default store;
