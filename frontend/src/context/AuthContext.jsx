import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));
  const [loading, setLoading] = useState(true);

  // Sempre sincroniza com localStorage
  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setAccessToken(access);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
  };

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
  
    if (storedAccess) {
      setAccessToken(storedAccess);
    }
  
    setLoading(false); // autenticação inicial verificada
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
