import { Toast } from "primereact/toast";
import type { RefObject } from "react";

interface ErrorHandlerOptions {
  toast: RefObject<Toast | null>;
  setError?: (error: string | null) => void;
  defaultMessage: string;
  showToast?: boolean;
  isValidationError?: boolean;
}

export const handleApiError = (err: any, options: ErrorHandlerOptions) => {
  const {
    toast,
    setError,
    defaultMessage,
    showToast = true,
    isValidationError = false,
  } = options;

  console.error(defaultMessage, err);

  if (err.response?.data) {
    const problem = err.response.data;

    if (problem.errors) {
      // Manejo de errores de validación
      const errorMessages = Object.entries(problem.errors)
        .map(([field, message]) => `${field}: ${message}`)
        .join("\n");

      if (isValidationError) {
        setError?.(errorMessages);
      }

      if (showToast) {
        toast.current?.show({
          severity: "error",
          summary: problem.title || "Error de validación",
          detail: errorMessages,
          life: 5000,
          sticky: isValidationError,
        });
      }
    } else {
      // Manejo de ProblemDetail sin errores de validación
      const errorMessage = problem.detail || defaultMessage;

      if (showToast) {
        toast.current?.show({
          severity: "error",
          summary: problem.title || "Error",
          detail: errorMessage,
          life: 5000,
        });
      }
    }
  } else {
    // Manejo de errores que no son ProblemDetail
    const errorMessage = err.message || defaultMessage;

    if (showToast) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
        life: 5000,
      });
    }
  }
};
