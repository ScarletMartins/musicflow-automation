import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const useAxiosAuth = () => {
  const { accessToken, login, logout } = useAuth();

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refresh = localStorage.getItem("refresh");

        if (refresh) {
          try {
            const res = await axios.post(`${BASE_URL}/token/refresh/`, {
              refresh,
            });

            const newAccess = res.data.access;

            localStorage.setItem("access", newAccess);
            login(newAccess, refresh);

            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return instance(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        } else {
          logout();
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
