import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_URL;

// Hook que retorna instância do axios com interceptador de refresh
export const useAxiosAuth = () => {
  const { accessToken, login, logout } = useAuth();

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor para adicionar o token no header
  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Interceptor de resposta: tenta usar refresh token ao receber 401
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Evita loop infinito de refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refresh = localStorage.getItem("refresh");

        if (refresh) {
          try {
            const res = await axios.post(`${BASE_URL}/api/token/refresh/`, {
              refresh,
            });

            const newAccess = res.data.access;

            // Atualiza localStorage e AuthContext
            localStorage.setItem("access", newAccess);
            login(newAccess, refresh);

            // Refaz a requisição original com novo token
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return instance(originalRequest);
          } catch (refreshError) {
            logout(); // Refresh falhou, desloga
            return Promise.reject(refreshError);
          }
        } else {
          logout(); // Não há refresh disponível
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
