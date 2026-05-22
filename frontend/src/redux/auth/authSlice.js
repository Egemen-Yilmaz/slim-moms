import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios"; // Axios instance'ınızın yolu

const initialState = {
  user: null,
  accessToken: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    // Senkron temizlik action'ı
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // Navigasyon barlarını tetiklemek için yazdığımız custom event
      window.dispatchEvent(new Event("auth-change"));
    },
  },
});

export const { setAuthData, logoutSuccess } = authSlice.actions;

// Kılavuzun istediği asenkron Operation fonksiyonu:
export const logoutUserOperation = () => async (dispatch) => {
  try {
    // Backend'deki logout endpoint'ine istek atıyoruz (Kriter 3)
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Backend logout error, cleaning local state anyway:", error);
  } finally {
    // Backend hata verse bile kullanıcının lokal oturumunu her türlü kapatıyoruz
    dispatch(logoutSuccess());
  }
};

export default authSlice.reducer;
