import {
  infiniteSearchQueryOption,
  QueryProps,
} from '@/features/restaurants/search-restaurants.service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useQuerySearch = (
  params: QueryProps = { q: '', page: 1, limit: 20 }
) => {
  return useInfiniteQuery({
    ...infiniteSearchQueryOption(params),
  });
};
