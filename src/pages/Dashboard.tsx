import React from "react";
import { Card } from "primereact/card";

interface DashboardStats {
  productos: number;
  clientes: number;
  ventasHoy: number;
  ingresos: number;
}

const Dashboard: React.FC = () => {
  // These would typically come from an API or context
  const stats: DashboardStats = {
    productos: 150,
    clientes: 45,
    ventasHoy: 28,
    ingresos: 2450,
  };

  return (
    <div className="grid">
      <div className="col-12">
        {/* Header del Dashboard */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-900 m-0">Dashboard</h1>
          <p className="text-600 mt-2 mb-0">Panel principal de Mi Venta App</p>
        </div>

        {/* Stats Cards */}
        <div className="grid mb-4">
          <div className="col-12 md:col-6 lg:col-3">
            <Card className="text-center bg-blue-50 border-blue-200">
              <i className="pi pi-box text-4xl text-blue-500 mb-3"></i>
              <h3 className="text-2xl font-bold text-blue-700 m-0">
                {stats.productos}
              </h3>
              <p className="text-blue-600 mt-2 mb-0">Productos</p>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card className="text-center bg-green-50 border-green-200">
              <i className="pi pi-users text-4xl text-green-500 mb-3"></i>
              <h3 className="text-2xl font-bold text-green-700 m-0">
                {stats.clientes}
              </h3>
              <p className="text-green-600 mt-2 mb-0">Clientes</p>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card className="text-center bg-orange-50 border-orange-200">
              <i className="pi pi-shopping-cart text-4xl text-orange-500 mb-3"></i>
              <h3 className="text-2xl font-bold text-orange-700 m-0">
                {stats.ventasHoy}
              </h3>
              <p className="text-orange-600 mt-2 mb-0">Ventas Hoy</p>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card className="text-center bg-purple-50 border-purple-200">
              <i className="pi pi-dollar text-4xl text-purple-500 mb-3"></i>
              <h3 className="text-2xl font-bold text-purple-700 m-0">
                ${stats.ingresos.toLocaleString()}
              </h3>
              <p className="text-purple-600 mt-2 mb-0">Ingresos</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
