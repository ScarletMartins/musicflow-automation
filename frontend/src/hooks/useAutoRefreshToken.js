import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function useAutoRefreshToken() {
  const { accessToken, refreshToken, login, logout } = useAuth();

  useEffect(() => {
    if (!refreshToken) return;

    const refreshAccessToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
          console.warn("Falha ao atualizar accessToken.");
          logout();
          return;
        }

        const data = await response.json();
        if (data.access) {
          login(data.access, refreshToken);
        }
      } catch (error) {
        console.error("Erro ao tentar atualizar o token:", error);
        logout();
      }
    };

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 1000 * 60 * 59);

    return () => clearInterval(interval);
  }, [refreshToken, login, logout]);
}
