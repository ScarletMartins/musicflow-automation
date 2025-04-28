import { useEffect, useState } from "react";
import { useAxiosAuth } from "../api/axiosInstance";
import { Clock, Terminal, X } from "lucide-react";
import ChatBot from "../components/ChatBot";

export default function Historico() {
  const axiosAuth = useAxiosAuth();
  const [execucoes, setExecucoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [saidaAtual, setSaidaAtual] = useState("");

  useEffect(() => {
    axiosAuth
      .get("/execucoes")
      .then((res) => setExecucoes(res.data))
      .catch(() => console.log("Erro ao carregar histórico"));
  }, []);

  const abrirModal = (saida) => {
    setSaidaAtual(saida || "Sem saída registrada.");
    setModalAberto(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-pink-950 dark:text-pink-200 flex items-center gap-2">
        <Clock className="w-6 h-6 text-pink-950 dark:text-pink-200" />
        Histórico de Execuções
      </h1>

      <ul className="space-y-4">
        {execucoes.map((exec) => (
          <li
            key={exec.id}
            className="bg-white border border-slate-200 p-4 rounded shadow-sm dark:bg-slate-800 dark:border-slate-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-pink-950 dark:text-pink-400">{exec.processo_nome}</h2>

                {exec.resumo && (
                  <p className="text-sm italic text-gray-700 mb-1 dark:text-neutral-300">
                    {exec.resumo}
                  </p>
                )}

                {exec.data_execucao_agendada && (
                  <p className="text-xs text-pink-950 dark:text-pink-200">
                    Agendado para:{" "}
                    {new Date(exec.data_execucao_agendada).toLocaleString()}
                  </p>
                )}

                <p className="text-sm text-pink-950 dark:text-pink-200">
                  Executado em: {new Date(exec.data_execucao).toLocaleString()}
                </p>

                <span
                  className={`text-sm font-medium ${
                    exec.status === "SUCESSO"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {exec.status}
                </span>
              </div>

              <button
                onClick={() => abrirModal(exec.saida)}
                className="text-sm text-pink-600 hover:underline flex items-center gap-1 dark:text-pink-300 dark:hover:text-pink-200"
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative dark:bg-slate-800">
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-4 text-pink-950 dark:text-pink-300">
              📤 Saída do processo
            </h2>

            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap text-gray-800 dark:bg-slate-900 dark:text-neutral-200">
              {saidaAtual}
            </pre>
          </div>
        </div>
      )}
      <div className="mt-12">
              <ChatBot />
      </div>
    </div>
  );
}
