# VentasDashboardApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**obtenerClientesTopIngresos**](#obtenerclientestopingresos) | **GET** /api/dashboard/ventas/clientes/top-ingresos | |
|[**obtenerIngresoPorMes**](#obteneringresopormes) | **GET** /api/dashboard/ventas/ingresos/por-mes | |
|[**obtenerIngresosPorAnio**](#obteneringresosporanio) | **GET** /api/dashboard/ventas/ingresos/por-anio/{anio} | |
|[**obtenerTopProductosVendidos**](#obtenertopproductosvendidos) | **GET** /api/dashboard/ventas/productos/top | |

# **obtenerClientesTopIngresos**
> Array<ClienteIngresosDTO> obtenerClientesTopIngresos()


### Example

```typescript
import {
    VentasDashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasDashboardApi(configuration);

let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.obtenerClientesTopIngresos(
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<ClienteIngresosDTO>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerIngresoPorMes**
> IngresosMensualesDTO obtenerIngresoPorMes()


### Example

```typescript
import {
    VentasDashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasDashboardApi(configuration);

let anio: number; // (optional) (default to undefined)
let mes: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.obtenerIngresoPorMes(
    anio,
    mes
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **anio** | [**number**] |  | (optional) defaults to undefined|
| **mes** | [**number**] |  | (optional) defaults to undefined|


### Return type

**IngresosMensualesDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerIngresosPorAnio**
> Array<IngresosMensualesDTO> obtenerIngresosPorAnio()


### Example

```typescript
import {
    VentasDashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasDashboardApi(configuration);

let anio: number; // (default to undefined)

const { status, data } = await apiInstance.obtenerIngresosPorAnio(
    anio
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **anio** | [**number**] |  | defaults to undefined|


### Return type

**Array<IngresosMensualesDTO>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerTopProductosVendidos**
> Array<TopProductoDTO> obtenerTopProductosVendidos()


### Example

```typescript
import {
    VentasDashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasDashboardApi(configuration);

let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.obtenerTopProductosVendidos(
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<TopProductoDTO>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

