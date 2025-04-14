import { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosInstance";
import { FolderCog, Trash2, Play, Pause, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";

export default function Processos() {
  const axiosAuth = useAxiosAuth();
  const [processos, setProcessos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const fetchProcessos = async () => {
    try {
      const res = await axiosAuth.get("processos");
      setProcessos(res.data);
    } catch {
      setMensagem("Erro ao carregar processos.");
    }
  };

  useEffect(() => {
    fetchProcessos();
  }, []);

  const location = useLocation();
  const filtro = new URLSearchParams(location.search).get("filtro");

  const processosFiltrados = processos.filter((p) => {
    if (filtro === "ativos") return p.ativo;
    if (filtro === "inativos") return !p.ativo;
    return true;
  });

  const handleDelete = async (id) => {
    console.log("Tentando excluir o processo:", id);
    try {
      await axiosAuth.delete(`processos/${id}`);
      setMensagem("🗑️ Processo excluído com sucesso.");
      fetchProcessos();
    } catch {
      setMensagem("❌ Erro ao excluir processo.");
    }
  };

  const toggleAtivo = async (id, statusAtual) => {
    try {
      await axiosAuth.patch(`processos/${id}`, { ativo: !statusAtual });
      fetchProcessos();
    } catch {
      setMensagem("❌ Erro ao atualizar status.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="flex items-center"></h1>

        <Link
          to="/processos/novo"
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Novo Processo
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        <FolderCog className="w-6 h-6 text-blue-700" /> Processos Automatizados
      </h1>

      {/* Mensagem */}
      {mensagem && (
        <div className="mb-4 text-center text-sm text-blue-800 bg-blue-100 px-4 py-2 rounded">
          {mensagem}
        </div>
      )}

      {/* Lista de processos */}
      <div className="space-y-4">
        {processos.length === 0 && (
          <p className="text-gray-600">Nenhum processo cadastrado.</p>
        )}
        {processosFiltrados.map((proc) => (
          <div
            key={proc.id}
            className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition relative"
          >
            <h3 className="text-xl font-semibold text-blue-800">{proc.nome}</h3>
            <p className="text-gray-700 text-sm mb-2">{proc.descricao}</p>
            <code className="block bg-gray-100 p-2 rounded text-sm text-gray-800">
              {proc.comando}
            </code>
            <p className="text-xs text-gray-500 mt-1">
              Criado em: {new Date(proc.criado_em).toLocaleString()} - Por: {proc.criado_por_nome}
            </p>

            {/* Status */}
            <p className="text-sm mt-2">
              Status:{" "}
              <span className={proc.ativo ? "text-green-600" : "text-red-600"}>
                {proc.ativo ? "Ativo" : "Inativo"}
              </span>
            </p>

            {/* Ações */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to={`/processos/${proc.id}/editar`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </Link>

              <button
                onClick={() => toggleAtivo(proc.id, proc.ativo)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm flex items-center gap-1"
              >
                {proc.ativo ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {proc.ativo ? "Desativar" : "Ativar"}
              </button>

              <button
                onClick={() => {
                  setIdParaExcluir(proc.id);
                  setMostrarModal(true);
                }}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onConfirm={() => handleDelete(idParaExcluir)}
        mensagem="Tem certeza que deseja excluir este processo? Essa ação não pode ser desfeita."
      />
    </div>
  );
}
