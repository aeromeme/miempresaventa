import { useEffect, useMemo } from "react";
import { Configuration } from "../configuration";
import { requestInterceptor, responseInterceptor } from "../interceptors/axios";
import { useAuth } from "../../features/auth/context/AuthContext";

export const useAxiosConfig = () => {
  const { token } = useAuth();

  const config = useMemo(() => {
    return new Configuration({
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
      accessToken: token || undefined,
      formDataCtor: FormData,
    });
  }, [token]);

  return config;
};
