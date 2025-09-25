import React from "react";
import { Card } from "primereact/card";
import type { IngresosMensualesDTO } from "../../../api/api";
import { useMonedaConfig } from "../../../shared/hooks/useMonedaConfig";

interface IngresosMensualesCardProps {
  ingresos?: IngresosMensualesDTO;
  loading?: boolean;
}

const IngresosMensualesCard: React.FC<IngresosMensualesCardProps> = ({
  ingresos,
  loading = false,
}) => {
  const { formatearDinero } = useMonedaConfig();

  const formatearMes = (mes: number): string => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[mes - 1] || "";
  };

  const subTitle = ingresos
    ? `${formatearMes(ingresos.mes || 0)} ${ingresos.anio}`
    : "Cargando...";

  // Calcular promedio de venta
  const promedioVenta =
    ingresos?.ingresoTotal && ingresos?.totalVentas
      ? ingresos.ingresoTotal / ingresos.totalVentas
      : 0;

  return (
    <Card title="Ingresos del Mes" subTitle={subTitle} className="shadow-2">
      {loading ? (
        <div className="flex justify-content-center">
          <i className="pi pi-spin pi-spinner text-3xl" />
        </div>
      ) : (
        <div className="flex flex-column align-items-center">
          <span className="text-4xl font-bold text-green-500 mb-2">
            {formatearDinero(ingresos?.ingresoTotal)}
          </span>
          <div className="flex align-items-center gap-3">
            <div className="flex align-items-center">
              <i className="pi pi-shopping-cart mr-2" />
              <span className="font-semibold">{ingresos?.totalVentas}</span>
              <span className="text-500 ml-1">ventas</span>
            </div>
            <div className="flex align-items-center">
              <i className="pi pi-dollar mr-2" />
              <span className="font-semibold">
                {formatearDinero(promedioVenta)}
              </span>
              <span className="text-500 ml-1">promedio</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default IngresosMensualesCard;
