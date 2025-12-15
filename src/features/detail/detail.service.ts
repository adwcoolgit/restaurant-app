import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions } from '@tanstack/react-query';
import { RestaurantDetails } from './type';
import { ApiResponse } from '@/types/global-types';

export async function restoService(id: string): Promise<RestaurantDetails> {
  const { data } = await axiosInstance.get<ApiResponse<RestaurantDetails>>(
    `/api/resto/${id}`
  );

  return data.data as RestaurantDetails;
}

export const restoQueryOption = (id: string) => {
  return queryOptions({
    queryKey: restoQueryKey(id),
    queryFn: () => restoService(id),
    staleTime: 1000 * 60,
  });
};

export type UseRestoQueryParam = {
  queryConfig?: QueryConfig<typeof restoQueryOption>;
};

export const restoQueryKey = (id: string) => ['resto', id];
