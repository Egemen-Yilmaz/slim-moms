//CURRENT ENDPOINT EKLENINCE AKTIFLEŞECEK

import { getCurrentUser } from "../api/auth";

export const useAuth = () => {
  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const res = await getCurrentUser();
      return res.data.data.user;
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  };

  return { getUser };
};
