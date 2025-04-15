import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-300 transition z-50"
      title={darkMode ? "Modo Claro" : "Modo Escuro"}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
