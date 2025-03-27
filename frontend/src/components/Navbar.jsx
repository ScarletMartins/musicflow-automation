import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/home" : "/"} className="hover:text-blue-300 transition">
          🎵 MusicFlow
        </Link>
      </h1>

      <div className="space-x-6 text-sm font-medium">
        {isAuthenticated ? (
          <>
            <Link to="/home" className="hover:text-blue-300 transition">Home</Link>
            <Link to="/processos" className="hover:text-blue-300 transition">Processos</Link>
            <Link to="/historico" className="hover:text-blue-300 transition">Histórico</Link>
            <button
              onClick={handleLogout}
              className="text-red-300 hover:text-red-400 transition"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:text-blue-300 transition">Login</Link>
            <Link to="/register" className="hover:text-blue-300 transition">Cadastro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
