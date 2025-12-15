import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { QueryProps } from '@/features/restaurants/search-restaurants.service';
import { querySearch } from '@/states/slices/querySlice';

interface SearchBoxProps {
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ className }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const params: QueryProps = {
    q: searchValue,
    page: 1,
    limit: 20,
  };

  const handleDebouncedChange = debounce((value: string) => {
    setSearchValue(value);
  }, 50);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDebouncedChange(e.target.value);
  };

  useEffect(() => {
    dispatch(querySearch(params));
  }, [searchValue]);

  return (
    <div
      className={cn('relative hidden w-auto md:block', className)}
      onClick={() => {
        dispatch(querySearch(params));
      }}
    >
      <Input
        placeholder='Search resto'
        variant={'search'}
        value={searchValue}
        className='bg-background hidden w-full md:block md:h-14'
        onChange={onChange}
      />
      <Button
        variant={'borderless'}
        size={'icon-sm'}
        className='absolute top-1/2 left-6.5 z-50 flex size-fit h-full -translate-y-1/2 rounded-none border-0'
      >
        <Search size={18} className='text-neutral-500' />
      </Button>
    </div>
  );
};
