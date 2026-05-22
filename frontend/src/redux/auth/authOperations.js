import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/auth/register", credentials);

      // backend: res.data.data
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// LOGIN
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", credentials);

      // backend: res.data.data
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// LOGOUT
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // backend refreshToken istiyor
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }

    return true;
  } catch (error) {
    // backend hata verse bile logout işlemi başarısız sayılmaz
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});
