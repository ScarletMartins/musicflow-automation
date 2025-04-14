import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const isJson = resposta.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await resposta.json() : null;
  
      if (resposta.ok) {
        login(data.access, data.refresh);
        navigate("/home");
      } else {
        setMensagem(data?.detail || "Erro ao fazer login.");
      }
    } catch (err) {
      setMensagem("Erro inesperado no login.");
      console.error("Erro de rede no login:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Ainda não tem conta?{" "}
          <a href="/register" className="text-blue-800 underline hover:text-blue-600">
            Cadastre-se aqui
          </a>
        </p>

        {mensagem && <p className="text-sm text-red-600 text-center mt-4">{mensagem}</p>}
      </div>
    </div>
  );
}
