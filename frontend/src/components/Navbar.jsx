import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Cog, Clock, LogOut, ChevronLeft, ChevronRight, Sun, Moon, ShieldCheck, HelpCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { isAuthenticated, logout, isAdmin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const menuItems = [
    { label: "Home", to: "/home", icon: <Home className="w-5 h-5" /> },
    { label: "Processos", to: "/processos", icon: <Cog className="w-5 h-5" /> },
    { label: "Histórico", to: "/historico", icon: <Clock className="w-5 h-5" /> },
    { label: "FAQ", to: "/faq", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <div className={`h-screen bg-pink-900 dark:bg-gray-900 text-white fixed top-0 left-0 transition-all duration-300 flex flex-col justify-between ${collapsed ? "w-16" : "w-64"} shadow-md`}>
      <div>
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={toggleSidebar} className="text-white">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
          {!collapsed && <h1 className="text-lg font-bold">MusicFlow <span className="text-pink-200 dark:text-pink-600">.</span></h1>}
        </div>

        <nav className="mt-4 space-y-2">
          {isAdmin && (
            <a
              href="https://musicflow-backend.onrender.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 hover:bg-pink-700 bg-pink-800 dark:hover:bg-gray-700 dark:bg-gray-800 transition text-sm text-white font-semibold rounded-r-full"
            >
              <ShieldCheck className="w-5 h-5 text-yellow-300" />
              {!collapsed && <span>Painel Admin</span>}
            </a>
          )}
          {isAuthenticated && menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-2 hover:bg-pink-600 dark:hover:bg-gray-800 transition text-sm"
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-pink-600 dark:hover:bg-gray-800 transition text-sm"
            >
              <LogOut className="w-5 h-5" />
              {!collapsed && <span>Sair</span>}
            </button>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-pink-400 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-white text-sm hover:text-gray-200 transition"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && <span>{darkMode ? "Modo Claro" : "Modo Escuro"}</span>}
        </button>
      </div>
    </div>
  );
}
