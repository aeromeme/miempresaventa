import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import type { DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import type { ProductoDto } from "../../../api";

interface ProductosTableProps {
  productos?: ProductoDto[];
  onEdit?: (product: ProductoDto) => void;
  onDelete?: (product: ProductoDto) => void;
  isDeleting?: boolean;
}

const ProductosTable: React.FC<ProductosTableProps> = ({
  productos = [],
  onEdit,
  onDelete,
  isDeleting = false,
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

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0">Lista de Productos</h3>
        <div className="flex align-items-center gap-2">
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar productos..."
              className="p-inputtext-sm"
            />
        </div>
      </div>
    );
  };

  const priceBodyTemplate = (rowData: ProductoDto) => {
    return (
      <div className="flex align-items-center gap-2">
        <span className="font-semibold">
          {new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: rowData.moneda || "USD",
          }).format(rowData.precio || 0)}
        </span>
      </div>
    );
  };

  const stockBodyTemplate = (rowData: ProductoDto) => {
    const stock = rowData.stock || 0;
    const severity = stock > 10 ? "success" : stock > 0 ? "warning" : "danger";
    const icon =
      stock > 10
        ? "pi-check"
        : stock > 0
        ? "pi-exclamation-triangle"
        : "pi-times";

    return (
      <Tag
        value={`${stock} unidades`}
        severity={severity}
        icon={`pi ${icon}`}
      />
    );
  };

  const actionBodyTemplate = (rowData: ProductoDto) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-primary p-button-sm"
          tooltip="Editar producto"
          tooltipOptions={{ position: "top" }}
          onClick={() => onEdit?.(rowData)}
          disabled={isDeleting}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          tooltip="Eliminar producto"
          tooltipOptions={{ position: "top" }}
          onClick={() => onDelete?.(rowData)}
          disabled={isDeleting}
        />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <Card className="shadow-2">
      <DataTable
        value={productos}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        filters={filters}
        globalFilterFields={["nombre", "id", "moneda"]}
        emptyMessage="No se encontraron productos"
        className="p-datatable-striped"
        responsiveLayout="scroll"
        showGridlines
      >
        <Column
          field="id"
          header="ID"
          sortable
          style={{ minWidth: "200px" }}
          className="text-sm"
          hidden={true}
        />
        <Column
          field="nombre"
          header="Nombre del Producto"
          sortable
          style={{ minWidth: "250px" }}
          className="font-medium"
        />
        <Column
          field="precio"
          header="Precio"
          body={priceBodyTemplate}
          sortable
          style={{ minWidth: "150px" }}
          className="text-center"
        />
        <Column
          field="stock"
          header="Stock"
          body={stockBodyTemplate}
          sortable
          style={{ minWidth: "150px" }}
          className="text-center"
        />
        <Column
          body={actionBodyTemplate}
          header="Acciones"
          style={{ minWidth: "150px" }}
          className="text-center"
        />
      </DataTable>
    </Card>
  );
};

export default ProductosTable;
