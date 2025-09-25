import React, { useState, useEffect, useRef } from "react";
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
import ProductosTable from "../components/ProductosTable";
import ProductForm from "../components/ProductForm";
import { handleApiError } from "../../../utils/errorHandler";
import { useAxiosConfig } from "../../../api/hooks/useAxiosConfig";

const ProductosPage: React.FC = () => {
  const axiosConfig = useAxiosConfig();
  const productosApi = new ProductosApi(axiosConfig);

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
    let isSubscribed = true;

    const loadProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productosApi.listarTodos();

        if (isSubscribed) {
          if (response?.data?.length > 0) {
            setProductos(response.data);
            setError(null);
          } else {
            setError("No se encontraron productos");
            setProductos([]);
          }
        }
      } catch (err: any) {
        if (isSubscribed) {
          setProductos([]);
          handleApiError(err, {
            toast,
            defaultMessage: "Error al cargar los productos",
          });
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
      await productosApi.crear(data as CreateProductoDto);

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
      handleApiError(err, {
        toast,
        defaultMessage: "Ha ocurrido un error al crear el producto",
        isValidationError: true,
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
      handleApiError(err, {
        toast,
        defaultMessage: "Ha ocurrido un error al actualizar el producto",
        isValidationError: true,
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
      accept: async () => {
        try {
          setIsDeleting(true);
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
          handleApiError(err, {
            toast,
            defaultMessage: "Ha ocurrido un error al eliminar el producto",
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
