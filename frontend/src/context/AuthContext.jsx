import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  const login = (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    setIsAuthenticated(true);

    const decoded = jwtDecode(access);
    setIsAdmin(decoded?.is_staff);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedAccess = localStorage.getItem("access_token");
    const storedRefresh = localStorage.getItem("refresh_token");

    if (storedAccess) {
      setAccessToken(storedAccess);
      setIsAuthenticated(true);

      const decoded = jwtDecode(storedAccess);
      setIsAdmin(decoded?.is_staff);
    }

    if (storedRefresh) {
      setRefreshToken(storedRefresh);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, isAuthenticated, login, logout, isAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
