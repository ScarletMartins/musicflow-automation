import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Zap,
  CalendarCheck,
  Clock,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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

export default function FaqPage({ isPublic = false }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { isAuthenticated } = useAuth();
  const showBackButton = isPublic && !isAuthenticated;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative h-screen dark:bg-slate-700 text-gray-800 dark:text-white overflow-hidden">
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

      <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-pink-950 dark:text-pink-200">
          <HelpCircle className="w-6 h-6" />
          Perguntas Frequentes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqList.map((item, index) => (
            <div
              key={index}
              className="border border-pink-300 dark:border-pink-600 rounded-lg p-4 bg-white/50 dark:bg-slate-800/50 shadow-sm hover:shadow-md transition"
            >
              <button
                className="w-full flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span className="text-lg font-medium">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {showBackButton && (
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 dark:text-neutral-300 hover:text-pink-700 dark:hover:text-pink-300 transition"
            >
              ← Voltar à Página Inicial
            </Link>
          </div>
        )}
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
