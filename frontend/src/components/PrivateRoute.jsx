import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-sm">Verificando autenticação...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
