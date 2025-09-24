import React, { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuItem } from "primereact/menuitem";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
        setSidebarVisible(false);
      },
      className: location.pathname === "/" ? "p-menuitem-active" : "",
    },
    {
      label: "Productos",
      icon: "pi pi-box",
      command: () => {
        navigate("/productos");
        setSidebarVisible(false);
      },
      className: location.pathname === "/productos" ? "p-menuitem-active" : "",
    },
    {
      label: "Clientes",
      icon: "pi pi-users",
      command: () => {
        navigate("/clientes");
        setSidebarVisible(false);
      },
      className: location.pathname === "/clientes" ? "p-menuitem-active" : "",
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
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <div className="bg-white shadow-1 p-3 flex align-items-center justify-content-between border-bottom-1 surface-border">
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
            tooltip="Notificaciones"
          />
          <Button
            icon="pi pi-user"
            className="p-button-rounded p-button-text"
            tooltip="Perfil"
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
        <Menu model={menuItems} className="w-full border-none" />
      </Sidebar>

      {/* Contenido principal */}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
