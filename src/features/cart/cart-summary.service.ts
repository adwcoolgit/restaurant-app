import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions } from '@tanstack/react-query';
import { CartSummaryByResto } from './type';
import { ApiResponse } from '@/types/global-types';

export async function cartSummaryService(): Promise<CartSummaryByResto> {
  const { data } =
    await axiosInstance.get<ApiResponse<CartSummaryByResto>>(`/api/cart`);

  return data.data as CartSummaryByResto;
}

export const cartSummaryQueryOption = () => {
  return queryOptions({
    queryKey: cartSummaryQueryKey(),
    queryFn: cartSummaryService,
    staleTime: 1000 * 60,
  });
};

export type UseCartSummaryQueryParam = {
  queryConfig?: QueryConfig<typeof cartSummaryQueryOption>;
};

export const cartSummaryQueryKey = () => ['cartSummary'];
