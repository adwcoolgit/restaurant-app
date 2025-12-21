import { cn, formatRupiah, safeImageSrc } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';
import noImage from '@/../public/images/no-image-available.svg';
import Image from 'next/image';
import { Item } from '@/features/cart/type';
import { AddItemButton } from '../add-button';

type Props = {
  cartItem: Item;
  onChangeTotal?: React.Dispatch<React.SetStateAction<number>>;
} & ComponentProps;

export const CartItemDetail: React.FC<Props> = ({ className, cartItem }) => {
  return (
    <>
      <div className={cn('flex items-center', className)}>
        <div className='relative mr-4 size-20 overflow-hidden rounded-xl'>
          <Image
            src={safeImageSrc(cartItem.menu.image) ?? noImage}
            alt={cartItem.menu.foodName}
            fill
            className='object-cover'
          />
        </div>

        <div className='flex flex-col'>
          <p className='text-md font-medium'>{cartItem.menu.foodName}</p>
          <p className='text-lg font-extrabold'>
            {formatRupiah(cartItem.itemTotal)}
          </p>
        </div>
      </div>
      <AddItemButton itemId={cartItem.id} itemQty={cartItem.quantity} />
    </>
  );
};
