import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const useAxiosAuth = () => {
  const { login, logout } = useAuth();

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 TOKEN ENVIADO");
    } else {
      console.warn("⚠️ Nenhum access_token encontrado no localStorage");
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refresh = localStorage.getItem("refresh_token");

        if (refresh) {
          try {
            const res = await axios.post(`${BASE_URL}/token/refresh/`, {
              refresh,
            });

            const newAccess = res.data.access;

            localStorage.setItem("access_token", newAccess);
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
  