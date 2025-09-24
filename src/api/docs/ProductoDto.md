# ProductoDto

Datos de un producto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Identificador único del producto | [optional] [default to undefined]
**nombre** | **string** | Nombre del producto | [optional] [default to undefined]
**precio** | **number** | Precio del producto | [optional] [default to undefined]
**moneda** | **string** | Moneda del precio | [optional] [default to undefined]
**stock** | **number** | Cantidad en stock | [optional] [default to undefined]

## Example

```typescript
import { ProductoDto } from './api';

const instance: ProductoDto = {
    id,
    nombre,
    precio,
    moneda,
    stock,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
