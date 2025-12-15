import { axiosInstance } from '@/lib/axios';
import { ApiResponse, ServiceProps } from '@/types/global-types';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { Restaurants } from './type';
import { InfiniteQueryConfig } from '@/lib/react-query';

export interface QueryProps extends ServiceProps {
  q?: string | undefined;
}

export async function searchService(params: QueryProps): Promise<Restaurants> {
  const { data } = await axiosInstance.get<ApiResponse<Restaurants>>(
    '/api/resto/search',
    { params }
  );

  return data.data as Restaurants;
}

export const infiniteSearchQueryOption = (params: QueryProps) => {
  return infiniteQueryOptions({
    queryKey: restaurantsQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return searchService(params);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.page === lastPage?.pagination?.totalPages)
        return undefined;
      const nextPage = lastPage.pagination.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export type UseRestaurantsParams = {
  quertConfig?: InfiniteQueryConfig<typeof infiniteSearchQueryOption>;
  param: QueryProps;
};

export const restaurantsStorageKey = () => 'restaurants';
export const restaurantsQueryKey = (param: QueryProps) => [
  'restaurants',
  param,
];
