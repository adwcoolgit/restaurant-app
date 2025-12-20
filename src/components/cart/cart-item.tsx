import { cn, formatRupiah, safeImageSrc } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';
import noImage from '@/../public/images/no-image-available.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import { useUpdateQty } from '@/features/cart/cart-update-qty.service';
import { Item, UpdateQtyVariables } from '@/features/cart/type';
import { is } from 'zod/v4/locales';

type Props = {
  cartItem: Item;
  onChangeTotal?: React.Dispatch<React.SetStateAction<number>>;
} & ComponentProps;

export const CartItemDetail: React.FC<Props> = ({ className, cartItem }) => {
  const [qty, setQty] = useState<number>(0);
  const [isQtyChanged, setIsQtyChanged] = useState<boolean>(false);
  const params: UpdateQtyVariables = {
    id: cartItem.id,
    params: { quantity: qty },
  };
  const { mutate: updateQty, isPending } = useUpdateQty({});

  useEffect(() => {
    if (isQtyChanged) {
      const delayDebounceFn = setTimeout(() => {
        if (qty > 0) {
          updateQty(params);
          setIsQtyChanged(false);
        }
      }, 100);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [isQtyChanged]);

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
      <div className='flex items-center gap-x-4'>
        <Button
          variant='outline'
          className='size-10 rounded-full border'
          disabled={isPending}
          onClick={() => {
            if (cartItem.quantity > 0) {
              setQty(cartItem.quantity - 1);
              setIsQtyChanged(true);
            }
          }}
        >
          <Icon
            icon='ic:round-remove'
            width='24'
            height='24'
            className='text-black'
          />
        </Button>
        <p className='flex-center w-5 text-lg font-semibold'>
          {cartItem.quantity}
        </p>
        <Button
          variant='auth'
          className='size-10 rounded-full border'
          disabled={isPending}
          onClick={() => {
            setQty(cartItem.quantity + 1);
            setIsQtyChanged(true);
          }}
        >
          <Icon icon='ic:round-add' width='24' height='24' />
        </Button>
      </div>
    </>
  );
};
