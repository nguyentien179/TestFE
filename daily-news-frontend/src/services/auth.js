import axios from "axios";
const API_URL = import.meta.env.VITE_API_LINK;
import authAxios from "../utils/axios.js";

const authService = {
  login: async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { accessToken, refreshToken } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return res.data;
  },

  register: async (data) => {
    const res = await axios.post(`${API_URL}/auth/register`, data);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  getProfile: async () => {
    const res = await authAxios.get("/auth/me");
    return res.data;
  },

  refreshToken: async () => {
    const res = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const { accessToken, refreshToken } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return accessToken;
  },
};

export default authService;
