import authAxios from "../../../utils/auth.js";

const API_URL = `${import.meta.env.VITE_API_LINK}/analytics`;

export const getDashboardStats = async () => {
  const response = await authAxios.get(API_URL);
  return response.data;
};
