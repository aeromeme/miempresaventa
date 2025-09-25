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
  console.log("RoleGuard - Current user:", user);
  console.log("RoleGuard - Allowed roles:", allowedRoles);

  if (!user || !user.roles) {
    console.log("RoleGuard - No user or no roles, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = user.roles.some((role) => {
    console.log("RoleGuard - Checking role:", role);
    const hasRole = allowedRoles.includes(role);
    console.log("RoleGuard - Has role?", hasRole);
    return hasRole;
  });

  if (!hasRequiredRole) {
    console.log("RoleGuard - Access denied, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("RoleGuard - Access granted, rendering element");
  return element;
};
