import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCalorie } from "./calculatorOperations";

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    dailyCalorieIntake: null,
    notAllowedProducts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCalorie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCalorie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyCalorieIntake = action.payload.dailyCalorieIntake;
        state.notAllowedProducts = action.payload.notAllowedProducts;
      })
      .addCase(fetchUserCalorie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default calculatorSlice.reducer;
