import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/token/`, {
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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      credentialResponse.preventDefault?.();
      const { credential: access_token } = credentialResponse;
  
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google/`, {
        access_token,
      });
  
      login(res.data.access, res.data.refresh);
      navigate("/home");
    } catch (err) {
      console.error("Erro ao logar com Google:", err.response?.data || err.message);
      setMensagem("Erro ao autenticar com o Google.");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <ThemeToggle />
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-pink-950 dark:text-pink-300 mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 dark:hover:bg-pink-500 transition"
            >
              Entrar
            </button>
          </form>

          <div className="flex justify-center mt-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setMensagem("Erro no login com Google")}
            width="300"
            text="signin_with"
            shape="rectangular"
            theme="outline"
            size="large"
          />
          </div>

          <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
            Ainda não tem conta?{" "}
            <a
              href="/register"
              className="text-pink-700 dark:text-pink-300 underline hover:text-pink-500 dark:hover:text-pink-200"
            >
              Cadastre-se aqui
            </a>
          </p>

          {mensagem && <p className="text-sm text-red-600 text-center mt-4">{mensagem}</p>}
        </div>
      </div>
  );
}
