import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductosPage from "./features/productos/pages/ProductosPage";
import ClientesPage from "./features/clientes/pages/ClientesPage";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import ComingSoonPage from "./components/ComingSoonPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route
          path="/configuracion"
          element={<ComingSoonPage title="Configuración" />}
        />
        {/* Catch all route for 404 */}
        <Route
          path="*"
          element={
            <div className="text-center p-6">
              <h2 className="text-2xl text-600">Página no encontrada</h2>
              <p className="text-500">
                La página que estás buscando no existe.
              </p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
