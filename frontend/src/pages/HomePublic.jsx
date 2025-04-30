import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Clock, Zap, CalendarCheck, Shield } from "lucide-react";
import { SiGithub } from 'react-icons/si';

export default function HomePublic() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-pink-200 via-white to-pink-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-700 text-gray-800 dark:text-white relative overflow-hidden">

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

      <header className="w-full px-8 py-4 flex justify-between items-center absolute top-0 left-0 z-20">
        <h1 className="text-2xl font-extrabold text-pink-700 dark:text-pink-300">
            MusicFlow<span className="text-black dark:text-white">.</span>
        </h1>
        <nav>
            <Link
            to="/faq"
            className="text-base px-6 font-medium text-gray-700 dark:text-neutral-300 hover:text-pink-700 dark:hover:text-pink-300 transition"
            >
            FAQ
            </Link>
        </nav>
        </header>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 z-10">
        <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold mb-4 text-pink-700 dark:text-pink-300">MusicFlow<span class="text-black">.</span></h1>
          <p className="text-lg max-w-xl mb-6 leading-relaxed">
            Plataforma moderna para <strong>automação de processos</strong>, com agendamentos inteligentes, histórico detalhado, e envio de alertas por e-mail.
            Ideal para equipes que desejam <strong>ganhar tempo</strong>, reduzir erros e manter o controle sobre execuções programadas.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Link
              to="/login"
              className="px-6 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
            >
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full flex justify-center items-center py-4 bg-transparent text-sm text-gray-600 dark:text-neutral-400">
        <a
          href="https://github.com/ScarletMartins/musicflow-automation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-pink-700 dark:hover:text-pink-300"
        >
          <SiGithub size={24} />
        </a>
      </footer>

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
