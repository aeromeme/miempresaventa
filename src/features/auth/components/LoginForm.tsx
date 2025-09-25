import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import type { AuthenticationRequest } from "../../../api";

interface LoginFormProps {
  onSubmit: (data: AuthenticationRequest) => Promise<void>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getFormErrorMessage = (name: keyof AuthenticationRequest) => {
    return errors[name] ? (
      <small className="p-error">{errors[name]?.message}</small>
    ) : null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
      <div className="field w-full">
        <label htmlFor="email" className="block text-900 font-medium mb-2">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          }}
          render={({ field, fieldState }) => (
            <div className="w-full">
              <InputText
                id={field.name}
                {...field}
                className={classNames("w-full", {
                  "p-invalid": fieldState.error,
                })}
                style={{ width: "100%" }}
                placeholder="tu@email.com"
              />
              {getFormErrorMessage("email")}
            </div>
          )}
        />
      </div>

      <div className="field w-full">
        <label htmlFor="password" className="block text-900 font-medium mb-2">
          Contraseña
        </label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "La contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          }}
          render={({ field, fieldState }) => (
            <div className="w-full">
              <InputText
                id={field.name}
                {...field}
                type="password"
                className={classNames("w-full", {
                  "p-invalid": fieldState.error,
                })}
                style={{ width: "100%" }}
              />
              {getFormErrorMessage("password")}
            </div>
          )}
        />
      </div>

      <Button
        type="submit"
        label="Iniciar Sesión"
        icon="pi pi-sign-in"
        loading={isLoading}
        className="w-full"
      />
    </form>
  );
};

export default LoginForm;
