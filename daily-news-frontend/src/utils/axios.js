import axios from "axios";

const API_URL = import.meta.env.VITE_API_LINK;

const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to refresh token on 401
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        const { accessToken, refreshToken } = refreshResponse.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authAxios(originalRequest); // Retry original request
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Or dispatch logout
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
