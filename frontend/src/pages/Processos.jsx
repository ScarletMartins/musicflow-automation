import { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosInstance";
import { FolderCog, Trash2, Play, Pause, Pencil, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ChatBot from "../components/ChatBot";
import { useAuth } from "../context/AuthContext";

export default function Processos() {
  const axiosAuth = useAxiosAuth();
  const { isAuthenticated } = useAuth();
  const [processos, setProcessos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const fetchProcessos = async () => {
    try {
      const res = await axiosAuth.get("/processos/");
      setProcessos(res.data);
    } catch {
      setMensagem("Erro ao carregar processos.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProcessos();
    }
  }, [isAuthenticated]);

  const location = useLocation();
  const filtro = new URLSearchParams(location.search).get("filtro");

  const processosFiltrados = processos.filter((p) => {
    if (filtro === "ativos") return p.ativo;
    if (filtro === "inativos") return !p.ativo;
    return true;
  });

  const handleDelete = async (id) => {
    try {
      await axiosAuth.delete(`/processos/${id}/`);
      setMensagem("🗑️ Processo excluído com sucesso.");
      fetchProcessos();
    } catch {
      setMensagem("❌ Erro ao excluir processo.");
    }
  };

  const toggleAtivo = async (id, statusAtual) => {
    try {
      await axiosAuth.patch(`/processos/${id}/`, { ativo: !statusAtual });
      fetchProcessos();
    } catch {
      setMensagem("❌ Erro ao atualizar status.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-pink-950 dark:text-pink-200">
          <FolderCog className="w-6 h-6 text-pink-950 dark:text-pink-200" />
          Processos Automatizados
        </h1>

        <Link
          to="/processos/novo"
          className="flex items-center gap-1 bg-pink-950 text-white px-4 py-2 rounded hover:text-slate-900 hover:bg-pink-200 dark:hover:bg-pink-600 transition text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Novo Processo
        </Link>
      </div>

      {mensagem && (
        <div className="mb-4 text-center text-sm text-pink-900 bg-pink-100 px-4 py-2 rounded dark:text-pink-200 dark:bg-pink-950/20">
          {mensagem}
        </div>
      )}

      <div className="space-y-4">
        {processos.length === 0 && (
          <p className="text-gray-600 dark:text-neutral-400">Nenhum processo cadastrado.</p>
        )}
        {processosFiltrados.map((proc) => (
          <div
          key={proc.id}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow hover:shadow-md transition relative"
        >
          {/* Título + Ações */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-pink-900 dark:text-pink-300">{proc.nome}</h3>
            <div className="flex items-center gap-3">
              <Link
                to={`/processos/${proc.id}/editar`}
                title="Editar"
                className="text-pink-600 hover:text-pink-400 dark:text-pink-300 dark:hover:text-pink-200"
              >
                <Pencil className="w-5 h-5" />
              </Link>
        
              <button
                onClick={() => toggleAtivo(proc.id, proc.ativo)}
                title={proc.ativo ? "Desativar" : "Ativar"}
                className="text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300"
              >
                {proc.ativo ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
        
              <button
                onClick={() => {
                  setIdParaExcluir(proc.id);
                  setMostrarModal(true);
                }}
                title="Excluir"
                className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        
          {/* Descrição */}
          <p className="text-gray-700 dark:text-neutral-300 text-sm mb-2">{proc.descricao}</p>
        
          {/* Comando */}
          <code className="block bg-gray-100 dark:bg-slate-900 p-2 rounded text-sm text-gray-800 dark:text-neutral-200">
            {proc.comando}
          </code>
        
          {/* Meta info */}
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
            Criado em: {new Date(proc.criado_em).toLocaleString()} — Por: {proc.criado_por_nome}
          </p>
        
          {/* Status */}
          <p className="text-sm mt-2 text-gray-700 dark:text-neutral-300">
            Status:{" "}
            <span className={proc.ativo ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {proc.ativo ? "Ativo" : "Inativo"}
            </span>
          </p>
        </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-60">
          <div className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-lg p-6 shadow-lg w-full max-w-md mx-4">
            <h2 className="text-lg font-bold mb-4 text-pink-900 dark:text-pink-300">
              Confirmar exclusão
            </h2>

            <p className="text-sm mb-6 text-gray-700 dark:text-neutral-300">
              Tem certeza que deseja excluir este processo? Essa ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDelete(idParaExcluir);
                  setMostrarModal(false);
                }}
                className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700 dark:hover:bg-pink-500 text-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-12">
                    <ChatBot />
      </div>
    </div>
  );
}
