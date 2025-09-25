import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const TOKEN_KEY = "auth_token";

export const requestInterceptor = {
  onFulfilled: (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  onRejected: (error: any) => {
    return Promise.reject(error);
  },
};

export const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
};
