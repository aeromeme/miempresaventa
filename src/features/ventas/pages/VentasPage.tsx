import React, { useEffect, useState } from "react";
import type { VentaDTO } from "../../../../src/api/api";
import { VentasApi } from "../../../../src/api/api";
import VentasTable from "../components/VentasTable";
import { useAxiosConfig } from "../../../api/hooks/useAxiosConfig";

const ESTADO_DEFECTO = "E";

const VentasPage: React.FC = () => {
  const [ventas, setVentas] = useState<VentaDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosConfig = useAxiosConfig();
  const api = new VentasApi(axiosConfig);
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    api
      .getByEstado(ESTADO_DEFECTO)
      .then((response) => {
        setVentas(response.data);
      })
      .catch(() => {
        setError("Error al cargar ventas");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <VentasTable ventas={ventas} loading={loading} error={error} />
    </div>
  );
};

export default VentasPage;
