import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosAuth } from "../api/axiosInstance";
import { Info } from "lucide-react";

export default function ProcessoForm() {
  const { id } = useParams();
  const axiosAuth = useAxiosAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    comando: "",
    ativo: true,
    data_execucao_agendada: "",
    email_alerta: "",
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (id) {
      axiosAuth
        .get(`/processos/${id}/`)
        .then((res) => setForm(res.data))
        .catch(() => setMensagem("Erro ao carregar processo."));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosAuth.put(`/processos/${id}/`, form);
        setMensagem("Processo atualizado com sucesso!");
      } else {
        await axiosAuth.post("/processos/", form);
        setMensagem("Processo criado com sucesso!");
      }
      setTimeout(() => navigate("/processos"), 1000);
    } catch {
      setMensagem("Erro ao salvar processo.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Editar Processo" : "Novo Processo"}
      </h1>

      {mensagem && <p className="text-sm text-blue-700 mb-4">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="comando"
          placeholder="Comando a ser executado"
          value={form.comando}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ativo"
            checked={form.ativo}
            onChange={handleChange}
          />
          Ativo
        </label>
        
        <label className="flex items-center gap-2">
          Agendar para
        </label>
        <input
          type="datetime-local"
          name="data_execucao_agendada"
          value={form.data_execucao_agendada}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required={false}
        />
        <div className="relative">
        <label className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700">
          E-mail para notificação (opcional)
          <span
            className="group relative cursor-pointer"
            title="Você pode informar um e-mail para receber notificações sobre a execução do processo."
          >
            <Info className="w-4 h-4 text-blue-600 group-hover:text-blue-800" />
          </span>
        </label>
        <input
          type="email"
          name="email_alerta"
          value={form.email_alerta}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="exemplo@email.com"
        />
      </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {id ? "Atualizar" : "Salvar"}
        </button>
      </form>
    </div>
  );
}
