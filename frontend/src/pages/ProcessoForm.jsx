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

    if (!form.comando.trim()) {
      setMensagem("O campo de comando é obrigatório.");
      return;
    }

    const comandoValido = /^[\w\s./-]+$/;
    if (!comandoValido.test(form.comando)) {
      setMensagem("O comando contém caracteres inválidos.");
      return;
    }

    if (form.data_execucao_agendada) {
      const agendada = new Date(form.data_execucao_agendada);
      const agora = new Date();
      if (agendada <= agora) {
        setMensagem("A data agendada precisa ser no futuro.");
        return;
      }
    }
  
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
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 dark:bg-slate-800">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Editar Processo" : "Novo Processo"}
      </h1>

      {mensagem && <p className="text-sm text-pink-700 mb-4">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700 dark:text-neutral-300">
            Nome
            <span
              className="group relative cursor-pointer"
              title="Dê um nome descritivo para o processo, como 'Exportar dados do mês'."
            >
              <Info className="w-4 h-4 text-pink-600 group-hover:text-pink-800" />
            </span>
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
            required
          />
        </div>
        <div className="relative">
          <label className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700 dark:text-neutral-300">
            Descrição
            <span
              className="group relative cursor-pointer"
              title="Explique brevemente o que o processo faz. Exemplo: 'Gera relatório mensal de vendas e envia por e-mail'."
            >
              <Info className="w-4 h-4 text-pink-600 group-hover:text-pink-800" />
            </span>
          </label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
          />
        </div>
        <div className="relative">
          <label className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700 dark:text-neutral-300">
            Comando a ser executado
            <span
              className="group relative cursor-pointer"
              title="Este campo é obrigatório e deve conter apenas letras, números, espaços, barras (/), pontos (.) e hífens (-)."
            >
              <Info className="w-4 h-4 text-pink-600 group-hover:text-pink-800" />
            </span>
          </label>
          <input
            type="text"
            name="comando"
            placeholder="Ex: python scripts/teste.py"
            value={form.comando}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
            required
          />
        </div>
        <label className="flex items-center gap-2 dark:text-neutral-300">
          <input
            type="checkbox"
            name="ativo"
            checked={form.ativo}
            onChange={handleChange}
          />
          Ativo
        </label>
        
        <label className="flex items-center gap-2 dark:text-neutral-300">
          Agendar para
        </label>
        <div className="relative">
          <label className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700 dark:text-neutral-300">
            Agendar execução (opcional)
            <span
              className="group relative cursor-pointer"
              title="Se quiser, você pode agendar uma data e hora para execução automática."
            >
              <Info className="w-4 h-4 text-pink-600 group-hover:text-pink-800" />
            </span>
          </label>
          <input
            type="datetime-local"
            name="data_execucao_agendada"
            value={form.data_execucao_agendada}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
          />
        </div>
        <div className="relative">
        <label className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700 dark:text-neutral-300">
          E-mail para notificação (opcional)
          <span
            className="group relative cursor-pointer"
            title="Você pode informar um e-mail para receber notificações sobre a execução do processo."
          >
            <Info className="w-4 h-4 text-pink-600 group-hover:text-pink-800" />
          </span>
        </label>
        <input
          type="email"
          name="email_alerta"
          value={form.email_alerta}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
          placeholder="exemplo@email.com"
        />
      </div>
        <button
          type="submit"
          className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
        >
          {id ? "Atualizar" : "Salvar"}
        </button>
      </form>
    </div>
  );
}
