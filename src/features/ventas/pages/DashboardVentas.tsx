import React, { useEffect, useState } from "react";
import { DashboardVentasControllerApi } from "../../../api";
import type {
  TopProductoDTO,
  ClienteIngresosDTO,
  IngresosMensualesDTO,
} from "../../../api/api";
import { useAxiosConfig } from "../../../api/hooks/useAxiosConfig";
import TopProductosCard from "../components/TopProductosCard";
import TopClientesCard from "../components/TopClientesCard";
import IngresosMensualesCard from "../components/IngresosMensualesCard";
import { handleApiError } from "../../../utils/errorHandler";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const DashboardVentas: React.FC = () => {
  const axiosConfig = useAxiosConfig();
  const dashboardApi = new DashboardVentasControllerApi(axiosConfig);
  const toast = useRef<Toast>(null);

  const [loadingProductos, setLoadingProductos] = useState(true);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [loadingIngresos, setLoadingIngresos] = useState(true);
  const [topProductos, setTopProductos] = useState<TopProductoDTO[]>([]);
  const [topClientes, setTopClientes] = useState<ClienteIngresosDTO[]>([]);
  const [ingresosMensuales, setIngresosMensuales] =
    useState<IngresosMensualesDTO>();

  useEffect(() => {
    const cargarTopProductos = async () => {
      try {
        setLoadingProductos(true);
        const response = await dashboardApi.obtenerTopProductosVendidos(3);
        if (response.data) {
          setTopProductos(response.data);
        }
      } catch (error) {
        handleApiError(error, {
          toast,
          defaultMessage: "Error al cargar los productos más vendidos",
        });
      } finally {
        setLoadingProductos(false);
      }
    };

    const cargarTopClientes = async () => {
      try {
        setLoadingClientes(true);
        const response = await dashboardApi.obtenerClientesTopIngresos(1);
        if (response.data) {
          setTopClientes(response.data);
        }
      } catch (error) {
        handleApiError(error, {
          toast,
          defaultMessage: "Error al cargar los clientes con más ingresos",
        });
      } finally {
        setLoadingClientes(false);
      }
    };

    const cargarIngresosMensuales = async () => {
      try {
        setLoadingIngresos(true);
        const fechaActual = new Date();
        const response = await dashboardApi.obtenerIngresoPorMes(
          fechaActual.getFullYear(),
          fechaActual.getMonth() + 1
        );
        if (response.data) {
          setIngresosMensuales(response.data);
        }
      } catch (error) {
        handleApiError(error, {
          toast,
          defaultMessage: "Error al cargar los ingresos mensuales",
        });
      } finally {
        setLoadingIngresos(false);
      }
    };

    cargarTopProductos();
    cargarTopClientes();
    cargarIngresosMensuales();
  }, []);

  return (
    <div className="card">
      <Toast ref={toast} />
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-4">
          <TopProductosCard
            productos={topProductos}
            loading={loadingProductos}
          />
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <TopClientesCard clientes={topClientes} loading={loadingClientes} />
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <IngresosMensualesCard
            ingresos={ingresosMensuales}
            loading={loadingIngresos}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardVentas;
