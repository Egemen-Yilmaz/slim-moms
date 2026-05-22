import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// REQUEST: token ekleme
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE: 401 olursa logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";

    // auth endpointlerinde (login/register) false positive logout yapma
    const isAuthEndpoint =
      url.includes("/auth/login") || url.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
