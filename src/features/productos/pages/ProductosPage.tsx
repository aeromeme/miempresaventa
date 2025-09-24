import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProductosApi } from "../../../api";
import type {
  ProductoDto,
  CreateProductoDto,
  UpdateProductoDto,
} from "../../../api";
import { useRef } from "react";
import ProductosTable from "../components/ProductosTable";
import ProductForm from "../components/ProductForm";

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

  const handleCreateProduct = async (
    data: UpdateProductoDto | CreateProductoDto
  ) => {
    try {
      setIsSubmitting(true);
      const productosApi = new ProductosApi();
      const response = await productosApi.crear(data as CreateProductoDto);

      // Refresh the products list
      const updatedResponse = await productosApi.listarTodos();
      if (!updatedResponse?.data) {
        throw new Error("Error al actualizar la lista de productos");
      }
      setProductos(updatedResponse.data);

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Producto creado correctamente",
        life: 3000,
      });

      setFormVisible(false);
    } catch (err: any) {
      console.error("Error creando producto:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Ha ocurrido un error al crear el producto";

      toast.current?.show({
        severity: "error",
        summary: "Error al crear",
        detail: errorMessage,
        life: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (
    data: UpdateProductoDto | CreateProductoDto
  ) => {
    if (!selectedProduct?.id) return;

    try {
      setIsSubmitting(true);
      const productosApi = new ProductosApi();
      await productosApi.actualizar(
        selectedProduct.id,
        data as UpdateProductoDto
      );

      // Refresh the products list
      const response = await productosApi.listarTodos();
      if (!response?.data) {
        throw new Error("Error al actualizar la lista de productos");
      }
      setProductos(response.data);

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Producto actualizado correctamente",
        life: 3000,
      });

      setFormVisible(false);
      setSelectedProduct(undefined);
    } catch (err: any) {
      console.error("Error actualizando producto:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Ha ocurrido un error al actualizar el producto";

      toast.current?.show({
        severity: "error",
        summary: "Error al actualizar",
        detail: errorMessage,
        life: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (product: ProductoDto) => {
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
          const productosApi = new ProductosApi();

          if (!product.id) {
            throw new Error("ID del producto no válido");
          }

          await productosApi.eliminar(product.id);

          // Refresh the list
          const response = await productosApi.listarTodos();
          if (!response?.data) {
            throw new Error("Error al actualizar la lista de productos");
          }
          setProductos(response.data);

          toast.current?.show({
            severity: "success",
            summary: "Éxito",
            detail: "Producto eliminado correctamente",
            life: 3000,
          });
        } catch (err: any) {
          console.error("Error eliminando producto:", err);
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
  };

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
            onClick={() => {
              setSelectedProduct(undefined);
              setFormVisible(true);
            }}
          />
        </div>

        <Toast ref={toast} />
        <ConfirmDialog />

        {/* Mensajes de error */}
        {error && (
          <Message severity="error" text={error} className="w-full mb-4" />
        )}

        {/* Tabla de productos */}
        <div className="card">
          <ProductosTable
            productos={productos}
            onEdit={(product) => {
              setSelectedProduct(product);
              setFormVisible(true);
            }}
            onDelete={handleDeleteProduct}
            isDeleting={isDeleting}
          />
        </div>

        {/* Formulario modal */}
        <ProductForm
          visible={formVisible}
          onHide={() => {
            setFormVisible(false);
            setSelectedProduct(undefined);
          }}
          onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
          product={selectedProduct}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ProductosPage;
