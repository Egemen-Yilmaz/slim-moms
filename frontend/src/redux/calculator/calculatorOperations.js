import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchUserCalorie = createAsyncThunk(
  "calculator/fetchUserCalorie",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/products/user-calorie", credentials);
      return res.data.data || res.data; // Backend yapına göre
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
