import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import type {
  ProductoDto,
  CreateProductoDto,
  UpdateProductoDto,
} from "../../../api";

interface ProductFormProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: CreateProductoDto | UpdateProductoDto) => Promise<void>;
  product?: ProductoDto; // If provided, we're in edit mode
  isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  visible,
  onHide,
  onSubmit,
  product,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<CreateProductoDto>({
    nombre: "",
    precio: 0,
    stock: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when dialog is opened/closed or product changes
  useEffect(() => {
    if (visible) {
      setFormData(
        product
          ? {
              nombre: product.nombre ?? "",
              precio: product.precio ?? 0,
              stock: product.stock ?? 0,
            }
          : {
              nombre: "",
              precio: 0,
              stock: 0,
            }
      );
      setErrors({});
    }
  }, [visible, product]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre?.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.length > 100) {
      newErrors.nombre = "El nombre no puede exceder los 100 caracteres";
    }

    if (formData.precio === null || formData.precio === undefined) {
      newErrors.precio = "El precio es requerido";
    } else if (formData.precio < 0) {
      newErrors.precio = "El precio debe ser mayor o igual a 0";
    } else if (formData.precio > 999999.99) {
      newErrors.precio = "El precio no puede exceder 999,999.99";
    }

    if (formData.stock === null || formData.stock === undefined) {
      newErrors.stock = "El stock es requerido";
    } else if (formData.stock < 0) {
      newErrors.stock = "El stock debe ser mayor o igual a 0";
    } else if (formData.stock > 999999) {
      newErrors.stock = "El stock no puede exceder 999,999 unidades";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        await onSubmit(formData);
      }
    } catch (error) {
      // If onSubmit throws, we want to show validation errors if any
      validateForm();
      throw error; // Re-throw to let parent handle the error
    }
  };

  const renderFooter = () => (
    <div className="flex justify-content-end gap-2 pt-4">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={onHide}
        disabled={isSubmitting}
        type="button"
      />
      <Button
        label={isSubmitting ? "Guardando..." : "Guardar"}
        icon="pi pi-check"
        onClick={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
        className="p-button-primary"
        type="submit"
      />
    </div>
  );

  return (
    <Dialog
      header={product ? "Editar Producto" : "Nuevo Producto"}
      visible={visible}
      onHide={onHide}
      footer={renderFooter}
      modal
      className="p-fluid"
      style={{ width: "450px" }}
      closable={!isSubmitting}
      closeOnEscape={!isSubmitting}
      dismissableMask={!isSubmitting}
      blockScroll
      draggable={false}
      resizable={false}
      maximizable={false}
      showHeader
      baseZIndex={1000}
      appendTo={document.body}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e as any);
        }}
        className="grid p-fluid"
      >
        <div className="col-12 mb-3">
          <span className="p-float-label">
            <InputText
              id="nombre"
              value={formData.nombre}
              onChange={(e) => {
                setFormData({ ...formData, nombre: e.target.value });
                if (errors.nombre) validateForm();
              }}
              className={errors.nombre ? "p-invalid" : ""}
              disabled={isSubmitting}
              maxLength={100}
              required
              aria-required
              aria-label="Nombre del Producto"
            />
            <label htmlFor="nombre">Nombre del Producto*</label>
          </span>
          {errors.nombre && (
            <small className="p-error block mt-1">{errors.nombre}</small>
          )}
        </div>

        <div className="col-12 mb-3">
          <span className="p-float-label">
            <InputNumber
              id="precio"
              value={formData.precio}
              onValueChange={(e) => {
                setFormData({ ...formData, precio: e.value ?? 0 });
                if (errors.precio) validateForm();
              }}
              mode="currency"
              currency="USD"
              locale="en-US"
              className={errors.precio ? "p-invalid" : ""}
              disabled={isSubmitting}
              minFractionDigits={2}
              maxFractionDigits={2}
              min={0}
              max={999999.99}
              required
              aria-required
              aria-label="Precio"
            />
            <label htmlFor="precio">Precio*</label>
          </span>
          {errors.precio && (
            <small className="p-error block mt-1">{errors.precio}</small>
          )}
        </div>

        <div className="col-12">
          <span className="p-float-label">
            <InputNumber
              id="stock"
              value={formData.stock}
              onValueChange={(e) => {
                setFormData({ ...formData, stock: e.value ?? 0 });
                if (errors.stock) validateForm();
              }}
              className={errors.stock ? "p-invalid" : ""}
              min={0}
              max={999999}
              required
              aria-required
              aria-label="Stock"
              disabled={isSubmitting}
              showButtons
            />
            <label htmlFor="stock">Stock*</label>
          </span>
          {errors.stock && (
            <small className="p-error block mt-1">{errors.stock}</small>
          )}
        </div>
      </form>
    </Dialog>
  );
};

export default ProductForm;
