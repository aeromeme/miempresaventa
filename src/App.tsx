import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import Dashboard from "./pages/Dashboard";
import ProductosPage from "./features/productos/pages/ProductosPage";
import ClientesPage from "./features/clientes/pages/ClientesPage";
import DashboardVentas from "./features/ventas/pages/DashboardVentas";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import ComingSoonPage from "./components/ComingSoonPage";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { RoleGuard } from "./features/auth/components/RoleGuard";
import "./App.css";

const LoadingSpinner = () => (
  <div className="flex align-items-center justify-content-center min-h-screen">
    <ProgressSpinner />
  </div>
);

const NotFound = () => (
  <div className="text-center p-6">
    <h2 className="text-2xl text-600">Página no encontrada</h2>
    <p className="text-500">La página que estás buscando no existe.</p>
  </div>
);

const App: React.FC = () => (
  <AuthProvider>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Rutas públicas dentro del dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Rutas por rol */}
            <Route>
              {/* Productos - accesible para operadores y admins */}
              <Route
                path="/productos"
                element={
                  <RoleGuard
                    allowedRoles={["ROLE_OPERADOR", "ROLE_ADMIN"]}
                    element={<ProductosPage />}
                  />
                }
              />

              {/* Rutas solo para admin */}
              <Route
                path="/clientes"
                element={
                  <RoleGuard
                    allowedRoles={["ROLE_ADMIN"]}
                    element={<ClientesPage />}
                  />
                }
              />
              <Route
                path="/ventas/dashboard"
                element={
                  <RoleGuard
                    allowedRoles={["ROLE_ADMIN"]}
                    element={<DashboardVentas />}
                  />
                }
              />
              <Route
                path="/configuracion"
                element={
                  <RoleGuard
                    allowedRoles={["ROLE_ADMIN"]}
                    element={<ComingSoonPage title="Configuración" />}
                  />
                }
              />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </AuthProvider>
);

export default App;
