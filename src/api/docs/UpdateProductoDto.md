# UpdateProductoDto

Datos para actualizar un producto existente. La moneda no se puede cambiar.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**nombre** | **string** | Nuevo nombre del producto | [optional] [default to undefined]
**precio** | **number** | Nuevo precio del producto | [optional] [default to undefined]
**stock** | **number** | Nueva cantidad en stock | [optional] [default to undefined]

## Example

```typescript
import { UpdateProductoDto } from './api';

const instance: UpdateProductoDto = {
    nombre,
    precio,
    stock,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
