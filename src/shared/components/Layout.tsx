import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import type { MenuItemWithRoles } from "../utils/menuUtils";
import { filterMenuItemsByRoles } from "../utils/menuUtils";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const allMenuItems: MenuItemWithRoles[] = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
        setSidebarVisible(false);
      },
      className: location.pathname === "/" ? "p-menuitem-active" : "",
      roles: [], // Sin roles = visible para todos los usuarios autenticados
    },
    {
      label: "Productos",
      icon: "pi pi-box",
      command: () => {
        navigate("/productos");
        setSidebarVisible(false);
      },
      className: location.pathname === "/productos" ? "p-menuitem-active" : "",
      roles: ["ROLE_OPERADOR", "ROLE_ADMIN"],
    },
    {
      label: "Clientes",
      icon: "pi pi-users",
      command: () => {
        navigate("/clientes");
        setSidebarVisible(false);
      },
      className: location.pathname === "/clientes" ? "p-menuitem-active" : "",
      roles: ["ROLE_ADMIN"],
    },
    {
      label: "Dashboard Ventas",
      icon: "pi pi-chart-line",
      command: () => {
        navigate("/ventas/dashboard");
        setSidebarVisible(false);
      },
      className:
        location.pathname === "/ventas/dashboard" ? "p-menuitem-active" : "",
      roles: ["ROLE_ADMIN"],
    },
    {
      separator: true,
    },
    {
      label: "Configuración",
      icon: "pi pi-cog",
      command: () => {
        navigate("/configuracion");
        setSidebarVisible(false);
      },
      className:
        location.pathname === "/configuracion" ? "p-menuitem-active" : "",
      roles: ["ROLE_ADMIN"],
    },
  ];

  const visibleMenuItems = useMemo(
    () => filterMenuItemsByRoles(allMenuItems, user?.roles || []),
    [user?.roles]
  );

  return (
    <div className="w-screen min-h-screen bg-gray-50 flex flex-column">
      {/* Header fijo */}
      <div className="w-screen bg-white shadow-1 p-3 flex align-items-center justify-content-between border-bottom-1 surface-border">
        <div className="flex align-items-center gap-3">
          {/* Botón hamburguesa */}
          <Button
            icon="pi pi-bars"
            className="p-button-text p-button-plain"
            onClick={() => setSidebarVisible(true)}
            tooltip="Abrir menú"
            tooltipOptions={{ position: "bottom" }}
          />
          <h2 className="text-2xl font-bold text-primary m-0">Mi Venta App</h2>
        </div>

        <div className="flex align-items-center gap-2">
          <Button
            icon="pi pi-bell"
            className="p-button-rounded p-button-text"
          />
          <Button
            icon="pi pi-user"
            className="p-button-rounded p-button-text"
          />
          <Button
            icon="pi pi-sign-out"
            className="p-button-rounded p-button-text p-button-danger"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="left"
        style={{ width: "280px" }}
        header={
          <div className="flex align-items-center gap-2 p-2">
            <i className="pi pi-shopping-cart text-2xl text-primary"></i>
            <span className="font-bold text-xl">Mi Venta</span>
          </div>
        }
      >
        <Menu model={visibleMenuItems} className="w-full border-none" />
      </Sidebar>

      {/* Contenido principal */}
      <div className="w-screen flex-grow p-4">{children}</div>
    </div>
  );
};

export default Layout;
