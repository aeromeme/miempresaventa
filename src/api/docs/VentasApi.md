# VentasApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create**](#create) | **POST** /api/ventas | |
|[**getAll**](#getall) | **GET** /api/ventas | |
|[**getByClienteId**](#getbyclienteid) | **GET** /api/ventas/cliente/{clienteId} | |
|[**getByEstado**](#getbyestado) | **GET** /api/ventas/estado/{estado} | |
|[**getById**](#getbyid) | **GET** /api/ventas/{id} | |
|[**update**](#update) | **PUT** /api/ventas/{id} | |

# **create**
> VentaDTO create(createVentaDTO)


### Example

```typescript
import {
    VentasApi,
    Configuration,
    CreateVentaDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasApi(configuration);

let createVentaDTO: CreateVentaDTO; //

const { status, data } = await apiInstance.create(
    createVentaDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createVentaDTO** | **CreateVentaDTO**|  | |


### Return type

**VentaDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAll**
> Array<VentaDTO> getAll()


### Example

```typescript
import {
    VentasApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasApi(configuration);

const { status, data } = await apiInstance.getAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<VentaDTO>**

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

# **getByClienteId**
> Array<VentaDTO> getByClienteId()


### Example

```typescript
import {
    VentasApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasApi(configuration);

let clienteId: string; // (default to undefined)

const { status, data } = await apiInstance.getByClienteId(
    clienteId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **clienteId** | [**string**] |  | defaults to undefined|


### Return type

**Array<VentaDTO>**

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

# **getByEstado**
> Array<VentaDTO> getByEstado()


### Example

```typescript
import {
    VentasApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasApi(configuration);

let estado: string; // (default to undefined)

const { status, data } = await apiInstance.getByEstado(
    estado
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **estado** | [**string**] |  | defaults to undefined|


### Return type

**Array<VentaDTO>**

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

# **getById**
> VentaDTO getById()


### Example

```typescript
import {
    VentasApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**VentaDTO**

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

# **update**
> VentaDTO update(updateVentaDTO)


### Example

```typescript
import {
    VentasApi,
    Configuration,
    UpdateVentaDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new VentasApi(configuration);

let id: string; // (default to undefined)
let updateVentaDTO: UpdateVentaDTO; //

const { status, data } = await apiInstance.update(
    id,
    updateVentaDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateVentaDTO** | **UpdateVentaDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**VentaDTO**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

