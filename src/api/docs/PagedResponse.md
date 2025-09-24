# PagedResponse

Respuesta paginada genérica que contiene datos y metadatos de paginación

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**content** | **Array&lt;object&gt;** | Lista de elementos de la página actual | [optional] [default to undefined]
**page** | **number** | Número de página actual (inicia en 0) | [optional] [default to undefined]
**size** | **number** | Cantidad de elementos por página | [optional] [default to undefined]
**totalElements** | **number** | Total de elementos en toda la colección | [optional] [default to undefined]
**totalPages** | **number** | Total de páginas disponibles | [optional] [default to undefined]
**first** | **boolean** | Indica si es la primera página | [optional] [default to undefined]
**last** | **boolean** | Indica si es la última página | [optional] [default to undefined]
**hasNext** | **boolean** | Indica si hay página siguiente | [optional] [default to undefined]
**hasPrevious** | **boolean** | Indica si hay página anterior | [optional] [default to undefined]
**empty** | **boolean** |  | [optional] [default to undefined]
**numberOfElements** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { PagedResponse } from './api';

const instance: PagedResponse = {
    content,
    page,
    size,
    totalElements,
    totalPages,
    first,
    last,
    hasNext,
    hasPrevious,
    empty,
    numberOfElements,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
