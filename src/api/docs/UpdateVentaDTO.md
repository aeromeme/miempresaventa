# UpdateVentaDTO

Datos para actualizar una venta

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | ID de la venta | [default to undefined]
**clienteId** | **string** | ID del cliente | [default to undefined]
**lineasVenta** | [**Array&lt;UpdateLineaVentaDTO&gt;**](UpdateLineaVentaDTO.md) | Lista de líneas de venta | [default to undefined]

## Example

```typescript
import { UpdateVentaDTO } from './api';

const instance: UpdateVentaDTO = {
    id,
    clienteId,
    lineasVenta,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
