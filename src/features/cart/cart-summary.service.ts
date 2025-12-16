import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions } from '@tanstack/react-query';
import { CartSummary } from './type';
import { ApiResponse } from '@/types/global-types';

export async function cartSummaryService(): Promise<CartSummary> {
  const { data } =
    await axiosInstance.get<ApiResponse<CartSummary>>(`/api/cart`);

  return data.data as CartSummary;
}

export const cartSummaryQueryOption = () => {
  return queryOptions({
    queryKey: cartSummaryQueryKey(),
    queryFn: cartSummaryService,
    staleTime: 1000 * 60,
  });
};

export type UseUserProfileQueryParam = {
  queryConfig?: QueryConfig<typeof cartSummaryQueryOption>;
};

export const cartSummaryQueryKey = () => ['cartSummary'];
