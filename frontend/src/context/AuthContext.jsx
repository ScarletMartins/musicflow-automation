import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access") || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    const storedRefresh = localStorage.getItem("refresh");

    if (storedAccess) {
      setAccessToken(storedAccess);
    }

    if (storedRefresh) {
      setRefreshToken(storedRefresh);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
