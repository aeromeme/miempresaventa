# CreateProductoDto

Datos para crear un nuevo producto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**nombre** | **string** | Nombre del producto | [default to undefined]
**precio** | **number** | Precio del producto | [default to undefined]
**stock** | **number** | Cantidad inicial en stock | [default to undefined]

## Example

```typescript
import { CreateProductoDto } from './api';

const instance: CreateProductoDto = {
    nombre,
    precio,
    stock,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
