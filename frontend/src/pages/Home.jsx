import { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosInstance";
import { FolderCog, Play, Pause, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export default function Home() {
  const axiosAuth = useAxiosAuth();
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosAuth.get("/api/processos/");
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
    ? new Date(
        Math.max(...processos.map((p) => new Date(p.criado_em)))
      ).toLocaleString()
    : "—";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-2">
        <ListChecks className="w-6 h-6 text-blue-700" />
        Visão Geral
      </h1>

      <Link
        to="/processos/novo"
        className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
      >
        <PlusCircle className="w-4 h-4" />
        Novo Processo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          icon={<FolderCog />}
          label="Total de Processos"
          value={total}
          color="bg-blue-100"
          to="/processos"
        />
        <Card
          icon={<Play />}
          label="Ativos"
          value={ativos}
          color="bg-green-100"
          to="/processos?filtro=ativos"
        />
        <Card
          icon={<Pause />}
          label="Inativos"
          value={inativos}
          color="bg-red-100"
          to="/processos?filtro=inativos"
        />
      </div>

      <div className="mt-8 text-sm text-gray-600">
        Último processo criado: <strong>{ultimo}</strong>
      </div>
    </div>
  );
}

function Card({ icon, label, value, color, to }) {
  return (
    <Link
      to={to}
      className={`block p-4 rounded-lg shadow-sm ${color} hover:shadow-md transition`}
    >
      <div className="flex items-center gap-2 text-gray-700">
        <div className="text-blue-800">{icon}</div>
        <h2 className="text-sm font-medium">{label}</h2>
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </Link>
  );
}
