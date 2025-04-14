import { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosInstance";
import { Clock, Terminal, X } from "lucide-react";

export default function Historico() {
  const axiosAuth = useAxiosAuth();
  const [execucoes, setExecucoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [saidaAtual, setSaidaAtual] = useState("");

  useEffect(() => {
    axiosAuth
      .get("execucoes/")
      .then((res) => setExecucoes(res.data))
      .catch(() => console.log("Erro ao carregar histórico"));
  }, []);

  const abrirModal = (saida) => {
    setSaidaAtual(saida || "Sem saída registrada.");
    setModalAberto(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-2">
        <Clock className="w-6 h-6 text-blue-700" />
        Histórico de Execuções
      </h1>

      <ul className="space-y-4">
        {execucoes.map((exec) => (
          <li key={exec.id} className="bg-white p-4 rounded shadow border">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold">{exec.processo_nome}</h2>
                {exec.resumo && (
                  <p className="text-sm italic text-gray-700 mb-1">
                    {exec.resumo}
                  </p>
                )}
                {exec.data_execucao_agendada && (
                  <p className="text-xs text-gray-600">
                    Agendado para:{" "}
                    {new Date(exec.data_execucao_agendada).toLocaleString()}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  Executado em: {new Date(exec.data_execucao).toLocaleString()}
                </p>
                <span
                  className={`text-sm font-medium ${
                    exec.status === "SUCESSO"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {exec.status}
                </span>
              </div>

              <button
                onClick={() => {
                  setSaidaAtual(exec.saida || "Sem saída registrada.");
                  setModalAberto(true);
                }}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <Terminal className="w-4 h-4" />
                Ver saída
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">📤 Saída do processo</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
              {saidaAtual}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
