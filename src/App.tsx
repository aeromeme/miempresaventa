import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProductosPage from "./pages/ProductosPage";
import ComingSoonPage from "./components/ComingSoonPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route
          path="/clientes"
          element={<ComingSoonPage title="Página de Clientes" />}
        />
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
      </Routes>
    </Layout>
  );
};

export default App;
