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
  placeholder?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  className,
  placeholder,
}) => {
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
      className={cn('relative block w-auto', className)}
      onClick={() => {
        dispatch(querySearch(params));
      }}
    >
      <Input
        placeholder={placeholder}
        variant={'search'}
        value={searchValue}
        className='bg-background leading-sm md:leading-md font-regular md:text-md block w-full pr-4 pl-10 text-sm tracking-tight text-inherit placeholder:text-neutral-600 md:pr-8 md:pl-12'
        onChange={onChange}
      />
      <Button
        variant={'borderless'}
        size={'icon-sm'}
        className={`absolute top-1/2 left-4 z-50 flex size-fit h-full -translate-y-1/2 rounded-none border border-0 md:left-5 lg:left-6.5`}
      >
        <Search size={18} className='text-neutral-500' />
      </Button>
    </div>
  );
};
