import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { ApiResponse, ServiceProps } from '@/types/global-types';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { Restaurants, RestoPayload } from './type';

export type Props = RestoPayload & ServiceProps;

export async function feedsService(params: Props): Promise<Restaurants> {
  const { data } = await axiosInstance.get<ApiResponse<Restaurants>>(
    '/api/resto',
    {
      params,
    }
  );

  return data.data;
}

export const infinitesRestaurantsQueryOption = (params: Props) => {
  return infiniteQueryOptions({
    queryKey: restaurantsQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return feedsService(params);
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

export type UseFeedsParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesRestaurantsQueryOption>;
  params: Props;
};

export const restaurantsStorageKey = () => 'restorants';
export const restaurantsQueryKey = (params: Props) => ['restorants', params];
