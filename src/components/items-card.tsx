import { Item } from '@/features/detail/type';
import { cn, formatRupiah, safeImageSrc } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';
import Image from 'next/image';
import noImage from '@/../public/images/no-image-available.svg';
import { Button } from './ui/button';
import { AddToCart } from '@/features/cart/type';
import { useAddToCart } from '@/features/cart/add-to-cart.service';
import { useQueryClient } from '@tanstack/react-query';
import { CartSummary } from '@/app/(pages)/(app)/my-cart/type';
import { cartSummaryQueryKey } from '@/features/cart/cart-summary.service';
import { AddItemButton } from './add-button';

type Props = { cItem: Item; restoId: number } & ComponentProps;

export const ItemCard: React.FC<Props> = ({ className, restoId, cItem }) => {
  const params: AddToCart = {
    menuId: cItem.id,
    quantity: 1,
    restaurantId: Number(restoId),
  };
  const { mutate: addToCart, isPending } = useAddToCart();
  const queryClient = useQueryClient();
  const cartSummaryData = queryClient.getQueryData<CartSummary>(
    cartSummaryQueryKey()
  );

  const itemCardId: number =
    cartSummaryData?.cart
      .filter((c) => c.restaurant.id === restoId)
      .flatMap((c) => c.items)
      .find((item) => item.menu.id === cItem.id)?.id ?? 0;

  const hasQty =
    cartSummaryData?.cart
      .filter((c) => c.restaurant.id === restoId)
      .flatMap((c) => c.items)
      .find((item) => item.menu.id === cItem.id)?.quantity ?? 0;

  const item =
    cartSummaryData?.cart
      .filter((c) => c.restaurant.id === restoId)
      .flatMap((c) => c.items)
      .find((item) => item.menu.id === cItem.id) ?? params;

  function btnAdd() {
    addToCart(params);
  }

  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col justify-center overflow-hidden rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] md:w-fit',
        className
      )}
      id={cItem.id.toString()}
    >
      <div className='relative overflow-hidden md:size-71.25'>
        <Image
          src={safeImageSrc(cItem.image) ?? noImage}
          alt={cItem.foodName}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex w-full justify-between p-4'>
        <div className='w-1/2 flex-col'>
          <p className='text-md font-medium text-inherit'>{cItem.foodName}</p>
          <p className='text-lg font-extrabold text-inherit'>
            {formatRupiah(cItem.price)}
          </p>
        </div>
        {hasQty > 0 ? (
          <AddItemButton itemId={itemCardId} itemQty={item.quantity} />
        ) : (
          <Button
            className='right-0 m-0 flex justify-end-safe border-black px-6 py-1.25'
            variant='auth'
            size='lg'
            onClick={() => btnAdd()}
            disabled={isPending}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
};
