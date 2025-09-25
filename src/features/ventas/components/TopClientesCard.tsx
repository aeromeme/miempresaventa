import React from "react";
import { Card } from "primereact/card";
import type { ClienteIngresosDTO } from "../../../api/api";
import { useMonedaConfig } from "../../../shared/hooks/useMonedaConfig";


interface TopClientesCardProps {
  clientes: ClienteIngresosDTO[];
  loading?: boolean;
}

const TopClientesCard: React.FC<TopClientesCardProps> = ({
  clientes = [],
  loading = false,
}) => {
  const { formatearDinero } = useMonedaConfig();
  // Obtener el cliente top (el primero de la lista)
  const clienteTop = clientes[0];

  return (
    <Card title="Cliente Top" className="shadow-2">
      {loading ? (
        <div className="flex justify-content-center">
          <i className="pi pi-spin pi-spinner text-3xl" />
        </div>
      ) : clienteTop ? (
        <div className="flex flex-column align-items-center">
          <div className="mb-3">
            <i className="pi pi-crown text-yellow-500 text-4xl" />
          </div>
          <h2 className="m-0 mb-2 text-center">{clienteTop.nombre}</h2>
          <span className="text-4xl font-bold text-green-500 mb-2">
            {formatearDinero(clienteTop.totalIngresos)}
          </span>
          <div className="flex align-items-center">
            <i className="pi pi-shopping-cart mr-2" />
            <span className="font-semibold">{clienteTop.totalVentas}</span>
            <span className="text-500 ml-1">ventas</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-500">No hay datos disponibles</div>
      )}
    </Card>
  );
};

export default TopClientesCard;
