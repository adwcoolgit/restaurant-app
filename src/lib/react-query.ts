/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000 * 5, // 5 minutes
      gcTime: 60_000 * 5, // cache espiry time
      retry: (failureCount, error) => {
        if (
          error instanceof AxiosError &&
          error.status &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      onError: () => {
        alert('Something went wrong');
      },
    },
  },
});

export type ApiFnReturnType<FnType extends (...arg: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...arg: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn' | 'initialPageParam'
>;

export type InfiniteQueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  | 'queryKey'
  | 'queryFn'
  | 'initialPageParam'
  | 'getNextPageParam'
  | 'getPreviousPageParam'
>;

export type MutationConfig<
  MutationFnType extends (...args: any[]) => Promise<any>,
> = UseMutationOptions<
  Awaited<ReturnType<MutationFnType>>,
  unknown,
  Parameters<MutationFnType> extends [infer Variables, ...any[]]
    ? Variables
    : void
>;

export default queryClient;
