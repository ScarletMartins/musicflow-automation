import Sidebar from "./Navbar";


export default function BaseLayout({ children }) {
  return (
    <div className="min-h-screen text-gray-800 bg-gray-100 dark:bg-slate-700">
      <Sidebar />
      <main className="ml-16 md:ml-64 transition-all duration-300 flex-1 py-8 px-6">
        {children}
      </main>
    </div>
  );
}