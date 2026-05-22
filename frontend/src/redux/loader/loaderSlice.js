import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

// Hem parça parça import edenler için (RegistrationForm gibi):
export const { showLoader, hideLoader } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;

// Hem de 'import loaderSlice from ...' şeklinde default isteyenler için (LoginForm gibi):
export default loaderSlice.reducer;
