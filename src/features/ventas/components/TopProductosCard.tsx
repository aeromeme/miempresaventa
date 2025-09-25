import React from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { TopProductoDTO } from "../../../api/api";
import { useMonedaConfig } from "../../../shared/hooks/useMonedaConfig";

interface TopProductosCardProps {
  productos: TopProductoDTO[];
  loading?: boolean;
}

const TopProductosCard: React.FC<TopProductosCardProps> = ({
  productos = [],
  loading = false,
}) => {
  const { formatearDinero } = useMonedaConfig();
  const getProductIcon = (index: number) => {
    switch (index) {
      case 0:
        return <i className="pi pi-star-fill text-yellow-500 mr-2" />;
      case 1:
        return <i className="pi pi-star text-gray-500 mr-2" />;
      case 2:
        return <i className="pi pi-star text-amber-900 mr-2" />;
      default:
        return null;
    }
  };

  const nombreTemplate = (
    rowData: TopProductoDTO,
    options: { rowIndex: number }
  ) => {
    return (
      <div className="flex align-items-center">
        {getProductIcon(options.rowIndex)}
        <span>{rowData.nombre}</span>
      </div>
    );
  };

  const cantidadTemplate = (rowData: TopProductoDTO) => {
    return <span className="font-bold">{rowData.totalVendido}</span>;
  };

  const precioTemplate = (rowData: TopProductoDTO) => {
    return (
      <span className="font-bold text-green-500">
        {formatearDinero(rowData.totalIngresos)}
      </span>
    );
  };

  return (
    <Card title="Top 3 Productos Más Vendidos" className="shadow-2">
      <DataTable
        value={productos}
        loading={loading}
        rows={3}
        emptyMessage="No hay datos disponibles"
        className="p-datatable-sm"
      >
        <Column
          field="nombre"
          header="Producto"
          body={nombreTemplate}
          style={{ width: "50%" }}
        />
        <Column
          field="totalVendido"
          header="Cantidad"
          body={cantidadTemplate}
          style={{ width: "25%" }}
        />
        <Column
          field="totalIngresos"
          header="Total"
          headerStyle={{ textAlign: "right" }}
          body={precioTemplate}
          style={{ width: "25%", textAlign: "right" }}
        />
      </DataTable>
    </Card>
  );
};

export default TopProductosCard;
