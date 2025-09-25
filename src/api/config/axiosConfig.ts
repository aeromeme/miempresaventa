import { Configuration } from "../configuration";
import { requestInterceptor, responseInterceptor } from "../interceptors/axios";

export const axiosConfig = new Configuration({
  baseOptions: {
    headers: {},
    interceptors: [
      {
        onRequest: requestInterceptor.onFulfilled,
        onRequestError: requestInterceptor.onRejected,
        onResponse: responseInterceptor.onFulfilled,
        onResponseError: responseInterceptor.onRejected,
      },
    ],
  },
  accessToken: localStorage.getItem("auth_token") || undefined,
  formDataCtor: FormData,
});
