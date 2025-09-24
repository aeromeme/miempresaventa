import React, { useState, useEffect } from "react";
import ProductosTable from "../components/ProductosTable";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { ProductosApi } from "../api";
import type { ProductoDto } from "../api";

const ProductosPage: React.FC = () => {
  const [productos, setProductos] = useState<ProductoDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productosApi = new ProductosApi();
    let isSubscribed = true;

    const loadProductos = async () => {
      try {
        setLoading(true);
        setError(null);

        const productos = await productosApi.listarTodos();

        if (isSubscribed) {
          if (productos) {
            setProductos(Array.isArray(productos) ? productos : []);
          } else {
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
            onClick={() => console.log("Crear nuevo producto")}
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
        <ProductosTable productos={productos} />
      </div>
    </div>
  );
};

export default ProductosPage;
