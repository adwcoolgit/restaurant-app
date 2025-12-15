import { Item } from '@/features/detail/type';
import { safeImageSrc } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';
import Image from 'next/image';
import noImage from '@/../public/images/no-image-available.svg';
import { Button } from './ui/button';

type Props = Item & ComponentProps;

export const ItemCard: React.FC<Props> = ({ className, ...item }) => {
  return (
    <div
      className='flex cursor-pointer flex-col justify-center overflow-hidden rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] md:w-fit'
      id={item.id.toString()}
    >
      <div className='relative md:size-71.25'>
        <Image
          src={safeImageSrc(item.image) ?? noImage}
          alt={item.foodName}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex w-full justify-between p-4'>
        <div className='flex-col'>
          <p className='text-md font-medium text-inherit'>{item.foodName}</p>
          <p className='text-lg font-extrabold text-inherit'>{item.price}</p>
        </div>
        <Button
          className='right-0 m-0 flex justify-end-safe border-black px-6 py-1.25'
          variant='auth'
          size='lg'
        >
          Add
        </Button>
      </div>
    </div>
  );
};
