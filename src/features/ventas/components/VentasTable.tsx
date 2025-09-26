import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import type { DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import type { VentaDTO } from "../../../../src/api/api";

interface VentasTableProps {
  ventas?: VentaDTO[];
  loading?: boolean;
  error?: string | null;
}

const VentasTable: React.FC<VentasTableProps> = ({
  ventas = [],
  loading,
  error,
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters.global = {
      value: value,
      matchMode: FilterMatchMode.CONTAINS,
    };
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-content-between align-items-center">
      <h3 className="m-0">Lista de Ventas</h3>
      <div className="flex align-items-center gap-2">
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Buscar ventas..."
          className="p-inputtext-sm"
        />
      </div>
    </div>
  );

  const estadoBodyTemplate = (rowData: VentaDTO) => {
    let severity: "info" | "success" | "warning" | "danger" | undefined =
      "info";
    if (rowData.estado === "E") severity = "success";
    else if (rowData.estado === "P") severity = "warning";
    else if (rowData.estado === "C") severity = "danger";
    return <Tag value={rowData.estado} severity={severity} />;
  };

  const totalBodyTemplate = (rowData: VentaDTO) => (
    <span className="font-semibold">
      {new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "USD",
      }).format(rowData.total || 0)}
    </span>
  );

  // Puedes agregar acciones si lo necesitas
  // const actionBodyTemplate = (rowData: VentaDTO) => (
  //   <div className="flex gap-2">
  //     <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary p-button-sm" />
  //     <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-sm" />
  //   </div>
  // );

  const header = renderHeader();

  return (
    <Card className="shadow-2">
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <DataTable
        value={ventas}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        filters={filters}
        globalFilterFields={["id", "clienteId", "estado"]}
        emptyMessage="No se encontraron ventas"
        className="p-datatable-striped"
        responsiveLayout="scroll"
        showGridlines
      >
        <Column
          field="id"
          header="ID"
          sortable
          style={{ minWidth: "120px" }}
          className="text-sm"
          hidden={true}
        />
        <Column
          field="clienteId"
          header="Cliente"
          sortable
          style={{ minWidth: "180px" }}
          className="font-medium"
        />
        <Column
          field="total"
          header="Total"
          body={totalBodyTemplate}
          sortable
          style={{ minWidth: "120px" }}
          className="text-center"
        />
        <Column
          field="estado"
          header="Estado"
          body={estadoBodyTemplate}
          sortable
          style={{ minWidth: "120px" }}
          className="text-center"
        />
        {/* Agrega más columnas según el modelo VentaDTO si lo necesitas */}
        {/* <Column body={actionBodyTemplate} header="Acciones" style={{ minWidth: "150px" }} className="text-center" /> */}
      </DataTable>
    </Card>
  );
};

export default VentasTable;
