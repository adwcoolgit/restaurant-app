/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosHeaders } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== undefined) {
    const token = localStorage.getItem('token');

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
