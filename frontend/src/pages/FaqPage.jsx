import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, HelpCircle, Zap, CalendarCheck, Clock, Shield } from "lucide-react";

const faqList = [
  {
    question: "O que é o MusicFlow Automation?",
    answer:
      "É uma plataforma para automatizar tarefas repetitivas e agendar processos como execução de scripts, geração de relatórios e envio de alertas por e-mail.",
  },
  {
    question: "Quem pode usar?",
    answer:
      "Inicialmente voltada para uso interno da equipe, mas com estrutura pensada para expansão futura.",
  },
  {
    question: "Preciso instalar algo?",
    answer: "Não. A plataforma funciona 100% online, diretamente no navegador.",
  },
  {
    question: "Os processos são executados automaticamente?",
    answer:
      "Sim. Você pode agendar tarefas e elas serão executadas automaticamente pelo sistema, com histórico completo e alertas configuráveis.",
  },
  {
    question: "Posso receber notificações por e-mail?",
    answer:
      "Sim, é possível configurar alertas por e-mail após a execução de processos automatizados.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-white to-pink-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-700 text-gray-800 dark:text-white px-8 py-16 relative overflow-hidden">

      <div className="absolute top-10 left-10 animate-float-slow opacity-20">
        <Zap size={80} />
      </div>
      <div className="absolute bottom-20 right-16 animate-float-fast opacity-10">
        <CalendarCheck size={100} />
      </div>
      <div className="absolute top-40 right-32 animate-float-slow opacity-10">
        <Clock size={90} />
      </div>
      <div className="absolute bottom-10 left-16 animate-float-fast opacity-20">
        <Shield size={70} />
      </div>

      <header className="w-full mb-10 text-center relative z-10">
        <h1 className="text-4xl font-bold text-pink-700 dark:text-pink-300 inline-flex items-center gap-3 justify-center">
          <HelpCircle className="w-8 h-8" />
          Perguntas Frequentes
        </h1>
      </header>

      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        {faqList.map((item, index) => (
          <div
            key={index}
            className="border border-pink-300 dark:border-pink-600 rounded-lg overflow-hidden bg-white/50 dark:bg-slate-800/50"
          >
            <button
              className="w-full flex justify-between items-center p-4 focus:outline-none hover:bg-pink-100 dark:hover:bg-slate-700 transition"
              onClick={() => toggle(index)}
            >
              <span className="text-lg font-medium text-left">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-700 dark:text-gray-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
        
    <div className="mt-4 text-center">
        <Link
        to="/"
        className="text-sm font-medium text-gray-700 dark:text-neutral-300 hover:text-pink-700 dark:hover:text-pink-300 transition"
        >
        ← Voltar à Página Inicial
        </Link>
    </div>
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float-fast {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
          .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}
