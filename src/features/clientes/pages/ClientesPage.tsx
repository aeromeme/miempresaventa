import React, { useCallback, useEffect, useState } from "react";
import { ClientesApi, Configuration } from "../../../api";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useRef } from "react";
import type { Cliente } from "../../../api/models";
import ClientesTable from "../components/ClientesTable";

const configuration = new Configuration();
const clientesApi = new ClientesApi(configuration);

const ClientesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: false,
    hasNext: false,
    hasPrevious: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useRef<Toast>(null);

  const loadClientes = useCallback(
    async (page: number = 0, size: number = 10, search: string = "") => {
      try {
        setIsLoading(true);
        let response;
        if (search && search.length >= 3) {
          response = await clientesApi.obtenerClientesFiltrados(
            search,
            page,
            size
          );
        } else {
          response = await clientesApi.obtenerClientes(page, size);
        }

        if (response.data?.content) {
          setClientes(response.data.content as Cliente[]);
          setPagination({
            page,
            size,
            totalElements: response.data.totalElements || 0,
            totalPages: response.data.totalPages || 0,
            first: response.data.first || false,
            last: response.data.last || false,
            hasNext: response.data.hasNext || false,
            hasPrevious: response.data.hasPrevious || false,
          });
        }
      } catch (error) {
        console.error("Error al cargar clientes:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudieron cargar los clientes",
          life: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadClientes(pagination.page, pagination.size, searchTerm);
  }, [loadClientes, pagination.page, pagination.size, searchTerm]);

  const handleSearch = (term: string) => {
    if (term && term.length < 3) {
      loadClientes(0, pagination.size, "");
      return;
    }

    setSearchTerm(term);
    if (pagination.page !== 0) {
      setPagination((prev) => ({ ...prev, page: 0 }));
    } else {
      loadClientes(0, pagination.size, term);
    }
  };

  const handlePageChange = (page: number, size: number) => {
    setPagination((prev) => ({ ...prev, page, size }));
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex flex-column gap-4">
        <div className="text-500 text-sm">
          El filtro de búsqueda se aplicará cuando ingreses al menos 3
          caracteres.
        </div>
        <ClientesTable
          clientes={clientes}
          loading={isLoading}
          onSearch={handleSearch}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ClientesPage;
