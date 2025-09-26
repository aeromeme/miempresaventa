# VentaDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**clienteId** | **string** |  | [optional] [default to undefined]
**fechaVenta** | **string** |  | [optional] [default to undefined]
**total** | **number** |  | [optional] [default to undefined]
**estado** | **string** |  | [optional] [default to undefined]
**lineasVenta** | [**Array&lt;LineaVentaDTO&gt;**](LineaVentaDTO.md) |  | [optional] [default to undefined]

## Example

```typescript
import { VentaDTO } from './api';

const instance: VentaDTO = {
    id,
    clienteId,
    fechaVenta,
    total,
    estado,
    lineasVenta,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
