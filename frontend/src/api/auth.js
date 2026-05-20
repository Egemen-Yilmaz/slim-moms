import api from "./axios";

// REGISTER
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// LOGOUT
export const logoutUser = (refreshToken) => {
  return api.post("/auth/logout", { refreshToken });
};

//STAY LOGGED IN(ENDPOINT EKLENECEK)
export const getCurrentUser = () => {
  return api.get("/auth/current");
};
