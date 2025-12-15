import { useInfiniteQuery } from '@tanstack/react-query';

import {
  infinitesRestaurantsQueryOption,
  Props,
} from '@/features/restaurants/get-restaurants.service';

export const useRestaurants = (params: Props = { page: 1, limit: 20 }) => {
  return useInfiniteQuery({
    ...infinitesRestaurantsQueryOption(params),
  });
};
