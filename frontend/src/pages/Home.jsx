import { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosInstance";
import { FolderCog, Play, Pause, ListChecks, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const axiosAuth = useAxiosAuth();
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosAuth.get("/processos");
        setProcessos(res.data);
      } catch {
        console.log("Erro ao carregar processos");
      }
    };
    fetchData();
  }, []);

  const total = processos.length;
  const ativos = processos.filter((p) => p.ativo).length;
  const inativos = total - ativos;
  const ultimo = processos.length
    ? new Date(Math.max(...processos.map((p) => new Date(p.criado_em)))).toLocaleString()
    : "—";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-pink-950 flex items-center gap-2 dark:text-pink-200">
        <ListChecks className="w-6 h-6 text-pink-950 dark:text-pink-200" />
        Visão Geral
      </h1>

      <Link
        to="/processos/novo"
        className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition text-sm"
      >
        <PlusCircle className="w-4 h-4" />
        Novo Processo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card
          icon={<FolderCog />}
          label="Total de Processos"
          value={total}
          color="bg-blue-100 dark:bg-blue-900"
          iconColor="text-blue-800 dark:text-blue-300"
          to="/processos"
        />
        <Card
          icon={<Play />}
          label="Ativos"
          value={ativos}
          color="bg-green-100 dark:bg-green-900"
          iconColor="text-green-800 dark:text-green-300"
          to="/processos?filtro=ativos"
        />
        <Card
          icon={<Pause />}
          label="Inativos"
          value={inativos}
          color="bg-red-100 dark:bg-red-900"
          iconColor="text-red-800 dark:text-red-300"
          to="/processos?filtro=inativos"
        />
      </div>

      <div className="mt-8 text-sm text-gray-600 dark:text-gray-300">
        Último processo criado: <strong>{ultimo}</strong>
      </div>
    </div>
  );
}

function Card({ icon, label, value, color, iconColor, to }) {
  return (
    <Link
      to={to}
      className={`block p-4 rounded-lg shadow-sm ${color} hover:shadow-md transition`}
    >
      <div className={`flex items-center gap-2 ${iconColor}`}>
        <div>{icon}</div>
        <h2 className="text-sm font-medium">{label}</h2>
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </Link>
  );
}
