# CreateVentaDTO

Datos para crear una nueva venta

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**clienteId** | **string** | ID del cliente | [default to undefined]
**lineasVenta** | [**Array&lt;CreateLineaVentaDTO&gt;**](CreateLineaVentaDTO.md) | Lista de líneas de venta | [default to undefined]

## Example

```typescript
import { CreateVentaDTO } from './api';

const instance: CreateVentaDTO = {
    clienteId,
    lineasVenta,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
