import React from "react";
import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleGuardProps {
  allowedRoles: string[];
  element: ReactElement;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  element,
}) => {
  const { user } = useAuth();

  // Debug: verificar el estado del usuario y sus roles


  if (!user || !user.roles) {

    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = user.roles.some((role) => {

    const hasRole = allowedRoles.includes(role);
 
    return hasRole;
  });

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};
