import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Processos from "./pages/Processos";
import { useAuth } from "./context/AuthContext";
import BaseLayout from "./components/BaseLayout";
import Historico from "./pages/Historico";
import ProcessoForm from "./pages/ProcessoForm";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas com layout */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <BaseLayout>
                <Home />
              </BaseLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/processos"
          element={
            <PrivateRoute>
              <BaseLayout>
                <Processos />
              </BaseLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/historico"
          element={
            <PrivateRoute>
              <BaseLayout>
                <Historico />
              </BaseLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/processos/novo"
          element={
            <PrivateRoute>
              <BaseLayout>
                <ProcessoForm />
              </BaseLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/processos/:id/editar"
          element={
            <PrivateRoute>
              <BaseLayout>
                <ProcessoForm />
              </BaseLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
