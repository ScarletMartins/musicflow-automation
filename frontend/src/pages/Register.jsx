import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensagem("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setMensagem(data.erro || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <ThemeToggle />
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-pink-800 dark:text-pink-300 mb-6">
          Criar Conta
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
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
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-700 dark:text-gray-300">
          Já tem conta?{" "}
          <a
            href="/"
            className="text-blue-800 dark:text-blue-300 underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            Entre aqui
          </a>
        </p>

        {mensagem && (
          <p className="text-sm text-center text-red-600 mt-4">{mensagem}</p>
        )}
      </div>
    </div>
  );
}
