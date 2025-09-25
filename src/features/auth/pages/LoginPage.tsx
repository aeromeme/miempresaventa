import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import type { AuthenticationRequest } from "../../../api";
import { AutenticacinApi } from "../../../api";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useAxiosConfig } from "../../../api/hooks/useAxiosConfig";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const axiosConfig = useAxiosConfig();

  const handleLogin = async (credentials: AuthenticationRequest) => {
    try {
      setIsLoading(true);
      const authApi = new AutenticacinApi(axiosConfig);

      const response = await authApi.authenticate(credentials);

      if (!response.data?.token) {
        throw new Error("No se recibió el token de autenticación");
      }

      // Store the token and update auth state
      login(response.data);

      // Siempre redirigir al dashboard
      navigate("/", { replace: true });

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Sesión iniciada correctamente",
        life: 3000,
      });
    } catch (err: any) {
      console.error("Error during login:", err);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: err.message || "Error al intentar iniciar sesión",
        life: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="surface-ground min-h-screen w-screen flex align-items-center justify-content-center">
      <div className="w-full sm:w-11 md:w-8 lg:w-6 xl:w-4">
        <Card>
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold text-900 mb-2">Bienvenido</h2>
            <p className="text-600 mb-4">Inicia sesión para continuar</p>
          </div>

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          <Toast ref={toast} />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
