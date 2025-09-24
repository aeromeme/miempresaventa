# ClientesApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**obtenerClientes**](#obtenerclientes) | **GET** /api/v1/clientes | Obtener clientes paginados|
|[**obtenerClientesFiltrados**](#obtenerclientesfiltrados) | **GET** /api/v1/clientes/buscar | Buscar clientes con filtros combinados|
|[**obtenerClientesPorCorreo**](#obtenerclientesporcorreo) | **GET** /api/v1/clientes/buscar-por-correo | Buscar clientes por correo electrónico|
|[**obtenerClientesPorNombre**](#obtenerclientespornombre) | **GET** /api/v1/clientes/buscar-por-nombre | Buscar clientes por nombre|

# **obtenerClientes**
> PagedResponse obtenerClientes()

Obtiene una lista paginada de todos los clientes registrados en el sistema

### Example

```typescript
import {
    ClientesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientesApi(configuration);

let page: number; //Número de página (inicia en 0) (optional) (default to 0)
let size: number; //Cantidad de elementos por página (optional) (default to 10)

const { status, data } = await apiInstance.obtenerClientes(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Número de página (inicia en 0) | (optional) defaults to 0|
| **size** | [**number**] | Cantidad de elementos por página | (optional) defaults to 10|


### Return type

**PagedResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lista de clientes obtenida exitosamente |  -  |
|**400** | Parámetros de paginación inválidos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerClientesFiltrados**
> PagedResponse obtenerClientesFiltrados()

Obtiene una lista paginada de clientes aplicando filtros por nombre y/o correo electrónico

### Example

```typescript
import {
    ClientesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientesApi(configuration);

let nombre: string; //Texto a buscar en el nombre del cliente (optional) (default to undefined)
let correo: string; //Texto a buscar en el correo electrónico (optional) (default to undefined)
let page: number; //Número de página (inicia en 0) (optional) (default to 0)
let size: number; //Cantidad de elementos por página (optional) (default to 10)

const { status, data } = await apiInstance.obtenerClientesFiltrados(
    nombre,
    correo,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nombre** | [**string**] | Texto a buscar en el nombre del cliente | (optional) defaults to undefined|
| **correo** | [**string**] | Texto a buscar en el correo electrónico | (optional) defaults to undefined|
| **page** | [**number**] | Número de página (inicia en 0) | (optional) defaults to 0|
| **size** | [**number**] | Cantidad de elementos por página | (optional) defaults to 10|


### Return type

**PagedResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Parámetros inválidos o al menos un filtro es requerido |  -  |
|**200** | Lista de clientes con filtros aplicados obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerClientesPorCorreo**
> PagedResponse obtenerClientesPorCorreo()

Obtiene una lista paginada de clientes cuyo correo electrónico contenga el texto especificado

### Example

```typescript
import {
    ClientesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientesApi(configuration);

let correo: string; //Texto a buscar en el correo electrónico (default to undefined)
let page: number; //Número de página (inicia en 0) (optional) (default to 0)
let size: number; //Cantidad de elementos por página (optional) (default to 10)

const { status, data } = await apiInstance.obtenerClientesPorCorreo(
    correo,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **correo** | [**string**] | Texto a buscar en el correo electrónico | defaults to undefined|
| **page** | [**number**] | Número de página (inicia en 0) | (optional) defaults to 0|
| **size** | [**number**] | Cantidad de elementos por página | (optional) defaults to 10|


### Return type

**PagedResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Parámetros inválidos o filtro de correo requerido |  -  |
|**200** | Lista de clientes filtrada por correo obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerClientesPorNombre**
> PagedResponse obtenerClientesPorNombre()

Obtiene una lista paginada de clientes cuyo nombre contenga el texto especificado

### Example

```typescript
import {
    ClientesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ClientesApi(configuration);

let nombre: string; //Texto a buscar en el nombre del cliente (default to undefined)
let page: number; //Número de página (inicia en 0) (optional) (default to 0)
let size: number; //Cantidad de elementos por página (optional) (default to 10)

const { status, data } = await apiInstance.obtenerClientesPorNombre(
    nombre,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nombre** | [**string**] | Texto a buscar en el nombre del cliente | defaults to undefined|
| **page** | [**number**] | Número de página (inicia en 0) | (optional) defaults to 0|
| **size** | [**number**] | Cantidad de elementos por página | (optional) defaults to 10|


### Return type

**PagedResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Parámetros inválidos o filtro de nombre requerido |  -  |
|**200** | Lista de clientes filtrada obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

