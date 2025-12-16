import {
  Props,
  restaurantsStorageKey,
} from '@/features/restaurants/get-restaurants.service';
import { Restaurant, Restaurants as Resto } from '@/features/restaurants/type';
import { useLocalStorageState } from '@/lib/storages';
import { ComponentProps } from '@/types/component-type';
import { Spinner } from './spinner';
import { useRestaurants } from '@/hooks/useRestaurants';
import { RestoCard } from './resto-card';
import { Wrapper } from './wrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { useEffect, useState } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { useQuerySearch } from '@/hooks/useQuerySearch';
import { QueryProps } from '@/features/restaurants/search-restaurants.service';
import { Button } from './ui/button';

const initResto: Restaurant = {};

export const Restaurants: React.FC<ComponentProps> = ({ className }) => {
  const [restaurant, hydrated] = useLocalStorageState<Restaurant>(
    restaurantsStorageKey(),
    initResto
  );
  const [list, setList] = useState<InfiniteData<Resto>>();

  const { category, location, priceMax, priceMin, range, rating } = useSelector(
    (state: RootState) => state.resto
  );

  const { q, limit, page } = useSelector((state: RootState) => state.search);

  const initParams: Props = {
    category: category,
    location: location,
    priceMax: priceMax,
    priceMin: priceMin,
    range: range,
    rating: rating,
    page: 1,
    limit: 20,
  };

  const initSearch: QueryProps = {
    q: q,
    page: page,
    limit: limit,
  };
  const { data: restaurants, hasNextPage: hasNextResto } =
    useRestaurants(initParams);
  const { data: searchResult, hasNextPage: hasNextSearch } =
    useQuerySearch(initSearch);

  useEffect(() => {
    if (initSearch.q) setList(searchResult);
    else setList(restaurants);
  }, [searchResult, initSearch.q]);

  useEffect(() => {
    setList(restaurants);
  }, [restaurants]);

  const data = list?.pages.flatMap((page) => page.restaurants);

  if (!hydrated) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <div className='flex w-full flex-col gap-y-8'>
        <div className='flex w-full justify-between'>
          <p className='text-display-lg text-center font-extrabold'>
            Recomended
          </p>
          <p className='text-primary-100 cursor-pointer text-center text-lg font-extrabold'>
            See All
          </p>
        </div>
        <div className='grid w-auto grid-cols-5 flex-wrap justify-start gap-x-5 gap-y-5 border-0'>
          {data?.map((resto) => (
            <RestoCard key={resto.name} {...resto} />
          ))}
        </div>
      </div>
      {(hasNextResto || hasNextSearch) && (
        <Button
          variant='outline'
          size='xl'
          className='text-md px-28 py-2.25 font-extrabold'
        >
          Show More
        </Button>
      )}
    </Wrapper>
  );
};
