import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import type { Cliente } from "../../../api/models";

interface ClientesTableProps {
  clientes?: Cliente[];
  loading?: boolean;
  onSearch?: (term: string) => void;
  pagination?: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  onPageChange?: (page: number, size: number) => void;
}

const ClientesTable: React.FC<ClientesTableProps> = ({
  clientes = [],
  loading = false,
  onSearch,
  pagination,
  onPageChange,
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    onSearch?.(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0">Lista de Clientes</h3>
        <div className="flex align-items-center gap-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar clientes..."
              className="p-inputtext-sm"
            />
          </span>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <Card className="shadow-2">
      <DataTable
        value={clientes}
        paginator
        rows={pagination?.size || 10}
        first={(pagination?.page || 0) * (pagination?.size || 10)}
        totalRecords={pagination?.totalElements}
        onPage={(e) => onPageChange?.(e.page ?? 0, e.rows ?? 10)}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        emptyMessage="No se encontraron clientes"
        className="p-datatable-striped"
        responsiveLayout="scroll"
        showGridlines
        loading={loading}
      >
        <Column
          field="nombre"
          header="Nombre"
          sortable
          style={{ minWidth: "250px" }}
          className="font-medium"
        />
        <Column
          field="correo"
          header="Correo Electrónico"
          sortable
          style={{ minWidth: "250px" }}
        />
      </DataTable>
    </Card>
  );
};

export default ClientesTable;
