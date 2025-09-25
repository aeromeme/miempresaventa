# ProductosApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**actualizar**](#actualizar) | **PUT** /api/productos/{id} | Actualizar producto|
|[**buscarPorNombre**](#buscarpornombre) | **GET** /api/productos/buscar | Buscar productos por nombre|
|[**crear**](#crear) | **POST** /api/productos | Crear nuevo producto|
|[**eliminar**](#eliminar) | **DELETE** /api/productos/{id} | Eliminar producto|
|[**listarTodos**](#listartodos) | **GET** /api/productos | Listar todos los productos|
|[**obtenerConfiguracionMonedas**](#obtenerconfiguracionmonedas) | **GET** /api/productos/config/monedas | Obtener configuración de monedas|
|[**obtenerPorId**](#obtenerporid) | **GET** /api/productos/{id} | Obtener producto por ID|

# **actualizar**
> ProductoDto actualizar(updateProductoDto)

Actualiza un producto existente

### Example

```typescript
import {
    ProductosApi,
    Configuration,
    UpdateProductoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductosApi(configuration);

let id: string; //ID único del producto (default to undefined)
let updateProductoDto: UpdateProductoDto; //

const { status, data } = await apiInstance.actualizar(
    id,
    updateProductoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProductoDto** | **UpdateProductoDto**|  | |
| **id** | [**string**] | ID único del producto | defaults to undefined|


### Return type

**ProductoDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Producto actualizado exitosamente |  -  |
|**400** | Datos de entrada inválidos |  -  |
|**404** | Producto no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **buscarPorNombre**
> Array<ProductoDto> buscarPorNombre()

Busca productos que contengan el texto especificado en el nombre

### Example

```typescript
import {
    ProductosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductosApi(configuration);

let nombre: string; //Texto a buscar en el nombre del producto (default to undefined)

const { status, data } = await apiInstance.buscarPorNombre(
    nombre
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nombre** | [**string**] | Texto a buscar en el nombre del producto | defaults to undefined|


### Return type

**Array<ProductoDto>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**500** | Error interno al realizar la búsqueda |  -  |
|**200** | Búsqueda realizada exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **crear**
> ProductoDto crear(createProductoDto)

Crea un nuevo producto en el sistema

### Example

```typescript
import {
    ProductosApi,
    Configuration,
    CreateProductoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductosApi(configuration);

let createProductoDto: CreateProductoDto; //

const { status, data } = await apiInstance.crear(
    createProductoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProductoDto** | **CreateProductoDto**|  | |


### Return type

**ProductoDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Producto creado exitosamente |  -  |
|**400** | Datos de entrada inválidos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **eliminar**
> object eliminar()

Elimina un producto del sistema

### Example

```typescript
import {
    ProductosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductosApi(configuration);

let id: string; //ID único del producto (default to undefined)

const { status, data } = await apiInstance.eliminar(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID único del producto | defaults to undefined|


### Return type

**object**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Producto eliminado exitosamente |  -  |
|**404** | Producto no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listarTodos**
> Array<ProductoDto> listarTodos()

Obtiene una lista de todos los productos disponibles

### Example

```typescript
import {
    ProductosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductosApi(configuration);

const { status, data } = await apiInstance.listarTodos();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ProductoDto>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lista de productos obtenida exitosamente |  -  |
|**500** | Error interno al obtener los productos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerConfiguracionMonedas**
> MonedaConfigDto obtenerConfiguracionMonedas()

Obtiene la moneda por defecto y las monedas soportadas

### Example

```typescript
import {
    ProductosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductosApi(configuration);

const { status, data } = await apiInstance.obtenerConfiguracionMonedas();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MonedaConfigDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Configuración obtenida exitosamente |  -  |
|**500** | Error al obtener la configuración |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **obtenerPorId**
> ProductoDto obtenerPorId()

Busca y retorna un producto específico por su identificador único

### Example

```typescript
import {
    ProductosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductosApi(configuration);

let id: string; //ID único del producto (default to undefined)

const { status, data } = await apiInstance.obtenerPorId(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID único del producto | defaults to undefined|


### Return type

**ProductoDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Producto encontrado exitosamente |  -  |
|**404** | Producto no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

