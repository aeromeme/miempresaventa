import React, { useState, useEffect } from "react";
import ProductosTable from "../components/ProductosTable";
import ProductForm from "../components/ProductForm";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProductosApi } from "../api";
import type { ProductoDto, CreateProductoDto, UpdateProductoDto } from "../api";
import { useRef } from "react";

const ProductosPage: React.FC = () => {
  const [productos, setProductos] = useState<ProductoDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    ProductoDto | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const productosApi = new ProductosApi();
    let isSubscribed = true;

    const loadProductos = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Iniciando carga de productos..."); // Debug log
        const response = await productosApi.listarTodos();
        console.log("API Response:", response); // Debug log

        if (isSubscribed) {
          if (response) {
            // Debug logs to understand the response structure
            console.log("Productos Data:", response); // Debug log
            console.log("Tipo de response:", typeof response); // Debug log
            console.log("Contenido de data:", response.data); // Debug log

            // Use response.data which contains the actual array of products
            const productosArray = response.data ?? [];

            console.log("Array final de productos:", productosArray); // Debug log
            setProductos(productosArray);
            console.log("Estado actualizado con productos:", productosArray); // Debug log
          } else {
            console.log("No response from API"); // Debug log
            setError("Error al cargar los productos");
            setProductos([]);
          }
        }
      } catch (error) {
        if (isSubscribed) {
          console.error("Error cargando productos:", error);
          setError("Error al cargar los productos");
          setProductos([]);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    loadProductos();

    return () => {
      isSubscribed = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        className="flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <i className="pi pi-spin pi-spinner text-4xl text-primary"></i>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="col-12">
        {/* Header de la página */}
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-900 m-0">
              Gestión de Productos
            </h1>
            <p className="text-600 mt-2 mb-0">
              Administra el inventario de productos
            </p>
          </div>
          <Button
            label="Nuevo Producto"
            icon="pi pi-plus"
            className="p-button-primary"
            onClick={() => {
              setSelectedProduct(undefined);
              setFormVisible(true);
            }}
          />
        </div>

        {/* Mostrar mensaje de error si existe */}
        {error && <Message severity="error" text={error} className="mb-4" />}

        {/* Mostrar mensaje si no hay productos */}
        {productos.length === 0 && !loading && !error && (
          <Message
            severity="warn"
            text="No se encontraron productos en el sistema"
            className="mb-4"
          />
        )}

        {/* Tabla de productos */}
        <ProductosTable
          productos={productos}
          onEdit={(product) => {
            setSelectedProduct(product);
            setFormVisible(true);
          }}
          onDelete={(product) => {
            confirmDialog({
              message: `¿Está seguro de eliminar el producto "${product.nombre}"?`,
              header: "Confirmar eliminación",
              icon: "pi pi-exclamation-triangle",
              acceptClassName: "p-button-danger",
              acceptLabel: "Sí, eliminar",
              rejectLabel: "Cancelar",
              async accept() {
                try {
                  setIsDeleting(true);
                  const api = new ProductosApi();
                  await api.eliminar(product.id!);

                  // Refresh the list
                  const response = await api.listarTodos();
                  if (!response?.data) {
                    throw new Error(
                      "Error al actualizar la lista de productos"
                    );
                  }
                  setProductos(response.data);

                  toast.current?.show({
                    severity: "success",
                    summary: "Éxito",
                    detail: "Producto eliminado correctamente",
                  });
                } catch (err: any) {
                  const errorMessage =
                    err.response?.data?.detail ||
                    err.message ||
                    "Ha ocurrido un error al eliminar el producto";

                  toast.current?.show({
                    severity: "error",
                    summary: "Error al eliminar",
                    detail: errorMessage,
                    life: 5000,
                  });
                } finally {
                  setIsDeleting(false);
                }
              },
            });
          }}
          isDeleting={isDeleting}
        />

        <ProductForm
          visible={formVisible}
          onHide={() => setFormVisible(false)}
          product={selectedProduct}
          isSubmitting={isSubmitting}
          onSubmit={async (data) => {
            try {
              setIsSubmitting(true);
              const api = new ProductosApi();

              if (selectedProduct) {
                // Edit mode
                const updateResponse = await api.actualizar(
                  selectedProduct.id!,
                  data as UpdateProductoDto
                );

                if (!updateResponse?.data) {
                  throw new Error("No se recibió respuesta del servidor");
                }

                toast.current?.show({
                  severity: "success",
                  summary: "Éxito",
                  detail: "Producto actualizado correctamente",
                });
              } else {
                // Create mode
                const createResponse = await api.crear(
                  data as CreateProductoDto
                );

                if (!createResponse?.data) {
                  throw new Error("No se recibió respuesta del servidor");
                }

                toast.current?.show({
                  severity: "success",
                  summary: "Éxito",
                  detail: "Producto creado correctamente",
                });
              }

              // Refresh the products list
              const listResponse = await api.listarTodos();
              if (!listResponse?.data) {
                throw new Error("Error al actualizar la lista de productos");
              }
              setProductos(listResponse.data);
              setFormVisible(false);
            } catch (err: any) {
              const operation = selectedProduct ? "actualizar" : "crear";
              const errorMessage =
                err.response?.data?.message ||
                err.message ||
                `Ha ocurrido un error al ${operation} el producto`;

              toast.current?.show({
                severity: "error",
                summary: `Error al ${operation}`,
                detail: errorMessage,
                life: 5000,
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
        />

        <Toast ref={toast} />
        <ConfirmDialog />
      </div>
    </div>
  );
};

export default ProductosPage;
