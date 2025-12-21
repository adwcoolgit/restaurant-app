/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRememberMeSKey, loginTokenSKey } from '@/features/auth/type';
import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { getItemWithExpiry } from './storages';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== undefined) {
    let token: string | null;
    token = '';

    const isRememberMe: boolean = Boolean(
      Number(localStorage.getItem(isRememberMeSKey()))
    );

    if (!isRememberMe) {
      const storedToken = getItemWithExpiry(loginTokenSKey());
      if (storedToken) {
        token = storedToken?.replaceAll('"', '');
      }
    } else {
      token = localStorage.getItem(loginTokenSKey());
    }

    if (token) {
      if (
        config.headers &&
        typeof (config.headers as AxiosHeaders).set === 'function'
      ) {
        (config.headers as AxiosHeaders).set(
          'Authorization',
          `Bearer ${token}`
        );
      } else {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${token}`,
        } as any;
      }
    }
  }

  return config;
});

// Helper: kembalikan langsung data bertipe T (bukan AxiosResponse<T>)
export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axiosInstance.get<T>(url, config);
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.post<T>(url, data, config);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.patch<T>(url, data, config);
    return res.data;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.put<T>(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axiosInstance.delete<T>(url, config);
    return res.data;
  },
};
