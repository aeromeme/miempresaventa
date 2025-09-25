import { useState, useEffect } from "react";
import { useAxiosConfig } from "../../api/hooks/useAxiosConfig";
import { ProductosApi } from "../../api";

interface MonedaConfig {
  codigo: string;
  signo: string;
  locale: string;
}

const MONEDAS_CONFIG: { [key: string]: MonedaConfig } = {
  USD: { codigo: "USD", signo: "$", locale: "en-US" },
  GTQ: { codigo: "GTQ", signo: "Q", locale: "es-GT" },
  BZD: { codigo: "BZD", signo: "BZ$", locale: "en-BZ" },
  HNL: { codigo: "HNL", signo: "L", locale: "es-HN" },
  NIO: { codigo: "NIO", signo: "C$", locale: "es-NI" },
  CRC: { codigo: "CRC", signo: "₡", locale: "es-CR" },
  PAB: { codigo: "PAB", signo: "B/.", locale: "es-PA" },
};

const formatearDineroBase = (
  valor?: number,
  config: MonedaConfig = MONEDAS_CONFIG["USD"]
): string => {
  if (valor === undefined) return `${config.signo}0.00`;

  return `${config.signo}${valor.toLocaleString(config.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

interface UseMonedaConfigReturn {
  monedaConfig: MonedaConfig;
  loading: boolean;
  error: string | null;
  formatearDinero: (valor?: number) => string;
}

export const useMonedaConfig = (): UseMonedaConfigReturn => {
  const axiosConfig = useAxiosConfig();
  const productosApi = new ProductosApi(axiosConfig);

  const [monedaConfig, setMonedaConfig] = useState<MonedaConfig>(
    MONEDAS_CONFIG["USD"]
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      try {
        const configuracion = await productosApi.obtenerConfiguracionMonedas();
        const monedaPorDefecto = configuracion?.data?.monedaPorDefecto;
        const nuevaConfig =
          monedaPorDefecto && MONEDAS_CONFIG[monedaPorDefecto]
            ? MONEDAS_CONFIG[monedaPorDefecto]
            : MONEDAS_CONFIG["USD"];
        setMonedaConfig(nuevaConfig);
        setError(null);
      } catch (err) {
        console.error("Error al obtener configuración de moneda:", err);
        setError("Error al obtener configuración de moneda");
        // Mantener USD como fallback
        setMonedaConfig(MONEDAS_CONFIG["USD"]);
      } finally {
        setLoading(false);
      }
    };

    obtenerConfiguracion();
  }, []);

  return {
    monedaConfig,
    loading,
    error,
    formatearDinero: (valor?: number) =>
      formatearDineroBase(valor, monedaConfig),
  };
};
